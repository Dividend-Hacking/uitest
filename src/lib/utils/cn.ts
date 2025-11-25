/**
 * Class Name Utility (cn)
 *
 * Combines clsx and tailwind-merge to create a utility for merging
 * Tailwind CSS classes. This prevents class conflicts and ensures
 * the correct styles are applied when combining multiple class strings.
 *
 * Usage:
 * cn('px-4 py-2', 'px-6') // Returns 'py-2 px-6' (px-6 overrides px-4)
 * cn('text-red-500', condition && 'text-blue-500') // Conditional classes
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class values and resolves Tailwind CSS conflicts.
 * @param inputs - Any number of class values (strings, arrays, objects, etc.)
 * @returns A single merged class string with conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
