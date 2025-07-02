import React from 'react';

interface RecommendationsCardProps {
  recommendation: { title: string; description: string }[];
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ recommendation }) => (
  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
    <h2 className="font-semibold mb-2 sm:mb-4 text-sm sm:text-base">Actionable recommendations:</h2>
    <ol className="list-decimal ml-4 sm:ml-5 text-gray-700 space-y-2 sm:space-y-3">
      {recommendation.map((rec, idx) => (
        <li key={idx} className="text-sm sm:text-base leading-relaxed">
          <span className="font-bold">{rec.title}</span> {rec.description}
        </li>
      ))}
    </ol>
  </div>
);

export default RecommendationsCard; 