import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiInfo, FiCheck, FiAlertTriangle, FiX, FiClock } from 'react-icons/fi'
import { markNotificationRead, clearNotifications } from '../store/dataSlice'

const allNotifications = [
  { id: 1, type: 'success', title: 'Payment Received', desc: 'Katie Holmes paid $3,621 via Alipay.', time: '2 minutes ago', read: false },
  { id: 2, type: 'info', title: 'New User Registered', desc: 'James Thornton created an account.', time: '15 minutes ago', read: false },
  { id: 3, type: 'warning', title: 'Low Inventory Alert', desc: 'Product SKU-8821 has only 3 units left.', time: '1 hour ago', read: false },
  { id: 4, type: 'error', title: 'Payment Failed', desc: 'Rodney Sims payment via Alipay failed.', time: '2 hours ago', read: false },
  { id: 5, type: 'info', title: 'System Update', desc: 'Dashboard v2.1 is available. Click to update.', time: '3 hours ago', read: true },
  { id: 6, type: 'success', title: 'Report Generated', desc: 'Monthly revenue report for June is ready.', time: '5 hours ago', read: true },
]

let cleared = false

const Notifications = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')
  const [notifications, setNotifications] = useState(cleared ? [] : allNotifications)

  const colors = { info: '#4FC3F7', success: '#38CE3C', warning: '#B8860B', error: '#FF4D6B' }
  const bgs = { info: 'rgba(79,195,247,0.15)', success: 'rgba(56,206,60,0.15)', warning: 'rgba(255,222,115,0.2)', error: 'rgba(255,77,107,0.15)' }
  const icons = {
    info: <FiInfo size={18} />,
    success: <FiCheck size={18} />,
    warning: <FiAlertTriangle size={18} />,
    error: <FiX size={18} />,
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'read') return n.read
    return true
  })

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>Notifications</h1>
        <p>Stay updated with the latest notifications.</p>
      </div>

      <div className="dashboard-card">
        <div className="filter-tabs">
          {['all', 'unread', 'read'].map(f => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {filteredNotifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '13px' }}>
            No {filter} notifications
          </div>
        ) : (
          filteredNotifications.map(n => (
            <div key={n.id} className={`notif-card ${n.read ? '' : 'unread'}`}>
              <div className="notif-icon" style={{ background: bgs[n.type], color: colors[n.type] }}>
                {icons[n.type]}
              </div>
              <div className="notif-body">
                <div className="notif-title">
                  {n.title}
                  {!n.read && <span className="badge badge-green" style={{ fontSize: '9px', padding: '1px 7px', marginLeft: '4px' }}>NEW</span>}
                </div>
                <div className="notif-desc">{n.desc}</div>
                <div className="notif-time"><FiClock size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />{n.time}</div>
              </div>
              <button className="notif-dismiss" onClick={() => handleDismiss(n.id)} title="Dismiss">×</button>
            </div>
          ))
        )}

        {notifications.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <button className="btn btn-outline btn-sm" onClick={handleMarkAllRead}>
              Mark all as read
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => { setNotifications([]); cleared = true }}>
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
