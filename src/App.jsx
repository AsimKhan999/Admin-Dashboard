import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './components/Layout'

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Tables = lazy(() => import('./pages/Tables'))
const Forms = lazy(() => import('./pages/Forms'))
const Charts = lazy(() => import('./pages/Charts'))
const Notifications = lazy(() => import('./pages/Notifications'))
const Settings = lazy(() => import('./pages/Settings'))
const Maps = lazy(() => import('./pages/Maps'))
const UserPages = lazy(() => import('./pages/UserPages'))
const ErrorPages = lazy(() => import('./pages/ErrorPages'))
const Products = lazy(() => import('./pages/Products'))

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <Suspense fallback={<div className="page-loading">Loading...</div>}>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="tables" element={<Tables />} />
          <Route path="forms" element={<Forms />} />
          <Route path="charts" element={<Charts />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="maps" element={<Maps />} />
          <Route path="users" element={<UserPages />} />
          <Route path="errors" element={<ErrorPages />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
