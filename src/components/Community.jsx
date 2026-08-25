import React, { useState, useEffect } from 'react';
import { communitySurveyData } from '../data/communityData';

export default function Community() {
  var data = communitySurveyData;

  // React state for dynamic questions, persisted in local storage
  var [questions, setQuestions] = useState(function () {
    var saved = localStorage.getItem('communityQuestions');
    return saved ? JSON.parse(saved) : data.questions;
  });

  // State for form inputs
  var [newQuestionText, setNewQuestionText] = useState('');
  var [newYesPercentage, setNewYesPercentage] = useState(50);
  var [newInsight, setNewInsight] = useState('');

  // Sync questions to local storage
  useEffect(function () {
    localStorage.setItem('communityQuestions', JSON.stringify(questions));
  }, [questions]);

  // Handle adding new question
  var handleAddQuestion = function (e) {
    e.preventDefault();
    if (!newQuestionText.trim() || !newInsight.trim()) return;

    var newQuestion = {
      id: 'custom-' + Date.now(),
      questionText: newQuestionText.trim(),
      yesPercentage: Math.max(0, Math.min(100, parseInt(newYesPercentage) || 0)),
      insight: newInsight.trim()
    };

    setQuestions([...questions, newQuestion]);
    setNewQuestionText('');
    setNewYesPercentage(50);
    setNewInsight('');
  };

  // Reset to default dataset
  var handleResetQuestions = function () {
    if (window.confirm('Reset all survey questions to the original default database?')) {
      setQuestions(data.questions);
    }
  };

  return (
    <section className="community-page" id="community">
      <div className="container">
        <h2>{data.metadata.title}</h2>
        <p className="page-subtitle">
          Location: {data.metadata.targetLocation} | Date: {data.metadata.dateConducted} | People Surveyed: {data.metadata.peopleSurveyed}
        </p>

        {/* Survey Results Grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '40px 0 20px', borderBottom: '2px solid var(--primary-light)', paddingBottom: '10px' }}>
          <h3 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--text-heading)' }}>Survey Results</h3>
          <button type="button" className="btn-secondary" onClick={handleResetQuestions} style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
            Reset to Defaults
          </button>
        </div>

        <div className="survey-grid">
          {questions.map(function (q) {
            return (
              <div key={q.id} className="survey-card">
                <h4>{q.questionText}</h4>
                <div className="survey-bar-container">
                  <div className="survey-bar">
                    <div
                      className="survey-bar-fill"
                      style={{ width: q.yesPercentage + '%' }}
                    ></div>
                  </div>
                  <span className="survey-percent">{q.yesPercentage}% Yes</span>
                </div>
                <p className="survey-insight">{q.insight}</p>
              </div>
            );
          })}
        </div>

        {/* Add Question Form section */}
        <div className="card" style={{ marginTop: '32px', padding: '24px', borderTop: '4px solid var(--primary)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>📝 Add Custom Survey Question</h3>
          <form onSubmit={handleAddQuestion} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', alignItems: 'end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Survey Question</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Do you compost organic wastes?" 
                value={newQuestionText}
                onChange={function (e) { setNewQuestionText(e.target.value); }}
                required 
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Yes Percentage (0 - 100)</label>
              <input 
                type="number" 
                className="form-control" 
                min="0" 
                max="100" 
                value={newYesPercentage}
                onChange={function (e) { setNewYesPercentage(e.target.value); }}
                required 
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Brief Insight/Result description</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Most residents lack space for composing bins." 
                value={newInsight}
                onChange={function (e) { setNewInsight(e.target.value); }}
                required 
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '10px 20px', width: '100%', height: '40px' }}>
              Add Survey Card
            </button>
          </form>
        </div>

        {/* Observations */}
        <h3 className="section-heading">Field Observations</h3>
        <div className="observations-grid">
          {data.observations.map(function (obs) {
            return (
              <div key={obs.id} className="observation-card">
                <h4>{obs.title}</h4>
                <p>{obs.description}</p>
              </div>
            );
          })}
        </div>

        {/* Key Findings */}
        <h3 className="section-heading">Key Findings</h3>
        <ul className="findings-list">
          {data.keyFindings.map(function (finding, index) {
            return <li key={index}>{finding}</li>;
          })}
        </ul>

        {/* Knowledge Gaps */}
        <h3 className="section-heading">Knowledge Gaps Identified</h3>
        <div className="gaps-grid">
          {data.knowledgeGaps.map(function (gap, index) {
            return (
              <div key={index} className="gap-card">
                <h4>{gap.gap}</h4>
                <p>{gap.explanation}</p>
              </div>
            );
          })}
        </div>

        {/* Learnings */}
        <h3 className="section-heading">What We Learned</h3>
        <div className="learnings-card">
          <p>{data.learnings.whatWeLearned}</p>
          <p className="impact-goal"><strong>Community Impact Goal:</strong> {data.learnings.communityImpactGoal}</p>
        </div>
      </div>
    </section>
  );
}
