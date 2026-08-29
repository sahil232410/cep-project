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
              <Leaf size={18} fill="currentColor" style={{ color: 'var(--primary-hover)', marginRight: '6px' }} />
              EcoTrack
            </h4>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '12px' }}>
              "Report. Track. Resolve."
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              EcoTrack is a community-level waste management tracking and awareness platform built as a Community Engagement Project (CEP).
            </p>
          </div>

          {/* Quick links block */}
          <div className="footer-links">
            <h5>Navigation</h5>
            <ul>
              <li><button onClick={() => handleNavClick('home')}>Home</button></li>
              <li><button onClick={() => handleNavClick('report-waste')}>Report Waste</button></li>
              <li><button onClick={() => handleNavClick('track-report')}>Track Report</button></li>
              <li><button onClick={() => handleNavClick('find-waste')}>Waste Finder</button></li>
              <li><button onClick={() => handleNavClick('eco-tips')}>Eco Tips</button></li>
              <li><button onClick={() => handleNavClick('quiz')}>Waste Quiz</button></li>
            </ul>
          </div>

          {/* About project info */}
          <div className="footer-links">
            <h5>Resources</h5>
            <ul>
              <li><button onClick={() => handleNavClick('gallery')}>Field Activity Proof</button></li>
              <li><button onClick={() => handleNavClick('scanner')}>AI Scanner Demo</button></li>
              <li><button onClick={() => handleNavClick('about')}>About the Team</button></li>
            </ul>
          </div>
        </div>

        {/* Essential Municipal Warning Banner */}
        <div className="footer-disclaimer">
          <strong>Notice: </strong>
          EcoTrack is a student CEP project designed for community waste awareness and incident tracking. Always follow official local body instructions for commercial hazardous waste.
        </div>

        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>© {new Date().getFullYear()} EcoTrack Platform. Built for CEP Community Engagement Project presentation.</p>
        </div>
      </div>
    </footer>
  );
}
