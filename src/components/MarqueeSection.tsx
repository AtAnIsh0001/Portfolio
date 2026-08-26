import { useEffect, useRef } from 'react'
import { marqueeRowLeft, marqueeRowRight, type MarqueeTile } from '@/data/marquee'

const TILE_ICONS = ['◆', '⬢', '△', '○', '▣']

function Tile({ tile, i }: { tile: MarqueeTile; i: number }) {
  return (
    <div
      className="glass-panel flex h-[100px] w-[160px] flex-shrink-0 flex-col justify-between rounded-xl p-4 sm:h-[120px] sm:w-[190px]"
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-center justify-between font-kanit text-[9px] uppercase tracking-[0.2em] text-[#EDE6D8]/40">
        <span>{tile.tag}</span>
        <span>{TILE_ICONS[i % TILE_ICONS.length]}</span>
      </div>
      <p className="font-kanit text-base font-semibold uppercase leading-tight text-[#EDE6D8] sm:text-lg">{tile.label}</p>
    </div>
  )
}

function Row({ items, refCb }: { items: MarqueeTile[]; refCb: (el: HTMLDivElement | null) => void }) {
  const tripled = [...items, ...items, ...items]
  return (
    <div className="no-scrollbar overflow-hidden">
      <div ref={refCb} className="flex gap-3" style={{ willChange: 'transform' }}>
        {tripled.map((tile, i) => (
          <Tile key={`${tile.label}-${i}`} tile={tile} i={i} />
        ))}
      </div>
    </div>
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement | null>(null)
  const row2Ref = useRef<HTMLDivElement | null>(null)
  const setWidths = useRef({ row1: 0, row2: 0 })

  useEffect(() => {
    const measure = () => {
      if (row1Ref.current) setWidths.current.row1 = row1Ref.current.scrollWidth / 3
      if (row2Ref.current) setWidths.current.row2 = row2Ref.current.scrollWidth / 3
    }
    measure()
    window.addEventListener('resize', measure)

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const sectionTop = sectionRef.current?.offsetTop ?? 0
        const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3

        const { row1: w1, row2: w2 } = setWidths.current
        if (row1Ref.current && w1 > 0) {
          const offset = ((raw % w1) + w1) % w1
          row1Ref.current.style.transform = `translate3d(${-offset}px,0,0)`
        }
        if (row2Ref.current && w2 > 0) {
          const offset = ((-raw % w2) + w2) % w2
          row2Ref.current.style.transform = `translate3d(${-offset}px,0,0)`
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0C0C0C] pb-10 pt-24">
      <div className="mb-10 px-6 sm:px-10 lg:px-16">
        <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#EDE6D8]/40">Stack &amp; Interests</p>
      </div>
      <div className="flex flex-col gap-3">
        <Row items={marqueeRowRight} refCb={(el) => (row1Ref.current = el)} />
        <Row items={marqueeRowLeft} refCb={(el) => (row2Ref.current = el)} />
      </div>
    </section>
  )
}
