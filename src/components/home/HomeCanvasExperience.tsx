import { Suspense, useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { AvatarPlane } from '@/components/hero/AvatarCanvas'
import { ParticleField } from '@/components/home/ParticlePortrait'
import { SCENE_BEATS, PARTICLES_STAGE_X, type Vec3 } from '@/lib/scrollScenes'
import { useDeviceTier } from '@/lib/deviceTier'

gsap.registerPlugin(ScrollTrigger)

function lerpVec3(out: Vec3, a: Vec3, b: Vec3, t: number) {
  out.x = a.x + (b.x - a.x) * t
  out.y = a.y + (b.y - a.y) * t
  out.z = a.z + (b.z - a.z) * t
  return out
}

interface CameraState {
  position: Vec3
  lookAt: Vec3
}

/** Reads the shared camera target ref each frame and damps the real camera toward it — never snaps, even if scroll updates arrive in bursts. */
function CameraRig({ targetRef }: { targetRef: MutableRefObject<CameraState> }) {
  const { camera } = useThree()
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((_, delta) => {
    const t = targetRef.current
    const damp = Math.min(1, delta * 3)
    camera.position.x += (t.position.x - camera.position.x) * damp
    camera.position.y += (t.position.y - camera.position.y) * damp
    camera.position.z += (t.position.z - camera.position.z) * damp
    currentLookAt.current.x += (t.lookAt.x - currentLookAt.current.x) * damp
    currentLookAt.current.y += (t.lookAt.y - currentLookAt.current.y) * damp
    currentLookAt.current.z += (t.lookAt.z - currentLookAt.current.z) * damp
    camera.lookAt(currentLookAt.current)
  })

  return null
}

/**
 * Persistent, full-viewport Canvas fixed behind the DOM. GSAP ScrollTrigger instances
 * (one per `[data-beat]` section in the DOM) write into plain refs each scroll tick —
 * no React state — which CameraRig and each beat's own useFrame read directly. This is
 * the backbone the plan calls for: one WebGL context for the whole journey, decoupled
 * scroll-scrub granularity from render smoothness.
 */
export default function HomeCanvasExperience() {
  const tier = useDeviceTier()
  const cameraTarget = useRef<CameraState>({ position: { x: 0.6, y: 0.1, z: 3.4 }, lookAt: { x: 0.15, y: 0, z: 0 } })
  const avatarProgress = useRef(0)
  const particlesProgress = useRef(0)
  const progressRefs: Record<string, MutableRefObject<number>> = {
    avatar: avatarProgress,
    particles: particlesProgress,
  }

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    for (const beat of SCENE_BEATS) {
      const el = document.querySelector<HTMLElement>(`[data-beat="${beat.id}"]`)
      const ref = progressRefs[beat.id]
      if (!el || !ref) continue

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress
          ref.current = p
          lerpVec3(cameraTarget.current.position, beat.cameraFrom, beat.cameraTo, p)
          lerpVec3(cameraTarget.current.lookAt, beat.lookAtFrom, beat.lookAtTo, p)
        },
      })
      triggers.push(trigger)
    }

    return () => triggers.forEach((t) => t.kill())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (tier === 'low') return null

  const postprocessingOn = tier === 'high'

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0.6, 0.1, 3.4], fov: 42 }}
        dpr={tier === 'mid' ? 1 : [1, 1.75]}
        gl={{ alpha: true, antialias: false }}
      >
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <CameraRig targetRef={cameraTarget} />
          <AvatarPlane hovered={false} progressRef={avatarProgress} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <group position={[PARTICLES_STAGE_X, 0, 0]}>
            <ParticleField progressRef={particlesProgress} density={tier === 'high' ? 'high' : 'mid'} />
          </group>
          {postprocessingOn && (
            <EffectComposer>
              <Bloom intensity={0.5} luminanceThreshold={0.3} luminanceSmoothing={0.25} mipmapBlur radius={0.6} />
              <Vignette eskil={false} offset={0.15} darkness={0.55} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
