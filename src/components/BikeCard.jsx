import { Bike, Package } from 'lucide-react'

export default function BikeCard({ bike, onRent, onReturn, isActiveRental }) {
  const isAvailable = bike.available === true

  return (
    <div className="card group relative overflow-hidden animate-fade-up">
      {/* Availability colour bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isAvailable ? 'bg-sage' : 'bg-rust'}`} />

      {/* Visual */}
      <div className="relative bg-mist h-48 flex items-center justify-center overflow-hidden">
        {bike.image ? (
          <img
            src={bike.image}
            alt={bike.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Bike
            size={72}
            className={`${isAvailable ? 'text-sage' : 'text-stone'}
                       group-hover:scale-110 transition-transform duration-300`}
            strokeWidth={1.2}
          />
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={isAvailable ? 'badge-available' : 'badge-rented'}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-display font-bold text-lg text-bark leading-tight">
            {bike.name}
          </h3>
          {bike.model && (
            <p className="text-stone text-sm font-mono mt-0.5">{bike.model}</p>
          )}
        </div>

        {bike.quantity != null && (
          <div className="flex items-center gap-1.5 text-sm text-stone mb-4">
            <Package size={13} />
            <span className="font-mono">{bike.quantity} in stock</span>
          </div>
        )}

        {/* Price + action */}
        <div className="flex items-center justify-between pt-4 border-t border-mist">
          <div>
            <span className="font-display font-bold text-xl text-bark">
              ₹{bike.rent_per_km}
            </span>
            <span className="text-stone text-xs font-mono ml-1">/km</span>
          </div>

          <div>
            {isActiveRental ? (
              <button onClick={() => onReturn(bike._id)} className="btn-danger text-sm py-2 px-4">
                Return
              </button>
            ) : isAvailable ? (
              <button onClick={() => onRent(bike._id)} className="btn-primary text-sm py-2 px-4">
                Rent Now
              </button>
            ) : (
              <span className="text-stone text-sm font-mono">Unavailable</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
