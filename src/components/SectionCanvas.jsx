import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * High-performance ambient Three.js 3D background canvas for dark sections.
 * Supports:
 * - 'constellation': 3D drifting node network with glowing connecting lines
 * - 'wave': Undulating 3D perspective particle ribbon with ripple physics
 * - 'flow': Tech particle stream with glowing depth trails
 */
export default function SectionCanvas({ variant = 'constellation', className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || 600

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(0, 0, 7)

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3. Shared Glow Sprite Texture
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 64
    pCanvas.height = 64
    const pCtx = pCanvas.getContext('2d')
    const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255, 240, 200, 1)')
    grad.addColorStop(0.25, 'rgba(255, 110, 10, 0.9)')
    grad.addColorStop(0.65, 'rgba(255, 60, 0, 0.25)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    pCtx.fillStyle = grad
    pCtx.fillRect(0, 0, 64, 64)
    const particleTexture = new THREE.CanvasTexture(pCanvas)

    // Interactive mouse coordinates
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouse.targetX = ((e.clientX - rect.left) / width - 0.5) * 2
        mouse.targetY = ((e.clientY - rect.top) / height - 0.5) * 2
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Resizing
    const onResize = () => {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || 600
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    let updateVariant = () => {}
    let cleanupVariant = () => {}

    // =========================================================================
    // VARIANT: CONSTELLATION (Nodes + Dynamic Proximity Connecting Lines)
    // =========================================================================
    if (variant === 'constellation') {
      const nodeCount = 75
      const maxConnectDist = 1.95
      const positions = new Float32Array(nodeCount * 3)
      const velocities = []

      for (let i = 0; i < nodeCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 11
        positions[i * 3 + 1] = (Math.random() - 0.5) * 7.5
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5
        velocities.push({
          x: (Math.random() - 0.5) * 0.006,
          y: (Math.random() - 0.5) * 0.006,
          z: (Math.random() - 0.5) * 0.004
        })
      }

      const nodeGeo = new THREE.BufferGeometry()
      nodeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const nodeMat = new THREE.PointsMaterial({
        size: 0.16,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
      const nodeSystem = new THREE.Points(nodeGeo, nodeMat)
      scene.add(nodeSystem)

      // Line Segments
      const maxLines = (nodeCount * (nodeCount - 1)) / 2
      const linePositions = new Float32Array(maxLines * 6)
      const lineColors = new Float32Array(maxLines * 6)
      const lineGeo = new THREE.BufferGeometry()
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
      lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.75,
        depthWrite: false
      })
      const lineSystem = new THREE.LineSegments(lineGeo, lineMat)
      scene.add(lineSystem)

      updateVariant = () => {
        const pos = nodeGeo.attributes.position.array
        let lineIdx = 0
        const linePos = lineGeo.attributes.position.array
        const lineCol = lineGeo.attributes.color.array

        for (let i = 0; i < nodeCount; i++) {
          pos[i * 3 + 0] += velocities[i].x
          pos[i * 3 + 1] += velocities[i].y
          pos[i * 3 + 2] += velocities[i].z

          // Boundary wraps
          if (pos[i * 3 + 0] < -6) pos[i * 3 + 0] = 6
          if (pos[i * 3 + 0] > 6) pos[i * 3 + 0] = -6
          if (pos[i * 3 + 1] < -4.2) pos[i * 3 + 1] = 4.2
          if (pos[i * 3 + 1] > 4.2) pos[i * 3 + 1] = -4.2

          // Check line connections to other nodes
          for (let j = i + 1; j < nodeCount; j++) {
            const dx = pos[i * 3 + 0] - pos[j * 3 + 0]
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

            if (dist < maxConnectDist) {
              const alpha = Math.pow(1 - dist / maxConnectDist, 1.5) * 0.65
              // Vertex 1
              linePos[lineIdx * 6 + 0] = pos[i * 3 + 0]
              linePos[lineIdx * 6 + 1] = pos[i * 3 + 1]
              linePos[lineIdx * 6 + 2] = pos[i * 3 + 2]
              lineCol[lineIdx * 6 + 0] = 1.0 * alpha
              lineCol[lineIdx * 6 + 1] = 0.35 * alpha
              lineCol[lineIdx * 6 + 2] = 0.05 * alpha

              // Vertex 2
              linePos[lineIdx * 6 + 3] = pos[j * 3 + 0]
              linePos[lineIdx * 6 + 4] = pos[j * 3 + 1]
              linePos[lineIdx * 6 + 5] = pos[j * 3 + 2]
              lineCol[lineIdx * 6 + 3] = 1.0 * alpha
              lineCol[lineIdx * 6 + 4] = 0.35 * alpha
              lineCol[lineIdx * 6 + 5] = 0.05 * alpha

              lineIdx++
            }
          }
        }

        nodeGeo.attributes.position.needsUpdate = true
        lineGeo.setDrawRange(0, lineIdx * 2)
        lineGeo.attributes.position.needsUpdate = true
        lineGeo.attributes.color.needsUpdate = true

        // Parallax rotation
        camera.position.x = mouse.x * 0.4
        camera.position.y = -mouse.y * 0.3
        camera.lookAt(0, 0, 0)
      }

      cleanupVariant = () => {
        nodeGeo.dispose()
        nodeMat.dispose()
        lineGeo.dispose()
        lineMat.dispose()
      }
    }

    // =========================================================================
    // VARIANT: WAVE (Undulating 3D Particle Mesh Ribbon)
    // =========================================================================
    else if (variant === 'wave') {
      const cols = 38
      const rows = 24
      const count = cols * rows
      const positions = new Float32Array(count * 3)

      const spacingX = 0.35
      const spacingZ = 0.35
      const offsetX = ((cols - 1) * spacingX) / 2
      const offsetZ = ((rows - 1) * spacingZ) / 2

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 3
          positions[idx + 0] = c * spacingX - offsetX
          positions[idx + 1] = 0
          positions[idx + 2] = r * spacingZ - offsetZ
        }
      }

      const waveGeo = new THREE.BufferGeometry()
      waveGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const waveMat = new THREE.PointsMaterial({
        size: 0.15,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })

      const waveSystem = new THREE.Points(waveGeo, waveMat)
      waveSystem.rotation.x = 1.05
      waveSystem.position.y = -1.2
      scene.add(waveSystem)

      const clock = new THREE.Clock()

      updateVariant = () => {
        const time = clock.getElapsedTime()
        const pos = waveGeo.attributes.position.array

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = (r * cols + c) * 3
            const x = pos[idx + 0]
            const z = pos[idx + 2]

            // Dynamic sine wave height calculation
            pos[idx + 1] = 
              Math.sin(x * 0.55 + time * 1.4) * 0.42 +
              Math.cos(z * 0.65 + time * 1.1) * 0.35 +
              Math.sin((x + z) * 0.3 + time * 0.8) * 0.22
          }
        }

        waveGeo.attributes.position.needsUpdate = true

        // Gentle camera tilt
        camera.position.x = mouse.x * 0.5
        camera.position.y = 0.8 - mouse.y * 0.3
        camera.lookAt(0, -0.8, 0)
      }

      cleanupVariant = () => {
        waveGeo.dispose()
        waveMat.dispose()
      }
    }

    // =========================================================================
    // VARIANT: FLOW (Tech Stream with Depth Trajectories)
    // =========================================================================
    else if (variant === 'flow') {
      const count = 160
      const positions = new Float32Array(count * 3)
      const speeds = new Float32Array(count)
      const radii = new Float32Array(count)
      const angles = new Float32Array(count)

      for (let i = 0; i < count; i++) {
        radii[i] = 1.2 + Math.random() * 3.8
        angles[i] = Math.random() * Math.PI * 2
        speeds[i] = 0.012 + Math.random() * 0.02
        positions[i * 3 + 0] = Math.cos(angles[i]) * radii[i]
        positions[i * 3 + 1] = Math.sin(angles[i]) * (radii[i] * 0.45)
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      }

      const flowGeo = new THREE.BufferGeometry()
      flowGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const flowMat = new THREE.PointsMaterial({
        size: 0.17,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })

      const flowSystem = new THREE.Points(flowGeo, flowMat)
      scene.add(flowSystem)

      updateVariant = () => {
        const pos = flowGeo.attributes.position.array

        for (let i = 0; i < count; i++) {
          angles[i] += speeds[i] * 0.45
          pos[i * 3 + 0] = Math.cos(angles[i]) * radii[i]
          pos[i * 3 + 1] = Math.sin(angles[i]) * (radii[i] * 0.45)
          pos[i * 3 + 2] += speeds[i] * 2.5

          // Loop forward travel
          if (pos[i * 3 + 2] > 4.5) {
            pos[i * 3 + 2] = -5.5
          }
        }

        flowGeo.attributes.position.needsUpdate = true

        camera.position.x = mouse.x * 0.4
        camera.position.y = -mouse.y * 0.3
        camera.lookAt(0, 0, 0)
      }

      cleanupVariant = () => {
        flowGeo.dispose()
        flowMat.dispose()
      }
    }

    // =========================================================================
    // 4. Animation Loop with Intersection Observer for 120fps Efficiency
    // =========================================================================
    let animationFrameId
    let isVisible = true

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisible) return

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06

      updateVariant()
      renderer.render(scene, camera)
    }
    animate()

    // 5. Unmount Cleanup
    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationFrameId)
      cleanupVariant()
      particleTexture.dispose()
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [variant])

  return <div ref={mountRef} className={`section-canvas-wrap ${className}`} />
}
