import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, extend, useFrame, useThree, type ReactThreeFiber } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Clean dissolve between the two portraits — no color filters, no grain, no scanlines
// on top of the photo itself; just a noise-shaped cross-fade so the image stays true.
const fragmentShader = /* glsl */ `
  uniform sampler2D uTexA;
  uniform sampler2D uTexB;
  uniform float uMix;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;

    float n = noise(uv * 7.0);
    float edge = smoothstep(uMix - 0.12, uMix + 0.12, n);
    vec2 displacedUv = uv + (n - 0.5) * 0.03 * (1.0 - abs(uMix - 0.5) * 2.0);

    vec4 colA = texture2D(uTexA, displacedUv);
    vec4 colB = texture2D(uTexB, displacedUv);

    gl_FragColor = mix(colA, colB, 1.0 - edge);
  }
`

class AvatarMaterialImpl extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTexA: { value: null },
        uTexB: { value: null },
        uMix: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    })
  }
}

extend({ AvatarMaterialImpl })

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      avatarMaterialImpl: ReactThreeFiber.Object3DNode<AvatarMaterialImpl, typeof AvatarMaterialImpl>
    }
  }
}

function AvatarPlane({ hovered }: { hovered: boolean }) {
  const [texA, texB] = useTexture(['/assets/avatar-3d.png', '/assets/avatar-photo.png'])
  const materialRef = useRef<AvatarMaterialImpl>(null)
  const mixValue = useRef({ v: 0 })
  // Size the plane to exactly fill the visible frustum at z=0 (drei's viewport helper),
  // so the full portrait shows edge-to-edge with no crop, matching the DOM <img> beneath it.
  const { viewport } = useThree()

  useMemo(() => {
    gsap.to(mixValue.current, { v: hovered ? 1 : 0, duration: 0.9, ease: 'power3.out' })
  }, [hovered])

  useLayoutEffect(() => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTexA.value = texA
    materialRef.current.uniforms.uTexB.value = texB
  }, [texA, texB])

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uMix.value = mixValue.current.v
    }
  })

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <avatarMaterialImpl ref={materialRef} />
    </mesh>
  )
}

export default function AvatarCanvas({ hovered }: { hovered: boolean; reducedMotion?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 2.4], fov: 40 }} dpr={[1, 1.8]} gl={{ alpha: true }}>
      <Suspense fallback={null}>
        <AvatarPlane hovered={hovered} />
      </Suspense>
    </Canvas>
  )
}
