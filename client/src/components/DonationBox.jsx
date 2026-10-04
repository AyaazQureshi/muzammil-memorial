import qrImage from '../assets/upi-qr.png';

import { UPI_ID, UPI_NAME } from '../utils/constants.js';
import { copyText } from '../utils/clipboard.js';
import { useToast } from './Toast.jsx';

export default function DonationBox() {
  const toast = useToast();

  const onCopy = async () => {
    const ok = await copyText(UPI_ID);

    toast(
      ok
        ? 'UPI ID copied'
        : 'Could not copy. Please copy the UPI ID by hand.'
    );
  };

  return (
    <div className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-white ring-1 ring-sand/80 shadow-[0_24px_60px_-40px_rgba(30,45,69,0.45)]">

      {/* Donation Header */}
      <div className="p-6 text-center sm:p-9">
        <h3 className="font-serif text-2xl">
          Donate to Muzammil's Family
        </h3>

        <p className="mt-3 text-sm text-muted">
          Your support can help Muzammil's family through this difficult time.
        </p>
      </div>

      {/* UPI Payment */}
      <div
        id="upi-payment"
        className="border-t border-sand/80 bg-paper/60 p-6 text-center sm:p-9"
      >
        <h3 className="font-serif text-2xl">
          Scan to Donate via UPI
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Scan the QR code using any UPI app to make your contribution.
        </p>

        {/* QR Code */}
        <div className="mx-auto mt-5 w-full max-w-[22rem] rounded-2xl bg-white p-3 ring-1 ring-sand">
          <img
            src={qrImage}
            alt={`UPI QR code for ${UPI_NAME}. UPI ID ${UPI_ID}.`}
            width="740"
            height="1110"
            className="mx-auto h-auto w-full"
          />
        </div>

        {/* UPI Details */}
        <dl className="mt-6 space-y-5">

          {/* UPI ID */}
          <div>
            <dt className="text-sm text-muted">
              UPI ID
            </dt>

            <dd className="mt-1 flex flex-col items-center gap-3">
              <span className="select-all break-all text-lg font-bold">
                {UPI_ID}
              </span>

              <button
                type="button"
                onClick={onCopy}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/30 px-5 text-sm font-semibold text-navy transition-colors hover:bg-navy-soft"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect
                    x="9"
                    y="9"
                    width="11"
                    height="11"
                    rx="2"
                  />
                  <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                </svg>

                Copy UPI ID
              </button>
            </dd>
          </div>

          {/* Recipient */}
          <div>
            <dt className="text-sm text-muted">
              Recipient
            </dt>

            <dd className="mt-0.5 text-lg font-bold tracking-wide">
              {UPI_NAME}
            </dd>
          </div>

        </dl>

        {/* Verification Notice */}
        <p className="mt-6 rounded-xl border border-gold/40 bg-[#FBF7EF] px-4 py-3 text-sm text-ink">
          Please verify the recipient name before making the payment.
        </p>

        {/* Payment Disclaimer */}
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Payments are made directly to the family's UPI account.
          This website does not receive or hold donations.
        </p>
      </div>
    </div>
  );
}