import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const GRID = 20;
const CELL = 20;
const SIZE = GRID * CELL;
const MAX_BUGS = 8;
const MAX_TROJANS = 3;
const INITIAL_BUGS = 2;
const TROJAN_LIFETIME = 6000;
const TROJAN_SHRINK = 3;
const TROJAN_TIME_PENALTY = 5;
const HIGH_SCORE_KEY = 'bug-hunter-high-score';

type Point = { x: number; y: number };
type Trojan = Point & { bornAt: number };
type Status = 'idle' | 'running' | 'paused' | 'levelup' | 'over' | 'won';

interface Level {
  name: string;
  tagline: string;
  target: number;
  time: number;
  speed: number;
  spawnEvery: number;
  start: Point[];
  layout: Point[];
  blockers: number;
  trojanChance: number;
}

function hLine(y: number, from: number, to: number): Point[] {
  return Array.from({ length: to - from + 1 }, (_, i) => ({ x: from + i, y }));
}

function vLine(x: number, from: number, to: number): Point[] {
  return Array.from({ length: to - from + 1 }, (_, i) => ({ x, y: from + i }));
}

function block(x1: number, y1: number, x2: number, y2: number): Point[] {
  return hLine(0, x1, x2).flatMap((p) => vLine(p.x, y1, y2));
}

const startAt = (y: number, headX: number): Point[] => [
  { x: headX, y },
  { x: headX - 1, y },
  { x: headX - 2, y },
];

const LEVELS: Level[] = [
  {
    name: 'localhost',
    tagline: 'a few blockers, works on my machine',
    target: 5,
    time: 45,
    speed: 130,
    spawnEvery: 3000,
    start: startAt(10, 5),
    layout: [],
    blockers: 8,
    trojanChance: 0.15,
  },
  {
    name: 'staging',
    tagline: 'someone added a firewall. two, actually.',
    target: 7,
    time: 50,
    speed: 120,
    spawnEvery: 2500,
    start: startAt(17, 5),
    layout: [...hLine(6, 4, 15), ...hLine(13, 4, 15)],
    blockers: 8,
    trojanChance: 0.3,
  },
  {
    name: 'legacy code',
    tagline: "don't touch the walls, nobody knows what they do",
    target: 9,
    time: 55,
    speed: 110,
    spawnEvery: 2000,
    start: startAt(17, 5),
    layout: [...vLine(10, 3, 8), ...vLine(10, 12, 16), ...hLine(10, 3, 7), ...hLine(10, 13, 17)],
    blockers: 12,
    trojanChance: 0.4,
  },
  {
    name: 'microservices',
    tagline: 'everything is isolated, nothing talks to anything',
    target: 10,
    time: 60,
    speed: 100,
    spawnEvery: 1600,
    start: startAt(14, 5),
    layout: [
      ...hLine(2, 2, 6), ...vLine(2, 3, 6),
      ...hLine(2, 13, 17), ...vLine(17, 3, 6),
      ...hLine(17, 2, 6), ...vLine(2, 13, 16),
      ...hLine(17, 13, 17), ...vLine(17, 13, 16),
      ...block(8, 8, 11, 11),
    ],
    blockers: 14,
    trojanChance: 0.5,
  },
  {
    name: 'friday deploy',
    tagline: 'production, 17:58. what could go wrong?',
    target: 12,
    time: 60,
    speed: 90,
    spawnEvery: 1200,
    start: startAt(17, 3),
    layout: [...vLine(5, 0, 13), ...vLine(10, 6, 19), ...vLine(15, 0, 13)],
    blockers: 16,
    trojanChance: 0.6,
  },
];

const DIRECTIONS: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
  z: { x: 0, y: -1 },
  q: { x: -1, y: 0 },
};

const CRASH_MESSAGES = [
  'Segmentation fault (core dumped)',
  'Uncaught TypeError: snake is not a function',
  'panic: runtime error: index out of range',
  'Exception in thread "main" java.lang.StackOverflowError',
  'error: process exited with code 1',
];

const key = (p: Point) => `${p.x},${p.y}`;

