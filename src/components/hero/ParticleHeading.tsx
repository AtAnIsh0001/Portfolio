import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface ParticleHeadingProps {
  lines: string[]
  className?: string
}

interface CharSeed {
  dx: number
  dy: number
  rot: number
}

export default function ParticleHeading({ lines, className }: ParticleHeadingProps) {
  const seeds = useMemo<CharSeed[][]>(
    () =>
      lines.map((line) =>
        line.split('').map(() => ({
          dx: (Math.random() - 0.5) * 170,
          dy: (Math.random() - 0.5) * 120,
          rot: (Math.random() - 0.5) * 70,
        })),
      ),
    [lines],
  )

  let globalIndex = 0

  return (
    <h1 className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split('').map((char, ci) => {
            const seed = seeds[li][ci]
            const i = globalIndex++
            return (
              <motion.span
                key={ci}
                className="inline-block"
                style={char === ' ' ? { whiteSpace: 'pre' } : undefined}
                initial={{ opacity: 0, x: seed.dx, y: seed.dy, rotate: seed.rot, scale: 0.4, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ type: 'spring', stiffness: 210, damping: 17, mass: 0.7, delay: 0.15 + i * 0.028 }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
