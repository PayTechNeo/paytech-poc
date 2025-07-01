import { all, put, takeLatest, call } from 'redux-saga/effects'
import { usersActions } from '../slices/usersSlice'
import { authActions } from '../slices/authSlice'
import usersDataService from '../../services/usersDataService'
import { addNotifications } from '../../components/Toaster/ToasterSlice'
import { TOASTER_VARIANT } from '../../components/Toaster/constants'

// Types
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  organization: string
  department: string
  status: string
}

interface CreateUserPayload {
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
  organization?: string
  department?: string
}

interface UpdateUserPayload extends CreateUserPayload {
  id: string
}

interface DeleteUserPayload {
  id: string
}

interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Action Types
const USER_TYPES = {
  GET_ALL_USERS: 'USERS/GET_ALL_USERS',
  CREATE_USER: 'USERS/CREATE_USER',
  UPDATE_USER: 'USERS/UPDATE_USER',
  DELETE_USER: 'USERS/DELETE_USER',
  GET_LOGGED_IN_USER_INFO: 'USERS/GET_LOGGED_IN_USER_INFO',
  EDIT_LOGGED_IN_USER_INFO: 'USERS/EDIT_LOGGED_IN_USER_INFO',
  POST_CHANGE_PASSWORD: 'USERS/POST_CHANGE_PASSWORD'
} as const

// Action Creators
export const userSagaActions = {
  getAllUsers: (payload?: any) => ({
    type: USER_TYPES.GET_ALL_USERS,
    payload
  }),
  createUser: (payload: CreateUserPayload) => ({
    type: USER_TYPES.CREATE_USER,
    payload
  }),
  updateUser: (payload: UpdateUserPayload) => ({
    type: USER_TYPES.UPDATE_USER,
    payload
  }),
  deleteUser: (payload: DeleteUserPayload) => ({
    type: USER_TYPES.DELETE_USER,
    payload
  }),
  getLoggedInUserInfo: () => ({
    type: USER_TYPES.GET_LOGGED_IN_USER_INFO,
    payload: {}
  }),
  editLoggedInUserInfo: (payload: UpdateUserPayload) => ({
    type: USER_TYPES.EDIT_LOGGED_IN_USER_INFO,
    payload
  }),
  postChangePassword: (payload: ChangePasswordPayload) => ({
    type: USER_TYPES.POST_CHANGE_PASSWORD,
    payload
  })
}

// Sagas
function* getAllUsersAsync() {
  yield put(usersActions.setLoginLoadingState({ state: 'LOADING', message: 'Loading...' }))
  
  try {
    const response: { data: User[] } = yield call(usersDataService.getAllUsers)
    yield put(usersActions.setAllUsers(response?.data || []))
   
  } catch (error: any) {
    console.log("err", error)
    // Set empty array on error
    yield put(usersActions.setAllUsers([]))
    yield put(addNotifications({ 
      message: error?.response?.data?.message || 'Failed to load users', 
      variant: TOASTER_VARIANT.ERROR 
    }))
  } finally {
    yield put(usersActions.setLoginLoadingState({ state: 'READY', message: "" }))
  }
}

function* postCreateUserAsync(action: any) {
 
  
  yield put(usersActions.setLoginLoadingState({ state: 'LOADING', message: 'Loading...' }))
  
  try {
    const response: { data: User[], status: number } = yield call(usersDataService.createUser, action.payload)
    if(response.status === 201){
      yield call(getAllUsersAsync)
      yield put(addNotifications({ 
        message: 'User created successfully', 
        variant: TOASTER_VARIANT.SUCCESS 
      }))
    }
    
  } catch (error: any) {
    console.log("err", error)
    yield put(addNotifications({ 
      message: error?.response?.data?.message || 'Failed to create user', 
      variant: TOASTER_VARIANT.ERROR 
    }))
  } finally {
    yield put(usersActions.setLoginLoadingState({ state: 'READY', message: "" }))
  }
}

function* updateUserAsync(action: any) {
  
  
  yield put(usersActions.setLoginLoadingState({ state: 'LOADING', message: 'Updating user...' }))
  
  try {
    const response: { data: User[], status: number } = yield call(usersDataService.updateUser, action.payload)
    if(response.status === 200){
      yield call(getAllUsersAsync)
      yield put(addNotifications({ 
        message: 'User updated successfully', 
        variant: TOASTER_VARIANT.SUCCESS 
      }))
    }
   
  } catch (error: any) {
    console.log("err", error)
    yield put(addNotifications({ 
      message: error?.response?.data?.message || 'Failed to update user', 
      variant: TOASTER_VARIANT.ERROR 
    }))
  } finally {
    yield put(usersActions.setLoginLoadingState({ state: 'READY', message: "" }))
  }
}

