import { useEffect, useRef, useState, FormEvent } from 'react';
import { personal } from '../data';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct the mailto link as a simple fallback
    const mailtoLink = `mailto:${personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    
    // Simulate slight delay for "sending" effect, then open mailto
    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    }, 800);
  };

  return (
    <section id="contact" ref={sectionRef} className="section contact-section" aria-label="Contact Information">
      <div className="container relative">
        
        {/* Header */}
        <div className="contact-header reveal">
          <div className="section-label">Contact</div>
          <h2 className="section-heading">
            Let's Build Something <br className="mobile-break" />
            <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="contact-subtitle">
            Whether you have an engineering role, full-stack opening, or a
            groundbreaking startup idea, my inbox is always open.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="contact-grid-container">
          
          {/* Left Column: Info & Socials */}
          <div className="contact-left reveal-left">
            
            {/* Status Card */}
            <div className="contact-panel status-panel">
              <div className="status-header">
                <span className="status-dot pulsing" aria-hidden="true"></span>
                <h3 className="panel-title">Current Status</h3>
              </div>
              <p className="panel-desc">Actively interviewing for Summer 2026 / Fall 2026 roles</p>
            </div>

            {/* Email Card */}
            <div className="contact-panel email-panel">
              <h3 className="panel-title-sm">DIRECT EMAIL</h3>
              <div className="email-row">
                <a href={`mailto:${personal.email}`} className="email-address">
                  {personal.email}
                </a>
                <button 
                  className="btn btn-secondary btn-sm copy-btn-new"
                  onClick={handleCopy}
                  title="Copy email address"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Split Cards: Phone & Location */}
            <div className="contact-split-cards">
              <div className="contact-panel split-panel">
                <div className="panel-icon purple-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h3 className="panel-title-sm">Phone</h3>
                  <a href={`tel:${personal.phone.replace(/[^+0-9]/g, '')}`} className="panel-val">
                    {personal.phone}
                  </a>
                </div>
              </div>

              <div className="contact-panel split-panel">
                <div className="panel-icon green-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h3 className="panel-title-sm">Location</h3>
                  <span className="panel-val">{personal.location}</span>
                </div>
              </div>
            </div>

            {/* Social Profiles */}
            <div className="socials-section">
              <h3 className="socials-title">SOCIAL PROFILES & CODING PORTALS</h3>
              <div className="socials-grid">
                <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-card">
                  <div className="social-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    <span>LinkedIn</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
                <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="social-card">
                  <div className="social-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    <span>GitHub</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-right reveal-right">
            <div className="contact-panel form-panel">
              <div className="form-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                <h3 className="form-title">Send a Direct Message</h3>
              </div>
              <p className="form-desc">Fill in the details below, and I will get back to you within 24 hours.</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="input-group">
                    <label htmlFor="name">Your Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="e.g. Satya Nadella" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Your Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="e.g. satya@microsoft.com" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    placeholder="e.g. Full-Stack Engineering Role / Collaboration" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    placeholder="Hi Hariom, I came across your LUX-CashBook project and..." 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
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
          padding: var(--s32) 0 var(--s20);
        }

        .relative { position: relative; z-index: 1; }

        .contact-header {
          margin-bottom: var(--s12);
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
        }

        .contact-subtitle {
          font-size: 1.05rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-top: var(--s4);
          max-width: 580px;
        }

        .mobile-break { display: none; }
        @media (max-width: 640px) {
          .mobile-break { display: block; }
        }

        /* ── Grid Layout ── */
        .contact-grid-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--s8);
          max-width: 1100px;
          margin: 0 auto;
          align-items: flex-start;
        }

        @media (max-width: 900px) {
          .contact-grid-container {
            grid-template-columns: 1fr;
          }
        }

        /* ── Left Column ── */
        .contact-left {
          display: flex;
          flex-direction: column;
          gap: var(--s4);
        }

        .contact-panel {
          background: rgba(15, 15, 30, 0.4);
          border: 1px solid var(--color-border);
          border-radius: var(--r-xl);
          padding: var(--s5) var(--s6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all var(--t-base);
        }
        
        .contact-panel:hover {
          border-color: var(--color-border-hover);
        }

        .panel-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .panel-desc {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          margin-top: var(--s2);
          line-height: 1.5;
        }

        .status-header {
          display: flex;
          align-items: center;
          gap: var(--s3);
        }

        .status-dot {
          width: 8px; height: 8px;
          background-color: var(--color-emerald);
          border-radius: 50%;
        }
        .status-dot.pulsing {
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          animation: pulse-emerald 2s infinite;
        }

        @keyframes pulse-emerald {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .panel-title-sm {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-cyan);
          margin-bottom: var(--s2);
        }

        .email-panel {
          padding-top: var(--s6);
          padding-bottom: var(--s6);
        }

        .email-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--s4);
          margin-top: var(--s3);
          flex-wrap: wrap;
        }

        .email-address {
          font-family: var(--font-mono);
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          font-weight: 600;
          color: var(--color-text-primary);
          text-decoration: none;
          word-break: break-all;
        }
        .email-address:hover { color: var(--color-cyan); }

        .contact-split-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--s4);
        }
        
        @media (max-width: 480px) {
          .contact-split-cards { grid-template-columns: 1fr; }
        }

        .split-panel {
          display: flex;
          align-items: flex-start;
          gap: var(--s3);
          padding: var(--s4);
        }

        .panel-icon {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px;
          border-radius: var(--r-md);
          flex-shrink: 0;
        }
        .purple-icon { background: rgba(167, 139, 250, 0.1); color: var(--color-violet); }
        .green-icon { background: rgba(16, 185, 129, 0.1); color: var(--color-emerald); }

        .panel-val {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-primary);
          margin-top: 4px;
          line-height: 1.4;
          text-decoration: none;
        }
        a.panel-val:hover { color: var(--color-accent-light); }

        /* Socials */
        .socials-section {
          margin-top: var(--s4);
        }
        .socials-title {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: var(--s3);
          padding-left: 2px;
        }
        .socials-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--s4);
        }
        .social-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(15, 15, 30, 0.4);
          border: 1px solid var(--color-border);
          border-radius: var(--r-lg);
          padding: var(--s3) var(--s4);
          text-decoration: none;
          color: var(--color-text-secondary);
          transition: all var(--t-fast);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .social-left {
          display: flex;
          align-items: center;
          gap: var(--s3);
          font-size: 0.9rem;
          font-weight: 500;
        }
        .social-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--color-border-hover);
          color: var(--color-text-primary);
          transform: translateY(-2px);
        }
        .arrow-icon { opacity: 0.5; transition: opacity var(--t-fast); }
        .social-card:hover .arrow-icon { opacity: 1; }

        /* ── Right Column: Form ── */
        .form-panel {
          padding: var(--s8) var(--s6);
          background: rgba(10, 10, 20, 0.6);
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .form-header {
          display: flex;
          align-items: center;
          gap: var(--s3);
          margin-bottom: var(--s2);
        }

        .form-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .form-desc {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          margin-bottom: var(--s6);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--s5);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--s4);
        }

        @media (max-width: 540px) {
          .form-row { grid-template-columns: 1fr; gap: var(--s5); }
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: var(--s2);
        }

        .input-group label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          padding-left: 2px;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--color-border);
          border-radius: var(--r-md);
          padding: 0.8rem 1rem;
          color: var(--color-text-primary);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: all var(--t-fast);
          outline: none;
        }

        .input-group input::placeholder,
        .input-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.15);
        }

        .input-group input:focus,
        .input-group textarea:focus {
          background: rgba(99, 102, 241, 0.05);
          border-color: var(--color-accent);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
        }

        .input-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .btn-submit {
          display: flex; align-items: center; gap: 8px;
          margin-top: var(--s2);
          width: 100%;
          justify-content: center;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #22d3ee 0%, #6366f1 100%);
          border: none;
          border-radius: var(--r-md);
          cursor: pointer;
          transition: all var(--t-base);
          box-shadow: 0 4px 20px rgba(34, 211, 238, 0.3);
        }
        
        .btn-submit:hover {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          box-shadow: 0 6px 25px rgba(34, 211, 238, 0.4);
          transform: translateY(-2px);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </section>
  );
}
