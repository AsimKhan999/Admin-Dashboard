import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import themeReducer from './themeSlice'
import dataReducer from './dataSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    data: dataReducer,
  },
})

export default store
