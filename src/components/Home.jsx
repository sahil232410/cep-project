import React from 'react';
import { wasteItems } from '../data/wasteData';

export default function Home(props) {
  var setCurrentPage = props.setCurrentPage;

  return (
    <div className="home" id="home">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-glass-card">
            <div className="hero-tag">🌿 EcoTrack Community Platform</div>
            <h1 className="hero-title">
              Welcome to <span>EcoTrack</span>
            </h1>
            <p className="hero-tagline">
              “Report. Track. Resolve.”
            </p>
            <p className="hero-desc">
              Helping communities report and track local waste-management problems. Segregate waste, resolve public issues, and keep our neighborhood clean.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={function() { setCurrentPage('report-waste'); }}>
                Report Waste
              </button>
              <button className="btn-secondary btn" onClick={function() { setCurrentPage('track-report'); }}>
                Track Report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">{wasteItems.length}+</div>
              <div className="stat-label">Identified Waste Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">4</div>
              <div className="stat-label">Waste Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">100%</div>
              <div className="stat-label">Community Driven</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">CEP</div>
              <div className="stat-label">BSc IT Project Topic #44</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Feature Cards Section */}
      <section className="matters-section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our Core Pillars</h2>
            <p>EcoTrack integrates environmental awareness with direct community action.</p>
          </div>
          <div className="matters-grid">
            {/* Card 1: Report Waste */}
            <div className="matter-card card" onClick={function() { setCurrentPage('report-waste'); }} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
              <div className="matter-icon-wrap" style={{ fontSize: '2rem' }}>♻️</div>
              <h3>Report Waste</h3>
              <p>Report garbage accumulations, overflowing community bins, or dumping issues with description and photos.</p>
              <span className="btn-text" style={{ padding: '4px 0', display: 'inline-block', marginTop: '12px' }}>File a Report →</span>
            </div>

            {/* Card 2: Track Reports */}
            <div className="matter-card card" onClick={function() { setCurrentPage('track-report'); }} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
              <div className="matter-icon-wrap" style={{ fontSize: '2rem' }}>🔎</div>
              <h3>Track Reports</h3>
              <p>Enter your unique report ID (e.g. ET-1001) to view the current cleaning status and resolution timeline.</p>
              <span className="btn-text" style={{ padding: '4px 0', display: 'inline-block', marginTop: '12px' }}>Track Progress →</span>
            </div>

            {/* Card 3: Waste Dashboard */}
            <div className="matter-card card" onClick={function() { setCurrentPage('admin-dashboard'); }} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
              <div className="matter-icon-wrap" style={{ fontSize: '2rem' }}>📊</div>
              <h3>Waste Dashboard</h3>
              <p>Access the Admin Dashboard to manage reports, update status reviews, and check waste analytics charts.</p>
              <span className="btn-text" style={{ padding: '4px 0', display: 'inline-block', marginTop: '12px' }}>View Dashboard →</span>
            </div>

            {/* Card 4: Learn & Recycle */}
            <div className="matter-card card" onClick={function() { setCurrentPage('find-waste'); }} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
              <div className="matter-icon-wrap" style={{ fontSize: '2rem' }}>🌱</div>
              <h3>Learn &amp; Recycle</h3>
              <p>Search household items using the Waste Finder. Learn segregation protocols, take quizzes, and check tips.</p>
              <span className="btn-text" style={{ padding: '4px 0', display: 'inline-block', marginTop: '12px' }}>Search Finder →</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section" style={{ background: 'var(--bg-card)', padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>How EcoTrack Works</h2>
            <p>Three simple steps to resolve community waste concerns</p>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div className="step-card card text-center" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div className="step-number" style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 16px' }}>1</div>
              <h3>Report</h3>
              <p>Residents take a photo of an overflowing garbage dump, fill in the location, and submit a ticket.</p>
            </div>
            <div className="step-card card text-center" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div className="step-number" style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 16px' }}>2</div>
              <h3>Track</h3>
              <p>The system generates a unique ID (e.g. ET-1001) allowing the resident to track the issue's lifecycle.</p>
            </div>
            <div className="step-card card text-center" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div className="step-number" style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 16px' }}>3</div>
              <h3>Resolve</h3>
              <p>Admin team reviews the complaint, schedules collections, and updates status to "Resolved".</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
