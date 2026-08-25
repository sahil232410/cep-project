import React, { useState, useEffect } from 'react';
import { wasteItems } from '../data/wasteData';

export default function FindWaste() {
  var [search, setSearch] = useState('');
  var [selectedItem, setSelectedItem] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(function () {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return function () {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  var filtered = wasteItems.filter(function (item) {
    var term = search.toLowerCase();
    var nameMatch = item.name.toLowerCase().indexOf(term) !== -1;
    var aliasMatch = item.aliases && item.aliases.some(function (a) {
      return a.toLowerCase().indexOf(term) !== -1;
    });
    return nameMatch || aliasMatch;
  });

  return (
    <section className={"find-waste" + (selectedItem ? " modal-open" : "")} id="find-waste">
      <div className="container">
        <h2>Find Your Waste</h2>
        <p className="page-subtitle">Search for any household item to learn how to dispose of it.</p>
        <input
          type="text"
          placeholder="Type item name... (e.g. banana peel, battery, bottle)"
          className="search-input"
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
        />

        {/* Waste items grid */}
        <div className="waste-grid">
          {filtered.map(function (item) {
            return (
              <div
                key={item.id}
                className="waste-card"
                onClick={function () { setSelectedItem(item); }}
              >
                <span className="waste-icon">{item.icon}</span>
                <span className="waste-name">{item.name}</span>
                <span className={'badge badge-' + item.category}>{item.category}</span>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && search !== '' && (
          <p className="no-results">No items found for "{search}". Try a different keyword.</p>
        )}

        {/* Detail modal */}
        {selectedItem && (
          <div className="modal-overlay" onClick={function () { setSelectedItem(null); }}>
            <div className="modal-content" onClick={function (e) { e.stopPropagation(); }} style={{ padding: '24px', maxWidth: '640px' }}>
              <button className="modal-close" onClick={function () { setSelectedItem(null); }}>✕</button>
              <div className="modal-header" style={{ marginBottom: '14px' }}>
                <span className="modal-icon" style={{ fontSize: '2rem' }}>{selectedItem.icon}</span>
                <h3 style={{ fontSize: '1.25rem' }}>{selectedItem.name}</h3>
                <span className={'badge badge-' + selectedItem.category}>{selectedItem.category}</span>
              </div>
              <p className="modal-description" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                {selectedItem.description}
              </p>

              {/* Two-Column Grid for lists */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--primary-dark)', marginBottom: '6px' }}>📋 What To Do</h4>
                  <ul className="modal-list" style={{ margin: 0, paddingLeft: 0 }}>
                    {selectedItem.whatToDo.map(function (step, i) {
                      return (
                        <li key={i} style={{ fontSize: '0.82rem', padding: '3px 0 3px 20px', lineHeight: '1.4' }}>
                          {step}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: '#ef4444', marginBottom: '6px' }}>⚠️ What To Avoid</h4>
                  <ul className="modal-list avoid" style={{ margin: 0, paddingLeft: 0 }}>
                    {selectedItem.avoid.map(function (item, i) {
                      return (
                        <li key={i} style={{ fontSize: '0.82rem', padding: '3px 0 3px 20px', lineHeight: '1.4' }}>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Environmental Impact & Best Option Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.92rem', marginBottom: '4px', color: 'var(--text-heading)' }}>🌍 Environmental Impact</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                    {selectedItem.environmentalImpact}
                  </p>
                </div>
                <div>
                  <div className="best-option" style={{ margin: 0, padding: '10px 14px', fontSize: '0.82rem' }}>
                    <strong>Best Option:</strong> {selectedItem.bestOption}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
