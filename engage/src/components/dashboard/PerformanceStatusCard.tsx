import React from 'react';

interface PerformanceStatusCardProps {
  title: string;
  description: string;
  strengths: string;
  concerns: string;
}

const PerformanceStatusCard: React.FC<PerformanceStatusCardProps> = ({ title, description, strengths, concerns }) => (
  <div className="bg-white rounded-lg shadow p-6 border-l-8 border-yellow-400">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="mb-2 text-gray-700">{description}</p>
    <div className="mb-1">
      <span className="font-bold">Strengths:</span> {strengths}
    </div>
    <div>
      <span className="font-bold">Concerns:</span> {concerns}
    </div>
  </div>
);

export default PerformanceStatusCard; 