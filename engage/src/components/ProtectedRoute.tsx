import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { RootState } from '../types'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth || { isAuthenticated: false, user: null })
  const location = useLocation()

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If no role restrictions, allow access
  if (!allowedRoles || allowedRoles.length === 0) {
    return <>{children}</>
  }

  // Check if user has required role
  const userRole = user?.role
  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>
  }

  // If user doesn't have required role, redirect to dashboard
  return <Navigate to="/dashboard" replace />
}

export default ProtectedRoute 