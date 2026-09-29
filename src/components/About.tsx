import { useEffect, useRef } from 'react';
import { engineeringFocus } from '../data';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section about-section" aria-label="About Me">
      <div className="container">
        {/* Header */}
        <div className="about-header reveal">
          <div className="section-label">About Me</div>
          <h2 className="section-heading">
            Engineering software that <br />
            <span className="gradient-text">actually matters</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Left: Bio & Meta */}
          <div className="about-left reveal-left">
            <div className="about-visual" aria-hidden="true">
              <div className="tech-badge">
                <div className="tech-badge-inner">
                  <svg viewBox="0 0 100 100" className="tech-badge-svg">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" className="spin-slow" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.6" />
                    <path d="M50 25 L72 65 L28 65 Z" fill="none" stroke="currentColor" strokeWidth="2" className="pulse-opacity" />
                  </svg>
                </div>
                <div className="profile-glow" aria-hidden="true"></div>
              </div>
            </div>
            <div className="about-bio">
              <p>
                I'm a second-year B.Tech student at <strong>IIIT Kota</strong> studying Electronics and
                Communication Engineering, spending most of my time building
                things on the web and exploring how intelligent systems work.
              </p>
              <p>
                My engineering work spans two primary domains: <strong>full-stack product development</strong>{' '}
                and <strong>AI/ML systems</strong>. I've built a feature-rich personal finance
                platform with offline-first architecture, a complete e-commerce system on
                the MERN stack, and an NLP-powered career guidance platform that combines
                a Python ML backend with a React dashboard.
              </p>
              <p>
                I think seriously about architecture — clean API design, data models that
                scale, and systems that remain maintainable. Outside of building products,
                I regularly practice competitive programming across LeetCode, Codeforces,
                CodeChef, and GeeksforGeeks to keep my problem-solving skills sharp.
              </p>
              <p>
                Currently, I'm exploring generative AI, large language models, and how
                AI agent frameworks can be composed into practical applications.
              </p>
            </div>

            <div className="about-meta">
              <div className="meta-item">
                <span className="meta-label">Education</span>
                <span className="meta-value">IIIT Kota (B.Tech ECE)</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Year</span>
                <span className="meta-value">2023 — 2027</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Focus</span>
                <span className="meta-value">Full-Stack &amp; AI/ML</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Location</span>
                <span className="meta-value">Kota, Rajasthan, India</span>
              </div>
            </div>
          </div>

          {/* Right: Focus Areas */}
          <div className="about-right reveal-right">
            <div className="focus-header">
              <span className="section-label" style={{ marginBottom: 0 }}>Core Competencies</span>
            </div>
            
            <div className="focus-list">
              {engineeringFocus.map((item, i) => (
                <div
                  key={item.title}
                  className="focus-card reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="focus-icon"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div className="focus-content">
                    <h3 className="focus-title">{item.title}</h3>
                    <p className="focus-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          background: linear-gradient(to bottom, var(--color-bg-primary), var(--color-bg-secondary));
        }

        .about-header {
          margin-bottom: var(--s12);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: var(--s16);
          align-items: start;
        }

        /* ── Left Column (Bio & Meta) ── */
        .about-left {
          display: flex;
          flex-direction: column;
          gap: var(--s8);
        }

        .about-visual {
          margin-bottom: var(--s2);
        }

        .tech-badge {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tech-badge-inner {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 2;
          color: var(--color-text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
          border: 1px solid var(--color-border);
          border-radius: var(--r-2xl);
          padding: 1.25rem;
        }

        .tech-badge-svg {
          width: 100%;
          height: 100%;
        }

        .spin-slow {
          transform-origin: center;
          animation: spin-slow 20s linear infinite;
        }

        .pulse-opacity {
          animation: pulse-opacity 3s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .profile-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, var(--color-accent) 0%, transparent 60%);
          opacity: 0.15;
          z-index: 1;
          border-radius: 50%;
        }

        .about-bio {
          display: flex;
          flex-direction: column;
          gap: var(--s5);
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .about-bio strong {
          color: var(--color-text-primary);
          font-weight: 600;
        }

        .about-meta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--s4);
          padding: var(--s6);
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--color-border);
          border-radius: var(--r-xl);
          box-shadow: var(--shadow-sm);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .meta-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }

        .meta-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        /* ── Right Column (Focus) ── */
        .about-right {
          display: flex;
          flex-direction: column;
          gap: var(--s6);
          padding-top: var(--s2);
        }

        .focus-header {
          margin-bottom: var(--s2);
        }

        .focus-list {
          display: flex;
          flex-direction: column;
          gap: var(--s4);
        }

        .focus-card {
          display: flex;
          align-items: flex-start;
          gap: var(--s5);
          padding: var(--s6);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--r-lg);
          transition: all var(--t-base);
        }

        .focus-card:hover {
          border-color: var(--color-border-hover);
          background: var(--color-bg-card-hover);
          transform: translateX(6px);
          box-shadow: var(--shadow-md);
        }

        .focus-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--r-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          box-shadow: inset 0 0 10px rgba(255,255,255,0.05);
        }

        .focus-content {
          flex: 1;
        }

        .focus-title {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
          margin-bottom: 0.3rem;
          line-height: 1.3;
        }

        .focus-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--color-text-secondary);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: var(--s10);
          }
          
          .about-meta {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .about-meta {
            grid-template-columns: 1fr;
            gap: var(--s5);
          }
          
          .focus-card {
            padding: var(--s5);
            flex-direction: column;
            gap: var(--s4);
          }
          
          .tech-badge {
            width: 100px;
            height: 100px;
          }
        }

        @media (max-width: 360px) {
          .about-bio {
            font-size: 0.95rem;
          }
          .about-meta {
            padding: var(--s4);
          }
          .meta-value {
            font-size: 0.82rem;
          }
        }
      `}</style>
    </section>
  );
}
