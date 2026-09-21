import React from 'react'
import { Sparkles, Terminal, Layers, Code2, ExternalLink } from 'lucide-react'

export default function Navbar() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(9, 10, 16, 0.75)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '16px 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.45)',
          }}>
            <Code2 size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
              Velo<span style={{ color: 'var(--primary-light)' }}>Tech</span>
            </div>
          </div>
          <div className="badge" style={{ marginLeft: '6px', fontSize: '0.75rem', padding: '3px 10px' }}>
            <span className="badge-pulse"></span>
            React 19 Ready
          </div>
        </div>

        {/* Navigation links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}>
            Features
          </a>
          <a href="#demo" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}>
            Interactive Demo
          </a>
          <a href="#guide" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}>
            Quick Start
          </a>
        </nav>

        {/* Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            React Docs
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </header>
  )
}
