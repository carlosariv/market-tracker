import { useAuth } from '../AuthContext';
import './Navbar.css';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

import sampleLogo from '../../assets/hero.png';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="page-container">

      <header className="site-header">
        <nav className="navbar">

          {/* Brand */}
          <Link to="/markets" className="navbar-brand">
            <img
              src={sampleLogo}
              alt="Market Tracker Logo"
              className="nav-logo-image"
            />

            <div className="brand-text">
              <span className="brand-name">Market Tracker</span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="nav-menu">
            <Link
              to="/markets"
              className={`nav-link ${isActive('/markets') ? 'active' : ''}`}
            >
              Markets
            </Link>

            <Link
              to="/stocks"
              className={`nav-link ${isActive('/stocks') ? 'active' : ''}`}
            >
              Stocks
            </Link>

            <Link
              to="/watchlist"
              className={`nav-link ${isActive('/watchlist') ? 'active' : ''}`}
            >
              Watchlist
            </Link>
          </div>

          {/* Authentication */}
          <div className="nav-actions">
            {isAuthenticated ? (
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="login-link">
                  Login
                </Link>

                <Link to="/register" className="signup-button">
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-content">

          <div className="footer-brand">
            <span className="footer-title">Market Tracker</span>
            <span className="footer-description">
              Track markets. Follow stocks. Stay informed.
            </span>
          </div>

          <div className="footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/api-docs">API Docs</Link>
            <Link to="/contact">Contact</Link>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 Market Tracker. All rights reserved.</span>
          <span>Market data provided by third-party APIs.</span>
        </div>
      </footer>

    </div>
  );
}
