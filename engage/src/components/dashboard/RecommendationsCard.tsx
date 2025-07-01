import React from 'react';

interface RecommendationsCardProps {
  recommendations: { title: string; description: string }[];
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ recommendations }) => (
  <div className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="font-semibold mb-2">Actionable recommendations:</h2>
    <ol className="list-decimal ml-5 text-gray-700">
      {recommendations.map((rec, idx) => (
        <li key={idx} className="mb-2">
          <span className="font-bold">{rec.title}</span> {rec.description}
        </li>
      ))}
    </ol>
  </div>
);

export default RecommendationsCard; 