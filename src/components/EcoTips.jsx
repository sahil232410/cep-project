import React, { useState } from 'react';
import { ecoTips } from '../data/ecoTips';

export default function EcoTips() {
  // Get all unique tip categories
  var allCategories = [];
  ecoTips.forEach(function (tip) {
    if (allCategories.indexOf(tip.category) === -1) {
      allCategories.push(tip.category);
    }
  });

  var [activeCategory, setActiveCategory] = useState('All');
  var [currentPage, setCurrentPage] = useState(1);

  // Filter tips based on selected category
  var filtered = activeCategory === 'All'
    ? ecoTips
    : ecoTips.filter(function (tip) { return tip.category === activeCategory; });

  // Pagination bounds
  var itemsPerPage = 6;
  var totalPages = Math.ceil(filtered.length / itemsPerPage);
  var paginatedTips = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="eco-tips-page" id="eco-tips">
      <div className="container">
        <h2>Eco Tips</h2>
        <p className="page-subtitle">
          Simple, actionable tips to reduce waste and live sustainably.
        </p>

        {/* Category filter pills */}
        <div className="filter-pills">
          <button
            className={'pill' + (activeCategory === 'All' ? ' pill-active' : '')}
            onClick={function () { setActiveCategory('All'); setCurrentPage(1); }}
          >
            All
          </button>
          {allCategories.map(function (cat) {
            return (
              <button
                key={cat}
                className={'pill' + (activeCategory === cat ? ' pill-active' : '')}
                onClick={function () { setActiveCategory(cat); setCurrentPage(1); }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tips grid */}
        <div className="tips-grid">
          {paginatedTips.map(function (tip) {
            return (
              <div key={tip.id} className="tip-card">
                <span className="tip-category-label">{tip.category}</span>
                <h4>{tip.title}</h4>
                <p>{tip.description}</p>
              </div>
            );
          })}
        </div>

        {/* Pagination navigation controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '40px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={function () { setCurrentPage(Math.max(1, currentPage - 1)); }}
              disabled={currentPage === 1}
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              ← Previous
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={function () { setCurrentPage(Math.min(totalPages, currentPage + 1)); }}
              disabled={currentPage === totalPages}
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
