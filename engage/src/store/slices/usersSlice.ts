import { createSlice } from '@reduxjs/toolkit'

// Types
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  organization: string
  department: string
  status?: string
  // tenant: string
}

interface LoadingState {
  state: 'READY' | 'LOADING'
  message: string
}

interface UsersState {
  loginLoadingState: LoadingState
  allUsers: User[]
  showErrorMessage?: boolean
  showSuccessMessage?: boolean
  navigationPath?: string | null
  isAuthenticated?: boolean
  loggedInUserInfo?: User
}

// Initial state
const initialState: UsersState = {
  loginLoadingState: {
    state: 'READY',
    message: ''
  },
  allUsers: []
}

// Create slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoginLoadingState: (state, action) => {
      state.loginLoadingState = action.payload
    },
    setShowErrorMessage: (state, action) => {
      state.showErrorMessage = action.payload
    },
    setShowSuccessMessage: (state, action) => {
      state.showSuccessMessage = action.payload
    },
    setNavigationPath: (state, action) => {
      state.navigationPath = action.payload
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload
    },
    setLoggedInUserInfo: (state, action) => {
      state.loggedInUserInfo = action.payload
    },
  }
})

// Export actions
export const usersActions = usersSlice.actions

// Export reducer
export default usersSlice.reducer 