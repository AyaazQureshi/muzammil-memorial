import { useCallback, useEffect, useRef } from 'react';

export default function Lightbox({ photos, index, onClose, onChange }) {
  const closeRef = useRef(null);
  const touchStart = useRef(null);
  const total = photos.length;
  const photo = photos[index];

  const go = useCallback((delta) => onChange((index + delta + total) % total), [index, total, onChange]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        // keep keyboard focus inside the dialog
        const focusable = document.querySelectorAll('[data-lightbox] button');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  const iconBtn =
    'inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-white';

  return (
    <div
      data-lightbox
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${total}`}
      className="animate-fade fixed inset-0 z-[60] flex flex-col bg-[#14181f]/95"
      onClick={onClose}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white/80" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm">{index + 1} / {total}</p>
        <button ref={closeRef} type="button" onClick={onClose} className={iconBtn} aria-label="Close photograph">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          onClick={(e) => e.stopPropagation()}
          className="animate-fade max-h-full max-w-full rounded-md object-contain shadow-2xl"
        />
        {total > 1 && (
          <>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} className={`${iconBtn} absolute left-2 top-1/2 -translate-y-1/2 sm:left-4`} aria-label="Previous photograph">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} className={`${iconBtn} absolute right-2 top-1/2 -translate-y-1/2 sm:right-4`} aria-label="Next photograph">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
