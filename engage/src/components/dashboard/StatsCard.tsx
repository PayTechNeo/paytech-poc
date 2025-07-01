import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, value, label }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 flex items-center gap-2 sm:gap-3 shadow hover:shadow-md transition-shadow duration-200">
    <span className="bg-blue-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      <div className="text-lg sm:text-xl font-bold text-gray-900 truncate">{value}</div>
      <div className="text-xs text-gray-500 truncate">{label}</div>
    </div>
  </div>
);

export default StatsCard; 