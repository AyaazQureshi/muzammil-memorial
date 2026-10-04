import { PHOTOS } from '../utils/photos.js';

export default function Hero() {
  const p = PHOTOS.lab;
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-16 pt-24 sm:pt-28 lg:pb-24 lg:pt-32">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="animate-rise text-[2.9rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem]"
          >
            Remembering Muzammil
          </h1>
          <p className="mt-5 animate-rise font-serif text-2xl leading-snug text-navy [animation-delay:120ms] sm:text-[1.7rem]">
            Honouring his memory. Standing beside his family.
          </p>

          <div className="mt-8 max-w-[58ch] animate-rise space-y-4 text-[1.0625rem] text-muted [animation-delay:220ms]">
            <p>
              Muzammil was a young MBBS student with a future ahead of him. His sudden passing has left his family,
              friends and everyone who knew him heartbroken.
            </p>
            <p>Today, we come together to support his family through this difficult time.</p>
          </div>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:320ms] sm:flex-row">
            <a href="#support" className="btn-primary">Support His Family</a>
            <a href="#memories" className="btn-secondary">View His Memories</a>
          </div>
        </div>

        <figure className="order-first mx-auto w-full max-w-[19rem] animate-fade sm:max-w-sm lg:order-last lg:col-span-5 lg:max-w-none lg:justify-self-end lg:pl-6">
          <div className="rounded-[6px] bg-white p-2.5 shadow-[0_24px_60px_-34px_rgba(30,45,69,0.55)] ring-1 ring-sand/80 sm:p-3">
            <img
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              fetchPriority="high"
              decoding="async"
              className="aspect-[3/4] w-full rounded-[3px] object-cover object-[50%_18%]"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
