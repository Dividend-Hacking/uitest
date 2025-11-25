/**
 * DashboardShell Component
 *
 * Main content wrapper for dashboard pages. Provides consistent
 * spacing, grid layout, and responsive behavior for all widgets.
 * This component handles the overall layout structure of each dashboard.
 */

'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface DashboardShellProps {
  /** Child components (widgets) to render within the shell */
  children: ReactNode;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * DashboardShell wraps dashboard content with consistent styling.
 * Provides padding, scrolling behavior, and responsive layout.
 */
export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div
      className={cn(
        'flex-1 overflow-auto',
        'bg-[var(--background)]',
        'p-6',
        className
      )}
    >
      {/* Main content container with max width for large screens */}
      <div className="max-w-7xl mx-auto space-y-6">
        {children}
      </div>
    </div>
  );
}

/**
 * DashboardGrid provides a responsive grid layout for widgets.
 * Automatically adjusts columns based on screen size.
 */
interface DashboardGridProps {
  /** Child components to display in the grid */
  children: ReactNode;
  /** Number of columns on large screens (default: 4) */
  columns?: 2 | 3 | 4;
  /** Gap size between items */
  gap?: 'sm' | 'md' | 'lg';
  /** Optional additional CSS classes */
  className?: string;
}

export function DashboardGrid({
  children,
  columns = 4,
  gap = 'md',
  className,
}: DashboardGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={cn(
        'grid',
        columnClasses[columns],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * DashboardSection provides a titled section wrapper.
 * Used to group related widgets with a heading.
 */
interface DashboardSectionProps {
  /** Section title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Child components */
  children: ReactNode;
  /** Optional action button/link in the header */
  action?: ReactNode;
  /** Optional additional CSS classes */
  className?: string;
}

export function DashboardSection({
  title,
  description,
  children,
  action,
  className,
}: DashboardSectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-[var(--text-tertiary)] mt-0.5">
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* Section Content */}
      {children}
    </section>
  );
}

/**
 * DashboardRow provides a flex row layout for widgets.
 * Useful for horizontal arrangements of varying width items.
 */
interface DashboardRowProps {
  /** Child components */
  children: ReactNode;
  /** Gap size between items */
  gap?: 'sm' | 'md' | 'lg';
  /** Optional additional CSS classes */
  className?: string;
}

export function DashboardRow({
  children,
  gap = 'md',
  className,
}: DashboardRowProps) {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row',
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
