import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ArrowRight, Bike, Shield, Clock, MapPin } from 'lucide-react'

const features = [
  {
    icon: Bike,
    title: 'Wide Fleet',
    desc: 'Mountain, city, road and e-bikes available across multiple locations.',
  },
  {
    icon: Clock,
    title: 'Flexible Rentals',
    desc: 'Rent by the hour, day, or week. Return anytime at any dock.',
  },
  {
    icon: Shield,
    title: 'Insured & Safe',
    desc: 'Every bike is maintained, insured and GPS-tracked for your safety.',
  },
  {
    icon: MapPin,
    title: 'City-wide Coverage',
    desc: 'Docking stations across the city so you are never far from a ride.',
  },
]

const stats = [
  { value: '500+', label: 'Bikes Available' },
  { value: '12k+', label: 'Rides Completed' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Support' },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="grain min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-bark" />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #C4501A 0, #C4501A 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40">
          <div className="max-w-3xl">
            <p className="section-label text-stone mb-6 animate-fade-up">
              Urban Mobility Reimagined
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold text-cream leading-[0.95] mb-8 animate-fade-up stagger-1">
              Ride the City.<br />
              <span className="text-rust">Your Way.</span>
            </h1>
            <p className="text-stone text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up stagger-2">
              Premium bicycles at your fingertips. No queues, no commitments — 
              just you and the open road.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
              {user ? (
                <Link to="/bikes" className="btn-primary flex items-center gap-2">
                  Browse Fleet <ArrowRight size={16} />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary flex items-center gap-2">
                    Start Riding <ArrowRight size={16} />
                  </Link>
                  <Link to="/login" className="btn-secondary border-stone text-stone hover:bg-stone hover:border-stone">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Giant bike silhouette */}
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 pointer-events-none">
            <Bike size={500} strokeWidth={0.5} className="text-cream" />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-rust border-y-2 border-bark">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-extrabold text-3xl text-cream">{s.value}</div>
              <div className="font-mono text-xs uppercase tracking-widest text-cream/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <p className="section-label mb-3">Why VeloRent</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-bark">
            Built for the <br />
            <span className="text-rust">urban cyclist.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={f.title}
              className={`border-2 border-mist p-6 hover:border-bark transition-all duration-300
                          hover:shadow-[4px_4px_0px_#2C1810] animate-fade-up stagger-${i + 1}`}
            >
              <div className="w-10 h-10 bg-rust text-cream flex items-center justify-center mb-4">
                <f.icon size={18} />
              </div>
              <h3 className="font-display font-bold text-lg text-bark mb-2">{f.title}</h3>
              <p className="text-stone text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mist border-t-2 border-bark">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-bark mb-2">
              Ready for your first ride?
            </h2>
            <p className="text-stone">Create an account in under a minute.</p>
          </div>
          {!user && (
            <Link to="/register" className="btn-primary flex items-center gap-2 whitespace-nowrap">
              Join VeloRent <ArrowRight size={16} />
            </Link>
          )}
          {user && (
            <Link to="/bikes" className="btn-primary flex items-center gap-2 whitespace-nowrap">
              Browse Bikes <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bark text-stone py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bike size={16} className="text-rust" />
          <span className="font-display font-bold text-cream">VeloRent</span>
        </div>
        <p className="font-mono text-xs tracking-widest">© 2026 VeloRent. All rights reserved.</p>
      </footer>
    </div>
  )
}
