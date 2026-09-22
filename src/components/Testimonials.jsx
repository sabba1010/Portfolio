import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonialsList = [
  {
    id: 1,
    quote: '“Velotech Studio delivered an amazing website for our brand. The 3D experience blew our minds!”',
    name: 'Daniel Kim',
    role: 'Founder, Elevate',
    avatar: '/avatar_daniel.jpg'
  },
  {
    id: 2,
    quote: '“Professional, creative and technically outstanding. Highly recommended!”',
    name: 'Sarah Lee',
    role: 'CEO, NovaTech',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    quote: '“The attention to detail and Three.js performance optimization exceeded our wildest expectations.”',
    name: 'Marcus Vance',
    role: 'Product Lead, Apex Dynamics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
]

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? testimonialsList.length - 2 : prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev >= testimonialsList.length - 2 ? 0 : prev + 1))
  }

  const visibleCards = [
    testimonialsList[startIndex % testimonialsList.length],
    testimonialsList[(startIndex + 1) % testimonialsList.length]
  ]

  return (
    <section id="about" className="testimonials-section">
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
        </div>

        {/* Right Cards */}
        <div className="testimonials-cards-grid">
          {visibleCards.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div>
                <div className="quote-icon">
                  <Quote size={28} fill="#ff5500" strokeWidth={0} />
                </div>
                <p className="testimonial-quote">{item.quote}</p>
              </div>

              <div className="testimonial-author">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="author-avatar"
                  onError={(e) => {
                    // Fallback to stylized initial if image fails
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=ff5500&color=fff`
                  }}
                />
                <div className="author-info">
                  <span className="author-name">{item.name}</span>
                  <span className="author-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
