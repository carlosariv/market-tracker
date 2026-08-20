import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <nav className="navbar">
      <div className="nav-logo">Market Tracker</div>
        <nav> <Link to="/markets">Markets</Link></nav>
        <nav> <Link to="/stocks">Stocks</Link></nav>
         <nav> <Link to="/login">Logout</Link></nav>
    </nav>
  );
}

