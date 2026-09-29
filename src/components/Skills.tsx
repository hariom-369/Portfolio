import { useEffect, useRef, useState } from 'react';
import { skills } from '../data';

type Category = keyof typeof skills;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

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

  const categories: Array<Category | 'All'> = ['All', ...Object.keys(skills) as Category[]];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : { [activeCategory]: skills[activeCategory] } as typeof skills;

  return (
    <section id="skills" ref={sectionRef} className="section skills-section" aria-label="Technical Skills">
      <div className="container">
        {/* Header */}
        <div className="skills-header reveal">
          <div className="section-label">Skills</div>
          <h2 className="section-heading">
            Technical <span className="gradient-text">capabilities</span>
          </h2>
          <p className="section-subheading">
            The tools, frameworks, and technologies I work with across full-stack development,
            AI/ML, and system design.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="skills-filter reveal" role="tablist" aria-label="Filter skills by category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls={`panel-${cat.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
              className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat !== 'All' && (
                <span
                  className="filter-dot"
                  style={{ background: skills[cat as Category]?.color }}
                  aria-hidden="true"
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid" role="region" aria-live="polite">
          {(Object.entries(filteredSkills) as [Category, typeof skills[Category]][]).map(
            ([category, { color, items }], catIndex) => (
              <div
                key={category}
                id={`panel-${category.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                className="skill-category reveal"
                style={{ transitionDelay: `${catIndex * 0.05}s` }}
              >
                <div className="skill-cat-header">
                  <div
                    className="skill-cat-icon"
                    style={{ backgroundColor: `${color}15`, color: color, borderColor: `${color}30` }}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <h3 className="skill-cat-name">{category}</h3>
                </div>
                <div className="skill-items">
                  {items.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="skill-item"
                      style={{ animationDelay: `${skillIndex * 0.03}s` }}
                    >
                      <span
                        className="skill-indicator"
                        style={{ background: color }}
                        aria-hidden="true"
                      />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <style>{`
        .skills-section {
          position: relative;
        }

        .skills-header {
          margin-bottom: var(--s10);
        }

        /* ── Filters ── */
        .skills-filter {
          display: flex;
          flex-wrap: wrap;
          gap: var(--s3);
          margin-bottom: var(--s12);
          padding: var(--s2);
          background: rgba(255,255,255,0.015);
          border: 1px solid var(--color-border);
          border-radius: var(--r-xl);
          width: fit-content;
        }

        .filter-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--s2);
          padding: var(--s2) var(--s5);
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--r-full);
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all var(--t-base);
        }

        .filter-btn:hover {
          color: var(--color-text-primary);
          background: rgba(255,255,255,0.03);
        }

        .filter-btn.active {
          background: var(--color-bg-tertiary);
          border-color: var(--color-border);
          color: var(--color-text-primary);
          box-shadow: var(--shadow-sm);
        }

        .filter-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 8px currentColor;
        }

        /* ── Grid ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--s6);
        }

        .skill-category {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--r-xl);
          padding: var(--s8);
          transition: all var(--t-base);
          display: flex;
          flex-direction: column;
          gap: var(--s5);
        }

        .skill-category:hover {
          border-color: var(--color-border-hover);
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .skill-cat-header {
          display: flex;
          align-items: center;
          gap: var(--s4);
          padding-bottom: var(--s4);
          border-bottom: 1px dashed var(--color-border);
        }

        .skill-cat-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--r-md);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          flex-shrink: 0;
        }

        .skill-cat-name {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
        }

        .skill-items {
          display: flex;
          flex-wrap: wrap;
          gap: var(--s2);
        }

        .skill-item {
          display: inline-flex;
          align-items: center;
          gap: var(--s2);
          padding: 0.35rem 0.8rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--color-border);
          border-radius: var(--r-full);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-text-primary);
          transition: all var(--t-fast);
          cursor: default;
        }

        .skill-item:hover {
          background: var(--color-bg-glass-hover);
          border-color: var(--color-border-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .skill-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.7;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .skills-filter {
            width: 100%;
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: var(--s3);
          }
          
          .skills-filter::-webkit-scrollbar {
            height: 4px;
          }
          
          .filter-btn {
            flex-shrink: 0;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
