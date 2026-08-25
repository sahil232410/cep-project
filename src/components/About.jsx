import React from 'react';

export default function About() {
  return (
    <section className="about-page" id="about">
      <div className="container">
        <h2>About EcoGuide</h2>
        <p className="page-subtitle">
          A Community Engagement Project (CEP) built by BSc IT students.
        </p>

        <div className="about-card">
          <h3>Project Purpose</h3>
          <p>
            EcoGuide helps people identify common household waste, understand its category,
            and learn how to segregate and dispose of it responsibly. Our goal is to raise
            environmental awareness in our local community through technology.
          </p>
        </div>

        <div className="about-card">
          <h3>Why It Matters</h3>
          <p>
            India generates over 62 million tonnes of waste annually. Only about 20% is
            processed or treated — the rest ends up in landfills. Proper waste segregation
            at the source (our homes) is the most impactful step every citizen can take.
          </p>
        </div>

        <div className="about-card">
          <h3>How It Works</h3>
          <ul>
            <li><strong>Find My Waste:</strong> Search for any household item and instantly see which bin it belongs in.</li>
            <li><strong>Categories:</strong> Learn the four main waste types — Wet, Dry, Recyclable, and E-Waste.</li>
            <li><strong>Eco Tips:</strong> Get practical daily tips to reduce, reuse, and recycle.</li>
            <li><strong>Quiz:</strong> Test your waste management knowledge with scenario-based questions.</li>
            <li><strong>Community:</strong> View real survey data collected from our neighborhood.</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>Technology Used</h3>
          <ul>
            <li>React.js (Frontend Framework)</li>
            <li>JavaScript (Programming Language)</li>
            <li>HTML &amp; CSS (Structure &amp; Styling)</li>
            <li>Vite (Build Tool)</li>
            <li>localStorage (For quiz scores)</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>Team Members</h3>
          <p>
            This project was created as part of the Community Engagement Project (CEP)
            curriculum for BSc IT by:
          </p>
          <ul>
            <li><strong>Sahil</strong> — UI Design &amp; Development</li>
            <li><strong>Atul</strong> — Research &amp; Content</li>
            <li><strong>Shezad</strong> — Survey &amp; Community Data</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
