import { formatINR } from '../utils/upi.js';

const isValidAmount = (n) => typeof n === 'number' && Number.isFinite(n) && n >= 0;

export function progressPercent(collected, target) {
  if (!isValidAmount(collected) || !isValidAmount(target) || target <= 0) return null;
  return Math.min(100, Math.max(0, (collected / target) * 100));
}

export default function CampaignProgress({ campaign, loading }) {
  const pct = campaign ? progressPercent(campaign.collectedAmount, campaign.targetAmount) : null;
  const updated = campaign?.lastUpdated
    ? new Date(campaign.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  if (loading) return <div className="h-24" aria-hidden="true" />;

  if (pct === null) {
    return <p className="text-muted">Fundraising details will be updated here.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-serif text-3xl text-ink">
          {formatINR(campaign.collectedAmount)}
          <span className="ml-2 font-sans text-base text-muted">collected of {formatINR(campaign.targetAmount)}</span>
        </p>
        <p className="text-sm font-semibold text-navy">{Math.floor(pct)}%</p>
      </div>
      <div
        className="mt-3 h-2.5 overflow-hidden rounded-full bg-sand/70"
        role="progressbar"
        aria-label="Fundraising progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.floor(pct)}
      >
        <div className="h-full rounded-full bg-navy transition-[width] duration-700" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-sm text-muted">
        {updated ? `Last updated ${updated}. ` : ''}
        This figure is updated by hand and may not include the most recent contributions.
      </p>
    </div>
  );
}
