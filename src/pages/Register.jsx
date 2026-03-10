import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Bike, Eye, EyeOff, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    const result = await register(form)
    if (result.success) {
      toast.success('Account created! Welcome to VeloRent 🚲')
      navigate('/bikes')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-rust p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #2C1810 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        <div className="relative flex items-center gap-2">
          <div className="w-8 h-8 bg-bark flex items-center justify-center">
            <Bike size={16} className="text-cream" />
          </div>
          <span className="font-display font-bold text-xl text-cream">VeloRent</span>
        </div>

        <div className="relative">
          <h2 className="font-display font-extrabold text-5xl text-cream leading-tight mb-4">
            Your first<br />ride is<br />waiting.
          </h2>
          <p className="text-cream/70 text-lg max-w-xs">
            Join thousands of urban riders who've made VeloRent their go-to way to explore the city.
          </p>
        </div>

        <div className="relative flex gap-6">
          {['500+ Bikes', '12k+ Riders', '24/7 Support'].map(s => (
            <div key={s}>
              <p className="font-mono text-xs uppercase tracking-widest text-cream/50">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-cream">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <p className="section-label mb-3">Create account</p>
            <h1 className="font-display font-bold text-4xl text-bark">Get started</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-stone mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Alex Rider"
                className="input-field"
              />
            </div>

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
                  placeholder="Min. 6 characters"
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
              {loading ? 'Creating account…' : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center font-mono text-sm text-stone">
            Already have an account?{' '}
            <Link to="/login" className="text-rust hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
