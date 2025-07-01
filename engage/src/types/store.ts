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

// Action types
export interface Action {
  type: string
  payload?: any
} 