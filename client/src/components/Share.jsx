import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { useToast } from './Toast.jsx';
import { copyText } from '../utils/clipboard.js';
import { SHARE_MESSAGE } from '../utils/constants.js';

export default function Share() {
  const toast = useToast();
  const [canShare] = useState(() => typeof navigator !== 'undefined' && typeof navigator.share === 'function');

  const pageUrl = () => `${window.location.origin}/`;

  const shareWhatsApp = () => {
    const text = `${SHARE_MESSAGE}\n\n${pageUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    const ok = await copyText(pageUrl());
    toast(ok ? 'Link copied' : 'Could not copy the link.');
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: 'Remembering Muzammil', text: SHARE_MESSAGE, url: pageUrl() });
    } catch {
      /* the person closed the share sheet; nothing to do */
    }
  };

  const btn =
    'inline-flex min-h-12 items-center justify-center rounded-full border border-navy/30 px-6 text-base font-semibold text-navy transition-colors hover:bg-navy-soft';

  return (
    <section id="share" aria-labelledby="share-title" className="bg-paper-deep py-16 sm:py-20">
      <Reveal className="container-page">
        <h2 id="share-title" className="section-title">Share this fundraiser</h2>
        <p className="mt-4 max-w-xl text-muted">
          If you know someone who would want to remember Muzammil or stand with his family, you can share this page.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={shareWhatsApp} className="btn-primary">Share on WhatsApp</button>
          <button type="button" onClick={copyLink} className={btn}>Copy link</button>
          {canShare && (
            <button type="button" onClick={nativeShare} className={btn}>Share&hellip;</button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
