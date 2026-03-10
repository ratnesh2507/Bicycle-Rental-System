import { useEffect, useState } from "react";
import { getRentalHistory } from "../services/api";
import {
  Clock,
  Bike,
  Calendar,
  ArrowRight,
  CheckCircle,
  Timer,
} from "lucide-react";
import toast from "react-hot-toast";

function fmt(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function duration(start, end) {
  if (!start) return "—";
  const ms = (end ? new Date(end) : new Date()) - new Date(start);
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}

export default function History() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRentalHistory()
      .then((res) => setRentals(res.data?.rentals || []))
      .catch(() => toast.error("Failed to load history"))
      .finally(() => setLoading(false));
  }, []);

  const active = rentals.filter((r) => r.status === "active");
  const past = rentals.filter((r) => r.status === "returned");
  const totalSpent = past.reduce((sum, r) => sum + (r.totalCost || 0), 0);
  const totalKm = past.reduce((sum, r) => sum + (r.totalKm || 0), 0);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      <div className="bg-bark text-cream py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-label text-stone mb-3">Account</p>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl">
            Rental <span className="text-rust">History</span>
          </h1>
          <p className="text-stone mt-2 font-mono text-sm">
            {rentals.length} total rental{rentals.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {past.length > 0 && (
        <div className="bg-rust border-y-2 border-bark">
          <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="font-display font-extrabold text-2xl text-cream">
                {past.length}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-cream/70 mt-1">
                Completed
              </p>
            </div>
            <div className="text-center">
              <p className="font-display font-extrabold text-2xl text-cream">
                {totalKm > 0 ? `${totalKm.toFixed(1)} km` : "—"}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-cream/70 mt-1">
                Total Distance
              </p>
            </div>
            <div className="text-center">
              <p className="font-display font-extrabold text-2xl text-cream">
                {totalSpent > 0 ? `₹${totalSpent}` : "—"}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-cream/70 mt-1">
                Total Spent
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-mist animate-pulse border-2 border-mist"
              />
            ))}
          </div>
        ) : rentals.length === 0 ? (
          <div className="text-center py-24">
            <Clock
              size={56}
              className="text-mist mx-auto mb-4"
              strokeWidth={1}
            />
            <h3 className="font-display font-bold text-2xl text-bark mb-2">
              No rentals yet
            </h3>
            <p className="text-stone font-mono text-sm">
              Your rental history will appear here after your first ride.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {active.length > 0 && (
              <section>
                <p className="section-label mb-4 flex items-center gap-2">
                  <Timer size={12} /> Active Now
                </p>
                <div className="space-y-3">
                  {active.map((r) => (
                    <RentalRow key={r._id} rental={r} isActive />
                  ))}
                </div>
              </section>
            )}
            {past.length > 0 && (
              <section>
                <p className="section-label mb-4 flex items-center gap-2">
                  <CheckCircle size={12} /> Completed
                </p>
                <div className="space-y-3">
                  {past.map((r) => (
                    <RentalRow key={r._id} rental={r} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RentalRow({ rental, isActive = false }) {
  const bike = rental.bike;

  return (
    <div
      className={`border-2 p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between
                     transition-all duration-200 animate-fade-up
                     ${
                       isActive
                         ? "border-rust bg-rust/5 shadow-[3px_3px_0px_#C4501A]"
                         : "border-mist hover:border-bark hover:shadow-[3px_3px_0px_#2C1810]"
                     }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center flex-shrink-0 overflow-hidden
                         ${isActive ? "bg-rust/10" : "bg-mist"}`}
        >
          {bike?.image ? (
            <img
              src={bike.image}
              alt={bike.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Bike size={20} className={isActive ? "text-rust" : "text-stone"} />
          )}
        </div>
        <div>
          <p className="font-display font-semibold text-bark">
            {bike?.name || "Unknown Bike"}
          </p>
          {bike?.model && (
            <p className="text-xs font-mono text-stone">{bike.model}</p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5">
            <span className="flex items-center gap-1 text-xs font-mono text-stone">
              <Calendar size={10} /> {fmt(rental.rentedAt)}
            </span>
            {rental.returnedAt && (
              <span className="flex items-center gap-1 text-xs font-mono text-stone">
                <ArrowRight size={10} /> {fmt(rental.returnedAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:flex-shrink-0 flex-wrap">
        <div className="text-right">
          <p className="font-mono text-xs text-stone uppercase tracking-wide">
            Duration
          </p>
          <p className="font-display font-bold text-bark">
            {duration(rental.rentedAt, rental.returnedAt)}
          </p>
        </div>
        {rental.totalKm != null && (
          <div className="text-right border-l-2 border-mist pl-4">
            <p className="font-mono text-xs text-stone uppercase tracking-wide">
              Distance
            </p>
            <p className="font-display font-bold text-bark">
              {rental.totalKm} km
            </p>
          </div>
        )}
        {rental.totalCost != null && (
          <div className="text-right border-l-2 border-mist pl-4">
            <p className="font-mono text-xs text-stone uppercase tracking-wide">
              Cost
            </p>
            <p className="font-display font-bold text-rust">
              ₹{rental.totalCost}
            </p>
          </div>
        )}
        <div
          className={`text-xs font-mono px-2 py-1 uppercase tracking-widest ml-2
                         ${isActive ? "bg-rust text-cream" : "bg-sage text-cream"}`}
        >
          {isActive ? "Active" : "Done"}
        </div>
      </div>
    </div>
  );
}
