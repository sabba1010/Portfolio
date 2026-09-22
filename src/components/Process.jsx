import React, { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const stepsData = [
  {
    num: '01',
    numClass: 'step-number',
    title: 'Discover',
    desc: 'Understand your goals, market landscape and target audience.',
    deliverables: ['Tech Audit', 'Target Persona', 'Scope Definition']
  },
  {
    num: '02',
    numClass: 'step-number',
    title: 'Design',
    desc: 'Create a tailored strategy, design system and visual direction.',
    deliverables: ['3D Concepts', 'UI Wireframes', 'Interactive Prototypes']
  },
  {
    num: '03',
    numClass: 'step-number',
    title: 'Develop',
    desc: 'Build with cutting edge technology, WebGL shaders and smooth physics.',
    deliverables: ['Three.js Scenes', 'React 19 Frontend', 'Performance Tuning']
  },
  {
    num: '04',
    numClass: 'step-number step-number-orange',
    title: 'Deliver',
    desc: 'Launch, measure conversions and scale together seamlessly.',
    deliverables: ['Zero-Downtime Deploy', 'Analytics Setup', 'Ongoing Growth']
  }
]

export default function Process() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="process" className="process-section">
      <div className="container">
        {/* Top Header Row */}
        <div className="process-top-row reveal-on-scroll">
          <h2 className="process-main-title">
            Design.<br />
            Develop.<br />
            <span className="animate-highlight">Animate.</span>
          </h2>

          <div className="process-top-right">
            <p className="process-top-desc">
              We follow a simple and proven process to turn your ideas into
              stunning digital experiences.
            </p>
            <a href="#contact" className="btn-outline-dark">
              <span>Our Process</span>
              <div className="circle-icon">
                <ArrowRight size={15} strokeWidth={2.5} />
              </div>
            </a>
          </div>
        </div>

        {/* 4 Steps Sequence */}
        <div className="process-steps-row">
          {stepsData.map((step, index) => {
            const isSelected = activeStep === index
            return (
              <div 
                key={step.num} 
                className={`process-step-item reveal-on-scroll ${isSelected ? 'active-step' : ''}`}
                style={{ transitionDelay: `${index * 0.12}s`, cursor: 'pointer' }}
                onClick={() => setActiveStep(index)}
              >
                <div className="process-step-header">
                  <span className={step.numClass}>{step.num}</span>
                  {index < stepsData.length - 1 && <div className="step-divider-line" />}
                </div>

                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>

                {/* Deliverables tags */}
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {step.deliverables.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#667085', fontWeight: 600 }}>
                      <CheckCircle size={12} color="var(--color-orange)" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
