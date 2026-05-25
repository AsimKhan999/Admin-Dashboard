import { createSlice } from '@reduxjs/toolkit'

const getStored = (key) => {
  try {
    const v = sessionStorage.getItem(key)
    if (v === null || v === undefined || v === 'undefined') return null
    return JSON.parse(v)
  } catch (err) {
    return null
  }
}

const storedUser = getStored('user')
const storedToken = sessionStorage.getItem('token')
if (storedToken && storedUser && !storedUser.name) {
  storedUser.name = storedUser.email?.split('@')[0]?.replace(/[^a-zA-Z ]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'User'
  sessionStorage.setItem('user', JSON.stringify(storedUser))
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
      sessionStorage.setItem('user', JSON.stringify(action.payload.user))
      sessionStorage.setItem('token', action.payload.token)
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
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      sessionStorage.setItem('user', JSON.stringify(state.user))
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions
export default authSlice.reducer
