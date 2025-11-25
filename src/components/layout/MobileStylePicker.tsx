/**
 * MobileStylePicker Component
 *
 * A bottom sheet component for mobile devices that allows users to switch
 * between different dashboard styles. Slides up from the bottom of the screen
 * and displays all 11 styles in a scrollable grid layout.
 *
 * Only visible on mobile devices (below md breakpoint).
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { STYLES } from '@/lib/constants/styles';
import { useStyle } from '@/contexts/StyleContext';
import { cn } from '@/lib/utils/cn';
import {
  SparklesIcon,
  MinusIcon,
  Square3Stack3DIcon,
  CubeIcon,
  CpuChipIcon,
  Squares2X2Icon,
  SunIcon,
  WindowIcon,
  PaintBrushIcon,
  StopIcon,
  SwatchIcon,
  XMarkIcon,
  Squares2X2Icon as GridIcon,
} from '@heroicons/react/24/outline';

/**
 * Maps style slugs to their corresponding icons.
 * Matches the icons used in the desktop Sidebar component.
 */
const STYLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  chromatic: SparklesIcon,
  minimalist: MinusIcon,
  brutalism: Square3Stack3DIcon,
  neobrutalism: CubeIcon,
  tech: CpuChipIcon,
  bauhaus: Squares2X2Icon,
  neumorphism: SunIcon,
  glassmorphism: WindowIcon,
  illustrative: PaintBrushIcon,
  monochromatic: StopIcon,
  'monochromatic-blue': SwatchIcon,
};

/**
 * MobileStylePicker provides a touch-friendly way to navigate between styles.
 * Renders as a bottom sheet that slides up when triggered.
 */
export function MobileStylePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { currentStyle } = useStyle();

  // Extract current style from pathname
  const currentStyleSlug = pathname?.split('/').pop() || '';

  /**
   * Closes the bottom sheet when a style is selected or backdrop is tapped.
   */
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button - Shows current style, visible only on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'md:hidden flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)]',
          'border border-[var(--border-color)]',
          'text-[var(--text-primary)]'
        )}
        aria-label="Open style picker"
      >
        <GridIcon className="w-5 h-5" />
        <span className="text-sm font-medium">{currentStyle.name}</span>
      </button>

      {/* Backdrop Overlay - Closes sheet when tapped */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 mobile-backdrop"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Bottom Sheet Container */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 bottom-0 z-50',
          'bg-[var(--card-background)] border-t border-[var(--border-color)]',
          'rounded-t-2xl shadow-xl',
          'transform transition-transform duration-300 ease-out',
          'max-h-[70vh] overflow-hidden',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Sheet Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Choose Style
          </h3>
          <button
            onClick={handleClose}
            className={cn(
              'p-2 rounded-lg',
              'hover:bg-[var(--background-secondary)]',
              'text-[var(--text-secondary)]'
            )}
            aria-label="Close style picker"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Drag Handle Indicator */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-[var(--border-color)] rounded-full" />

        {/* Styles Grid - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(70vh-60px)] p-4">
          <div className="grid grid-cols-2 gap-3">
            {STYLES.map((style) => {
              const isActive = currentStyleSlug === style.slug;
              const Icon = STYLE_ICONS[style.slug] || SparklesIcon;

              return (
                <Link
                  key={style.slug}
                  href={`/dashboard/${style.slug}`}
                  onClick={handleClose}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl transition-all',
                    'border',
                    isActive
                      ? 'bg-[var(--sidebar-item-active)] border-[var(--accent-color)] text-[var(--sidebar-text-active)]'
                      : 'bg-[var(--background-secondary)] border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--background-tertiary)]'
                  )}
                >
                  {/* Style Icon */}
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      isActive
                        ? 'bg-white/20'
                        : 'bg-[var(--background-tertiary)]'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Style Name */}
                  <span className="text-sm font-medium truncate">
                    {style.name}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-current" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
