import React, { useState, useEffect } from 'react';
import { wasteItems } from '../data/wasteData';

export default function Home(props) {
  var setCurrentPage = props.setCurrentPage;
  
  function handleFindWaste() {
    setCurrentPage('find-waste');
  }

  // Personal Waste Tracker States
  var [trackerLogs, setTrackerLogs] = useState(function () {
    var saved = localStorage.getItem('trackerLogs');
    return saved ? JSON.parse(saved) : [];
  });
  var [itemName, setItemName] = useState('');
  var [itemCategory, setItemCategory] = useState('wet');
  var [itemWeight, setItemWeight] = useState(100);

  // Sync tracker logs to local storage
  useEffect(function () {
    localStorage.setItem('trackerLogs', JSON.stringify(trackerLogs));
  }, [trackerLogs]);

  var handleAddLog = function (e) {
    e.preventDefault();
    if (!itemWeight || itemWeight <= 0) return;
    
    var newLog = {
      id: Date.now(),
      name: itemName.trim() || (itemCategory.charAt(0).toUpperCase() + itemCategory.slice(1) + ' Item'),
      category: itemCategory,
      weight: parseFloat(itemWeight)
    };

    setTrackerLogs([newLog, ...trackerLogs]);
    setItemName('');
    setItemWeight(100);
  };

  var handleDeleteLog = function (id) {
    setTrackerLogs(trackerLogs.filter(function (log) {
      return log.id !== id;
    }));
  };

  var handleClearLogs = function () {
    if (window.confirm('Are you sure you want to clear all logged waste for today?')) {
      setTrackerLogs([]);
    }
  };

  // Calculations
  var totalWeight = trackerLogs.reduce(function (sum, log) {
    return sum + log.weight;
  }, 0);

  var categoryWeights = trackerLogs.reduce(function (acc, log) {
    acc[log.category] = (acc[log.category] || 0) + log.weight;
    return acc;
  }, { wet: 0, dry: 0, recyclable: 0, 'e-waste': 0 });

  var recyclableWeight = categoryWeights['recyclable'] + categoryWeights['wet']; 
  var recyclingRate = totalWeight > 0 ? Math.round((recyclableWeight / totalWeight) * 100) : 0;

  // Determine Badge
  var getEcoBadge = function (weight) {
    if (weight === 0) return { title: 'Log Waste to Start', icon: '🌱', desc: 'Add items you segregated today to see your eco status!' };
    if (weight < 500) return { title: 'Eco Starter', icon: '🌟', desc: 'Great job starting to segregate! Keep it up!' };
    if (weight < 1500) return { title: 'Green Citizen', icon: '🌿', desc: 'Wonderful segregation efforts! You are helping protect landfills.' };
    return { title: 'Zero Waste Champion', icon: '🏆', desc: 'Outstanding! Your sorted and recovered rate is excellent!' };
  };

  var ecoBadge = getEcoBadge(totalWeight);

  return (
    <div className="home" id="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-tag">🌿 Your Guide to a Greener Planet</div>
          <h1 className="hero-title">
            Welcome to <span>EcoGuide</span>
          </h1>
          <p className="hero-subtitle">
            Identify, segregate, and responsibly dispose of household waste. Join our community in making a positive environmental impact.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={handleFindWaste}>
              Find My Waste
            </button>
            <button className="btn-secondary btn" onClick={function() { setCurrentPage('quiz'); }}>
              Take the Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">{wasteItems.length}+</div>
              <div className="stat-label">Waste Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">4</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">100%</div>
              <div className="stat-label">Free to Use</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">24/7</div>
              <div className="stat-label">Accessible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Segregation Matters Section */}
      <section className="matters-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Segregation Matters</h2>
            <p>Proper waste management starts at home. Here's why your effort counts.</p>
          </div>
          <div className="matters-grid">
            <div className="matter-card card">
              <div className="matter-icon-wrap">🌍</div>
              <h3>Reduces Landfill</h3>
              <p>Segregating waste prevents recyclable and compostable materials from taking up space in landfills.</p>
            </div>
            <div className="matter-card card">
              <div className="matter-icon-wrap">♻️</div>
              <h3>Improves Recycling</h3>
              <p>Clean, segregated dry waste is much easier to process and recycle efficiently.</p>
            </div>
            <div className="matter-card card">
              <div className="matter-icon-wrap">🌱</div>
              <h3>Creates Compost</h3>
              <p>Wet waste can be converted into nutrient-rich compost for agriculture and gardens.</p>
            </div>
            <div className="matter-card card">
              <div className="matter-icon-wrap">🛡️</div>
              <h3>Prevents Hazards</h3>
              <p>Keeping e-waste and hazardous materials out of regular bins protects sanitation workers and the environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Waste Tracker Section */}
      <section className="tracker-section">
        <div className="container">
          <div className="section-header">
            <h2>🌱 Personal Waste Log &amp; Tracker</h2>
            <p>Log your daily household waste items to see your recovery rate and earn Eco Badges!</p>
          </div>

          <div className="tracker-grid">
            {/* Form Column */}
            <form onSubmit={handleAddLog} className="tracker-form-card">
              <h3>Log Waste Item</h3>
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>Item Name (Optional)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Apple core, Plastic bottle" 
                  value={itemName}
                  onChange={function(e) { setItemName(e.target.value); }}
                />
              </div>

              <div className="form-group">
                <label>Waste Category</label>
                <select 
                  className="form-control" 
                  value={itemCategory}
                  onChange={function(e) { setItemCategory(e.target.value); }}
                >
                  <option value="wet">🟢 Wet Waste (Organic/Compostable)</option>
                  <option value="dry">🟡 Dry Waste (Non-Recyclable)</option>
                  <option value="recyclable">🔵 Recyclable Waste (Paper/Plastic/Metal)</option>
                  <option value="e-waste">🔴 E-Waste / Hazardous</option>
                </select>
              </div>

              <div className="form-group">
                <label>Estimated Weight (grams)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  min="1" 
                  value={itemWeight}
                  onChange={function(e) { setItemWeight(e.target.value); }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Log Waste Item
              </button>
            </form>

            {/* Dashboard Column */}
            <div className="tracker-dashboard-card">
              <h3>Your Progress Today</h3>

              {/* Eco Badge Box */}
              <div className="badge-earned-box" style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '2.5rem' }}>{ecoBadge.icon}</div>
                <div className="badge-title">{ecoBadge.title}</div>
                <p style={{ margin: '8px 0 0', fontSize: '0.88rem', opacity: 0.8 }}>{ecoBadge.desc}</p>
              </div>

              {/* Stats Row */}
              <div className="tracker-stats-row">
                <div className="tracker-stat-box">
                  <div className="tracker-stat-val">{(totalWeight / 1000).toFixed(2)} kg</div>
                  <div className="tracker-stat-lbl">Total Waste Logged</div>
                </div>
                <div className="tracker-stat-box">
                  <div className="tracker-stat-val">{recyclingRate}%</div>
                  <div className="tracker-stat-lbl">Recovery &amp; Recycle Rate</div>
                </div>
              </div>

              {/* Logged List Title */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1rem' }}>Logged Items ({trackerLogs.length})</h4>
                {trackerLogs.length > 0 && (
                  <button type="button" className="btn-danger-text" onClick={handleClearLogs}>
                    Clear All
                  </button>
                )}
              </div>

              {/* Log List */}
              {trackerLogs.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '16px', fontStyle: 'italic' }}>
                  No items logged today. Use the form on the left to start tracking!
                </p>
              ) : (
                <ul className="tracker-logs-list">
                  {trackerLogs.map(function(log) {
                    var bulletColor = 
                      log.category === 'wet' ? '🟢' : 
                      log.category === 'dry' ? '🟡' : 
                      log.category === 'recyclable' ? '🔵' : '🔴';
                    return (
                      <li key={log.id} className="tracker-log-item">
                        <span>
                          <span style={{ marginRight: '8px' }}>{bulletColor}</span>
                          <strong>{log.name}</strong> 
                          <span style={{ color: 'var(--text-muted)', marginLeft: '6px' }}>({log.weight}g)</span>
                        </span>
                        <button 
                          className="btn-danger-text" 
                          onClick={function() { handleDeleteLog(log.id); }}
                        >
                          Delete
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <h2>How EcoGuide Works</h2>
            <p>Three simple steps to better waste management</p>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div className="step-card card text-center" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div className="step-number" style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 16px' }}>1</div>
              <h3>Search</h3>
              <p>Type in the name of the item you want to throw away in the Find Waste section.</p>
            </div>
            <div className="step-card card text-center" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div className="step-number" style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 16px' }}>2</div>
              <h3>Identify</h3>
              <p>Learn which category (Wet, Dry, Recyclable, E-Waste) it belongs to instantly.</p>
            </div>
            <div className="step-card card text-center" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div className="step-number" style={{ width: '40px', height: '40px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 16px' }}>3</div>
              <h3>Dispose</h3>
              <p>Follow our best practices to segregate and dispose of the item responsibly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
