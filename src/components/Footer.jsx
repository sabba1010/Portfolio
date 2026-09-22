import React from 'react'

// Custom social SVG icons for pixel perfection and no external icon library discrepancies
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

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-inner">
        {/* Left: Brand Logo */}
        <div className="brand-logo" style={{ cursor: 'pointer' }}>
          <svg className="brand-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 9L19.5 25.5L25 18L13.5 9H7Z" fill="#111111" />
            <path d="M19.5 25.5L33 9H27.5L19.5 21L15.5 16L19.5 25.5Z" fill="#FF5500" />
            <path d="M19.5 25.5L24 31L33 9H28L19.5 25.5Z" fill="#FF6A1A" />
          </svg>
          <div className="brand-text-wrap">
            <span className="brand-name" style={{ color: '#111111' }}>velotech</span>
            <span className="brand-sub" style={{ color: '#646a78' }}>STUDIO</span>
          </div>
        </div>

        {/* Center: Navigation */}
        <ul className="footer-nav-list">
          <li className="footer-nav-item"><a href="#home">Home</a></li>
          <li className="footer-nav-item"><a href="#about">About</a></li>
          <li className="footer-nav-item"><a href="#services">Services</a></li>
          <li className="footer-nav-item"><a href="#work">Work</a></li>
          <li className="footer-nav-item"><a href="#contact">Contact</a></li>
        </ul>

        {/* Right: Social Icons */}
        <div className="footer-social-group">
          <a href="https://x.com" target="_blank" rel="noreferrer" className="social-circle-link" aria-label="X (Twitter)">
            <XTwitterIcon size={14} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-circle-link" aria-label="Instagram">
            <InstagramIcon size={15} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-circle-link" aria-label="LinkedIn">
            <LinkedinIcon size={15} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-circle-link" aria-label="YouTube">
            <YoutubeIcon size={16} />
          </a>
        </div>

        {/* Far Right: Copyright */}
        <div className="footer-copyright">
          © 2026 Velotech Studio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
