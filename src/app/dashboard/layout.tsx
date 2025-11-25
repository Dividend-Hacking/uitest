/**
 * Dashboard Layout
 *
 * Shared layout for all dashboard pages. Wraps content with:
 * - ThemeProvider for light/dark mode
 * - StyleProvider for current UI style
 * - Sidebar for navigation between styles
 * - Header with theme toggle and controls
 *
 * This layout applies to all /dashboard/* routes.
 */

import { ThemeProvider } from '@/contexts/ThemeContext';
import { StyleProvider } from '@/contexts/StyleContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout provides the consistent structure for all dashboard pages.
 * Includes sidebar navigation, header controls, and main content area.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeProvider>
      <StyleProvider>
        {/* Main container - full height with flex row layout */}
        <div className="flex min-h-screen bg-[var(--background)]">
          {/* Fixed Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="flex-1 overflow-auto bg-[var(--background)]">
              {children}
            </main>
          </div>
        </div>
      </StyleProvider>
    </ThemeProvider>
  );
}
