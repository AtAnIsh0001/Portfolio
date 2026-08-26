import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

function Char({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children === ' ' ? ' ' : children}
    </motion.span>
  )
}

export default function AnimatedText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const characters = text.split('')

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, i) => {
        const start = i / characters.length
        const end = start + 1 / characters.length
        return (
          <Char key={i} progress={scrollYProgress} range={[start, end]}>
            {char}
          </Char>
        )
      })}
    </p>
  )
}
