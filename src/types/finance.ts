/**
 * Finance TypeScript Types
 *
 * These types define the structure of all financial data used throughout
 * the dashboard application. They ensure type safety and provide clear
 * documentation for the data models.
 */

/**
 * Transaction represents a single financial transaction.
 * Used in transaction tables and activity feeds.
 */
export interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: TransactionCategory;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'failed';
  merchant?: string;
  icon?: string;
}

/**
 * Available transaction categories for categorization and filtering.
 */
export type TransactionCategory =
  | 'salary'
  | 'investment'
  | 'transfer'
  | 'food'
  | 'transportation'
  | 'utilities'
  | 'entertainment'
  | 'shopping'
  | 'healthcare'
  | 'other';

/**
 * PortfolioAsset represents a single investment holding.
 * Used in portfolio overview widgets.
 */
export interface PortfolioAsset {
  id: string;
  name: string;
  symbol: string;
  type: 'stock' | 'crypto' | 'bond' | 'etf' | 'mutual_fund';
  quantity: number;
  currentPrice: number;
  purchasePrice: number;
  change24h: number;
  allocation: number; // percentage of total portfolio
}

/**
 * RevenueDataPoint represents a single point in time-series revenue data.
 * Used for revenue/expense charts.
 */
export interface RevenueDataPoint {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

/**
 * ExpenseCategory represents a spending category with its total and percentage.
 * Used for pie/donut charts showing expense breakdown.
 */
export interface ExpenseCategory {
  name: string;
  value: number;
  percentage: number;
  color: string;
  /** Index signature required for Recharts compatibility */
  [key: string]: string | number;
}

/**
 * StatsData contains the main KPI metrics displayed in stats cards.
 * Each metric includes a value and percentage change.
 */
export interface StatsData {
  totalRevenue: number;
  revenueChange: number;
  totalExpenses: number;
  expensesChange: number;
  netProfit: number;
  profitChange: number;
  transactionCount: number;
  transactionChange: number;
}

/**
 * ActivityItem represents a single entry in the activity feed.
 * Can be transactions, alerts, goals, or portfolio updates.
 */
export interface ActivityItem {
  id: string;
  type: 'transaction' | 'alert' | 'goal' | 'portfolio';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

/**
 * Notification represents a user notification/alert.
 * Used in the notification panel dropdown.
 */
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}
