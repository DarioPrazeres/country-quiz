import React from 'react';
import worldIcon from '../../assets/img/world.svg';
import { QuizHeaderProps } from '../../types';

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  title = "Country Quiz",
  subtitle = "Test your knowledge about countries around the world",
  currentQuestion,
  totalQuestions,
  score
}) => {
  return (
    <div className="quiz-header-custom">
      <div className="title">
        <h1>{title}</h1>
        <img
          className="icon-World"
          src={worldIcon}
          alt="World icon"
        />
      </div>
      <p className="quiz-subtitle">{subtitle}</p>

      {currentQuestion && totalQuestions && (
        <div className="quiz-stats">
          <span className="question-counter">
            Question {currentQuestion} of {totalQuestions}
          </span>
          {score !== undefined && (
            <span className="score-display">
              Score: {score}/{totalQuestions}
            </span>
          )}

        </div>
      )}
    </div>
  );
};