import React, { useState, useRef, useEffect } from 'react'
import { ArrowRight, Play, X, ChevronDown, ChevronUp } from 'lucide-react'
import HeroCanvas from './HeroCanvas'
import { useGsapContext, applyMagneticEffect } from '../hooks/useGsap'

export default function Hero() {
  const [showreelOpen, setShowreelOpen] = useState(false)
  const heroRef = useRef(null)
  const primaryBtnRef = useRef(null)
  const showreelBtnRef = useRef(null)

  // Stat counter refs
  const stat1Ref = useRef(null)
  const stat2Ref = useRef(null)
  const stat3Ref = useRef(null)

  // Magnetic button effects
  useEffect(() => {
    const cleanPrimary = applyMagneticEffect(primaryBtnRef.current, 0.28)
    const cleanShowreel = applyMagneticEffect(showreelBtnRef.current, 0.28)
    return () => {
      cleanPrimary()
      cleanShowreel()
    }
  }, [])

  // GSAP Entrance Timeline & ScrollTrigger Parallax
  useGsapContext(({ gsap }) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })

    // Staggered reveal of hero content with clearProps so elements stay 100% visible
    tl.from('.hero-eyebrow-wrap', {
      opacity: 0,
      y: 24,
      duration: 0.7,
      clearProps: 'all'
    })
      .from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        clearProps: 'all'
      }, '-=0.45')
      .from('.hero-description', {
        opacity: 0,
        y: 25,
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.55')
      .from('.hero-cta-group', {
        opacity: 0,
        y: 25,
        duration: 0.75,
        clearProps: 'all'
      }, '-=0.5')
      .from('.hero-stats-row', {
        opacity: 0,
        y: 20,
        duration: 0.75,
        clearProps: 'all'
      }, '-=0.5')
      .from('.hero-right-visual-wrap', {
        opacity: 0,
        scale: 0.94,
        y: 30,
        duration: 1.1,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.9')

    // Animated rolling number counters
    const counterObj = { count1: 0, count2: 0, count3: 0 }
    gsap.to(counterObj, {
      count1: 50,
      count2: 30,
      count3: 5,
      duration: 2.2,
      ease: 'power2.out',
      delay: 0.5,
      onUpdate: () => {
        if (stat1Ref.current) stat1Ref.current.innerText = `${Math.floor(counterObj.count1)}+`
        if (stat2Ref.current) stat2Ref.current.innerText = `${Math.floor(counterObj.count2)}+`
        if (stat3Ref.current) stat3Ref.current.innerText = `${Math.floor(counterObj.count3)}+`
      }
    })
  }, [], heroRef)

  return (
    <section id="home" className="hero-section" ref={heroRef}>
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
            <a 
              ref={primaryBtnRef}
              href="#contact" 
              className="btn-primary-orange"
            >
              <span>Start a Project</span>
              <div className="btn-arrow-circle">
                <ArrowRight size={15} strokeWidth={2.5} />
              </div>
            </a>

            <button 
              ref={showreelBtnRef}
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
              <span className="stat-value" ref={stat1Ref}>0+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value" ref={stat2Ref}>0+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value" ref={stat3Ref}>0+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
          </div>
        </div>

        {/* Right Column: Spline 3D Greeting Robot (Borderless & Box-Free) */}
        <div className="hero-right-visual-wrap">
          <div className="hero-robot-container">
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
