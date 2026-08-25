import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  // Helper to navigate to top of page
  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand block */}
          <div className="footer-info">
            <h4>
              <Leaf size={18} fill="currentColor" style={{ color: '#10b981' }} />
              EcoGuide
            </h4>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '12px' }}>
              "Small choices. Bigger impact."
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              EcoGuide is a Community Engagement Project (CEP) built to promote local environmental awareness, proper segregation habits, and sustainable living practices.
            </p>
          </div>

          {/* Quick links block */}
          <div className="footer-links">
            <h5>Navigation</h5>
            <ul>
              <li><button onClick={() => handleNavClick('home')}>Home</button></li>
              <li><button onClick={() => handleNavClick('find-waste')}>Find My Waste</button></li>
              <li><button onClick={() => handleNavClick('scanner')}>AI Scanner</button></li>
              <li><button onClick={() => handleNavClick('categories')}>Categories</button></li>
              <li><button onClick={() => handleNavClick('eco-tips')}>Eco Tips</button></li>
              <li><button onClick={() => handleNavClick('quiz')}>Waste Quiz</button></li>
            </ul>
          </div>

          {/* About project info */}
          <div className="footer-links">
            <h5>Resources</h5>
            <ul>
              <li><button onClick={() => handleNavClick('community')}>Community CEP Survey</button></li>
              <li><button onClick={() => handleNavClick('gallery')}>Field Activity Proof</button></li>
              <li><button onClick={() => handleNavClick('about')}>About the Team</button></li>
            </ul>
          </div>
        </div>

        {/* Essential Municipal Warning Banner */}
        <div className="footer-disclaimer">
          <strong>Notice: </strong>
          Waste-management practices and classifications may vary by location. Please follow your local collection guidelines and use authorized disposal/recycling channels where applicable.
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EcoGuide Platform. Built for CEP Community Engagement Project presentation.</p>
        </div>
      </div>
    </footer>
  );
}
