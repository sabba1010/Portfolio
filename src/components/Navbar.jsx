import React, { useState, useEffect } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Active section detection
      const sections = ['home', 'services', 'work', 'process', 'about', 'contact']
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <a href="#home" className="brand-logo">
          <svg className="brand-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 9L19.5 25.5L25 18L13.5 9H7Z" fill="#FFFFFF" />
            <path d="M19.5 25.5L33 9H27.5L19.5 21L15.5 16L19.5 25.5Z" fill="#FF5500" />
            <path d="M19.5 25.5L24 31L33 9H28L19.5 25.5Z" fill="#FF6A1A" />
          </svg>
          <div className="brand-text-wrap">
            <span className="brand-name">velotech</span>
            <span className="brand-sub">STUDIO</span>
          </div>
        </a>

        {/* Desktop Nav with Active Scroll-Spy */}
        <nav>
          <ul className="nav-links-list">
            {navLinks.map((link) => {
              const secId = link.href.replace('#', '')
              const isActive = activeSection === secId
              return (
                <li key={link.label} className="nav-link-item">
                  <a 
                    href={link.href}
                    style={{
                      color: isActive ? '#ffffff' : '#b0b6c4',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span 
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '16px',
                          height: '2px',
                          background: 'var(--color-orange)',
                          borderRadius: '2px',
                          boxShadow: '0 0 8px var(--color-orange)'
                        }} 
                      />
                    )}
                  </a>
                </li>
              )
            })}
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

          {/* Mobile hamburger */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'rgba(7, 7, 9, 0.98)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 99
        }}>
          {navLinks.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
