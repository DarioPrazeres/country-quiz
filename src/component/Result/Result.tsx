import React, { useContext, useMemo } from "react";
import { ContContext } from "../../App.tsx";
import cupIcon from "../../assets/img/cup.svg";
import {generateRandomQuestionPosition, generateRandomOrder, numberRandom as generateRandomQuestionType} from "../../utils/gameUtils.ts";
import {ResultProps, ScoreInfoProps} from "../../types/index.ts";
import useFetch from "../../hooks/useFecth.ts";
import { ActionButtonsProps } from "../../types/index.ts";

const ScoreInfo: React.FC<ScoreInfoProps> = ({ point, total, t }) => {
  const scoreData = useScore(point, total);

  const getMessage = () => {
    const messages = {
      'perfect_score': 'Perfect! Geography Master!',
      'excellent': 'Excellent! Outstanding performance!',
      'good_job': 'Good job! Well done!',
      'not_bad': 'Not bad! Keep learning!',
      'keep_trying': 'Keep studying! You can do better!'
    };    
    return t(scoreData.messageKey) || messages[scoreData.messageKey as keyof typeof messages];
  };

  return (
    <>
      <div className="score-display">
        <p>
          {t("you_got")} <span>{point}</span> {t("correct")}
        </p>
        <div className={`score-message ${scoreData.messageClass}`}>
          {scoreData.emoji} {getMessage()}
        </div>
      </div>
      
      <div className="result-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">{point}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{total - point}</span>
            <span className="stat-label">Wrong</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{scoreData.percentage}%</span>
            <span className="stat-label">Score</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>
    </>
  );
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onRestart, onReview, t }) => {
  return (
    <div className="result-actions">
      <button 
        className="action-button action-button--primary" 
        onClick={onRestart}
      >
        <span>{t("try_again")}</span>
      </button>
      
      {/* {onReview && (
        <button 
          className="action-button action-button--secondary" 
          onClick={onReview}
        >
          <span>Review Answers</span>
        </button>
      )} */}
    </div>
  );
};

const ShareSection: React.FC<{ score: number; total: number }> = ({ score, total }) => {
  const percentage = Math.round((score / total) * 100);
  
  const handleShare = (platform: string) => {
    const text = `I scored ${score}/${total} (${percentage}%) on the Country Quiz! 🌍`;
    const url = window.location.href;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };
    
    if (platform in shareUrls) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="share-section">
      <h3 className="share-title">Share your result!</h3>
      <div className="share-buttons">
        <button 
          className="share-button" 
          onClick={() => handleShare('twitter')}
        >
          🐦 Twitter
        </button>
        <button 
          className="share-button" 
          onClick={() => handleShare('facebook')}
        >
          📘 Facebook  
        </button>
        <button 
          className="share-button" 
          onClick={() => handleShare('whatsapp')}
        >
          💬 WhatsApp
        </button>
      </div>
    </div>
  );
};

const Result: React.FC<ResultProps> = ({ point }) => {
  const context = useContext(ContContext) as ContContextType;
  
  if (!context) {
    throw new Error('Result deve ser usado dentro de ContContext');
  }

  const { 
    setPoint, 
    setShowResult, 
    setPlayed, 
    setQuestionPosition, 
    setOption, 
    setCont,
    t 
  } = context;

  const handleTryAgain = () => {
    localStorage.removeItem('gameProgress');
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('gameStats');
    
    setPoint(0);
    setPlayed(0);
    setShowResult(false);
    
    setQuestionPosition(generateRandomQuestionPosition());
    setOption(generateRandomOrder());
    setCont(generateRandomQuestionType());
  };

  const handleReviewAnswers = () => {
    console.log('Review answers functionality - to be implemented');
    // To implemeted
  };

  const totalQuestions = 5;

  return (
    <div className="result">
      <div className="result-header">
        <img src={cupIcon} alt="trophy" />
        <h1>{t("results")}</h1>
      </div>
      
      <ScoreInfo 
        point={point} 
        total={totalQuestions} 
        t={t} 
      />
      
      <ActionButtons 
        onRestart={handleTryAgain}
        onReview={handleReviewAnswers}
        t={t}
      />
      
      <ShareSection 
        score={point} 
        total={totalQuestions} 
      />
    </div>
  );
};

export default Result;