import React, { useState, useRef } from 'react'
import { useGsapContext } from '../hooks/useGsap'
import { 
  Box, 
  Monitor, 
  PenTool, 
  ShoppingCart, 
  BarChart3, 
  Layers, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react'

const servicesData = [
  {
    id: '3d-web',
    num: '01',
    icon: Box,
    title: '3D & Interactive Web',
    desc: 'Scroll animations, 3D scenes, WebGL, Three.js',
    tags: ['Three.js', 'WebGL', 'Shaders']
  },
  {
    id: 'web-dev',
    num: '02',
    icon: Monitor,
    title: 'Website Development',
    desc: 'Modern, fast and scalable websites with React / Next.js',
    tags: ['React 19', 'Vite', 'Next.js']
  },
  {
    id: 'branding',
    num: '03',
    icon: PenTool,
    title: 'Brand & UI/UX Design',
    desc: 'Clean, modern and conversion focused design',
    tags: ['Figma', 'Design System', 'UI/UX']
  },
  {
    id: 'ecommerce',
    num: '04',
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    desc: 'Custom online stores that drive results',
    tags: ['Shopify', 'Stripe', 'Headless']
  },
  {
    id: 'web-apps',
    num: '05',
    icon: BarChart3,
    title: 'Web Applications',
    desc: 'Powerful web apps for modern businesses',
    tags: ['Cloud', 'APIs', 'Real-time']
  },
  {
    id: 'support',
    num: '06',
    icon: Layers,
    title: 'Ongoing Support',
    desc: "We're with you even after launch",
    tags: ['Maintenance', 'Speed', 'SEO']
  }
]

// Service Card with 3D Perspective Tilt on Mouse Move
function TiltServiceCard({ item, index }) {
  const [tiltStyle, setTiltStyle] = useState({})
  const IconComponent = item.icon

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`,
      transition: 'transform 0.1s ease-out',
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    })
  }

  return (
    <div 
      className="service-card"
      style={{
        ...tiltStyle,
        transitionDelay: `${index * 0.08}s`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Watermark Number */}
      <span className="service-watermark">{item.num}</span>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
        <div className="service-icon-wrap">
          <IconComponent size={22} strokeWidth={2.2} />
        </div>
        <div className="service-arrow-wrap">
          <ArrowUpRight size={17} />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 className="service-card-title">{item.title}</h3>
        <p className="service-card-desc">{item.desc}</p>
      </div>

      {/* Tech Tags */}
      <div className="service-tags-row">
        {item.tags.map((tag) => (
          <span key={tag} className="service-tag-chip">{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)

  useGsapContext(({ gsap }) => {
    // Info Column entrance
    gsap.from('.services-info', {
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

    // Staggered grid cards entrance
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      opacity: 0,
      y: 50,
      scale: 0.96,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    })
  }, [], sectionRef)

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="container services-layout">
        {/* Left Column */}
        <div className="services-info">
          <span className="eyebrow-tag">WHAT WE DO</span>
          <h2 className="section-title-dark">
            Digital<br />
            Experiences<br />
            That Matter
          </h2>
          <p className="services-desc">
            We combine design, technology and creativity to build immersive
            digital products that help brands stand out.
          </p>

          <a href="#work" className="btn-outline-dark">
            <span>Explore Services</span>
            <div className="circle-icon">
              <ArrowRight size={15} strokeWidth={2.5} />
            </div>
          </a>
        </div>

        {/* Right 6 Cards Grid with 3D Tilt */}
        <div className="services-grid">
          {servicesData.map((item, index) => (
            <TiltServiceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
