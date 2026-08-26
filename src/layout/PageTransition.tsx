import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { EASE_LUXE } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'

export default function PageTransition() {
  const location = useLocation()
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) return <Outlet />

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={location.pathname}
          className="pointer-events-none fixed inset-y-0 z-[70] w-[2px]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #C9A24D 50%, transparent 100%)',
            boxShadow: '0 0 60px 14px rgba(201,162,77,0.5)',
          }}
          initial={{ left: '-1%', opacity: 1 }}
          animate={{ left: '101%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: EASE_LUXE }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, ease: EASE_LUXE }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
