import React from 'react'
import { FolderGit2, PlayCircle, Hammer, FileCode, CheckCircle2 } from 'lucide-react'

export default function QuickStartGuide() {
  const steps = [
    {
      step: '01',
      title: 'প্রজেক্ট রান করুন (Run Dev Server)',
      command: 'npm run dev',
      desc: 'কমান্ড প্রম্পট বা টার্মিনালে npm run dev লিখুন। লোকালহোস্টে প্রজেক্ট ওপেন হয়ে যাবে।',
      icon: PlayCircle,
    },
    {
      step: '02',
      title: 'কোড এডিট ও নতুন পেজ তৈরি',
      command: 'src/App.jsx',
      desc: 'App.jsx বা components ফোল্ডারে আপনার প্রয়োজনীয় কম্পোনেন্ট ও UI যোগ করুন।',
      icon: FileCode,
    },
    {
      step: '03',
      title: 'প্রোডাকশন বিল্ড (Production Build)',
      command: 'npm run build',
      desc: 'সাইট ডিপ্লয় করার সময় এই কমান্ড দিয়ে অপ্টিমাইজড dist বান্ডেল জেনারেট করুন।',
      icon: Hammer,
    },
  ]

  const structure = [
    { path: 'src/App.jsx', role: 'মেইন অ্যাপ্লিকেশন এবং ভিউ' },
    { path: 'src/components/', role: 'রিইউজেবল কম্পোনেন্টস (Navbar, Hero, Demo ইত্যাদি)' },
    { path: 'src/index.css', role: 'গ্লোবাল ভ্যানিলা CSS ও প্রিমিয়াম ডিজাইন সিস্টেম' },
    { path: 'vite.config.js', role: 'Vite বান্ডলার কনফিগারেশন' },
  ]

  return (
    <section id="guide" style={{
      padding: '40px 24px 80px',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div className="badge" style={{ marginBottom: '12px' }}>
          <FolderGit2 size={14} />
          <span>Quick Reference</span>
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.8px' }}>
          প্রজেক্ট শুরু করার গাইডলাইন
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto' }}>
          আপনার React সেটআপ সম্পূর্ণরূপে তৈরি। নিচে প্রয়োজনীয় কমান্ড এবং ফোল্ডার স্ট্রাকচার দেওয়া হলো।
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {steps.map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={idx} className="glass-card" style={{ padding: '32px 26px', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: 'rgba(255, 255, 255, 0.05)',
              }}>
                {item.step}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Icon size={22} color="var(--secondary)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                  {item.title}
                </h3>
              </div>

              <div style={{
                marginBottom: '14px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                color: 'var(--primary-light)',
              }}>
                $ {item.command}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          )
        })}
      </div>

      {/* Structure Guide Box */}
      <div className="glass-card" style={{ padding: '32px 36px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={20} color="#10b981" />
          Workspace Structure Checklist
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {structure.map((file, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#38bdf8', fontWeight: 600, marginBottom: '6px' }}>
                {file.path}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                {file.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
