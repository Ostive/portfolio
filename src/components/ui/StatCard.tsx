import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  variants?: Variants;
}

export function StatCard({ icon: Icon, label, value, variants }: StatCardProps) {
  return (
    <motion.div
      className="bg-term-surface border border-term-border rounded-sm p-6 text-center transition-colors duration-150 hover:border-term-accent/50"
      variants={variants}
    >
      <div className="inline-flex p-3 border border-term-border rounded-sm mb-4">
        <Icon className="w-5 h-5 text-term-accent" />
      </div>
      <div className="text-3xl font-bold font-mono mb-2 text-term-accent">{value}</div>
      <div className="text-term-muted font-mono text-sm">{label}</div>
    </motion.div>
  );
}
