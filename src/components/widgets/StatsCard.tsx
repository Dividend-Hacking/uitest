/**
 * StatsCard Component
 *
 * Displays a key performance indicator (KPI) with value, change percentage,
 * and icon. Used to show revenue, expenses, profit, and transaction counts.
 * Styling adapts based on the current dashboard theme.
 */

'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatters';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatsCardProps {
  /** Card title label */
  title: string;
  /** Numeric value to display */
  value: number;
  /** Percentage change from previous period */
  change: number;
  /** Icon to display */
  icon: ReactNode;
  /** Card variant for styling differentiation */
  variant?: 'revenue' | 'expense' | 'profit' | 'transactions';
  /** Whether to format value as currency (default: true) */
  isCurrency?: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * StatsCard renders a KPI card with value, trend indicator, and icon.
 * The visual styling is determined by CSS custom properties from the theme.
 */
export function StatsCard({
  title,
  value,
  change,
  icon,
  variant = 'revenue',
  isCurrency = true,
  className,
}: StatsCardProps) {
  // Determine if change is positive or negative
  const isPositive = change >= 0;

  // For expenses, negative change is actually good (spending less)
  const isGood = variant === 'expense' ? !isPositive : isPositive;

  // Format the value
  const formattedValue = isCurrency ? formatCurrency(value) : formatNumber(value);

  return (
    <div
      className={cn(
        'stats-card relative overflow-hidden',
        className
      )}
      data-variant={variant}
    >
      {/* Top row - Icon and Change indicator */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon container */}
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            'bg-[var(--background-secondary)] text-[var(--text-secondary)]'
          )}
        >
          {icon}
        </div>

        {/* Change indicator */}
        <div
          className={cn(
            'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold',
            isGood
              ? 'bg-[var(--success-bg)] text-[var(--success)]'
              : 'bg-[var(--error-bg)] text-[var(--error)]'
          )}
        >
          {isPositive ? (
            <ArrowUpIcon className="w-3 h-3" />
          ) : (
            <ArrowDownIcon className="w-3 h-3" />
          )}
          <span>{formatPercent(Math.abs(change), false)}</span>
        </div>
      </div>

      {/* Value */}
      <div className="stats-card-value mb-1">
        <span className="value text-2xl font-bold text-[var(--text-primary)]">
          {formattedValue}
        </span>
      </div>

      {/* Label */}
      <div className="stats-card-label">
        <span className="label text-sm text-[var(--text-tertiary)]">
          {title}
        </span>
      </div>

      {/* Decorative gradient overlay for chromatic style */}
      <div
        className="absolute inset-0 opacity-0 pointer-events-none transition-opacity"
        style={{
          background: 'var(--gradient-card, transparent)',
        }}
      />
    </div>
  );
}
