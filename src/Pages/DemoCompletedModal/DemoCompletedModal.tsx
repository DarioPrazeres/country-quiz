// component/DemoCompletedModal/DemoCompletedModal.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/demo.css';

interface DemoCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAccount: () => void;
  onPlayAgain: () => void;
  score: number;
  totalQuestions: number;
}

export const DemoCompletedModal: React.FC<DemoCompletedModalProps> = ({
  isOpen,
  onClose,
  onCreateAccount,
  onPlayAgain,
  score,
  totalQuestions
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="modal-overlay">
      <div className="demo-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            🎉 {t('demo.completed.title', 'Demo Concluído!')}
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/{totalQuestions}</span>
            </div>
            <p className="score-percentage">{percentage}% corretas!</p>
          </div>
          
          <p className="modal-message">
            {t('demo.completed.message', 'Gostaste? Cria a tua conta para guardar estatísticas e competir no ranking!')}
          </p>
          
          <div className="modal-buttons">
            <button 
              className="btn btn-primary"
              onClick={onCreateAccount}
            >
              <span className="btn-icon">🚀</span>
              {t('demo.completed.createAccount', 'Criar Conta')}
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={onPlayAgain}
            >
              <span className="btn-icon">🔄</span>
              {t('demo.completed.playAgain', 'Jogar Novamente')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
