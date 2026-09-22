import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hook to run GSAP animations with automatic React cleanup via gsap.context()
 * @param {Function} animationFn - Callback that receives { gsap, ScrollTrigger }
 * @param {Array} deps - Dependency array
 * @param {React.RefObject} scopeRef - Optional scope ref for CSS selectors
 */
export function useGsapContext(animationFn, deps = [], scopeRef = null) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      animationFn({ gsap, ScrollTrigger })
    }, scopeRef?.current || undefined)

    // Ensure ScrollTrigger recalculates trigger positions after dynamic elements render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Creates a magnetic attraction effect on any button or element
 * @param {HTMLElement} element 
 * @param {number} strength 
 */
export function applyMagneticEffect(element, strength = 0.35) {
  if (!element) return () => {}

  const onMouseMove = (e) => {
    const rect = element.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)

    gsap.to(element, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.35,
      ease: 'power2.out'
    })
  }

  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.35)'
    })
  }

  element.addEventListener('mousemove', onMouseMove)
  element.addEventListener('mouseleave', onMouseLeave)

  return () => {
    element.removeEventListener('mousemove', onMouseMove)
    element.removeEventListener('mouseleave', onMouseLeave)
  }
}

export { gsap, ScrollTrigger }
