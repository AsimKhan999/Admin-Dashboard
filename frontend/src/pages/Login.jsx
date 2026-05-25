import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiMoon, FiSun } from 'react-icons/fi'
import { loginStart, loginSuccess } from '../store/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loginDark, setLoginDark] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const passwordRef = useRef(null)

  const bg = loginDark ? '#0f111a' : '#F4F6F9'
  const cardBg = loginDark ? '#1c222d' : '#fff'
  const textColor = loginDark ? '#e5e7eb' : '#111827'
  const mutedColor = loginDark ? '#9ca3af' : '#6b7280'
  const demoBg = loginDark ? '#161a25' : '#F4F6F9'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const validEmail = 'admin@example.com'
    const validPassword = 'admin123'

    if (formData.email?.trim().toLowerCase() !== validEmail || formData.password !== validPassword) {
      setError('Invalid email or password. Please use the demo credentials below.')
      return
    }

    dispatch(loginStart())

    const demoUser = {
      user: { name: 'Admin User', email: formData.email, role: 'Admin' },
      token: 'demo-token-' + Date.now(),
    }
    dispatch(loginSuccess(demoUser))
    toast.success('Logged in!')
    navigate('/')
  }

  const toggleIcon = loginDark ? <FiSun size={18} /> : <FiMoon size={18} />

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: bg,
      transition: 'background 0.2s',
      position: 'relative',
    }}>
      <button
        onClick={() => setLoginDark(!loginDark)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: cardBg,
          border: '1px solid rgba(128,128,128,0.2)',
          borderRadius: '8px',
          padding: '8px',
          cursor: 'pointer',
          color: textColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {toggleIcon}
      </button>
      <div style={{
        background: cardBg,
        borderRadius: 'var(--radius)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: 'var(--shadow-md)',
        transition: 'background 0.2s',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            color: textColor,
            marginBottom: '8px',
          }}>
            Welcome Back
          </h1>
          <p style={{ color: mutedColor, fontSize: '14px' }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label" style={{ color: mutedColor }}>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              onKeyDown={(e) => { if (e.key === 'Enter' && !formData.password) { e.preventDefault(); passwordRef.current?.focus() } }}
              style={{ background: loginDark ? '#0f111a' : '#fff', borderColor: loginDark ? '#374151' : undefined, color: textColor }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: mutedColor }}>Password</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              style={{ background: loginDark ? '#0f111a' : '#fff', borderColor: loginDark ? '#374151' : undefined, color: textColor }}
            />
          </div>

          {error && (
            <div style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '12px', padding: '8px', background: 'rgba(239,68,68,0.1)', borderRadius: '6px' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '20px' }}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', padding: '15px', background: demoBg, borderRadius: 'var(--radius-sm)' }}>
          <p style={{ fontSize: '12px', color: mutedColor, marginBottom: '5px' }}>
            Demo Credentials:
          </p>
          <p style={{ fontSize: '11px', color: mutedColor }}>
            Email: admin@example.com | Password: admin123
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
