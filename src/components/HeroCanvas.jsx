import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Helper: Generate procedural basalt rock texture
function createBasaltTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Base dark charcoal tone
  ctx.fillStyle = '#14151a'
  ctx.fillRect(0, 0, 512, 512)

  // Layered rock grain & crags
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const radius = Math.random() * 2.5 + 0.5
    const shade = Math.floor(Math.random() * 35) + 12
    ctx.fillStyle = `rgb(${shade}, ${shade + 2}, ${shade + 5})`
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Crag cracks
  ctx.strokeStyle = 'rgba(5, 5, 8, 0.7)'
  ctx.lineWidth = 1.5
  for (let c = 0; c < 30; c++) {
    let cx = Math.random() * 512
    let cy = Math.random() * 512
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    for (let s = 0; s < 6; s++) {
      cx += (Math.random() - 0.5) * 40
      cy += (Math.random() - 0.5) * 40
      ctx.lineTo(cx, cy)
    }
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  return texture
}

// Helper: Generate procedural magma lava texture
function createLavaTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Dark molten crust
  ctx.fillStyle = '#200500'
  ctx.fillRect(0, 0, 512, 512)

  // Glowing lava streams
  for (let i = 0; i < 40; i++) {
    let lx = Math.random() * 512
    let ly = Math.random() * 512
    const grad = ctx.createRadialGradient(lx, ly, 5, lx, ly, Math.random() * 80 + 30)
    grad.addColorStop(0, '#fff490')
    grad.addColorStop(0.2, '#ff6a00')
    grad.addColorStop(0.6, '#cc2800')
    grad.addColorStop(1, 'rgba(32, 5, 0, 0)')

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(lx, ly, Math.random() * 60 + 20, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

// Helper: Create rounded rectangle shape for smartphone/slate
function createRoundedRectShape(w, h, r) {
  const shape = new THREE.Shape()
  shape.moveTo(-w / 2 + r, -h / 2)
  shape.lineTo(w / 2 - r, -h / 2)
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
  shape.lineTo(w / 2, h / 2 - r)
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
  shape.lineTo(-w / 2 + r, h / 2)
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
  shape.lineTo(-w / 2, -h / 2 + r)
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
  return shape
}

// Helper: Create smooth rounded triangle / shield shape for orange prism
function createShieldShape(size) {
  const shape = new THREE.Shape()
  const s = size
  // Rounded top edge and downward pointing tip
  shape.moveTo(-s * 0.85, s * 0.6)
  shape.quadraticCurveTo(0, s * 0.8, s * 0.85, s * 0.6)
  shape.quadraticCurveTo(s * 0.8, 0, 0, -s * 0.9)
  shape.quadraticCurveTo(-s * 0.8, 0, -s * 0.85, s * 0.6)
  return shape
}

export default function HeroCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    // Scene & Fog
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x060608, 0.04)

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 80)
    camera.position.set(0.2, 0.9, 7.2)

    // High-End WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // Textures
    const basaltTexture = createBasaltTexture()
    const lavaTexture = createLavaTexture()

    // ----------------------------------------------------
    // LIGHTING SETUP
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x181924, 1.2)
    scene.add(ambientLight)

    // Fiery volcanic magma lights in the crater
    const lavaCoreLight = new THREE.PointLight(0xff5500, 18, 16, 1.2)
    lavaCoreLight.position.set(2.4, -1.2, 1.2)
    scene.add(lavaCoreLight)

    const lavaAccentLight = new THREE.PointLight(0xff2200, 10, 10, 1.5)
    lavaAccentLight.position.set(1.0, -2.0, -0.2)
    scene.add(lavaAccentLight)

    // Cool rim light (simulates moonlight / studio rim light on the top edge)
    const coolRimLight = new THREE.DirectionalLight(0x7599dd, 2.2)
    coolRimLight.position.set(-6, 6, 2)
    scene.add(coolRimLight)

    // Amber highlight from upper right
    const amberTopLight = new THREE.PointLight(0xff8822, 6, 10)
    amberTopLight.position.set(3.5, 3.2, 2.2)
    scene.add(amberTopLight)

    // ----------------------------------------------------
    // VOLCANIC ROCK FORMATION / CRAGGY TERRAIN
    // ----------------------------------------------------
    const rockMaterial = new THREE.MeshStandardMaterial({
      map: basaltTexture,
      bumpMap: basaltTexture,
      bumpScale: 0.08,
      color: 0x181a20,
      roughness: 0.82,
      metalness: 0.28,
      flatShading: true,
    })

    const rockGroup = new THREE.Group()

    // Cluster of natural jagged volcanic rock boulders
    const rockDefs = [
      { pos: [2.5, -1.8, 0.2], scale: [2.2, 1.6, 2.0], rot: [0.3, 0.4, -0.2], detail: 1 },
      { pos: [1.2, -2.1, 0.8], scale: [1.8, 1.2, 1.6], rot: [-0.2, 0.8, 0.3], detail: 1 },
      { pos: [3.8, -1.5, -0.4], scale: [2.4, 2.2, 2.2], rot: [0.1, -0.5, 0.4], detail: 1 },
      { pos: [0.0, -2.5, 0.3], scale: [2.0, 1.0, 1.8], rot: [0.4, 0.2, -0.1], detail: 1 },
      { pos: [4.5, -1.0, 0.4], scale: [1.9, 1.8, 1.7], rot: [-0.3, 0.6, -0.2], detail: 1 },
      { pos: [2.0, -1.9, 2.0], scale: [1.6, 0.9, 1.4], rot: [0.5, -0.3, 0.2], detail: 1 },
      { pos: [3.4, -1.7, 1.6], scale: [1.5, 1.1, 1.5], rot: [-0.2, 0.5, -0.4], detail: 1 },
    ]

    rockDefs.forEach((def) => {
      const geo = new THREE.DodecahedronGeometry(1, def.detail)
      // Displace vertices to create crags
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i)
        const vy = pos.getY(i)
        const vz = pos.getZ(i)
        const noise = Math.sin(vx * 3.5) * Math.cos(vy * 3.5) * Math.sin(vz * 3.5) * 0.16
        pos.setXYZ(i, vx + noise, vy + noise, vz + noise)
      }
      geo.computeVertexNormals()

      const mesh = new THREE.Mesh(geo, rockMaterial)
      mesh.position.set(...def.pos)
      mesh.scale.set(...def.scale)
      mesh.rotation.set(...def.rot)
      mesh.castShadow = true
      mesh.receiveShadow = true
      rockGroup.add(mesh)
    })

    // Molten Lava Plane in the crater
    const lavaGeo = new THREE.PlaneGeometry(8, 6, 32, 32)
    lavaGeo.rotateX(-Math.PI / 2.2)
    const lavaMat = new THREE.MeshBasicMaterial({
      map: lavaTexture,
      transparent: true,
      opacity: 0.9,
    })
    const lavaMesh = new THREE.Mesh(lavaGeo, lavaMat)
    lavaMesh.position.set(2.4, -2.15, 0.6)
    rockGroup.add(lavaMesh)

    scene.add(rockGroup)

    // ----------------------------------------------------
    // FLOATING 3D OBJECT 1: LUXURY DARK PHONE / SLATE
    // ----------------------------------------------------
    const slateGroup = new THREE.Group()

    // Smooth rounded extrusion
    const slateShape = createRoundedRectShape(1.6, 2.9, 0.22)
    const extrudeSettings = {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    }
    const slateGeo = new THREE.ExtrudeGeometry(slateShape, extrudeSettings)
    slateGeo.center()

    const slateBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0a0b0e,
      metalness: 0.94,
      roughness: 0.14,
    })
    const slateMesh = new THREE.Mesh(slateGeo, slateBodyMat)
    slateGroup.add(slateMesh)

    // Front Glass Surface with specular reflection
    const glassScreenGeo = new THREE.PlaneGeometry(1.5, 2.8)
    const glassScreenMat = new THREE.MeshStandardMaterial({
      color: 0x050608,
      metalness: 0.98,
      roughness: 0.04,
    })
    const screenMesh = new THREE.Mesh(glassScreenGeo, glassScreenMat)
    screenMesh.position.z = 0.11
    slateGroup.add(screenMesh)

    // Subtle dark slate position & rotation matching reference image
    slateGroup.position.set(1.5, 1.05, 0.45)
    slateGroup.rotation.set(0.18, -0.42, -0.16)
    scene.add(slateGroup)

    // ----------------------------------------------------
    // FLOATING 3D OBJECT 2: GLOWING ORANGE TRANSLUCENT PRISM / SHIELD
    // ----------------------------------------------------
    const prismGroup = new THREE.Group()

    const shieldShape = createShieldShape(1.1)
    const shieldExtrudeSettings = {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    }
    const prismGeo = new THREE.ExtrudeGeometry(shieldShape, shieldExtrudeSettings)
    prismGeo.center()

    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0xff4d00,
      emissive: 0xff3200,
      emissiveIntensity: 0.75,
      roughness: 0.04,
      metalness: 0.06,
      transmission: 0.92,
      thickness: 1.6,
      ior: 1.58,
      transparent: true,
      opacity: 0.98,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    })
    const prismMesh = new THREE.Mesh(prismGeo, prismMat)
    prismGroup.add(prismMesh)

    // Inner Core Shield for double-layered crystal refraction look
    const innerShieldShape = createShieldShape(0.75)
    const innerGeo = new THREE.ExtrudeGeometry(innerShieldShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    })
    innerGeo.center()
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff7711,
      transparent: true,
      opacity: 0.5,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    innerMesh.position.z = 0.02
    prismGroup.add(innerMesh)

    // Inner point light so it genuinely glows from inside
    const prismCoreLight = new THREE.PointLight(0xff6a00, 5, 6)
    prismCoreLight.position.set(0, 0, 0.1)
    prismGroup.add(prismCoreLight)

    prismGroup.position.set(3.4, 1.7, 0.95)
    prismGroup.rotation.set(0.12, -0.22, 0.12)
    scene.add(prismGroup)

    // ----------------------------------------------------
    // MAGMA EMBER PARTICLES (VOLCANIC SPARKS)
    // ----------------------------------------------------
    const particleCount = 380
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSpeeds = new Float32Array(particleCount)
    const particleDrifts = new Float32Array(particleCount)
    const particleSwirls = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.2) * 7.5 + 1.8 // X
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5.5 - 0.5 // Y
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6.0 + 1.2 // Z
      particleSpeeds[i] = 0.006 + Math.random() * 0.016
      particleDrifts[i] = (Math.random() - 0.5) * 0.005
      particleSwirls[i] = Math.random() * Math.PI * 2
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    // Radiant Particle Sprite
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 64
    pCanvas.height = 64
    const pCtx = pCanvas.getContext('2d')
    const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 235, 160, 1)')
    gradient.addColorStop(0.2, 'rgba(255, 120, 10, 0.95)')
    gradient.addColorStop(0.6, 'rgba(255, 45, 0, 0.35)')
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

    // ----------------------------------------------------
    // INTERACTIVITY & PARALLAX
    // ----------------------------------------------------
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top
      mouse.targetX = (clientX / width - 0.5) * 2
      mouse.targetY = (clientY / height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      if (!container) return
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    // ----------------------------------------------------
    // ANIMATION LOOP
    // ----------------------------------------------------
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth inertia interpolation (0.04 lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Floating Slate Dynamics
      slateGroup.position.y = 1.05 + Math.sin(elapsedTime * 1.1) * 0.08
      slateGroup.rotation.y = -0.42 + Math.cos(elapsedTime * 0.8) * 0.06 + mouse.x * 0.22
      slateGroup.rotation.x = 0.18 + Math.sin(elapsedTime * 0.9) * 0.05 - mouse.y * 0.16

      // Floating Orange Prism Dynamics
      prismGroup.position.y = 1.7 + Math.sin(elapsedTime * 1.25 + 1.4) * 0.1
      prismGroup.rotation.y = -0.22 + Math.sin(elapsedTime * 0.85) * 0.08 + mouse.x * 0.26
      prismGroup.rotation.z = 0.12 + Math.cos(elapsedTime * 1.05) * 0.06
      prismGroup.rotation.x = 0.12 - mouse.y * 0.2

      // Lava light pulsing (simulates breathing molten fire)
      lavaCoreLight.intensity = 16 + Math.sin(elapsedTime * 2.8) * 3.5
      prismCoreLight.intensity = 4.8 + Math.sin(elapsedTime * 2.2) * 1.2

      // Subtle slow lava texture animation
      lavaTexture.offset.x = (elapsedTime * 0.02) % 1
      lavaTexture.offset.y = (elapsedTime * 0.015) % 1

      // Subtle camera tilt
      camera.position.x = 0.2 + mouse.x * 0.35
      camera.position.y = 0.9 - mouse.y * 0.25
      camera.lookAt(0.7, 0.3, 0)

      // Animate Magma Sparks
      const positions = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i]
        positions[i * 3 + 0] += particleDrifts[i] + Math.sin(elapsedTime * 1.6 + particleSwirls[i]) * 0.0028

        // Reset if reached upper threshold
        if (positions[i * 3 + 1] > 3.8) {
          positions[i * 3 + 1] = -2.2
          positions[i * 3 + 0] = (Math.random() - 0.2) * 7.5 + 1.8
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // ----------------------------------------------------
    // CLEANUP
    // ----------------------------------------------------
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      basaltTexture.dispose()
      lavaTexture.dispose()
      rockMaterial.dispose()
      slateGeo.dispose()
      slateBodyMat.dispose()
      glassScreenGeo.dispose()
      glassScreenMat.dispose()
      prismGeo.dispose()
      prismMat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      particleTexture.dispose()
    }
  }, [])

  return <div ref={mountRef} className="hero-canvas-container" />
}
