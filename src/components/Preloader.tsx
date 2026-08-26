import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAudio } from '@/context/AudioContext'
import { projects } from '@/data/projects'
import WorldGlobe, { type WorldGlobeHandle } from '@/components/WorldGlobe'

const PRELOAD_IMAGES = [
  '/assets/avatar-3d.png',
  '/assets/avatar-photo.png',
  '/assets/logo.png',
  ...projects.flatMap((p) => [p.image, ...p.gallery].filter(Boolean) as string[]),
]

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

type Stage = 'gate' | 'locating' | 'zoom' | 'flash' | 'reveal' | 'done'

const HUD_TEXT: Record<Stage, string> = {
  gate: 'NEPAL',
  locating: 'LOCATING SIGNAL…',
  zoom: 'KATHMANDU · 27.7172° N, 85.3240° E',
  flash: '',
  reveal: '',
  done: '',
}

export default function Preloader() {
  const { enterWithSound, enterSilent, play } = useAudio()
  const [stage, setStage] = useState<Stage>('gate')
  const [progress, setProgress] = useState(0)
  const globeRef = useRef<WorldGlobeHandle>(null)
  const choiceRef = useRef<'sound' | 'silent' | null>(null)

  useEffect(() => {
    let loaded = 0
    Promise.all(
      PRELOAD_IMAGES.map((src) =>
        preloadImage(src).then(() => {
          loaded += 1
          setProgress(Math.round((loaded / PRELOAD_IMAGES.length) * 100))
        }),
      ),
    )
  }, [])

  const handleChoice = async (choice: 'sound' | 'silent') => {
    choiceRef.current = choice
    if (choice === 'sound') enterWithSound()
    else enterSilent()
    play('click')
    setStage('locating')

    await globeRef.current?.focusOnNepal(1500)

    play('whoosh')
    setStage('zoom')
    window.setTimeout(() => setStage('flash'), 900)
    window.setTimeout(() => setStage('reveal'), 900 + 240)
    window.setTimeout(() => setStage('done'), 900 + 240 + 750)
  }

  if (stage === 'done') return null

  const zooming = stage === 'zoom' || stage === 'flash'

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden bg-[#08090A]"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'reveal' ? 0 : 1 }}
        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />

        <div className="flex max-h-full flex-col items-center justify-center gap-3 -translate-y-4 sm:-translate-y-8">
          <motion.div
            className="flex flex-col items-center gap-3 px-6"
            animate={{
              scale: zooming ? 2.4 : 1,
              filter: zooming ? 'blur(5px) brightness(1.5)' : 'blur(0px) brightness(1)',
              opacity: stage === 'flash' ? 0.1 : 1,
            }}
            transition={{ duration: stage === 'zoom' ? 0.9 : 0.4, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.span
              className="font-kanit text-[10px] uppercase tracking-[0.4em] text-[#C9A24D]/70 sm:text-[11px]"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              BSc (Hons) Computing with Artificial Intelligence
            </motion.span>

            <WorldGlobe ref={globeRef} locked={stage !== 'gate'} displaySize={340} />

            <motion.h1 className="font-anton select-none text-center text-[10vw] uppercase leading-[0.85] text-[#EDE6D8] sm:text-[4.2vw]">
              Ashish Rupakheti
            </motion.h1>

            <AnimatePresence mode="wait">
              <motion.div
                key={HUD_TEXT[stage]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2 font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A24D]/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C9A24D]" />
                </span>
                {HUD_TEXT[stage]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {stage === 'gate' && (
              <motion.div
                className="mt-2 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 font-kanit text-xs uppercase tracking-[0.3em] text-[#EDE6D8]/50">
                  <span className="h-px w-8 bg-[#EDE6D8]/30" />
                  Loading assets {progress}%
                  <span className="h-px w-8 bg-[#EDE6D8]/30" />
                </div>
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleChoice('sound')}
                    className="group relative overflow-hidden rounded-full border border-[#C9A24D]/50 px-7 py-3 font-kanit text-sm uppercase tracking-[0.2em] text-[#EDE6D8] transition-colors hover:border-[#C9A24D]"
                  >
                    <span className="relative z-10">Enter with sound</span>
                    <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-[#3A2C13]/60 transition-transform duration-500 group-hover:scale-x-100" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChoice('silent')}
                    className="group relative overflow-hidden rounded-full border border-[#EDE6D8]/20 px-7 py-3 font-kanit text-sm uppercase tracking-[0.2em] text-[#EDE6D8]/70 transition-colors hover:border-[#EDE6D8]/50 hover:text-[#EDE6D8]"
                  >
                    <span className="relative z-10">Silent mode</span>
                    <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-white/5 transition-transform duration-500 group-hover:scale-x-100" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle, rgba(255,247,224,1) 0%, rgba(201,162,77,0.9) 35%, rgba(8,9,10,0) 70%)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            stage === 'zoom'
              ? { opacity: 1, scale: 3.2 }
              : stage === 'flash'
                ? { opacity: 1, scale: 3.8 }
                : stage === 'reveal'
                  ? { opacity: 0, scale: 4.4 }
                  : { opacity: 0, scale: 0 }
          }
          transition={{
            duration: stage === 'zoom' ? 0.9 : stage === 'flash' ? 0.25 : 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
