import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAudio } from '@/context/AudioContext'

interface ContactButtonProps {
  label?: string
  as?: 'a' | 'button'
  href?: string
  type?: 'button' | 'submit'
  download?: boolean
}

export default function ContactButton({
  label = "Let's talk",
  as = 'a',
  href = '/contact',
  type = 'button',
  download = false,
}: ContactButtonProps) {
  const { play } = useAudio()

  const className =
    'inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-kanit text-sm font-medium uppercase tracking-wide text-[#1A140A] transition-transform active:scale-95'
  const style = {
    background: 'linear-gradient(123deg, #2A1F0D 7%, #8C6D2F 37%, #C9A24D 72%, #EDE1B0 100%)',
    boxShadow: '4px 4px 12px rgba(42,31,13,0.5) inset, 0 8px 24px rgba(0,0,0,0.35)',
  }

  const content = (
    <>
      {label}
      <ArrowUpRight size={16} />
    </>
  )

  if (as === 'button') {
    return (
      <button
        type={type}
        onClick={() => play('click')}
        onMouseEnter={() => play('hover')}
        className={className}
        style={style}
      >
        {content}
      </button>
    )
  }

  const isInternalRoute = href.startsWith('/') && !download

  if (isInternalRoute) {
    return (
      <Link to={href} onClick={() => play('click')} onMouseEnter={() => play('hover')} className={className} style={style}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      download={download}
      onClick={() => play('click')}
      onMouseEnter={() => play('hover')}
      className={className}
      style={style}
    >
      {content}
    </a>
  )
}
