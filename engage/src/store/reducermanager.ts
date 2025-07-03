import { combineReducers } from 'redux'
import type { Reducer, AnyAction } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import type { Slice, SliceCaseReducers } from '@reduxjs/toolkit'

interface ReducerManager {
  reduce: (state: Record<string, unknown>, action: AnyAction) => Record<string, unknown>
  add: (params: { key: string; addedReducers: SliceCaseReducers<unknown>; initialReducerState: unknown }) => { actions: Record<string, unknown> } | undefined
  remove: (key: string) => void
}

interface ReducerManagerParams {
  key: string
  addedReducers: SliceCaseReducers<unknown>
  initialReducerState: unknown
}

export default function createReducerManager(): ReducerManager {
  const initialState: Record<string, unknown> = {}
  const reducers: Record<string, Reducer> = {}
  let combinedReducer: Reducer | null = null
  let keysToRemove: string[] = []

  return {
    reduce: (state: Record<string, unknown>, action: AnyAction) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state }
        for (const key of keysToRemove) {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reducers: addedReducers as any,
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