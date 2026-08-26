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
          // Deliberately no `filter` here: framer-motion keeps re-asserting its
          // animate-target value on every re-render (even blur(0px)), and any
          // non-'none' filter on an ancestor creates a new containing block that
          // silently breaks position:fixed descendants (e.g. the project/skills
          // modals) rendered anywhere inside this route. Opacity + slide carries
          // the transition; the gold scan line above is the signature effect.
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.55, ease: EASE_LUXE }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
