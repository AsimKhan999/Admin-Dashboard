import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'

// Initialize theme on load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode')
}
const savedAccent = localStorage.getItem('accent')
if (savedAccent) {
  document.documentElement.style.setProperty('--accent', savedAccent)
  document.documentElement.style.setProperty('--accent-dim', `${savedAccent}26`)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
