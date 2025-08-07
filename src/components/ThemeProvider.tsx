
'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { theme } from '../theme';

type HeaderColors = {
  backgroundColor: string;
  textColor: string;
};

type ThemeContextType = typeof theme & {
  headerColors: HeaderColors;
  setHeaderColors: (colors: HeaderColors) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [headerColors, setHeaderColorsState] = useState<HeaderColors>({
    backgroundColor: theme.colors.mainBackground,
    textColor: theme.colors.text,
  });

  const setHeaderColors = useCallback((colors: HeaderColors) => {
    setHeaderColorsState(colors);
  }, []);

  const contextValue = {
    ...theme,
    headerColors,
    setHeaderColors,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
