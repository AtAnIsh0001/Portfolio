import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Volume2, VolumeX, Menu, X } from 'lucide-react'
import { useAudio } from '@/context/AudioContext'
import { useCursor } from '@/context/CursorContext'
import Magnet from '@/components/Magnet'

const NAV_LINKS = [
  { label: 'Home', to: '/', end: true },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Contact', to: '/contact' },
]

export default function SiteNav() {
  const { soundEnabled, toggleSound } = useAudio()
  const { setLabel } = useCursor()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#0B0B0D]/70 px-6 py-4 backdrop-blur-md sm:px-10 lg:px-16">
      <NavLink
        to="/"
        className="flex items-center gap-2"
        data-cursor="VIEW"
        onMouseEnter={() => setLabel('VIEW')}
        onMouseLeave={() => setLabel(null)}
      >
        <img src="/assets/logo.png" alt="AR logo" className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10" />
        <span className="font-kanit text-sm font-semibold tracking-wide text-[#EDE6D8]">ASHISH RUPAKHETI</span>
      </NavLink>

      <ul className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <Magnet padding={14} strength={7}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `font-kanit text-sm uppercase tracking-[0.15em] transition-colors hover:text-[#EDE6D8] ${
                    isActive ? 'text-[#EDE6D8]' : 'text-[#EDE6D8]/60'
                  }`
                }
                data-cursor="VIEW"
                onMouseEnter={() => setLabel('VIEW')}
                onMouseLeave={() => setLabel(null)}
              >
                {link.label}
              </NavLink>
            </Magnet>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <Magnet padding={18} strength={5}>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EDE6D8]/20 text-[#EDE6D8]/80 transition-colors hover:border-[#EDE6D8]/50"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </Magnet>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EDE6D8]/20 text-[#EDE6D8]/80 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {menuOpen && (
        <ul className="glass-panel absolute right-6 top-16 z-50 flex w-48 flex-col gap-1 rounded-2xl p-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 font-kanit text-sm uppercase tracking-wide text-[#EDE6D8]/80 hover:bg-white/5"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
