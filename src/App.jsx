import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import About from "./pages/About";
import Auth from "./pages/Auth";

import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const { user, logout } = useAuth();

  return (
    <FavoritesProvider>
      <Router>
        <div className="container">
          {/* 🔥 CLICKABLE LOGO HEADER */}
          <Link to="/" className="logo">
            <img
              src="/android-chrome-512x512.png"
              alt="MovieFinder Logo"
              className="logo-img"
            />
            <span>MovieFinder</span>
          </Link>

          {/* NAV */}
          <nav>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/about">About</Link>

            {user ? (
              <>
                <span style={{ marginLeft: "10px", color: "#aaa" }}>
                  {user.email}
                </span>
                <button onClick={logout} style={{ marginLeft: "10px" }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth">Login</Link>
            )}
          </nav>

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
