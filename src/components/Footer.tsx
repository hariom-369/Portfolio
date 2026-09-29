import { personal } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-layout">
          
          {/* Left: Brand */}
          <div className="footer-brand">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="footer-logo">
              <span className="logo-mark" aria-hidden="true">HC</span>
              <span className="logo-text">{personal.name}</span>
            </a>
            <p className="footer-tagline">
              Engineering software that matters. Full-Stack Developer &amp; AI/ML Enthusiast.
            </p>
          </div>

          {/* Center: Legal/Tech */}
          <div className="footer-center">
            <div className="footer-copy">
              &copy; {year} {personal.name}. All rights reserved.
            </div>
            <div className="footer-tech">
              Designed &amp; built with <span className="tech-hl">React</span> and <span className="tech-hl">TypeScript</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="footer-actions">
            <button
              onClick={scrollToTop}
              className="back-to-top"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
            </button>
          </div>

        </div>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--color-border);
          background: var(--color-bg-secondary);
          padding: var(--s10) 0;
          margin-top: auto;
        }

        .footer-layout {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: var(--s8);
          align-items: center;
        }

        /* ── Brand ── */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: var(--s3);
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: var(--s3);
          width: fit-content;
        }

        .logo-mark {
          width: 32px; height: 32px;
          background: var(--color-accent);
          color: #fff;
          border-radius: var(--r-md);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.8rem;
          transition: transform var(--t-spring);
        }
        
        .footer-logo:hover .logo-mark {
          transform: rotate(-10deg) scale(1.05);
        }

        .logo-text {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
        }

        .footer-tagline {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          max-width: 300px;
          line-height: 1.5;
        }

        /* ── Center ── */
        .footer-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--s1);
        }

        .footer-copy {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .footer-tech {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-text-muted);
        }

        .tech-hl {
          color: var(--color-text-secondary);
        }

        /* ── Actions ── */
        .footer-actions {
          display: flex;
          justify-content: flex-end;
        }

        .back-to-top {
          width: 44px; height: 44px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--r-full);
          color: var(--color-text-secondary);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all var(--t-base);
        }

        .back-to-top:hover {
          background: var(--color-bg-glass-hover);
          border-color: var(--color-border-hover);
          color: var(--color-text-primary);
          transform: translateY(-4px);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .footer-layout {
            grid-template-columns: 1fr;
            text-align: center;
            gap: var(--s8);
          }
          
          .footer-brand, .footer-actions {
            align-items: center;
          }
          
          .footer-logo { margin: 0 auto; }
          .footer-actions { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
