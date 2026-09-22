import React, { useState, useRef, useEffect } from 'react'
import { 
  Sparkles, 
  Cpu, 
  Box, 
  Flame, 
  Award
} from 'lucide-react'
import HeroCanvas from './HeroCanvas'
import CtaBanner from './CtaBanner'
import { useGsapContext } from '../hooks/useGsap'

function TwitterIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedinIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66.92 0 1.66-.74 1.66-1.66A1.66 1.66 0 0 0 7.83 6.2z" />
    </svg>
  )
}

function GithubIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

const coreValues = [
  {
    num: '01',
    title: 'Relentless Craft',
    desc: 'We obsess over every pixel, micro-interaction, and millisecond of latency. If it is not extraordinary, it does not leave our studio.',
    icon: Flame,
    color: '#ff5500'
  },
  {
    num: '02',
    title: 'Spatial 3D Thinking',
    desc: 'The web is no longer flat. We design in three dimensions, blending real-time lighting, depth physics, and WebGL shaders.',
    icon: Box,
    color: '#ff7722'
  },
  {
    num: '03',
    title: 'Radical Performance',
    desc: 'Heavy visuals must never mean slow loading. We engineer aggressive asset compression, shader culling, and 120fps GPU pipelines.',
    icon: Cpu,
    color: '#ff9933'
  },
  {
    num: '04',
    title: 'Measurable Impact',
    desc: 'Beauty that drives revenue. Our immersive digital experiences generate dramatic spikes in session duration and user conversion.',
    icon: Award,
    color: '#ffaa44'
  }
]

const techArsenal = [
  { name: 'Three.js & WebGL', level: 'Mastery', role: 'Core 3D Engine', tag: '3D Graphics' },
  { name: 'Spline 3D', level: 'Official Partner', role: 'Interactive 3D Scenes', tag: 'Modeling' },
  { name: 'GLSL Shaders', level: 'Advanced', role: 'Procedural Lighting & Particles', tag: 'Math & GPU' },
  { name: 'React 19 & Vite', level: 'Cutting Edge', role: 'Modern UI Architecture', tag: 'Frontend' },
  { name: 'GSAP & ScrollTrigger', level: 'Gold Standard', role: 'Choreographed Motion', tag: 'Animation' },
  { name: 'Blender & Cinema4D', level: 'High-Poly & PBR', role: 'Asset Design & Baking', tag: 'Design' },
  { name: 'TypeScript & Next.js', level: 'Enterprise', role: 'Scalable Fullstack Systems', tag: 'Architecture' },
  { name: 'WebGPU Pipeline', level: 'Next Gen', role: 'Future-Proof Performance', tag: 'Next Tech' }
]

const teamMembers = [
  {
    name: 'Daniel Kim',
    role: 'Founder & Creative Director',
    bio: 'Pioneering spatial web design with 8+ years experience in Three.js, generative shaders, and digital art direction.',
    image: '/avatar_daniel.jpg',
    specialty: 'Creative Direction & 3D Web',
    social: { twitter: '#', linkedin: '#', github: '#' }
  },
  {
    name: 'Sarah Lee',
    role: 'Lead 3D & Technical Artist',
    bio: 'Former game industry environment artist crafting tactile PBR materials, optimized 3D geometry, and lighting physics.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    specialty: '3D Modeling & Shader Art',
    social: { twitter: '#', linkedin: '#', github: '#' }
  },
  {
    name: 'Marcus Vance',
    role: 'Principal WebGL Engineer',
    bio: 'WebGL mathematics and GPU optimization specialist ensuring silky 120fps performance on high-end 3D architectures.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    specialty: 'WebGL Shaders & Performance',
    social: { twitter: '#', linkedin: '#', github: '#' }
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Brand & Experience',
    bio: 'Obsessed with micro-interactions, editorial typography, and high-conversion brand narratives for tech enterprises.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    specialty: 'Spatial UX & Design Systems',
    social: { twitter: '#', linkedin: '#', github: '#' }
  }
]

const milestones = [
  {
    year: '2021',
    title: 'Studio Inception',
    desc: 'Founded with a mission to liberate digital agencies from flat, lifeless websites and introduce tactile 3D spatial dimensions.'
  },
  {
    year: '2022',
    title: 'First Major WebGL Win',
    desc: 'Engineered an interactive 3D configurator for an international EV brand that generated +240% user engagement.'
  },
  {
    year: '2023',
    title: 'Awwwards Site of the Day',
    desc: 'Awarded global recognition for innovative WebGL shader integration and fluid scroll choreographies.'
  },
  {
    year: '2024',
    title: 'Global Studio Expansion',
    desc: 'Scaled to 30+ international clients across Silicon Valley, Tokyo, London, and Berlin with a fully distributed elite team.'
  },
  {
    year: '2026',
    title: 'The Spatial Web Frontier',
    desc: 'Leading the intersection of Three.js, Spline, and WebGPU to pioneer the next generation of web software.'
  }
]

