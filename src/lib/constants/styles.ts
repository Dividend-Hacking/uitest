/**
 * Style Definitions
 *
 * This file contains the configuration for all 9 dashboard styles.
 * Each style has metadata including slug, name, description, and
 * characteristic colors. This data is used for navigation, routing,
 * and applying the correct theme to each dashboard.
 */

/**
 * StyleDefinition describes a single dashboard style variant.
 * Used to configure routing, navigation, and theme application.
 */
export interface StyleDefinition {
  /** URL-safe identifier used in routes (e.g., "neobrutalism") */
  slug: string;
  /** Display name for the style (e.g., "Neobrutalism") */
  name: string;
  /** Brief description of the style's visual characteristics */
  description: string;
  /** Key visual traits that define this style */
  characteristics: string[];
  /** Primary colors used in previews and accents */
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

/**
 * All 9 dashboard style configurations.
 * Order here determines order in navigation sidebar.
 */
export const STYLES: StyleDefinition[] = [
  {
    slug: 'chromatic',
    name: 'Chromatic',
    description: 'Vibrant gradients and bold color transitions',
    characteristics: ['gradient-heavy', 'vibrant', 'dynamic', 'colorful'],
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
      background: '#FFFFFF',
    },
  },
  {
    slug: 'minimalist',
    name: 'Minimalist',
    description: 'Clean lines, ample whitespace, subtle accents',
    characteristics: ['clean', 'spacious', 'subtle', 'elegant'],
    colors: {
      primary: '#1a1a1a',
      secondary: '#666666',
      accent: '#0066FF',
      background: '#FFFFFF',
    },
  },
  {
    slug: 'brutalism',
    name: 'Brutalism',
    description: 'Raw, unpolished, bold typography and harsh contrasts',
    characteristics: ['raw', 'bold', 'monospace', 'stark'],
    colors: {
      primary: '#000000',
      secondary: '#FFFFFF',
      accent: '#FF0000',
      background: '#FFFFFF',
    },
  },
  {
    slug: 'neobrutalism',
    name: 'Neobrutalism',
    description: 'Thick borders, bold shadows, playful colors',
    characteristics: ['thick-borders', 'hard-shadows', 'playful', 'bold'],
    colors: {
      primary: '#000000',
      secondary: '#FEF08A',
      accent: '#F472B6',
      background: '#FEF9C3',
    },
  },
  {
    slug: 'tech',
    name: 'Tech',
    description: 'Futuristic, dark themes, neon accents, grid patterns',
    characteristics: ['futuristic', 'neon', 'dark', 'cyberpunk'],
    colors: {
      primary: '#00FF88',
      secondary: '#00D4FF',
      accent: '#FF3366',
      background: '#0F172A',
    },
  },
  {
    slug: 'bauhaus',
    name: 'Bauhaus',
    description: 'Geometric shapes, primary colors, functional design',
    characteristics: ['geometric', 'primary-colors', 'functional', 'structured'],
    colors: {
      primary: '#1E3A8A',
      secondary: '#DC2626',
      accent: '#FBBF24',
      background: '#F5F5F5',
    },
  },
  {
    slug: 'neumorphism',
    name: 'Neumorphism',
    description: 'Soft shadows, extruded elements, monochromatic palette',
    characteristics: ['soft-shadows', '3d-effect', 'monochrome', 'soft'],
    colors: {
      primary: '#6366F1',
      secondary: '#A3B1C6',
      accent: '#818CF8',
      background: '#E0E5EC',
    },
  },
  {
    slug: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted glass effect, transparency, blur effects',
    characteristics: ['transparent', 'blur', 'layered', 'modern'],
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#06B6D4',
      background: '#1E293B',
    },
  },
  {
    slug: 'illustrative',
    name: 'Illustrative',
    description: 'Hand-drawn elements, sketchy borders, warm palette',
    characteristics: ['hand-drawn', 'sketchy', 'warm', 'organic'],
    colors: {
      primary: '#E07A5F',
      secondary: '#3D405B',
      accent: '#81B29A',
      background: '#F5F0E6',
    },
  },
  {
    slug: 'monochromatic',
    name: 'Monochromatic',
    description: 'Pure grayscale palette, elegant contrast, no color distractions',
    characteristics: ['grayscale', 'high-contrast', 'timeless', 'focused'],
    colors: {
      primary: '#1a1a1a',
      secondary: '#808080',
      accent: '#4d4d4d',
      background: '#FFFFFF',
    },
  },
  {
    slug: 'monochromatic-blue',
    name: 'Monochromatic Blue',
    description: 'Navy blue palette, professional depth, single-hue elegance',
    characteristics: ['navy', 'professional', 'single-hue', 'sophisticated'],
    colors: {
      primary: '#1e3a5f',
      secondary: '#4a6fa5',
      accent: '#7ba3d4',
      background: '#f0f4f8',
    },
  },
];

/**
 * Helper function to get a style by its slug.
 * Returns undefined if style not found.
 */
export function getStyleBySlug(slug: string): StyleDefinition | undefined {
  return STYLES.find((style) => style.slug === slug);
}

/**
 * List of all style slugs for routing and validation.
 */
export const STYLE_SLUGS = STYLES.map((style) => style.slug);

/**
 * Default style to use when none is specified.
 */
export const DEFAULT_STYLE = STYLES[0];
