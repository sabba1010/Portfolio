import React from 'react'
import { ArrowRight } from 'lucide-react'

const projectsData = [
  {
    id: 'next-gen-headphones',
    badge: '3D Website',
    title: 'Next Gen Product Experience',
    year: '2026',
    image: '/headphones_project.jpg',
    link: '#contact'
  },
  {
    id: 'modern-brand',
    badge: 'Branding',
    title: 'Modern Brand Identity',
    year: '2026',
    image: '/brand_project.jpg',
    link: '#contact'
  }
]

export default function FeaturedProjects() {
  return (
    <section id="work" className="projects-section">
      <div className="container projects-layout">
        {/* Left Sidebar */}
        <div className="projects-sidebar">
          <span className="eyebrow-tag">OUR WORK</span>
          <h2 className="section-title-light">Featured<br />Projects</h2>
          <p className="projects-desc">
            A selection of our recent work where creativity meets technology.
          </p>
          <a href="#work" className="btn-outline-light">
            <span>View All Projects</span>
            <div className="circle-icon">
              <ArrowRight size={15} strokeWidth={2.5} />
            </div>
          </a>
        </div>

        {/* Right Cards Showcase */}
        <div className="projects-cards-row">
          {projectsData.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-wrap">
                <span className="project-badge">{project.badge}</span>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                  loading="lazy" 
                />
              </div>
              <div className="project-card-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-orange)', letterSpacing: '0.1em' }}>
                    CASE STUDY
                  </span>
                  <span style={{ fontSize: '12px', color: '#6e7587', fontWeight: 600 }}>
                    {project.year}
                  </span>
                </div>
                <h3 className="project-card-title">{project.title}</h3>
                <a href={project.link} className="project-link">
                  <span>View Project</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
