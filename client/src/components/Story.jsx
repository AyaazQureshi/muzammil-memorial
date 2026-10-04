import Reveal from './Reveal.jsx';
import { PHOTOS } from '../utils/photos.js';

function Figure({ photo, caption, className = '' }) {
  return (
    <figure className={className}>
      <div className="rounded-[6px] bg-white p-2 shadow-[0_18px_44px_-30px_rgba(30,45,69,0.5)] ring-1 ring-sand/80">
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className="w-full rounded-[3px] object-cover"
        />
      </div>
      <figcaption className="mt-2.5 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="bg-paper-deep py-20 sm:py-24">
      <Reveal className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 id="story-title" className="section-title">His Journey, Remembered</h2>
          <div className="prose-memorial mt-8 space-y-6">
            <p>
              Muzammil was pursuing his MBBS and working toward a future dedicated to learning and helping others.
            </p>
            <p>His journey was unexpectedly cut short while he was away on a trip.</p>
            <p>
              For those who knew him, he will be remembered not only as a medical student, but as a son, a friend, and
              a person whose presence touched the lives around him.
            </p>
            <p>
              This fundraiser is created with one simple purpose: to stand beside his family and help them through the
              difficult days ahead.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <h3 className="font-serif text-xl text-navy">From childhood to his dreams</h3>
          <div className="mt-5 grid grid-cols-5 items-start gap-4 sm:gap-6">
            <Figure photo={PHOTOS.childhood} caption="As a child" className="col-span-2 mt-10" />
            <Figure photo={PHOTOS.coat} caption="In his white coat" className="col-span-3" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
