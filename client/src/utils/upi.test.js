import { describe, it, expect } from 'vitest';
import { parseAmount, formatINR } from './upi.js';
import { UPI_ID, UPI_NAME } from './constants.js';

describe('payee details', () => {
  it('uses the verified UPI ID and recipient', () => {
    expect(UPI_ID).toBe('9923960696@ybl');
    expect(UPI_NAME).toBe('ADAM QASIM PINJARI');
  });
});

describe('parseAmount', () => {
  it('rejects empty input', () => {
    expect(parseAmount('')).toMatchObject({ valid: false });
  });
  it('accepts whole rupees', () => {
    expect(parseAmount('2000')).toMatchObject({ valid: true, value: 2000 });
  });
  it('rejects zero, decimals, text and huge numbers', () => {
    for (const bad of ['0', '12.5', 'abc', '-5', '100001', '1e5']) {
      expect(parseAmount(bad).valid).toBe(false);
    }
  });
});

describe('formatINR', () => {
  it('formats with the rupee sign', () => {
    expect(formatINR(1000)).toBe('₹1,000');
  });
});
