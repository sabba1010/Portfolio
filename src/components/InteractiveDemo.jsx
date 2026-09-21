import React, { useState } from 'react'
import { Activity, Plus, Minus, RotateCcw, Zap, Trophy, Flame, Gauge } from 'lucide-react'

export default function InteractiveDemo() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [history, setHistory] = useState([])

  const handleIncrement = () => {
    const nextVal = count + multiplier
    setCount(nextVal)
    setHistory((prev) => [nextVal, ...prev.slice(0, 4)])
  }

  const handleDecrement = () => {
    const nextVal = Math.max(0, count - multiplier)
    setCount(nextVal)
    setHistory((prev) => [nextVal, ...prev.slice(0, 4)])
  }

  const handleReset = () => {
    setCount(0)
    setHistory([])
  }

  // Milestone tier
  const getBadge = () => {
    if (count >= 100) return { label: 'Mythic Engineer', color: '#ec4899', icon: Trophy }
    if (count >= 50) return { label: 'Tech Lead', color: '#a855f7', icon: Flame }
    if (count >= 20) return { label: 'Senior Pro', color: '#06b6d4', icon: Zap }
    return { label: 'Starter Scout', color: '#10b981', icon: Activity }
  }

  const tier = getBadge()
  const TierIcon = tier.icon

  return (
    <section id="demo" style={{
      padding: '40px 24px 80px',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="badge" style={{ marginBottom: '12px' }}>
          <Activity size={14} />
          <span>Live Reactivity</span>
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.8px' }}>
          Interactive State Playground
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '550px', margin: '0 auto' }}>
          Experience instant React 19 State Updates, Dynamic Tier Progression, and Event Dispatching.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        alignItems: 'stretch',
      }}>
        {/* Main Counter Card */}
        <div className="glass-card" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Live State Counter
              </span>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: `${tier.color}18`,
                border: `1px solid ${tier.color}44`,
                color: tier.color,
                fontSize: '0.8rem',
                fontWeight: 700,
              }}>
                <TierIcon size={14} />
                {tier.label}
              </div>
            </div>

            <div style={{ textAlign: 'center', margin: '20px 0 30px' }}>
              <div style={{
                fontSize: '5.5rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                lineHeight: 1,
                color: '#ffffff',
                textShadow: `0 0 35px ${tier.color}66`,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                {count}
              </div>
              <div style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', marginTop: '10px' }}>
                Multiplier: <strong style={{ color: 'var(--text-main)' }}>+{multiplier} per click</strong>
              </div>
            </div>
          </div>

          <div>
            {/* Step Controls */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
              {[1, 5, 10].map((step) => (
                <button
                  key={step}
                  onClick={() => setMultiplier(step)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: multiplier === step ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                    color: multiplier === step ? '#ffffff' : 'var(--text-muted)',
                    border: multiplier === step ? '1px solid var(--primary-light)' : '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.2s',
                  }}
                >
                  +{step}x
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleDecrement}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                <Minus size={18} />
                Decrement
              </button>

              <button
                onClick={handleIncrement}
                className="btn btn-primary"
                style={{ flex: 1.5 }}
              >
                <Plus size={18} />
                Increment
              </button>

              <button
                onClick={handleReset}
                className="btn btn-secondary"
                style={{ padding: '10px 14px' }}
                title="Reset Counter"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Analytics & State Inspector Card */}
        <div className="glass-card" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Gauge size={18} color="#06b6d4" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                Reactive Telemetry
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
              }}>
                <div style={{ color: 'var(--text-subtle)', fontSize: '0.8rem', marginBottom: '4px' }}>Target Milestone</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--secondary)' }}>
                  {count >= 100 ? 'Max Tier' : `${count}/100`}
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  marginTop: '10px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${Math.min(100, (count / 100) * 100)}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                    transition: 'width 0.3s ease',
                  }} />
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
              }}>
                <div style={{ color: 'var(--text-subtle)', fontSize: '0.8rem', marginBottom: '4px' }}>Render Engine</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-light)' }}>
                  React 19
                </div>
                <div style={{ color: '#10b981', fontSize: '0.78rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="badge-pulse" style={{ width: '6px', height: '6px' }}></span>
                  Lightning HMR
                </div>
              </div>
            </div>

            {/* Recent Value Stream */}
            <div>
              <div style={{ color: 'var(--text-subtle)', fontSize: '0.8rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recent State Log
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
                minHeight: '42px',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}>
                {history.length === 0 ? (
                  <span style={{ color: 'var(--text-subtle)', fontSize: '0.82rem', fontStyle: 'italic' }}>
                    Click increment to push values to state log...
                  </span>
                ) : (
                  history.map((val, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: idx === 0 ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        color: idx === 0 ? 'var(--primary-light)' : 'var(--text-muted)',
                        border: idx === 0 ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                      }}
                    >
                      {val}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.07)' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              💡 <em>Pro-tip:</em> Open <code className="code-pill">src/App.jsx</code> to add new components or customize the logic.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
