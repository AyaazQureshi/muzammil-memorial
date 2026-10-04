import { useState } from 'react';

import qrImage from '../assets/upi-qr.png';

import { PRESET_AMOUNTS, UPI_ID, UPI_NAME } from '../utils/constants.js';
import { formatINR, parseAmount } from '../utils/upi.js';
import { copyText } from '../utils/clipboard.js';
import { useToast } from './Toast.jsx';

export default function DonationBox() {
  const toast = useToast();

  const [raw, setRaw] = useState('');
  const parsed = parseAmount(raw);

  const onAmountChange = (e) => {
    setRaw(e.target.value.replace(/[^\d]/g, '').slice(0, 6));
  };

  const onCopy = async () => {
    const ok = await copyText(UPI_ID);
    toast(ok ? 'UPI ID copied' : 'Could not copy. Please copy the UPI ID by hand.');
  };

  return (
    <div className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-white ring-1 ring-sand/80 shadow-[0_24px_60px_-40px_rgba(30,45,69,0.45)]">
      <div className="p-6 sm:p-9">
        <h3 className="font-serif text-2xl">Donate to Muzammil's Family</h3>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-ink">Choose an amount</legend>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PRESET_AMOUNTS.map((a) => {
              const active = raw === String(a);
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRaw(String(a))}
                  className={`min-h-12 rounded-xl border px-3 text-base font-semibold transition-colors ${
                    active
                      ? 'border-navy bg-navy text-paper'
                      : 'border-sand bg-paper text-ink hover:border-navy/50'
                  }`}
                >
                  {formatINR(a)}
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <label htmlFor="amount" className="text-sm font-semibold text-ink">
              Custom amount
            </label>
            <div className="mt-2 flex items-center rounded-xl border border-sand bg-paper focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/25">
              <span className="pl-4 text-lg text-muted" aria-hidden="true">₹</span>
              <input
                id="amount"
                value={raw}
                onChange={onAmountChange}
                inputMode="numeric"
                autoComplete="off"
                placeholder="Enter an amount"
                aria-describedby="amount-help"
                className="min-h-12 w-full rounded-xl bg-transparent px-3 text-lg outline-none"
              />
            </div>
            <p id="amount-help" className="mt-2 text-sm text-muted">
              {parsed.valid
                ? `Scan the QR code below and enter ${formatINR(parsed.value)} in your UPI app.`
                : 'Scan the QR code below and enter your chosen amount in your UPI app.'}
            </p>
          </div>
        </fieldset>
      </div>

      <div
        id="upi-payment"
        className="border-t border-sand/80 bg-paper/60 p-6 text-center sm:p-9"
      >
        <h3 className="font-serif text-2xl">Scan to Donate via UPI</h3>

        <div className="mx-auto mt-5 w-full max-w-[22rem] rounded-2xl bg-white p-3 ring-1 ring-sand">
          <img
            src={qrImage}
            alt={`UPI QR code for ${UPI_NAME}. UPI ID ${UPI_ID}.`}
            width="740"
            height="1110"
            className="mx-auto h-auto w-full"
          />
        </div>

        <dl className="mt-6 space-y-5">
          <div>
            <dt className="text-sm text-muted">UPI ID</dt>
            <dd className="mt-1 flex flex-col items-center gap-3">
              <span className="select-all break-all text-lg font-bold">{UPI_ID}</span>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/30 px-5 text-sm font-semibold text-navy transition-colors hover:bg-navy-soft"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                </svg>
                Copy UPI ID
              </button>
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted">Recipient</dt>
            <dd className="mt-0.5 text-lg font-bold tracking-wide">{UPI_NAME}</dd>
          </div>
        </dl>

        <p className="mt-6 rounded-xl border border-gold/40 bg-[#FBF7EF] px-4 py-3 text-sm text-ink">
          Please verify the recipient name before making the payment.
        </p>
      </div>
    </div>
  );
}
