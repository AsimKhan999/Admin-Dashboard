# Admin Dashboard

A responsive admin dashboard built with React, featuring interactive charts, maps, data tables, and full theme customization. Demo mode only — no backend required.

## Tech Stack

- **React** ^18.2.0
- **Vite** ^4.4.5
- **React Router** ^6.14.2
- **Redux Toolkit** ^1.9.5
- **Recharts** ^2.7.2
- **React Leaflet** ^4.x
- **React Icons** ^4.10.1
- **React Toastify** ^9.1.3

## Project Structure

```
admin-dashboard/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx           # Main layout wrapper (shell)
    │   │   ├── Sidebar.jsx          # Sidebar navigation
    │   │   └── Topbar.jsx           # Top bar with search, clock, theme, user menu
    │   ├── pages/
    │   │   ├── Login.jsx            # Login page (demo auth)
    │   │   ├── Dashboard.jsx        # Dashboard with charts & stats
    │   │   ├── Tables.jsx           # Data tables with pagination
    │   │   ├── Forms.jsx            # Form components
    │   │   ├── Charts.jsx           # Charts & visualizations
    │   │   ├── Notifications.jsx    # Notifications center
    │   │   ├── Settings.jsx         # Settings page
    │   │   ├── Maps.jsx             # Interactive map (Leaflet)
    │   │   ├── UserPages.jsx        # User profiles grid
    │   │   ├── ErrorPages.jsx       # Error page templates
    │   │   └── Products.jsx         # Products inventory
    │   ├── store/
    │   │   ├── store.js             # Redux store configuration
    │   │   ├── authSlice.js         # Authentication state
    │   │   ├── themeSlice.js        # Theme state (dark/light)
    │   │   └── dataSlice.js         # Data state (users, products, orders)
    │   ├── services/
    │   │   ├── api.js               # Axios instance
    │   │   ├── authService.js       # Auth API calls
    │   │   └── dataService.js       # Data API calls
    │   ├── App.jsx                  # Main App with lazy-loaded routes
    │   ├── main.jsx                 # Entry point
    │   └── index.css                # Global styles
    ├── .gitignore
    ├── .env.example
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## Installation & Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Demo Credentials

- **Email:** admin@example.com
- **Password:** admin123

## Features

### Dashboard
- Statistics cards with animated counters
- Performance bar chart (Day / Weekly / Monthly views)
- Sessions by channel (donut chart)
- Recent orders table

### Tables
- Sortable and filterable data tables
- Pagination
- Export to CSV
- Column visibility toggle

### Forms
- Form components with validation
- File upload with drag & drop
- Toggle switches
- Range sliders

### Charts
- Line charts (revenue trends)
- Bar charts (weekly sales)
- Pie charts (traffic sources)
- Radar charts (performance metrics)
- Area charts (user growth)

### Maps
- Interactive map powered by OpenStreetMap & Leaflet
- Location markers with popups
- Location statistics & recent activity feed

### Settings
- Dark/Light mode toggle
- Accent color customization
- 12/24 hour time format
- Account settings (name, email, timezone)
- Notification preferences toggles

### Additional Pages
- Notifications center with filtering
- User profiles grid
- Error page templates (404, 500, 403)

## Design

- Custom CSS variables for theming
- Responsive design (mobile, tablet, desktop)
- Dark mode support with persistent preference
- Smooth transitions and animations
- Card-based layout
- Lazy-loaded routes for faster initial load
- Sidebar and Topbar extracted as reusable components
