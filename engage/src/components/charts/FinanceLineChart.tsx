import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

interface FinanceLineChartProps {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

const FinanceLineChart: React.FC<FinanceLineChartProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default FinanceLineChart;