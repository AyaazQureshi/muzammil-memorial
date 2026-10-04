import { MAX_AMOUNT } from './constants.js';

export function parseAmount(raw) {
  const text = String(raw ?? '').trim();

  if (text === '') {
    return { valid: false, value: null, error: 'Please enter an amount.' };
  }
  if (!/^\d+$/.test(text)) {
    return { valid: false, value: null, error: 'Please enter the amount in whole rupees.' };
  }

  const value = Number(text);

  if (!Number.isSafeInteger(value) || value < 1 || value > MAX_AMOUNT) {
    return {
      valid: false,
      value: null,
      error: `Please enter an amount between ₹1 and ₹${MAX_AMOUNT.toLocaleString('en-IN')}.`,
    };
  }

  return { valid: true, value, error: '' };
}

export const formatINR = (n) =>
  `₹${Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
