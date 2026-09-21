import { useState, useMemo } from 'react'
import { FiEdit, FiPower, FiX, FiChevronDown, FiSearch } from 'react-icons/fi'
import { toast } from 'react-toastify'

const defaultProducts = [
  { id: '#P1001', name: 'Wireless Headphones', category: 'Electronics', price: '$129.99', stock: 45, status: 'Active', color: '#8E32E9', online: true },
  { id: '#P1002', name: 'Organic Cotton T-Shirt', category: 'Apparel', price: '$34.99', stock: 120, status: 'Active', color: '#38CE3C', online: true },
  { id: '#P1003', name: 'Stainless Steel Bottle', category: 'Accessories', price: '$24.99', stock: 78, status: 'Active', color: '#4FC3F7', online: true },
  { id: '#P1004', name: 'Leather Notebook', category: 'Stationery', price: '$19.99', stock: 12, status: 'Low Stock', color: '#FF8C00', online: true },
  { id: '#P1005', name: 'Bluetooth Speaker', category: 'Electronics', price: '$79.99', stock: 0, status: 'Out of Stock', color: '#FF4D6B', online: false },
  { id: '#P1006', name: 'Yoga Mat', category: 'Fitness', price: '$49.99', stock: 34, status: 'Active', color: '#FFDE73', online: true },
  { id: '#P1007', name: 'Desk Lamp', category: 'Office', price: '$59.99', stock: 22, status: 'Active', color: '#38CE3C', online: true },
  { id: '#P1008', name: 'Ceramic Mug Set', category: 'Kitchen', price: '$29.99', stock: 5, status: 'Low Stock', color: '#8E32E9', online: true },
]

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [editProduct, setEditProduct] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState('')
  const perPage = 5

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('productsData')
    return saved ? JSON.parse(saved) : defaultProducts
  })

  const persistProducts = (updated) => {
    localStorage.setItem('productsData', JSON.stringify(updated))
  }

  const toggleOnline = (id) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, online: !p.online } : p)
      persistProducts(updated)
      return updated
    })
  }

  const handleEdit = (product) => {
    setEditProduct({ ...product })
  }

  const handleEditChange = (field, value) => {
    setEditProduct(prev => ({ ...prev, [field]: value }))
  }

  const saveEdit = () => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === editProduct.id ? editProduct : p)
      persistProducts(updated)
      return updated
    })
    setEditProduct(null)
    setCurrentPage(1)
    toast.success('Product updated!')
  }

  const filteredProducts = useMemo(() =>
    products.filter(p =>
      Object.values(p).some(val => String(val).toLowerCase().includes(filter.toLowerCase()))
    ), [products, filter])

  const totalPages = Math.ceil(filteredProducts.length / perPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage)

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Category', 'Price', 'Stock', 'Status', 'Online']
    const rows = filteredProducts.map(p => [p.id, p.name, p.category, p.price, p.stock, p.status, p.online ? 'Online' : 'Offline'])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `products_export_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV exported!')
  }

  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: 0, status: 'Active', color: '#38CE3C' })

  const handleAddProduct = () => {
    const colors = ['#8E32E9', '#38CE3C', '#4FC3F7', '#FF8C00', '#FF4D6B', '#FFDE73']
    const id = `#P${Date.now().toString(36).toUpperCase()}`
    const row = { id, ...newProduct, online: true, color: colors[products.length % colors.length] }
    const updated = [row, ...products]
    setProducts(updated)
    persistProducts(updated)
    setShowAddModal(false)
    setNewProduct({ name: '', category: '', price: '', stock: 0, status: 'Active', color: '#38CE3C' })
    setCurrentPage(1)
    toast.success(`Product "${newProduct.name}" added!`)
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'status-paid'
      case 'Low Stock': return 'status-pending'
      case 'Out of Stock': return 'status-failed'
      default: return ''
    }
  }

  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>Products</h1>
        <p>Manage your product inventory.</p>
      </div>

      <div className="dashboard-card">
        <div className="table-toolbar">
          <div className="search-input-wrap">
            <FiSearch className="search-icon-pos" size={14} />
            <input type="text" placeholder="Search..." value={filter} onChange={e => { setFilter(e.target.value); setCurrentPage(1) }} />
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>Add New</button>
          <button className="btn btn-outline btn-sm" onClick={handleExportCSV}>Export CSV</button>
        </div>
        <div className="table-wrap">
          <table className="fixed">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th className="center">Online</th>
                <th className="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p, i) => (
                <tr key={p.id}>
                  <td><span className="mono">{p.id}</span></td>
                  <td>
                    <div className="table-user">
                      <div className="avatar-circle" style={{ background: p.color }}>{p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td><span className="mono">{p.price}</span></td>
                  <td><span className="mono">{p.stock}</span></td>
                  <td><span className={`status-badge ${getStatusClass(p.status)}`}>{p.status}</span></td>
                  <td className="center"><span className={`status-badge ${p.online ? 'status-paid' : 'status-failed'}`}>{p.online ? 'Online' : 'Offline'}</span></td>
                  <td className="center">
                    <div className="action-btns">
                      <button className="btn-action btn-action-edit" title="Edit" onClick={() => handleEdit(p)}><FiEdit size={14} /></button>
                      <button className="btn-action" title={p.online ? 'Set Offline' : 'Set Online'} onClick={() => toggleOnline(p.id)} style={{ background: p.online ? 'rgba(56, 206, 60, 0.35)' : 'rgba(255, 77, 107, 0.35)' }}><FiPower size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="pagination-info">
            Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * perPage + 1} to{" "}
            {Math.min(currentPage * perPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} entries
          </div>
          <div className="pagination-btns">
            <button className="page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} className={`page-btn ${currentPage === page ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>
            ))}
            <button className="page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
          </div>
        </div>
      </div>

      {editProduct && (
        <div className="modal-overlay" onClick={() => setEditProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="card-title">Edit Product</div>
              <button className="modal-close" onClick={() => setEditProduct(null)}><FiX size={18} /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); saveEdit() }}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input className="form-control" value={editProduct.name} onChange={e => handleEditChange('name', e.target.value)} placeholder="Enter product name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input className="form-control" value={editProduct.category} onChange={e => handleEditChange('category', e.target.value)} placeholder="Enter category" />
                </div>
                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input className="form-control" value={editProduct.price} onChange={e => handleEditChange('price', e.target.value)} placeholder="e.g. $49.99" />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <input className="form-control" type="number" value={editProduct.stock} onChange={e => handleEditChange('stock', Number(e.target.value))} placeholder="0" />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <div className="select-wrap">
                    <select className="form-control" value={editProduct.status} onChange={e => handleEditChange('status', e.target.value)}>
                      <option>Active</option>
                      <option>Low Stock</option>
                      <option>Out of Stock</option>
                    </select>
                    <FiChevronDown className="select-arrow" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditProduct(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="card-title">Add Product</div>
              <button className="modal-close" onClick={() => setShowAddModal(false)}><FiX size={18} /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); handleAddProduct() }}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input className="form-control" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Enter product name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input className="form-control" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} placeholder="Enter category" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input className="form-control" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="e.g. $49.99" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <input className="form-control" type="number" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} placeholder="0" />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <div className="select-wrap">
                    <select className="form-control" value={newProduct.status} onChange={e => setNewProduct({ ...newProduct, status: e.target.value })}>
                      <option>Active</option>
                      <option>Low Stock</option>
                      <option>Out of Stock</option>
                    </select>
                    <FiChevronDown className="select-arrow" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={!newProduct.name.trim()}>Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
