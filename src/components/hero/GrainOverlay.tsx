const GRAIN_SVG = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch' />
    <feColorMatrix type='saturate' values='0' />
  </filter>
  <rect width='100%' height='100%' filter='url(#n)' />
</svg>
`)

export default function GrainOverlay({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div
      className="grain-overlay absolute inset-0 z-20 mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
        opacity,
      }}
      aria-hidden
    />
  )
}
