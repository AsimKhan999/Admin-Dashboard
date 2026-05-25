import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDarkMode: localStorage.getItem('theme') === 'dark',
  accentColor: localStorage.getItem('accent') || '#38CE3C',
  timezone: localStorage.getItem('timezone') || 'UTC',
  hour24: localStorage.getItem('hour24') === 'true',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
      document.body.classList.toggle('dark-mode', state.isDarkMode)
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload
      localStorage.setItem('theme', action.payload ? 'dark' : 'light')
      document.body.classList.toggle('dark-mode', action.payload)
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload
      localStorage.setItem('accent', action.payload)
      document.documentElement.style.setProperty('--accent', action.payload)
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload
      localStorage.setItem('timezone', action.payload)
    },
    setHourFormat: (state, action) => {
      state.hour24 = action.payload
      localStorage.setItem('hour24', action.payload)
    },
  },
})

export const { toggleTheme, setTheme, setAccentColor, setTimezone, setHourFormat } = themeSlice.actions
export default themeSlice.reducer
