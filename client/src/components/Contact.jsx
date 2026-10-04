import Reveal from './Reveal.jsx';
import { CONTACTS } from '../utils/constants.js';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-24">
      <Reveal className="container-page">
        <div className="max-w-2xl">
          <h2 id="contact-title" className="section-title">Need More Information?</h2>
          <p className="mt-4 text-muted">
            If you would like to verify the fundraiser or need any information before contributing, please contact the
            family.
          </p>
        </div>

        <ul className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <li key={c.tel}>
              <a
                href={`tel:${c.tel}`}
                className="flex min-h-[4.5rem] items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-sand/80 transition-colors hover:ring-navy/50"
                aria-label={`Call ${c.relation} at ${c.display}`}
              >
                <span>
                  <span className="block text-sm text-muted">{c.relation}</span>
                  <span className="block text-lg font-bold">{c.display}</span>
                </span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B3F5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
