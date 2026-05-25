const ErrorPages = () => {
  return (
    <div className="page-section active">
      <div className="page-title-bar">
        <h1>Error Pages</h1>
        <p>Custom error page templates.</p>
      </div>

      <div className="error-panels">
        <div className="error-panel">
          <div className="error-code">404</div>
          <div className="error-title">Page Not Found</div>
          <div className="error-desc">The page you're looking for doesn't exist or has been moved.</div>
          <button className="btn btn-primary btn-md">Go Home</button>
        </div>

        <div className="error-panel">
          <div className="error-code">500</div>
          <div className="error-title">Server Error</div>
          <div className="error-desc">Something went wrong on our end. Please try again later.</div>
          <button className="btn btn-primary btn-md">Retry</button>
        </div>

        <div className="error-panel">
          <div className="error-code">403</div>
          <div className="error-title">Access Denied</div>
          <div className="error-desc">You don't have permission to access this resource.</div>
          <button className="btn btn-primary btn-md">Contact Admin</button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPages
