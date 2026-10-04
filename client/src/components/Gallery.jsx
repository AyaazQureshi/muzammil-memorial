import { useState } from 'react';
import Reveal from './Reveal.jsx';
import Lightbox from './Lightbox.jsx';
import { GALLERY } from '../utils/photos.js';

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="memories" aria-labelledby="memories-title" className="bg-paper-deep py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <h2 id="memories-title" className="section-title">Remembering Muzammil</h2>
          <p className="mt-4 text-muted">Photographs shared by his friends and family. Select a photograph to view it larger.</p>
        </Reveal>

        <Reveal className="mt-10 columns-1 gap-5 min-[480px]:columns-2 lg:columns-3">
          {GALLERY.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photograph: ${p.alt}`}
              className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white p-1.5 text-left shadow-[0_16px_40px_-30px_rgba(30,45,69,0.5)] ring-1 ring-sand/80"
            >
              <span className="block overflow-hidden rounded-[0.85rem]">
                <img
                  src={p.src}
                  alt=""
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
              </span>
            </button>
          ))}
        </Reveal>
      </div>

      {active !== null && (
        <Lightbox photos={GALLERY} index={active} onChange={setActive} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
