import React, { useState, useRef, useEffect } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  FileText,
  UploadCloud,
  X,
  ChevronDown,
  ArrowRight,
  Copy,
  Check,
  Globe,
  MessageSquare,
  Building2,
  CalendarDays,
  Zap
} from 'lucide-react'
import HeroCanvas from './HeroCanvas'
import SectionCanvas from './SectionCanvas'
import { useGsapContext, applyMagneticEffect } from '../hooks/useGsap'

// Project Service Types
const serviceOptions = [
  { id: '3d-web', label: '3D Spatial & WebGL', icon: Sparkles, color: '#ff5500' },
  { id: 'brand', label: 'Brand Identity & Systems', icon: Building2, color: '#ff6e14' },
  { id: 'packaging', label: 'Packaging & 3D CGI', icon: FileText, color: '#ff8528' },
  { id: 'web-app', label: 'Custom Web App (React 19)', icon: Zap, color: '#ff993c' },
  { id: 'ecommerce', label: 'Shopify / E-Commerce', icon: Globe, color: '#ffaa4e' },
  { id: 'retainer', label: 'Dedicated Design Retainer', icon: ShieldCheck, color: '#ffbe6b' },
]

// Budget Ranges
const budgetTiers = [
  { id: 'tier-1', label: '< $10,000', sub: 'Starter / MVP Scope' },
  { id: 'tier-2', label: '$10k - $25k', sub: 'Standard Experience' },
  { id: 'tier-3', label: '$25k - $50k', sub: 'Full Bespoke 3D Web' },
  { id: 'tier-4', label: '$50,000+', sub: 'Enterprise Spatial Platform' },
]

// Project Timelines
const timelineOptions = [
  { id: 'urgent', label: '< 1 Month', sub: 'Fast Track' },
  { id: 'standard', label: '1 - 3 Months', sub: 'Standard Roadmap' },
  { id: 'extended', label: '3 - 6 Months', sub: 'Large Scale Project' },
  { id: 'flexible', label: 'Flexible', sub: 'Exploratory' },
]

// FAQ Items
const contactFaqs = [
  {
    q: 'How quickly can we kick off a new project?',
    a: 'We usually schedule kick-offs within 7 to 14 business days following contract execution and mutual deposit. For emergency fast-track initiatives, our rapid deployment sprint can commence in as few as 72 hours.'
  },
  {
    q: 'Do you work with early-stage startups, or only enterprise brands?',
    a: 'We collaborate with visionary founders of seed-stage and Series A startups, as well as Fortune 500 enterprises and global creative houses. The common thread is an ambition to lead their market with uncompromised aesthetic and technical excellence.'
  },
  {
    q: 'Do you execute mutual NDAs prior to confidential briefings?',
    a: 'Absolutely. We routinely sign bilateral Non-Disclosure Agreements prior to any project discovery calls or specification reviews to guarantee your trade secrets and IP remain strictly safeguarded.'
  },
  {
    q: 'Can your team integrate with our existing engineering and product stack?',
    a: 'Yes. We seamlessly embed alongside internal frontend and 3D teams, delivering clean, fully documented Git repositories, component libraries, WebGL shaders, or headless CMS integrations tailored to your CI/CD pipelines.'
  },
  {
    q: 'Who owns the intellectual property and 3D asset source files?',
    a: 'Upon final settlement, 100% of all custom source code, Three.js shaders, Blender 3D models, vector brand assets, and design files become your exclusive intellectual property with zero royalty obligations.'
  }
]

// Studio Locations with Live Timezone clocks
const studioLocations = [
  {
    city: 'San Francisco',
    region: 'Headquarters • Americas',
    address: '548 Market Street, Suite 39201, San Francisco, CA 94104',
    timeZone: 'America/Los_Angeles',
    tzLabel: 'PST / PDT'
  },
  {
    city: 'London',
    region: 'European Operations',
    address: '25 Luke Street, Shoreditch, London EC2A 4DS, UK',
    timeZone: 'Europe/London',
    tzLabel: 'GMT / BST'
  },
  {
    city: 'Tokyo',
    region: 'Asia-Pacific Hub',
    address: 'Roppongi Hills Mori Tower, 6-10-1 Roppongi, Minato-ku, Tokyo',
    timeZone: 'Asia/Tokyo',
    tzLabel: 'JST'
  }
]

