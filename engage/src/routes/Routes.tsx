import React from 'react'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Main from '../pages/Main'
import { Navigate } from 'react-router-dom'

interface Route {
  path: string
  component: React.ReactElement
}

const AppRoutes: Route[] = [
  { path: '/login', component: <Login /> },
  { path: '/signup', component: <Signup /> },
  { path: '/dashboard/*', component: <Main /> },
  { path: '/customer/*', component: <Main /> },
  { path: '/transactions/*', component: <Main /> },
  { path: '/merchant/*', component: <Main /> },
  { path: '/reports/*', component: <Main /> },
  { path: '/analytics/*', component: <Main /> },
  { path: '/compliance/*', component: <Main /> },
  { path: '/messages/*', component: <Main /> },
  { path: '/users/*', component: <Main /> },
  { path: '/settings/*', component: <Main /> },
  { path: '/profile/*', component: <Main /> },
  { path: '/change-password/*', component: <Main /> },
  { path: '/', component: <Navigate to="/login" /> },
  { path: '/*', component: <Navigate to="/login" /> },
]

export default AppRoutes 