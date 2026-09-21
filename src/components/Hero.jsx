import React, { useState } from 'react'
import { Sparkles, Terminal, Copy, Check, ArrowRight, Play, Cpu } from 'lucide-react'

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const command = 'npm run dev'

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={{
      padding: '80px 24px 60px',
      maxWidth: '1100px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
    }}>
      {/* Glow highlight */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '450px',
        height: '250px',
        background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 75%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: -1,
      }} />

      {/* Release Badge */}
      <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
        <div className="badge">
          <Sparkles size={14} color="#818cf8" />
          <span>Velo Tech • React 19 + Vite Setup Ready</span>
        </div>
      </div>

      {/* Main Headline */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
        fontWeight: 800,
        lineHeight: 1.15,
        letterSpacing: '-1.5px',
        marginBottom: '20px',
      }}>
        Next-Generation <br />
        <span className="gradient-text">React Application</span> Architecture
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        maxWidth: '680px',
        margin: '0 auto 36px',
        lineHeight: 1.6,
      }}>
        আপনার React এনভায়রনমেন্ট পুরোপুরি প্রস্তুত! দ্রুততম Vite 6 বান্ডলার, 
        মডার্ন কম্পোনেন্ট আর্কিটেকচার এবং প্রি-কনফিগারড ড্যাশবোর্ড নিয়ে ডেভেলপমেন্ট শুরু করুন।
      </p>

      {/* Quick Launch Terminal Bar */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(15, 17, 26, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 'var(--radius-full)',
        padding: '8px 12px 8px 20px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        marginBottom: '36px',
      }}>
        <Terminal size={18} color="#06b6d4" />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: '#f1f5f9' }}>
          $ {command}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
            border: copied ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
            color: copied ? '#10b981' : '#cbd5e1',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
          title="Copy command to clipboard"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <a href="#demo" className="btn btn-primary">
          Try Interactive State Demo
          <ArrowRight size={16} />
        </a>
        <a href="#guide" className="btn btn-secondary">
          <Cpu size={16} />
          View Project Setup
        </a>
      </div>
    </section>
  )
}
