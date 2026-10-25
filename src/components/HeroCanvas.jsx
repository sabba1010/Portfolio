import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas({ mode = 'right' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || 750

    const isFull = mode === 'full'

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 8)

    // WebGL Renderer with High Performance
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45)
    scene.add(ambientLight)

    // Focused core light for the 3D robot on the right
    const lightRight = new THREE.PointLight(0xff5500, 3.8, 14)
    lightRight.position.set(2.5, -0.5, 2)
    scene.add(lightRight)

    let lightLeft = null
    if (isFull) {
      lightLeft = new THREE.PointLight(0xff7711, 3.2, 16)
      lightLeft.position.set(-3.5, 0.2, 2.5)
      scene.add(lightLeft)
    }

    // Particle Count based on mode
    const particleCount = isFull ? 680 : 340
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)
    const particleSpeeds = new Float32Array(particleCount)
    const particleDrifts = new Float32Array(particleCount)
    const particleScales = new Float32Array(particleCount)

    const palette = [
      { r: 1.0, g: 0.72, b: 0.22 }, // Warm Gold
      { r: 1.0, g: 0.38, b: 0.04 }, // Signature Flame Orange
      { r: 0.95, g: 0.22, b: 0.03 }, // Deep Ember Crimson
      { r: 1.0, g: 0.92, b: 0.72 }  // Luminous White-Gold
    ]

    // Position generators
    const getSpawnX = () => {
      if (isFull) {
        // Full screen edge-to-edge for About page
        return (Math.random() - 0.5) * 26.0
      }
      // Right-focused for Home Hero around the 3D robot, keeping text on left clean
      return (Math.random() - 0.2) * 9.0 + 1.2
    }

    const getSpawnY = () => {
      if (isFull) {
        return (Math.random() - 0.5) * 11.0
      }
      return (Math.random() - 0.5) * 7.0 - 0.5
    }

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = getSpawnX()
      particlePositions[i * 3 + 1] = getSpawnY()
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5.5 + (isFull ? 0.5 : 1.0)

      const col = palette[Math.floor(Math.random() * palette.length)]
      particleColors[i * 3 + 0] = col.r
      particleColors[i * 3 + 1] = col.g
      particleColors[i * 3 + 2] = col.b

      particleSpeeds[i] = 0.007 + Math.random() * 0.016
      particleDrifts[i] = (Math.random() - 0.5) * 0.006
      particleScales[i] = Math.random() * 0.8 + 0.5
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    // High Quality Radial Ember Glow Texture
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 64
    pCanvas.height = 64
    const pCtx = pCanvas.getContext('2d')
    const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 250, 220, 1)')
    gradient.addColorStop(0.22, 'rgba(255, 135, 20, 0.95)')
    gradient.addColorStop(0.65, 'rgba(255, 55, 0, 0.35)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    pCtx.fillStyle = gradient
    pCtx.fillRect(0, 0, 64, 64)
    const particleTexture = new THREE.CanvasTexture(pCanvas)

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    // Interactive Mouse & Scroll Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let scrollY = 0
    let targetScrollY = 0

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top
      mouse.targetX = (clientX / width - 0.5) * 2
      mouse.targetY = (clientY / height - 0.5) * 2
    }

    const onScroll = () => {
      targetScrollY = window.scrollY
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Resize Handler with ResizeObserver support
    const onResize = () => {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || 750
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    let resizeObserver = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => onResize())
      resizeObserver.observe(container)
    }

    // Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Mouse & Scroll interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05
      scrollY += (targetScrollY - scrollY) * 0.08

      // Scroll-driven camera parallax
      const scrollFactor = Math.min(scrollY / 800, 1.5)
      camera.position.x = mouse.x * 0.35
      camera.position.y = -mouse.y * 0.22 - scrollFactor * 1.5
      camera.position.z = 8 + scrollFactor * 2.0
      camera.lookAt(0, -scrollFactor * 0.8, 0)

      // Light response
      const pulse = Math.sin(elapsedTime * 2.2) * 0.8
      lightRight.position.x = 2.5 + mouse.x * 0.5
      lightRight.position.y = -0.5 - mouse.y * 0.5 - scrollFactor * 0.5
      lightRight.intensity = Math.max(0.5, (3.8 + pulse) * (1 - scrollFactor * 0.6))

      if (lightLeft) {
        lightLeft.intensity = Math.max(0.5, (3.2 - pulse) * (1 - scrollFactor * 0.6))
      }

      // Particle physics: float upwards with scroll drag
      const positions = particleSystem.geometry.attributes.position.array
      const resetThreshold = isFull ? 5.5 : 4.5
      const resetY = isFull ? -5.5 : -3.4

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i]
        positions[i * 3 + 0] += particleDrifts[i] + Math.sin(elapsedTime * 1.3 + i * 0.5) * 0.0028

        // Reset loop
        if (positions[i * 3 + 1] > resetThreshold) {
          positions[i * 3 + 1] = resetY
          positions[i * 3 + 0] = getSpawnX()
          if (isFull) {
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6.5 + 0.5
          }
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (resizeObserver) resizeObserver.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      particleTexture.dispose()
    }
  }, [mode])

  return <div ref={mountRef} className="hero-canvas-container" />
}
