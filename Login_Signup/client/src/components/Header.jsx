// src/components/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_iJUajtQMR6w_jl_rhLtkF3W6OdBHPitAA&s" alt="UIDAI Logo" />
      </div>
      <nav className="navbar">
        <h1>Welcome to UIDAI</h1>
        <ul>
          <li><a href="#services">Services</a></li>
          <li><a href="#announcements">Announcements</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
