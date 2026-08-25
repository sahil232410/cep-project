import React, { useState } from 'react';
import { wasteItems } from '../data/wasteData';

export default function Categories() {
  var [selectedItem, setSelectedItem] = useState(null);

  // Get unique categories from the waste data
  const categoryList = [
    { id: 'wet', label: 'Wet / Organic', color: '#10b981', emoji: '🟢' },
    { id: 'dry', label: 'Dry / Non-Recyclable', color: '#f59e0b', emoji: '🟡' },
    { id: 'recyclable', label: 'Recyclable', color: '#3b82f6', emoji: '🔵' },
    { id: 'e-waste', label: 'E-Waste / Hazardous', color: '#ef4444', emoji: '🔴' }
  ];

  var handleItemClick = function (item) {
    setSelectedItem(item);
    setTimeout(function () {
      var element = document.getElementById('recycling-guide-board');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  return (
    <section className="categories-page" id="categories">
      <div className="container">
        <h2>Waste Categories</h2>
        <p className="page-subtitle">
          Understanding the four main categories of household waste helps you segregate correctly. Click on any item to see where it goes and how it is recycled.
        </p>

        <div className="categories-grid">
          {categoryList.map(function (cat) {
            // Filter items for this category
            var items = wasteItems.filter(function (item) {
              return item.category === cat.id;
            });

            return (
              <div key={cat.id} className="category-card" style={{ borderTop: '4px solid ' + cat.color }}>
                <div className="category-header">
                  <span className="category-emoji">{cat.emoji}</span>
                  <h3>{cat.label}</h3>
                  <span className="category-count">{items.length} items</span>
                </div>
                <ul className="category-items-list">
                  {items.map(function (item) {
                    var isSelected = selectedItem && selectedItem.id === item.id;
                    return (
                      <li 
                        key={item.id}
                        onClick={function () { handleItemClick(item); }}
                        style={{ 
                          cursor: 'pointer', 
                          transition: 'background-color 0.2s', 
                          padding: '8px 10px', 
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent'
                        }}
                        onMouseEnter={function(e) { if(!isSelected) e.currentTarget.style.backgroundColor = 'var(--primary-light)'; }}
                        onMouseLeave={function(e) { if(!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        <span className="item-icon">{item.icon}</span>
                        <span style={{ fontWeight: isSelected ? '700' : 'normal', color: isSelected ? 'var(--primary-dark)' : 'inherit' }}>
                          {item.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Recycling Guide Board */}
        {selectedItem && (
          <div id="recycling-guide-board" className="category-details-panel card" style={{ 
            marginTop: '32px', 
            borderLeft: '8px solid ' + (
              selectedItem.category === 'wet' ? '#10b981' :
              selectedItem.category === 'dry' ? '#f59e0b' :
              selectedItem.category === 'recyclable' ? '#3b82f6' : '#ef4444'
            )
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '2.5rem' }}>{selectedItem.icon}</span>
                <div>
                  <h3 style={{ margin: 0 }}>{selectedItem.name}</h3>
                  <span className={'badge badge-' + selectedItem.category} style={{ marginTop: '4px' }}>
                    {selectedItem.category}
                  </span>
                </div>
              </div>
              <button 
                className="btn-secondary" 
                onClick={function() { setSelectedItem(null); }}
                style={{ padding: '6px 14px', fontSize: '0.88rem' }}
              >
                ✕ Close Guide
              </button>
            </div>
            
            <p style={{ marginTop: '16px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {selectedItem.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '20px' }}>
              <div>
                <h4 style={{ color: 'var(--primary-dark)', fontSize: '1.05rem', marginBottom: '8px' }}>📋 How to Recycle &amp; Dispose</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {selectedItem.whatToDo.map(function(step, i) {
                    return <li key={i} style={{ marginBottom: '6px' }}>{step}</li>;
                  })}
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#ef4444', fontSize: '1.05rem', marginBottom: '8px' }}>⚠️ What to Avoid</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '0.92rem', lineHeight: '1.6', listStyleType: 'square' }}>
                  {selectedItem.avoid.map(function(step, i) {
                    return <li key={i} style={{ marginBottom: '6px' }}>{step}</li>;
                  })}
                </ul>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <h4 style={{ color: 'var(--text-heading)', fontSize: '1.05rem', marginBottom: '8px' }}>🌍 Environmental Impact</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  {selectedItem.environmentalImpact}
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--text-heading)', fontSize: '1.05rem', marginBottom: '8px' }}>📍 Best Disposal Route</h4>
                <div className="best-option" style={{ margin: 0, padding: '12px 16px' }}>
                  <strong>Best Option:</strong> {selectedItem.bestOption}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