function* deleteUserAsync(action: any) {
  
  yield put(usersActions.setLoginLoadingState({ state: 'LOADING', message: 'Deleting user...' }))
  
  try {
    const response: { data: any } = yield call(usersDataService.deleteUser, action.payload.id)
    yield put(addNotifications({ 
      message: 'User deleted successfully', 
      variant: TOASTER_VARIANT.SUCCESS 
    }))
    yield call(getAllUsersAsync)
    console.log("Delete response:", response)
  } catch (error) {
    console.log("Delete error:", error)
  } finally {
    yield put(usersActions.setLoginLoadingState({ state: 'READY', message: "" }))
  }
}

function* getLoggedInUserInfoAsync() {
  yield put(usersActions.setLoginLoadingState({ state: 'LOADING', message: 'Loading...' }))
  try {
    const response: { data: User } = yield call(usersDataService.getLoggedinUsersInfo)
    console.log("dffffff",response);
    
    yield put(usersActions.setLoggedInUserInfo(response?.data))
  } catch (error: any) {
    console.log("err", error)
    yield put(addNotifications({ 
      message: error?.response?.data?.message || 'Failed to get logged in user info', 
      variant: TOASTER_VARIANT.ERROR 
    }))
  } finally { 
    yield put(usersActions.setLoginLoadingState({ state: 'READY', message: "" }))
  }
}

function* editLoggedInUserInfoAsync(action: any) {
  yield put(usersActions.setLoginLoadingState({ state: 'LOADING', message: 'Updating user...' }))
  try {
    const response: { data: User } = yield call(usersDataService.editLoggedinUsersInfo, action.payload)
    yield put(usersActions.setLoggedInUserInfo(response?.data))
    yield put(addNotifications({ 
        message: 'User updated successfully', 
        variant: TOASTER_VARIANT.SUCCESS 
      }))
  } catch (error: any) {
    console.log("err", error)
    yield put(addNotifications({ 
      message: error?.response?.data?.message || 'Failed to update logged in user info', 
      variant: TOASTER_VARIANT.ERROR 
    }))
  } finally {
    yield put(usersActions.setLoginLoadingState({ state: 'READY', message: "" }))
  }
}               

function* changePasswordAsync(action: any) {
  yield put(usersActions.setLoginLoadingState({ state: 'LOADING', message: 'Changing password...' }))
  try {
    const response: { data: any, status: number } = yield call(usersDataService.changePassword, action.payload)
    console.log('Change password response:', response) // Debug log
    
    if(response.status === 201){
      yield put(addNotifications({ 
        message: 'Password changed successfully', 
        variant: TOASTER_VARIANT.SUCCESS 
      }))
      
      // Clear authentication state since user needs to login with new password
      yield put(authActions.setAuthenticated(false))
      yield put(authActions.setUser(null))
      
      // Clear token from localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Set navigation path to login after successful password change
      yield put(authActions.setNavigationPath('/login'))
    }
  } catch (error: any) {
    console.log("err", error)
    yield put(addNotifications({ 
      message: error?.response?.data?.message || 'Failed to change password', 
      variant: TOASTER_VARIANT.ERROR 
    }))
  } finally {
    yield put(usersActions.setLoginLoadingState({ state: 'READY', message: "" }))
  }
}

export function* rootSaga() {
  yield all([
    takeLatest(USER_TYPES.GET_ALL_USERS, getAllUsersAsync),
    takeLatest(USER_TYPES.CREATE_USER, postCreateUserAsync),
    takeLatest(USER_TYPES.UPDATE_USER, updateUserAsync),
    takeLatest(USER_TYPES.DELETE_USER, deleteUserAsync),
    takeLatest(USER_TYPES.GET_LOGGED_IN_USER_INFO, getLoggedInUserInfoAsync),
    takeLatest(USER_TYPES.EDIT_LOGGED_IN_USER_INFO, editLoggedInUserInfoAsync),
    takeLatest(USER_TYPES.POST_CHANGE_PASSWORD, changePasswordAsync)
  ])
} 