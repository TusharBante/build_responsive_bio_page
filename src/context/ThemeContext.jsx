import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';

// 1. Light Theme Color Palette
export const lightTheme = {
  mode: 'light',
  bodyBg: '#f1f5f9',
  cardBg: '#ffffff',
  navbarBg: '#ffffff',
  textHeading: '#0f172a',
  textMain: '#1e293b',
  textMuted: '#64748b',
  border: '#e2e8f0',
  borderInput: '#cbd5e1',
  inputBg: '#ffffff',
  iconBg: '#f8fafc',
  primary: '#4f46e5',
  primaryHover: '#4338ca',
  primaryLight: '#eef2ff',
  toggleBg: '#f1f5f9',
  toggleBorder: '#cbd5e1',
  toggleText: '#334155',
  shadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
  shadowHover: '0 8px 16px rgba(0, 0, 0, 0.08)'
};

// 2. Dark Theme Color Palette
export const darkTheme = {
  mode: 'dark',
  bodyBg: '#0f172a',
  cardBg: '#1e293b',
  navbarBg: '#1e293b',
  textHeading: '#f8fafc',
  textMain: '#e2e8f0',
  textMuted: '#94a3b8',
  border: '#334155',
  borderInput: '#475569',
  inputBg: '#0f172a',
  iconBg: '#0b1120',
  primary: '#6366f1',
  primaryHover: '#4f46e5',
  primaryLight: '#312e81',
  toggleBg: '#334155',
  toggleBorder: '#475569',
  toggleText: '#f8fafc',
  shadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  shadowHover: '0 8px 16px rgba(0, 0, 0, 0.45)'
};

// 3. Global Styles applied across document body
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bodyBg};
    color: ${({ theme }) => theme.textMain};
    transition: background-color 0.25s ease, color 0.25s ease;
  }
`;

// 4. Create ThemeContext
export const ThemeContext = createContext();

// 5. ThemeProvider to manage and toggle current theme
export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

// Convenient hook for consuming ThemeContext
export const useTheme = () => useContext(ThemeContext);
