import React, { useState, useRef, useEffect } from 'react';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
}

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleMenuItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const menuItems: MenuItem[] = [
    {
      id: 'login',
      label: 'Login',
      icon: '👤',
      description: 'Sign in to your account',
      onClick: () => {
        console.log('Login clicked');
      }
    },
    {
      id: 'daily-challenge',
      label: 'Daily Challenge',
      icon: '🏆',
      description: 'Complete today\'s challenge',
      onClick: () => {
        console.log('Daily Challenge clicked');
      }
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: '📊',
      description: 'View top players',
      onClick: () => {
        console.log('Leaderboard clicked');
      }
    },
    {
      id: 'learning-mode',
      label: 'Learning Mode',
      icon: '📚',
      description: 'Practice without timer',
      onClick: () => {
        console.log('Learning Mode clicked');
      }
    }
  ];

  return (
    <div className={`navigation-menu ${className}`} ref={menuRef}>
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
              onClick={() => handleMenuItemClick(item.onClick)}
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