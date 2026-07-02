import { useState } from 'react';
import { motion } from 'framer-motion';
import { SiPython, SiCplusplus } from 'react-icons/si';

const RACE_DURATION = 3;

function Track({
  icon,
  iconColor,
  label,
  emoji,
  xKeyframes,
  timeKeyframes,
  onFinish,
}: {
  icon: React.ReactNode;
  iconColor: string;
  label: string;
  emoji: string;
  xKeyframes: string[];
  timeKeyframes?: number[];
  onFinish: () => void;
}) {
  return (
    <div className="mb-10 last:mb-0">
      <div className="flex items-center gap-2 mb-2 font-mono text-sm text-term-muted">
        <span style={{ color: iconColor }}>{icon}</span>
        {label}
      </div>
      <div className="relative h-12 border-b-2 border-dashed border-term-border">
        <span className="absolute right-0 -top-1 text-lg" aria-hidden>🏁</span>
        <motion.span
          className="absolute -top-1 text-2xl select-none"
          initial={{ left: '0%' }}
          whileInView={{ left: xKeyframes }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: RACE_DURATION, times: timeKeyframes, ease: 'easeInOut' }}
          onAnimationComplete={onFinish}
        >
          {emoji}
        </motion.span>
      </div>
    </div>
  );
}

export function LanguageRace() {
  const [pythonDone, setPythonDone] = useState(false);
  const [cppDone, setCppDone] = useState(false);

  return (
    <section id="language-race" className="py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-4 text-center font-mono"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-term-accent">## </span>The Hello World Race
        </motion.h2>
        <motion.p
          className="text-center text-term-muted font-mono text-sm mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          the tortoise and the hare, developer edition
        </motion.p>

        <div className="mb-12">
          <Track
            icon={<SiPython size={16} />}
            iconColor="#3776AB"
            label="python3 hello.py"
            emoji="🐢"
            xKeyframes={['0%', 'calc(100% - 2rem)']}
            onFinish={() => setPythonDone(true)}
          />
          <Track
            icon={<SiCplusplus size={16} />}
            iconColor="#00599C"
            label="g++ hello.cpp && ./a.out"
            emoji="🐇"
            xKeyframes={['0%', '38%', '38%', '70%', '70%', 'calc(100% - 2rem)']}
            timeKeyframes={[0, 0.12, 0.5, 0.62, 0.85, 1]}
            onFinish={() => setCppDone(true)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, y: 15 }}
            animate={pythonDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="terminal-titlebar">
              <span className="terminal-dot bg-red-500/70" />
              <span className="terminal-dot bg-yellow-500/70" />
              <span className="terminal-dot bg-term-accent/70" />
              <span className="ml-3 text-xs text-term-muted font-mono">hello.py</span>
            </div>
            <div className="p-5 font-mono text-sm">
              <div className="text-term-text">print(<span className="text-term-amber">"Hello, World!"</span>)</div>
              {pythonDone && (
                <motion.div
                  className="mt-4 pt-3 border-t border-term-border text-term-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  Hello, World! <span className="text-term-muted">// 0.03s, no compiling required</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, y: 15 }}
            animate={cppDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="terminal-titlebar">
              <span className="terminal-dot bg-red-500/70" />
              <span className="terminal-dot bg-yellow-500/70" />
              <span className="terminal-dot bg-term-accent/70" />
              <span className="ml-3 text-xs text-term-muted font-mono">hello.cpp</span>
            </div>
            <div className="p-5 font-mono text-sm text-term-text space-y-0.5">
              <div><span className="text-term-accent">#include</span> <span className="text-term-amber">&lt;iostream&gt;</span></div>
              <div>&nbsp;</div>
              <div><span className="text-term-accent">int</span> main() {'{'}</div>
              <div className="pl-4">std::cout &lt;&lt; <span className="text-term-amber">"Hello, World!"</span>;</div>
              <div className="pl-4"><span className="text-term-accent">return</span> 0;</div>
              <div>{'}'}</div>
              {cppDone && (
                <motion.div
                  className="mt-4 pt-3 border-t border-term-border text-term-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Hello, World! <span className="text-term-muted">// compiled in 4.2s, but it's blazing fast now</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-term-muted font-mono text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {'// moral: the turtle ships. the hare is still resolving templates.'}
        </motion.p>
      </div>
    </section>
  );
}
