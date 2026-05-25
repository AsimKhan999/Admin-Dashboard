import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FiSearch, FiX, FiChevronDown, FiEdit, FiTrash2 } from 'react-icons/fi'
import { dataService } from '../services/dataService'
import { addUser, updateUser, deleteUser } from '../store/dataSlice'
import { toast } from 'react-toastify'

const Tables = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.data)
  const [tableData, setTableData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const q = searchParams.get('search')
    if (q) setFilter(q)
  }, [])
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [newUser, setNewUser] = useState({ name: '', role: 'Viewer', department: '', salary: '', joined: '', status: 'Active' })

  useEffect(() => {
    const saved = localStorage.getItem('tableData')
    if (saved) {
      setTableData(JSON.parse(saved))
    } else {
      const names = [
        'Alice Johnson', 'Bob Martinez', 'Carol White', 'David Lee', 'Elena Rodriguez',
        'Frank Kim', 'Grace Patel', 'Henry Brown', 'Iris Chen', 'Jake Wilson',
        'Karen Davis', 'Liam Thompson', 'Mia Garcia', 'Noah Anderson', 'Olivia Taylor',
      ]
      const roles = ['Admin', 'Editor', 'Viewer', 'Manager', 'Developer', 'Designer', 'Analyst', 'Support']
      const statuses = ['Active', 'Inactive', 'Pending', 'Suspended']
      const depts = ['Engineering', 'Marketing', 'Sales', 'Design', 'Support', 'Finance', 'HR', 'Product']
      const statusMap = { Active: 'status-paid', Inactive: 'status-failed', Pending: 'status-pending', Suspended: 'status-failed' }

      const data = names.map((name, i) => ({
        id: `STL-${1000 + i}`,
        name,
        role: roles[i % roles.length],
        department: depts[i % depts.length],
        status: statuses[i % statuses.length],
        joined: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i % 12]} ${2020 + Math.floor(i / 12)}`,
        salary: `$${(40000 + i * 3200).toLocaleString()}`,
        _statusClass: statusMap[statuses[i % statuses.length]],
      }))
      setTableData(data)
      localStorage.setItem('tableData', JSON.stringify(data))
    }
  }, [])

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(col)
      setSortDir('asc')
    }
  }

  const filteredData = tableData.filter(row =>
    Object.values(row).some(val => String(val).toLowerCase().includes(filter.toLowerCase()))
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortCol) return 0
    const va = a[sortCol], vb = b[sortCol]
    return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1)
  })

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const totalPages = Math.ceil(sortedData.length / rowsPerPage)

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2)
  const avatarColors = ['#38CE3C', '#8E32E9', '#FF4D6B', '#4FC3F7', '#FF8C00', '#FFDE73']

  const handleAddUser = () => {
    const id = `STL-${1000 + tableData.length + Math.floor(Math.random() * 1000)}`
    const statusMap = { Active: 'status-paid', Inactive: 'status-failed', Pending: 'status-pending', Suspended: 'status-failed' }
    const row = {
      id,
      name: newUser.name,
      role: newUser.role,
      department: newUser.department,
      status: newUser.status,
      joined: newUser.joined,
      salary: newUser.salary.startsWith('$') ? newUser.salary : `$${newUser.salary}`,
      _statusClass: statusMap[newUser.status],
    }
    const updated = [row, ...tableData]
    setTableData(updated)
    localStorage.setItem('tableData', JSON.stringify(updated))
    setShowAddModal(false)
    setNewUser({ name: '', role: 'Viewer', department: '', salary: '', joined: '', status: 'Active' })
    toast.success(`User "${newUser.name}" added!`)
  }

  const handleEditUser = () => {
    const updated = tableData.map(u => u.id === editUser.id ? { ...u, ...editUser, salary: editUser.salary.startsWith('$') ? editUser.salary : `$${editUser.salary}` } : u)
    setTableData(updated)
    localStorage.setItem('tableData', JSON.stringify(updated))
    setShowEditModal(false)
    setEditUser(null)
    toast.success('User updated!')
  }

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Delete user "${name}"?`)) {
      const updated = tableData.filter(u => u.id !== id)
      setTableData(updated)
      localStorage.setItem('tableData', JSON.stringify(updated))
      toast.success(`User "${name}" deleted!`)
    }
  }

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Role', 'Department', 'Joined', 'Salary', 'Status']
    const rows = sortedData.map(row => [row.id, row.name, row.role, row.department, row.joined, row.salary, row.status])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users_export_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV exported!')
  }

  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>Data Tables</h1>
        <p>Manage and view your data in tabular format.</p>
      </div>

      <div className="dashboard-card">
        <div className="table-toolbar">
          <div className="search-input-wrap">
            <FiSearch className="search-icon-pos" size={14} />
            <input
              type="text"
              placeholder="Search..."
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setCurrentPage(1) }}
            />
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>Add New</button>
          <button className="btn btn-outline btn-sm" onClick={handleExportCSV}>Export CSV</button>
        </div>

        <div className="table-wrap">
          <table className="fixed">
            <thead>
              <tr>
                {['id', 'name', 'role', 'department', 'joined', 'salary', 'status', 'actions'].map(col => (
                  col === 'actions' ? (
                    <th key="actions" className="center">Actions</th>
                  ) : (
                    <th key={col} className="sortable" onClick={() => handleSort(col)}>
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                      {sortCol === col && <span className="sort-indicator active">{sortDir === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => (
                <tr key={row.id}>
                  <td><span className="mono">{row.id}</span></td>
                  <td>
                    <div className="table-user">
                      <div className="avatar-circle" style={{ background: avatarColors[idx % avatarColors.length] }}>
                        {getInitials(row.name)}
                      </div>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td>{row.role}</td>
                  <td>{row.department}</td>
                  <td>{row.joined}</td>
                  <td><span className="mono">{row.salary}</span></td>
                  <td><span className={`status-badge ${row._statusClass}`}>{row.status}</span></td>
                  <td className="center">
                    <div className="action-btns">
                      <button className="btn-action btn-action-edit" title="Edit" onClick={() => { setEditUser({ ...row }); setShowEditModal(true) }}><FiEdit size={14} /></button>
                      <button className="btn-action btn-action-delete" title="Delete" onClick={() => handleDeleteUser(row.id, row.name)}><FiTrash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="pagination-btns">
            <button className="page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button className="page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="card-title">Add New User</div>
              <button className="modal-close" onClick={() => setShowAddModal(false)}><FiX size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-control" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Enter name" />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <div className="select-wrap">
                  <select className="form-control" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                  </select>
                  <FiChevronDown className="select-arrow" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input className="form-control" value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })} placeholder="Enter department" />
              </div>
              <div className="form-group">
                <label className="form-label">Joined</label>
                <input className="form-control" value={newUser.joined} onChange={(e) => setNewUser({ ...newUser, joined: e.target.value })} placeholder="e.g. Jan 2024" />
              </div>
              <div className="form-group">
                <label className="form-label">Salary</label>
                <input className="form-control" value={newUser.salary} onChange={(e) => setNewUser({ ...newUser, salary: e.target.value })} placeholder="e.g. 55000" />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <div className="select-wrap">
                  <select className="form-control" value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <FiChevronDown className="select-arrow" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleAddUser} disabled={!newUser.name.trim()}>Add User</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editUser && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="card-title">Edit User</div>
              <button className="modal-close" onClick={() => setShowEditModal(false)}><FiX size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-control" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} placeholder="Enter name" />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <div className="select-wrap">
                  <select className="form-control" value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                  </select>
                  <FiChevronDown className="select-arrow" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input className="form-control" value={editUser.department} onChange={(e) => setEditUser({ ...editUser, department: e.target.value })} placeholder="Enter department" />
              </div>
              <div className="form-group">
                <label className="form-label">Joined</label>
                <input className="form-control" value={editUser.joined} onChange={(e) => setEditUser({ ...editUser, joined: e.target.value })} placeholder="e.g. Jan 2024" />
              </div>
              <div className="form-group">
                <label className="form-label">Salary</label>
                <input className="form-control" value={editUser.salary} onChange={(e) => setEditUser({ ...editUser, salary: e.target.value.replace('$', '') })} placeholder="e.g. 55000" />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <div className="select-wrap">
                  <select className="form-control" value={editUser.status} onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <FiChevronDown className="select-arrow" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleEditUser} disabled={!editUser.name.trim()}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tables
