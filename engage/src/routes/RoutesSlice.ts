import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const componentKey = "APP_ROUTES"

interface RoutesState {
  loggedInUser: any
  loggedInProviderUser: any[]
  isAdminUser: boolean
}

const initialState: RoutesState = {
  loggedInUser: {},
  loggedInProviderUser: [],
  isAdminUser: false
};

const routesSlice = createSlice({
  name: componentKey,
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<any>) => {
      state.loggedInUser = action.payload;
    },
    setLoggedInProviderUser: (state, action: PayloadAction<any[]>) => {
      state.loggedInProviderUser = action.payload;
    },
    setIsAdminUser: (state, action: PayloadAction<boolean>) => {
      state.isAdminUser = action.payload;
    },
  },
});

export const { setLoggedInUser, setLoggedInProviderUser, setIsAdminUser } = routesSlice.actions;
export default routesSlice.reducer; 