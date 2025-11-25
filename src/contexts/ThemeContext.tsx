/**
 * Theme Context
 *
 * Provides light/dark mode state management throughout the application.
 * Each dashboard can toggle between light and dark themes independently.
 * The theme is applied via a data-theme attribute on the document root.
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

/** Available theme modes */
export type Theme = 'light' | 'dark';

/**
 * ThemeContextType defines the shape of the theme context.
 * Provides current theme state and methods to update it.
 */
interface ThemeContextType {
  /** Current active theme ('light' or 'dark') */
  theme: Theme;
  /** Toggle between light and dark mode */
  toggleTheme: () => void;
  /** Set a specific theme */
  setTheme: (theme: Theme) => void;
  /** Check if current theme is dark */
  isDark: boolean;
}

// Create context with undefined default (will be checked in hook)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component wraps the application and provides theme state.
 * Handles persisting theme preference and applying it to the DOM.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with light theme, will update from localStorage if available
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Load saved theme preference on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('dashboard-theme') as Theme | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    }
  }, []);

  // Apply theme attribute to document root whenever theme changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('dashboard-theme', theme);
    }
  }, [theme, mounted]);

  /**
   * Toggle between light and dark themes.
   * Wrapped in useCallback to prevent unnecessary re-renders.
   */
  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  /**
   * Set a specific theme.
   * @param newTheme - The theme to set ('light' or 'dark')
   */
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Compute isDark for convenience
  const isDark = theme === 'dark';

  // Prevent flash of unstyled content during hydration
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{ theme: 'light', toggleTheme, setTheme, isDark: false }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme hook provides access to theme context.
 * Must be used within a ThemeProvider.
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
