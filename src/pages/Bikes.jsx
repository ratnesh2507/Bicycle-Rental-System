import { useEffect, useState } from "react";
import {
  getBikes,
  rentBike,
  returnBike,
  getActiveRental,
} from "../services/api";
import BikeCard from "../components/BikeCard";
import { Search, Bike, RefreshCw, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Bikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [availFilter, setAvailFilter] = useState("all");
  const [activeRental, setActiveRental] = useState(null);
  const [returnModal, setReturnModal] = useState(false);
  const [totalKm, setTotalKm] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [bikesRes, activeRes] = await Promise.all([
        getBikes(),
        getActiveRental(),
      ]);
      setBikes(Array.isArray(bikesRes.data) ? bikesRes.data : []);
      setActiveRental(activeRes.data?.rental || null);
    } catch (err) {
      toast.error("Failed to load bikes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleRent = async (bikeId) => {
    if (activeRental) {
      toast.error("Return your current bike before renting another");
      return;
    }
    setActionLoading(true);
    try {
      const { data } = await rentBike(bikeId);
      setActiveRental(data.rental);
      toast.success("Bike rented! Enjoy your ride 🚲");
      await fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to rent bike");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReturnSubmit = async () => {
    if (!activeRental) return;
    setActionLoading(true);
    try {
      await returnBike(activeRental._id, totalKm ? Number(totalKm) : null);
      setActiveRental(null);
      setReturnModal(false);
      setTotalKm("");
      toast.success("Bike returned. Thanks for riding!");
      await fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to return bike");
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = bikes.filter((b) => {
    const matchSearch =
      !search ||
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.model?.toLowerCase().includes(search.toLowerCase());
    const matchAvail =
      availFilter === "all" ||
      (availFilter === "available" && b.available === true) ||
      (availFilter === "unavailable" && b.available === false);
    return matchSearch && matchAvail;
  });

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
              onClick={fetchAll}
              className="flex items-center gap-2 font-mono text-sm text-stone hover:text-cream transition-colors"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {activeRental && (
            <div className="mt-6 bg-rust/20 border border-rust/40 px-4 py-3 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Bike size={16} className="text-rust" />
                <span className="text-sm font-mono text-cream">
                  Active rental: <strong>{activeRental.bike?.name}</strong>
                </span>
              </div>
              <button
                onClick={() => setReturnModal(true)}
                className="btn-danger text-sm py-1.5 px-4"
              >
                Return Bike
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="border-b-2 border-mist bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-48">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone"
            />
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
              <div
                key={i}
                className="bg-mist animate-pulse h-72 border-2 border-mist"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Bike
              size={56}
              className="text-mist mx-auto mb-4"
              strokeWidth={1}
            />
            <h3 className="font-display font-bold text-2xl text-bark mb-2">
              No bikes found
            </h3>
            <p className="text-stone font-mono text-sm">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            <p className="section-label mb-6">
              {filtered.length} bike{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((bike) => (
                <BikeCard
                  key={bike._id}
                  bike={bike}
                  onRent={handleRent}
                  onReturn={() => setReturnModal(true)}
                  isActiveRental={activeRental?.bike?._id === bike._id}
                  disabled={actionLoading}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {returnModal && (
        <div className="fixed inset-0 bg-bark/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-cream border-2 border-bark w-full max-w-md p-8 relative">
            <button
              onClick={() => {
                setReturnModal(false);
                setTotalKm("");
              }}
              className="absolute top-4 right-4 text-stone hover:text-bark"
            >
              <X size={20} />
            </button>
            <p className="section-label mb-2">Return</p>
            <h2 className="font-display font-bold text-2xl text-bark mb-1">
              {activeRental?.bike?.name}
            </h2>
            <p className="text-stone font-mono text-sm mb-6">
              Rate: ₹{activeRental?.bike?.rent_per_km}/km
            </p>
            <div className="mb-6">
              <label className="block font-mono text-xs uppercase tracking-widest text-stone mb-2">
                Distance ridden (km) — optional
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={totalKm}
                onChange={(e) => setTotalKm(e.target.value)}
                placeholder="e.g. 12.5"
                className="input-field"
              />
              {totalKm && activeRental?.bike?.rent_per_km && (
                <p className="mt-2 font-mono text-sm text-rust font-medium">
                  Estimated cost: ₹
                  {Math.round(Number(totalKm) * activeRental.bike.rent_per_km)}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setReturnModal(false);
                  setTotalKm("");
                }}
                className="btn-secondary flex-1 text-sm py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReturnSubmit}
                disabled={actionLoading}
                className="btn-danger flex-1 text-sm py-2 disabled:opacity-50"
              >
                {actionLoading ? "Returning…" : "Confirm Return"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
