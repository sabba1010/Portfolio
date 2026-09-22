import React, { useState, useRef, useEffect } from 'react'
import { 
  Sparkles, 
  Palette, 
  Package, 
  Code2, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Send
} from 'lucide-react'
import HeroCanvas from './HeroCanvas'
import CtaBanner from './CtaBanner'
import SectionCanvas from './SectionCanvas'
import { useGsapContext } from '../hooks/useGsap'

const serviceCategories = [
  { id: 'all', label: 'All Services' },
  { id: 'design', label: 'Graphic Design' },
  { id: 'packaging', label: 'Packaging Design' },
  { id: 'development', label: 'Custom Web Dev' },
  { id: 'cms', label: 'Shopify / WP / Wix' },
]

const servicesList = [
  {
    id: 'graphic-design',
    category: 'design',
    num: '01',
    icon: Palette,
    accentColor: '#ff5500',
    title: 'Graphic Design & Brand Systems',
    subtitle: 'Identity Design • Typography • Visual Systems • Art Direction',
    overview: 'We forge memorable visual identities and design languages that communicate prestige, authority, and emotional resonance across both digital interfaces and print media.',
    highlights: [
      'Bespoke Brand Identity & Primary Logomark Architecture',
      'Comprehensive Design Systems & Visual Brand Guidelines',
      'Custom Editorial Typography & Hierarchy Rules',
      'High-Resolution Vector Assets & Digital Iconography',
      'Marketing Collateral, Pitch Decks & Social Media Asset Kits'
    ],
    deliverables: ['Brand Guidelines PDF', 'Master Vector Library', 'Design Tokens', 'Social Design Kit', 'Commercial Font Licenses'],
    tools: ['Figma', 'Adobe Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
    metric: '+180% Brand Recall'
  },
  {
    id: 'packaging-design',
    category: 'packaging',
    num: '02',
    icon: Package,
    accentColor: '#ff6e14',
    title: 'Packaging Design & 3D Tactile Visualization',
    subtitle: 'Luxury Structural Packaging • 3D Box & Bottle CGI • Unboxing Design',
    overview: 'We turn physical product packaging into tactile works of art. From factory-ready dielines and foil stamp finishes to photorealistic 3D CGI unboxing animations for luxury and consumer brands.',
    highlights: [
      'Custom Structural Packaging & Precision Die-Cut Lines',
      'Specialty Finish Specs (Embossing, Debossing, Foil Stamping, Spot UV)',
      'Photorealistic 3D Product & Packaging CGI Renders (Bottle, Box, Tub)',
      'Cinematic 3D Unboxing & Assembly Animations',
      'Material & Sustainable Substrate Advisory for Manufacturing'
    ],
    deliverables: ['Production-Ready Dielines', 'CMYK + Pantone Print Files', '4K 3D CGI Renders', 'Interactive 3D Web Models', 'Manufacturer Tech Packs'],
    tools: ['Blender', 'Cinema 4D', 'Octane Render', 'Adobe InDesign', 'Substance 3D'],
    metric: '100% Production Ready'
  },
  {
    id: 'custom-web-development',
    category: 'development',
    num: '03',
    icon: Code2,
    accentColor: '#ff8528',
    title: 'Custom Web Development & 3D Spatial Web',
    subtitle: 'Three.js • WebGL Shaders • React 19 • GSAP Motion • Zero Templates',
    overview: 'We architect bespoke digital platforms engineered entirely from scratch. Combining real-time 3D graphics, procedural WebGL shaders, and silky 120fps motion for brands that refuse to blend into 2D templates.',
    highlights: [
      'Interactive Three.js & WebGL 3D Experience Engineering',
      'Spline 3D Scene Integration with Live Cursor & Physics Tracking',
      'Custom GLSL Shader Programming (Lava, Magma, Bloom, Distortion)',
      'Next-Gen React 19 & Vite Architecture with Sub-Second Load Speeds',
      'GSAP & ScrollTrigger Cinematic Choreographed Timelines'
    ],
    deliverables: ['Full Source Codebase', 'WebGL Shader Pipeline', 'Zero-Downtime CI/CD', 'SEO & Performance Audit', '120fps Mobile Optimization'],
    tools: ['Three.js', 'WebGL / GLSL', 'React 19', 'GSAP', 'Vite', 'TypeScript'],
    metric: '120fps Smooth Motion'
  },
  {
    id: 'cms-solutions',
    category: 'cms',
    num: '04',
    icon: ShoppingBag,
    accentColor: '#ff993c',
    title: 'Enterprise CMS: Shopify, WordPress & Wix Studio',
    subtitle: 'Shopify Plus • Custom Liquid • Headless WP • Advanced Wix Studio',
    overview: 'We develop high-performance, easily manageable content management systems tailored to client operational needs—from high-conversion Shopify stores to enterprise WordPress builds and bespoke Wix Studio setups.',
    highlights: [
      'Shopify & Shopify Plus: Bespoke Liquid Theme Development & Checkout Customization',
      'WordPress & WooCommerce: Custom Headless Architectures & Custom Plugin Modules',
      'Wix Studio: Advanced Responsive Layouts, Fluid Animations & Velo by Wix Scripting',
      'High-Conversion E-Commerce UX with Fast Checkout & Payment Gateways',
      'Full CMS Admin Training & Effortless Content Editing Workflows'
    ],
    deliverables: ['Custom CMS Theme', 'Payment Gateway Integration', 'Inventory & CRM Sync', 'Admin Video Walkthroughs', 'Speed Optimization Guarantee'],
    tools: ['Shopify Liquid', 'WordPress / Headless', 'Wix Studio', 'WooCommerce', 'Stripe'],
    metric: '+95% Checkout Conversion'
  }
]

const engagementTiers = [
  {
    title: 'Sprint / Project',
    tag: 'FOCUSED DELIVERY',
    desc: 'Ideal for launching a standalone 3D website, packaging design, or brand identity with fixed milestones.',
    features: ['Defined timeline & deliverables', 'Direct Senior Creative Technologist', 'Fixed budget guarantee', 'Post-launch 30-day warranty']
  },
  {
    title: 'Dedicated Retainer',
    tag: 'MOST POPULAR',
    isPopular: true,
    desc: 'Continuous design, 3D art, and engineering firepower reserved exclusively for your brand every month.',
    features: ['Dedicated monthly development hours', 'Priority task queue & instant Slack channel', 'Ongoing 3D & WebGL feature updates', 'Proactive performance & SEO tuning']
  },
  {
    title: 'Enterprise Transformation',
    tag: 'FULL OVERHAUL',
    desc: 'Complete end-to-end transformation: visual brand identity, packaging, custom 3D web platform, and CMS.',
    features: ['Complete brand to code execution', 'Custom 3D model & packaging asset creation', 'Shopify / WordPress / Custom Next.js build', 'Quarterly roadmap & strategic advisory']
  }
]

// 3D Tilt Card Container
function TiltCard({ children, className = '' }) {
  const [style, setStyle] = useState({})

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
      transition: 'transform 0.1s ease-out'
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    })
  }

  return (
    <div
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default function ServicesPage({ onNavigateHome }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const pageRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredServices = activeCategory === 'all' 
    ? servicesList 
    : servicesList.filter(s => s.category === activeCategory)

  useGsapContext(({ gsap }) => {
    // Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
    tl.from('.services-hero-breadcrumb', { opacity: 0, y: 15, duration: 0.6 })
      .from('.services-hero-title', { opacity: 0, y: 35, duration: 0.9 }, '-=0.35')
      .from('.services-hero-sub', { opacity: 0, y: 20, duration: 0.75 }, '-=0.5')
      .from('.services-category-tabs', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')

    // Staggered service deep-dive cards
    gsap.from('.service-deep-card', {
      scrollTrigger: {
        trigger: '.services-cards-stack',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 50,
      duration: 0.95,
      stagger: 0.16,
      ease: 'power3.out',
      clearProps: 'all'
    })

    // Engagement tiers stagger
    gsap.from('.engagement-tier-card', {
      scrollTrigger: {
        trigger: '.engagement-tiers-grid',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 45,
      duration: 0.9,
      stagger: 0.14,
      ease: 'power3.out',
      clearProps: 'all'
    })
  }, [], pageRef)

  const handleOpenQuote = (serviceTitle) => {
    setSelectedService(serviceTitle)
    setModalOpen(true)
  }

  const handleModalSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setModalOpen(false)
    }, 2400)
  }

  return (
    <div className="services-page-wrap" ref={pageRef}>
      {/* =================================================================
          1. SERVICES HERO (with Volcanic Three.js Embers)
          ================================================================= */}
      <section className="services-hero-section">
        <HeroCanvas />

        <div className="container services-hero-container">
          <div className="services-hero-breadcrumb">
            <a 
              href="#/" 
              className="breadcrumb-link"
              onClick={(e) => {
                e.preventDefault()
                if (onNavigateHome) onNavigateHome()
              }}
            >
              Home
            </a>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Services</span>
          </div>

          <div className="hero-eyebrow-wrap" style={{ marginTop: '14px', marginBottom: '18px' }}>
            <span className="eyebrow-accent">DISCOVER OUR DISCIPLINES</span>
            <span className="eyebrow-normal">AND CAPABILITIES</span>
          </div>

          <h1 className="services-hero-title">
            Crafted For Immersion. <br />
            <span className="highlight-3d">Engineered</span> For High Impact.
          </h1>

          <p className="services-hero-sub">
            From high-converting brand identities and luxury 3D packaging to custom WebGL web apps 
            and scalable CMS platforms—we build digital assets that captivate audiences.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="services-category-tabs">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                className={`service-tab-btn ${activeCategory === cat.id ? 'active-tab' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          2. DETAILED SERVICE DEEP-DIVES
          ================================================================= */}
      <section className="services-showcase-section">
        <div className="container">
          <div className="about-section-header" style={{ marginBottom: '56px' }}>
            <span className="eyebrow-tag">SPECIALIZED DISCIPLINES</span>
            <h2 className="section-title-dark">
              High-Impact Creative Solutions
            </h2>
            <p className="section-header-desc" style={{ color: 'var(--light-text-muted)' }}>
              Bespoke execution tailored to elevate visionary brands and drive measurable business growth.
            </p>
          </div>

          <div className="services-cards-stack">
          {filteredServices.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.id} className="service-deep-card">
                <div className="service-card-left">
                  <div className="service-deep-header">
                    <span className="service-deep-num">{service.num}</span>
                    <div className="service-deep-icon-box">
                      <Icon size={24} color={service.accentColor} />
                    </div>
                  </div>

                  <h2 className="service-deep-title">{service.title}</h2>
                  <p className="service-deep-subtitle">{service.subtitle}</p>
                  <p className="service-deep-overview">{service.overview}</p>

                  {/* Highlights List with Checkmarks */}
                  <div className="service-highlights-list">
                    {service.highlights.map((item, idx) => (
                      <div key={idx} className="service-highlight-item">
                        <CheckCircle2 size={16} color="var(--color-orange)" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div style={{ marginTop: '32px' }}>
                    <button 
                      className="btn-primary-orange"
                      onClick={() => handleOpenQuote(service.title)}
                    >
                      <span>Request Scope & Quote</span>
                      <div className="btn-arrow-circle">
                        <ArrowRight size={15} strokeWidth={2.5} />
                      </div>
                    </button>
                  </div>
                </div>

                <div className="service-card-right">
                  {/* Metric Stat Pill */}
                  <div className="service-metric-pill">
                    <Sparkles size={14} color="var(--color-orange)" />
                    <span className="metric-text">{service.metric}</span>
                  </div>

                  {/* Deliverables Block */}
                  <div className="service-meta-block">
                    <h4 className="meta-block-title">Key Deliverables</h4>
                    <div className="meta-chips-wrap">
                      {service.deliverables.map((item, idx) => (
                        <span key={idx} className="deliverable-chip">{item}</span>
                      ))}
                    </div>
                  </div>

                  {/* Toolchain & Tech Stack Block */}
                  <div className="service-meta-block">
                    <h4 className="meta-block-title">Tech Arsenal & Toolchain</h4>
                    <div className="meta-chips-wrap">
                      {service.tools.map((tool, idx) => (
                        <span key={idx} className="tech-tool-chip">{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </section>

      {/* =================================================================
          3. WORKING METHODOLOGY
          ================================================================= */}
      <section className="services-methodology-section">
        <SectionCanvas variant="flow" />
        <div className="container">
          <div className="about-section-header">
            <span className="eyebrow-tag">EXECUTION PLAYBOOK</span>
            <h2 className="section-title-light">
              How We Deliver Museum-Grade Results
            </h2>
            <p className="section-header-desc">
              A structured 4-phase agile methodology designed to eliminate surprises and maximize speed to market.
            </p>
          </div>

          <div className="methodology-grid">
            <TiltCard className="methodology-card">
              <span className="methodology-step">STAGE 01</span>
              <h3 className="methodology-title">Discovery & Strategy</h3>
              <p className="methodology-desc">We deep dive into your business objectives, brand architecture, and user psychology to map out a clear visual and technical blueprint.</p>
            </TiltCard>

            <TiltCard className="methodology-card">
              <span className="methodology-step">STAGE 02</span>
              <h3 className="methodology-title">Design & 3D Prototyping</h3>
              <p className="methodology-desc">We craft high-fidelity UI systems, packaging dielines, and real-time 3D concept scenes in Blender and Figma for rapid validation.</p>
            </TiltCard>

            <TiltCard className="methodology-card">
              <span className="methodology-step">STAGE 03</span>
              <h3 className="methodology-title">Precision Engineering</h3>
              <p className="methodology-desc">We build the production solution with Three.js, React 19, custom Shopify Liquid, or WordPress, rigorously optimizing for 120fps fluid performance.</p>
            </TiltCard>

            <TiltCard className="methodology-card">
              <span className="methodology-step">STAGE 04</span>
              <h3 className="methodology-title">QA, Launch & Growth</h3>
              <p className="methodology-desc">Comprehensive cross-device stress testing, zero-downtime deployment, analytics integration, and 30-day post-launch support.</p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. ENGAGEMENT TIERS
          ================================================================= */}
      <section className="services-tiers-section">
        <div className="container">
          <div className="about-section-header">
            <span className="eyebrow-tag">COLLABORATION MODELS</span>
            <h2 className="section-title-dark">
              Engagement Models Built for Scale
            </h2>
            <p className="section-header-desc" style={{ color: 'var(--light-text-muted)' }}>
              Choose the flexible partnership structure that aligns with your timeline and roadmap.
            </p>
          </div>

          <div className="engagement-tiers-grid">
            {engagementTiers.map((tier) => (
              <TiltCard key={tier.title} className={`engagement-tier-card ${tier.isPopular ? 'popular-tier' : ''}`}>
                {tier.isPopular && <div className="popular-badge">RECOMMENDED PARTNERSHIP</div>}
                <span className="tier-tag">{tier.tag}</span>
                <h3 className="tier-title">{tier.title}</h3>
                <p className="tier-desc">{tier.desc}</p>

                <div className="tier-features-list">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="tier-feat-row">
                      <CheckCircle2 size={15} color="var(--color-orange)" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className="tier-cta-btn"
                  onClick={() => handleOpenQuote(`Engagement Tier: ${tier.title}`)}
                >
                  <span>Select Partnership</span>
                  <ArrowRight size={14} />
                </button>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          5. CTA BANNER
          ================================================================= */}
      <CtaBanner />

      {/* =================================================================
          6. QUICK SERVICE QUOTE MODAL
          ================================================================= */}
      {modalOpen && (
        <div 
          className="service-modal-backdrop"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="service-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {formSubmitted ? (
              <div className="modal-success-state">
                <div className="modal-check-circle">
                  <CheckCircle2 size={36} color="var(--color-orange)" />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Request Received!
                </h3>
                <p style={{ fontSize: '14px', color: '#9aa2b4', lineHeight: 1.6 }}>
                  Thank you! Our technical director will review your scope for <br />
                  <strong style={{ color: 'var(--color-orange)' }}>{selectedService}</strong> and respond within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <span className="eyebrow-tag" style={{ marginBottom: '8px' }}>START A CONVERSATION</span>
                  <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
                    Request Service Scope
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#8d95a6', marginTop: '6px' }}>
                    Inquiring about: <strong style={{ color: 'var(--color-orange)' }}>{selectedService}</strong>
                  </p>
                </div>

                <form onSubmit={handleModalSubmit} className="modal-form-fields">
                  <div>
                    <label className="modal-input-label">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Alex Morgan"
                      className="modal-text-input"
                    />
                  </div>

                  <div>
                    <label className="modal-input-label">Work Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="alex@company.com"
                      className="modal-text-input"
                    />
                  </div>

                  <div>
                    <label className="modal-input-label">Project Details & Approximate Budget</label>
                    <textarea 
                      rows={4}
                      required 
                      placeholder="Tell us about your brand goals, deliverables, and estimated timeline..."
                      className="modal-text-input"
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary-orange" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                    <span>Send Scope Request</span>
                    <Send size={15} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
