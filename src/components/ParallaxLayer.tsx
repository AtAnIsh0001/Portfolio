import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
}

/** Shifts children vertically as their own section scrolls through the viewport, for a multi-layer depth feel. */
export default function ParallaxLayer({ children, speed = 0.3, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
