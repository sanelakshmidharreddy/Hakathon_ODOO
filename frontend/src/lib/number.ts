/**
 * Safe number parsing and formatting utilities
 * Prevents NaN, null, and undefined values in UI displays and charts
 */

export const toNumber = (value: unknown, fallback = 0): number => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  const num = typeof value === 'string' ? Number(value.replace(/[^0-9.-]/g, '')) : Number(value);
  return typeof num === 'number' && Number.isFinite(num) ? num : fallback;
};

export const formatCurrencyLakh = (value: unknown): string => {
  const num = toNumber(value, 0);
  if (num === 0) return '₹0.00 Lakh';
  return `₹${(num / 100000).toFixed(2)} Lakh`;
};

export const formatCurrencyLakhs = (value: unknown): string => {
  const num = toNumber(value, 0);
  if (num === 0) return '₹0.00 Lakhs';
  return `₹${(num / 100000).toFixed(2)} Lakhs`;
};

export const formatCurrency = (value: unknown): string => {
  const num = toNumber(value, 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatPercent = (value: unknown): string => {
  const num = toNumber(value, 0);
  return `${num.toFixed(1)}%`;
};

export const safeDivide = (numerator: unknown, denominator: unknown, fallback = 0): number => {
  const num = toNumber(numerator, 0);
  const den = toNumber(denominator, 0);
  if (den === 0 || !Number.isFinite(den)) {
    return fallback;
  }
  const result = num / den;
  return Number.isFinite(result) ? result : fallback;
};
