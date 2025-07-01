import React from 'react';
import { Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

interface CardPieChartProps {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
  title?: string;
}

const CardPieChart: React.FC<CardPieChartProps> = ({ data, options, title }) => (
  <div className="bg-white rounded-lg shadow p-4">
    {title && <h4 className="font-semibold mb-2">{title}</h4>}
    <Pie data={data} options={options} />
  </div>
);

export default CardPieChart; 