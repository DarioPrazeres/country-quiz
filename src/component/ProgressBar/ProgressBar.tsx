import React from 'react';
import { ProgressBarProps } from '../../types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  showStats = false 
}) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="progress-section">
      <div className="progress-container-custom">
        <div 
          className="progress-bar-custom" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showStats && (
        <div className="quiz-stats">
          <span className="question-counter">
            Question {current} of {total}
          </span>
          <span className="progress-percentage">
            {percentage}% Complete
          </span>
        </div>
      )}
    </div>
  );
};