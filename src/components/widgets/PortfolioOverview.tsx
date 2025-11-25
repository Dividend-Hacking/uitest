/**
 * PortfolioOverview Component
 *
 * Displays a list of investment portfolio holdings with current value,
 * 24-hour change, and allocation percentage. Shows stocks, crypto, ETFs,
 * and bonds with appropriate icons and styling.
 */

'use client';

import { PortfolioAsset } from '@/types/finance';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface PortfolioOverviewProps {
  /** Array of portfolio assets */
  assets: PortfolioAsset[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Asset type colors for visual differentiation.
 */
const TYPE_COLORS: Record<string, string> = {
  stock: 'bg-blue-500',
  crypto: 'bg-orange-500',
  etf: 'bg-purple-500',
  bond: 'bg-green-500',
  mutual_fund: 'bg-pink-500',
};

/**
 * PortfolioOverview renders a list of investment holdings.
 * Each asset shows symbol, value, change, and allocation.
 */
export function PortfolioOverview({ assets, className }: PortfolioOverviewProps) {
  // Calculate total portfolio value
  const totalValue = assets.reduce(
    (sum, asset) => sum + asset.currentPrice * asset.quantity,
    0
  );

  return (
    <div className={cn('card', className)}>
      {/* Portfolio summary */}
      <div className="mb-4 pb-4 border-b border-[var(--border-color)]">
        <p className="text-sm text-[var(--text-tertiary)] mb-1">Total Value</p>
        <p className="text-2xl font-bold text-[var(--text-primary)]">
          {formatCurrency(totalValue)}
        </p>
      </div>

      {/* Asset list */}
      <div className="space-y-3">
        {assets.map((asset) => {
          const currentValue = asset.currentPrice * asset.quantity;
          const isPositive = asset.change24h >= 0;
          const profitLoss = currentValue - asset.purchasePrice * asset.quantity;
          const profitLossPercent = ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100;

          return (
            <div
              key={asset.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg',
                'bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)]',
                'transition-colors cursor-pointer'
              )}
            >
              {/* Asset icon/symbol */}
              <div className="flex-shrink-0">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm',
                    TYPE_COLORS[asset.type]
                  )}
                >
                  {asset.symbol.slice(0, 2)}
                </div>
              </div>

              {/* Asset details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-[var(--text-primary)] truncate">
                      {asset.symbol}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] truncate">
                      {asset.name}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-sm text-[var(--text-primary)]">
                      {formatCurrency(currentValue)}
                    </p>
                    <div className="flex items-center justify-end gap-1">
                      {isPositive ? (
                        <ArrowUpIcon className="w-3 h-3 text-[var(--success)]" />
                      ) : (
                        <ArrowDownIcon className="w-3 h-3 text-[var(--error)]" />
                      )}
                      <span
                        className={cn(
                          'text-xs font-medium',
                          isPositive ? 'text-[var(--success)]' : 'text-[var(--error)]'
                        )}
                      >
                        {formatPercent(asset.change24h)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Allocation bar */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[var(--text-tertiary)]">Allocation</span>
                    <span className="text-[var(--text-secondary)]">{asset.allocation}%</span>
                  </div>
                  <div className="h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', TYPE_COLORS[asset.type])}
                      style={{ width: `${asset.allocation}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
        <button className="text-sm font-medium text-[var(--info)] hover:underline">
          Manage portfolio →
        </button>
      </div>
    </div>
  );
}
