import React, { useState } from 'react';
import { quizQuestions } from '../data/quizQuestions';

export default function Quiz() {
  var [currentQuestion, setCurrentQuestion] = useState(0);
  var [score, setScore] = useState(0);
  var [selectedAnswer, setSelectedAnswer] = useState(null);
  var [showResult, setShowResult] = useState(false);
  var [quizFinished, setQuizFinished] = useState(false);

  var question = quizQuestions[currentQuestion];

  // Handle option click
  var handleAnswer = function (index) {
    if (selectedAnswer !== null) return; // Block double click
    
    setSelectedAnswer(index);
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);

    // Auto-advance to next question after 1.2 seconds
    setTimeout(function () {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(function(prev) { return prev + 1; });
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizFinished(true);
      }
    }, 1200);
  };

  // Restart quiz
  var handleRestart = function () {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizFinished(false);
  };

  // Quiz finished screen
  if (quizFinished) {
    var percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <section className="quiz-page" id="quiz" style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="quiz-result-card card text-center" style={{ padding: '40px 32px', textAlign: 'center', borderTop: '4px solid var(--primary)' }}>
            <h2>Quiz Complete!</h2>
            
            <div className="score-circle" style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              border: '4px solid var(--primary)', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexDirection: 'column', 
              margin: '24px 0 16px' 
            }}>
              <span className="score-number" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-heading)' }}>{score}</span>
              <span className="score-total" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ {quizQuestions.length}</span>
            </div>

            <p className="score-percentage" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-dark)', marginBottom: '8px' }}>
              {percentage}% Correct
            </p>
            
            <p className="score-message" style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {percentage >= 80 ? '👑 Excellent! You are an eco champion!' :
               percentage >= 50 ? '🌿 Good effort! Keep learning about waste management.' :
               '📚 Keep going! Review the Waste Finder and Eco Tips to learn more.'}
            </p>
            
            <button className="btn btn-primary" onClick={handleRestart} style={{ padding: '10px 24px' }}>
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-page" id="quiz" style={{ padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2>Waste Segregation Quiz</h2>
          <p className="page-subtitle">Test your knowledge about proper waste disposal! Click an option to answer.</p>
        </div>

        {/* Progress Bar */}
        <div className="quiz-progress" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="progress-bar" style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '99px', overflow: 'hidden' }}>
            <div
              className="progress-fill"
              style={{ 
                height: '100%', 
                background: 'var(--primary)', 
                width: ((currentQuestion + 1) / quizQuestions.length * 100) + '%',
                transition: 'width 0.3s ease' 
              }}
            ></div>
          </div>
        </div>

        {/* Quiz Question Card */}
        <div className="quiz-card card" style={{ padding: '32px', borderTop: '4px solid var(--primary)' }}>
          <h3 className="quiz-question" style={{ fontSize: '1.2rem', marginBottom: '24px', lineHeight: '1.5' }}>
            {question.question}
          </h3>

          {/* Options Grid */}
          <div className="quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map(function (option, index) {
              var optionClass = 'quiz-option';
              if (showResult) {
                if (index === question.correctAnswer) {
                  optionClass = optionClass + ' correct';
                } else if (index === selectedAnswer) {
                  optionClass = optionClass + ' wrong';
                }
              }
              if (selectedAnswer === index && !showResult) {
                optionClass = optionClass + ' selected';
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={function () { handleAnswer(index); }}
                  disabled={showResult}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    textAlign: 'left',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    cursor: showResult ? 'default' : 'pointer',
                    fontSize: '0.98rem',
                    fontWeight: '600',
                    color: 'var(--text-main)',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary-dark)',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span style={{ flex: 1 }}>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation Banner (Shows during the 1.2s delay) */}
          {showResult && (
            <div className="quiz-explanation" style={{ 
              marginTop: '24px', 
              padding: '16px', 
              background: 'var(--bg-app)', 
              borderRadius: '6px', 
              borderLeft: '4px solid var(--primary)',
              fontSize: '0.88rem',
              lineHeight: '1.5',
              animation: 'fadeInEffect 0.2s ease-out'
            }}>
              <strong>Explanation:</strong> {question.explanation}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
