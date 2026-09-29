import { useEffect, useRef, useState } from 'react';
import { personal } from '../data';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setToast(true);
      setTimeout(() => {
        setCopied(false);
        setToast(false);
      }, 2500);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section contact-section" aria-label="Contact Information">
      {/* ── Background Elements ── */}
      <div className="contact-bg" aria-hidden="true">
        <div className="contact-glow" />
        <div className="contact-grid" />
      </div>

      <div className="container relative">
        <div className="contact-wrapper">
          {/* Header */}
          <div className="contact-header reveal">
            <div className="section-label">Contact</div>
            <h2 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Let's build something <br />
              <span className="gradient-text">meaningful</span>
            </h2>
            <p className="contact-subtitle">
              Whether you have an opportunity, a project idea, or just want to connect,
              my inbox is always open.
            </p>
          </div>

          {/* Cards & CTA */}
          <div className="contact-content reveal">
            
            <div className="contact-cards">
              {/* Email Card (Primary) */}
              <div className="contact-card primary-card">
                <div className="card-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div className="card-info">
                  <span className="card-label">Email Address</span>
                  <a href={`mailto:${personal.email}`} className="card-val" id="contact-email">
                    {personal.email}
                  </a>
                </div>
                <button
                  className="copy-btn"
                  onClick={handleCopy}
                  aria-label={copied ? "Copied!" : "Copy email address"}
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="contact-card">
                <div className="card-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div className="card-info">
                  <span className="card-label">Phone</span>
                  <a href={`tel:${personal.phone.replace(/[^+0-9]/g, '')}`} className="card-val">
                    {personal.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="contact-actions">
              <a href={`mailto:${personal.email}`} className="btn btn-primary btn-lg" id="btn-send-email">
                Send an Email
              </a>
              <a href={personal.resumeFile} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg" id="btn-download-resume">
                Download Resume ↗
              </a>
            </div>

            {/* Availability */}
            <div className="availability-badge">
              <span className="status-dot" aria-hidden="true" />
              Available for internships &amp; full-time opportunities
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast ${toast ? 'show' : ''}`} role="alert" aria-live="polite">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Email copied to clipboard!
      </div>

      <style>{`
        .contact-section {
          position: relative;
          overflow: hidden;
          padding: var(--s32) 0;
        }

        .relative { position: relative; z-index: 1; }

        /* ── Backgrounds ── */
        .contact-bg {
          position: absolute; inset: 0; pointer-events: none;
        }

        .contact-glow {
          position: absolute;
          top: -20%; left: 50%;
          transform: translateX(-50%);
          width: 80vw; height: 60vh;
          background: radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 60%);
        }

        .contact-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%);
        }

        /* ── Content ── */
        .contact-wrapper {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          max-width: 640px; margin: 0 auto;
        }

        .contact-header {
          margin-bottom: var(--s10);
          display: flex; flex-direction: column; align-items: center;
        }

        .contact-subtitle {
          font-size: 1.05rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-top: var(--s4);
          max-width: 480px;
        }

        .contact-content {
          width: 100%;
          display: flex; flex-direction: column; align-items: center; gap: var(--s8);
        }

        .contact-cards {
          width: 100%;
          display: flex; flex-direction: column; gap: var(--s4);
        }

        .contact-card {
          display: flex; align-items: center; gap: var(--s4);
          padding: var(--s4) var(--s5);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--r-xl);
          transition: all var(--t-base);
          text-align: left;
        }

        .contact-card:hover {
          border-color: var(--color-border-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .primary-card {
          background: var(--color-accent-dim);
          border-color: var(--color-border-accent);
        }
        
        .primary-card:hover {
          box-shadow: var(--shadow-accent);
        }

        .card-icon {
          width: 48px; height: 48px;
          border-radius: var(--r-lg);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          color: var(--color-text-secondary);
          flex-shrink: 0;
        }

        .primary-card .card-icon {
          background: var(--color-accent);
          color: #fff;
          border-color: transparent;
        }

        .card-info {
          flex: 1;
          display: flex; flex-direction: column; gap: 2px;
        }

        .card-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }

        .primary-card .card-label { color: var(--color-accent-light); }

        .card-val {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-text-primary);
          transition: color var(--t-fast);
        }

        .card-val:hover {
          color: var(--color-accent);
        }

        .copy-btn {
          background: transparent; border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          padding: var(--s2);
          border-radius: var(--r-md);
          transition: all var(--t-fast);
          display: flex; align-items: center; justify-content: center;
        }

        .copy-btn:hover {
          background: rgba(255,255,255,0.05);
          color: var(--color-text-primary);
        }

        .primary-card .copy-btn {
          color: var(--color-accent-light);
        }
        .primary-card .copy-btn:hover {
          color: #fff;
          background: rgba(99,102,241,0.2);
        }

        .contact-actions {
          display: flex; gap: var(--s4);
          width: 100%; justify-content: center;
        }

        .availability-badge {
          display: inline-flex; align-items: center; gap: var(--s2);
          padding: var(--s2) var(--s4);
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: var(--r-full);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-emerald);
        }

        @media (max-width: 480px) {
          .contact-actions {
            flex-direction: column;
          }
          .contact-card {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
}
