import { motion } from 'framer-motion'
import { CONSTELLATION_ASPECT, constellationEdges, constellationNodes } from '@/data/constellation'
import { EASE_LUXE } from '@/lib/motion'

interface ConstellationPortraitProps {
  width?: number
  color?: string
  className?: string
}

const VIEW_W = 400
const VIEW_H = Math.round(VIEW_W / CONSTELLATION_ASPECT)

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.006 } },
}

const edgeVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 0.65, transition: { duration: 0.4, ease: EASE_LUXE } },
}

const nodeVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.35, ease: EASE_LUXE } },
}

export default function ConstellationPortrait({ width = 260, color = '#C9A24D', className = '' }: ConstellationPortraitProps) {
  const height = Math.round(width / CONSTELLATION_ASPECT)

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      {constellationEdges.map(([a, b], i) => {
        const [x1, y1] = constellationNodes[a]
        const [x2, y2] = constellationNodes[b]
        return (
          <motion.line
            key={i}
            x1={x1 * VIEW_W}
            y1={y1 * VIEW_H}
            x2={x2 * VIEW_W}
            y2={y2 * VIEW_H}
            stroke={color}
            strokeWidth={1}
            variants={edgeVariant}
          />
        )
      })}
      {constellationNodes.map(([x, y], i) => (
        <motion.circle key={i} cx={x * VIEW_W} cy={y * VIEW_H} r={2.2} fill={color} variants={nodeVariant} />
      ))}
    </motion.svg>
  )
}
