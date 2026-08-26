import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'

function FloatingGem() {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.22
    ref.current.rotation.y += delta * 0.32
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.3, 0]} />
      <MeshDistortMaterial
        color="#C9A24D"
        emissive="#3A2C13"
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.9}
        distort={0.25}
        speed={1.4}
      />
    </mesh>
  )
}

export default function HeroObjectCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 40 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.75]}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 3]} intensity={50} color="#EDE1B0" />
      <pointLight position={[-3, -2, 2]} intensity={20} color="#8C6D2F" />
      <FloatingGem />
    </Canvas>
  )
}
