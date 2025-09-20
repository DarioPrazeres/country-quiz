import React from 'react';
import {getQuestionTypeInfo} from '../../utils/optionHelpers.ts';
import { QuestionTypeProps } from '../../types/index.ts';

export const QuestionType: React.FC<QuestionTypeProps> = ({ 
  type, 
  className = '' 
}) => {
  const typeInfo = getQuestionTypeInfo(type);
  
  return (
    <div 
      className={`question-type-indicator ${className}`}
      style={{ borderColor: typeInfo.color }}
    >
      <span className="question-icon">{typeInfo.icon}</span>
      <span>{typeInfo.label}</span>
    </div>
  );
};