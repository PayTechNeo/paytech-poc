import React, { useEffect, useState } from 'react';
import Table from '../../components/table/Table';
import type { Column } from '../../components/table/types';
import { 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
  joinDate: string;
  totalSpent: number;
}

const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc',
    status: 'active',
    joinDate: '2024-01-15',
    totalSpent: 12500
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 234-5678',
    company: 'Global Enterprises',
    status: 'active',
    joinDate: '2024-02-20',
    totalSpent: 8900
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 345-6789',
    company: 'Innovation Corp',
    status: 'inactive',
    joinDate: '2023-11-10',
    totalSpent: 5600
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 456-7890',
    company: 'Digital Dynamics',
    status: 'active',
    joinDate: '2024-03-05',
    totalSpent: 15200
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 567-8901',
    company: 'Future Systems',
    status: 'inactive',
    joinDate: '2023-09-18',
    totalSpent: 7800
  }
];

const CustomersPage: React.FC = () => {
  console.log('CustomersPage component is rendering');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setCustomers(sampleCustomers);
      setTotalCount(sampleCustomers.length);
      setLoading(false);
    }, 500);
  }, []);

  const handleViewCustomer = (customer: Customer) => {
    console.log('View customer:', customer);
    // Navigate to customer details page
  };

  const handleEditCustomer = (customer: Customer) => {
    console.log('Edit customer:', customer);
    // Navigate to edit customer page
  };

  const handleDeleteCustomer = (customer: Customer) => {
    console.log('Delete customer:', customer);
    // Show confirmation dialog and delete customer
  };

  const columns: Column[] = [
    {
      field: 'name',
      label: 'Customer Name',
      renderLogic: (row: Customer) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{row.name}</span>
          <span className="text-sm text-gray-500">{row.company}</span>
        </div>
      )
    },
    {
      field: 'email',
      label: 'Email',
      renderLogic: (row: Customer) => (
        <span className="text-gray-900">{row.email}</span>
      )
    },
    {
      field: 'phone',
      label: 'Phone',
      renderLogic: (row: Customer) => (
        <span className="text-gray-900">{row.phone}</span>
      )
    },
    {
      field: 'status',
      label: 'Status',
      renderLogic: (row: Customer) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {row.status === 'active' ? (
            <CheckCircleIcon className="w-4 h-4 mr-1" />
          ) : (
            <XCircleIcon className="w-4 h-4 mr-1" />
          )}
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )
    },
    {
      field: 'joinDate',
      label: 'Join Date',
      renderLogic: (row: Customer) => (
        <span className="text-gray-900">
          {new Date(row.joinDate).toLocaleDateString()}
        </span>
      )
    },
    {
      field: 'totalSpent',
      label: 'Total Spent',
      renderLogic: (row: Customer) => (
        <span className="text-gray-900 font-medium">
          ${row.totalSpent.toLocaleString()}
        </span>
      )
    },
    {
      field: 'actions',
      label: 'Actions',
      renderLogic: (row: Customer) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewCustomer(row)}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
            title="View customer"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEditCustomer(row)}
            className="p-1 text-green-600 hover:text-green-800 transition-colors"
            title="Edit customer"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteCustomer(row)}
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
            title="Delete customer"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        DEBUG: CustomersPage is rendering! Current time: {new Date().toLocaleTimeString()}
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage your customer relationships and view customer information</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Customer List</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Add Customer
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <Table
            coloumns={columns}
            rows={customers}
            variant="md"
            paginationProps={{
              isPagination: true,
              totalCount,
              limit,
              onPageChange: () => {}
            }}
            selectProps={{
              isSelectable: true,
              isSelectAll: false,
              onSelectAll: () => {},
              onSelectRowsCb: (selectedRows) => {
                console.log('Selected rows:', selectedRows);
              },
              selectIdentifier: 'id'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersPage; 