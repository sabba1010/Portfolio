import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Dimensions
    let width = container.clientWidth
    let height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x070709, 0.035)

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 1.2, 7.5)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1a1a24, 1.2)
    scene.add(ambientLight)

    // Primary fiery magma light beneath the rocks
    const lavaLight = new THREE.PointLight(0xff5500, 12, 18)
    lavaLight.position.set(2.2, -1.2, 1.2)
    scene.add(lavaLight)

    const lavaLight2 = new THREE.PointLight(0xff3300, 6, 12)
    lavaLight2.position.set(0.5, -2, -1)
    scene.add(lavaLight2)

    // Cool rim light for sleek contrast
    const rimLight = new THREE.DirectionalLight(0x7799cc, 1.8)
    rimLight.position.set(-5, 6, 4)
    scene.add(rimLight)

    const topOrangeLight = new THREE.PointLight(0xff7700, 5, 10)
    topOrangeLight.position.set(3, 2.5, 2)
    scene.add(topOrangeLight)

    // 1. Procedural Volcanic Rock Terrain
    const terrainGeo = new THREE.PlaneGeometry(16, 12, 64, 48)
    terrainGeo.rotateX(-Math.PI / 2.3)
    const posAttr = terrainGeo.attributes.position
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i)
      const vy = posAttr.getY(i)
      // Craggy rocky terrain displacement
      const bump1 = Math.sin(vx * 1.5) * Math.cos(vy * 1.2) * 0.45
      const bump2 = Math.sin(vx * 3.2 + 1.2) * Math.sin(vy * 2.8) * 0.25
      const crater = Math.exp(-((vx - 2) ** 2 + (vy + 1) ** 2) / 3.5) * -0.6
      posAttr.setZ(i, bump1 + bump2 + crater)
    }
    terrainGeo.computeVertexNormals()

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x121316,
      roughness: 0.85,
      metalness: 0.2,
      flatShading: true,
    })
    const terrainMesh = new THREE.Mesh(terrainGeo, rockMat)
    terrainMesh.position.set(1.8, -2.4, -0.5)
    scene.add(terrainMesh)

    // 2. Magma Glow Plane underneath the terrain crevices
    const magmaGeo = new THREE.PlaneGeometry(14, 10)
    magmaGeo.rotateX(-Math.PI / 2.3)
    const magmaMat = new THREE.MeshBasicMaterial({
      color: 0xff3700,
      transparent: true,
      opacity: 0.5,
    })
    const magmaMesh = new THREE.Mesh(magmaGeo, magmaMat)
    magmaMesh.position.set(1.8, -2.5, -0.6)
    scene.add(magmaMesh)

    // 3. Floating 3D Object A: Dark Glossy Phone/Tablet Slate
    // Sleek chamfered/rounded dark device
    const slabGeo = new THREE.BoxGeometry(1.6, 2.8, 0.16, 4, 4, 4)
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x0a0b0e,
      roughness: 0.15,
      metalness: 0.88,
    })
    const slabMesh = new THREE.Mesh(slabGeo, slabMat)
    slabMesh.position.set(1.6, 1.1, 0.4)
    slabMesh.rotation.set(0.2, -0.38, -0.15)
    scene.add(slabMesh)

    // Edge bevel light strip on the slab
    const slabBorderGeo = new THREE.BoxGeometry(1.64, 2.84, 0.14)
    const slabBorderMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      roughness: 0.3,
      metalness: 0.7,
    })
    const slabBorderMesh = new THREE.Mesh(slabBorderGeo, slabBorderMat)
    slabMesh.add(slabBorderMesh)

    // 4. Floating 3D Object B: Glowing Translucent Orange Triangular Prism
    const prismGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.42, 3)
    prismGeo.rotateX(Math.PI / 2)
    prismGeo.rotateZ(Math.PI)
    
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0xff4d00,
      emissive: 0xff3300,
      emissiveIntensity: 0.6,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.82,
      thickness: 1.2,
      ior: 1.52,
      transparent: true,
      opacity: 0.94,
    })
    const prismMesh = new THREE.Mesh(prismGeo, prismMat)
    prismMesh.position.set(3.3, 1.6, 0.8)
    prismMesh.rotation.set(0.1, -0.2, 0.12)
    scene.add(prismMesh)

    // Point light inside the prism to make it glow from within
    const innerPrismLight = new THREE.PointLight(0xff6600, 3.5, 4)
    innerPrismLight.position.set(0, 0, 0)
    prismMesh.add(innerPrismLight)

    // 5. Rising Magma Ember Particles
    const particleCount = 280
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSpeeds = new Float32Array(particleCount)
    const particleDrifts = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.2) * 8 + 1.5 // X
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5 - 0.5 // Y
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6 + 1   // Z
      particleSpeeds[i] = 0.008 + Math.random() * 0.015
      particleDrifts[i] = (Math.random() - 0.5) * 0.004
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    // Canvas circular particle texture for glowing embers
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 32
    pCanvas.height = 32
    const pCtx = pCanvas.getContext('2d')
    const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255, 170, 50, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 85, 0, 0.8)')
    gradient.addColorStop(0.7, 'rgba(255, 40, 0, 0.25)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    pCtx.fillStyle = gradient
    pCtx.fillRect(0, 0, 32, 32)
    const particleTexture = new THREE.CanvasTexture(pCanvas)

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    // Mouse Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top
      mouse.targetX = (clientX / width - 0.5) * 2
      mouse.targetY = (clientY / height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

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
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Floating Slab Animation
      slabMesh.position.y = 1.1 + Math.sin(elapsedTime * 1.1) * 0.1
      slabMesh.rotation.y = -0.38 + Math.cos(elapsedTime * 0.8) * 0.08 + mouse.x * 0.25
      slabMesh.rotation.x = 0.2 + Math.sin(elapsedTime * 0.9) * 0.06 - mouse.y * 0.2

      // Floating Orange Prism Animation
      prismMesh.position.y = 1.6 + Math.sin(elapsedTime * 1.3 + 1.5) * 0.12
      prismMesh.rotation.y = -0.2 + Math.sin(elapsedTime * 0.9) * 0.1 + mouse.x * 0.3
      prismMesh.rotation.z = 0.12 + Math.cos(elapsedTime * 1.2) * 0.08
      prismMesh.rotation.x = 0.1 - mouse.y * 0.25

      // Camera slight response
      camera.position.x = mouse.x * 0.4
      camera.position.y = 1.2 - mouse.y * 0.3
      camera.lookAt(0.6, 0.4, 0)

      // Animate Particles upward
      const positions = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i]
        positions[i * 3 + 0] += particleDrifts[i] + Math.sin(elapsedTime * 2 + i) * 0.002

        // Reset if too high
        if (positions[i * 3 + 1] > 3.8) {
          positions[i * 3 + 1] = -2.2
          positions[i * 3 + 0] = (Math.random() - 0.2) * 8 + 1.5
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      terrainGeo.dispose()
      rockMat.dispose()
      slabGeo.dispose()
      slabMat.dispose()
      slabBorderGeo.dispose()
      slabBorderMat.dispose()
      prismGeo.dispose()
      prismMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      particleTexture.dispose()
    }
  }, [])

  return <div ref={mountRef} className="hero-canvas-container" />
}
