import React from 'react';

export default function About() {
  return (
    <section className="about-page" id="about">
      <div className="container">
        <h2>About EcoTrack</h2>
        <p className="page-subtitle">
          A Community Engagement Project (CEP) built by BSc IT students.
        </p>

        <div className="about-card">
          <h3>Project Purpose</h3>
          <p>
            EcoTrack is a community-level waste management tracking and awareness platform. It allows residents 
            to report local waste issues, track their resolution status, and learn how to segregate and dispose 
            of household waste responsibly. Our goal is to connect local community members with active environmental solutions.
          </p>
        </div>

        <div className="about-card">
          <h3>Why It Matters</h3>
          <p>
            India generates over 62 million tonnes of waste annually. Proper waste management begins by tracking 
            local issues and educating citizens on sorting at source. EcoTrack bridges this gap by enabling 
            participatory action and source segregation.
          </p>
        </div>

        <div className="about-card">
          <h3>How It Works</h3>
          <ul>
            <li><strong>Report Waste:</strong> Submit complaints about garbage accumulation or dumping with descriptions, location, and photo proof.</li>
            <li><strong>Track Report:</strong> Monitor the lifecycle of reported waste items (Reported ➔ Under Review ➔ In Progress ➔ Resolved).</li>
            <li><strong>Admin Dashboard:</strong> Allows local coordinators to manage incoming complaints, update statuses, and view analytics.</li>
            <li><strong>Waste Finder:</strong> Search for common household items to find their correct segregation categories.</li>
            <li><strong>Eco Tips &amp; Quiz:</strong> Educate citizens through tips and interactive quizzes.</li>
            <li><strong>Google Form Integration:</strong> Import and sync community reports collected via public surveys directly into the admin panel.</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>Technology Used</h3>
          <ul>
            <li>React.js (Frontend Framework)</li>
            <li>JavaScript (Programming Language)</li>
            <li>HTML &amp; CSS (Structure &amp; Styling)</li>
            <li>Vite (Build Tool)</li>
            <li>localStorage (For data persistence)</li>
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
            <li><strong>Atul</strong> — Core Waste Reporting &amp; Tracking</li>
            <li><strong>Shezad</strong> — Admin Dashboard &amp; Data Integration</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
