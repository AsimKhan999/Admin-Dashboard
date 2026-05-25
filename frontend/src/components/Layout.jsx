import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { toggleTheme as toggleThemeAction, setTheme } from '../store/themeSlice'
import { useState, useEffect, useRef, useCallback } from 'react'
import { FiMenu } from 'react-icons/fi'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Layout = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isDarkMode, timezone, hour24 } = useSelector((state) => state.theme)
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState(() => ({ 'Extra Pages': window.innerWidth > 768 }))
  const [searchQuery, setSearchQuery] = useState('')

  const userMenuRef = useRef(null)
  const notifRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/tables?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }, [searchQuery, navigate])

  const handleLogout = useCallback(() => {
    dispatch(logout())
    dispatch(setTheme(false))
    document.body.classList.remove('dark-mode')
    localStorage.setItem('theme', 'light')
    navigate('/login')
  }, [dispatch, navigate])

  const handleToggleCollapse = useCallback((section) => {
    if (section === '__overlay') setSidebarOpen(false)
    else setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }, [])

  const getInitials = useCallback((name) => {
    if (!name) return 'AU'
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    return parts[0].slice(0, 2).toUpperCase()
  }, [])

  const pageTitles = {
    '/': `Welcome ${user?.name || 'Admin'}!`,
    '/tables': 'Data Tables',
    '/forms': 'Forms & Inputs',
    '/charts': 'Charts & Visualizations',
    '/notifications': 'Notifications',
    '/users': 'User Pages',
    '/errors': 'Error Pages',
    '/maps': 'Maps',
    '/settings': 'Settings',
  }

  return (
    <div className="shell">
      <Sidebar
        sidebarOpen={sidebarOpen}
        collapsedSections={collapsedSections}
        onToggleCollapse={handleToggleCollapse}
        onGetInitials={getInitials}
        user={user}
      />

      <div className="main-wrapper">
        <button className="hamburger" onClick={() => setSidebarOpen(prev => !prev)}>
          <FiMenu size={22} />
        </button>

        <Topbar
          title={pageTitles[location.pathname] || 'Dashboard'}
          currentTime={currentTime}
          timezone={timezone}
          hour24={hour24}
          isDarkMode={isDarkMode}
          searchOpen={searchOpen}
          searchQuery={searchQuery}
          searchInputRef={searchInputRef}
          notifOpen={notifOpen}
          userMenuOpen={userMenuOpen}
          userMenuRef={userMenuRef}
          notifRef={notifRef}
          user={user}
          onSearchSubmit={handleSearch}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onToggleSearch={() => setSearchOpen(prev => !prev)}
          onToggleTheme={() => dispatch(toggleThemeAction())}
          onToggleNotif={() => setNotifOpen(prev => !prev)}
          onToggleUserMenu={() => setUserMenuOpen(prev => !prev)}
          onLogout={handleLogout}
          onGetInitials={getInitials}
        />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
