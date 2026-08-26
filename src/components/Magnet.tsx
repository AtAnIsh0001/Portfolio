import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
  cursorLabel?: string
}

export default function Magnet({ children, padding = 100, strength = 3, className, cursorLabel }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 })

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    const maxDist = rect.width / 2 + padding

    if (dist < maxDist) {
      x.set(dx / strength)
      y.set(dy / strength)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handlePointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-cursor={cursorLabel}
    >
      {children}
    </motion.div>
  )
}
