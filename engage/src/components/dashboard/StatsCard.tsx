import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, value, label }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 shadow">
    <span className="bg-blue-100 p-2 rounded-lg">
      {icon}
    </span>
    <div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  </div>
);

export default StatsCard; 