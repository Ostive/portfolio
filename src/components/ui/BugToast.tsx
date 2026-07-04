import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FAKE_ERRORS = [
  'Warning: coffee.level < 20% — refill recommended',
  '404: motivation not found, serving cached version',
  'ReferenceError: sleep is not defined',
  'Uncaught (in promise) reality',
  'DeprecationWarning: Monday is deprecated, use Friday instead',
  'ENOENT: no such file "free_time.txt"',
  'Warning: 1 unhandled side project rejection',
];

export function BugToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let showTimeout: ReturnType<typeof setTimeout>;
    let hideTimeout: ReturnType<typeof setTimeout>;

    const cycle = () => {
      showTimeout = setTimeout(() => {
        setMessage(FAKE_ERRORS[Math.floor(Math.random() * FAKE_ERRORS.length)]);
        hideTimeout = setTimeout(() => {
          setMessage(null);
          cycle();
        }, 4500);
      }, 15000 + Math.random() * 20000);
    };

    cycle();
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 pointer-events-none">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="terminal-window pointer-events-auto max-w-xs shadow-2xl"
          >
            <div className="terminal-titlebar">
              <span className="terminal-dot bg-red-500/70" />
              <span className="terminal-dot bg-yellow-500/70" />
              <span className="terminal-dot bg-term-accent/70" />
              <span className="ml-2 text-xs text-term-muted font-mono">stderr</span>
            </div>
            <div className="p-3 text-xs font-mono text-red-400">{message}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
