import { all, put, takeLatest } from 'redux-saga/effects'
import { addNotifications } from '../../components/Toaster/ToasterSlice'
import { TOASTER_VARIANT } from '../../components/Toaster/constants'
import dashboardDataService from '../../services/DashboardService'
import { dashboardActions } from '../slices/dashboardSlice'

interface DashboardPayload {
  type: string
  payload: any
  [key: string]: any
}

// Action types
const DASHBOARD_TYPES = {
    GETDASHBOARDDATA: 'DASHBOARD/GET_DASHBOARD_DATA',
} as const

// Action creators
export const dashboardSagaActions = {
  getDashboardData: (payload: any): DashboardPayload => ({
    type: DASHBOARD_TYPES.GETDASHBOARDDATA,
    payload
  }),
}

// Dashboard saga
function* getDashboardDataAsync(_action: DashboardPayload): Generator<any, void, any> {
  yield put(dashboardActions.setDashboardLoading(true))

  try {
    const response = yield dashboardDataService.getDashboardData()

    if (response.status === 200 || response.status === 201) {
      const organizationData = response.data
      
      // Set dashboard data directly from API response
      yield put(dashboardActions.setDashboardData(organizationData))
      
      // Show success toast notification
      yield put(addNotifications({ 
        message: 'Organization data loaded successfully', 
        variant: TOASTER_VARIANT.SUCCESS 
      }))
    } else {
      throw new Error('Failed to fetch organization data')
    }
  } catch (error: any) {
    
    const errorMessage = error?.response?.data?.message || 'Failed to load organization data. Please try again.'
    
    // Set error state
    yield put(dashboardActions.setDashboardError(errorMessage))
    
    // Show error toast notification
    yield put(addNotifications({ 
      message: errorMessage, 
      variant: TOASTER_VARIANT.ERROR 
    }))
  }
}

// Root saga
export function* dashboardRootSaga() {
  yield all([
    takeLatest(DASHBOARD_TYPES.GETDASHBOARDDATA, getDashboardDataAsync)
  ])
} 