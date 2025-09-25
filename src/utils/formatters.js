/**
 * Number and text formatting utilities
 */

/**
 * Format numbers with human-friendly suffixes (K, M, G, etc.)
 * @param {number} n - Number to format
 * @param {number} d - Decimal places
 * @returns {string} Formatted number with suffix
 */
export function humanFriendlyNumber(n, d) {
  const d2 = Math.pow(10, d);
  const s = ' KMGTPE';
  let i = 0;
  const c = 1000;

  while ((n >= c || n <= -c) && ++i < s.length) {
    n = n / c;
  }

  i = i >= s.length ? s.length - 1 : i;

  return Math.round(n * d2) / d2 + s[i];
}

/**
 * Format numbers with comma separators
 * @param {number} x - Number to format
 * @returns {string} Formatted number with commas
 */
export function formatNumber(x) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