function readHighScore() {
  try {
    return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveHighScore(score: number) {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // storage unavailable, keep it in memory only
  }
}

function randomFreeCell(occupied: Set<string>): Point | null {
  if (occupied.size >= GRID * GRID) return null;
  let p: Point;
  do {
    p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (occupied.has(key(p)));
  return p;
}

// Fixed layout + scattered single-cell blockers. A blocker never touches
// another wall (not even diagonally), so every free cell stays reachable.
// The lane in front of the snake's start is kept clear.
function generateWalls(current: Level): Set<string> {
  const walls = new Set(current.layout.map(key));
  const head = current.start[0];
  const target = walls.size + current.blockers;
  let attempts = 0;
  while (walls.size < target && attempts < 5000) {
    attempts++;
    const p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    const inStartLane =
      Math.abs(p.y - head.y) <= 1 && p.x >= head.x - 3 && p.x <= head.x + 7;
    if (inStartLane) continue;
    let touches = false;
    for (let dx = -1; dx <= 1 && !touches; dx++) {
      for (let dy = -1; dy <= 1 && !touches; dy++) {
        if (walls.has(key({ x: p.x + dx, y: p.y + dy }))) touches = true;
      }
    }
    if (!touches) walls.add(key(p));
  }
  return walls;
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>(LEVELS[0].start);
  const bugsRef = useRef<Point[]>([]);
  const trojansRef = useRef<Trojan[]>([]);
  const wallsRef = useRef<Set<string>>(new Set());
  const dirRef = useRef<Point>({ x: 1, y: 0 });
  const queuedDirRef = useRef<Point[]>([]);
  const touchStartRef = useRef<Point | null>(null);
  const gameClockRef = useRef(0);
  const spawnClockRef = useRef(0);
  const levelEatenRef = useRef(0);
  const levelStartScoreRef = useRef(0);
  const alertTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const [status, setStatus] = useState<Status>('idle');
  const [levelIndex, setLevelIndex] = useState(0);
  const [levelEaten, setLevelEaten] = useState(0);
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].time);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(readHighScore);
  const [crashMessage, setCrashMessage] = useState('');
  const [alert, setAlert] = useState('');

  const level = LEVELS[levelIndex];

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0e14';
    ctx.fillRect(0, 0, SIZE, SIZE);

    ctx.strokeStyle = 'rgba(33, 38, 45, 0.6)';
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL + 0.5, 0);
      ctx.lineTo(i * CELL + 0.5, SIZE);
      ctx.moveTo(0, i * CELL + 0.5);
      ctx.lineTo(SIZE, i * CELL + 0.5);
      ctx.stroke();
    }

    wallsRef.current.forEach((k) => {
      const [x, y] = k.split(',').map(Number);
      ctx.fillStyle = '#30363d';
      ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      ctx.fillStyle = '#21262d';
      ctx.fillRect(x * CELL + 3, y * CELL + 3, CELL - 6, CELL - 6);
    });

    ctx.font = `${CELL - 4}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    bugsRef.current.forEach((bug) => {
      ctx.fillText('🐛', bug.x * CELL + CELL / 2, bug.y * CELL + CELL / 2 + 1);
    });

    trojansRef.current.forEach((t) => {
      const age = gameClockRef.current - t.bornAt;
      const expiring = TROJAN_LIFETIME - age < 2000;
      if (expiring && Math.floor(age / 200) % 2 === 0) return;
      ctx.fillStyle = 'rgba(248, 81, 73, 0.12)';
      ctx.fillRect(t.x * CELL, t.y * CELL, CELL, CELL);
      ctx.strokeStyle = 'rgba(248, 81, 73, 0.9)';
      ctx.strokeRect(t.x * CELL + 0.5, t.y * CELL + 0.5, CELL - 1, CELL - 1);
      // emoji picks up fillStyle alpha on some browsers, so draw it fully opaque
      ctx.fillStyle = '#ffffff';
      ctx.fillText('🐴', t.x * CELL + CELL / 2, t.y * CELL + CELL / 2 + 1);
    });

    snakeRef.current.forEach((p, i) => {
      ctx.fillStyle = i === 0 ? '#3fb950' : `rgba(63, 185, 80, ${Math.max(0.35, 0.85 - i * 0.03)})`;
      ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2);
    });

    const head = snakeRef.current[0];
    const dir = dirRef.current;
    const cx = head.x * CELL + CELL / 2;
    const cy = head.y * CELL + CELL / 2;
    const forward = 3;
    const side = 4;
    const eyes = [
      { x: cx + dir.x * forward - dir.y * side, y: cy + dir.y * forward + dir.x * side },
      { x: cx + dir.x * forward + dir.y * side, y: cy + dir.y * forward - dir.x * side },
    ];
    eyes.forEach((eye) => {
      ctx.fillStyle = '#0a0e14';
      ctx.beginPath();
      ctx.arc(eye.x, eye.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#c9d1d9';
      ctx.beginPath();
      ctx.arc(eye.x + dir.x, eye.y + dir.y, 1, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  const occupiedCells = () => {
    const occupied = new Set(wallsRef.current);
    snakeRef.current.forEach((p) => occupied.add(key(p)));
    bugsRef.current.forEach((p) => occupied.add(key(p)));
    trojansRef.current.forEach((p) => occupied.add(key(p)));
    return occupied;
  };

  const spawnBug = () => {
    if (bugsRef.current.length >= MAX_BUGS) return;
    const cell = randomFreeCell(occupiedCells());
    if (cell) bugsRef.current = [...bugsRef.current, cell];
  };

  const spawnTrojan = () => {
    if (trojansRef.current.length >= MAX_TROJANS) return;
    const cell = randomFreeCell(occupiedCells());
    if (cell) trojansRef.current = [...trojansRef.current, { ...cell, bornAt: gameClockRef.current }];
  };

  const showAlert = (message: string) => {
    clearTimeout(alertTimeoutRef.current);
    setAlert(message);
    alertTimeoutRef.current = setTimeout(() => setAlert(''), 1500);
  };

  const loadLevel = (index: number, startScore: number) => {
    const next = LEVELS[index];
    wallsRef.current = generateWalls(next);
    snakeRef.current = next.start;
    dirRef.current = { x: 1, y: 0 };
    queuedDirRef.current = [];
    bugsRef.current = [];
    trojansRef.current = [];
    gameClockRef.current = 0;
    for (let i = 0; i < INITIAL_BUGS; i++) spawnBug();
    spawnClockRef.current = 0;
    levelEatenRef.current = 0;
    levelStartScoreRef.current = startScore;
    setLevelIndex(index);
    setLevelEaten(0);
    setTimeLeft(next.time);
    setScore(startScore);
    setCrashMessage('');
    setAlert('');
    draw();
    setStatus('running');
  };

  const primaryAction = () => {
    if (status === 'idle' || status === 'won') loadLevel(0, 0);
    else if (status === 'over') loadLevel(levelIndex, levelStartScoreRef.current);
    else if (status === 'levelup') loadLevel(levelIndex + 1, score);
    else if (status === 'paused') setStatus('running');
  };

  const queueDirection = useCallback((next: Point) => {
    const queue = queuedDirRef.current;
    const last = queue[queue.length - 1] ?? dirRef.current;
    const isReverse = last.x === -next.x && last.y === -next.y;
    const isSame = last.x === next.x && last.y === next.y;
    if (!isReverse && !isSame && queue.length < 3) queue.push(next);
  }, []);

  useEffect(() => {
    draw();
    return () => clearTimeout(alertTimeoutRef.current);
  }, [draw]);

  // game tick: move, collide, eat, spawn
  useEffect(() => {
    if (status !== 'running') return;

    const current = LEVELS[levelIndex];
    const id = setInterval(() => {
      const nextDir = queuedDirRef.current.shift();
      if (nextDir) dirRef.current = nextDir;

      const snake = snakeRef.current;
      const head = { x: snake[0].x + dirRef.current.x, y: snake[0].y + dirRef.current.y };
      const hitBorder = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
      const hitWall = wallsRef.current.has(key(head));
      const hitSelf = snake.slice(0, -1).some((p) => p.x === head.x && p.y === head.y);

      if (hitBorder || hitWall || hitSelf) {
        setCrashMessage(CRASH_MESSAGES[Math.floor(Math.random() * CRASH_MESSAGES.length)]);
        setStatus('over');
        return;
      }

      const eatenIndex = bugsRef.current.findIndex((b) => b.x === head.x && b.y === head.y);
      const trojanIndex = trojansRef.current.findIndex((t) => t.x === head.x && t.y === head.y);
      let nextSnake = [head, ...snake];
      if (eatenIndex >= 0) {
        bugsRef.current = bugsRef.current.filter((_, i) => i !== eatenIndex);
        levelEatenRef.current += 1;
        setLevelEaten(levelEatenRef.current);
        setScore((s) => s + 1);
        if (bugsRef.current.length === 0) spawnBug();
      } else if (trojanIndex >= 0) {
        trojansRef.current = trojansRef.current.filter((_, i) => i !== trojanIndex);
        nextSnake = nextSnake.slice(0, Math.max(2, snake.length - TROJAN_SHRINK));
        if (levelEatenRef.current > 0) {
          levelEatenRef.current -= 1;
          setLevelEaten(levelEatenRef.current);
          setScore((s) => s - 1);
        }
        setTimeLeft((t) => t - TROJAN_TIME_PENALTY);
        showAlert(`trojan.exe executed · -1 fix · -${TROJAN_TIME_PENALTY}s`);
      } else {
        nextSnake.pop();
      }
      snakeRef.current = nextSnake;

      gameClockRef.current += current.speed;
      trojansRef.current = trojansRef.current.filter(
        (t) => gameClockRef.current - t.bornAt < TROJAN_LIFETIME,
      );

      spawnClockRef.current += current.speed;
      if (spawnClockRef.current >= current.spawnEvery) {
        spawnClockRef.current = 0;
        spawnBug();
        if (Math.random() < current.trojanChance) spawnTrojan();
      }

      draw();

      if (levelEatenRef.current >= current.target) {
        setStatus(levelIndex === LEVELS.length - 1 ? 'won' : 'levelup');
      }
    }, current.speed);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, levelIndex, draw]);

  // countdown
  useEffect(() => {
    if (status !== 'running') return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status === 'running' && timeLeft <= 0) {
      setCrashMessage(`Error: Timeout of ${level.time}000ms exceeded`);
      setStatus('over');
    }
  }, [status, timeLeft, level.time]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      saveHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (status === 'running') {
        const dir = DIRECTIONS[e.key] ?? DIRECTIONS[e.key.toLowerCase()];
        if (dir) {
          e.preventDefault();
          queueDirection(dir);
        } else if (e.key === ' ' || e.key === 'p' || e.key === 'Escape') {
          e.preventDefault();
          setStatus('paused');
        }
      } else if (status === 'paused' && (e.key === ' ' || e.key === 'p')) {
        e.preventDefault();
        setStatus('running');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status, queueDirection]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const startPoint = touchStartRef.current;
    touchStartRef.current = null;
    if (!startPoint || status !== 'running') return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startPoint.x;
    const dy = t.clientY - startPoint.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
    if (Math.abs(dx) > Math.abs(dy)) queueDirection({ x: Math.sign(dx), y: 0 });
    else queueDirection({ x: 0, y: Math.sign(dy) });
  };

  const padButton = (label: string, dir: Point, icon: React.ReactNode) => (
    <button
      type="button"
      aria-label={label}
      onClick={() => status === 'running' && queueDirection(dir)}
      className="w-12 h-12 flex items-center justify-center rounded-md border border-term-border bg-term-surface text-term-muted active:text-term-accent active:border-term-accent transition-colors"
    >
      {icon}
    </button>
  );

  const nextLevel = LEVELS[levelIndex + 1];
  const buttonLabel = {
    idle: 'npm start',
    running: '',
    paused: 'fg',
    levelup: 'git push',
    over: 'npm run retry',
    won: 'npm run replay',
  }[status];

  return (
    <section id="bug-hunter" className="py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-4 text-center font-mono"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-term-accent">## </span>Bug Hunter
        </motion.h2>
        <motion.p
          className="text-center text-term-muted font-mono text-sm mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          bugs keep popping up everywhere. fix enough of them before the deadline.
        </motion.p>

        <motion.div
          className="terminal-window max-w-md mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="terminal-titlebar">
            <span className="terminal-dot bg-red-500/70" />
            <span className="terminal-dot bg-yellow-500/70" />
            <span className="terminal-dot bg-term-accent/70" />
            <span className="ml-3 text-xs text-term-muted font-mono">
              ~/bug-hunter · lvl {levelIndex + 1}/{LEVELS.length} · {level.name}
            </span>
          </div>

          <div className="grid grid-cols-3 px-4 py-2 font-mono text-xs border-b border-term-border">
            <span className="text-term-muted">
              fixed: <span className="text-term-accent">{levelEaten}/{level.target}</span>
            </span>
            <span className="text-term-muted text-center">
              time:{' '}
              <span className={timeLeft <= 10 ? 'text-red-400' : 'text-term-amber'}>
                {Math.max(0, timeLeft)}s
              </span>
            </span>
            <span className="text-term-muted text-right">
              best: <span className="text-term-amber">{highScore}</span>
            </span>
          </div>

          <div
            className="relative touch-none select-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <canvas
              ref={canvasRef}
              width={SIZE}
              height={SIZE}
              className="block w-full h-auto"
              aria-label="Snake game board"
            />

            {alert && status === 'running' && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded border border-red-500/60 bg-term-bg/90 font-mono text-xs text-red-400 whitespace-nowrap">
                ⚠ {alert}
              </div>
            )}

            {status !== 'running' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-term-bg/80 backdrop-blur-[2px] font-mono text-sm text-center px-6">
                {status === 'idle' && (
                  <>
                    <p className="text-term-text">
                      {LEVELS.length} levels · blockers · trojans · a deadline
                    </p>
                    <p className="text-term-muted">
                      arrows / WASD / swipe to move
                      <br />
                      space to pause
                    </p>
                  </>
                )}
                {status === 'over' && (
                  <>
                    <p className="text-red-400">{crashMessage}</p>
                    <p className="text-term-muted">
                      level {levelIndex + 1} · {levelEaten}/{level.target} bugs fixed
                    </p>
                  </>
                )}
                {status === 'paused' && <p className="text-term-amber">process suspended (SIGTSTP)</p>}
                {status === 'levelup' && nextLevel && (
                  <>
                    <p className="text-term-accent">✓ all tests passed on {level.name}</p>
                    <p className="text-term-text">
                      next: <span className="text-term-amber">{nextLevel.name}</span>
                    </p>
                    <p className="text-term-muted">
                      {nextLevel.tagline}
                      <br />
                      {nextLevel.target} bugs · {nextLevel.time}s
                    </p>
                  </>
                )}
                {status === 'won' && (
                  <>
                    <p className="text-term-accent">🚀 deployed to production. zero bugs. (for now)</p>
                    <p className="text-term-muted">total bugs fixed: {score}</p>
                  </>
                )}
                <button
                  type="button"
                  onClick={primaryAction}
                  className="px-4 py-2 rounded-md border border-term-accent text-term-accent hover:bg-term-accent hover:text-term-bg transition-colors"
                >
                  $ {buttonLabel}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <p className="max-w-md mx-auto mt-3 text-center font-mono text-xs text-term-muted">
          🐛 bug: +1 fix · <span className="text-red-400">🐴 trojan</span>: -1 fix, -{TROJAN_TIME_PENALTY}s, -{TROJAN_SHRINK} length
        </p>

        <div className="md:hidden mt-6 flex flex-col items-center gap-2">
          {padButton('Up', { x: 0, y: -1 }, <ArrowUp size={18} />)}
          <div className="flex gap-2">
            {padButton('Left', { x: -1, y: 0 }, <ArrowLeft size={18} />)}
            {padButton('Down', { x: 0, y: 1 }, <ArrowDown size={18} />)}
            {padButton('Right', { x: 1, y: 0 }, <ArrowRight size={18} />)}
          </div>
        </div>

        <motion.p
          className="text-center text-term-muted font-mono text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {'// fix one bug, two more appear. just like real life.'}
        </motion.p>
      </div>
    </section>
  );
}
