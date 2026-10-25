import React, { useState, useEffect } from 'react'
import { 
  ArrowUp, 
  ArrowUpRight, 
  Mail, 
  Globe,
  ShieldCheck
} from 'lucide-react'

// Custom SVGs for pixel-perfect social icons matching luxury dark aesthetics
function XTwitterIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66.92 0 1.66-.74 1.66-1.66A1.66 1.66 0 0 0 7.83 6.2z" />
    </svg>
  )
}

function YoutubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function Footer({ onNavigate }) {
  const [dhakaTime, setDhakaTime] = useState('')

  // Live real-time studio clock for Dhaka HQ (UTC+6)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
        setDhakaTime(formatter.format(now))
      } catch {
        setDhakaTime('LIVE')
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.25 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const handleLinkClick = (e, route, param) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(route, param)
    } else {
      let targetPath = '/'
      if (route === 'about') targetPath = '/about'
      else if (route === 'services') targetPath = param ? `/services?category=${param}` : '/services'
      else if (route === 'contact') targetPath = '/contact'
      window.history.pushState(null, '', targetPath)
      handleScrollToTop()
    }
  }

  return (
    <footer className="footer-section-premium">
      {/* Ambient Radial Background Glow */}
      <div className="footer-glow-aura" />
      <div className="footer-top-accent-line" />

      <div className="container footer-container-premium">
        
        {/* =================================================================
            1. MAIN ARCHITECTURAL 4-COLUMN GRID
            ================================================================= */}
        <div className="footer-grid-premium">
          {/* Column 1: Brand & Studio Identity */}
          <div className="footer-col footer-col-brand">
            <div 
              className="brand-logo footer-brand-logo" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleLinkClick(e, 'home')}
            >
              <svg className="brand-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 9L19.5 25.5L25 18L13.5 9H7Z" fill="#FFFFFF" />
                <path d="M19.5 25.5L33 9H27.5L19.5 21L15.5 16L19.5 25.5Z" fill="#FF5500" />
                <path d="M19.5 25.5L24 31L33 9H28L19.5 25.5Z" fill="#FF772A" />
              </svg>
              <div className="brand-text-wrap">
                <span className="brand-name" style={{ color: '#ffffff' }}>velotech</span>
                <span className="brand-sub" style={{ color: 'var(--color-orange)' }}>STUDIO</span>
              </div>
            </div>

            <p className="footer-brand-desc">
              Velotech Studio is an elite creative technology and 3D digital experience agency. 
              We engineer spatial web experiences, WebGL shaders, transformative branding, 
              and enterprise fullstack platforms for pioneering companies worldwide.
            </p>

            <div className="footer-badges-wrap">
              <span className="footer-badge-pill">
                <span className="pulse-indicator-dot" />
                <span>Available for Global Commissions</span>
              </span>
              <span className="footer-badge-pill">
                <Globe size={13} color="var(--color-orange)" />
                <span>Dhaka HQ • {dhakaTime || 'UTC+6'}</span>
              </span>
              <span className="footer-badge-pill">
                <ShieldCheck size={13} color="var(--color-orange)" />
                <span>NDA Protected</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation / Explore */}
          <div className="footer-col footer-col-nav">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/" onClick={(e) => handleLinkClick(e, 'home')} className="footer-nav-link">
                  <span className="footer-link-bullet" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, 'about')} className="footer-nav-link">
                  <span className="footer-link-bullet" />
                  <span>About Studio</span>
                </a>
              </li>
              <li>
                <a href="/services" onClick={(e) => handleLinkClick(e, 'services')} className="footer-nav-link">
                  <span className="footer-link-bullet" />
                  <span>Capabilities</span>
                </a>
              </li>
              <li>
                <a 
                  href="#work" 
                  onClick={(e) => {
                    e.preventDefault()
                    if (onNavigate) onNavigate('home')
                    setTimeout(() => {
                      const el = document.getElementById('work')
                      if (el) {
                        if (window.__lenis) {
                          window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 })
                        } else {
                          el.scrollIntoView({ behavior: 'smooth' })
                        }
                      }
                    }, 120)
                  }} 
                  className="footer-nav-link"
                >
                  <span className="footer-link-bullet" />
                  <span>Selected Works</span>
                </a>
              </li>
              <li>
                <a 
                  href="#process" 
                  onClick={(e) => {
                    e.preventDefault()
                    if (onNavigate) onNavigate('home')
                    setTimeout(() => {
                      const el = document.getElementById('process')
                      if (el) {
                        if (window.__lenis) {
                          window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 })
                        } else {
                          el.scrollIntoView({ behavior: 'smooth' })
                        }
                      }
                    }, 120)
                  }} 
                  className="footer-nav-link"
                >
                  <span className="footer-link-bullet" />
                  <span>Our Methodology</span>
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleLinkClick(e, 'contact')} className="footer-nav-link">
                  <span className="footer-link-bullet" />
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Capabilities & Services */}
          <div className="footer-col footer-col-services">
            <h4 className="footer-col-title">Capabilities</h4>
            <ul className="footer-links-list">
              <li>
                <a 
                  href="/services?category=development" 
                  onClick={(e) => handleLinkClick(e, 'services', 'development')} 
                  className="footer-nav-link"
                >
                  <span className="footer-link-bullet" />
                  <span>Custom Web Development</span>
                </a>
              </li>
              <li>
                <a 
                  href="/services?category=design" 
                  onClick={(e) => handleLinkClick(e, 'services', 'design')} 
                  className="footer-nav-link"
                >
                  <span className="footer-link-bullet" />
                  <span>Graphic Design & Brand Systems</span>
                </a>
              </li>
              <li>
                <a 
                  href="/services?category=packaging" 
                  onClick={(e) => handleLinkClick(e, 'services', 'packaging')} 
                  className="footer-nav-link"
                >
                  <span className="footer-link-bullet" />
                  <span>Packaging & 3D Tactile Visualization</span>
                </a>
              </li>
              <li>
                <a 
                  href="/services?category=cms" 
                  onClick={(e) => handleLinkClick(e, 'services', 'cms')} 
                  className="footer-nav-link"
                >
                  <span className="footer-link-bullet" />
                  <span>Shopify / WordPress / Wix</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Connect & Touchpoints */}
          <div className="footer-col footer-col-connect">
            <h4 className="footer-col-title">Studio Connect</h4>
            
            <div className="footer-contact-card">
              <span className="contact-card-label">OFFICIAL INBOX</span>
              <a href="mailto:velotecltd@gmail.com" className="contact-card-email">
                velotecltd@gmail.com
                <ArrowUpRight size={14} className="email-arrow" />
              </a>
              <span className="contact-card-note">Fast response guaranteed within 2 hours</span>
            </div>

            <div className="footer-social-section">
              <span className="footer-social-label">DIGITAL PRESENCE</span>
              <div className="footer-social-row">
                <a 
                  href="mailto:velotecltd@gmail.com" 
                  className="premium-social-link" 
                  aria-label="Direct Email" 
                  title="velotecltd@gmail.com"
                >
                  <Mail size={15} />
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="premium-social-link" 
                  aria-label="X (Twitter)"
                  title="Twitter / X"
                >
                  <XTwitterIcon size={14} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="premium-social-link" 
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <InstagramIcon size={15} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="premium-social-link" 
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={15} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="premium-social-link" 
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <YoutubeIcon size={16} />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="premium-social-link" 
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <GithubIcon size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            2. GIANT AESTHETIC WATERMARK TEXT
            ================================================================= */}
        <div className="footer-giant-watermark" aria-hidden="true">
          <span>VELOTECH STUDIO</span>
        </div>

        {/* =================================================================
            3. PRECISION BOTTOM BAR
            ================================================================= */}
        <div className="footer-bottom-bar-premium">
          <div className="footer-copyright-text">
            © {new Date().getFullYear()} Velotech Studio Ltd. All rights reserved.
          </div>

          <div className="footer-tech-stamp">
            <span className="tech-stamp-dot" />
            <span>Crafted with Three.js, React & GSAP</span>
          </div>

          <div className="footer-bottom-right-group">
            <div className="footer-legal-links">
              <a href="/about" onClick={(e) => handleLinkClick(e, 'about')}>Privacy Policy</a>
              <span className="legal-sep">•</span>
              <a href="/about" onClick={(e) => handleLinkClick(e, 'about')}>Terms</a>
            </div>

            <button 
              type="button" 
              className="footer-back-to-top-btn"
              onClick={handleScrollToTop}
              title="Return to the top of the page"
            >
              <span>Back to top</span>
              <div className="back-to-top-icon-wrap">
                <ArrowUp size={13} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
