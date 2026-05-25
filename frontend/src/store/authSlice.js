import { createSlice } from '@reduxjs/toolkit'

const getStored = (key) => {
  try {
    const v = localStorage.getItem(key)
    if (v === null || v === undefined || v === 'undefined') return null
    return JSON.parse(v)
  } catch (err) {
    return null
  }
}

const storedUser = getStored('user')
const storedToken = localStorage.getItem('token')
if (storedToken && storedUser && !storedUser.name) {
  storedUser.name = storedUser.email?.split('@')[0]?.replace(/[^a-zA-Z ]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'User'
  localStorage.setItem('user', JSON.stringify(storedUser))
}

const initialState = {
  user: storedUser,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', action.payload.token)
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions
export default authSlice.reducer
