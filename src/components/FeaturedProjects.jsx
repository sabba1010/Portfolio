import React, { useState, useRef } from 'react'
import { ArrowRight, Sparkles, X, Eye } from 'lucide-react'
import { useGsapContext } from '../hooks/useGsap'
import SectionCanvas from './SectionCanvas'

const projectsData = [
  {
    id: 'next-gen-headphones',
    badge: '3D Website',
    title: 'Next Gen Product Experience',
    client: 'AURA Audio Labs',
    year: '2026',
    image: '/headphones_project.jpg',
    description: 'An interactive WebGL 3D product visualizer for next-generation spatial audio headphones. Users can rotate, disassemble components, explore acoustic chambers, and customize RGB LED lighting in real time with physics-based rendering.',
    metrics: ['+140% Time on Site', '4.9/5 User Rating', 'FWA of the Day']
  },
  {
    id: 'modern-brand',
    badge: 'Branding',
    title: 'Modern Brand Identity',
    client: 'AXON Quantum',
    year: '2026',
    image: '/brand_project.jpg',
    description: 'Complete brand identity, packaging design, and 3D web platform for a luxury monolithic quantum hardware startup. Featuring dark minimalist aesthetic, custom typography, and gold-standard tactile packaging renders.',
    metrics: ['Red Dot Nominee', '+85% Inbound Inquiries', '$4.2M Seed Raised']
  }
]

// 3D Tilt Project Card
function TiltProjectCard({ project, onSelect }) {
  const [tiltStyle, setTiltStyle] = useState({})

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`,
      transition: 'transform 0.1s ease-out',
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    })
  }

  return (
    <div 
      className="project-card"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      <div className="project-image-wrap">
        <span className="project-badge">{project.badge}</span>
        <div className="project-hover-overlay">
          <button className="project-view-btn">
            <Eye size={16} />
            <span>Quick View</span>
          </button>
        </div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="project-image"
          loading="lazy" 
        />
      </div>
      
      <div className="project-card-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-orange)', letterSpacing: '0.12em' }}>
            {project.client.toUpperCase()}
          </span>
          <span style={{ fontSize: '12px', color: '#6e7587', fontWeight: 600 }}>
            {project.year}
          </span>
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        
        <div className="project-link" style={{ cursor: 'pointer' }}>
          <span>View Case Study</span>
          <ArrowRight size={14} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)

  useGsapContext(({ gsap }) => {
    // Sidebar Entrance
    gsap.from('.projects-sidebar', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      opacity: 0,
      x: -45,
      duration: 1,
      ease: 'power3.out',
      clearProps: 'all'
    })

    // Staggered Cards Entrance
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-cards-row',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      opacity: 0,
      y: 60,
      duration: 1.1,
      stagger: 0.2,
      ease: 'power3.out',
      clearProps: 'all'
    })

    // Parallax on each card's inner image
    const cards = gsap.utils.toArray('.project-card')
    cards.forEach((card) => {
      const img = card.querySelector('.project-image')
      if (img) {
        gsap.to(img, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          },
          yPercent: 10,
          ease: 'none'
        })
      }
    })
  }, [], sectionRef)

  return (
    <section id="work" className="projects-section" ref={sectionRef}>
      <SectionCanvas variant="constellation" />
      <div className="container projects-layout">
        {/* Left Sidebar */}
        <div className="projects-sidebar">
          <span className="eyebrow-tag">OUR WORK</span>
          <h2 className="section-title-light">Featured<br />Projects</h2>
          <p className="projects-desc">
            A selection of our recent work where creativity meets cutting-edge technology.
          </p>
          <a href="#contact" className="btn-outline-light">
            <span>View All Projects</span>
            <div className="circle-icon">
              <ArrowRight size={15} strokeWidth={2.5} />
            </div>
          </a>
        </div>

        {/* Right Cards Showcase with 3D Tilt */}
        <div className="projects-cards-row">
          {projectsData.map((project) => (
            <TiltProjectCard 
              key={project.id} 
              project={project} 
              onSelect={setSelectedProject} 
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
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
          onClick={() => setSelectedProject(null)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              background: '#101217',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 85, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '32px 36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="project-badge" style={{ position: 'static' }}>{selectedProject.badge}</span>
                <span style={{ fontSize: '13px', color: 'var(--color-orange)', fontWeight: 700 }}>
                  {selectedProject.client}
                </span>
              </div>
              
              <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', marginBottom: '14px' }}>
                {selectedProject.title}
              </h3>
              
              <p style={{ color: '#9ba2b3', fontSize: '14.5px', lineHeight: '1.65', marginBottom: '24px' }}>
                {selectedProject.description}
              </p>

              {/* Metrics */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {selectedProject.metrics.map((m) => (
                  <span key={m} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'rgba(255, 85, 0, 0.12)',
                    border: '1px solid rgba(255, 85, 0, 0.3)',
                    padding: '6px 14px',
                    borderRadius: '999px'
                  }}>
                    <Sparkles size={12} color="var(--color-orange)" />
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
