import React from 'react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import RecommendationsCard from '../../components/dashboard/RecommendationsCard';
import ProductsCard from '../../components/dashboard/ProductsCard';
import StatsCard from '../../components/dashboard/StatsCard';
import CardPieChart from '../../components/charts/CardPieChart';
import FinanceLineChart from '../../components/charts/FinanceLineChart';
import PerformanceStatusCard from '../../components/dashboard/PerformanceStatusCard';
import Logo from '../../assets/images/Logo.png';
import { CurrencyDollarIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const recommendations = [
  {
    title: 'Flexible Line of Credit.',
    description: ' Support liquidity with a pre-approved credit facility that activates when end-of-month balances drop below a set threshold.'
  },
  {
    title: 'Automated Liquidity Optimisation.',
    description: ' Recommend a smart cash sweep tool to automatically transfer surplus funds into a higher-interest account mid-month, maximising yield with zero effort.'
  },
  {
    title: 'Enhanced Card Rewards.',
    description: ' Offer a card upgrade tailored to their spending profile, unlocking better rewards or cashback on frequently used merchant categories.'
  }
];

const products = [
  { name: 'Current Account', icon: <CurrencyDollarIcon className="h-5 w-5 text-green-600" /> },
  { name: '2 Credit Cards', icon: <CreditCardIcon className="h-5 w-5 text-indigo-600" /> }
];

const stats = [
  { label: 'Average balance', value: '€33,596', icon: <CurrencyDollarIcon className="h-5 w-5 text-blue-600" /> },
  { label: 'Average income', value: '€65,854', icon: <CurrencyDollarIcon className="h-5 w-5 text-blue-600" /> },
  { label: 'Average expenses', value: '€41,254', icon: <CurrencyDollarIcon className="h-5 w-5 text-red-500" /> },
  { label: 'End-of-month', value: '€2,525', icon: <LockClosedIcon className="h-5 w-5 text-purple-600" /> }
];

const financesData = {
  labels: ['3 Apr', '4 Apr', '5 Apr', '6 Apr', '7 Apr', '8 Apr'],
  datasets: [
    {
      label: 'Income',
      data: [200, 300, 250, 400, 350, 600],
      borderColor: 'rgba(37, 99, 235, 1)',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      tension: 0.4,
      fill: false,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(37, 99, 235, 1)',
    },
    {
      label: 'Expenses',
      data: [600, 500, 450, 400, 350, 200],
      borderColor: 'rgba(239, 68, 68, 1)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: false,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(239, 68, 68, 1)',
    }
  ]
};

const financesOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: any) => `€${value}`
      }
    }
  }
};

const pieData = {
  labels: ['Produce', 'Butcheries', 'Dairy', 'Eggs & poultry'],
  datasets: [
    {
      data: [40, 25, 20, 15],
      backgroundColor: [
        'rgba(37, 99, 235, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(251, 191, 36, 0.7)',
        'rgba(239, 68, 68, 0.7)'
      ],
      borderWidth: 1
    }
  ]
};

const performanceStatus = {
  title: 'Performance Status',
  description: 'The Little Market shows stable revenue and spending patterns with consistent card usage and tight end-of-month balances. While operationally healthy, their working capital position suggests limited flexibility to absorb unexpected costs or seasonal fluctuations. Card usage indicates a preference for short-term credit to manage operational expenses.',
  strengths: 'Consistent revenue, manageable expenses, active credit usage, and stable account behaviour all indicate a well-run business.',
  concerns: 'The consistently low end-of-month balance suggests limited buffer capacity—putting them at risk during seasonal dips, unexpected costs, or payment delays. An amber status flags them as operationally sound but with a potential cash flow vulnerability worth monitoring—and a great candidate for proactive outreach.'
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <DashboardHeader
        logo={Logo}
        name="The Little Market"
        website="www.thelittlemarket.rs"
        description="Description of service (AI pulled)"
        onSalesforceClick={() => window.open('https://salesforce.com', '_blank')}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <RecommendationsCard recommendations={recommendations} />
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-2">Finances</h3>
            <FinanceLineChart data={financesData} options={financesOptions} />
          </div>
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-6">
          <ProductsCard products={products} />
          <div className="grid grid-cols-2 gap-4 mb-4">
            {stats.map((stat, idx) => (
              <StatsCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <CardPieChart data={pieData} title="Card Usage" />
            <CardPieChart data={pieData} title="Spend Statistics" />
          </div>
          <PerformanceStatusCard {...performanceStatus} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 