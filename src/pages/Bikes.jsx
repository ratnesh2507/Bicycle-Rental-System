import { useEffect, useState } from 'react'
import { getBikes } from '../services/api'
import BikeCard from '../components/BikeCard'
import { Search, Bike, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Bikes() {
  const [bikes, setBikes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [availFilter, setAvailFilter] = useState('all')
  // Track which bike the current user has "rented" locally (session-only)
  const [activeRentalId, setActiveRentalId] = useState(
    () => sessionStorage.getItem('activeRentalId') || null
  )

  const fetchBikes = async () => {
    setLoading(true)
    try {
      const { data } = await getBikes()
      setBikes(Array.isArray(data) ? data : [])
    } catch (err) {
      toast.error('Failed to load bikes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBikes() }, [])

  const handleRent = (bikeId) => {
    if (activeRentalId) {
      toast.error('Return your current bike before renting another')
      return
    }
    sessionStorage.setItem('activeRentalId', bikeId)
    setActiveRentalId(bikeId)
    toast.success('Bike rented! Enjoy your ride 🚲')
  }

  const handleReturn = (bikeId) => {
    sessionStorage.removeItem('activeRentalId')
    setActiveRentalId(null)
    toast.success('Bike returned. Thanks for riding!')
  }

  const filtered = bikes.filter((b) => {
    const matchSearch =
      !search ||
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.model?.toLowerCase().includes(search.toLowerCase())

    const matchAvail =
      availFilter === 'all' ||
      (availFilter === 'available' && b.available === true) ||
      (availFilter === 'unavailable' && b.available === false)

    return matchSearch && matchAvail
  })

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      <div className="bg-bark text-cream py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="section-label text-stone mb-3">Fleet</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="font-display font-extrabold text-4xl md:text-5xl">
              Available <span className="text-rust">Bikes</span>
            </h1>
            <button
              onClick={fetchBikes}
              className="flex items-center gap-2 font-mono text-sm text-stone hover:text-cream transition-colors"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {activeRentalId && (
            <div className="mt-6 bg-rust/20 border border-rust/40 px-4 py-3 flex items-center gap-2">
              <Bike size={16} className="text-rust" />
              <span className="text-sm font-mono text-cream">
                You have an active rental. Return it before renting another.
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="border-b-2 border-mist bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
            <input
              type="text"
              placeholder="Search by name or model…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 py-2 text-sm"
            />
          </div>
          <select
            value={availFilter}
            onChange={(e) => setAvailFilter(e.target.value)}
            className="input-field py-2 text-sm w-auto pr-8 cursor-pointer"
          >
            <option value="all">All Bikes</option>
            <option value="available">Available Only</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-mist animate-pulse h-72 border-2 border-mist" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Bike size={56} className="text-mist mx-auto mb-4" strokeWidth={1} />
            <h3 className="font-display font-bold text-2xl text-bark mb-2">No bikes found</h3>
            <p className="text-stone font-mono text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <p className="section-label mb-6">
              {filtered.length} bike{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((bike) => (
                <BikeCard
                  key={bike._id}
                  bike={bike}
                  onRent={handleRent}
                  onReturn={handleReturn}
                  isActiveRental={activeRentalId === bike._id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
