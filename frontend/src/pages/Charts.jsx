import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'

const Charts = () => {
  const [pieHidden, setPieHidden] = useState({})
  const [radarHidden, setRadarHidden] = useState({})
  const [areaHidden, setAreaHidden] = useState({})

  const lineData = [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 19000 },
    { name: 'Mar', value: 15000 },
    { name: 'Apr', value: 25000 },
    { name: 'May', value: 22000 },
    { name: 'Jun', value: 30000 },
    { name: 'Jul', value: 28000 },
    { name: 'Aug', value: 35000 },
    { name: 'Sep', value: 32000 },
    { name: 'Oct', value: 40000 },
    { name: 'Nov', value: 38000 },
    { name: 'Dec', value: 45000 },
  ]

  const barData = [
    { name: 'Mon', value: 1200 },
    { name: 'Tue', value: 1900 },
    { name: 'Wed', value: 1500 },
    { name: 'Thu', value: 2100 },
    { name: 'Fri', value: 1800 },
    { name: 'Sat', value: 2600 },
    { name: 'Sun', value: 2200 },
  ]

  const pieData = [
    { name: 'Organic', value: 35, color: '#38CE3C' },
    { name: 'Paid', value: 25, color: '#8E32E9' },
    { name: 'Social', value: 20, color: '#4FC3F7' },
    { name: 'Referral', value: 12, color: '#FFDE73' },
    { name: 'Direct', value: 8, color: '#FF4D6B' },
  ]

  const radarData = [
    { subject: 'Sales', A: 80, B: 70 },
    { subject: 'Marketing', A: 70, B: 80 },
    { subject: 'Dev', A: 90, B: 70 },
    { subject: 'Design', A: 85, B: 90 },
    { subject: 'Support', A: 60, B: 75 },
    { subject: 'Analytics', A: 75, B: 85 },
  ]

  const barColors = ['#38CE3C', '#38CE3C', '#4FC3F7', '#FF4D6B', '#FFDE73', '#FF8C00', '#38CE3C']

  const areaData = [
    { name: 'Jan', users: 1200, active: 800 },
    { name: 'Feb', users: 1800, active: 1200 },
    { name: 'Mar', users: 1400, active: 900 },
    { name: 'Apr', users: 2200, active: 1600 },
    { name: 'May', users: 1900, active: 1400 },
    { name: 'Jun', users: 2800, active: 2100 },
  ]

  const legendColors = {
    'Team A': '#38CE3C', 'Team B': '#8E32E9',
    'users': '#8E32E9', 'active': '#4FC3F7',
  }

  const renderLegend = (hidden, setHidden) => (props) => {
    const { payload } = props
    return (
      <ul className="chart-legend">
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            className={`chart-legend-item ${hidden[entry.value] ? 'hidden' : ''}`}
            onClick={() => setHidden(prev => ({ ...prev, [entry.value]: !prev[entry.value] }))}
          >
            <span className="legend-dot" style={{ background: legendColors[entry.value] || entry.color }} />
            <span className="legend-label">{entry.value}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>Charts & Visualizations</h1>
        <p>Interactive charts powered by Recharts.</p>
      </div>

      <div className="charts-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Monthly Revenue</div>
          </div>
          <div className="chart-wrap" style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip isAnimationActive={false} />
                <Line type="monotone" dataKey="value" stroke="#38CE3C" strokeWidth={2} dot={{ fill: '#38CE3C', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Weekly Sales</div>
          </div>
          <div className="chart-wrap" style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip isAnimationActive={false} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Traffic Sources</div>
          </div>
          <div className="chart-wrap" style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                  data={pieData.map(d => ({ ...d, value: pieHidden[d.name] ? 0 : d.value }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip isAnimationActive={false} />
                <Legend content={renderLegend(pieHidden, setPieHidden)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Performance Metrics</div>
          </div>
          <div className="chart-wrap" style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                <PolarGrid strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fontSize: 10 }} />
                <Radar name="Team A" dataKey="A" stroke={radarHidden['Team A'] ? 'transparent' : '#38CE3C'} fill={radarHidden['Team A'] ? 'transparent' : '#38CE3C'} fillOpacity={0.3} />
                <Radar name="Team B" dataKey="B" stroke={radarHidden['Team B'] ? 'transparent' : '#8E32E9'} fill={radarHidden['Team B'] ? 'transparent' : '#8E32E9'} fillOpacity={0.3} />
                <Legend content={renderLegend(radarHidden, setRadarHidden)} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card charts-full-width">
          <div className="card-header">
            <div className="card-title">User Growth</div>
          </div>
          <div className="chart-wrap" style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip isAnimationActive={false} />
                <Area type="monotone" dataKey="users" stackId="1" stroke={areaHidden['users'] ? 'transparent' : '#8E32E9'} fill={areaHidden['users'] ? 'transparent' : '#8E32E9'} fillOpacity={0.3} />
                <Area type="monotone" dataKey="active" stackId="1" stroke={areaHidden['active'] ? 'transparent' : '#4FC3F7'} fill={areaHidden['active'] ? 'transparent' : '#4FC3F7'} fillOpacity={0.3} />
                <Legend content={renderLegend(areaHidden, setAreaHidden)} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charts
