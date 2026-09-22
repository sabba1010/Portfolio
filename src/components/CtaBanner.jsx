import React, { useState, useRef, useEffect } from 'react'
import { ArrowRight, Sparkles, Send, CheckCircle, X } from 'lucide-react'
import { useGsapContext, applyMagneticEffect } from '../hooks/useGsap'

export default function CtaBanner() {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const sectionRef = useRef(null)
  const ctaBtnRef = useRef(null)

  useEffect(() => {
    const cleanMagnetic = applyMagneticEffect(ctaBtnRef.current, 0.3)
    return () => cleanMagnetic()
  }, [])

  useGsapContext(({ gsap }) => {
    // Banner Wrapper Entrance
    gsap.from('.cta-banner-wrapper', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      opacity: 0,
      scale: 0.94,
      y: 45,
      duration: 1.1,
      ease: 'power3.out',
      clearProps: 'all'
    })

    // Floating parallax on decorative geometry
    gsap.to('.cta-decor-left', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -25,
      ease: 'none'
    })

    gsap.to('.cta-decor-right', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      y: 25,
      ease: 'none'
    })
  }, [], sectionRef)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setModalOpen(false)
      setFormData({ name: '', email: '', message: '' })
    }, 2500)
  }

  return (
    <section id="contact" className="cta-section" ref={sectionRef}>
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

              <polygon points="-10,50 95,115 15,220" fill="url(#orangePrismGradLeft)" opacity="0.95" filter="url(#prismGlowLeft)" />
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

              <polygon points="135,95 245,130 180,270" fill="url(#orangePrismGradRight)" opacity="0.95" filter="url(#prismGlowRight)" />
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
              with creativity and cutting-edge 3D technology.
            </p>
            
            <button 
              ref={ctaBtnRef}
              onClick={() => setModalOpen(true)}
              className="btn-primary-orange"
              style={{ fontSize: '15px', padding: '10px 12px 10px 28px', cursor: 'pointer' }}
            >
              <span>Get in Touch</span>
              <div className="btn-arrow-circle" style={{ width: '36px', height: '36px' }}>
                <ArrowRight size={16} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Contact Interactive Modal */}
      {modalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setModalOpen(false)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              background: '#12141a',
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,85,0,0.25)',
              color: '#fff'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(255, 85, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'var(--color-orange)'
                }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>Message Received!</h3>
                <p style={{ color: '#8e95a5', fontSize: '14px' }}>
                  Our creative team will review your project and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span className="eyebrow-tag" style={{ marginBottom: '6px' }}>LET'S TALK</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>Start a Conversation</h3>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#8e95a5', marginBottom: '6px' }}>Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#8e95a5', marginBottom: '6px' }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#8e95a5', marginBottom: '6px' }}>Project Details</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell us about your timeline, goals and desired 3D experiences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button 
                  type="submit"
                  className="btn-primary-orange"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px 24px', marginTop: '8px' }}
                >
                  <Send size={15} />
                  <span>Send Project Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
