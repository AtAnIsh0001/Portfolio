import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { carouselRoles } from '@/data/carousel'
import RolePanel from './RolePanel'
import GrainOverlay from './GrainOverlay'
import { useCursor } from '@/context/CursorContext'
import { useAudio } from '@/context/AudioContext'
import { CAROUSEL_TRANSITION_MS } from '@/lib/motion'

type SlotRole = 'center' | 'left' | 'right' | 'back'

// Real 3D coverflow: rotateY + translateZ under a perspective camera, not a flat scale/opacity fake.
const SLOT_STYLE: Record<SlotRole, { transform: string; opacity: number; zIndex: number; filter: string }> = {
  center: {
    transform: 'translate(-50%, 0px) translateZ(60px) rotateY(0deg) scale(1)',
    opacity: 1,
    zIndex: 30,
    filter: 'blur(0px) brightness(1)',
  },
  right: {
    transform: 'translate(-50%, 16px) translateX(230px) translateZ(-160px) rotateY(-34deg) scale(0.74)',
    opacity: 0.55,
    zIndex: 20,
    filter: 'blur(1px) brightness(0.6)',
  },
  left: {
    transform: 'translate(-50%, 16px) translateX(-230px) translateZ(-160px) rotateY(34deg) scale(0.74)',
    opacity: 0.55,
    zIndex: 20,
    filter: 'blur(1px) brightness(0.6)',
  },
  back: {
    transform: 'translate(-50%, -28px) translateZ(-360px) rotateY(0deg) scale(0.5)',
    opacity: 0,
    zIndex: 10,
    filter: 'blur(6px) brightness(0.4)',
  },
}

function slotFor(itemIndex: number, centerIndex: number, total: number): SlotRole {
  const offset = (itemIndex - centerIndex + total) % total
  if (offset === 0) return 'center'
  if (offset === 1) return 'right'
  if (offset === total - 1) return 'left'
  return 'back'
}

const AUTO_ROTATE_MS = 2200

export default function HeroCanvas() {
  const [centerIndex, setCenterIndex] = useState(0)
  const { setLabel } = useCursor()
  const { play } = useAudio()
  const timerRef = useRef<number | null>(null)
  const total = carouselRoles.length

  const advance = useCallback(() => {
    setCenterIndex((prev) => (prev + 1) % total)
  }, [total])

  const resetTimer = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(advance, AUTO_ROTATE_MS)
  }, [advance])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [resetTimer])

  const goTo = (index: number) => {
    setCenterIndex(index)
    play('whoosh')
    resetTimer()
  }

  const activeRole = carouselRoles[centerIndex]

  return (
    <div className="relative h-[420px] w-full sm:h-[480px] md:h-[540px]">
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ backgroundColor: activeRole.bg }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ opacity: 0.28, filter: 'blur(60px)' }}
      />

      <span
        className="font-anton pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center uppercase text-white/[0.035]"
        style={{ fontSize: 'clamp(90px, 28vw, 380px)' }}
        aria-hidden
      >
        3D SHAPE
      </span>

      <div className="relative mx-auto h-full max-w-3xl" style={{ perspective: '1400px' }}>
        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {carouselRoles.map((role, i) => {
            const slot = slotFor(i, centerIndex, total)
            const style = SLOT_STYLE[slot]
            const clickable = slot === 'left' || slot === 'right'

            return (
              <div
                key={role.id}
                className="absolute left-1/2 top-0 h-full w-[62%] sm:w-[48%]"
                style={{
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  filter: style.filter,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  transition: `transform ${CAROUSEL_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1), opacity ${CAROUSEL_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1), filter ${CAROUSEL_TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
                  cursor: clickable ? 'pointer' : 'default',
                }}
                onClick={clickable ? () => goTo(i) : undefined}
                onMouseEnter={() => clickable && setLabel('SWIPE')}
                onMouseLeave={() => setLabel(null)}
                data-cursor={clickable ? 'SWIPE' : undefined}
              >
                <RolePanel role={role} />
              </div>
            )
          })}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-2 z-30 flex justify-center gap-2">
        {carouselRoles.map((role, i) => (
          <button
            key={role.id}
            type="button"
            aria-label={`Show ${role.role}`}
            onClick={() => goTo(i)}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === centerIndex ? 24 : 8,
              background: i === centerIndex ? '#EDE6D8' : 'rgba(237,230,216,0.3)',
            }}
          />
        ))}
      </div>

      <GrainOverlay />
    </div>
  )
}
