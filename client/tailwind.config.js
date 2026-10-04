/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F3EE',
        'paper-deep': '#EDE8DF',
        ink: '#22252B',
        muted: '#585D66',
        navy: { DEFAULT: '#2B3F5C', dark: '#1E2D45', soft: '#E4E9F0' },
        sand: '#D8D0C2',
        gold: '#9A7B4A',
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Newsreader Variable"', 'Georgia', 'serif'],
      },
      keyframes: {
        rise: { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'none' } },
        fade: { from: { opacity: 0 }, to: { opacity: 1 } },
        toast: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        rise: 'rise 700ms cubic-bezier(.2,.7,.2,1) both',
        fade: 'fade 250ms ease-out both',
        toast: 'toast 250ms ease-out both',
      },
    },
  },
  plugins: [],
};
