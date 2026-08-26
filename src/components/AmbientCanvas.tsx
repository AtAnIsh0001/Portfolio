import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'

export default function AmbientCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: 'none' }}
    >
      <Sparkles count={55} scale={[15, 9, 6]} size={2.2} speed={0.2} opacity={0.5} color="#C9A24D" noise={1.2} />
      <Sparkles count={24} scale={[16, 10, 6]} size={1.3} speed={0.12} opacity={0.28} color="#EDE6D8" noise={1.4} />
    </Canvas>
  )
}
