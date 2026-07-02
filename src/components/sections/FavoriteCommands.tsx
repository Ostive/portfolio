import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface CommandEntry {
  cmd: string;
  note: string;
  approvals: number;
}

const COMMANDS: CommandEntry[] = [
  { cmd: 'npm run dev', note: 'starts the whole show', approvals: 482 },
  { cmd: 'git add .', note: 'the "I\'ll organize commits later" move', approvals: 291 },
  { cmd: 'git commit -m "fix"', note: 'most descriptive message in software history', approvals: 173 },
  { cmd: 'git pull', note: 'fixes 90% of bugs, the other 10% are merge conflicts', approvals: 356 },
  { cmd: 'git push', note: 'not --force, we don\'t do that here', approvals: 409 },
  { cmd: 'docker compose up -d --build', note: '"works on my machine" becomes everyone\'s problem, solved', approvals: 214 },
  { cmd: 'npm run build', note: 'the moment of truth', approvals: 267 },
];

const FUN_FACTS = [
  'fun fact: git push --force is not your friend. ask me how I know.',
  'fun fact: versioning headaches disappear the day you meet Docker. simple, fast, reproducible.',
  'fun fact: "it compiles" and "it works" are legally unrelated statements.',
  'fun fact: 100% of my merge conflicts happen 10 minutes before a deadline.',
  'fun fact: dev database says "ready", prod database says "failed". the error message says nothing useful.',
  'fun fact: 99% of "prod is broken" incidents are a migration that never ran. check the migrations first.',
  'fun fact: always check the seeds before blaming the code. the data was wrong the whole time.',
];

type Line =
  | { type: 'entry'; cmd: string; note: string; approvals: number }
  | { type: 'fact'; text: string };

export function FavoriteCommands() {
  const [history, setHistory] = useState<Line[]>([]);
  const [typed, setTyped] = useState('');
  const indexRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeCommand = (entry: CommandEntry, charIndex = 0) => {
      if (cancelled) return;
      if (charIndex <= entry.cmd.length) {
        setTyped(entry.cmd.slice(0, charIndex));
        timeoutId = setTimeout(() => typeCommand(entry, charIndex + 1), 45);
      } else {
        timeoutId = setTimeout(() => {
          const completedIndex = indexRef.current;
          setHistory((h) => {
            const next: Line[] = [
              ...h,
              { type: 'entry', cmd: entry.cmd, note: entry.note, approvals: entry.approvals },
            ];
            if (completedIndex % 3 === 2) {
              next.push({ type: 'fact', text: FUN_FACTS[Math.floor(completedIndex / 3) % FUN_FACTS.length] });
            }
            return next.slice(-8);
          });
          setTyped('');
          indexRef.current = completedIndex + 1;
          timeoutId = setTimeout(() => {
            typeCommand(COMMANDS[indexRef.current % COMMANDS.length]);
          }, 650);
        }, 500);
      }
    };

    timeoutId = setTimeout(() => typeCommand(COMMANDS[0]), 400);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, typed]);

  return (
    <section id="favorite-commands" className="py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-4 text-center font-mono"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-term-accent">## </span>My Most Trusted Commands
        </motion.h2>
        <motion.p
          className="text-center text-term-muted font-mono text-sm mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          approved by me, hundreds of times, completely unofficially
        </motion.p>

        <motion.div
          className="terminal-window"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="terminal-titlebar">
            <span className="terminal-dot bg-red-500/70" />
            <span className="terminal-dot bg-yellow-500/70" />
            <span className="terminal-dot bg-term-accent/70" />
            <span className="ml-3 text-xs text-term-muted font-mono">ostive@portfolio: ~/favorite-commands</span>
          </div>
          <div ref={scrollRef} className="p-6 font-mono text-sm h-80 overflow-y-auto scroll-smooth">
            {history.map((line, i) =>
              line.type === 'entry' ? (
                <div key={i} className="mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-term-accent">$</span>
                    <span className="text-term-text">{line.cmd}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-term-accent/80 ml-2">
                      <CheckCircle2 size={12} /> approved x{line.approvals}
                    </span>
                  </div>
                  <div className="text-term-muted pl-4">{'// '}{line.note}</div>
                </div>
              ) : (
                <div key={i} className="mb-3 text-term-amber/80 pl-4">
                  {'# '}{line.text}
                </div>
              )
            )}
            <div className="flex items-center gap-2">
              <span className="text-term-accent">$</span>
              <span className="text-term-text">{typed}</span>
              <span className="w-2 h-4 bg-term-accent animate-blink" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
