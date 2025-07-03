import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { dashboardSagaActions } from '../../store/sagas/dashboardSaga';
import DashboardHeader from './DashboardHeader';
import RecommendationsCard from './RecommendationsCard';
import ProductsCard from './ProductsCard';
import StatsCard from './StatsCard';
import CardPieChart from '../../components/charts/CardPieChart';
import FinanceLineChart from '../../components/charts/FinanceLineChart';
import PerformanceStatusCard from './PerformanceStatusCard';
import { 
  CurrencyDollarIcon, 
  LockClosedIcon,
  BuildingOfficeIcon,
  HashtagIcon
} from '@heroicons/react/24/outline';

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
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      position: 'top' as const,
      labels: {
        boxWidth: 12,
        padding: 10,
        font: {
          size: 12
        }
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(tickValue: string | number) {
          return `€${tickValue}`;
        },
        font: {
          size: 11
        }
      }
    },
    x: {
      ticks: {
        font: {
          size: 11
        }
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

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { data: organizationData, loading, error } = useSelector((state: RootState) => state.dashboard);
  useEffect(() => {
    // Fetch organization data when component mounts
    dispatch(dashboardSagaActions.getDashboardData({}));
  }, [dispatch]);

  // Show loading state
  if (loading) {
    return (
      <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Show empty state if no data
  if (!organizationData) {
    return (
      <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600">No organization data available</p>
        </div>
      </div>
    );
  }

  const recommendations = organizationData.recommendation || [];

  const productsWithIcons = (organizationData.products || []).map((product) => ({
    name: typeof product === 'string' ? product : product.name,
    icon: <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />
  }));

  // Organization stats
  const stats = [
    { 
      label: 'Average Balance', 
      value: organizationData?.averageBalance ? `$${organizationData.averageBalance.toLocaleString()}` : 'N/A', 
      icon: <HashtagIcon className="h-5 w-5 text-blue-600" /> 
    },
    { 
      label: 'Average Income', 
      value: organizationData?.averageIncome ? `$${organizationData.averageIncome.toLocaleString()}` : 'N/A', 
      icon: <LockClosedIcon className="h-5 w-5 text-green-500" /> 
    },
    { 
      label: 'Average Expense', 
      value: organizationData?.averageExpenses ? `$${organizationData.averageExpenses.toLocaleString()}` : 'N/A', 
      icon: <CurrencyDollarIcon className="h-5 w-5 text-purple-600" /> 
    },
    { 
      label: 'End-Of-Month', 
      value: organizationData?.averageEoM ? `$${organizationData.averageEoM.toLocaleString()}` : 'N/A', 
      icon: <BuildingOfficeIcon className="h-5 w-5 text-blue-600" /> 
    }
  ];

  // Organization performance status

  const healthReport = {
    title: 'Performance Status',
    description: organizationData?.healthReport || '',
    strengths: organizationData?.healthGoodPart || '',
    concerns: organizationData?.healthBadPart || '',
    healthScore: organizationData?.healthScore,
  };

  return (
    <div className='flex flex-col lg:flex-row gap-4 justify-between h-full mt-4'>
      <div className='w-full lg:w-1/2'> 
        <div>
          <DashboardHeader
                name={organizationData?.name || ''}
                website={organizationData?.website || ''}
                description={organizationData?.description || ''}
                onSalesforceClick={() => window.open('https://salesforce.com', '_blank')}
          />
        </div>
        <div>
        <div className="">
           <RecommendationsCard recommendation={recommendations} />
        </div>
        <div className='bg-white rounded-lg shadow p-4 mt-4'>
          <FinanceLineChart data={financesData} options={financesOptions} />
        </div>
        </div>
      </div>
      <div className='w-full lg:w-1/2'>
        <div>
          <ProductsCard products={productsWithIcons} />
        </div>
        <div className='flex flex-row flex-wrap gap-4 mt-4 w-full justify-between'>
          {stats.map((stat, idx) => (
            <StatsCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
        <div className='flex flex-row gap-4 mt-4'>
          <div className="w-1/2">
            <CardPieChart data={pieData} title="Card Usage" />
          </div>
          <div className="w-1/2">
            <CardPieChart data={pieData} title="Spend statistics" />
          </div>
        </div>
        <div className='mt-4'>
          <PerformanceStatusCard {...healthReport} />
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard; 