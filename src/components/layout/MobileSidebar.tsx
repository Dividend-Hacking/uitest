/**
 * MobileSidebar Component
 *
 * A slide-out drawer for mobile devices that displays the sidebar navigation.
 * Triggered by a hamburger menu icon in the header, slides in from the left.
 * Reuses the existing Sidebar component for consistent navigation experience.
 *
 * Only visible on mobile devices (below md breakpoint).
 */

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils/cn';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * MobileSidebar provides hamburger menu navigation for mobile devices.
 * Renders the existing Sidebar component inside a slide-out drawer.
 */
export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Close the drawer when the route changes (user selected a style).
   */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /**
   * Closes the drawer when backdrop is tapped or close button pressed.
   */
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button - visible only on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'md:hidden flex items-center justify-center p-2 rounded-lg',
          'hover:bg-[var(--background-secondary)]',
          'text-[var(--text-primary)]'
        )}
        aria-label="Open navigation menu"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Backdrop Overlay - Closes drawer when tapped */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 mobile-backdrop"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer Container */}
      <div
        className={cn(
          'md:hidden fixed inset-y-0 left-0 z-50',
          'w-[280px] max-w-[85vw]',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Close Button - Positioned in top right of drawer */}
        <button
          onClick={handleClose}
          className={cn(
            'absolute top-4 right-4 z-10 p-2 rounded-lg',
            'bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)]',
            'text-[var(--text-secondary)]'
          )}
          aria-label="Close navigation menu"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Sidebar Component - displayed inside the drawer */}
        <div className="mobile-sidebar-container h-full">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
