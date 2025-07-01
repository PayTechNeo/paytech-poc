'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { hasRouteAccess } from '@/utils/auth'

export function ProtectedRoute({ children, requiredRoles = [] }) {
  const { user, loading } = useSelector((state) => state.auth)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      } else if (requiredRoles.length > 0 && !hasRouteAccess(user.role, pathname)) {
        router.push('/unauthorized')
      }
    }
  }, [user, loading, router, pathname, requiredRoles])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!user || (requiredRoles.length > 0 && !hasRouteAccess(user.role, pathname))) {
    return null
  }

  return children
} 