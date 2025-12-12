// hooks/useTheme.ts - Hook para gerenciar tema Dark/Light
import { useState, useEffect, useCallback } from 'react';

export type ThemeType = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('quiz-theme') as ThemeType;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme;
    }
    return 'system';
  });

  const [isDark, setIsDark] = useState<boolean>(false);

  // Aplicar tema ao documento
  const applyTheme = useCallback((themeType: ThemeType, systemPrefersDark: boolean) => {
    const root = document.documentElement;
    
    let shouldBeDark = false;
    
    switch (themeType) {
      case 'dark':
        shouldBeDark = true;
        break;
      case 'light':
        shouldBeDark = false;
        break;
      case 'system':
        shouldBeDark = systemPrefersDark;
        break;
    }
    
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
    
    // Salvar no localStorage
    localStorage.setItem('quiz-theme', themeType);
  }, []);

  // Detectar mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemPrefersDark = mediaQuery.matches;
    
    // Aplicar tema inicial
    applyTheme(theme, systemPrefersDark);
    
    // Listener para mudanças na preferência do sistema
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme('system', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, applyTheme]);

  const changeTheme = useCallback((newTheme: ThemeType) => {
    setTheme(newTheme);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(newTheme, systemPrefersDark);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? 'light' : 'dark';
    changeTheme(newTheme);
  }, [isDark, changeTheme]);

  const getThemeIcon = useCallback(() => {
    switch (theme) {
      case 'dark':
        return '🌙';
      case 'light':
        return '☀️';
      case 'system':
        return '💻';
      default:
        return '🌙';
    }
  }, [theme]);

  const getThemeLabel = useCallback(() => {
    switch (theme) {
      case 'dark':
        return 'Dark Mode';
      case 'light':
        return 'Light Mode';
      case 'system':
        return 'System Theme';
      default:
        return 'Dark Mode';
    }
  }, [theme]);

  return {
    theme,
    isDark,
    changeTheme,
    toggleTheme,
    getThemeIcon,
    getThemeLabel,
  };
}