import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import authReducer from './slices/authSlice'
import toasterReducer from '../components/Toaster/ToasterSlice'
import mainReducer from './slices/mainSlice'
import dashboardReducer from './slices/dashboardSlice'
import { rootSaga as authRootSaga } from './sagas/authSaga'
import { dashboardRootSaga } from './sagas/dashboardSaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        auth: authReducer,
        toaster: toasterReducer,
        main: mainReducer,
        dashboard: dashboardReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ 
            thunk: false
        }).concat(sagaMiddleware)
})

// Run all sagas
sagaMiddleware.run(authRootSaga)
sagaMiddleware.run(dashboardRootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store 