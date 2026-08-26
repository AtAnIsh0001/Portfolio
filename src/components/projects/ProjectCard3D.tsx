import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { RoundedBox, useTexture, Lightformer, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import type { Mesh } from 'three'
import { useCursor } from '@/context/CursorContext'
import { useWebGLSupport } from '@/lib/hooks'
import { useDeviceTier } from '@/lib/deviceTier'
import ProjectPreview from './ProjectPreview'
import type { Project } from '@/data/projects'

const BLANK_TEXTURE = '/assets/logo.png'

// drei's RoundedBox is built from THREE.ExtrudeGeometry, not BoxGeometry — it only
// ever produces 2 material groups (confirmed against three.js's source): group 0 is
// the front+back caps together (no way to target just one face with this geometry),
// group 1 is the extruded side/rim walls. The previous material-0..material-5 setup
// assumed 6 independent box faces, so the "identity" material never actually attached
// to anything the geometry referenced — the card only ever showed its plain rim color.
function TexturedFace({ image, accent }: { image: string | null; accent: string }) {
  const tex = useTexture(image ?? BLANK_TEXTURE)
  tex.colorSpace = THREE.SRGBColorSpace
  return image ? (
    <meshPhysicalMaterial attach="material-0" map={tex} roughness={0.35} metalness={0.15} clearcoat={0.4} />
  ) : (
    <meshPhysicalMaterial attach="material-0" color={accent} roughness={0.3} metalness={0.2} clearcoat={0.4} />
  )
}

function DragCard({ project }: { project: Project }) {
  const meshRef = useRef<Mesh>(null)
  const rotation = useRef({ x: -0.05, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const { setLabel } = useCursor()

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = true
    last.current = { x: e.clientX, y: e.clientY }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }
  const onPointerUp = () => {
    dragging.current = false
  }
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    last.current = { x: e.clientX, y: e.clientY }
    velocity.current.y = dx * 0.008
    velocity.current.x = dy * 0.008
  }

  useFrame((state) => {
    if (!meshRef.current) return
    rotation.current.y += velocity.current.y
    rotation.current.x += velocity.current.x
    velocity.current.y *= dragging.current ? 1 : 0.94
    velocity.current.x *= dragging.current ? 1 : 0.94

    // Once a drag-flick's momentum has mostly decayed, settle into a small, bounded
    // idle sway instead of drifting forever — an unconditional += here previously
    // meant the card would rotate fully away from its textured/accent front face
    // within seconds of being left alone, reading as a plain dark slab.
    if (!dragging.current && Math.abs(velocity.current.y) < 0.002) {
      const idleTarget = Math.sin(state.clock.elapsedTime * 0.35) * 0.18
      rotation.current.y += (idleTarget - rotation.current.y) * 0.02
    }

    meshRef.current.rotation.y = rotation.current.y
    meshRef.current.rotation.x = THREE.MathUtils.clamp(rotation.current.x, -0.6, 0.6)
  })

  return (
    <mesh
      ref={meshRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setLabel('DRAG TO ROTATE')}
      onPointerLeave={() => setLabel(null)}
    >
      <RoundedBox args={[2.4, 1.5, 0.14]} radius={0.08} smoothness={4}>
        <TexturedFace image={project.image} accent={project.accent} />
        <meshPhysicalMaterial attach="material-1" color="#151922" roughness={0.4} metalness={0.3} />
      </RoundedBox>
    </mesh>
  )
}

function StudioLights() {
  return (
    <Environment resolution={64}>
      <Lightformer intensity={2} color="#C9A24D" position={[-4, 2, 2]} scale={[3, 3, 1]} />
      <Lightformer intensity={1.4} color="#E9B48A" position={[4, -1, 2]} scale={[3, 3, 1]} />
      <Lightformer intensity={0.8} color="#EDE6D8" position={[0, 4, -3]} scale={[5, 5, 1]} />
    </Environment>
  )
}

export default function ProjectCard3D({ project }: { project: Project }) {
  const webglOk = useWebGLSupport()
  const tier = useDeviceTier()
  const [ready, setReady] = useState(false)

  if (!webglOk) {
    return <ProjectPreview project={project} />
  }

  const postprocessingOn = tier !== 'low'

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 42 }}
        dpr={tier === 'low' ? 1 : [1, 1.75]}
        onCreated={() => setReady(true)}
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s ease' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 4]} intensity={0.8} />
        <Suspense fallback={null}>
          <StudioLights />
          <DragCard project={project} />
        </Suspense>
        {postprocessingOn && (
          <EffectComposer>
            <Bloom intensity={0.55} luminanceThreshold={0.35} luminanceSmoothing={0.25} mipmapBlur radius={0.6} />
            <Vignette eskil={false} offset={0.15} darkness={0.6} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
