import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

interface Recommendation {
  title: string
  description: string
}

interface Product {
  name: string
  icon: React.ReactNode
  // description: string
}



interface OrganizationData {
  extId: string
  status: string
  tenant: string
  createdAt: string
  updatedAt: string
  recommendation?: Recommendation[],
  products?: Product[],
  healthReport?: string
  healthGoodPart?: string
  healthBadPart?: string
  averageBalance?: number
  averageIncome?: number
  averageExpenses?: number
  averageEoM?: number
  healthScore?: number,
  description?: string,
  website?: string,
  name?: string,
  code?: string,
  email?: string,
  phone?: string,
  address?: string,
  level?: number,
}

interface DashboardState {
  data: OrganizationData | null
  loading: boolean
  error: string | null
}

// Initial state
const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null
}

// Create slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardLoading: (state, action) => {
      state.loading = action.payload
    },
    setDashboardData: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    setDashboardError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    clearDashboard: (state) => {
      state.data = null
      state.loading = false
      state.error = null
    }
  }
})

// Export actions
export const dashboardActions = dashboardSlice.actions

// Export reducer
export default dashboardSlice.reducer 