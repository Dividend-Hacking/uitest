/**
 * Header Component
 *
 * Top header bar for the dashboard containing the current style name,
 * theme toggle switch (light/dark mode), and notification indicators.
 * Adapts styling based on the current dashboard theme.
 */

'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useStyle } from '@/contexts/StyleContext';
import { cn } from '@/lib/utils/cn';
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { MobileSidebar } from './MobileSidebar';

/**
 * Header displays the current style name and provides theme controls.
 * Includes a light/dark mode toggle and notification/settings icons.
 */
export function Header() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { currentStyle } = useStyle();

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--card-background)]">
      {/* Left Section - Hamburger menu (mobile) + Current Style Info */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar - hamburger button and slide-out drawer */}
        <MobileSidebar />

        <div>
          <h2 className="text-base md:text-lg font-semibold text-[var(--text-primary)]">
            {currentStyle.name} Dashboard
          </h2>
          {/* Hide description on mobile to save space */}
          <p className="hidden sm:block text-sm text-[var(--text-tertiary)]">
            {currentStyle.description}
          </p>
        </div>
      </div>

      {/* Right Section - Controls */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={cn(
            'relative flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg transition-all',
            'bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)]',
            'border border-[var(--border-color)]'
          )}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {/* Sun/Moon Icons with animation */}
          <div className="relative w-5 h-5">
            <SunIcon
              className={cn(
                'absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300',
                isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              )}
            />
            <MoonIcon
              className={cn(
                'absolute inset-0 w-5 h-5 text-indigo-400 transition-all duration-300',
                isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              )}
            />
          </div>

          {/* Theme label - hidden on mobile */}
          <span className="hidden md:inline text-sm font-medium text-[var(--text-secondary)] min-w-[40px]">
            {isDark ? 'Dark' : 'Light'}
          </span>

          {/* Toggle track - hidden on mobile */}
          <div
            className={cn(
              'hidden md:block w-10 h-5 rounded-full relative transition-colors',
              isDark ? 'bg-indigo-600' : 'bg-gray-300'
            )}
          >
            {/* Toggle knob */}
            <div
              className={cn(
                'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform',
                isDark ? 'translate-x-5' : 'translate-x-0.5'
              )}
            />
          </div>
        </button>

        {/* Divider - hidden on mobile */}
        <div className="hidden md:block w-px h-8 bg-[var(--border-color)] mx-2" />

        {/* Notification Button */}
        <button
          className={cn(
            'relative p-2 rounded-lg transition-colors',
            'hover:bg-[var(--background-secondary)]',
            'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
          aria-label="View notifications"
        >
          <BellIcon className="w-5 h-5" />
          {/* Notification badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Settings Button - hidden on mobile */}
        <button
          className={cn(
            'hidden sm:block p-2 rounded-lg transition-colors',
            'hover:bg-[var(--background-secondary)]',
            'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
          aria-label="Settings"
        >
          <Cog6ToothIcon className="w-5 h-5" />
        </button>

        {/* User Avatar */}
        <button
          className={cn(
            'p-1 rounded-lg transition-colors',
            'hover:bg-[var(--background-secondary)]'
          )}
          aria-label="User menu"
        >
          <UserCircleIcon className="w-8 h-8 text-[var(--text-secondary)]" />
        </button>
      </div>
    </header>
  );
}
