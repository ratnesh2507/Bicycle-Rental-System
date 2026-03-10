import { Link } from 'react-router-dom'
import { Bike, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-cream px-6 text-center">
      <div className="relative mb-8">
        <span className="font-display font-extrabold text-[8rem] leading-none text-mist select-none">
          404
        </span>
        <Bike
          size={60}
          strokeWidth={1.2}
          className="text-rust absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <h1 className="font-display font-bold text-3xl text-bark mb-3">Page not found</h1>
      <p className="text-stone font-mono text-sm mb-8 max-w-sm">
        Looks like you've taken a wrong turn. This road doesn't exist.
      </p>
      <Link to="/" className="btn-primary flex items-center gap-2">
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </div>
  )
}
