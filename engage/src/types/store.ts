// User interface
export interface User {
  id?: string
  email: string
  firstName?: string
  lastName?: string
  role?: string
  organizationName?: string
}

// Action types
export interface Action {
  type: string
  payload?: unknown
} 