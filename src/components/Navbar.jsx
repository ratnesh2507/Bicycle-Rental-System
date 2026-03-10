import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Bike, LogOut, Menu, X, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const isActive = (path) => location.pathname === path;

  const navLink = (path, label) => (
    <Link
      to={path}
      onClick={() => setMenuOpen(false)}
      className={`font-mono text-sm uppercase tracking-widest transition-colors duration-200
        ${isActive(path) ? "text-rust border-b-2 border-rust pb-0.5" : "text-bark hover:text-rust"}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b-2 border-bark">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-bark text-cream flex items-center justify-center group-hover:bg-rust transition-colors duration-200">
            <Bike size={16} />
          </div>
          <span className="font-display font-800 text-xl tracking-tight text-bark">
            Velo<span className="text-rust">Rent</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              {navLink("/bikes", "Browse")}
              {navLink("/history", "History")}
              <div className="flex items-center gap-3 ml-4 pl-4 border-l-2 border-mist">
                <span className="flex items-center gap-1 text-sm font-mono text-stone">
                  <User size={13} /> {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-mono text-stone hover:text-rust transition-colors duration-200"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {navLink("/login", "Login")}
              <Link to="/register" className="btn-primary text-sm py-2 px-5">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cream border-t-2 border-mist px-6 py-4 flex flex-col gap-4">
          {user ? (
            <>
              {navLink("/bikes", "Browse Bikes")}
              {navLink("/history", "Rental History")}
              <hr className="border-mist" />
              <span className="text-sm font-mono text-stone">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-mono text-rust"
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              {navLink("/login", "Login")}
              {navLink("/register", "Register")}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
