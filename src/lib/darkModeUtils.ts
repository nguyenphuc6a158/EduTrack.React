/**
 * Dark Mode Utilities
 * Helper functions for managing dark mode colors and styles
 */

import { useSettings } from 'src/stores/settingStore';
import { ThemeMode } from './enumconst';

/**
 * Get the appropriate color based on theme mode
 * @param lightColor - Color for light mode
 * @param darkColor - Color for dark mode
 * @returns The appropriate color for the current theme
 */
export const getThemeColor = (lightColor: string, darkColor: string): string => {
  const { themeMode } = useSettings();
  return themeMode === ThemeMode.Dark ? darkColor : lightColor;
};

/**
 * Theme color variables for common states
 */
export const themeColors = {
  // Success colors
  success: {
    light: '#d1f2eb',
    dark: '#1a4d42',
    borderLight: '#0fcc9f',
    borderDark: '#10b981',
  },
  // Error colors
  error: {
    light: '#ffe0e6',
    dark: '#5d1f2a',
    borderLight: '#ff4757',
    borderDark: '#f87171',
  },
  // Warning colors
  warning: {
    light: '#fff8d6',
    dark: '#5a4a1a',
    borderLight: '#ffa500',
    borderDark: '#fbbf24',
  },
  // Info colors
  info: {
    light: '#d0f2ff',
    dark: '#1e3a5f',
    borderLight: '#0084ff',
    borderDark: '#60a5fa',
  },
};

/**
 * Get CSS variables object for status background and border colors
 * @param status - 'success' | 'error' | 'warning' | 'info'
 * @returns Object with backgroundColor and borderColor using CSS variables
 */
export const getStatusStyles = (status: 'success' | 'error' | 'warning' | 'info') => {
  const colorMap = {
    success: '--color-success-bg',
    error: '--color-error-bg',
    warning: '--color-warning-bg',
    info: '--color-info-bg',
  };

  const borderMap = {
    success: '--color-success-border',
    error: '--color-error-border',
    warning: '--color-warning-border',
    info: '--color-info-border',
  };

  return {
    backgroundColor: `var(${colorMap[status]})`,
    borderColor: `var(${borderMap[status]})`,
    borderWidth: '2px',
    borderStyle: 'solid' as const,
  };
};

/**
 * Tailwind dark mode classes helper
 * Returns dark mode compatible Tailwind classes
 */
export const darkModeClasses = {
  text: 'dark:text-gray-100',
  bg: 'dark:bg-gray-900',
  border: 'dark:border-gray-700',
  card: 'dark:bg-gray-800',
  hover: 'dark:hover:bg-gray-700',
};

/**
 * Get text color classes based on theme
 * @returns CSS classes for text color
 */
export const getTextColorClass = (): string => {
  return 'text-gray-900 dark:text-gray-100';
};

/**
 * Get background color classes based on theme
 * @returns CSS classes for background color
 */
export const getBackgroundColorClass = (): string => {
  return 'bg-white dark:bg-gray-800';
};

/**
 * Get border color classes based on theme
 * @returns CSS classes for border color
 */
export const getBorderColorClass = (): string => {
  return 'border-gray-200 dark:border-gray-700';
};
