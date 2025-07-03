import type { ReactElement } from 'react'

export interface Route {
  path: string
  component: ReactElement
}

export interface Notification {
  id: string
  message: string
  variant: 'success' | 'error' | 'warning' | 'info'
}

export interface ToasterState {
  notifications: Notification[]
}

// User interface
export interface User {
  id?: string
  email: string
  firstName?: string
  lastName?: string
  role?: string
  organizationName?: string
}

// Root state type
export interface RootState {
  auth?: {
    isAuthenticated: boolean
    user: User | null
    loginLoadingState: {
      state: 'READY' | 'LOADING'
      message: string
    }
    showErrorMessage: string | false
    showSuccessMessage: string | false
    navigationPath: string | null
    registrationDetails: {
      data: unknown
      loading: boolean
      error: string | null
    }
  }
  main?: Record<string, unknown>
  toaster?: {
    notifications: Array<{
      id: string
      message: string
      variant: 'success' | 'error' | 'warning' | 'info'
    }>
  }
  dashboard?: Record<string, unknown>
}

// App dispatch type
export type AppDispatch = (action: { type: string; payload?: unknown }) => void

// Action types
export interface Action {
  type: string
  payload?: unknown
}

// Re-export store types
export * from './store' 