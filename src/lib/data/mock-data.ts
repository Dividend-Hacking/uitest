/**
 * Mock Finance Data
 *
 * This file contains all the mock/filler data used throughout the dashboard.
 * In a real application, this data would come from an API or database.
 * The data is designed to be realistic and comprehensive for demo purposes.
 */

import {
  Transaction,
  PortfolioAsset,
  RevenueDataPoint,
  ExpenseCategory,
  StatsData,
  ActivityItem,
  Notification,
} from '@/types/finance';

/**
 * Generates 12 months of revenue/expense data for charts.
 * Creates realistic variations in financial performance.
 */
export function generateRevenueData(): RevenueDataPoint[] {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Predefined data for consistent display across sessions
  const data: RevenueDataPoint[] = [
    { date: 'Jan', revenue: 48500, expenses: 32000, profit: 16500 },
    { date: 'Feb', revenue: 52300, expenses: 34500, profit: 17800 },
    { date: 'Mar', revenue: 49800, expenses: 31200, profit: 18600 },
    { date: 'Apr', revenue: 58200, expenses: 38000, profit: 20200 },
    { date: 'May', revenue: 61500, expenses: 36800, profit: 24700 },
    { date: 'Jun', revenue: 55400, expenses: 35200, profit: 20200 },
    { date: 'Jul', revenue: 59800, expenses: 37500, profit: 22300 },
    { date: 'Aug', revenue: 64200, expenses: 39200, profit: 25000 },
    { date: 'Sep', revenue: 68500, expenses: 41000, profit: 27500 },
    { date: 'Oct', revenue: 72300, expenses: 43500, profit: 28800 },
    { date: 'Nov', revenue: 78500, expenses: 45200, profit: 33300 },
    { date: 'Dec', revenue: 84750, expenses: 48420, profit: 36330 },
  ];

  return data;
}

/**
 * Main stats/KPI data displayed in the stats cards.
 * Shows overall financial health at a glance.
 */
export const statsData: StatsData = {
  totalRevenue: 284750,
  revenueChange: 12.5,
  totalExpenses: 168420,
  expensesChange: -3.2,
  netProfit: 116330,
  profitChange: 28.4,
  transactionCount: 1847,
  transactionChange: 5.8,
};

/**
 * Expense breakdown by category for pie/donut charts.
 * Colors are used consistently across all dashboard styles.
 */
export const expenseCategories: ExpenseCategory[] = [
  { name: 'Operations', value: 52000, percentage: 31, color: '#6366F1' },
  { name: 'Marketing', value: 38000, percentage: 23, color: '#8B5CF6' },
  { name: 'Payroll', value: 45000, percentage: 27, color: '#EC4899' },
  { name: 'Technology', value: 21000, percentage: 12, color: '#14B8A6' },
  { name: 'Other', value: 12420, percentage: 7, color: '#F59E0B' },
];

/**
 * Portfolio assets showing current investment holdings.
 * Includes stocks, crypto, ETFs, and bonds for diversity.
 */
export const portfolioAssets: PortfolioAsset[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    type: 'stock',
    quantity: 150,
    currentPrice: 178.50,
    purchasePrice: 142.30,
    change24h: 2.34,
    allocation: 28,
  },
  {
    id: '2',
    name: 'Bitcoin',
    symbol: 'BTC',
    type: 'crypto',
    quantity: 0.85,
    currentPrice: 97250,
    purchasePrice: 42000,
    change24h: -1.2,
    allocation: 22,
  },
  {
    id: '3',
    name: 'Vanguard S&P 500',
    symbol: 'VOO',
    type: 'etf',
    quantity: 45,
    currentPrice: 412.80,
    purchasePrice: 380.50,
    change24h: 0.85,
    allocation: 20,
  },
  {
    id: '4',
    name: 'Microsoft Corp.',
    symbol: 'MSFT',
    type: 'stock',
    quantity: 80,
    currentPrice: 378.90,
    purchasePrice: 295.40,
    change24h: 1.56,
    allocation: 18,
  },
  {
    id: '5',
    name: 'Treasury Bonds',
    symbol: 'TLT',
    type: 'bond',
    quantity: 100,
    currentPrice: 92.40,
    purchasePrice: 98.20,
    change24h: 0.12,
    allocation: 12,
  },
];

/**
 * Recent transactions list for the transaction table.
 * Includes a variety of income and expense transactions.
 */
