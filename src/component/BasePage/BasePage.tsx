import React from 'react';

interface BasePageProps {
  title: string;
  subtitle?: string;
  icon?: string;
  children: React.ReactNode;
  onBack?: () => void;
  className?: string;
}

export const BasePage: React.FC<BasePageProps> = ({
  title,
  subtitle,
  icon,
  children,
  onBack,
  className = ''
}) => {
  return (
    <div className={`base-page ${className}`}>
      {/* Header da página */}
      <div className="page-header">
        {onBack && (
          <button 
            className="back-button"
            onClick={onBack}
            aria-label="Go back"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        )}
        
        <div className="page-title-section">
          {icon && <div className="page-icon">{icon}</div>}
          <div className="page-title-content">
            <h1 className="page-title">{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Conteúdo da página */}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};