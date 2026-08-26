import { motion } from 'framer-motion'
import { drawContainer, drawPath, drawPathTo, nodePulse } from '@/lib/iconMotion'

export interface LineIconProps {
  size?: number
  className?: string
  color?: string
}

const svgProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.6 },
  variants: drawContainer,
} as const

export function BrainCircuitIcon({ size = 56, className = '', color = '#C9A24D' }: LineIconProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...svgProps}>
      <motion.path
        d="M14 30c0-9 7-16 16-16s16 7 16 16c0 5-2 9-6 12l-1 8a3 3 0 0 1-3 3h-4v-5h-6v5h-3a3 3 0 0 1-3-3l-1-7c-3-3-5-7-5-12Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawPath}
      />
      <motion.path d="M22 24h6l3 6h5" stroke={color} strokeWidth="1.4" strokeLinecap="round" variants={drawPath} />
      <motion.path d="M25 35h4l2-4h6" stroke={color} strokeWidth="1.4" strokeLinecap="round" variants={drawPath} />
      <motion.circle cx="41" cy="30" r="1.8" fill={color} {...nodePulse(1.1)} />
      <motion.circle cx="22" cy="24" r="1.6" fill={color} {...nodePulse(1.5)} />
    </motion.svg>
  )
}

export function CodeWindowIcon({ size = 56, className = '', color = '#C9A24D' }: LineIconProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...svgProps}>
      <motion.rect x="8" y="14" width="48" height="36" rx="4" stroke={color} strokeWidth="1.6" variants={drawPath} />
      <motion.path d="M8 24h48" stroke={color} strokeWidth="1.2" variants={drawPath} />
      <motion.path d="M22 30l-6 6 6 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" variants={drawPath} />
      <motion.path d="M42 30l6 6-6 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" variants={drawPath} />
      <motion.path d="M35 27l-6 20" stroke={color} strokeWidth="1.4" strokeLinecap="round" variants={drawPath} />
      <motion.circle cx="14" cy="19" r="1.1" fill={color} variants={drawPath} />
      <motion.circle cx="19" cy="19" r="1.1" fill={color} variants={drawPath} />
      <motion.rect x="46" y="41" width="2" height="6" fill={color} {...nodePulse(1.2)} />
    </motion.svg>
  )
}

export function MotionTrailIcon({ size = 56, className = '', color = '#C9A24D' }: LineIconProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...svgProps}>
      <motion.path d="M12 32c0-7.5 5-14 11.5-16" stroke={color} strokeWidth="1.4" strokeLinecap="round" variants={drawPathTo(0.6)} />
      <motion.path d="M12 32c0 7.5 5 14 11.5 16" stroke={color} strokeWidth="1.4" strokeLinecap="round" variants={drawPathTo(0.6)} />
      <motion.path d="M8 32c0-9.5 6.5-17.5 15-19.8" stroke={color} strokeWidth="1.2" strokeLinecap="round" variants={drawPathTo(0.35)} />
      <motion.path
        d="M26 19l17 13-17 13V19Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawPath}
      />
      <motion.circle cx="12" cy="32" r="1.8" fill={color} {...nodePulse(1.3)} />
    </motion.svg>
  )
}

export function PenPaletteIcon({ size = 56, className = '', color = '#C9A24D' }: LineIconProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...svgProps}>
      <motion.path
        d="M20 44l4-12 20-20 8 8-20 20-12 4Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawPath}
      />
      <motion.path d="M39 17l8 8" stroke={color} strokeWidth="1.4" strokeLinecap="round" variants={drawPath} />
      <motion.path d="M24 32l8 8" stroke={color} strokeWidth="1.2" strokeLinecap="round" variants={drawPathTo(0.5)} />
      <motion.path d="M13 50c6.5 2.5 13 2.5 19.5 0" stroke={color} strokeWidth="1.2" strokeLinecap="round" variants={drawPathTo(0.45)} />
      <motion.circle cx="18" cy="46" r="1.9" fill={color} {...nodePulse(1.4)} />
    </motion.svg>
  )
}

export function WireframeCubeIcon({ size = 56, className = '', color = '#C9A24D' }: LineIconProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...svgProps}>
      <motion.path
        d="M32 9l19 10.5v21L32 51 13 40.5v-21L32 9Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawPath}
      />
      <motion.path d="M32 9v21M32 30L13 19.5M32 30l19-10.5M32 30v21" stroke={color} strokeWidth="1.2" strokeLinecap="round" variants={drawPathTo(0.55)} />
      <motion.circle cx="32" cy="30" r="1.9" fill={color} {...nodePulse(1.2)} />
    </motion.svg>
  )
}

export function ChipSignalIcon({ size = 56, className = '', color = '#C9A24D' }: LineIconProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...svgProps}>
      <motion.rect x="21" y="21" width="20" height="20" rx="3" stroke={color} strokeWidth="1.6" variants={drawPath} />
      <motion.path
        d="M26 21v-7M32 21v-7M38 21v-7M26 41v7M32 41v7M38 41v7M21 26h-7M21 32h-7M21 38h-7M41 26h7M41 32h7M41 38h7"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        variants={drawPath}
      />
      <motion.path d="M47 26a8.5 8.5 0 0 1 0 12" stroke={color} strokeWidth="1.2" strokeLinecap="round" variants={drawPathTo(0.55)} />
      <motion.path d="M51.5 20a16 16 0 0 1 0 24" stroke={color} strokeWidth="1.1" strokeLinecap="round" variants={drawPathTo(0.35)} />
      <motion.circle cx="31" cy="31" r="1.8" fill={color} {...nodePulse(1.5)} />
    </motion.svg>
  )
}

export function LayoutFrameIcon({ size = 56, className = '', color = '#C9A24D' }: LineIconProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...svgProps}>
      <motion.rect x="9" y="11" width="46" height="42" rx="4" stroke={color} strokeWidth="1.6" variants={drawPath} />
      <motion.path d="M9 23h46" stroke={color} strokeWidth="1.2" variants={drawPath} />
      <motion.path d="M24 23v30" stroke={color} strokeWidth="1.2" variants={drawPathTo(0.55)} />
      <motion.path d="M31 30h16M31 37h16M31 44h10" stroke={color} strokeWidth="1.2" strokeLinecap="round" variants={drawPathTo(0.5)} />
      <motion.path d="M42 44l6 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" variants={drawPath} />
      <motion.circle cx="42" cy="44" r="4.5" stroke={color} strokeWidth="1.4" variants={drawPath} />
      <motion.circle cx="16" cy="30" r="1.7" fill={color} {...nodePulse(1.3)} />
    </motion.svg>
  )
}
