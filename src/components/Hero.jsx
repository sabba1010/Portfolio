import React from 'react'
import { ArrowRight, Play } from 'lucide-react'
import HeroCanvas from './HeroCanvas'

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      {/* 3D WebGL Canvas */}
      <HeroCanvas />

      {/* Hero Content Overlay */}
      <div className="container hero-content">
        <div className="hero-left-col">
          <span className="eyebrow-tag">IDEAS INTO IMMERSIVE EXPERIENCES</span>
          
          <h1 className="hero-title">
            We Build<br />
            <span className="highlight-3d">3D</span> Web Experiences
          </h1>

          <p className="hero-description">
            Velotech Studio is a creative technology agency crafting high-end,
            interactive, and memorable digital experiences with Three.js, React
            and modern web technologies.
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
              onClick={() => alert('Showreel video coming soon!')}
              aria-label="Watch Showreel"
            >
              <span>Watch Showreel</span>
              <div className="showreel-icon">
                <Play size={14} fill="#ffffff" strokeWidth={0} />
              </div>
            </button>
          </div>

          {/* Stats Row */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">30+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">5+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Edge Vertical Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span className="scroll-text">SCROLL</span>
        <div className="scroll-pill-icon">
          <div className="scroll-pill-dot" />
        </div>
      </div>
    </section>
  )
}
