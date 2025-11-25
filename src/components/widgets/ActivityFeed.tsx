/**
 * ActivityFeed Component
 *
 * Displays a chronological list of recent account activity including
 * transactions, alerts, portfolio updates, and goal progress.
 * Each item shows an icon, title, description, and timestamp.
 */

'use client';

import { ActivityItem } from '@/types/finance';
import { formatRelativeTime } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  CreditCardIcon,
  FlagIcon,
  ShieldExclamationIcon,
  BanknotesIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface ActivityFeedProps {
  /** Array of activity items */
  items: ActivityItem[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Maps activity icon strings to their components.
 */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'check-circle': CheckCircleIcon,
  'exclamation-triangle': ExclamationTriangleIcon,
  'trending-up': ArrowTrendingUpIcon,
  'credit-card': CreditCardIcon,
  'flag': FlagIcon,
  'shield-exclamation': ShieldExclamationIcon,
  'banknotes': BanknotesIcon,
  'arrow-path': ArrowPathIcon,
};

/**
 * Status-based styling for activity items.
 */
const STATUS_STYLES: Record<string, { bg: string; icon: string; border: string }> = {
  success: {
    bg: 'bg-[var(--success-bg)]',
    icon: 'text-[var(--success)]',
    border: 'border-[var(--success)]',
  },
  warning: {
    bg: 'bg-[var(--warning-bg)]',
    icon: 'text-[var(--warning)]',
    border: 'border-[var(--warning)]',
  },
  error: {
    bg: 'bg-[var(--error-bg)]',
    icon: 'text-[var(--error)]',
    border: 'border-[var(--error)]',
  },
  info: {
    bg: 'bg-[var(--info-bg)]',
    icon: 'text-[var(--info)]',
    border: 'border-[var(--info)]',
  },
};

/**
 * ActivityFeed renders a timeline of recent account events.
 * Each item is styled based on its status (success, warning, etc.).
 */
export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn('card', className)}>
      <div className="space-y-0">
        {items.map((item, index) => {
          const Icon = ICON_MAP[item.icon] || CheckCircleIcon;
          const styles = STATUS_STYLES[item.status || 'info'];
          const isLast = index === items.length - 1;

          return (
            <div
              key={item.id}
              className={cn(
                'relative flex gap-4 pb-4',
                !isLast && 'border-b border-[var(--border-color)]'
              )}
            >
              {/* Timeline connector line */}
              {!isLast && (
                <div
                  className="absolute left-5 top-10 bottom-0 w-px bg-[var(--border-color)]"
                  aria-hidden="true"
                />
              )}

              {/* Icon */}
              <div
                className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                  styles.bg
                )}
              >
                <Icon className={cn('w-5 h-5', styles.icon)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--text-tertiary)] mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-[var(--border-color)]">
        <button className="text-sm font-medium text-[var(--info)] hover:underline">
          View all activity →
        </button>
      </div>
    </div>
  );
}
