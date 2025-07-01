import { all, put, takeLatest } from 'redux-saga/effects'
import AuthDataService from '../../services/AuthDataService'
import { addNotifications } from '../../components/Toaster/ToasterSlice'
import { TOASTER_VARIANT } from '../../components/Toaster/constants'
import { userSagaActions } from './usersSaga'

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  values: {
    firstName: string
    lastName: string
    email: string
    password: string
    organizationName: string
  }
  userAgent?: string
  ipAddress?: string
}

interface LoginAction {
  type: string
  payload: LoginPayload
}

interface RegisterAction {
  type: string
  payload: RegisterPayload
}

interface RouteChangeAction {
  type: string
}

interface NavigateAction {
  type: string
  payload: string
}

// Action types
const AUTH_TYPES = {
  REGISTER: 'AUTH/REGISTER',
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT',
  REGISTER_VERIFICATION: 'AUTH/REGISTER-VERIFICATION',
  REGISTER_RESEND_VERIFICATION: 'AUTH/REGISTER-RESEND_VERIFICATION',
  ROUTE_CHANGE: 'AUTH/ROUTE_CHANGE',
  NAVIGATE: 'AUTH/NAVIGATE'
} as const

// Action creators
export const authSagaActions = {
  register: (payload: RegisterPayload): RegisterAction => ({
    type: AUTH_TYPES.REGISTER,
    payload
  }),
  login: (payload: LoginPayload): LoginAction => ({
    type: AUTH_TYPES.LOGIN,
    payload
  }),
  logout: () => ({
    type: AUTH_TYPES.LOGOUT
  }),
  // registerVerification: (payload: any) => ({
  //   type: AUTH_TYPES.REGISTER_VERIFICATION,
  //   payload
  // }),
  // registerResendVerification: (payload: any) => ({
  //   type: AUTH_TYPES.REGISTER_RESEND_VERIFICATION,
  //   payload
  // }),
  routeChange: (): RouteChangeAction => ({
    type: AUTH_TYPES.ROUTE_CHANGE
  }),
  navigate: (path: string): NavigateAction => ({
    type: AUTH_TYPES.NAVIGATE,
    payload: path
  })
}

// Registration saga
function* registerAsync(action: RegisterAction): Generator<any, void, any> {
  yield put({ type: 'auth/setLoginLoadingState', payload: { state: 'LOADING', message: 'Loading...' } })

  try {
    const { values, userAgent, ipAddress } = action.payload
   
    
    const response = yield AuthDataService.register(values, userAgent, ipAddress)
   

    if (response.status === 201) {
      // Set registration details
      yield put({ type: 'auth/setRegistrationDetails', payload: {data: response.data,loading: false,error: null} })
      
      // Show success message
      yield put({ type: 'auth/setShowSuccessMessage', payload: response?.data?.response?.data?.message || 'Registration successful!' })
      yield put({ type: 'auth/setShowErrorMessage', payload: false })
      
      // Show success toast notification
      yield put(addNotifications({ 
        message: response?.data?.response?.data?.message || 'Registration successful! Please check your email for verification.', 
        variant: TOASTER_VARIANT.SUCCESS 
      }))
      
      // Set navigation path to login
      yield put({ type: 'auth/setNavigationPath', payload: '/login' })
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Show error message
    yield put({ type: 'auth/setShowErrorMessage', payload: error?.response?.data?.message || 'Registration failed. Please try again.' })
    
    // Show error toast notification
    yield put(addNotifications({ 
      message: error?.response?.data?.message || 'Registration failed. Please try again.', 
      variant: TOASTER_VARIANT.ERROR 
    }))

    yield put({ type: 'auth/setRegistrationDetails', payload: {
      data: null,
      loading: false,
      error: error.message
    }})
  } finally {
    yield put({ type: 'auth/setLoginLoadingState', payload: { state: 'READY', message: '' } })
  }
}

// Login saga
function* loginAsync(action: LoginAction): Generator<any, void, any> {
  yield put({ type: 'auth/setLoginLoadingState', payload: { state: 'LOADING', message: 'Loading...' } })

  try {
    const response = yield AuthDataService.login(action.payload)
   

    if (response.data) {
      // Store token
      const token = response.data.access_token
      localStorage.setItem('token', token)

      // Store user data if available
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        yield put({ type: 'auth/setUser', payload: response.data.user })
      }

      // Update Redux store
      yield put({ type: 'auth/setAuthenticated', payload: true })
      yield put({ type: 'auth/setShowErrorMessage', payload: null })
      
      // Show success toast notification
      yield put(addNotifications({ 
        message: 'Login successful! Welcome back.', 
        variant: TOASTER_VARIANT.SUCCESS 
      }))
      
      // Get logged in user info after successful login
      yield put(userSagaActions.getLoggedInUserInfo())
      
      // Set navigation path to dashboard
      yield put({ type: 'auth/setNavigationPath', payload: '/dashboard' })
    }
  } catch (error: any) {
   
    yield put(addNotifications({ 
      message: error?.response?.data?.message || 'Login failed. Please check your credentials.', 
      variant: TOASTER_VARIANT.ERROR 
    }))
    yield put({ type: 'auth/setShowErrorMessage', payload: error?.response?.data?.message || 'Login failed' })
    yield put({ type: 'auth/setAuthenticated', payload: false })
  } finally {
    yield put({ type: 'auth/setLoginLoadingState', payload: { state: 'READY', message: '' } })
  }
}

// function* registerVerificationAsync(): Generator<any, void, any> {
//   try{
//     const response = yield AuthDataService.registerVerification()
//   }catch(error: any){
//     console.log(error);
//   }
// }

// Route change saga
function* routeChangeAsync(): Generator<any, void, any> {
  yield put({ type: 'auth/setShowErrorMessage', payload: false })
  yield put({ type: 'auth/setShowSuccessMessage', payload: false })
}

// Logout saga
function* logoutAsync(): Generator<any, void, any> {
  try {
    // Clear token from localStorage first
    localStorage.removeItem('token')
    
    // Update Redux state
    yield put({ type: 'auth/setAuthenticated', payload: false })
    yield put({ type: 'auth/setNavigationPath', payload: '/login' })
    
    // Call logout API
    yield AuthDataService.logout()
  } catch (error: any) {
    console.error('Logout error:', error)
    // Even if the API call fails, we still want to clear local state
    localStorage.removeItem('token')
    yield put({ type: 'auth/setAuthenticated', payload: false })
    yield put({ type: 'auth/setNavigationPath', payload: '/login' })
  }
}

// Root saga
export function* rootSaga() {
  yield all([
    takeLatest(AUTH_TYPES.REGISTER, registerAsync),
    takeLatest(AUTH_TYPES.LOGIN, loginAsync),
    takeLatest(AUTH_TYPES.LOGOUT, logoutAsync),
    takeLatest(AUTH_TYPES.ROUTE_CHANGE, routeChangeAsync)
  ])
} 