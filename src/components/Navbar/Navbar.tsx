import { useAuth } from '../AuthContext';
import './Navbar.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const {isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="content">
        <nav className="navbar d-spacer">
          <div >
            <span className="nav-logo" style={{ fontWeight: 700, fontSize: "20px" }}>Market Tracker</span>
            <Link to="/markets" className="nav-link">Markets</Link>
            <Link to="/stocks" className="nav-link">Stocks</Link>
            {/* <Link to="/watchlist" className="nav-link">Watchlist</Link> */}
          </div>

          <div>
            { isAuthenticated && 
              <Link to="/logout" className="nav-link" onClick={(e) => {
                logout();
                navigate('/login');
              }}>Logout</Link>
            }
            { (isAuthenticated == false) && <Link to="/register" className="nav-link">Sign Up</Link>}
            { (isAuthenticated == false) && <Link to="/login" className="nav-link">Login</Link> }
          </div>
        </nav>

        <Outlet />
      </div>

      <footer className="d-spacer">
        <a>@ 2026 MarketWatch. All rights reserved.</a>
        <div>
          <a>Privacy</a>
          <a>Terms</a>
          <a>API Docs</a>
          <a>Contact</a>
        </div>
      </footer>
    </div>
  );
}

