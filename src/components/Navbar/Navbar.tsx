import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar() {

  return (
    <nav className="navbar">
      <div className="nav-logo">MySite</div>
      <ul className="nav-links">
        <li><a href="/Markets">Markets</a></li>
        <li><a href="/Stocks">Stocks</a></li>
      </ul>
    </nav>
  );
}

