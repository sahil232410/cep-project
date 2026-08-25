import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  // State to manage whether the mobile menu is open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State to manage theme (Light/Dark)
  const [theme, setTheme] = useState(function () {
    return localStorage.getItem('theme') || 'light';
  });

  // Apply theme to document documentElement
  useEffect(function () {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = function () {
    setTheme(function (prev) {
      return prev === 'light' ? 'dark' : 'light';
    });
  };

  // Navigation tabs definition
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'find-waste', label: 'Find Waste' },
    { id: 'scanner', label: 'AI Scanner' },
    { id: 'categories', label: 'Categories' },
    { id: 'eco-tips', label: 'Eco Tips' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'community', label: 'Community' },
    { id: 'gallery', label: 'Field Gallery' },
    { id: 'about', label: 'About' }
  ];

  // Helper to change page and auto-close mobile menu
  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    
    // Smooth scroll to top of window on page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Brand Logo */}
        <div className="nav-brand" onClick={() => handleNavClick('home')}>
          <div className="logo-leaf">
            <Leaf size={20} fill="currentColor" />
          </div>
          <span>EcoGuide</span>
        </div>

        {/* Action controls (Theme toggle + hamburger) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Hamburger button for mobile devices */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Links list */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <li 
              key={item.id} 
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            >
              <button onClick={() => handleNavClick(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
