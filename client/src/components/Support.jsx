import Reveal from './Reveal.jsx';
import DonationBox from './DonationBox.jsx';
import CampaignProgress from './CampaignProgress.jsx';
import useCampaign from '../hooks/useCampaign.js';

const STATUS_NOTICE = {
  paused: 'The family\u2019s fundraiser is currently paused. Please check back later or contact the family.',
  completed: 'This fundraiser has been marked as completed. Thank you to everyone who stood with the family.',
};

export default function Support() {
  const { loading, data } = useCampaign();
  const status = data?.status || 'active';
  const updates = data?.updates || [];

  return (
    <section id="support" aria-labelledby="support-title" className="py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <h2 id="support-title" className="section-title">Stand With His Family</h2>
          <p className="mt-5 font-serif text-[1.2rem] leading-[1.8] text-ink/90">
            In times of loss, even a small act of kindness can mean a great deal to a family. If you are able to
            contribute, your support will go directly to Muzammil&rsquo;s family.
          </p>
        </Reveal>

        <Reveal className="mt-12 max-w-2xl border-l-2 border-gold/60 pl-6">
          <h3 className="font-serif text-2xl">Why the Family Needs Support</h3>
          <p className="mt-3 text-muted">
            Muzammil&rsquo;s father has been working hard through his small business to support his family and
            provide for their needs. After the sudden and devastating loss of his son, the family has been left
            facing an unimaginable emotional and financial burden. Due to the sudden and overwhelming grief, his
            father is currently not in a mental state to continue running his business as he did before. During
            this extremely difficult period, the family needs support to help them cope with their immediate
            financial responsibilities while they navigate this painful loss.
          </p>
        </Reveal>

        <Reveal className="mt-10 max-w-2xl">
          <CampaignProgress campaign={data} loading={loading} />
        </Reveal>

        <Reveal className="mt-10">
          {status === 'active' ? (
            <DonationBox />
          ) : (
            <p className="rounded-2xl bg-white p-6 ring-1 ring-sand/80">{STATUS_NOTICE[status]}</p>
          )}
        </Reveal>

        {updates.length > 0 && (
          <Reveal className="mt-12 max-w-2xl">
            <h3 className="font-serif text-2xl">Updates</h3>
            <ul className="mt-4 divide-y divide-sand/80 border-y border-sand/80">
              {updates.map((u, i) => (
                <li key={`${u.date}-${i}`} className="py-4">
                  <p className="text-sm text-muted">
                    {new Date(u.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="mt-1 whitespace-pre-line">{u.message}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal className="mt-16 max-w-2xl border-l-2 border-gold/60 pl-6">
          <h3 className="font-serif text-2xl">How Your Support Helps</h3>
          <p className="mt-3 text-muted">
            Your contribution is intended to support Muzammil&rsquo;s family as they navigate the financial and
            emotional challenges following his sudden passing.
          </p>
          <p className="mt-3 font-semibold text-ink">All contributions are made directly to the family&rsquo;s UPI account.</p>
        </Reveal>
      </div>
    </section>
  );
}
