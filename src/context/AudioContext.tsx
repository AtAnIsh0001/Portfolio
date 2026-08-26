import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { soundEngine, type SfxName } from '@/lib/sound'

interface AudioCtxValue {
  soundEnabled: boolean
  gateOpen: boolean
  enterWithSound: () => void
  enterSilent: () => void
  toggleSound: () => void
  play: (name: SfxName) => void
}

const AudioCtx = createContext<AudioCtxValue | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)

  const enterWithSound = useCallback(() => {
    soundEngine.setMuted(false)
    soundEngine.startAmbient()
    setSoundEnabled(true)
    setGateOpen(true)
  }, [])

  const enterSilent = useCallback(() => {
    soundEngine.setMuted(true)
    setSoundEnabled(false)
    setGateOpen(true)
  }, [])

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev
      soundEngine.setMuted(!next)
      if (next) soundEngine.startAmbient()
      return next
    })
  }, [])

  const play = useCallback((name: SfxName) => soundEngine.play(name), [])

  const value = useMemo(
    () => ({ soundEnabled, gateOpen, enterWithSound, enterSilent, toggleSound, play }),
    [soundEnabled, gateOpen, enterWithSound, enterSilent, toggleSound, play],
  )

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>
}

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
