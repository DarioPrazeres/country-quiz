// components/NavigationMenu.tsx - Com botão de tema Dark/Light
import React, { useState, useRef, useEffect } from 'react';
import { RouteType } from '../../hooks/UseRouter.ts';
import { useTheme } from '../../hooks/useTheme.ts';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  description?: string;
  route: RouteType;
  disabled?: boolean;
}

interface NavigationMenuProps {
  className?: string;
  onNavigate: (route: RouteType) => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  className = '', 
  onNavigate 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, changeTheme, getThemeIcon, getThemeLabel } = useTheme();

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Fechar menu com ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleMenuItemClick = (route: RouteType) => {
    onNavigate(route);
    setIsOpen(false);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    changeTheme(newTheme);
  };

  const menuItems: MenuItem[] = [
    {
      id: 'login',
      label: 'Login',
      icon: '👤',
      description: 'Sign in to your account',
      route: 'login'
    },
    {
      id: 'daily-challenge',
      label: 'Daily Challenge',
      icon: '🏆',
      description: 'Complete today\'s challenge',
      route: 'daily-challenge'
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: '📊',
      description: 'View top players',
      route: 'leaderboard'
    },
    {
      id: 'learning-mode',
      label: 'Learning Mode',
      icon: '📚',
      description: 'Practice without timer',
      route: 'learning-mode'
    }
  ];

  return (
    <div className={`navigation-menu ${className}`} ref={menuRef}>
      {/* Botão de tema - sempre visível */}
      <div className="theme-controls">
        <button
          className="theme-button"
          onClick={() => {
            const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
            const currentIndex = themes.indexOf(theme);
            const nextIndex = (currentIndex + 1) % themes.length;
            handleThemeChange(themes[nextIndex]);
          }}
          title={`Current: ${getThemeLabel()}. Click to change.`}
          aria-label={`Change theme. Currently ${getThemeLabel()}`}
        >
          <span className="theme-icon">{getThemeIcon()}</span>
        </button>
      </div>

      {/* Botão do menu */}
      <button
        className={`menu-trigger ${isOpen ? 'menu-trigger--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <div className="menu-trigger-icon">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          )}
        </div>
      </button>

      {/* Menu dropdown */}
      <div className={`menu-dropdown ${isOpen ? 'menu-dropdown--open' : ''}`}>
        <div className="menu-header">
          <h3>Navigation</h3>
          <p>Choose an option</p>
        </div>
        
        <nav className="menu-items" role="menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${item.disabled ? 'menu-item--disabled' : ''}`}
              onClick={() => handleMenuItemClick(item.route)}
              disabled={item.disabled}
              role="menuitem"
            >
              <div className="menu-item-icon">
                {item.icon}
              </div>
              <div className="menu-item-content">
                <div className="menu-item-label">
                  {item.label}
                </div>
                {item.description && (
                  <div className="menu-item-description">
                    {item.description}
                  </div>
                )}
              </div>
            </button>
          ))}
        </nav>

        {/* Seção de tema no menu 
        <div className="theme-section">
          <div className="theme-section-header">
            <h4>Theme Settings</h4>
            <p>Choose your preferred appearance</p>
          </div>
          
          <div className="theme-options">
            {[
              { key: 'light' as const, icon: '☀️', label: 'Light Mode' },
              { key: 'dark' as const, icon: '🌙', label: 'Dark Mode' },
              { key: 'system' as const, icon: '💻', label: 'System Theme' }
            ].map((option) => (
              <button
                key={option.key}
                className={`theme-option ${theme === option.key ? 'theme-option--active' : ''}`}
                onClick={() => handleThemeChange(option.key)}
              >
                <span className="theme-option-icon">{option.icon}</span>
                <span className="theme-option-label">{option.label}</span>
                {theme === option.key && (
                  <span className="theme-option-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
*/}
        <div className="menu-footer">
          <div className="menu-footer-text">
            Country Quiz v1.0
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="menu-overlay" />}
    </div>
  );
};