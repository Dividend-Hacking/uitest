/**
 * Landing Page
 *
 * Displays a gallery of all 9 dashboard UI styles. Each style is shown
 * as a preview card with name, description, and characteristic colors.
 * Clicking a card navigates to that style's dashboard.
 */

import Link from 'next/link';
import { STYLES } from '@/lib/constants/styles';

/**
 * Page metadata for the landing page.
 */
export const metadata = {
  title: 'UI Styles Gallery | Dashboard Comparison',
  description: 'Compare 9 unique dashboard UI styles: Chromatic, Minimalist, Brutalism, Neobrutalism, Tech, Bauhaus, Neumorphism, Glassmorphism, and Illustrative.',
};

/**
 * Home page displays a grid of style preview cards.
 * Each card shows the style's name, description, and color scheme.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <header className="pt-20 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          UI Styles{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Gallery
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Explore 9 unique dashboard design styles. Each with light and dark mode support.
          Click any style to see the full finance dashboard.
        </p>
      </header>

      {/* Style Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STYLES.map((style) => (
            <Link
              key={style.slug}
              href={`/dashboard/${style.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
            >
              {/* Color Preview Strip */}
              <div className="h-32 relative overflow-hidden">
                {/* Background gradient based on style colors */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${style.colors.primary} 0%, ${style.colors.secondary} 50%, ${style.colors.accent} 100%)`,
                  }}
                />

                {/* Overlay pattern for visual interest */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, ${style.colors.background} 0%, transparent 50%),
                                        radial-gradient(circle at 80% 80%, ${style.colors.accent} 0%, transparent 40%)`,
                    }}
                  />
                </div>

                {/* Style name overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
                    {style.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {style.description}
                </p>

                {/* Characteristics tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {style.characteristics.slice(0, 3).map((char) => (
                    <span
                      key={char}
                      className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300"
                    >
                      {char}
                    </span>
                  ))}
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 mr-2">Colors:</span>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-slate-600"
                    style={{ backgroundColor: style.colors.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-slate-600"
                    style={{ backgroundColor: style.colors.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-slate-600"
                    style={{ backgroundColor: style.colors.accent }}
                    title="Accent"
                  />
                </div>

                {/* View dashboard link */}
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <span className="flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                    View Dashboard
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            9 unique UI styles • Light & Dark mode • Finance dashboard
          </p>
        </div>
      </footer>
    </div>
  );
}
