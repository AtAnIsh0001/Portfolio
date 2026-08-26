import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type CursorLabel = null | 'DRAG TO ROTATE' | 'VIEW' | 'INSPECT' | 'SWIPE' | 'CLOSE' | 'ENTER'

interface CursorCtxValue {
  label: CursorLabel
  setLabel: (label: CursorLabel) => void
}

const CursorCtx = createContext<CursorCtxValue | null>(null)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [label, setLabel] = useState<CursorLabel>(null)
  const value = useMemo(() => ({ label, setLabel }), [label])
  return <CursorCtx.Provider value={value}>{children}</CursorCtx.Provider>
}

export function useCursor() {
  const ctx = useContext(CursorCtx)
  if (!ctx) throw new Error('useCursor must be used within CursorProvider')
  return ctx
}
