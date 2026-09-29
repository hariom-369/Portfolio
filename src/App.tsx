import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import AchievementsEducationLeadership from './components/AchievementsEducationLeadership';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 99999,
          padding: '1rem',
          background: 'var(--color-accent)',
          color: 'white',
          fontWeight: 700,
        }}
        onFocus={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onBlur={(e) => e.currentTarget.style.transform = 'translateY(-100%)'}
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <AchievementsEducationLeadership />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
