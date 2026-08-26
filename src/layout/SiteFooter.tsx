import { NavLink } from 'react-router-dom'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Contact', to: '/contact' },
]

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0B0B0D] px-6 py-10 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="font-kanit text-xs uppercase tracking-[0.2em] text-[#EDE6D8]/50 transition-colors hover:text-[#EDE6D8]"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <p className="font-kanit text-xs uppercase tracking-[0.2em] text-[#EDE6D8]/30">
          Kathmandu, Nepal — Available for collaboration
        </p>
      </div>
    </footer>
  )
}
