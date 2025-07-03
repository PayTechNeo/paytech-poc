import { createSlice } from '@reduxjs/toolkit'

interface User {
  id?: string
  email: string
  firstName?: string
  lastName?: string
  role?: string
  organizationName?: string
}

interface LoadingState {
  state: 'READY' | 'LOADING'
  message: string
}

interface RegistrationDetails {
  data: unknown
  loading: boolean
  error: string | null
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loginLoadingState: LoadingState
  showErrorMessage: string | false
  showSuccessMessage: string | false
  navigationPath: string | null
  registrationDetails: RegistrationDetails
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loginLoadingState: {
    state: 'READY',
    message: ''
  },
  showErrorMessage: false,
  showSuccessMessage: false,
  navigationPath: null,
  registrationDetails: {
    data: null,
    loading: false,
    error: null
  }
}

// Create slice
const authSlice = createSlice({
  name: 'auth',
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
    setUser: (state, action) => {
      state.user = action.payload
    },
    setRegistrationDetails: (state, action) => {
      state.registrationDetails = action.payload
    },
    clearAuth: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.loginLoadingState = {
        state: 'READY',
        message: ''
      }
      state.showErrorMessage = false
      state.showSuccessMessage = false
      state.navigationPath = null
      state.registrationDetails = {
        data: null,
        loading: false,
        error: null
      }
    }
  }
})

// Export actions
export const authActions = authSlice.actions

// Export reducer
export default authSlice.reducer 