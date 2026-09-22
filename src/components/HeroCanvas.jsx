import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const orangeCoreLight = new THREE.PointLight(0xff5500, 4, 14)
    orangeCoreLight.position.set(2.5, -0.5, 2)
    scene.add(orangeCoreLight)

    // Rising Volcanic Ember Particles
    const particleCount = 340
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSpeeds = new Float32Array(particleCount)
    const particleDrifts = new Float32Array(particleCount)
    const particleScales = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.2) * 9.0 + 1.2
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 7.0 - 0.5
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5.5 + 1.0

      particleSpeeds[i] = 0.007 + Math.random() * 0.016
      particleDrifts[i] = (Math.random() - 0.5) * 0.006
      particleScales[i] = Math.random() * 0.8 + 0.5
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    // High Quality Radial Ember Glow Texture
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 64
    pCanvas.height = 64
    const pCtx = pCanvas.getContext('2d')
    const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 245, 190, 1)')
    gradient.addColorStop(0.22, 'rgba(255, 125, 15, 0.95)')
    gradient.addColorStop(0.65, 'rgba(255, 45, 0, 0.3)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    pCtx.fillStyle = gradient
    pCtx.fillRect(0, 0, 64, 64)
    const particleTexture = new THREE.CanvasTexture(pCanvas)

    const particleMat = new THREE.PointsMaterial({
      size: 0.17,
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

    // Resize Handler
    const onResize = () => {
      if (!container) return
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

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
      camera.position.x = mouse.x * 0.3
      camera.position.y = -mouse.y * 0.2 - scrollFactor * 1.5
      camera.position.z = 8 + scrollFactor * 2.0
      camera.lookAt(0, -scrollFactor * 0.8, 0)

      // Light response
      orangeCoreLight.position.x = 2.5 + mouse.x * 0.5
      orangeCoreLight.position.y = -0.5 - mouse.y * 0.5 - scrollFactor * 0.5
      orangeCoreLight.intensity = Math.max(0.5, (3.8 + Math.sin(elapsedTime * 2.5) * 1.0) * (1 - scrollFactor * 0.6))

      // Particle physics: float upwards with scroll drag
      const positions = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        // Base upward movement + slight downward velocity on fast scroll down
        positions[i * 3 + 1] += particleSpeeds[i]
        positions[i * 3 + 0] += particleDrifts[i] + Math.sin(elapsedTime * 1.4 + i) * 0.0025

        // Reset loop
        if (positions[i * 3 + 1] > 4.5) {
          positions[i * 3 + 1] = -3.4
          positions[i * 3 + 0] = (Math.random() - 0.2) * 9.0 + 1.2
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
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
  }, [])

  return <div ref={mountRef} className="hero-canvas-container" />
}
