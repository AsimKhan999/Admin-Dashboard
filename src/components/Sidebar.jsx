import { Link, useLocation } from 'react-router-dom'
import { FiGrid, FiBell, FiFileText, FiBarChart2, FiDatabase, FiMap, FiSettings, FiUsers, FiAlertTriangle, FiChevronDown, FiZap, FiPackage } from 'react-icons/fi'

const menuItems = [
  { section: 'Dashboard', items: [
    { path: '/', icon: FiGrid, label: 'Dashboard' },
  ]},
  { section: 'UI Elements', items: [
    { path: '/notifications', icon: FiBell, label: 'Notifications' },
    { path: '/forms', icon: FiFileText, label: 'Forms' },
    { path: '/charts', icon: FiBarChart2, label: 'Charts' },
    { path: '/products', icon: FiPackage, label: 'Products' },
    { path: '/tables', icon: FiDatabase, label: 'Tables' },
    { path: '/maps', icon: FiMap, label: 'Maps' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ]},
  { section: 'Extra Pages', items: [
    { path: '/users', icon: FiUsers, label: 'User Pages' },
    { path: '/errors', icon: FiAlertTriangle, label: 'Error Pages' },
  ]},
]

const Sidebar = ({ sidebarOpen, collapsedSections, onToggleCollapse, onGetInitials, user }) => {
  const location = useLocation()

  return (
    <>
      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => onToggleCollapse('__overlay')}></div>
      <aside className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
        <div className="sidebar-logo">
          <FiZap size={22} style={{ color: 'var(--accent)' }} />
          <span>Stellar</span>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{onGetInitials(user?.name)}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name || 'Admin User'}</div>
            <div className="sidebar-user-role">{user?.role || 'Super Admin'}</div>
          </div>
        </div>

        {menuItems.map((section) => {
          const isCollapsible = section.section === 'Extra Pages'
          const isCollapsed = collapsedSections[section.section]
          return (
            <div key={section.section}>
              <div
                className={`sidebar-section-label ${isCollapsible ? 'collapsible' : ''}`}
                onClick={() => isCollapsible && onToggleCollapse(section.section)}
              >
                {section.section}
                {isCollapsible && <FiChevronDown size={12} className={`collapse-chevron ${isCollapsed ? 'collapsed' : ''}`} />}
              </div>
              {(!isCollapsible || !isCollapsed) && (
                <nav className="sidebar-nav">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                      >
                        <Icon size={16} />
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              )}
            </div>
          )
        })}
      </aside>
    </>
  )
}

export default Sidebar
