import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Bike, Eye, EyeOff, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/bikes'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(form)
    if (result.success) {
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-bark p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, #C4501A 0, #C4501A 1px, transparent 0, transparent 40%)',
            backgroundSize: '16px 16px'
          }}
        />
        <div className="relative flex items-center gap-2">
          <div className="w-8 h-8 bg-rust flex items-center justify-center">
            <Bike size={16} className="text-cream" />
          </div>
          <span className="font-display font-bold text-xl text-cream">VeloRent</span>
        </div>

        <div className="relative">
          <Bike size={200} strokeWidth={0.6} className="text-rust opacity-20 mb-8" />
          <h2 className="font-display font-extrabold text-5xl text-cream leading-tight mb-4">
            Good to<br />see you<br />again.
          </h2>
          <p className="text-stone text-lg">Your next adventure is one login away.</p>
        </div>

        <p className="relative font-mono text-xs text-stone/40 uppercase tracking-widest">
          Secure · Fast · Reliable
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-cream">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <p className="section-label mb-3">Welcome back</p>
            <h1 className="font-display font-bold text-4xl text-bark">Sign in</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-stone mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-stone mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone hover:text-bark"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
            >
              {loading ? 'Signing in…' : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center font-mono text-sm text-stone">
            New to VeloRent?{' '}
            <Link to="/register" className="text-rust hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
