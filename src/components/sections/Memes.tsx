import { motion } from 'framer-motion';

interface Meme {
  title: string;
  body: React.ReactNode;
}

const MEMES: Meme[] = [
  {
    title: 'brain.exe',
    body: (
      <div className="space-y-2">
        <div><span className="mr-2">🧠</span>it works</div>
        <div><span className="mr-2">🧠🧠</span>it works and I know why</div>
        <div><span className="mr-2">🧠🧠🧠</span>it works, I know why, and I wrote a test</div>
        <div className="text-term-accent"><span className="mr-2">🌌</span>it works, nobody knows why, do not touch it</div>
      </div>
    ),
  },
  {
    title: 'decision_matrix.md',
    body: (
      <div className="space-y-2">
        <div className="text-term-muted line-through decoration-2">❌ reading the documentation</div>
        <div className="text-term-accent">✅ pasting the error into google at 2am</div>
      </div>
    ),
  },
  {
    title: 'priorities.json',
    body: (
      <div className="space-y-2">
        <div>👀 me</div>
        <div className="text-term-accent">😍 that new JS framework</div>
        <div className="text-term-muted">🧍 the 14 side projects I never finished</div>
      </div>
    ),
  },
  {
    title: 'incident_report.log',
    body: (
      <div className="space-y-2">
        <div>🐶🔥 production is on fire</div>
        <div className="text-term-accent">"this is fine."</div>
      </div>
    ),
  },
  {
    title: 'people.enum',
    body: (
      <div className="space-y-2">
        <div>there are 10 kinds of people:</div>
        <div className="text-term-accent">those who understand binary,</div>
        <div className="text-term-muted">and those who don't.</div>
      </div>
    ),
  },
  {
    title: 'bug_count.sh',
    body: (
      <div className="space-y-2">
        <div>99 little bugs in the code, 99 little bugs</div>
        <div className="text-term-muted">take one down, patch it around,</div>
        <div className="text-term-accent">127 little bugs in the code.</div>
      </div>
    ),
  },
];

export function Memes() {
  return (
    <section id="memes" className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-4 text-center font-mono"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-term-accent">## </span>Developer Humor
        </motion.h2>
        <motion.p
          className="text-center text-term-muted font-mono text-sm mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          memes.render({'{'} format: "terminal" {'}'})
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMES.map((meme, index) => (
            <motion.div
              key={meme.title}
              className="terminal-window"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
            >
              <div className="terminal-titlebar">
                <span className="terminal-dot bg-red-500/70" />
                <span className="terminal-dot bg-yellow-500/70" />
                <span className="terminal-dot bg-term-accent/70" />
                <span className="ml-3 text-xs text-term-muted font-mono">{meme.title}</span>
              </div>
              <div className="p-5 font-mono text-sm text-term-text">{meme.body}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
