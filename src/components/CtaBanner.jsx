import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section id="contact" className="cta-section">
      <div className="container">
        <div className="cta-banner-wrapper">
          {/* Left Decorative 3D Shapes */}
          <div className="cta-decor-left">
            <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="ctaDarkGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e2029" />
                  <stop offset="100%" stopColor="#0a0a0d" />
                </linearGradient>
                <linearGradient id="ctaOrangeGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff7733" />
                  <stop offset="100%" stopColor="#ff4500" />
                </linearGradient>
                <filter id="orangeGlowLeft" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing orange triangle wedge */}
              <polygon points="-20,60 80,120 10,210" fill="url(#ctaOrangeGradLeft)" opacity="0.95" filter="url(#orangeGlowLeft)" />
              {/* Floating dark slate/phone */}
              <rect x="-80" y="80" width="130" height="200" rx="20" transform="rotate(-18 -80 80)" fill="url(#ctaDarkGradLeft)" stroke="#3a3d4a" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Right Decorative 3D Shapes */}
          <div className="cta-decor-right">
            <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="ctaDarkGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#252834" />
                  <stop offset="100%" stopColor="#0d0e14" />
                </linearGradient>
                <linearGradient id="ctaOrangeGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff8833" />
                  <stop offset="100%" stopColor="#ff4400" />
                </linearGradient>
                <filter id="orangeGlowRight" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing orange triangle prism */}
              <polygon points="120,110 220,140 160,260" fill="url(#ctaOrangeGradRight)" opacity="0.95" filter="url(#orangeGlowRight)" />
              {/* Floating dark slab */}
              <rect x="110" y="100" width="130" height="200" rx="20" transform="rotate(22 110 100)" fill="url(#ctaDarkGradRight)" stroke="#3f4352" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Center Content */}
          <div className="cta-content-inner">
            <span className="cta-tagline">READY TO BUILD SOMETHING AMAZING?</span>
            <h2 className="cta-heading">
              Let's Create the <span className="highlight">Next Big Thing</span>
            </h2>
            <p className="cta-subtext">
              Have a project in mind? Let's discuss how we can bring it to life
              with creativity and technology.
            </p>
            <a 
              href="mailto:contact@velotechstudio.com" 
              className="btn-primary-orange"
              style={{ fontSize: '15px', padding: '10px 12px 10px 28px' }}
            >
              <span>Get in Touch</span>
              <div className="btn-arrow-circle" style={{ width: '36px', height: '36px' }}>
                <ArrowRight size={16} strokeWidth={2.5} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
