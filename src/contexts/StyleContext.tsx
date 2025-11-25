/**
 * Style Context
 *
 * Provides the current dashboard style state throughout the application.
 * The style is determined by the URL route parameter and applied via
 * a data-style attribute on the document root for CSS targeting.
 */

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useParams } from 'next/navigation';
import { STYLES, StyleDefinition, DEFAULT_STYLE, getStyleBySlug } from '@/lib/constants/styles';

/**
 * StyleContextType defines the shape of the style context.
 * Provides access to current style configuration and metadata.
 */
interface StyleContextType {
  /** Current style configuration object */
  currentStyle: StyleDefinition;
  /** Current style slug (e.g., 'neumorphism') */
  styleSlug: string;
  /** All available styles */
  allStyles: StyleDefinition[];
}

// Create context with undefined default (will be checked in hook)
const StyleContext = createContext<StyleContextType | undefined>(undefined);

/**
 * StyleProvider component wraps the dashboard and provides style state.
 * Reads the style from URL parameters and applies it to the DOM.
 */
export function StyleProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  // Extract style slug from URL params, default to first style
  const styleSlug = (params?.style as string) || DEFAULT_STYLE.slug;

  // Find the matching style configuration
  const currentStyle = getStyleBySlug(styleSlug) || DEFAULT_STYLE;

  // Track mounted state for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply style attribute to document root whenever style changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-style', styleSlug);
    }
  }, [styleSlug, mounted]);

  return (
    <StyleContext.Provider
      value={{
        currentStyle,
        styleSlug,
        allStyles: STYLES,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
}

/**
 * useStyle hook provides access to style context.
 * Must be used within a StyleProvider.
 * @throws Error if used outside of StyleProvider
 */
export function useStyle(): StyleContextType {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
}
