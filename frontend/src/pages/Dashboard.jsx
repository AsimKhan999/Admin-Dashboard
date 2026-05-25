import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { dataService } from '../services/dataService'

const AnimatedCount = ({ value }) => {
  const [display, setDisplay] = useState(value)
  const rafRef = useRef(null)

  useEffect(() => {
    const start = display
    const diff = value - start
    const duration = 400
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + diff * ease))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  return display.toLocaleString()
}

const Dashboard = () => {
  const { stats } = useSelector((state) => state.data)
  const [timeFilter, setTimeFilter] = useState(() => localStorage.getItem('timeFilter') || 'Monthly')
  const [perfHidden, setPerfHidden] = useState({})
  const [sessionHidden, setSessionHidden] = useState({})
  const [performanceData, setPerformanceData] = useState([])
  const [sessionsData, setSessionsData] = useState([])
  const [orders, setOrders] = useState([])

  const generatePerformanceData = (filter) => {
    if (filter === 'Day') {
      return Array.from({ length: 12 }, (_, i) => ({
        name: `${i * 2}:00`,
        complaints: Math.floor(Math.random() * 30) + 10,
        taskDone: Math.floor(Math.random() * 20) + 5,
        attends: Math.floor(Math.random() * 15) + 5,
      }))
    }
    if (filter === 'Weekly') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
        name: day,
        complaints: Math.floor(Math.random() * 60) + 40,
        taskDone: Math.floor(Math.random() * 40) + 20,
        attends: Math.floor(Math.random() * 30) + 15,
      }))
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map(month => ({
      name: month,
      complaints: Math.floor(Math.random() * 100) + 150,
      taskDone: Math.floor(Math.random() * 50) + 80,
      attends: Math.floor(Math.random() * 40) + 60,
    }))
  }

  useEffect(() => {
    setPerformanceData(generatePerformanceData(timeFilter))
  }, [timeFilter])

  useEffect(() => {
    localStorage.setItem('timeFilter', timeFilter)
  }, [timeFilter])

  useEffect(() => {

    setSessionsData([
      { name: 'Assigned', value: 4200, color: '#38CE3C' },
      { name: 'Not Assigned', value: 2500, color: '#FFDE73' },
      { name: 'Reassigned', value: 1534, color: '#FF4D6B' },
    ])

    // Mock orders data
    setOrders([
      { id: 'STL-1001', name: 'Katie Holmes', avatar: 'KH', color: '#FF4D6B', amount: '$3,621', gateway: 'Alipay', createdAt: '04 Jun 2019', paidAt: '18 Jul 2019', status: 'Paid' },
      { id: 'STL-1002', name: 'Minnie Copeland', avatar: 'MC', color: '#8E32E9', amount: '$6,245', gateway: 'PayPal', createdAt: '25 Sep 2019', paidAt: '07 Oct 2019', status: 'Pending' },
      { id: 'STL-1003', name: 'Rodney Sims', avatar: 'RS', color: '#4FC3F7', amount: '$9,265', gateway: 'Alipay', createdAt: '12 Dec 2019', paidAt: '26 Aug 2019', status: 'Failed' },
      { id: 'STL-1004', name: 'Carolyn Barker', avatar: 'CB', color: '#38CE3C', amount: '$2,263', gateway: 'Alipay', createdAt: '30 Sep 2019', paidAt: '20 Oct 2019', status: 'Paid' },
      { id: 'STL-1005', name: 'James Thornton', avatar: 'JT', color: '#FF8C00', amount: '$4,810', gateway: 'PayPal', createdAt: '15 Jan 2020', paidAt: '22 Jan 2020', status: 'Pending' },
    ])
  }, [])

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return 'status-paid'
      case 'Pending': return 'status-pending'
      case 'Failed': return 'status-failed'
      default: return ''
    }
  }

  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, {stats.user?.name || 'Henry'}! Here's what's happening today.</p>
      </div>

      {/* Row 1 — Two Chart Cards */}
      <div className="dashboard-grid-2">
        {/* Card A: Performance Indicator */}
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Performance Indicator</div>
            <div className="time-filters">
              {['Day', 'Weekly', 'Monthly'].map((filter) => (
                <button
                  key={filter}
                  className={`time-btn ${timeFilter === filter ? 'active' : ''}`}
                  onClick={() => setTimeFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-legend">
            {[
              { key: 'complaints', label: 'Complaints (2,098)', color: '#4FC3F7' },
              { key: 'taskDone', label: 'Task Done (1,123)', color: '#38CE3C' },
              { key: 'attends', label: 'Attends (876)', color: '#FF4D6B' },
            ].map(item => (
              <div key={item.key} className={`legend-item ${perfHidden[item.key] ? 'hidden' : ''}`} onClick={() => setPerfHidden(prev => ({ ...prev, [item.key]: !prev[item.key] }))}>
                <span className="legend-dot" style={{ background: item.color }}></span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="chart-wrap" style={{ height: '220px' }}>
            <div className="chart-inner">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} fontSize={11} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip isAnimationActive={false} />
                  <Bar dataKey="complaints" stackId="a" fill="#4FC3F7" radius={[4, 4, 0, 0]} hide={perfHidden['complaints']} />
                  <Bar dataKey="taskDone" stackId="a" fill="#38CE3C" hide={perfHidden['taskDone']} />
                  <Bar dataKey="attends" stackId="a" fill="#FF4D6B" radius={[4, 4, 0, 0]} hide={perfHidden['attends']} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card B: Sessions By Channel */}
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Sessions By Channel</div>
          </div>
          <div className="donut-wrap" style={{ height: '200px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionsData.map(d => ({ ...d, value: sessionHidden[d.name] ? 0 : d.value }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sessionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip isAnimationActive={false} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div className="big"><AnimatedCount value={sessionsData.filter(d => !sessionHidden[d.name]).reduce((sum, d) => sum + d.value, 0)} /></div>
              <div className="small">Total Leads</div>
            </div>
          </div>
          <div className="chart-legend" style={{ justifyContent: 'center', marginTop: '14px' }}>
            {sessionsData.map(item => (
              <div key={item.name} className={`legend-item ${sessionHidden[item.name] ? 'hidden' : ''}`} onClick={() => setSessionHidden(prev => ({ ...prev, [item.name]: !prev[item.name] }))}>
                <span className="legend-dot" style={{ background: item.color }}></span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 — Products Inventory Table */}
      <div className="dashboard-card">
        <div className="section-header">
          <div className="card-title">Products Inventory</div>
          <a href="/products" className="view-all-link">View all →</a>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Store ID / Name</th>
                <th>Amount</th>
                <th>Gateway</th>
                <th>Created At</th>
                <th>Paid At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="table-user">
                      <div className="avatar-circle" style={{ background: order.color }}>{order.avatar}</div>
                      <span>{order.name}</span>
                    </div>
                  </td>
                  <td><span className="mono">{order.amount}</span></td>
                  <td><span className="gateway-badge">🔵 {order.gateway}</span></td>
                  <td>{order.createdAt}</td>
                  <td>{order.paidAt}</td>
                  <td><span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="pagination-info">Showing 1 to {orders.length} of {orders.length} entries</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
