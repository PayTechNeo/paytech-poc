import { createSlice } from '@reduxjs/toolkit'

interface MainState {
  loadingState: boolean
}

const initialState: MainState = {
  loadingState: false
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoadingState: (state, action) => {
      state.loadingState = action.payload
    }
  }
})

export const mainActions = mainSlice.actions
export default mainSlice.reducer 