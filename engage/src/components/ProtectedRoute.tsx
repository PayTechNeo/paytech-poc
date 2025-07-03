import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../types'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
}

export function ProtectedRoute({ children, requiredRoles = [] }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth || { user: null, isAuthenticated: false })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
    } else if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role || '')) {
      navigate('/unauthorized')
    }
  }, [isAuthenticated, user, navigate, location, requiredRoles])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role || '')) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute 