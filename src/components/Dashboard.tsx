/**
 * Dashboard Component
 *
 * Main dashboard component that assembles all widgets into a cohesive layout.
 * Renders stats cards, charts, tables, and activity feeds using the current
 * UI style. This component is shared across all 9 style variants.
 */

'use client';

import {
  DashboardShell,
  DashboardGrid,
  DashboardSection,
  DashboardRow,
} from '@/components/layout/DashboardShell';
import { StatsCard } from '@/components/widgets/StatsCard';
import { RevenueChart } from '@/components/widgets/RevenueChart';
import { ExpenseBreakdown } from '@/components/widgets/ExpenseBreakdown';
import { TransactionTable } from '@/components/widgets/TransactionTable';
import { PortfolioOverview } from '@/components/widgets/PortfolioOverview';
import { ActivityFeed } from '@/components/widgets/ActivityFeed';
import { NotificationPanel } from '@/components/widgets/NotificationPanel';
import {
  statsData,
  generateRevenueData,
  expenseCategories,
  transactions,
  portfolioAssets,
  activityItems,
  notifications,
} from '@/lib/data/mock-data';
import {
  BanknotesIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

interface DashboardProps {
  /** Current style slug (e.g., 'chromatic', 'neumorphism') */
  style: string;
}

/**
 * Dashboard renders the complete finance dashboard with all widgets.
 * The visual style is determined by CSS custom properties from the current theme.
 */
export function Dashboard({ style }: DashboardProps) {
  // Generate revenue chart data
  const revenueData = generateRevenueData();

  return (
    <DashboardShell>
      {/* Stats Cards Row */}
      <DashboardGrid columns={4}>
        <StatsCard
          title="Total Revenue"
          value={statsData.totalRevenue}
          change={statsData.revenueChange}
          icon={<BanknotesIcon className="w-6 h-6" />}
          variant="revenue"
        />
        <StatsCard
          title="Total Expenses"
          value={statsData.totalExpenses}
          change={statsData.expensesChange}
          icon={<ArrowTrendingDownIcon className="w-6 h-6" />}
          variant="expense"
        />
        <StatsCard
          title="Net Profit"
          value={statsData.netProfit}
          change={statsData.profitChange}
          icon={<ChartBarIcon className="w-6 h-6" />}
          variant="profit"
        />
        <StatsCard
          title="Transactions"
          value={statsData.transactionCount}
          change={statsData.transactionChange}
          icon={<CreditCardIcon className="w-6 h-6" />}
          variant="transactions"
          isCurrency={false}
        />
      </DashboardGrid>

      {/* Charts Row - Revenue Chart and Expense Breakdown */}
      <DashboardRow>
        <div className="flex-1 lg:flex-[2]">
          <DashboardSection title="Revenue Overview" description="Monthly revenue and expenses">
            <RevenueChart data={revenueData} />
          </DashboardSection>
        </div>
        <div className="flex-1">
          <DashboardSection title="Expense Breakdown" description="By category">
            <ExpenseBreakdown data={expenseCategories} />
          </DashboardSection>
        </div>
      </DashboardRow>

      {/* Portfolio and Transactions Row */}
      <DashboardRow>
        <div className="flex-1">
          <DashboardSection title="Portfolio" description="Investment holdings">
            <PortfolioOverview assets={portfolioAssets} />
          </DashboardSection>
        </div>
        <div className="flex-1 lg:flex-[2]">
          <DashboardSection title="Recent Transactions" description="Latest activity">
            <TransactionTable transactions={transactions.slice(0, 8)} />
          </DashboardSection>
        </div>
      </DashboardRow>

      {/* Activity and Notifications Row */}
      <DashboardRow>
        <div className="flex-1">
          <DashboardSection title="Activity Feed" description="Recent events">
            <ActivityFeed items={activityItems} />
          </DashboardSection>
        </div>
        <div className="flex-1">
          <DashboardSection title="Notifications" description="Alerts and updates">
            <NotificationPanel notifications={notifications} />
          </DashboardSection>
        </div>
      </DashboardRow>
    </DashboardShell>
  );
}
