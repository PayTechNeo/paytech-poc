import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import DataService from '../services/utils/dataservice/DataService';
import DashboardLayout from '../components/Layout/DashboardLayout';
import DashboardPage from './dashboard/Dashboard';
import UsersPage from './Users/UsersPage';
import CreateUserPage from './Users/CreateUserPage';

const Main: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	// Debug logging
	console.log('Main component - Current location:', location.pathname)

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
	}, [navigate])

	if (!isAuthenticated) {
		return <div className='text-center'>Loading...</div>
	}

	return (
		<div className="w-full min-h-screen bg-gray-50">
			<Routes>
				<Route path="/" element={<DashboardLayout />}>
					<Route index element={<DashboardPage />} />
					<Route path="dashboard" element={<DashboardPage />} />
					<Route path="customer" element={<div className="p-6"><h1 className="text-2xl font-bold">Customer</h1></div>} />
					<Route path="transactions" element={<div className="p-6"><h1 className="text-2xl font-bold">Transactions</h1></div>} />
					<Route path="merchant" element={<div className="p-6"><h1 className="text-2xl font-bold">Merchant</h1></div>} />
					<Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports</h1></div>} />
					<Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1></div>} />
					<Route path="compliance" element={<div className="p-6"><h1 className="text-2xl font-bold">Compliance</h1></div>} />
					<Route path="messages" element={<div className="p-6"><h1 className="text-2xl font-bold">Messages</h1></div>} />
					<Route path="users" element={<UsersPage />} />
					<Route path="users/create" element={<CreateUserPage />} />
					<Route path="users/edit/:id" element={<CreateUserPage />} />
					<Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1></div>} />
				</Route>
			</Routes>
		</div>
	);
};

export default Main; 