export default function ContactPage({ onNavigateHome, onNavigate }) {
  const pageRef = useRef(null)
  const submitBtnRef = useRef(null)
  const scheduleBtnRef = useRef(null)

  // Form State
  const [selectedServices, setSelectedServices] = useState(['3d-web'])
  const [selectedBudget, setSelectedBudget] = useState('tier-2')
  const [selectedTimeline, setSelectedTimeline] = useState('standard')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    wantsNda: true,
    fileName: ''
  })

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Copy Feedback State
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingDate, setBookingDate] = useState('Tomorrow, 2:00 PM EST')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  // Live Clocks State
  const [times, setTimes] = useState({})

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const newTimes = {}
      studioLocations.forEach((loc) => {
        newTimes[loc.city] = new Intl.DateTimeFormat('en-US', {
          timeZone: loc.timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now)
      })
      setTimes(newTimes)
    }

    updateTimes()
    const timer = setInterval(updateTimes, 1000)
    return () => clearInterval(timer)
  }, [])

  // Magnetic button effects
  useEffect(() => {
    const cleanSubmit = applyMagneticEffect(submitBtnRef.current, 0.25)
    const cleanSchedule = applyMagneticEffect(scheduleBtnRef.current, 0.25)
    return () => {
      cleanSubmit()
      cleanSchedule()
    }
  }, [submitted])

  // GSAP Entrance Animations
  useGsapContext(({ gsap }) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
    tl.from('.contact-hero-breadcrumb', { opacity: 0, y: 15, duration: 0.6 })
      .from('.contact-hero-badges', { opacity: 0, y: 20, duration: 0.6 }, '-=0.35')
      .from('.contact-hero-title', { opacity: 0, y: 35, duration: 0.85 }, '-=0.4')
      .from('.contact-hero-sub', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      .from('.contact-quick-pills', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')

    gsap.from('.contact-main-grid', {
      scrollTrigger: {
        trigger: '.contact-main-grid',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'all'
    })

    gsap.from('.contact-locations-section', {
      scrollTrigger: {
        trigger: '.contact-locations-section',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'all'
    })

    gsap.from('.contact-faq-section', {
      scrollTrigger: {
        trigger: '.contact-faq-section',
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'all'
    })
  }, [], pageRef)

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    )
  }

  const handleCopyEmail = (email = 'velotecltd@gmail.com') => {
    navigator.clipboard?.writeText(email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2200)
  }

  const handleCopyPhone = (phone = '+1 (800) 835-6832') => {
    navigator.clipboard?.writeText(phone)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2200)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, fileName: file.name }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitError('Please provide your full name and work email.')
      return
    }

    setSubmitError('')
    setIsSubmitting(true)

    // Simulate realistic API submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1100)
  }

  const handleResetForm = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      wantsNda: true,
      fileName: ''
    })
    setSelectedServices(['3d-web'])
  }

  return (
    <div className="contact-page-wrap" ref={pageRef}>
      {/* =================================================================
          1. HERO HEADER SECTION (with Three.js Volcanic Embers)
          ================================================================= */}
      <section className="contact-hero-section">
        <HeroCanvas mode="full" />

        <div className="container contact-hero-container">
          {/* Breadcrumb Navigation */}
          <div className="contact-hero-breadcrumb">
            <a
              href="/"
              className="breadcrumb-link"
              onClick={(e) => {
                e.preventDefault()
                if (onNavigateHome) onNavigateHome()
              }}
            >
              Home
            </a>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Contact Studio</span>
          </div>

          {/* Status Eyebrow Badges */}
          <div className="contact-hero-badges">
            <div className="contact-live-status-pill">
              <span className="live-status-dot" />
              <span>NOW BOOKING Q3 / Q4 2026</span>
            </div>
            <div className="contact-response-badge">
              <Clock size={13} color="var(--color-orange)" />
              <span>Average Response &lt; 2 Hours</span>
            </div>
          </div>

          {/* Grand Headline */}
          <h1 className="contact-hero-title">
            Let's Engineer Your Next <br />
            <span className="contact-highlight-gradient">Digital Landmark</span>
          </h1>

          <p className="contact-hero-sub">
            Whether you are preparing a ground-up 3D spatial web platform, luxury brand identity, 
            or high-performance fullstack architecture—our team is ready to materialize your vision.
          </p>

          {/* Quick Direct Contact Action Pills */}
          <div className="contact-quick-pills">
            <button
              type="button"
              className="quick-pill-btn"
              onClick={() => handleCopyEmail('velotecltd@gmail.com')}
              title="Click to copy email"
            >
              <Mail size={15} color="var(--color-orange)" />
              <span>velotecltd@gmail.com</span>
              {copiedEmail ? (
                <span className="pill-feedback-badge">
                  <Check size={12} /> Copied!
                </span>
              ) : (
                <Copy size={13} className="pill-copy-icon" />
              )}
            </button>

            <button
              type="button"
              className="quick-pill-btn"
              onClick={() => handleCopyPhone('+1 (800) 835-6832')}
              title="Click to copy phone number"
            >
              <Phone size={15} color="var(--color-orange)" />
              <span>+1 (800) 835-6832</span>
              {copiedPhone ? (
                <span className="pill-feedback-badge">
                  <Check size={12} /> Copied!
                </span>
              ) : (
                <Copy size={13} className="pill-copy-icon" />
              )}
            </button>

            <button
              type="button"
              ref={scheduleBtnRef}
              className="quick-pill-btn schedule-cta-pill"
              onClick={() => setBookingModalOpen(true)}
            >
              <CalendarDays size={15} />
              <span>Book 30-Min Strategy Call</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. MAIN INTERACTIVE HUB (Split: Inquiry Form vs Direct Studio Hub)
          ================================================================= */}
      <section className="contact-content-section">
        <SectionCanvas variant="constellation" />

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="contact-main-grid">
            {/* -------------------------------------------------------------
                LEFT COLUMN: Comprehensive Project Planner & Inquiry Form
                ------------------------------------------------------------- */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                {submitted ? (
                  /* Animated Success State */
                  <div className="contact-success-state">
                    <div className="success-icon-ring">
                      <CheckCircle2 size={44} color="var(--color-orange)" />
                    </div>
                    <div className="success-eyebrow">TRANSMISSION CONFIRMED</div>
                    <h3 className="success-title">Your Project Brief Has Been Dispatched</h3>
                    <p className="success-desc">
                      Thank you, <strong>{formData.name || 'Partner'}</strong>. Our leadership team has received 
                      your inquiry. A senior creative technologist will review your specifications 
                      and respond to <strong>{formData.email}</strong> within <strong>2 hours</strong>.
                    </p>

                    <div className="success-summary-box">
                      <div className="summary-row">
                        <span className="summary-label">Reference ID:</span>
                        <span className="summary-val">VELO-{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Selected Services:</span>
                        <span className="summary-val">{selectedServices.join(', ')}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Mutual NDA:</span>
                        <span className="summary-val">{formData.wantsNda ? 'Requested (Pre-call sent)' : 'Standard briefing'}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="contact-btn-submit"
                      onClick={handleResetForm}
                      style={{ marginTop: '24px' }}
                    >
                      <span>Send Another Inquiry</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  /* Interactive Form Formats */
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-card-header">
                      <div className="form-header-badge">
                        <Sparkles size={14} color="var(--color-orange)" />
                        <span>PROJECT INTAKE MATRIX</span>
                      </div>
                      <h2 className="form-card-title">Tell Us About Your Vision</h2>
                      <p className="form-card-sub">
                        Fill in as much detail as you'd like. We review every submission within 2 business hours.
                      </p>
                    </div>

                    {submitError && (
                      <div className="form-error-banner">
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Step 1: Select Services */}
                    <div className="form-section-block">
                      <label className="form-section-title">
                        <span className="step-num">01</span>
                        <span>What disciplines are you seeking? (Select all that apply)</span>
                      </label>
                      <div className="service-chip-grid">
                        {serviceOptions.map((serv) => {
                          const Icon = serv.icon
                          const isSelected = selectedServices.includes(serv.id)
                          return (
                            <button
                              key={serv.id}
                              type="button"
                              className={`service-select-chip ${isSelected ? 'selected' : ''}`}
                              onClick={() => toggleService(serv.id)}
                            >
                              <div className="chip-icon-box">
                                <Icon size={14} color={isSelected ? '#ffffff' : serv.color} />
                              </div>
                              <span className="chip-label">{serv.label}</span>
                              {isSelected && <span className="chip-check">✓</span>}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Step 2: Estimated Budget */}
                    <div className="form-section-block">
                      <label className="form-section-title">
                        <span className="step-num">02</span>
                        <span>Estimated Project Investment</span>
                      </label>
                      <div className="budget-tiers-grid">
                        {budgetTiers.map((tier) => {
                          const isSelected = selectedBudget === tier.id
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              className={`budget-tier-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => setSelectedBudget(tier.id)}
                            >
                              <div className="tier-radio-circle">
                                {isSelected && <div className="tier-radio-dot" />}
                              </div>
                              <div className="tier-text-wrap">
                                <span className="tier-val">{tier.label}</span>
                                <span className="tier-sub">{tier.sub}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Step 3: Target Timeline */}
                    <div className="form-section-block">
                      <label className="form-section-title">
                        <span className="step-num">03</span>
                        <span>Target Launch Timeline</span>
                      </label>
                      <div className="timeline-chips-grid">
                        {timelineOptions.map((t) => {
                          const isSelected = selectedTimeline === t.id
                          return (
                            <button
                              key={t.id}
                              type="button"
                              className={`timeline-chip-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => setSelectedTimeline(t.id)}
                            >
                              <span className="timeline-chip-label">{t.label}</span>
                              <span className="timeline-chip-sub">{t.sub}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Step 4: Contact Information */}
                    <div className="form-section-block">
                      <label className="form-section-title">
                        <span className="step-num">04</span>
                        <span>Your Details</span>
                      </label>

                      <div className="form-inputs-row">
                        <div className="form-input-group">
                          <label className="input-label" htmlFor="contact-name">
                            Full Name <span className="req">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            className="text-input"
                            placeholder="e.g. Alex Mercer"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-input-group">
                          <label className="input-label" htmlFor="contact-email">
                            Work Email <span className="req">*</span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            className="text-input"
                            placeholder="alex@acmecorp.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-input-group" style={{ marginTop: '16px' }}>
                        <label className="input-label" htmlFor="contact-company">
                          Company / Brand Name
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          className="text-input"
                          placeholder="e.g. Stripe, OpenAI, or Stealth Startup"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>

                      <div className="form-input-group" style={{ marginTop: '16px' }}>
                        <label className="input-label" htmlFor="contact-message">
                          Project Brief & Core Objectives
                        </label>
                        <textarea
                          id="contact-message"
                          className="textarea-input"
                          rows={4}
                          placeholder="Describe your current challenge, target audience, technical requirements, or reference links..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Step 5: Options (NDA & Optional Attachments) */}
                    <div className="form-section-block options-block">
                      <div className="nda-toggle-row">
                        <label className="nda-checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.wantsNda}
                            onChange={(e) => setFormData({ ...formData, wantsNda: e.target.checked })}
                          />
                          <span className="custom-check-box" />
                          <span className="nda-text">
                            <strong>Request Mutual NDA</strong> — We'll counter-sign a bilateral confidentiality agreement prior to discussion.
                          </span>
                        </label>
                      </div>

                      {/* File upload trigger */}
                      <div className="file-upload-strip">
                        <label className="file-upload-btn" htmlFor="contact-file">
                          <UploadCloud size={16} color="var(--color-orange)" />
                          <span>
                            {formData.fileName ? `Attached: ${formData.fileName}` : 'Attach RFP / Wireframe / Spec Deck (PDF, Figma, ZIP)'}
                          </span>
                          <input
                            id="contact-file"
                            type="file"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {formData.fileName && (
                          <button
                            type="button"
                            className="remove-file-btn"
                            onClick={() => setFormData({ ...formData, fileName: '' })}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Submit Action */}
                    <div className="form-submit-footer">
                      <button
                        ref={submitBtnRef}
                        type="submit"
                        disabled={isSubmitting}
                        className={`contact-btn-submit ${isSubmitting ? 'loading' : ''}`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-dot" />
                            <span>Encrypting & Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Project Inquiry</span>
                            <div className="submit-arrow-circle">
                              <Send size={15} />
                            </div>
                          </>
                        )}
                      </button>

                      <div className="submit-security-note">
                        <ShieldCheck size={14} color="#858f9f" />
                        <span>256-Bit SSL Encrypted • Zero Spam • Strict Privacy Policy</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: Direct Touchpoints, Direct Call & Reassurances
                ------------------------------------------------------------- */}
            <div className="contact-sidebar-column">
              {/* Card 1: Fast Discovery Call with Leadership */}
              <div className="sidebar-card call-pitch-card">
                <div className="call-card-badge">
                  <Calendar size={13} color="var(--color-orange)" />
                  <span>PREFER A LIVE CALL?</span>
                </div>
                <h3 className="sidebar-card-title">Book a 30-Min Strategy Call</h3>
                <p className="sidebar-card-p">
                  Cut through email delays. Schedule an immediate one-on-one discovery sprint with our 
                  Founder & Creative Technologist, Daniel Kim.
                </p>

                <div className="call-directors-row">
                  <div className="director-avatars">
                    <img src="/avatar_daniel.jpg" alt="Daniel Kim" className="director-avatar-img" />
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                      alt="Sarah Lee" 
                      className="director-avatar-img" 
                      style={{ marginLeft: '-12px' }} 
                    />
                  </div>
                  <div className="directors-meta">
                    <span className="directors-names">Daniel Kim & Sarah Lee</span>
                    <span className="directors-status">🟢 Available slots this week</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="sidebar-call-btn"
                  onClick={() => setBookingModalOpen(true)}
                >
                  <CalendarDays size={16} />
                  <span>Choose Your Date & Time</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Card 2: Direct Contact Channels */}
              <div className="sidebar-card channels-card">
                <h3 className="sidebar-card-title" style={{ fontSize: '18px', marginBottom: '16px' }}>
                  Direct Studio Touchpoints
                </h3>

                <div className="direct-channels-list">
                  <div className="channel-item">
                    <div className="channel-icon-box">
                      <Mail size={16} color="var(--color-orange)" />
                    </div>
                    <div className="channel-info">
                      <span className="channel-label">General & Inquiries</span>
                      <a href="mailto:velotecltd@gmail.com" className="channel-val">
                        velotecltd@gmail.com
                      </a>
                    </div>
                    <button
                      type="button"
                      className="channel-copy-btn"
                      onClick={() => handleCopyEmail('velotecltd@gmail.com')}
                      title="Copy email"
                    >
                      <Copy size={13} />
                    </button>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-box">
                      <Building2 size={16} color="var(--color-orange)" />
                    </div>
                    <div className="channel-info">
                      <span className="channel-label">Enterprise & Partnerships</span>
                      <a href="mailto:velotecltd@gmail.com" className="channel-val">
                        velotecltd@gmail.com
                      </a>
                    </div>
                    <button
                      type="button"
                      className="channel-copy-btn"
                      onClick={() => handleCopyEmail('velotecltd@gmail.com')}
                      title="Copy email"
                    >
                      <Copy size={13} />
                    </button>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-box">
                      <Phone size={16} color="var(--color-orange)" />
                    </div>
                    <div className="channel-info">
                      <span className="channel-label">Direct Studio Hotline</span>
                      <a href="tel:+18008356832" className="channel-val">
                        +1 (800) 835-6832
                      </a>
                    </div>
                    <button
                      type="button"
                      className="channel-copy-btn"
                      onClick={() => handleCopyPhone('+1 (800) 835-6832')}
                      title="Copy phone"
                    >
                      <Copy size={13} />
                    </button>
                  </div>

                  <div className="channel-item">
                    <div className="channel-icon-box">
                      <MessageSquare size={16} color="var(--color-orange)" />
                    </div>
                    <div className="channel-info">
                      <span className="channel-label">WhatsApp VIP Channel</span>
                      <span className="channel-val">+1 (415) 890-VELO</span>
                    </div>
                    <a
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noreferrer"
                      className="channel-link-tag"
                    >
                      Chat
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: Ironclad Guarantees */}
              <div className="sidebar-card guarantees-card">
                <h4 className="guarantees-title">The Velotech Client Guarantee</h4>
                <ul className="guarantees-list">
                  <li className="guarantee-row">
                    <CheckCircle2 size={16} color="var(--color-orange)" />
                    <span><strong>120fps Performance:</strong> Zero compromises on mobile frame rates or asset weights.</span>
                  </li>
                  <li className="guarantee-row">
                    <CheckCircle2 size={16} color="var(--color-orange)" />
                    <span><strong>Fixed-Cost Milestone Scopes:</strong> No surprise invoices, hourly padding, or creep.</span>
                  </li>
                  <li className="guarantee-row">
                    <CheckCircle2 size={16} color="var(--color-orange)" />
                    <span><strong>100% Asset Ownership:</strong> All master code, shaders, models, and IPs are fully yours.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. GLOBAL PRESENCE & LIVE CLOCKS
          ================================================================= */}
      <section className="contact-locations-section">
        <div className="container">
          <div className="contact-section-header">
            <span className="eyebrow-tag">GLOBAL TIMEZONES</span>
            <h2 className="section-title-dark">Worldwide Studios. Synchronized Agility.</h2>
            <p className="section-header-desc">
              We operate across 3 primary global continents, ensuring continuous 24-hour iteration cycles.
            </p>
          </div>

          <div className="studios-grid">
            {studioLocations.map((loc) => (
              <div key={loc.city} className="studio-card">
                <div className="studio-card-top">
                  <div className="studio-city-badge">
                    <MapPin size={15} color="var(--color-orange)" />
                    <span className="city-name">{loc.city}</span>
                  </div>
                  <div className="studio-clock-pill">
                    <span className="clock-pulse" />
                    <span className="clock-time">{times[loc.city] || 'Loading...'}</span>
                    <span className="clock-zone">{loc.tzLabel}</span>
                  </div>
                </div>

                <div className="studio-region">{loc.region}</div>
                <div className="studio-address">{loc.address}</div>

                <div className="studio-footer">
                  <div className="studio-status">
                    <span className="status-label">Studio Ops:</span>
                    <span className="status-value">Active & Taking Briefs</span>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="studio-map-link"
                  >
                    View Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          4. CLIENT FAQ ACCORDION
          ================================================================= */}
      <section className="contact-faq-section">
        <div className="container">
          <div className="contact-section-header">
            <span className="eyebrow-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title-light">Everything You Need to Know Before Briefing</h2>
            <p className="section-header-desc">
              Straightforward answers about our cadence, contracts, intellectual property, and billing.
            </p>
          </div>

          <div className="contact-faq-wrap">
            {contactFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={faq.q}
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-accordion-header"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <div className="faq-toggle-circle">
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="faq-accordion-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          5. REASSURANCE TESTIMONIAL STRIP
          ================================================================= */}
      <section className="contact-quote-strip">
        <div className="container">
          <div className="quote-strip-box">
            <blockquote className="quote-strip-text">
              “Velotech transformed our Series B pitch and digital experience into the most talked-about 
              3D product reveal in our industry. Their engineering precision is simply unmatched.”
            </blockquote>
            <div className="quote-strip-author">
              <span className="author-name">Alex Thorne</span>
              <span className="author-title">VP of Product & Brand, Hyperion Spatial Technologies</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          6. STRATEGY CALL BOOKING MODAL
          ================================================================= */}
      {bookingModalOpen && (
        <div
          className="service-modal-backdrop"
          onClick={() => setBookingModalOpen(false)}
        >
          <div
            className="service-modal-box contact-booking-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setBookingModalOpen(false)}
            >
              <X size={18} />
            </button>

            {bookingConfirmed ? (
              <div className="modal-success-state">
                <div className="modal-check-circle">
                  <CheckCircle2 size={38} color="var(--color-orange)" />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Discovery Call Confirmed!
                </h3>
                <p style={{ color: '#8e97a9', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
                  A calendar invitation and Google Meet link have been prepared for <strong>{bookingDate}</strong>. 
                  Our creative director looks forward to speaking with you.
                </p>
                <button
                  type="button"
                  className="tier-cta-btn"
                  onClick={() => {
                    setBookingConfirmed(false)
                    setBookingModalOpen(false)
                  }}
                >
                  Close & Back to Studio
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <CalendarDays size={18} color="var(--color-orange)" />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-orange)', letterSpacing: '0.1em' }}>
                    FAST TRACK DISCOVERY
                  </span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', marginBottom: '8px' }}>
                  Schedule 30-Min Strategy Call
                </h3>
                <p style={{ fontSize: '13.5px', color: '#8e97a9', marginBottom: '24px', lineHeight: 1.5 }}>
                  Select an optimal slot for a private briefing with our creative technology directors.
                </p>

                <div className="modal-form-fields">
                  <div>
                    <label className="modal-input-label">Available Slots This Week</label>
                    <div className="booking-slots-grid">
                      {[
                        'Tomorrow, 10:00 AM EST',
                        'Tomorrow, 2:00 PM EST',
                        'Wednesday, 11:30 AM EST',
                        'Thursday, 4:00 PM EST'
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className={`slot-pill-btn ${bookingDate === slot ? 'active' : ''}`}
                          onClick={() => setBookingDate(slot)}
                        >
                          <Clock size={13} />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="modal-input-label">Your Name</label>
                    <input
                      type="text"
                      className="modal-text-input"
                      placeholder="e.g. Jessica Taylor"
                      defaultValue={formData.name}
                    />
                  </div>

                  <div>
                    <label className="modal-input-label">Your Work Email</label>
                    <input
                      type="email"
                      className="modal-text-input"
                      placeholder="e.g. jessica@brand.com"
                      defaultValue={formData.email}
                    />
                  </div>

                  <button
                    type="button"
                    className="contact-btn-submit"
                    style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                    onClick={() => setBookingConfirmed(true)}
                  >
                    <span>Confirm Strategy Call Slot</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
