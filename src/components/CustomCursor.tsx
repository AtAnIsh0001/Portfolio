import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouchDevice } from '@/lib/hooks'
import { springCursor } from '@/lib/motion'

export default function CustomCursor() {
  const isTouch = useIsTouchDevice()
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, springCursor)
  const springY = useSpring(y, springCursor)

  useEffect(() => {
    if (isTouch) return
    document.documentElement.classList.add('has-custom-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseleave', leave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch])

  if (isTouch) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <span className="h-3.5 w-3.5 rounded-full bg-[#EDE6D8]" />
    </motion.div>
  )
}
