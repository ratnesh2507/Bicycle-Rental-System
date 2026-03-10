import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bikes from "./pages/Bikes";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#2C1810",
              color: "#F5F0E8",
              fontFamily: '"DM Mono", monospace',
              fontSize: "13px",
              borderRadius: 0,
              border: "2px solid #C4501A",
            },
            success: {
              iconTheme: { primary: "#4A6741", secondary: "#F5F0E8" },
            },
            error: { iconTheme: { primary: "#C4501A", secondary: "#F5F0E8" } },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/bikes"
            element={
              <ProtectedRoute>
                <Bikes />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
