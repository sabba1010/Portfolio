import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const [isTouch] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    )
  })

  const [cursorVisible, setCursorVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hoverType, setHoverType] = useState('default') // 'button' | 'card'

  // Cursor element refs
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const canvasRef = useRef(null)

  const isVisibleRef = useRef(false)
  const rafId = useRef(null)

  // Particles array for ember stardust trail
  const particles = useRef([])
  const lastSpawnTime = useRef(0)

  useEffect(() => {
    if (isTouch) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Enable custom cursor styles on html
    document.documentElement.classList.add('custom-cursor-enabled')

    // GSAP quickTo setters for 120fps GPU performance
    const xToDot = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'power2.out' })
    const yToDot = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'power2.out' })

    const xToRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.38, ease: 'power3.out' })
    const yToRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.38, ease: 'power3.out' })

    // Mouse movement handler
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e

      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setCursorVisible(true)
        gsap.set([dotRef.current, ringRef.current], { x: clientX, y: clientY })
      } else {
        xToDot(clientX)
        yToDot(clientY)
        xToRing(clientX)
        yToRing(clientY)
      }

      // Spawn subtle glowing ember stardust particle occasionally on movement
      const now = performance.now()
      if (now - lastSpawnTime.current > 35) {
        lastSpawnTime.current = now
        const count = Math.random() > 0.45 ? 1 : 2
        for (let i = 0; i < count; i++) {
          particles.current.push({
            x: clientX + (Math.random() - 0.5) * 8,
            y: clientY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -Math.random() * 1.6 - 0.4,
            size: Math.random() * 2.2 + 1.2,
            alpha: 0.85,
            decay: Math.random() * 0.025 + 0.025,
            color: Math.random() > 0.3 ? '255, 100, 15' : '255, 185, 50'
          })
        }
      }
    }

    const handleMouseDown = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, { scale: 0.82, duration: 0.15, ease: 'power2.out' })
      }
    }

    const handleMouseUp = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.38)' })
      }
    }

    const handleMouseEnter = () => {
      isVisibleRef.current = true
      setCursorVisible(true)
    }

    const handleMouseLeave = () => {
      isVisibleRef.current = false
      setCursorVisible(false)
    }

    // Hover inspection with event delegation
    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return

      const isInteractiveBtn = target.closest(
        'button, a, input, select, textarea, [role="button"], .btn-primary-orange, .btn-showreel, .nav-btn-talk, .brand-logo, .circle-icon'
      )
      const isCard = target.closest(
        '.project-card, .service-card, .process-step-card, .testimonial-card'
      )

      if (isInteractiveBtn) {
        setIsHovered(true)
        setHoverType('button')
      } else if (isCard) {
        setIsHovered(true)
        setHoverType('card')
      } else {
        setIsHovered(false)
        setHoverType('default')
      }
    }

    // Canvas particle render loop
    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const pList = particles.current

      for (let i = pList.length - 1; i >= 0; i--) {
        const p = pList[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          pList.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.8})`
        ctx.fill()
        ctx.restore()
      }

      rafId.current = requestAnimationFrame(renderLoop)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    rafId.current = requestAnimationFrame(renderLoop)

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled')
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* 2D Canvas for subtle glowing magma stardust ember trail */}
      <canvas
        ref={canvasRef}
        className="cursor-trail-canvas"
        aria-hidden="true"
      />

      {/* Razor-sharp Core Dot with GSAP quickTo */}
      <div
        ref={dotRef}
        className={`cursor-core-dot ${!cursorVisible ? 'cursor-hidden' : ''} ${
          isHovered ? 'dot-hover' : ''
        }`}
        aria-hidden="true"
      />

      {/* Smooth Trailing Liquid Halo Ring with GSAP quickTo */}
      <div
        ref={ringRef}
        className={`cursor-trailing-ring ${!cursorVisible ? 'cursor-hidden' : ''} ${
          isHovered ? `ring-hover ring-${hoverType}` : ''
        }`}
        aria-hidden="true"
      >
        {isHovered && hoverType === 'card' && (
          <span className="cursor-badge-text">VIEW</span>
        )}
      </div>
    </>
  )
}
