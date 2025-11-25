/**
 * Sidebar Component
 *
 * Navigation sidebar that displays all available dashboard styles.
 * Highlights the currently active style and provides navigation
 * between different dashboard variants. Also includes branding and
 * footer links.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { STYLES } from '@/lib/constants/styles';
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
  HomeIcon,
  StopIcon,
} from '@heroicons/react/24/outline';

/**
 * Maps style slugs to their corresponding icons.
 * Each style has a unique icon that represents its visual identity.
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
};

/**
 * Sidebar provides navigation between all 10 dashboard styles.
 * Displays style names with icons and highlights the active style.
 */
export function Sidebar() {
  const pathname = usePathname();

  // Extract current style from pathname (e.g., /dashboard/chromatic -> chromatic)
  const currentStyle = pathname?.split('/').pop() || '';

  return (
    <aside className="sidebar flex flex-col bg-[var(--sidebar-background)] border-r border-[var(--border-color)]">
      {/* Logo/Brand Section */}
      <div className="px-4 py-6 border-b border-[var(--border-color)]">
        <Link
          href="/"
          className="flex items-center gap-3 text-[var(--text-primary)] hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-lg bg-[var(--sidebar-item-active)] flex items-center justify-center">
            <HomeIcon className="w-5 h-5 text-[var(--sidebar-text-active)]" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">UI Styles</h1>
            <p className="text-xs text-[var(--text-tertiary)]">Dashboard Gallery</p>
          </div>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-2">
          <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
            Styles
          </span>
        </div>

        <ul className="space-y-1 px-2">
          {STYLES.map((style) => {
            const isActive = currentStyle === style.slug;
            const Icon = STYLE_ICONS[style.slug] || SparklesIcon;

            return (
              <li key={style.slug}>
                <Link
                  href={`/dashboard/${style.slug}`}
                  className={cn(
                    'sidebar-item group',
                    isActive
                      ? 'sidebar-item-active'
                      : 'text-[var(--sidebar-text)] hover:bg-[var(--sidebar-item-hover)]'
                  )}
                >
                  {/* Icon container */}
                  <div
                    className={cn(
                      'w-8 h-8 rounded-md flex items-center justify-center transition-colors',
                      isActive
                        ? 'bg-white/20'
                        : 'bg-[var(--background-secondary)] group-hover:bg-[var(--background-tertiary)]'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4',
                        isActive ? 'text-current' : 'text-[var(--text-secondary)]'
                      )}
                    />
                  </div>

                  {/* Style name and description */}
                  <div className="flex-1 min-w-0">
                    <span className="block font-medium text-sm truncate">
                      {style.name}
                    </span>
                    <span
                      className={cn(
                        'block text-xs truncate',
                        isActive
                          ? 'text-current opacity-70'
                          : 'text-[var(--text-tertiary)]'
                      )}
                    >
                      {style.characteristics[0]}
                    </span>
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-current opacity-80" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="px-4 py-4 border-t border-[var(--border-color)]">
        <div className="text-xs text-[var(--text-tertiary)]">
          <p className="mb-1">10 unique styles</p>
          <p>Light & Dark modes</p>
        </div>
      </div>
    </aside>
  );
}
