import React from 'react'
import { Heart, Code2, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '40px 24px',
      marginTop: 'auto',
      backgroundColor: 'rgba(9, 10, 16, 0.95)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Code2 size={18} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.3px' }}>
            Velo<span style={{ color: 'var(--primary-light)' }}>Tech</span>
          </span>
          <span style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', marginLeft: '8px' }}>
            © {new Date().getFullYear()} — Built with React 19 & Vite
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            Crafted with high performance & modern aesthetics
          </span>
          <button
            onClick={scrollToTop}
            className="btn btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.8rem' }}
            title="Scroll to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
