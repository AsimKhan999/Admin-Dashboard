import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser } from '../store/authSlice'
import { setTheme, setAccentColor, setTimezone, setHourFormat } from '../store/themeSlice'

const Settings = () => {
  const dispatch = useDispatch()
  const { isDarkMode, accentColor, timezone, hour24 } = useSelector((state) => state.theme)
  const [name, setName] = useState('Admin User')
  const [email, setEmail] = useState('admin@example.com')

  const accentColors = ['#38CE3C', '#8E32E9', '#FF4D6B', '#4FC3F7', '#FF8C00']

  const handleSaveAccount = () => {
    dispatch(updateUser({ name, email }))
    toast.success('Account settings saved!')
  }

  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>Settings</h1>
        <p>Customize your dashboard preferences.</p>
      </div>

      <div className="dashboard-grid-2">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Theme Settings</div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div className="card-title" style={{ marginBottom: '15px', fontSize: '14px' }}>Appearance</div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div
                className={`theme-card ${!isDarkMode ? 'active' : ''}`}
                onClick={() => dispatch(setTheme(false))}
                style={{ flex: 1 }}
              >
                <div className="theme-preview light">
                  <div className="p-sidebar"></div>
                  <div className="p-topbar"></div>
                  <div className="p-content"></div>
                </div>
                <span>Light</span>
              </div>
              <div
                className={`theme-card ${isDarkMode ? 'active' : ''}`}
                onClick={() => dispatch(setTheme(true))}
                style={{ flex: 1 }}
              >
                <div className="theme-preview dark">
                  <div className="p-sidebar"></div>
                  <div className="p-topbar"></div>
                  <div className="p-content"></div>
                </div>
                <span>Dark</span>
              </div>
            </div>
          </div>

          <div>
            <div className="card-title" style={{ marginBottom: '15px', fontSize: '14px' }}>Accent Color</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {accentColors.map(color => (
                <div
                  key={color}
                  className={`color-dot ${accentColor === color ? 'active' : ''}`}
                  style={{ background: color }}
                  onClick={() => dispatch(setAccentColor(color))}
                />
              ))}
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <div className="card-title" style={{ marginBottom: '15px', fontSize: '14px' }}>Time Format</div>
            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" checked={hour24} onChange={() => dispatch(setHourFormat(!hour24))} />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">{hour24 ? '24-Hour Format' : '12-Hour Format'}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Account Settings</div>
          </div>

          <div className="form-group">
            <label className="form-label">Display Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your display name" onFocus={(e) => { if (e.target.value === 'Admin User') setName('') }} />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" onFocus={(e) => { if (e.target.value === 'admin@example.com') setEmail('') }} />
          </div>

          <div className="form-group">
            <label className="form-label">Timezone</label>
            <div className="select-wrap">
              <select className="form-control" value={timezone} onChange={(e) => dispatch(setTimezone(e.target.value))}>
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
                <option value="IST">IST (Indian Standard Time)</option>
                <option value="CET">CET (Central European Time)</option>
                <option value="CST">CST (China Standard Time)</option>
                <option value="JST">JST (Japan Standard Time)</option>
                <option value="PKT">PKT (Pakistan Standard Time)</option>
              </select>
              <FiChevronDown className="select-arrow" />
            </div>
          </div>

          <button className="btn btn-primary btn-md" onClick={handleSaveAccount}>Save Changes</button>
        </div>

        <div className="dashboard-card settings-full-width">
          <div className="card-header">
            <div className="card-title">Notification Preferences</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">Email Notifications</span>
            </div>

            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">Push Notifications</span>
            </div>

            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">SMS Notifications</span>
            </div>

            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">Security Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
