import React from 'react'
import { Zap, Layers, Palette, Terminal, ShieldCheck, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Zap,
    color: '#06b6d4',
    title: 'Instant Vite 6 Engine',
    desc: 'Ultra-fast cold start and lightning Hot Module Replacement (HMR) for an unrivaled developer experience.',
  },
  {
    icon: Sparkles,
    color: '#6366f1',
    title: 'React 19 Core',
    desc: 'Empowered with the latest React 19 standards, modern concurrent features, and streamlined hooks.',
  },
  {
    icon: Palette,
    color: '#ec4899',
    title: 'Curated Glassmorphism CSS',
    desc: 'Tailored CSS design system with CSS custom properties, backdrop blurs, glow shadows, and zero dependencies.',
  },
  {
    icon: Layers,
    color: '#10b981',
    title: 'Modular Architecture',
    desc: 'Pre-organized component hierarchy in src/components for seamless scaling into full-fledged apps.',
  },
  {
    icon: Terminal,
    color: '#f59e0b',
    title: 'Lucide Icons Built-in',
    desc: 'Over 1,000+ clean, featherweight vector icons ready to import and use anywhere in your application.',
  },
  {
    icon: ShieldCheck,
    color: '#a855f7',
    title: 'Production Optimized',
    desc: 'Single-command production build generates tree-shaken, minified, and gzipped assets ready for any cloud host.',
  },
]

export default function FeatureGrid() {
  return (
    <section id="features" style={{
      padding: '40px 24px 80px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div className="badge" style={{ marginBottom: '12px' }}>
          <Sparkles size={14} />
          <span>Core Capabilities</span>
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.8px' }}>
          Everything You Need to Ship Fast
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '550px', margin: '0 auto' }}>
          A clean, robust foundation crafted for high-performance frontend engineering.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {features.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: `${item.color}18`,
                border: `1px solid ${item.color}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 20px ${item.color}25`,
              }}>
                <Icon size={24} color={item.color} />
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#f8fafc' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
