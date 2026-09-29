import { useEffect, useRef, useState } from 'react';
import { projects } from '../data';

// ── Architecture visualization for MERN projects ──────────────────────────────
function ArchViz({ layers }: { layers: { layer: string; role: string; color: string }[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="arch-viz">
      <div className="arch-label">Architecture</div>
      <div className="arch-layers">
        {layers.map((l, i) => (
          <div key={i} className="arch-item">
            <div
              className={`arch-node${active === i ? ' arch-node-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                borderColor: active === i ? l.color : undefined,
                backgroundColor: active === i ? `${l.color}12` : undefined,
              }}
            >
              <span className="arch-node-role" style={{ color: active === i ? l.color : undefined }}>
                {l.role}
              </span>
              <span className="arch-node-name">{l.layer}</span>
            </div>
            {i < layers.length - 1 && (
              <div
                className="arch-arrow"
                style={{ background: `linear-gradient(to bottom, ${layers[i].color}60, ${layers[i+1].color}60)` }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AI Pipeline viz ────────────────────────────────────────────────────────────
function PipelineViz({ steps }: { steps: { step: string; icon: string; color: string }[] }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveStep((s) => (s + 1) % steps.length), 1200);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div className="pipeline-viz">
      <div className="arch-label">Processing Pipeline</div>
      <div className="pipeline-steps">
        {steps.map((s, i) => (
          <div key={i} className="pipeline-step-wrap">
            <div
              className={`pipeline-step${activeStep === i ? ' pipeline-step-active' : ''}`}
              onMouseEnter={() => setActiveStep(i)}
              style={{
                borderColor: activeStep === i ? s.color : undefined,
                background: activeStep === i ? `${s.color}12` : undefined,
              }}
            >
              <span className="pipeline-icon" aria-hidden="true">{s.icon}</span>
              <span className="pipeline-label" style={{ color: activeStep === i ? s.color : undefined }}>
                {s.step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`pipeline-connector${activeStep >= i ? ' active' : ''}`}
                style={{ background: activeStep > i ? s.color : undefined }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Project Modal ──────────────────────────────────────────────────────────────
type Project = typeof projects[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const isAI = project.id === 'ai-career-mentor';

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${project.id}`}
    >
      <div
        className="modal-panel"
        ref={modalRef}
        tabIndex={-1}
        style={{ '--accent': project.accentColor } as React.CSSProperties}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="tag" style={{
              background: `${project.accentColor}18`,
              color: project.accentColor,
              border: `1px solid ${project.accentColor}30`,
            }}>
              {project.category}
            </span>
            <h2 id={`modal-title-${project.id}`} className="modal-title">{project.name}</h2>
            <p className="modal-tagline">{project.tagline}</p>
            {/* Github/Demo links inside modal header */}
            <div className="modal-header-links" style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              {project.links?.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" aria-label="GitHub Repository" title="GitHub Repository">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  GitHub
                </a>
              )}
              {project.links?.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" aria-label="Live Demo" title="Live Demo">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close project details"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Problem & Solution */}
          <div className="modal-ps-grid">
            <div className="modal-block">
              <h3 className="modal-block-title">Problem</h3>
              <p className="modal-block-text">{project.problem}</p>
            </div>
            <div className="modal-block">
              <h3 className="modal-block-title">Solution</h3>
              <p className="modal-block-text">{project.solution}</p>
            </div>
          </div>

          {/* Architecture */}
          <div className="modal-arch">
            {'architecture' in project && project.architecture && !isAI && (
              <ArchViz layers={project.architecture} />
            )}
            {'pipeline' in project && isAI && (project as any).pipeline && (
              <PipelineViz steps={(project as any).pipeline} />
            )}
          </div>

          {/* Features */}
          <div className="modal-section">
            <h3 className="modal-section-title">Key Features</h3>
            <div className="modal-features-grid">
              {project.features.map((f) => (
                <div key={f.label} className="modal-feature">
                  <span className="modal-feature-icon" aria-hidden="true">{f.icon}</span>
                  <div>
                    <div className="modal-feature-label">{f.label}</div>
                    <div className="modal-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics (AI project only) */}
          {'metrics' in project && (project as any).metrics && (
            <div className="modal-section">
              <h3 className="modal-section-title">Project Results</h3>
              <div className="modal-metrics">
                {(project as any).metrics.map((m: any) => (
                  <div key={m.label} className="modal-metric">
                    <div className="modal-metric-value" style={{ color: project.accentColor }}>
                      {m.value}
                    </div>
                    <div className="modal-metric-label">{m.label}</div>
                    {m.note && <div className="modal-metric-note">{m.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="modal-section">
            <h3 className="modal-section-title">Tech Stack</h3>
            <div className="modal-stack">
              {project.stack.map((t) => (
                <span key={t.name} className="modal-tech-tag">
                  <span className="modal-tech-category">{t.category}</span>
                  {t.name}
                </span>
              ))}
            </div>
          </div>

          {/* Engineering Challenges */}
          <div className="modal-section">
            <h3 className="modal-section-title">Engineering Challenges</h3>
            <ul className="modal-challenges">
              {project.challenges.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 4, 10, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
          animation: fadeIn 0.2s ease;
          overflow-y: auto;
        }

        @media (max-width: 640px) {
          .modal-overlay {
            align-items: flex-start;
            padding: 0.75rem;
          }
        }

        .modal-panel {
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-2xl);
          overflow-y: auto;
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          outline: none;
          position: relative;
        }

        @media (max-width: 640px) {
          .modal-panel {
            max-height: calc(100vh - 1.5rem);
            border-radius: var(--radius-xl);
          }
        }

        .modal-panel::-webkit-scrollbar { width: 4px; }
        .modal-panel::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-4);
          padding: var(--space-8) var(--space-8) var(--space-6);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          background: var(--color-bg-secondary);
          z-index: 10;
        }

        .modal-header-left {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--color-text-primary);
          line-height: 1.1;
        }

        .modal-tagline {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        .modal-close {
          width: 44px;
          height: 44px;
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .modal-close:hover {
          background: rgba(244, 63, 94, 0.1);
          border-color: rgba(244, 63, 94, 0.3);
          color: var(--color-rose);
        }

        .modal-body {
          padding: var(--space-8);
          display: flex;
          flex-direction: column;
          gap: var(--space-10);
        }

        .modal-ps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-6);
        }

        .modal-block {
          padding: var(--space-5);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }

        .modal-block-title {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: var(--space-3);
        }

        .modal-block-text {
          font-size: 0.875rem;
          line-height: 1.7;
          color: var(--color-text-secondary);
        }

        .modal-arch {
          min-height: 100px;
        }

        .modal-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .modal-section-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--color-border);
        }

        .modal-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--space-3);
        }

        .modal-feature {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .modal-feature:hover {
          border-color: var(--color-border-hover);
        }

        .modal-feature-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .modal-feature-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 2px;
        }

        .modal-feature-desc {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        .modal-stack {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .modal-tech-tag {
          display: flex;
          flex-direction: column;
          gap: 1px;
          padding: var(--space-2) var(--space-3);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .modal-tech-tag:hover {
          border-color: var(--color-border-hover);
          background: var(--color-accent-dim);
        }

        .modal-tech-category {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .modal-tech-tag > span:not(.modal-tech-category) {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .modal-challenges {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .modal-challenges li {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .modal-challenges li::before {
          content: '→';
          color: var(--color-accent);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 0.1em;
        }

        .modal-metrics {
          display: flex;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        .modal-metric {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          padding: var(--space-5) var(--space-6);
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          flex: 1;
          min-width: 150px;
        }

        .modal-metric-value {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .modal-metric-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .modal-metric-note {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--color-text-muted);
        }

        @media (max-width: 768px) {
          .modal-ps-grid {
            grid-template-columns: 1fr;
          }

          .modal-header {
            padding: var(--space-6);
          }

          .modal-body {
            padding: var(--space-6);
          }
        }
        
        @media (max-width: 640px) {
          .modal-title {
            font-size: 1.35rem;
          }
          .modal-header {
            padding: var(--space-4);
          }
          .modal-body {
            padding: var(--space-4);
          }
        }
      `}</style>
    </div>
  );
}

// ── Architecture viz styles (reused in modal) ─────────────────────────────────
const archStyles = `
  .arch-viz, .pipeline-viz {
    padding: var(--space-5);
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  .arch-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: var(--space-4);
  }

  .arch-layers {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .arch-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .arch-node {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all var(--transition-fast);
    background: var(--color-bg-tertiary);
  }

  .arch-node:hover, .arch-node-active {
    background: rgba(99, 102, 241, 0.08);
  }

  .arch-node-role {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-muted);
    transition: color var(--transition-fast);
  }

  .arch-node-name {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .arch-arrow {
    width: 2px;
    height: 20px;
    opacity: 0.4;
  }

  /* Pipeline */
  .pipeline-viz {
    overflow: hidden;
  }

  .pipeline-steps {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: thin;
    scrollbar-color: rgba(99,102,241,0.3) transparent;
  }

  .pipeline-steps::-webkit-scrollbar { height: 3px; }
  .pipeline-steps::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }

  .pipeline-step-wrap {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .pipeline-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-3) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-base);
    min-width: 80px;
    background: var(--color-bg-tertiary);
  }

  .pipeline-icon {
    font-size: 1.25rem;
  }

  .pipeline-label {
    font-size: 0.65rem;
    font-weight: 600;
    text-align: center;
    color: var(--color-text-secondary);
    transition: color var(--transition-fast);
    white-space: nowrap;
  }

  .pipeline-connector {
    width: 24px;
    height: 2px;
    background: var(--color-border);
    flex-shrink: 0;
    transition: background var(--transition-base);
  }

  .pipeline-connector.active {
    background: var(--color-accent);
    opacity: 0.5;
  }
`;

// ── Main Projects component ────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section projects-section">
      <style>{archStyles}</style>
      <div className="container">
        {/* Header */}
        <div className="projects-header reveal">
          <div className="section-label">Projects</div>
          <h2 className="section-heading">
            Things I've built &amp; <br />
            <span className="gradient-text">shipped</span>
          </h2>
          <p className="section-subheading">
            Three projects spanning full-stack product development and AI/ML systems —
            each built end-to-end with real architecture decisions.
          </p>
        </div>

        {/* Projects list */}
        <div className="projects-list">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`project-card reveal${i % 2 === 1 ? '-right' : '-left'}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Project number */}
              <div className="project-number" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="project-content">
                {/* Left */}
                <div className="project-info">
                  <div className="project-meta">
                    <span
                      className="tag"
                      style={{
                        background: `${project.accentColor}18`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}30`,
                      }}
                    >
                      {project.category}
                    </span>
                    <span className="tag tag-muted">{project.status}</span>
                  </div>

                  <h3 className="project-name">
                    <span
                      className="project-name-accent"
                      style={{ color: project.accentColor }}
                    >
                      /
                    </span>{' '}
                    {project.name}
                  </h3>
                  <p className="project-tagline">{project.tagline}</p>
                  <p className="project-solution">{project.solution}</p>

                  {/* Feature pills */}
                  <div className="project-features-preview">
                    {project.features.slice(0, 5).map((f) => (
                      <span key={f.label} className="feature-pill">
                        <span aria-hidden="true">{f.icon}</span>
                        {f.label}
                      </span>
                    ))}
                    {project.features.length > 5 && (
                      <span className="feature-pill feature-pill-more">
                        +{project.features.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Stack pills */}
                  <div className="project-stack-preview">
                    {project.stack.map((t) => (
                      <span key={t.name} className="tag tag-muted">{t.name}</span>
                    ))}
                  </div>

                  <div className="project-actions" style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedProject(project)}
                      id={`project-detail-${project.id}`}
                    >
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                    {project.links?.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="GitHub Repository" title="GitHub Repository">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                      </a>
                    )}
                    {project.links?.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary" aria-label="Live Demo" title="Live Demo">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: viz */}
                <div className="project-viz">
                  {project.id === 'ai-career-mentor' && (project as any).pipeline ? (
                    <PipelineViz steps={(project as any).pipeline} />
                  ) : (
                    <ArchViz layers={project.architecture!} />
                  )}

                  {/* Metrics for AI project */}
                  {'metrics' in project && (project as any).metrics && (
                    <div className="project-metrics">
                      {(project as any).metrics.map((m: any) => (
                        <div key={m.label} className="project-metric">
                          <span className="project-metric-value" style={{ color: project.accentColor }}>
                            {m.value}
                          </span>
                          <span className="project-metric-label">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style>{`
        .projects-section {
          position: relative;
        }

        .projects-header {
          margin-bottom: var(--space-16);
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
        }

        .project-card {
          position: relative;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-2xl);
          padding: var(--space-10);
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .project-card:hover {
          border-color: var(--color-border-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg), var(--shadow-accent);
        }

        .project-number {
          position: absolute;
          top: var(--space-8);
          right: var(--space-10);
          font-family: var(--font-display);
          font-size: 5rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          line-height: 1;
          user-select: none;
          letter-spacing: -0.04em;
        }

        .project-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-12);
          align-items: start;
        }

        .project-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .project-name {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3.5vw, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--color-text-primary);
        }

        .project-tagline {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .project-solution {
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--color-text-muted);
        }

        .project-features-preview {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .feature-pill {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-1) var(--space-3);
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .feature-pill:hover {
          border-color: var(--color-border-hover);
          color: var(--color-text-primary);
        }

        .feature-pill-more {
          color: var(--color-accent);
          border-color: var(--color-border-accent);
          background: var(--color-accent-dim);
        }

        .project-stack-preview {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .project-viz {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .project-metrics {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .project-metric {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          flex: 1;
          min-width: 100px;
        }

        .project-metric-value {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .project-metric-label {
          font-size: 0.72rem;
          color: var(--color-text-muted);
          font-weight: 500;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .project-content {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }

          .project-card {
            padding: var(--space-8);
          }
        }

        @media (max-width: 640px) {
          .project-card {
            padding: var(--space-6);
          }

          .project-number {
            font-size: 3.5rem;
            top: var(--space-4);
            right: var(--space-6);
          }
        }
      `}</style>
    </section>
  );
}
