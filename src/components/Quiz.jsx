import React, { useState } from 'react';
import { quizQuestions } from '../data/quizQuestions';

export default function Quiz() {
  var [currentQuestion, setCurrentQuestion] = useState(0);
  var [score, setScore] = useState(0);
  var [selectedAnswer, setSelectedAnswer] = useState(null);
  var [showResult, setShowResult] = useState(false);
  var [quizFinished, setQuizFinished] = useState(false);

  var question = quizQuestions[currentQuestion];

  var handleAnswer = function (index) {
    if (selectedAnswer !== null) return; // Already answered
    setSelectedAnswer(index);
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  var handleNext = function () {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

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
      <section className="quiz-page" id="quiz">
        <div className="container">
          <div className="quiz-result-card">
            <h2>Quiz Complete!</h2>
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {quizQuestions.length}</span>
            </div>
            <p className="score-percentage">{percentage}% correct</p>
            <p className="score-message">
              {percentage >= 80 ? 'Excellent! You are an eco champion!' :
               percentage >= 50 ? 'Good effort! Keep learning about waste management.' :
               'Keep going! Review the Eco Tips section to learn more.'}
            </p>
            <button className="btn-primary" onClick={handleRestart}>
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-page" id="quiz">
      <div className="container">
        <h2>Waste Segregation Quiz</h2>
        <p className="page-subtitle">Test your knowledge about proper waste disposal!</p>

        <div className="quiz-progress">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: ((currentQuestion + 1) / quizQuestions.length * 100) + '%' }}
            ></div>
          </div>
        </div>

        <div className="quiz-card">
          <h3 className="quiz-question">{question.question}</h3>

          <div className="quiz-options">
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
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="quiz-explanation">
              <p><strong>Explanation:</strong> {question.explanation}</p>
              <button className="btn-primary" onClick={handleNext}>
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
