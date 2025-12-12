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
      className="bg-gray-800 p-6 rounded-lg text-center"
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="inline-flex p-3 bg-gray-700 rounded-lg mb-4">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </motion.div>
  );
}