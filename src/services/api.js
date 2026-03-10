import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// On 401, clear session and redirect — but skip auth endpoints
// (wrong password on /auth/login is also a 401, we don't want a redirect loop)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || ''
    if (err.response?.status === 401 && !url.includes('/auth/')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ── Auth ─────────────────────────────────────────────
// POST /api/auth/register  →  { token, user: { _id, name, email, role } }
// POST /api/auth/login     →  { token, user: { _id, name, email, role } }
// GET  /api/auth/me        →  { user: { _id, name, email, role } }
export const register = (data) => api.post('/auth/register', data)
export const login    = (data) => api.post('/auth/login', data)
export const getMe    = ()     => api.get('/auth/me')

// ── Bikes ─────────────────────────────────────────────
// GET    /api/bikes        →  array of bike objects (public)
// GET    /api/bikes/:id    →  single bike (public)
// POST   /api/bikes        →  created bike  (protected)
// PUT    /api/bikes/:id    →  updated bike  (protected)
// DELETE /api/bikes/:id    →  { message }   (protected)
export const getBikes    = ()           => api.get('/bikes')
export const getBike     = (id)         => api.get(`/bikes/${id}`)
export const createBike  = (data)       => api.post('/bikes', data)
export const updateBike  = (id, data)   => api.put(`/bikes/${id}`, data)
export const deleteBike  = (id)         => api.delete(`/bikes/${id}`)

export default api
