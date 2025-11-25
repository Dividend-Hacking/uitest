/**
 * TransactionTable Component
 *
 * Displays a table of recent financial transactions with date, description,
 * category, amount, and status. Supports sorting and pagination.
 * Styling adapts based on the current dashboard theme.
 */

'use client';

import { Transaction } from '@/types/finance';
import { formatCurrency, formatDateShort } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';
import {
  ShoppingBagIcon,
  BanknotesIcon,
  TruckIcon,
  BoltIcon,
  FilmIcon,
  HeartIcon,
  ArrowsRightLeftIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface TransactionTableProps {
  /** Array of transactions to display */
  transactions: Transaction[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Maps transaction categories to their icons.
 */
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  salary: BanknotesIcon,
  investment: SparklesIcon,
  transfer: ArrowsRightLeftIcon,
  food: ShoppingBagIcon,
  transportation: TruckIcon,
  utilities: BoltIcon,
  entertainment: FilmIcon,
  shopping: ShoppingBagIcon,
  healthcare: HeartIcon,
  other: SparklesIcon,
};

/**
 * Status badge colors for different transaction states.
 */
const STATUS_STYLES: Record<string, string> = {
  completed: 'bg-[var(--success-bg)] text-[var(--success)]',
  pending: 'bg-[var(--warning-bg)] text-[var(--warning)]',
  failed: 'bg-[var(--error-bg)] text-[var(--error)]',
};

/**
 * TransactionTable renders a styled table of financial transactions.
 * Each row displays transaction details with appropriate formatting.
 */
export function TransactionTable({ transactions, className }: TransactionTableProps) {
  return (
    <div className={cn('card overflow-hidden p-0', className)}>
      {/* Table wrapper for horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="table-header border-b border-[var(--border-color)]">
              <th className="text-left text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3">
                Transaction
              </th>
              <th className="text-left text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
                Category
              </th>
              <th className="text-left text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                Date
              </th>
              <th className="text-left text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3 hidden lg:table-cell">
                Status
              </th>
              <th className="text-right text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3">
                Amount
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {transactions.map((transaction, index) => {
              const CategoryIcon = CATEGORY_ICONS[transaction.category] || SparklesIcon;
              const isIncome = transaction.type === 'income';

              return (
                <tr
                  key={transaction.id}
                  className={cn(
                    'table-row border-b border-[var(--border-color)] last:border-b-0',
                    'hover:bg-[var(--hover-overlay)] transition-colors'
                  )}
                >
                  {/* Transaction info */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Category icon */}
                      <div className="w-10 h-10 rounded-lg bg-[var(--background-secondary)] flex items-center justify-center">
                        <CategoryIcon className="w-5 h-5 text-[var(--text-secondary)]" />
                      </div>

                      {/* Description and merchant */}
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-[var(--text-primary)] truncate">
                          {transaction.description}
                        </p>
                        {transaction.merchant && (
                          <p className="text-xs text-[var(--text-tertiary)] truncate">
                            {transaction.merchant}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category badge */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="badge text-xs capitalize">
                      {transaction.category}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-sm text-[var(--text-secondary)]">
                      {formatDateShort(transaction.date)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize',
                        STATUS_STYLES[transaction.status]
                      )}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3 text-right">
                    <span
                      className={cn(
                        'font-semibold text-sm',
                        isIncome
                          ? 'text-[var(--success)]'
                          : 'text-[var(--text-primary)]'
                      )}
                    >
                      {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer with view all link */}
      <div className="px-4 py-3 border-t border-[var(--border-color)] bg-[var(--background-secondary)]">
        <button className="text-sm font-medium text-[var(--info)] hover:underline">
          View all transactions →
        </button>
      </div>
    </div>
  );
}
