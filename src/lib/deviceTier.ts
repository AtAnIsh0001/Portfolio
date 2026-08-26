import { useEffect, useState } from 'react'
import { useIsTouchDevice, useMediaQuery } from './hooks'

export type DeviceTier = 'low' | 'mid' | 'high'

interface NavigatorPerf extends Navigator {
  deviceMemory?: number
}

/**
 * Static, one-shot estimate of how much 3D the device should be asked to render.
 * Combines memory/core hints, pointer type and viewport width — deliberately
 * coarse, since the goal is picking a *different* (lighter) experience for
 * low/mid tiers, not fine-tuning the same one. Runtime FPS adjustment on top
 * of this belongs to drei's <PerformanceMonitor> inside the Canvas itself.
 */
function estimateDeviceTier(isTouch: boolean, isNarrow: boolean): DeviceTier {
  const nav = navigator as NavigatorPerf
  const memory = nav.deviceMemory ?? 8
  const cores = nav.hardwareConcurrency ?? 8

  if (isTouch && (isNarrow || memory <= 4 || cores <= 4)) return 'low'
  if (isTouch || memory <= 6 || cores <= 6) return 'mid'
  return 'high'
}

export function useDeviceTier(): DeviceTier {
  const isTouch = useIsTouchDevice()
  const isNarrow = useMediaQuery('(max-width: 768px)')
  const [tier, setTier] = useState<DeviceTier>('high')

  useEffect(() => {
    setTier(estimateDeviceTier(isTouch, isNarrow))
  }, [isTouch, isNarrow])

  return tier
}