export const transactions: Transaction[] = [
  {
    id: 'txn-1',
    date: new Date('2024-11-25'),
    description: 'Monthly Salary',
    category: 'salary',
    amount: 8500,
    type: 'income',
    status: 'completed',
    merchant: 'Employer Inc.',
  },
  {
    id: 'txn-2',
    date: new Date('2024-11-24'),
    description: 'Stock Dividend',
    category: 'investment',
    amount: 245.80,
    type: 'income',
    status: 'completed',
    merchant: 'AAPL',
  },
  {
    id: 'txn-3',
    date: new Date('2024-11-24'),
    description: 'Grocery Shopping',
    category: 'food',
    amount: 156.42,
    type: 'expense',
    status: 'completed',
    merchant: 'Whole Foods',
  },
  {
    id: 'txn-4',
    date: new Date('2024-11-23'),
    description: 'Electric Bill',
    category: 'utilities',
    amount: 124.00,
    type: 'expense',
    status: 'completed',
    merchant: 'Power Co.',
  },
  {
    id: 'txn-5',
    date: new Date('2024-11-23'),
    description: 'Netflix Subscription',
    category: 'entertainment',
    amount: 15.99,
    type: 'expense',
    status: 'completed',
    merchant: 'Netflix',
  },
  {
    id: 'txn-6',
    date: new Date('2024-11-22'),
    description: 'Gas Station',
    category: 'transportation',
    amount: 58.50,
    type: 'expense',
    status: 'completed',
    merchant: 'Shell',
  },
  {
    id: 'txn-7',
    date: new Date('2024-11-22'),
    description: 'Online Purchase',
    category: 'shopping',
    amount: 89.99,
    type: 'expense',
    status: 'completed',
    merchant: 'Amazon',
  },
  {
    id: 'txn-8',
    date: new Date('2024-11-21'),
    description: 'Transfer to Savings',
    category: 'transfer',
    amount: 1000,
    type: 'expense',
    status: 'completed',
    merchant: 'Internal',
  },
  {
    id: 'txn-9',
    date: new Date('2024-11-21'),
    description: 'Freelance Payment',
    category: 'salary',
    amount: 1250,
    type: 'income',
    status: 'pending',
    merchant: 'Client Corp.',
  },
  {
    id: 'txn-10',
    date: new Date('2024-11-20'),
    description: 'Restaurant Dinner',
    category: 'food',
    amount: 78.50,
    type: 'expense',
    status: 'completed',
    merchant: 'Italian Bistro',
  },
  {
    id: 'txn-11',
    date: new Date('2024-11-20'),
    description: 'Doctor Visit',
    category: 'healthcare',
    amount: 150,
    type: 'expense',
    status: 'completed',
    merchant: 'Medical Center',
  },
  {
    id: 'txn-12',
    date: new Date('2024-11-19'),
    description: 'Uber Ride',
    category: 'transportation',
    amount: 24.50,
    type: 'expense',
    status: 'completed',
    merchant: 'Uber',
  },
  {
    id: 'txn-13',
    date: new Date('2024-11-19'),
    description: 'Interest Income',
    category: 'investment',
    amount: 85.20,
    type: 'income',
    status: 'completed',
    merchant: 'Bank',
  },
  {
    id: 'txn-14',
    date: new Date('2024-11-18'),
    description: 'Clothing Purchase',
    category: 'shopping',
    amount: 145.00,
    type: 'expense',
    status: 'completed',
    merchant: 'Target',
  },
  {
    id: 'txn-15',
    date: new Date('2024-11-18'),
    description: 'Concert Tickets',
    category: 'entertainment',
    amount: 180.00,
    type: 'expense',
    status: 'completed',
    merchant: 'Ticketmaster',
  },
];

/**
 * Activity feed items showing recent account activity.
 * Includes transactions, alerts, and portfolio updates.
 */
export const activityItems: ActivityItem[] = [
  {
    id: '1',
    type: 'transaction',
    title: 'Payment Received',
    description: 'Invoice #1234 paid by Acme Corp',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: 'check-circle',
    status: 'success',
  },
  {
    id: '2',
    type: 'alert',
    title: 'Budget Alert',
    description: 'Marketing spend is 85% of monthly limit',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    icon: 'exclamation-triangle',
    status: 'warning',
  },
  {
    id: '3',
    type: 'portfolio',
    title: 'Stock Alert',
    description: 'AAPL up 5.2% today',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    icon: 'trending-up',
    status: 'info',
  },
  {
    id: '4',
    type: 'transaction',
    title: 'Bill Paid',
    description: 'Electric bill auto-paid from checking',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    icon: 'credit-card',
    status: 'success',
  },
  {
    id: '5',
    type: 'goal',
    title: 'Savings Goal',
    description: 'You\'re 75% to your vacation fund goal',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    icon: 'flag',
    status: 'info',
  },
  {
    id: '6',
    type: 'alert',
    title: 'Large Transaction',
    description: 'Unusual $2,500 purchase detected',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
    icon: 'shield-exclamation',
    status: 'warning',
  },
  {
    id: '7',
    type: 'portfolio',
    title: 'Dividend Received',
    description: '$245.80 dividend from AAPL',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    icon: 'banknotes',
    status: 'success',
  },
  {
    id: '8',
    type: 'transaction',
    title: 'Subscription Renewed',
    description: 'Netflix subscription renewed for $15.99',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
    icon: 'arrow-path',
    status: 'info',
  },
];

/**
 * User notifications for the notification panel.
 * Includes read and unread notifications of various types.
 */
export const notifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Payment Processed',
    message: 'Your transfer of $5,000 to savings was successful.',
    timestamp: new Date(),
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Unusual Activity',
    message: 'We detected a login from a new device in New York.',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Monthly Report Ready',
    message: 'Your November financial report is now available.',
    timestamp: new Date(Date.now() - 86400000),
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Goal Achieved',
    message: 'Congratulations! You\'ve reached your emergency fund goal.',
    timestamp: new Date(Date.now() - 172800000),
    read: true,
  },
  {
    id: '5',
    type: 'error',
    title: 'Payment Failed',
    message: 'Your scheduled payment to Utility Co. failed. Please retry.',
    timestamp: new Date(Date.now() - 259200000),
    read: false,
  },
];
