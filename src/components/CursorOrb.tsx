import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouchDevice, usePrefersReducedMotion } from '@/lib/hooks'

/** A soft, slow-trailing liquid-gold smear that lags behind the cursor dot — ambient, not interactive. */
export default function CursorOrb() {
  const isTouch = useIsTouchDevice()
  const reducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 55, damping: 20, mass: 0.9 })
  const springY = useSpring(y, { stiffness: 55, damping: 20, mass: 0.9 })

  useEffect(() => {
    if (isTouch || reducedMotion) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseleave', leave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch, reducedMotion])

  if (isTouch || reducedMotion) return null

  return (
    <motion.div
      className="liquid-orb pointer-events-none fixed left-0 top-0 z-[9997]"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: visible ? 0.6 : 0 }}
      transition={{ opacity: { duration: 0.4 } }}
    />
  )
}
