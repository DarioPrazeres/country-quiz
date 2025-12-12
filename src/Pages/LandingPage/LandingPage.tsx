// Pages/LandingPage/LandingPage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/LandingPage.css';

interface LandingPageProps {
  onPlayDemo: () => void;
  onNavigateToLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onPlayDemo,
  onNavigateToLogin
}) => {
  const { t } = useTranslation();

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('landing.title')}
          </h1>
          <p className="hero-subtitle">
            {t('landing.subtitle')}
          </p>
          
          <div className="cta-buttons">
            <button 
              className="btn btn-primary"
              onClick={onPlayDemo}
            >
              <span className="btn-icon">👉</span>
              {t('landing.playNow')}
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={onNavigateToLogin}
            >
              <span className="btn-icon">👉</span>
              {t('landing.createAccount')}
            </button>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <span>{t('landing.feature1')}</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>{t('landing.feature2')}</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🏆</span>
            <span>{t('landing.feature3')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
