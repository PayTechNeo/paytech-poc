import store from "../store/store"

export const componentKey = "APP_ROUTES"

interface RoutesState {
  loggedInUser: any
  loggedInProviderUser: any[]
  isAdminUser: boolean
}

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoggedInUser: (state: RoutesState, action: { payload: any }) => {
            state.loggedInUser = action.payload
        },
        setLoggedInProviderUser: (state: RoutesState, action: { payload: any[] }) => {
            state.loggedInProviderUser = action.payload
        },
        setIsAdminUser: (state: RoutesState, action: { payload: boolean }) => {
            state.isAdminUser = action.payload
        },
    },
    initialReducerState: {
        loggedInUser: {},
        loggedInProviderUser: [],
        isAdminUser: false
    } as RoutesState
})

export const { setLoggedInUser, setLoggedInProviderUser, setIsAdminUser } = actions 