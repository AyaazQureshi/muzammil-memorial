import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Story from '../components/Story.jsx';
import Support from '../components/Support.jsx';
import Gallery from '../components/Gallery.jsx';
import Contact from '../components/Contact.jsx';
import Share from '../components/Share.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  return (
    <>
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Support />
        <Gallery />
        <Contact />
        <Share />
      </main>
      <Footer />
    </>
  );
}
