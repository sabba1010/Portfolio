import React from 'react'
import { ArrowRight } from 'lucide-react'

const stepsData = [
  {
    num: '01',
    numClass: 'step-number',
    title: 'Discover',
    desc: 'Understand your goals and audience.'
  },
  {
    num: '02',
    numClass: 'step-number',
    title: 'Design',
    desc: 'Create a tailored strategy and visual direction.'
  },
  {
    num: '03',
    numClass: 'step-number',
    title: 'Develop',
    desc: 'Build with cutting edge technology.'
  },
  {
    num: '04',
    numClass: 'step-number step-number-orange',
    title: 'Deliver',
    desc: 'Launch and grow together.'
  }
]

export default function Process() {
  return (
    <section id="process" className="process-section">
      <div className="container">
        {/* Top Header Row */}
        <div className="process-top-row">
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
          {stepsData.map((step, index) => (
            <div key={step.num} className="process-step-item">
              <div className="process-step-header">
                <span className={step.numClass}>{step.num}</span>
                {index < stepsData.length - 1 && <div className="step-divider-line" />}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
