import { useEffect, useState } from 'react'

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

let cachedWebgl: boolean | null = null

export function supportsWebGL(): boolean {
  if (cachedWebgl !== null) return cachedWebgl
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    cachedWebgl = !!gl
  } catch {
    cachedWebgl = false
  }
  return cachedWebgl
}

export function useWebGLSupport(): boolean {
  const [ok, setOk] = useState(true)
  useEffect(() => {
    setOk(supportsWebGL())
  }, [])
  return ok
}

export function useIsTouchDevice(): boolean {
  const [touch, setTouch] = useState(false)
  useEffect(() => {
    setTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])
  return touch
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])
  return matches
}
