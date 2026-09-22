import React, { useState, useEffect } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <a href="#home" className="brand-logo">
          <svg className="brand-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* White upper facet */}
            <path d="M7 9L19.5 25.5L25 18L13.5 9H7Z" fill="#FFFFFF" />
            {/* Orange lower facet fold */}
            <path d="M19.5 25.5L33 9H27.5L19.5 21L15.5 16L19.5 25.5Z" fill="#FF5500" />
            <path d="M19.5 25.5L24 31L33 9H28L19.5 25.5Z" fill="#FF6A1A" />
          </svg>
          <div className="brand-text-wrap">
            <span className="brand-name">velotech</span>
            <span className="brand-sub">STUDIO</span>
          </div>
        </a>

        {/* Center Desktop Links */}
        <nav>
          <ul className="nav-links-list">
            <li className="nav-link-item"><a href="#home">Home</a></li>
            <li className="nav-link-item"><a href="#about">About</a></li>
            <li className="nav-link-item"><a href="#services">Services</a></li>
            <li className="nav-link-item"><a href="#work">Work</a></li>
            <li className="nav-link-item"><a href="#process">Process</a></li>
            <li className="nav-link-item"><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="#contact" className="nav-btn-talk">
            <span>Let's Talk</span>
            <div className="talk-circle">
              <ArrowRight size={14} strokeWidth={2.5} />
            </div>
          </a>

          {/* Mobile hamburger button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'rgba(7, 7, 9, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 99
        }}>
          {['Home', 'About', 'Services', 'Work', 'Process', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
