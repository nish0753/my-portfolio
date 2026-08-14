import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'dark' | 'light' | 'cyber';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  cycleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme') as Theme;
      if (saved && ['dark', 'light', 'cyber'].includes(saved)) {
        return saved;
      }
    } catch (e) {}
    return 'dark';
  });

  const setTheme = (newTheme: Theme) => {
    document.body.classList.add('theme-anim');
    setTimeout(() => document.body.classList.remove('theme-anim'), 700);
    setThemeState(newTheme);
    try {
      localStorage.setItem('portfolio-theme', newTheme);
    } catch (e) {}
  };

  const cycleTheme = () => {
    const order: Theme[] = ['dark', 'light', 'cyber'];
    const nextIndex = (order.indexOf(theme) + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Keyboard shortcut: 't' or 'T' cycles theme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        cycleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
