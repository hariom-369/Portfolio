import { useEffect, useRef } from 'react';
import { achievements, dsaPlatforms, education, leadership } from '../data';

// ── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const numericPart = parseFloat(target.replace(/[^0-9.]/g, ''));
  const prefix = target.replace(/[0-9.]+.*/, '');
  const suffix2 = target.replace(/^[^0-9]*[0-9.]+/, '');

  return (
    <span className="counter-wrap">
      {prefix}<span className="counter-num">{numericPart}</span>{suffix2}{suffix}
    </span>
  );
}

export default function AchievementsEducationLeadership() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -80px 0px' }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="section ael-section">
      <div className="container">

        {/* ── Top Block: Achievements & DSA ── */}
        <div className="ael-top reveal">
          <div className="section-label">Achievements</div>
          <h2 className="section-heading">
            Milestones that <span className="gradient-text">define the work</span>
          </h2>

          <div className="ach-grid">
            {/* Left: Standard Achievements */}
            <div className="ach-cards">
              {achievements.map((a, i) => (
                <div
                  key={a.label}
                  className="ach-card"
                  style={{ '--ach-color': a.accentColor, animationDelay: `${i * 0.1}s` } as React.CSSProperties}
                >
                  <div className="ach-icon" aria-hidden="true" style={{ background: `${a.accentColor}15`, color: a.accentColor }}>
                    {a.icon}
                  </div>
                  <div className="ach-content">
                    <div className="ach-metric">
                      <AnimatedCounter target={a.metric} />
                    </div>
                    <div className="ach-label">{a.label}</div>
                    <div className="ach-desc">{a.description}</div>
                  </div>
                  <div className="ach-glow" aria-hidden="true" />
                </div>
              ))}
            </div>

            {/* Right: DSA Dashboard */}
            <div className="dsa-dash">
              <div className="dsa-header">
                <div>
                  <h3 className="dsa-title">500+ Problems Solved</h3>
                  <p className="dsa-subtitle">
                    Consistent problem-solving across competitive platforms.
                  </p>
                </div>
                <div className="dsa-badge" aria-hidden="true">DSA</div>
              </div>

              <div className="dsa-stats">
                {dsaPlatforms.map((p, i) => (
                  <div key={p.name} className="dsa-stat" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="dsa-stat-info">
                      <span className="dsa-stat-name">{p.name}</span>
                    </div>
                    <div className="dsa-bar-track" aria-hidden="true">
                      <div className="dsa-bar-fill" style={{ background: p.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="dsa-footer">
                Focus: Graphs, DP, Trees, Strings, Arrays
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Block: Education & Leadership ── */}
        <div className="ael-bottom">
          {/* Education */}
          <div className="ael-col reveal-left">
            <div className="section-label">Education</div>
            <h3 className="col-heading">Academic Background</h3>

            <div className="timeline">
              {education.map((edu, i) => (
                <div key={i} className="timeline-item">
                  <div className="tl-dot" aria-hidden="true" />
                  <div className="tl-content">
                    <div className="tl-meta">
                      <span className="tl-date">{edu.period}</span>
                      <span className="tag tag-emerald">{edu.status}</span>
                    </div>
                    <div className="tl-title">{edu.institution}</div>
                    <div className="tl-desc">{edu.degree}</div>
                    <div className="tl-highlight">
                      <span aria-hidden="true">🎯</span> {edu.highlight}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="timeline-item tl-secondary">
                <div className="tl-dot tl-dot-sm" aria-hidden="true" />
                <div className="tl-content">
                  <div className="tl-meta"><span className="tl-date">Before 2023</span></div>
                  <div className="tl-title">Senior Secondary &amp; Beyond</div>
                  <div className="tl-desc">Strong STEM foundation leading to IIIT Kota admission.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div className="ael-col reveal-right">
            <div className="section-label">Leadership</div>
            <h3 className="col-heading">Roles &amp; Responsibility</h3>

            <div className="leadership-list">
              {leadership.map((role, i) => (
                <div key={i} className="lead-card">
                  <div className="lead-icon" aria-hidden="true">{role.icon}</div>
                  <div className="lead-content">
                    <div className="lead-meta">{role.period}</div>
                    <div className="lead-title">{role.role}</div>
                    <div className="lead-org">{role.org}</div>
                    <p className="lead-desc">{role.description}</p>
                    <div className="lead-tags">
                      {role.tags.map(t => <span key={t} className="tag tag-muted">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ael-section {
          position: relative;
        }

        .ael-top {
          margin-bottom: var(--s24);
        }

        /* ── Achievements Grid ── */
        .ach-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--s8);
          margin-top: var(--s12);
        }

        .ach-cards {
          display: flex;
          flex-direction: column;
          gap: var(--s6);
        }

        .ach-card {
          position: relative;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--r-xl);
          padding: var(--s8);
          display: flex;
          align-items: flex-start;
          gap: var(--s6);
          overflow: hidden;
          transition: all var(--t-base);
        }

        .ach-card:hover {
          border-color: var(--color-border-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .ach-glow {
          position: absolute;
          top: 0; right: 0;
          width: 150px; height: 150px;
          background: radial-gradient(circle at top right, var(--ach-color), transparent 70%);
          opacity: 0.1;
          pointer-events: none;
          transition: opacity var(--t-base);
        }

        .ach-card:hover .ach-glow {
          opacity: 0.2;
        }

        .ach-icon {
          width: 54px; height: 54px;
          border-radius: var(--r-lg);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .ach-content {
          display: flex; flex-direction: column; gap: var(--s1);
          z-index: 1;
        }

        .ach-metric {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          color: var(--color-text-primary);
          margin-bottom: var(--s2);
        }

        .ach-label {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .ach-desc {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* ── DSA Dashboard ── */
        .dsa-dash {
          background: rgba(255,255,255,0.015);
          border: 1px solid var(--color-border);
          border-radius: var(--r-2xl);
          padding: var(--s8);
          display: flex;
          flex-direction: column;
          gap: var(--s8);
          position: relative;
        }

        .dsa-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--s4);
        }

        .dsa-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: var(--s2);
        }

        .dsa-subtitle {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        .dsa-badge {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 900;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          letter-spacing: -0.05em;
          user-select: none;
        }

        .dsa-stats {
          display: flex;
          flex-direction: column;
          gap: var(--s4);
        }

        .dsa-stat {
          display: flex;
          flex-direction: column;
          gap: var(--s2);
        }

        .dsa-stat-name {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--color-text-primary);
        }

        .dsa-bar-track {
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: var(--r-full);
          overflow: hidden;
        }

        .dsa-bar-fill {
          height: 100%;
          border-radius: var(--r-full);
          opacity: 0.85;
          animation: drawBar 1.5s cubic-bezier(0.4,0,0.2,1) both;
        }

        .dsa-footer {
          padding-top: var(--s4);
          border-top: 1px dashed var(--color-border);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        /* ── Bottom Block (Timeline & Leadership) ── */
        .ael-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--s16);
          align-items: start;
        }

        .ael-col {
          display: flex;
          flex-direction: column;
          gap: var(--s6);
        }

        .col-heading {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        /* Timeline */
        .timeline {
          position: relative;
          padding-left: var(--s6);
          display: flex;
          flex-direction: column;
          gap: var(--s8);
        }

        .timeline::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--color-border-strong), transparent);
        }

        .timeline-item {
          position: relative;
        }

        .tl-dot {
          position: absolute;
          left: calc(-1 * var(--s6) - 5px);
          top: 6px;
          width: 12px; height: 12px;
          background: var(--color-accent);
          border-radius: 50%;
          box-shadow: 0 0 0 4px var(--color-bg-primary);
        }
        
        .tl-secondary .tl-dot {
          width: 8px; height: 8px;
          left: calc(-1 * var(--s6) - 3px);
          background: var(--color-text-muted);
        }

        .tl-content {
          display: flex; flex-direction: column; gap: var(--s2);
        }

        .tl-meta {
          display: flex; align-items: center; gap: var(--s3);
        }

        .tl-date {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--color-accent-light);
          text-transform: uppercase;
        }

        .tl-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .tl-desc {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }
        
        .tl-secondary .tl-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .tl-highlight {
          display: inline-flex; align-items: center; gap: var(--s2);
          padding: var(--s2) var(--s4);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border);
          border-radius: var(--r-md);
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          width: fit-content;
          margin-top: var(--s2);
        }

        /* Leadership Cards */
        .leadership-list {
          display: flex;
          flex-direction: column;
          gap: var(--s4);
        }

        .lead-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--r-xl);
          padding: var(--s6);
          display: flex;
          align-items: flex-start;
          gap: var(--s5);
          transition: all var(--t-base);
        }

        .lead-card:hover {
          border-color: var(--color-border-hover);
          transform: translateX(4px);
          box-shadow: var(--shadow-sm);
        }

        .lead-icon {
          font-size: 1.75rem;
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.03);
          border-radius: var(--r-lg);
          flex-shrink: 0;
        }

        .lead-content {
          display: flex; flex-direction: column; gap: var(--s1);
        }

        .lead-meta {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--color-accent-light);
          text-transform: uppercase;
        }

        .lead-title {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .lead-org {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .lead-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          margin-top: var(--s2);
        }

        .lead-tags {
          display: flex; flex-wrap: wrap; gap: var(--s2);
          margin-top: var(--s3);
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .ach-grid { grid-template-columns: 1fr; }
          .ael-bottom { grid-template-columns: 1fr; gap: var(--s12); }
        }

        @media (max-width: 480px) {
          .ach-card { flex-direction: column; padding: var(--s6); gap: var(--s4); }
          .dsa-dash { padding: var(--s6); }
          .lead-card { flex-direction: column; padding: var(--s5); gap: var(--s4); }
        }
      `}</style>
    </section>
  );
}
