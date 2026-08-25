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

  // Filter tips based on selected category
  var filtered = activeCategory === 'All'
    ? ecoTips
    : ecoTips.filter(function (tip) { return tip.category === activeCategory; });

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
            onClick={function () { setActiveCategory('All'); }}
          >
            All
          </button>
          {allCategories.map(function (cat) {
            return (
              <button
                key={cat}
                className={'pill' + (activeCategory === cat ? ' pill-active' : '')}
                onClick={function () { setActiveCategory(cat); }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tips grid */}
        <div className="tips-grid">
          {filtered.map(function (tip) {
            return (
              <div key={tip.id} className="tip-card">
                <span className="tip-category-label">{tip.category}</span>
                <h4>{tip.title}</h4>
                <p>{tip.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
