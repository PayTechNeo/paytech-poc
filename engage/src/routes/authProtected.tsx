import React from 'react'
import { Navigate } from 'react-router-dom'

interface AuthProtectedProps {
  children: React.ReactNode
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

interface FullPageRouteProps {
  children: React.ReactNode
}

const FullPageRoute: React.FC<FullPageRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export { AuthProtected, FullPageRoute } 