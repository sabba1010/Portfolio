import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100
        setScrollProgress(currentProgress)
      }
      setShowTopBtn(window.scrollY > 450)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Top glowing progress bar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #ff4500 0%, #ff6a00 50%, #ff8833 100%)',
          boxShadow: '0 0 12px rgba(255, 85, 0, 0.8), 0 0 4px rgba(255, 120, 0, 0.6)',
          zIndex: 9999,
          transition: 'width 0.1s linear',
          pointerEvents: 'none'
        }}
      />

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'rgba(12, 13, 18, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(255, 85, 0, 0.35)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 90,
          opacity: showTopBtn ? 1 : 0,
          transform: showTopBtn ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          pointerEvents: showTopBtn ? 'auto' : 'none',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(255, 85, 0, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-orange)'
          e.currentTarget.style.background = 'rgba(255, 85, 0, 0.2)'
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 85, 0, 0.35)'
          e.currentTarget.style.background = 'rgba(12, 13, 18, 0.85)'
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
        }}
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
    </>
  )
}
