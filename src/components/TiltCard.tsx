import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  intensity?: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function TiltCard({ children, className = '', intensity = 8, onMouseEnter, onMouseLeave }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), { stiffness: 220, damping: 22 })

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    px.set(nx)
    py.set(ny)
    ref.current?.style.setProperty('--mx', `${nx * 100}%`)
    ref.current?.style.setProperty('--my', `${ny * 100}%`)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
    onMouseLeave?.()
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(201,162,77,0.18), transparent 70%)',
        }}
      />
      {children}
    </motion.div>
  )
}
