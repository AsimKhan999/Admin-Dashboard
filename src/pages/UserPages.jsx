import { useState } from 'react'
import { FiX, FiMail, FiCalendar, FiMapPin } from 'react-icons/fi'

const names = [
  'Alice Johnson', 'Bob Martinez', 'Carol White', 'David Lee', 'Elena Rodriguez',
  'Frank Kim', 'Grace Patel', 'Henry Brown', 'Iris Chen', 'Jake Wilson',
  'Karen Davis', 'Liam Thompson', 'Mia Garcia', 'Noah Anderson', 'Olivia Taylor',
]

const roles = ['Admin', 'Developer', 'Designer', 'Manager', 'Analyst', 'Editor', 'Viewer', 'Support']
const colors = ['#8E32E9', '#38CE3C', '#FF4D6B', '#4FC3F7', '#FF8C00', '#FFDE73', '#FF4D6B', '#38CE3C', '#8E32E9', '#4FC3F7', '#38CE3C', '#FF4D6B', '#FF8C00', '#FFDE73', '#8E32E9']

const UserPages = () => {
  const [viewUser, setViewUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 8
  const [users] = useState(() => names.map((name, i) => ({
    name,
    role: roles[i % roles.length],
    posts: Math.floor(Math.random() * 300) + 40,
    followers: `${(Math.random() * 8 + 1).toFixed(1)}k`,
    following: Math.floor(Math.random() * 600) + 100,
    color: colors[i],
    email: `${name.toLowerCase().replace(' ', '.')}@company.com`,
    joined: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][Math.floor(Math.random() * 6)] + ' 2024',
    location: ['New York, USA', 'London, UK', 'San Francisco, CA', 'Berlin, Germany', 'Tokyo, Japan', 'Toronto, Canada'][Math.floor(Math.random() * 6)],
  })))
  const totalPages = Math.ceil(users.length / perPage)
  const paginatedUsers = users.slice((currentPage - 1) * perPage, currentPage * perPage)

  const roleColors = {
    Admin: 'badge-purple',
    Developer: 'badge-green',
    Designer: 'badge-coral',
    Manager: 'badge-cyan',
    Analyst: 'badge-orange',
    Editor: 'badge-yellow',
    Viewer: 'badge-coral',
    Support: 'badge-green',
  }

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('')

  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>User Pages</h1>
        <p>View and manage user profiles.</p>
      </div>

      <div className="user-grid">
        {paginatedUsers.map((user, i) => (
          <div key={i} className="user-card">
            <div className="user-card-avatar">
              <div
                className="avatar"
                style={{
                  background: user.color,
                  color: user.color === '#FFDE73' ? 'var(--dark-bg)' : '#fff',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 700,
                  fontFamily: 'Syne, sans-serif',
                  margin: '0 auto',
                }}
              >
                {getInitials(user.name)}
              </div>
            </div>
            <div className="user-card-name">{user.name}</div>
            <div className="user-card-role">
              <span className={`badge ${roleColors[user.role] || 'badge-green'}`}>{user.role}</span>
            </div>
            <div className="user-stats">
              <div className="stat-item">
                <div className="stat-value">{user.posts}</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.followers}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{user.following}</div>
                <div className="stat-label">Following</div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={() => setViewUser(user)}>
              View Profile
            </button>
          </div>
        ))}
      </div>

      <div className="pagination" style={{ marginTop: 16 }}>
        <div className="pagination-info">Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, users.length)} of {users.length} users</div>
        <div className="pagination-btns">
          <button className="page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} className={`page-btn ${currentPage === page ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>
          ))}
          <button className="page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
        </div>
      </div>

      {viewUser && (
        <div className="modal-overlay" onClick={() => setViewUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 380, textAlign: 'center' }}>
            <div className="modal-header" style={{ justifyContent: 'flex-end', paddingBottom: 0 }}>
              <button className="modal-close" onClick={() => setViewUser(null)}><FiX size={18} /></button>
            </div>
            <div className="modal-body" style={{ paddingTop: 0 }}>
              <div className="user-card-avatar" style={{ marginBottom: 12 }}>
                <div
                  style={{
                    background: viewUser.color,
                    color: viewUser.color === '#FFDE73' ? 'var(--dark-bg)' : '#fff',
                    width: '72px', height: '72px', borderRadius: '50%',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '26px', fontWeight: 700, fontFamily: 'Syne, sans-serif',
                  }}
                >
                  {viewUser.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700, marginBottom: 4 }}>{viewUser.name}</div>
              <div style={{ marginBottom: 16 }}><span className={`badge ${roleColors[viewUser.role] || 'badge-green'}`}>{viewUser.role}</span></div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, padding: '12px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 16 }}>
                <div><div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700 }}>{viewUser.posts}</div><div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Posts</div></div>
                <div><div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700 }}>{viewUser.followers}</div><div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Followers</div></div>
                <div><div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700 }}>{viewUser.following}</div><div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Following</div></div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left', padding: '0 8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiMail size={14} /> {viewUser.email}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiCalendar size={14} /> Joined {viewUser.joined}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiMapPin size={14} /> {viewUser.location}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPages
