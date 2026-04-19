import React, { useState, useEffect } from 'react';
import { BasePage } from '../../component/BasePage/BasePage.tsx';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext.tsx';

interface LoginPageProps {
  onBack: () => void;
}

// Declaração global para o Google SDK
declare global {
  interface Window {
    google: any;
  }
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { login, loginWithOAuth } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Carregar Google SDK
  useEffect(() => {
    const loadGoogleSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    loadGoogleSDK();
  }, []);

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
    setErrors({});
    
    try {
      alert("Entrei Login")
      await login(formData.email, formData.password, formData.rememberMe);
      alert(t('login.success'));
      onBack();
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        general: error instanceof Error ? error.message : t('login.loginFailed')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    console.log(`${provider} login iniciado`);
    
    if (provider.toLowerCase() === 'google') {
      try {
        setIsLoading(true);

        // Verificar se o Google SDK está carregado
        if (!window.google) {
          alert('Google SDK ainda não foi carregado. Tente novamente em alguns segundos.');
          return;
        }

        // Configurar e mostrar o One Tap
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
          callback: async (response: any) => {
            try {
              console.log('Google response recebido:', response);
              
              // Decodificar o token JWT do Google
              const token = response.credential;
              const payload = decodeGoogleToken(token);
              
              console.log('Google payload:', payload);

              // Fazer login com OAuth na sua API
              await loginWithOAuth(
                'google',
                token,
                payload.email,
                payload.name,
                payload.picture
              );

              alert('Login com Google realizado com sucesso!');
              onBack();
            } catch (error) {
              console.error('Erro no login do Google:', error);
              alert('Erro ao fazer login com Google: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
            } finally {
              setIsLoading(false);
            }
          },
        });

        // Mostrar o prompt do Google One Tap
        window.google.accounts.id.prompt();
        
      } catch (error) {
        console.error('Erro ao iniciar login do Google:', error);
        alert('Erro ao iniciar login com Google');
        setIsLoading(false);
      }
    } else if (provider.toLowerCase() === 'github') {
      alert('Login com GitHub ainda não implementado. Configure o OAuth do GitHub primeiro.');
    } else {
      alert(`${provider} login ainda não implementado`);
    }
  };

  // Função auxiliar para decodificar o JWT do Google
  const decodeGoogleToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
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