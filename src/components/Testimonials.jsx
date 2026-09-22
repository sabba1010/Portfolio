import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Quote, CheckCircle2, Star } from 'lucide-react'
import { useGsapContext, gsap } from '../hooks/useGsap'

const testimonialsList = [
  {
    id: 1,
    quote: '“Velotech Studio delivered an amazing website for our brand. The 3D experience blew our minds!”',
    name: 'Daniel Kim',
    role: 'Founder',
    company: 'Elevate Labs',
    avatar: '/avatar_daniel.jpg',
    rating: 5
  },
  {
    id: 2,
    quote: '“Professional, creative and technically outstanding. Highly recommended for any serious web venture!”',
    name: 'Sarah Lee',
    role: 'CEO',
    company: 'NovaTech AI',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5
  },
  {
    id: 3,
    quote: '“The attention to detail and Three.js performance optimization exceeded our wildest expectations.”',
    name: 'Marcus Vance',
    role: 'Product Lead',
    company: 'Apex Dynamics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5
  },
  {
    id: 4,
    quote: '“Our conversion rates surged by 120% after launching the new interactive 3D web application.”',
    name: 'Elena Rostova',
    role: 'CMO',
    company: 'Veloce Mobility',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5
  }
]

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0)
  const maxIndex = testimonialsList.length - 2
  const sectionRef = useRef(null)

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  // Auto advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 7000)
    return () => clearInterval(timer)
  }, [maxIndex])

  // GSAP ScrollTrigger Entrance
  useGsapContext(({ gsap }) => {
    gsap.from('.testimonials-left', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      opacity: 0,
      x: -40,
      duration: 1,
      ease: 'power3.out',
      clearProps: 'all'
    })

    gsap.from('.testimonials-cards-grid', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      opacity: 0,
      y: 45,
      duration: 1,
      ease: 'power3.out',
      clearProps: 'all'
    })
  }, [], sectionRef)

  // Smooth slide transition when card changes
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0.3, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
      )
    }
  }, [startIndex])

  const visibleCards = [
    testimonialsList[startIndex % testimonialsList.length],
    testimonialsList[(startIndex + 1) % testimonialsList.length]
  ]

  return (
    <section id="about" className="testimonials-section" ref={sectionRef}>
      <div className="container testimonials-layout">
        {/* Left Side */}
        <div className="testimonials-left">
          <span className="eyebrow-tag">CLIENTS LOVE US</span>
          <h2 className="section-title-light">What Our<br />Clients Say</h2>
          
          <div className="testimonials-nav-btns">
            <button 
              className="nav-circle-btn" 
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="nav-circle-btn" 
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Carousel Indicator Dots */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                style={{
                  width: startIndex === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: startIndex === i ? 'var(--color-orange)' : 'rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Cards */}
        <div className="testimonials-cards-grid">
          {visibleCards.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div className="quote-icon" style={{ margin: 0 }}>
                    <Quote size={28} fill="#ff5500" strokeWidth={0} />
                  </div>
                  
                  {/* 5 Star Rating */}
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star key={idx} size={14} fill="#ffaa00" color="#ffaa00" />
                    ))}
                  </div>
                </div>

                <p className="testimonial-quote">{item.quote}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="testimonial-author">
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    className="author-avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=ff5500&color=fff`
                    }}
                  />
                  <div className="author-info">
                    <span className="author-name">{item.name}</span>
                    <span className="author-role">{item.role} • {item.company}</span>
                  </div>
                </div>

                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '5px', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  color: 'rgba(255, 255, 255, 0.5)'
                }}>
                  <CheckCircle2 size={12} color="var(--color-orange)" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
