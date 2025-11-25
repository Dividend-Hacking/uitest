/**
 * ExpenseBreakdown Component
 *
 * Displays a donut/pie chart showing expense distribution by category.
 * Includes a legend with category names, values, and percentages.
 * Uses Recharts for rendering with responsive container support.
 */

'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useStyle } from '@/contexts/StyleContext';
import { ExpenseCategory } from '@/types/finance';
import { formatCurrency } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';

interface ExpenseBreakdownProps {
  /** Array of expense categories with values */
  data: ExpenseCategory[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Color schemes for each dashboard style.
 * Provides an array of colors for pie chart segments.
 */
const CHART_COLORS: Record<string, string[]> = {
  chromatic: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#45B7D1', '#9B59B6'],
  minimalist: ['#1a1a1a', '#333333', '#666666', '#999999', '#CCCCCC'],
  brutalism: ['#000000', '#FF0000', '#0000FF', '#FFFF00', '#00FF00'],
  neobrutalism: ['#000000', '#F472B6', '#60A5FA', '#4ADE80', '#FEF08A'],
  tech: ['#00FF88', '#00D4FF', '#FF3366', '#A855F7', '#FACC15'],
  bauhaus: ['#1E3A8A', '#DC2626', '#FBBF24', '#000000', '#6B7280'],
  neumorphism: ['#6366F1', '#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B'],
  glassmorphism: ['#8B5CF6', '#EC4899', '#06B6D4', '#3B82F6', '#F59E0B'],
  illustrative: ['#E07A5F', '#81B29A', '#F2CC8F', '#3D405B', '#6B7FD7'],
  monochromatic: ['#1a1a1a', '#4d4d4d', '#808080', '#B3B3B3', '#E0E0E0'],
  'monochromatic-blue': ['#1a2d6d', '#2e4a8f', '#4a6cb8', '#a8b5e8', '#c7d2fe'],
  'minimal-bauhaus': ['#1E3A8A', '#DC2626', '#FBBF24', '#000000', '#6B7280'],
};

/**
 * Custom tooltip for the pie chart.
 * Shows category name, value, and percentage.
 */
function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ExpenseCategory }> }) {
  if (!active || !payload?.[0]) return null;

  const data = payload[0].payload;

  return (
    <div className="card p-3 shadow-lg">
      <p className="text-sm font-semibold text-[var(--text-primary)]">{data.name}</p>
      <p className="text-sm text-[var(--text-secondary)]">
        {formatCurrency(data.value)} ({data.percentage}%)
      </p>
    </div>
  );
}

/**
 * ExpenseBreakdown renders a donut chart with expense categories.
 * Includes an interactive legend showing all categories.
 */
export function ExpenseBreakdown({ data, className }: ExpenseBreakdownProps) {
  const { styleSlug } = useStyle();

  // Get colors for current style
  const colors = CHART_COLORS[styleSlug] || CHART_COLORS.minimalist;

  // Calculate total for center display
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={cn('card', className)}>
      {/* Chart container */}
      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {formatCurrency(total)}
            </p>
            <p className="text-xs text-[var(--text-tertiary)]">Total</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((category, index) => (
          <div
            key={category.name}
            className="flex items-center justify-between text-sm"
          >
            {/* Category name with color indicator */}
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-[var(--text-secondary)]">{category.name}</span>
            </div>

            {/* Value and percentage */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-[var(--text-primary)]">
                {formatCurrency(category.value)}
              </span>
              <span className="text-xs text-[var(--text-tertiary)] min-w-[40px] text-right">
                {category.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
