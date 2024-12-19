import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <div className="inline-flex p-3 bg-gray-700 rounded-lg mb-4">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}