import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextValue {
  theme: 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
