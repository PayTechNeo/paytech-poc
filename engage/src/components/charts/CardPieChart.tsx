import React from 'react';
import { Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

interface CardPieChartProps {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
  title?: string;
}

const CardPieChart: React.FC<CardPieChartProps> = ({ data, options, title }) => {
  const defaultOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 18,
          padding: 8,
          font: {
            size: 11
          },

        }
      },
    }
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-4">
      {title && <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{title}</h4>}
      <div className="h-48 sm:h-56">
        <Pie data={data} options={mergedOptions} />
      </div>
    </div>
  );
};

export default CardPieChart; 