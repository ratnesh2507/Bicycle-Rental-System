# VeloRent — Bicycle Rental Frontend

A production-grade React + Vite + TailwindCSS frontend for the Bicycle Rental System.

---

## Tech Stack

| Purpose | Library |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | TailwindCSS 3 |
| Routing | **react-router-dom v6** |
| HTTP Client | **axios** |
| Toast Notifications | **react-hot-toast** |
| Icons | **lucide-react** |

---

## Project Structure

```
src/
├── context/
│   └── AuthContext.jsx      # Global auth state (login, register, logout)
├── services/
│   └── api.js               # All API calls (axios, auto-attaches JWT)
├── components/
│   ├── Navbar.jsx           # Responsive navigation
│   ├── BikeCard.jsx         # Bike display card with rent/return actions
│   └── ProtectedRoute.jsx   # Route guard for authenticated pages
├── pages/
│   ├── Home.jsx             # Landing page
│   ├── Login.jsx            # Login form
│   ├── Register.jsx         # Registration form
│   ├── Bikes.jsx            # Browse + filter + rent/return bikes
│   ├── History.jsx          # Rental history with active rentals
│   └── NotFound.jsx         # 404 page
├── App.jsx                  # Router setup
├── main.jsx                 # Entry point
└── index.css                # Tailwind + global styles
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the backend

Make sure the backend is running at `http://localhost:3000`.
See: https://github.com/ratnesh2507/Bicycle-rental-Backend

### 3. Start the frontend

```bash
npm run dev
```

The Vite dev server proxies all `/api/*` requests to `http://localhost:3000`,
so no CORS configuration is needed during development.

---

## Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/login` | Public | Sign in |
| `/register` | Public | Create account |
| `/bikes` | 🔒 Auth required | Browse, filter, rent & return bikes |
| `/history` | 🔒 Auth required | View active and past rentals |

---

## API Endpoints Used

All endpoints map directly to the backend:

```
POST   /api/auth/register       Register a new user
POST   /api/auth/login          Login and receive JWT

GET    /api/bicycles            List all bicycles
POST   /api/bicycles            Add bicycle (admin)
PUT    /api/bicycles/:id        Update bicycle (admin)
DELETE /api/bicycles/:id        Delete bicycle (admin)

POST   /api/rentals/rent        Rent a bicycle
POST   /api/rentals/return      Return a bicycle
GET    /api/rentals/history     Get user's rental history
```

---

## Environment / Configuration

The Vite proxy (`vite.config.js`) handles backend routing in dev:

```js
server: {
  proxy: {
    '/api': { target: 'http://localhost:3000', changeOrigin: true }
  }
}
```

For production, set the `VITE_API_BASE` env variable and update `src/services/api.js` accordingly.

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Serve with any static file host (Vercel, Netlify, Nginx).
