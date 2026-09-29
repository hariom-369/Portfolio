import { useState, useEffect } from 'react';
import { navLinks, personal } from '../data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner container">
          {/* Logo */}
          <a
            href="#hero"
            className="nav-logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            aria-label="Go to top"
          >
            <span className="nav-logo-mark">HC</span>
            <span className="nav-logo-text">{personal.name}</span>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links" role="menubar">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    className={`nav-link${isActive ? ' active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="nav-cta">
            <a
              href={personal.resumeFile}
              className="btn btn-sm btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-resume-btn"
            >
              Resume ↗
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            id="hamburger-btn"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <ul className="mobile-nav-links">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 0.06}s` }}>
              <a
                href={link.href}
                className={`mobile-nav-link${activeSection === link.href.replace('#', '') ? ' active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={personal.resumeFile}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume ↗
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: var(--nav-height);
          transition: all var(--transition-base);
          border-bottom: 1px solid transparent;
        }

        .navbar.scrolled {
          background: rgba(8, 8, 16, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: var(--color-border);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          gap: var(--space-8);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-logo-mark {
          width: 36px;
          height: 36px;
          background: var(--color-accent);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.85rem;
          color: white;
          letter-spacing: -0.02em;
          flex-shrink: 0;
          transition: all var(--transition-base);
        }

        .nav-logo:hover .nav-logo-mark {
          transform: rotate(-5deg) scale(1.05);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
        }

        .nav-logo-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          list-style: none;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          padding: 0.4rem 0.85rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          position: relative;
          text-decoration: none;
        }

        .nav-link:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-glass);
        }

        .nav-link.active {
          color: var(--color-text-primary);
          background: var(--color-accent-dim);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 2px;
          background: var(--color-accent);
          border-radius: 2px;
        }

        .nav-cta {
          flex-shrink: 0;
        }

        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .nav-hamburger:hover {
          border-color: var(--color-border-hover);
          background: var(--color-bg-glass-hover);
        }

        .nav-hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--color-text-primary);
          border-radius: 2px;
          transition: all var(--transition-base);
          transform-origin: center;
        }

        .nav-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .nav-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .nav-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: var(--nav-height);
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(8, 8, 16, 0.98);
          backdrop-filter: blur(20px);
          z-index: 999;
          padding: var(--space-8) var(--space-6);
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: all var(--transition-base);
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .mobile-nav-link {
          display: block;
          padding: var(--space-4) var(--space-6);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
          text-decoration: none;
          border: 1px solid transparent;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--color-text-primary);
          background: var(--color-accent-dim);
          border-color: var(--color-border-accent);
        }

        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta {
            display: none;
          }

          .nav-hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
