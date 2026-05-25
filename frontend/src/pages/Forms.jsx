import { useState, useRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { toast } from 'react-toastify'

const Forms = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Active',
  })
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Form submitted successfully!')
    console.log(formData)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleFile = (file) => {
    if (file) {
      toast.success(`File "${file.name}" uploaded!`)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleFileSelect = (e) => {
    handleFile(e.target.files[0])
  }

  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>Forms & Inputs</h1>
        <p>Various form elements and input types.</p>
      </div>

      <div className="dashboard-grid-2">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">User Form</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <div className="select-wrap">
                <select
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <FiChevronDown className="select-arrow" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <div className="select-wrap">
                <select
                  name="department"
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                  <option value="Support">Support</option>
                </select>
                <FiChevronDown className="select-arrow" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <div className="select-wrap">
                <select
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
                <FiChevronDown className="select-arrow" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-md">Submit Form</button>
          </form>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">File Upload</div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <div
            className={`drop-zone ${dragActive ? 'dragover' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="drop-zone-icon">📁</div>
            <div className="drop-zone-text">
              Drag & drop files here or <span>click to browse</span>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div className="card-title" style={{ marginBottom: '15px' }}>Toggle Switches</div>
            
            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">Enable Notifications</span>
            </div>

            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">Auto-save</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Forms
