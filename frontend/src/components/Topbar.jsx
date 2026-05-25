import { FiSearch, FiClock, FiMoon, FiSun, FiBell, FiLogOut } from 'react-icons/fi'

const timezoneMap = {
  UTC: 'UTC', EST: 'America/New_York', PST: 'America/Los_Angeles',
  IST: 'Asia/Kolkata', CET: 'Europe/Berlin', CST: 'Asia/Shanghai',
  JST: 'Asia/Tokyo', PKT: 'Asia/Karachi',
}

const Topbar = ({
  title,
  currentTime,
  timezone,
  hour24,
  isDarkMode,
  searchOpen,
  searchQuery,
  searchInputRef,
  notifOpen,
  userMenuOpen,
  userMenuRef,
  notifRef,
  user,
  onSearchSubmit,
  onSearchChange,
  onToggleSearch,
  onToggleTheme,
  onToggleNotif,
  onToggleUserMenu,
  onLogout,
  onGetInitials,
}) => {
  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>

      <div className="topbar-actions">
        <form className={`topbar-search ${searchOpen ? 'open' : ''}`} onSubmit={onSearchSubmit}>
          <FiSearch size={14} />
          <input ref={searchInputRef} type="text" placeholder="Search anything..." value={searchQuery} onChange={onSearchChange} />
        </form>
        <button className="topbar-icon-btn" onClick={onToggleSearch} title="Search">
          <FiSearch size={15} />
        </button>

        <div className="topbar-clock" title={timezone}>
          <FiClock size={13} />
          <span>{currentTime.toLocaleTimeString('en-US', { timeZone: timezoneMap[timezone] || 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: !hour24 })}</span>
        </div>

        <button className="topbar-icon-btn" onClick={onToggleTheme} title="Toggle Theme">
          {isDarkMode ? <FiSun size={15} /> : <FiMoon size={15} />}
        </button>

        <div className="topbar-dropdown-wrap" ref={notifRef}>
          <button className="topbar-icon-btn" onClick={onToggleNotif} title="Notifications">
            <FiBell size={15} />
          </button>
          {notifOpen && (
            <div className="topbar-dropdown show">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <button className="btn-link btn-link-sm">Clear all</button>
              </div>
              <div className="dropdown-empty">No notifications</div>
            </div>
          )}
        </div>

        <div className="topbar-dropdown-wrap" ref={userMenuRef}>
          <button className="topbar-user" onClick={onToggleUserMenu} title="User menu">
            <div className="topbar-user-avatar">{onGetInitials(user?.name)}</div>
            <span className="topbar-user-name">{user?.name || 'Admin'} ▾</span>
          </button>
          {userMenuOpen && (
            <div className="topbar-dropdown show topbar-dropdown-right">
              <div className="topbar-dropdown-body">
                <button className="logout-btn" onClick={onLogout}>
                  <FiLogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar
