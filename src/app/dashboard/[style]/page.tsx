/**
 * Dynamic Dashboard Page
 *
 * Renders the dashboard for a specific UI style based on the URL parameter.
 * Uses generateStaticParams for static generation of all 9 style variants.
 * Each style gets the same set of widgets but with different visual styling.
 */

import { notFound } from 'next/navigation';
import { STYLES, getStyleBySlug, STYLE_SLUGS } from '@/lib/constants/styles';
import { Dashboard } from '@/components/Dashboard';

/**
 * Generate static paths for all 9 dashboard styles.
 * This enables static generation at build time for optimal performance.
 */
export function generateStaticParams() {
  return STYLE_SLUGS.map((style) => ({
    style,
  }));
}

/**
 * Generate metadata for each dashboard page.
 * Sets page title and description based on the current style.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ style: string }>;
}) {
  const { style } = await params;
  const styleConfig = getStyleBySlug(style);

  if (!styleConfig) {
    return {
      title: 'Dashboard Not Found',
    };
  }

  return {
    title: `${styleConfig.name} Dashboard | UI Styles`,
    description: styleConfig.description,
  };
}

/**
 * DashboardPage renders the dashboard for a specific style.
 * Validates the style parameter and shows 404 if invalid.
 */
interface DashboardPageProps {
  params: Promise<{ style: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { style } = await params;

  // Validate that the style exists
  const styleConfig = getStyleBySlug(style);

  if (!styleConfig) {
    notFound();
  }

  return <Dashboard style={style} />;
}
