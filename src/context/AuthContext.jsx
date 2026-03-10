import { createContext, useContext, useState } from 'react'
import { login as apiLogin, register as apiRegister } from '../services/api'

const AuthContext = createContext(null)

// Pull error message from axios error response
const errMsg = (err, fallback) => {
  const d = err?.response?.data
  return d?.message || d?.error || (typeof d === 'string' ? d : null) || fallback
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  // Both register and login return { token, user: { _id, name, email, role } }
  const _handleAuthResponse = (data, fallbackEmail) => {
    const { token, user } = data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const login = async (credentials) => {
    setLoading(true)
    try {
      const { data } = await apiLogin(credentials)
      _handleAuthResponse(data, credentials.email)
      return { success: true }
    } catch (err) {
      return { success: false, message: errMsg(err, 'Login failed. Check your credentials.') }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setLoading(true)
    try {
      const { data } = await apiRegister(userData)
      _handleAuthResponse(data, userData.email)
      return { success: true }
    } catch (err) {
      return { success: false, message: errMsg(err, 'Registration failed. Please try again.') }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
