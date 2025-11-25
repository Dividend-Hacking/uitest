/**
 * NotificationPanel Component
 *
 * Displays a list of user notifications including alerts, success messages,
 * warnings, and informational updates. Shows read/unread status and
 * allows marking notifications as read.
 */

'use client';

import { Notification } from '@/types/finance';
import { formatRelativeTime } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface NotificationPanelProps {
  /** Array of notifications */
  notifications: Notification[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Maps notification types to their icons.
 */
const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
};

/**
 * Type-based styling for notifications.
 */
const TYPE_STYLES: Record<string, { bg: string; icon: string; dot: string }> = {
  success: {
    bg: 'bg-[var(--success-bg)]',
    icon: 'text-[var(--success)]',
    dot: 'bg-[var(--success)]',
  },
  warning: {
    bg: 'bg-[var(--warning-bg)]',
    icon: 'text-[var(--warning)]',
    dot: 'bg-[var(--warning)]',
  },
  error: {
    bg: 'bg-[var(--error-bg)]',
    icon: 'text-[var(--error)]',
    dot: 'bg-[var(--error)]',
  },
  info: {
    bg: 'bg-[var(--info-bg)]',
    icon: 'text-[var(--info)]',
    dot: 'bg-[var(--info)]',
  },
};

/**
 * NotificationPanel renders a list of user notifications.
 * Unread notifications are highlighted with a colored dot.
 */
export function NotificationPanel({ notifications, className }: NotificationPanelProps) {
  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={cn('card', className)}>
      {/* Header with unread count */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--text-primary)]">
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[var(--error)] text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <button className="text-xs font-medium text-[var(--info)] hover:underline">
          Mark all read
        </button>
      </div>

      {/* Notification list */}
      <div className="space-y-1">
        {notifications.map((notification) => {
          const Icon = TYPE_ICONS[notification.type];
          const styles = TYPE_STYLES[notification.type];

          return (
            <div
              key={notification.id}
              className={cn(
                'relative flex gap-3 p-3 rounded-lg transition-colors cursor-pointer',
                notification.read
                  ? 'bg-transparent hover:bg-[var(--hover-overlay)]'
                  : 'bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)]'
              )}
            >
              {/* Unread indicator dot */}
              {!notification.read && (
                <div
                  className={cn(
                    'absolute top-4 left-1 w-2 h-2 rounded-full',
                    styles.dot
                  )}
                />
              )}

              {/* Icon */}
              <div
                className={cn(
                  'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center',
                  styles.bg
                )}
              >
                <Icon className={cn('w-5 h-5', styles.icon)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={cn(
                      'text-sm truncate',
                      notification.read
                        ? 'font-normal text-[var(--text-secondary)]'
                        : 'font-semibold text-[var(--text-primary)]'
                    )}
                  >
                    {notification.title}
                  </p>
                  <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">
                    {formatRelativeTime(notification.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5 line-clamp-2">
                  {notification.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
        <button className="text-sm font-medium text-[var(--info)] hover:underline">
          View all notifications →
        </button>
      </div>
    </div>
  );
}
