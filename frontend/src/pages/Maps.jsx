import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const locations = [
  { name: 'New York, USA', coords: [40.7128, -74.006], action: 'New user registered', time: '2 min ago' },
  { name: 'London, UK', coords: [51.5074, -0.1278], action: 'Order placed', time: '15 min ago' },
  { name: 'Berlin, Germany', coords: [52.52, 13.405], action: 'Product viewed', time: '1 hour ago' },
  { name: 'Paris, France', coords: [48.8566, 2.3522], action: 'Payment received', time: '2 hours ago' },
]

const Maps = () => {
  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>Maps</h1>
        <p>Interactive maps and location data visualization.</p>
      </div>

      <div className="map-placeholder" style={{ height: '400px', padding: 0, overflow: 'hidden' }}>
        <MapContainer center={[48, 10]} zoom={4} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((loc, i) => (
            <Marker key={i} position={loc.coords}>
              <Popup>
                <strong>{loc.name}</strong><br />
                {loc.action}<br />
                <span style={{ fontSize: '11px', color: '#666' }}>{loc.time}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="dashboard-grid-2" style={{ marginTop: '20px' }}>
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Location Statistics</div>
          </div>
          <div style={{ padding: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>1,234</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active Users</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>56</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Countries</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>89%</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Coverage</div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Top regions: United States, United Kingdom, Germany, France, Canada
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Recent Activity</div>
          </div>
          <div style={{ padding: '20px 0' }}>
            {locations.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{item.action}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.name}</div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maps
