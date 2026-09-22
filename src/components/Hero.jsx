import React, { useState } from 'react'
import { ArrowRight, Play, X, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import HeroCanvas from './HeroCanvas'

export default function Hero() {
  const [showreelOpen, setShowreelOpen] = useState(false)

  return (
    <section id="home" className="hero-section">
      {/* Three.js 3D Background Magma Embers & Particles */}
      <HeroCanvas />

      {/* Hero Content Grid */}
      <div className="container hero-content-grid">
        {/* Left Column: Copy, CTA, Stats */}
        <div className="hero-left-col">
          <div className="hero-eyebrow-wrap">
            <span className="eyebrow-accent">IDEAS INTO IMMERSIVE</span>
            <span className="eyebrow-normal">EXPERIENCES</span>
          </div>
          
          <h1 className="hero-title">
            We Build<br />
            <span className="highlight-3d">3D</span> Web Experiences
          </h1>

          <p className="hero-description">
            Velotech Studio is a creative technology agency crafting high-end,
            interactive, and memorable digital experiences with Three.js, Spline,
            React and modern web technologies.
          </p>

          <div className="hero-cta-group">
            <a href="#contact" className="btn-primary-orange">
              <span>Start a Project</span>
              <div className="btn-arrow-circle">
                <ArrowRight size={15} strokeWidth={2.5} />
              </div>
            </a>

            <button 
              className="btn-showreel"
              onClick={() => setShowreelOpen(true)}
              aria-label="Watch Showreel"
            >
              <span>Watch Showreel</span>
              <div className="showreel-icon">
                <Play size={12} fill="#ffffff" strokeWidth={0} />
              </div>
            </button>
          </div>

          {/* Stats Row */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">30+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">5+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
          </div>
        </div>

        {/* Right Column: Spline 3D Greeting Robot */}
        <div className="hero-right-visual-wrap">
          <div className="hero-robot-container">
            {/* Ambient Magma Glow */}
            <div className="hero-magma-glow-orb" />

            {/* Live Interactive Chip */}
            <div className="robot-interactive-badge">
              <span className="live-dot" />
              <span>INTERACTIVE 3D • MOVE CURSOR</span>
              <Sparkles size={13} color="var(--color-orange)" />
            </div>

            {/* Spline 3D Robot Frame */}
            <div className="robot-iframe-wrap">
              <iframe 
                src="https://my.spline.design/genkubgreetingrobot-v9MGHrlLZGL0LqmKZ6hrd62k/" 
                frameBorder="0" 
                width="100%" 
                height="100%"
                title="GENKUB Greeting Robot"
                className="spline-robot-iframe"
                loading="eager"
              />
              {/* Bottom gradient fade */}
              <div className="robot-bottom-fade" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Edge Vertical Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span className="scroll-text">SCROLL</span>
        <div className="scroll-pill-wrap">
          <ChevronUp size={11} strokeWidth={2.5} color="rgba(255,255,255,0.45)" />
          <div className="scroll-pill-dot" />
          <ChevronDown size={11} strokeWidth={2.5} color="rgba(255,255,255,0.45)" />
        </div>
      </div>

      {/* Cinematic Showreel Modal */}
      {showreelOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setShowreelOpen(false)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '920px',
              aspectRatio: '16/9',
              background: '#090a0f',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 60px rgba(255,85,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowreelOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                cursor: 'pointer'
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff6600 0%, #ff3b00 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 36px rgba(255, 85, 0, 0.65)'
              }}>
                <Play size={30} fill="#fff" strokeWidth={0} />
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em' }}>
                Velotech Studio Reel 2026
              </h3>
              <p style={{ color: '#8e95a5', fontSize: '15px', maxWidth: '460px', margin: '0 auto', lineHeight: '1.6' }}>
                Showcasing cutting-edge WebGL 3D, physics-based interactions, and immersive digital platforms.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