// 3D Tilt Card Component
function TiltCard({ children, className = '' }) {
  const [style, setStyle] = useState({})

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`,
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

export default function AboutPage({ onNavigateHome }) {
  const pageRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useGsapContext(({ gsap }) => {
    // Hero entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
    tl.from('.about-hero-breadcrumb', { opacity: 0, y: 15, duration: 0.6 })
      .from('.about-hero-title', { opacity: 0, y: 35, duration: 0.9 }, '-=0.35')
      .from('.about-hero-subtitle', { opacity: 0, y: 20, duration: 0.75 }, '-=0.5')
      .from('.about-credibility-bar', { opacity: 0, y: 20, duration: 0.75 }, '-=0.5')

    // Staggered reveal for Story section
    gsap.from('.about-story-col', {
      scrollTrigger: {
        trigger: '.about-story-section',
        start: 'top 82%',
        once: true
      },
      opacity: 0,
      y: 45,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      clearProps: 'all'
    })

    // Staggered reveal for Value cards
    gsap.from('.about-value-card', {
      scrollTrigger: {
        trigger: '.about-values-grid',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 45,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'all'
    })

    // Tech arsenal stagger
    gsap.from('.about-tech-card', {
      scrollTrigger: {
        trigger: '.about-tech-grid',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 35,
      duration: 0.75,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'all'
    })

    // Team members stagger
    gsap.from('.about-team-card', {
      scrollTrigger: {
        trigger: '.about-team-grid',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 50,
      duration: 0.95,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'all'
    })

    // Timeline items stagger
    gsap.from('.about-timeline-item', {
      scrollTrigger: {
        trigger: '.about-timeline-wrap',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      x: -30,
      duration: 0.85,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'all'
    })
  }, [], pageRef)

  return (
    <div className="about-page-wrap" ref={pageRef}>
      {/* =================================================================
          1. ABOUT HERO SECTION (with Three.js Volcanic Embers)
          ================================================================= */}
      <section className="about-hero-section">
        <HeroCanvas />

        <div className="container about-hero-container">
          <div className="about-hero-breadcrumb">
            <a 
              href="#/" 
              className="breadcrumb-link"
              onClick={(e) => {
                e.preventDefault()
                if (onNavigateHome) {
                  onNavigateHome()
                }
              }}
            >
              Home
            </a>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">About Us</span>
          </div>

          <div className="hero-eyebrow-wrap" style={{ marginTop: '14px', marginBottom: '18px' }}>
            <span className="eyebrow-accent">DISCOVER OUR MISSION</span>
            <span className="eyebrow-normal">AND PHILOSOPHY</span>
          </div>

          <h1 className="about-hero-title">
            Where Digital Art Meets <br />
            <span className="highlight-3d">Spatial 3D</span> Code
          </h1>

          <p className="about-hero-subtitle">
            Velotech Studio is an international creative technology studio bridging code, art, 
            and human immersion. We engineer bespoke 3D web experiences that elevate visionary 
            brands into digital landmarks.
          </p>

          {/* Credibility Stats Pill */}
          <div className="about-credibility-bar">
            <div className="credibility-item">
              <span className="credibility-val">5+</span>
              <span className="credibility-label">Years of Craft</span>
            </div>
            <div className="credibility-div" />
            <div className="credibility-item">
              <span className="credibility-val">30+</span>
              <span className="credibility-label">Global Clients</span>
            </div>
            <div className="credibility-div" />
            <div className="credibility-item">
              <span className="credibility-val">12</span>
              <span className="credibility-label">Industry Awards</span>
            </div>
            <div className="credibility-div" />
            <div className="credibility-item">
              <span className="credibility-val">100%</span>
              <span className="credibility-label">Remote & Global</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. OUR STORY & GENESIS
          ================================================================= */}
      <section className="about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-col">
            <span className="eyebrow-tag">THE GENESIS</span>
            <h2 className="section-title-light">
              We Built Velotech to Break the Monotony of Flat Web
            </h2>
            <p className="about-text-p">
              In an era where most websites are built with cookie-cutter templates and uninspired grids, 
              Velotech Studio was born to challenge the status quo. We believe that visiting a website 
              should feel like entering an architecturally stunning physical exhibition.
            </p>
            <p className="about-text-p">
              By uniting high-level 3D design, real-time WebGL graphics, and razor-sharp engineering, 
              we turn everyday digital browsing into sensory, emotional, and memorable journeys.
            </p>

            <div className="story-metrics-grid">
              <div className="story-metric-box">
                <span className="metric-box-num">140%</span>
                <span className="metric-box-sub">Avg. Engagement Surge</span>
              </div>
              <div className="story-metric-box">
                <span className="metric-box-num">60+</span>
                <span className="metric-box-sub">Projects Worldwide</span>
              </div>
            </div>
          </div>

          <div className="about-story-col">
            <TiltCard className="story-quote-card">
              <div className="quote-badge-pill">
                <Sparkles size={13} color="var(--color-orange)" />
                <span>FOUNDER MANIFESTO</span>
              </div>
              <blockquote className="founder-quote">
                “Code is not just functionality—code is our digital chisel. With WebGL, shaders, 
                and physics, we give websites a heart, weight, and presence that users never forget.”
              </blockquote>
              <div className="founder-footer">
                <div className="founder-avatar-wrap">
                  <img src="/avatar_daniel.jpg" alt="Daniel Kim" className="founder-avatar" />
                </div>
                <div>
                  <h4 className="founder-name">Daniel Kim</h4>
                  <p className="founder-title">Founder & Creative Technologist</p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. OUR CORE PILLARS (VALUES)
          ================================================================= */}
      <section className="about-values-section">
        <div className="container">
          <div className="about-section-header">
            <span className="eyebrow-tag">OUR CORE PRINCIPLES</span>
            <h2 className="section-title-light">
              The 4 Pillars That Drive Every Pixel
            </h2>
            <p className="section-header-desc">
              How we approach creative engineering with zero compromises on quality, craft, and speed.
            </p>
          </div>

          <div className="about-values-grid">
            {coreValues.map((val) => {
              const Icon = val.icon
              return (
                <TiltCard key={val.num} className="about-value-card">
                  <div className="value-card-top">
                    <span className="value-number">{val.num}</span>
                    <div className="value-icon-box">
                      <Icon size={20} color={val.color} />
                    </div>
                  </div>
                  <h3 className="value-card-title">{val.title}</h3>
                  <p className="value-card-desc">{val.desc}</p>
                </TiltCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          4. THE 3D ARSENAL (TECH STACK)
          ================================================================= */}
      <section className="about-tech-section">
        <div className="container">
          <div className="about-section-header">
            <span className="eyebrow-tag">CREATIVE WEAPONRY</span>
            <h2 className="section-title-light">
              Our 3D & Engineering Arsenal
            </h2>
            <p className="section-header-desc">
              We leverage an elite toolchain designed to deliver museum-grade 3D graphics on any device.
            </p>
          </div>

          <div className="about-tech-grid">
            {techArsenal.map((tech) => (
              <div key={tech.name} className="about-tech-card">
                <div className="tech-card-header">
                  <span className="tech-tag-badge">{tech.tag}</span>
                  <span className="tech-level-pill">{tech.level}</span>
                </div>
                <h4 className="tech-name">{tech.name}</h4>
                <p className="tech-role">{tech.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          5. LEADERSHIP & TEAM
          ================================================================= */}
      <section className="about-team-section">
        <div className="container">
          <div className="about-section-header">
            <span className="eyebrow-tag">THE CRAFTSMEN</span>
            <h2 className="section-title-light">
              Meet the Creative Minds
            </h2>
            <p className="section-header-desc">
              A tight-knit collective of creative directors, WebGL engineers, 3D artists, and spatial designers.
            </p>
          </div>

          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <TiltCard key={member.name} className="about-team-card">
                <div className="team-img-wrap">
                  <img src={member.image} alt={member.name} className="team-img" loading="lazy" />
                  <div className="team-specialty-pill">{member.specialty}</div>
                </div>
                <div className="team-info-body">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                  <p className="team-member-bio">{member.bio}</p>
                  
                  <div className="team-social-row">
                    <a href={member.social.twitter} className="team-social-icon" aria-label="Twitter">
                      <TwitterIcon size={14} />
                    </a>
                    <a href={member.social.linkedin} className="team-social-icon" aria-label="LinkedIn">
                      <LinkedinIcon size={14} />
                    </a>
                    <a href={member.social.github} className="team-social-icon" aria-label="GitHub">
                      <GithubIcon size={14} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          6. STUDIO MILESTONES TIMELINE
          ================================================================= */}
      <section className="about-timeline-section">
        <div className="container">
          <div className="about-section-header">
            <span className="eyebrow-tag">OUR JOURNEY</span>
            <h2 className="section-title-light">
              Studio Milestones
            </h2>
            <p className="section-header-desc">
              Key turning points in our mission to reshape the modern web.
            </p>
          </div>

          <div className="about-timeline-wrap">
            <div className="timeline-center-line" />
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div key={item.year} className={`about-timeline-item ${isEven ? 'timeline-left' : 'timeline-right'}`}>
                  <div className="timeline-dot">
                    <div className="timeline-dot-inner" />
                  </div>
                  <div className="timeline-content-card">
                    <span className="timeline-year-tag">{item.year}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          7. CTA BANNER
          ================================================================= */}
      <CtaBanner />
    </div>
  )
}
