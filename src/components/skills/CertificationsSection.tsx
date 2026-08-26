import { Award, ArrowUpRight } from 'lucide-react'
import { certifications } from '@/data/certifications'
import FadeIn from '@/components/FadeIn'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export default function CertificationsSection() {
  return (
    <div className="mt-24">
      <FadeIn>
        <div className="mb-8 flex items-center gap-3">
          <Award size={30} color="#C9A24D" strokeWidth={1.4} />
          <h3 className="font-kanit text-sm uppercase tracking-[0.25em] text-[#EDE6D8]/50">Certifications</h3>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <FadeIn key={cert.id} delay={i * 0.08}>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-panel group flex items-start justify-between gap-4 rounded-2xl p-5 transition-colors hover:border-white/20"
            >
              <div>
                <p className="font-kanit text-[11px] uppercase tracking-[0.2em] text-[#C9A24D]">{cert.issuer}</p>
                <h4 className="font-kanit mt-1.5 text-base text-[#EDE6D8]">{cert.title}</h4>
                <p className="mt-1.5 font-inter text-xs text-[#EDE6D8]/50">
                  {cert.hours}h · {formatDate(cert.issuedOn)}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="mt-1 flex-shrink-0 text-[#EDE6D8]/40 transition-colors group-hover:text-[#EDE6D8]"
              />
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
