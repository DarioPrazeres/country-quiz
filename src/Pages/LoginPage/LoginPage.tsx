import React, { useState } from 'react';
import { BasePage } from '../../component/BasePage/BasePage.tsx';
import { useTranslation } from 'react-i18next';

interface LoginPageProps {
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = t('login.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('login.emailInvalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('login.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('login.passwordMinLength');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login attempt:', formData);
      alert(t('login.success'));
      onBack();
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: t('login.loginFailed') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login clicked`);
    alert(`${provider} login seria implementado aqui`);
  };

  return (
    <BasePage
      title={t('login.title')}
      subtitle={t('login.subtitle')}
      icon=""
      onBack={onBack}
    >
      <div className="login-container">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t('login.emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('login.emailPlaceholder')}
                disabled={isLoading}
                autoComplete="email"
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                {t('login.passwordLabel')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'form-input--error' : ''}`}
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t('login.passwordPlaceholder')}
                disabled={isLoading}
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="form-error">{errors.password}</span>
              )}
            </div>

            {/* Remember Me */}
            <div className="form-group form-group--checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <span className="checkbox-custom"></span>
                {t('login.rememberMe')}
              </label>
            </div>

            {/* Error geral */}
            {errors.general && (
              <div className="form-error" style={{ marginBottom: 'var(--space-4)' }}>
                {errors.general}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="login-submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="button-spinner"></div>
                  {t('login.signingIn')}
                </>
              ) : (
                t('login.signIn')
              )}
            </button>
          </form>

          {/* Additional Options */}
          <div className="login-footer">
            <button 
              type="button"
              className="link-button"
              onClick={() => alert('Password reset would be implemented here')}
            >
              {t('login.forgotPassword')}
            </button>
            
            <div className="signup-prompt">
              <span>{t('login.noAccount')} </span>
              <button 
                type="button"
                className="link-button link-button--primary"
                onClick={() => alert('Sign up would be implemented here')}
              >
                {t('login.signUp')}
              </button>
            </div>
          </div>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <div className="divider">
            <span>{t('login.orContinue')}</span>
          </div>
          
          <div className="social-buttons">
            <button 
              type="button"
              className="social-button social-button--google"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
            >
              <div className="social-icon">G</div>
              Google
            </button>
            <button 
              type="button"
              className="social-button social-button--github"
              onClick={() => handleSocialLogin('GitHub')}
              disabled={isLoading}
            >
              <div className="social-icon">📱</div>
              GitHub
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="login-features">
          <h3>{t('login.featuresTitle')}</h3>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <strong>{t('login.feature1Title')}</strong>
                <p>{t('login.feature1Desc')}</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏆</div>
              <div className="feature-text">
                <strong>{t('login.feature2Title')}</strong>
                <p>{t('login.feature2Desc')}</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👥</div>
              <div className="feature-text">
                <strong>{t('login.feature3Title')}</strong>
                <p>{t('login.feature3Desc')}</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <div className="feature-text">
                <strong>{t('login.feature4Title')}</strong>
                <p>{t('login.feature4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
};
