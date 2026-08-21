import './Navbar.css';
import { Link, Outlet } from 'react-router-dom';

export default function Navbar() {

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo">Market Tracker</div>
        <Link to="/markets">Markets</Link>
        <Link to="/stocks">Stocks</Link>
        <Link to="/login">Logout</Link>
      </nav>

      <Outlet/>

      <footer>
        <a>@ 2026 MarketWatch. All rights reserved.</a>
        <a>Privacy</a>
        <a>Terms</a>
        <a>API Docs</a>
        <a>Contact</a>
      </footer>
    </div>
  );
}

