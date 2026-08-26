import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { Canvas, extend, useFrame, type ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'
import { constellationNodes, CONSTELLATION_ASPECT } from '@/data/constellation'

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  attribute vec3 aStart;
  attribute vec3 aTarget;
  attribute float aSeed;
  varying float vSeed;
  varying float vFade;

  // Smooth ease so the formation doesn't snap linearly.
  float easeOutCubic(float t) {
    float f = t - 1.0;
    return f * f * f + 1.0;
  }

  void main() {
    vSeed = aSeed;

    // Each particle starts its journey at a slightly different point along uProgress,
    // driven by its seed, so the formation reads as a drift rather than one lockstep move.
    float localT = clamp((uProgress - aSeed * 0.25) / (1.0 - aSeed * 0.25 + 1e-4), 0.0, 1.0);
    float eased = easeOutCubic(localT);

    vec3 pos = mix(aStart, aTarget, eased);

    // Idle drift once (mostly) formed, and a gentle scatter breathing while dispersed.
    float driftAmp = mix(0.14, 0.02, eased);
    pos.x += sin(uTime * 0.6 + aSeed * 62.0) * driftAmp;
    pos.y += cos(uTime * 0.5 + aSeed * 41.0) * driftAmp;
    pos.z += sin(uTime * 0.4 + aSeed * 27.0) * driftAmp * 0.6;

    vFade = 0.35 + eased * 0.65;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (0.8 + aSeed * 0.7) * (16.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vSeed;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, glow * vFade * (0.28 + vSeed * 0.22));
  }
`

class ParticlePortraitMaterialImpl extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#C9A24D') },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }
}

extend({ ParticlePortraitMaterialImpl })

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      particlePortraitMaterialImpl: ReactThreeFiber.Object3DNode<
        ParticlePortraitMaterialImpl,
        typeof ParticlePortraitMaterialImpl
      >
    }
  }
}

/** Particles-per-anchor-point. Higher = denser portrait, more GPU cost. */
type Density = 'low' | 'mid' | 'high'
const DENSITY_MULTIPLIER: Record<Density, number> = { low: 0, mid: 16, high: 46 }

function buildGeometry(density: Density) {
  const multiplier = DENSITY_MULTIPLIER[density]
  const count = constellationNodes.length * multiplier
  const aStart = new Float32Array(count * 3)
  const aTarget = new Float32Array(count * 3)
  const aSeed = new Float32Array(count)

  const width = 2.6
  const height = width / CONSTELLATION_ASPECT

  let i = 0
  for (const [nx, ny] of constellationNodes) {
    const tx = (nx - 0.5) * width
    const ty = -(ny - 0.5) * height

    for (let j = 0; j < multiplier; j++) {
      const idx = i * multiplier + j
      const jitter = 0.045
      aTarget[idx * 3 + 0] = tx + (Math.random() - 0.5) * jitter
      aTarget[idx * 3 + 1] = ty + (Math.random() - 0.5) * jitter
      aTarget[idx * 3 + 2] = (Math.random() - 0.5) * jitter * 2

      const radius = 2.2 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      aStart[idx * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta)
      aStart[idx * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      aStart[idx * 3 + 2] = radius * Math.cos(phi)

      aSeed[idx] = Math.random()
    }
    i++
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(aTarget.slice(), 3))
  geometry.setAttribute('aStart', new THREE.BufferAttribute(aStart, 3))
  geometry.setAttribute('aTarget', new THREE.BufferAttribute(aTarget, 3))
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1))
  return geometry
}

export interface ParticleFieldProps {
  /** 0..1, reactive. Ignored when `progressRef` is provided. */
  progress?: number
  /** 0..1, imperative — takes priority over `progress`. For embedding inside a shared,
   *  persistently-rendering Canvas driven by scroll, where per-frame React state would be wasteful. */
  progressRef?: MutableRefObject<number>
  density: Density
}

export function ParticleField({ progress, progressRef: externalProgressRef, density }: ParticleFieldProps) {
  const materialRef = useRef<ParticlePortraitMaterialImpl>(null)
  const geometry = useMemo(() => buildGeometry(density), [density])
  const smoothedProgress = useRef(0)

  useLayoutEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state, delta) => {
    if (!materialRef.current) return
    const target = externalProgressRef ? externalProgressRef.current : (progress ?? 0)
    smoothedProgress.current += (target - smoothedProgress.current) * Math.min(1, delta * 2.2)
    materialRef.current.uniforms.uProgress.value = smoothedProgress.current
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  if (density === 'low') return null

  return (
    <points geometry={geometry}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <particlePortraitMaterialImpl ref={materialRef} />
    </points>
  )
}

export default function ParticlePortrait({
  progress,
  density = 'high',
}: {
  /** 0 = scattered cloud, 1 = fully resolved portrait silhouette. */
  progress: number
  density?: Density
}) {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: false }}>
      <Suspense fallback={null}>
        <ParticleField progress={progress} density={density} />
      </Suspense>
    </Canvas>
  )
}
