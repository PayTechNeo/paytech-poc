import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import DataService from '../services/utils/dataservice/DataService';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardPage from './dashboard/Dashboard';
import SimpleCustomersPage from './Customers/SimpleCustomersPage';

// Layout wrapper component
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="h-screen flex flex-col overflow-hidden bg-gray-100">
			{/* Top Navbar */}
			<Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
			
			{/* Main content area with sidebar and page content */}
			<div className="flex-1 flex overflow-hidden">
				{/* Sidebar */}
				<Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

				{/* Page content */}
				<main className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6">
					{children}
				</main>
			</div>
		</div>
	);
};

const Main: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	// Debug logging
	console.log('Main component - Current location:', location.pathname)
	console.log('Main component - Current pathname segments:', location.pathname.split('/'))
	console.log('Main component - All routes:', [
		'/', 'dashboard', 'customer', 'customer-test', 'transactions', 'merchant', 'reports', 'analytics', 'compliance', 'messages'
	])

	useEffect(() => {
		// axios request interceptor
		axios.interceptors.request.use(function (response) {
			// Add loading state for non-whitelisted URLs
			dispatch({ type: 'main/setLoadingState', payload: true })
			return response;
		}, function (error) {
			dispatch({ type: 'main/setLoadingState', payload: false });
			return Promise.reject(error);
		});

		// axios response interceptor
		axios.interceptors.response.use(function (response) {
			dispatch({ type: 'main/setLoadingState', payload: false })
			return response;
		}, function (error) {
			dispatch({ type: 'main/setLoadingState', payload: false });
			if (error.response && error.response.status === 401) {
				localStorage.removeItem('token')
				localStorage.removeItem('user')
				dispatch({ type: 'auth/setAuthenticated', payload: false })
				navigate("/login")
			}
			return Promise.reject(error);
		});
	}, [dispatch, navigate])

	useEffect(() => {
		const token = DataService.getToken()
		setIsAuthenticated(!!token)

		if (!token) {
			navigate("/login")
		}
	}, [navigate, dispatch])

	if (!isAuthenticated) {
		return <div className='text-center'>Loading...</div>
	}

	// Function to render the appropriate component based on the current path
	const renderComponent = () => {
		const pathname = location.pathname;
		
		switch (pathname) {
			case '/dashboard':
				return <DashboardPage />;
			case '/customer':
				return <SimpleCustomersPage />;
			case '/transactions':
				return <div className="p-6"><h1 className="text-2xl font-bold">Transactions</h1></div>;
			case '/merchant':
				return <div className="p-6"><h1 className="text-2xl font-bold">Merchant</h1></div>;
			case '/reports':
				return <div className="p-6"><h1 className="text-2xl font-bold">Reports</h1></div>;
			case '/analytics':
				return <div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1></div>;
			case '/compliance':
				return <div className="p-6"><h1 className="text-2xl font-bold">Compliance</h1></div>;
			case '/messages':
				return <div className="p-6"><h1 className="text-2xl font-bold">Messages</h1></div>;
			default:
				return <DashboardPage />;
		}
	};

	return (
		<LayoutWrapper>
			{renderComponent()}
		</LayoutWrapper>
	);
};

export default Main; 