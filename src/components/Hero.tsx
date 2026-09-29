import { useEffect, useState } from 'react';
import { personal } from '../data';

/* ── Animated system visualization ────────────────────────── */
const nodes = [
  { id: 'browser', label: 'React Client',  sub: 'UI / State', color: '#22d3ee', x: 50, y: 12 },
  { id: 'api',     label: 'REST API',      sub: 'HTTP / JSON', color: '#818cf8', x: 50, y: 34 },
  { id: 'server',  label: 'Node.js + Express', sub: 'Business Logic', color: '#6366f1', x: 50, y: 56 },
  { id: 'db',      label: 'MongoDB',       sub: 'Persistence', color: '#10b981', x: 22, y: 80 },
  { id: 'ai',      label: 'AI / ML',       sub: 'Intelligence', color: '#f59e0b', x: 78, y: 80 },
];

const edges = [
  { from: 'browser', to: 'api' },
  { from: 'api', to: 'server' },
  { from: 'server', to: 'db' },
  { from: 'server', to: 'ai' },
];

function SystemDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [auto, setAuto] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAuto(a => (a + 1) % nodes.length), 1800);
    return () => clearInterval(id);
  }, []);

  const active = hovered ?? nodes[auto].id;
  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className="sysdiag" aria-label="System architecture diagram" role="img">
      <div className="sysdiag-badge">
        <span className="sysdiag-dot" aria-hidden="true" />
        System Architecture
      </div>
      <svg viewBox="0 0 200 200" className="sysdiag-svg" aria-hidden="true">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map(({ from, to }) => {
          const f = getNode(from), t = getNode(to);
          const isActive = active === from || active === to;
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke={isActive ? 'rgba(99,102,241,0.7)' : 'rgba(255,255,255,0.06)'}
                strokeWidth={isActive ? '1.2' : '0.6'}
                strokeDasharray={isActive ? '5,3' : undefined}
                style={{ transition: 'all 0.4s ease' }}
              >
                {isActive && (
                  <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.8s" repeatCount="indefinite" />
                )}
              </line>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const isActive = active === node.id;
          return (
            <g
              key={node.id}
              transform={`translate(${node.x},${node.y})`}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              {isActive && (
                <circle
                  r="16"
                  fill={node.color}
                  opacity="0.1"
                  filter="url(#glow)"
                >
                  <animate attributeName="r" values="14;18;14" dur="1.6s" repeatCount="indefinite"/>
                </circle>
              )}
              <circle
                r="7"
                fill={isActive ? node.color : 'rgba(255,255,255,0.05)'}
                stroke={isActive ? node.color : 'rgba(255,255,255,0.1)'}
                strokeWidth="1"
                filter={isActive ? 'url(#glow)' : undefined}
                style={{ transition: 'all 0.4s ease' }}
              />
              <text x="11" y="-2" fontSize="5.5" fill={isActive ? node.color : 'rgba(255,255,255,0.45)'}
                fontFamily="Outfit,Inter,sans-serif" fontWeight={isActive ? '700' : '400'}
                style={{ transition: 'all 0.3s ease' }}
              >
                {node.label}
              </text>
              <text x="11" y="4.5" fontSize="3.8" fill="rgba(255,255,255,0.22)"
                fontFamily="JetBrains Mono,monospace"
              >
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Typed effect ──────────────────────────────────────────── */
function TypedRole({ roles }: { roles: string[] }) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[idx];
    const delay = deleting ? 38 : 85;
    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setText(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 2200);
        }
      } else {
        if (charIdx > 0) {
          setText(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setIdx(i => (i + 1) % roles.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, roles]);

  return (
    <span className="typed-wrap">
      <span className="typed-prefix">/ </span>
      <span className="typed-text">{text}</span>
      <span className="typed-cursor" aria-hidden="true">|</span>
    </span>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-bg" />
        <div className="hero-radial-1" />
        <div className="hero-radial-2" />
        <div className="hero-radial-3" />
      </div>

      <div className="container hero-body">
        {/* ── Left column ── */}
        <div className="hero-left">
          {/* Status */}
          <div className="hero-status-pill" aria-label="Availability status">
            <span className="status-dot" aria-hidden="true" />
            Open to internship &amp; full-time opportunities
          </div>

          {/* Name */}
          <h1 className="hero-name">
            <span className="hero-name-first">Hariom</span>
            <span className="hero-name-last gradient-text">Choudhary</span>
          </h1>

          {/* Typed role */}
          <div className="hero-role" aria-label="Current role">
            <TypedRole roles={['Full-Stack Developer', 'AI/ML Enthusiast', 'MERN Stack Engineer', 'System Builder']} />
          </div>

          {/* Bio */}
          <p className="hero-bio">
            I build scalable web applications and intelligent systems — combining
            full-stack engineering with AI/ML. B.Tech student at{' '}
            <span className="hero-bio-hl">IIIT Kota</span>, exploring the intersection
            of modern web development and machine learning.
          </p>

          {/* Focus chips */}
          <div className="hero-chips" aria-label="Areas of focus">
            {['Full-Stack', 'AI / ML', 'Generative AI', 'System Design', 'DSA'].map(c => (
              <span key={c} className="hero-chip">{c}</span>
            ))}
          </div>

          {/* CTA row */}
          <div className="hero-ctas" role="group" aria-label="Call to action buttons">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => scrollTo('projects')}
              id="hero-projects-btn"
            >
              View Projects
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => scrollTo('contact')}
              id="hero-contact-btn"
            >
              Contact Me
            </button>
            <a
              href={personal.resumeFile}
              className="btn btn-ghost btn-lg"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-resume-btn"
            >
              Resume ↗
            </a>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="hero-right" aria-hidden="true">
          <SystemDiagram />

          {/* Stats row */}
          <div className="hero-stats" role="list" aria-label="Key statistics">
            <div className="hero-stat" role="listitem">
              <div className="hero-stat-val">500+</div>
              <div className="hero-stat-key">DSA Problems</div>
            </div>
            <div className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat" role="listitem">
              <div className="hero-stat-val">3</div>
              <div className="hero-stat-key">Major Projects</div>
            </div>
            <div className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat" role="listitem">
              <div className="hero-stat-val">95.42</div>
              <div className="hero-stat-key">JEE Percentile</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>

      <style>{`
        /* ── Hero shell ─────────────────────────────────── */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: var(--nav-height);
        }

        /* ── Background layers ──────────────────────────── */
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%);
        }

        .hero-radial-1 {
          position: absolute;
          top: -15%;
          left: -15%;
          width: 65%;
          height: 65%;
          background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%);
          animation: float 9s ease-in-out infinite;
        }

        .hero-radial-2 {
          position: absolute;
          bottom: -20%;
          right: -10%;
          width: 55%;
          height: 55%;
          background: radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%);
          animation: float 12s ease-in-out infinite reverse;
        }

        .hero-radial-3 {
          position: absolute;
          top: 40%;
          left: 30%;
          width: 40%;
          height: 40%;
          background: radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%);
          animation: float 7s ease-in-out infinite 3s;
        }

        /* ── Body grid ──────────────────────────────────── */
        .hero-body {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 5rem;
          align-items: center;
          padding-top: 5rem;
          padding-bottom: 5rem;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 1440px) {
          .hero-body {
            grid-template-columns: 1fr 480px;
            gap: 6rem;
          }
        }

        /* ── Left ───────────────────────────────────────── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          animation: fadeInLeft 0.9s cubic-bezier(0.4,0,0.2,1) both;
        }

        /* Status pill */
        .hero-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(16,185,129,0.07);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-emerald);
          width: fit-content;
          max-width: 100%;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Name */
        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 8vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -0.045em;
          line-height: 0.95;
          display: flex;
          flex-direction: column;
          gap: 0.08em;
        }

        .hero-name-first {
          color: var(--color-text-primary);
        }

        /* Role */
        .hero-role {
          font-family: var(--font-mono);
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          color: var(--color-text-secondary);
          min-height: 1.8em;
        }

        .typed-prefix { color: var(--color-accent); margin-right: 2px; }
        .typed-text   { color: var(--color-text-primary); }
        .typed-cursor {
          display: inline-block;
          color: var(--color-accent);
          animation: blink 1s step-end infinite;
          margin-left: 1px;
          font-weight: 300;
        }

        /* Bio */
        .hero-bio {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
          max-width: 500px;
        }

        .hero-bio-hl {
          color: var(--color-text-primary);
          font-weight: 600;
        }

        /* Chips */
        .hero-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .hero-chip {
          padding: 0.3rem 0.85rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          letter-spacing: 0.02em;
          transition: all var(--t-fast);
        }

        .hero-chip:hover {
          border-color: rgba(99,102,241,0.35);
          color: var(--color-text-primary);
          background: rgba(99,102,241,0.08);
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          align-items: center;
        }

        /* ── Right ──────────────────────────────────────── */
        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          animation: fadeInRight 0.9s 0.15s cubic-bezier(0.4,0,0.2,1) both;
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* System diagram */
        .sysdiag {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--r-xl);
          padding: 1.5rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04) inset;
        }

        .sysdiag-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-accent-light);
          margin-bottom: 1rem;
        }

        .sysdiag-dot {
          width: 6px; height: 6px;
          background: var(--color-emerald);
          border-radius: 50%;
          animation: pulse-dot 1.5s ease-in-out infinite;
        }

        .sysdiag-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Stats */
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.1rem 1.5rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--r-lg);
          box-shadow: 0 2px 16px rgba(0,0,0,0.3);
        }

        .hero-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }

        .hero-stat-val {
          font-family: var(--font-display);
          font-size: 1.55rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--color-text-primary);
          line-height: 1;
        }

        .hero-stat-key {
          font-size: 0.68rem;
          color: var(--color-text-muted);
          font-weight: 500;
          text-align: center;
          letter-spacing: 0.02em;
        }

        .hero-stat-sep {
          width: 1px;
          height: 32px;
          background: var(--color-border);
          flex-shrink: 0;
        }

        /* Scroll hint */
        .hero-scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-muted);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          animation: fadeIn 1.5s 1s both;
        }

        .hero-scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, var(--color-accent), transparent);
          animation: pulse-line 2s ease-in-out infinite;
        }

        @keyframes pulse-line {
          0%, 100% { opacity: 1; height: 36px; }
          50%       { opacity: 0.3; height: 24px; }
        }

        /* ── Responsive ─────────────────────────────────── */
        @media (max-width: 1024px) {
          .hero-body {
            grid-template-columns: 1fr;
            gap: 4rem;
            padding-top: 3rem;
            padding-bottom: 3rem;
            text-align: center;
          }

          .hero-left { align-items: center; }

          .hero-bio { text-align: center; margin: 0 auto; }

          .hero-ctas { justify-content: center; }

          .hero-right { order: -1; max-width: 500px; margin: 0 auto; width: 100%; }

          .hero-scroll { display: none; }
        }

        @media (max-width: 768px) {
          .hero-name {
            font-size: clamp(2.8rem, 8vw, 4rem);
          }
        }

        @media (max-width: 640px) {
          .hero-body { padding-top: 2rem; padding-bottom: 2rem; gap: 3rem; }

          .hero-name {
            font-size: clamp(2.2rem, 10vw, 3.2rem);
          }

          .hero-ctas {
            flex-direction: column;
            width: 100%;
          }

          .hero-ctas .btn {
            width: 100%;
            justify-content: center;
          }
          
          .hero-stats {
            gap: 1rem;
            padding: 1rem;
          }
          
          .hero-stat-val {
            font-size: 1.25rem;
          }
        }

        /* ── 320px ultra-small fix ── */
        @media (max-width: 360px) {
          .hero-name {
            font-size: clamp(2rem, 12vw, 2.6rem);
            letter-spacing: -0.03em;
          }
          .hero-status-pill {
            font-size: 0.68rem;
            padding: 0.3rem 0.65rem;
          }
          .hero-bio {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}
