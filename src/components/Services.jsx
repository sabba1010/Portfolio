import React from 'react'
import { 
  Box, 
  Monitor, 
  PenTool, 
  ShoppingCart, 
  BarChart3, 
  Layers, 
  ArrowRight 
} from 'lucide-react'

const servicesData = [
  {
    id: '3d-web',
    icon: Box,
    title: '3D & Interactive Web',
    desc: 'Scroll animations, 3D scenes, WebGL, Three.js'
  },
  {
    id: 'web-dev',
    icon: Monitor,
    title: 'Website Development',
    desc: 'Modern, fast and scalable websites with React / Next.js'
  },
  {
    id: 'branding',
    icon: PenTool,
    title: 'Brand & UI/UX Design',
    desc: 'Clean, modern and conversion focused design'
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    desc: 'Custom online stores that drive results'
  },
  {
    id: 'web-apps',
    icon: BarChart3,
    title: 'Web Applications',
    desc: 'Powerful web apps for modern businesses'
  },
  {
    id: 'support',
    icon: Layers,
    title: 'Ongoing Support',
    desc: "We're with you even after launch"
  }
]

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container services-layout">
        {/* Left Column info */}
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

        {/* Right 6 Cards Grid */}
        <div className="services-grid">
          {servicesData.map((item) => {
            const IconComponent = item.icon
            return (
              <div key={item.id} className="service-card">
                <div className="service-icon-wrap">
                  <IconComponent size={22} strokeWidth={2} />
                </div>
                <h3 className="service-card-title">{item.title}</h3>
                <p className="service-card-desc">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
