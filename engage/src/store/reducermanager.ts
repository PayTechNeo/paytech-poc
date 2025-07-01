import { combineReducers, Reducer, AnyAction } from 'redux'
import { createSlice, Slice } from '@reduxjs/toolkit'

interface ReducerManager {
  reduce: (state: any, action: AnyAction) => any
  add: (params: { key: string; addedReducers: any; initialReducerState: any }) => { actions: any } | undefined
  remove: (key: string) => void
}

interface ReducerManagerParams {
  key: string
  addedReducers: any
  initialReducerState: any
}

export default function createReducerManager(): ReducerManager {
  const initialState: Record<string, any> = {}
  const reducers: Record<string, Reducer> = {}
  let combinedReducer: Reducer | null = null
  let keysToRemove: string[] = []

  return {
    reduce: (state: any, action: AnyAction) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state }
        for (let key of keysToRemove) {
          delete state[key]
          state[key] = initialState[key]
        }
        keysToRemove = []
      }
      return combinedReducer ? combinedReducer(state, action) : initialState
    },

    // Adds a new reducer with the specified key
    add: ({ key, addedReducers, initialReducerState }: ReducerManagerParams) => {
      if (!key || reducers[key]) {
        return
      }

      const slice: Slice = createSlice({
        name: key,
        initialState: initialReducerState,
        reducers: addedReducers,
      })

      initialState[key] = initialReducerState
      reducers[key] = slice.reducer

      combinedReducer = combineReducers(reducers)
      return { actions: slice.actions }
    },

    remove: (key: string) => {
      if (!key || !reducers[key]) {
        return
      }
      keysToRemove.push(key)
      combinedReducer = combineReducers(reducers)
    }
  }
} 