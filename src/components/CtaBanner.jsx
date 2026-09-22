import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section id="contact" className="cta-section">
      <div className="container">
        <div className="cta-banner-wrapper">
          {/* Left Decorative 3D Glass Geometry */}
          <div className="cta-decor-left">
            <svg viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="slateGradLeft" x1="20%" y1="10%" x2="90%" y2="90%">
                  <stop offset="0%" stopColor="#2a2d39" />
                  <stop offset="45%" stopColor="#14151b" />
                  <stop offset="100%" stopColor="#07080a" />
                </linearGradient>
                <linearGradient id="orangePrismGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff8a3d" />
                  <stop offset="50%" stopColor="#ff5500" />
                  <stop offset="100%" stopColor="#d93d00" />
                </linearGradient>
                <filter id="prismGlowLeft" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="14" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing orange triangular glass wedge */}
              <polygon points="-10,50 95,115 15,220" fill="url(#orangePrismGradLeft)" opacity="0.95" filter="url(#prismGlowLeft)" />
              
              {/* Floating dark slate/phone */}
              <rect x="-90" y="70" width="145" height="220" rx="22" transform="rotate(-19 -90 70)" fill="url(#slateGradLeft)" stroke="#3e4354" strokeWidth="1.5" />
              <rect x="-85" y="75" width="135" height="210" rx="18" transform="rotate(-19 -85 75)" fill="#090a0d" opacity="0.8" />
            </svg>
          </div>

          {/* Right Decorative 3D Glass Geometry */}
          <div className="cta-decor-right">
            <svg viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="slateGradRight" x1="10%" y1="10%" x2="80%" y2="90%">
                  <stop offset="0%" stopColor="#2c303f" />
                  <stop offset="50%" stopColor="#13151c" />
                  <stop offset="100%" stopColor="#08080c" />
                </linearGradient>
                <linearGradient id="orangePrismGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff944d" />
                  <stop offset="50%" stopColor="#ff5500" />
                  <stop offset="100%" stopColor="#cc3700" />
                </linearGradient>
                <filter id="prismGlowRight" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="16" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing orange triangular glass shard */}
              <polygon points="135,95 245,130 180,270" fill="url(#orangePrismGradRight)" opacity="0.95" filter="url(#prismGlowRight)" />
              
              {/* Floating dark tablet slate */}
              <rect x="120" y="85" width="145" height="220" rx="22" transform="rotate(22 120 85)" fill="url(#slateGradRight)" stroke="#44495c" strokeWidth="1.5" />
              <rect x="125" y="90" width="135" height="210" rx="18" transform="rotate(22 125 90)" fill="#090a0d" opacity="0.8" />
            </svg>
          </div>

          {/* Center Content */}
          <div className="cta-content-inner">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Sparkles size={14} color="var(--color-orange)" />
              <span className="cta-tagline" style={{ margin: 0 }}>READY TO BUILD SOMETHING AMAZING?</span>
            </div>
            
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
