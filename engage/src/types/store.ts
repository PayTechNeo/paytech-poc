import type { AppDispatch, RootState } from '../store/store'

// User interface
export interface User {
  id?: string
  email: string
  firstName?: string
  lastName?: string
  role?: string
  organizationName?: string
}

// Users state interface
export interface UsersState {
  loginLoadingState: {
    state: 'READY' | 'LOADING'
    message: string
  }
  allUsers: Array<{
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    organization: string
    department: string
    // tenant: string
  }>
  showErrorMessage?: boolean
  showSuccessMessage?: boolean
  navigationPath?: string | null
  isAuthenticated?: boolean
  loggedInUserInfo?: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    organization: string
    department: string
    status?: string
  }
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
      data: any
      loading: boolean
      error: string | null
    }
  }
  main?: any
  toaster?: {
    notifications: Array<{
      id: string
      message: string
      variant: 'success' | 'error' | 'warning' | 'info'
    }>
  }
  users: UsersState
}

// App dispatch type
export type AppDispatch = (action: any) => void

// Action types
export interface Action {
  type: string
  payload?: any
} 