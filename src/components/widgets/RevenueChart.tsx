/**
 * RevenueChart Component
 *
 * Displays a time-series area chart showing revenue, expenses, and profit
 * over the past 12 months. Uses Recharts for rendering with responsive
 * container support. Styling adapts based on the current dashboard theme.
 */

'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useStyle } from '@/contexts/StyleContext';
import { useTheme } from '@/contexts/ThemeContext';
import { RevenueDataPoint } from '@/types/finance';
import { formatCurrency } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';

interface RevenueChartProps {
  /** Array of revenue data points */
  data: RevenueDataPoint[];
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Chart color schemes for each dashboard style.
 * Defines colors for revenue, expenses, and grid lines.
 */
const CHART_COLORS: Record<string, { revenue: string; expenses: string; profit: string; grid: string }> = {
  chromatic: {
    revenue: '#4ECDC4',
    expenses: '#FF6B6B',
    profit: '#FFE66D',
    grid: 'rgba(0, 0, 0, 0.08)',
  },
  minimalist: {
    revenue: '#1a1a1a',
    expenses: '#999999',
    profit: '#0066FF',
    grid: 'rgba(0, 0, 0, 0.06)',
  },
  brutalism: {
    revenue: '#000000',
    expenses: '#FF0000',
    profit: '#0000FF',
    grid: 'rgba(0, 0, 0, 0.2)',
  },
  neobrutalism: {
    revenue: '#000000',
    expenses: '#F472B6',
    profit: '#60A5FA',
    grid: 'rgba(0, 0, 0, 0.15)',
  },
  tech: {
    revenue: '#00FF88',
    expenses: '#FF3366',
    profit: '#00D4FF',
    grid: 'rgba(255, 255, 255, 0.1)',
  },
  bauhaus: {
    revenue: '#1E3A8A',
    expenses: '#DC2626',
    profit: '#FBBF24',
    grid: 'rgba(0, 0, 0, 0.1)',
  },
  neumorphism: {
    revenue: '#6366F1',
    expenses: '#EC4899',
    profit: '#14B8A6',
    grid: 'rgba(0, 0, 0, 0.06)',
  },
  glassmorphism: {
    revenue: '#8B5CF6',
    expenses: '#EC4899',
    profit: '#06B6D4',
    grid: 'rgba(255, 255, 255, 0.1)',
  },
  illustrative: {
    revenue: '#E07A5F',
    expenses: '#3D405B',
    profit: '#81B29A',
    grid: 'rgba(0, 0, 0, 0.08)',
  },
  monochromatic: {
    revenue: '#1a1a1a',
    expenses: '#808080',
    profit: '#4d4d4d',
    grid: 'rgba(0, 0, 0, 0.08)',
  },
  'monochromatic-blue': {
    revenue: '#1a2d6d',
    expenses: '#a8b5e8',
    profit: '#4a6cb8',
    grid: 'rgba(30, 45, 109, 0.1)',
  },
};

/**
 * Custom tooltip component for the chart.
 * Displays formatted values for all data series.
 */
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (!active || !payload) return null;

  return (
    <div className="card p-3 shadow-lg">
      <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[var(--text-secondary)] capitalize">
            {entry.dataKey}:
          </span>
          <span className="font-medium text-[var(--text-primary)]">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * RevenueChart renders an area chart showing financial trends.
 * Displays revenue and expenses with appropriate styling for the current theme.
 */
export function RevenueChart({ data, className }: RevenueChartProps) {
  const { styleSlug } = useStyle();
  const { isDark } = useTheme();

  // Get colors for current style
  const colors = CHART_COLORS[styleSlug] || CHART_COLORS.minimalist;

  // Adjust colors for dark mode where needed
  const adjustedColors = {
    ...colors,
    grid: isDark ? 'rgba(255, 255, 255, 0.1)' : colors.grid,
  };

  return (
    <div className={cn('card h-80', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradient definitions for fill */}
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={adjustedColors.revenue} stopOpacity={0.3} />
              <stop offset="95%" stopColor={adjustedColors.revenue} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={adjustedColors.expenses} stopOpacity={0.3} />
              <stop offset="95%" stopColor={adjustedColors.expenses} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={adjustedColors.grid}
            vertical={false}
          />

          {/* Axes */}
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }}
            tickLine={false}
            axisLine={{ stroke: adjustedColors.grid }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `$${(value / 1000).toFixed(0)}k`}
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Legend */}
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            iconType="circle"
          />

          {/* Data areas */}
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke={adjustedColors.revenue}
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke={adjustedColors.expenses}
            strokeWidth={2}
            fill="url(#expensesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
