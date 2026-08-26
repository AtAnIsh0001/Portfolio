import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import Magnet from './Magnet'
import ContactButton from './ContactButton'
import TiltCard from './TiltCard'
import { useAudio } from '@/context/AudioContext'

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const { play } = useAudio()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    play('toggle')
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 sm:px-10 lg:px-16"
      style={{
        background:
          'radial-gradient(120% 100% at 15% 0%, #3A2C13 0%, transparent 55%), radial-gradient(100% 90% at 85% 100%, #420001 0%, transparent 50%), #0C0C0C',
      }}
    >
      <motion.div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full opacity-30 blur-[120px]"
        style={{ background: '#E9B48A' }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full opacity-25 blur-[110px]"
        style={{ background: '#C9A24D' }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -25, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative mx-auto w-full max-w-5xl grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Get in touch</p>
          <h2 className="font-anton mt-3 text-[11vw] uppercase leading-none text-[#EDE6D8] sm:text-6xl">Contact</h2>
          <p className="mt-6 max-w-sm font-inter text-sm text-[#EDE6D8]/70 sm:text-base">
            Have a project in mind — AI, web, or design? Let&apos;s build something incredible together.
          </p>

          <div className="mt-10 flex flex-col gap-4 font-kanit text-sm text-[#EDE6D8]/80">
            <a href="mailto:anshishrupakheti@gmail.com" className="flex items-center gap-3 hover:text-[#EDE6D8]">
              <Mail size={16} /> anshishrupakheti@gmail.com
            </a>
            <span className="flex items-center gap-3">
              <Phone size={16} /> +977 9860364774
            </span>
            <span className="flex items-center gap-3">
              <MapPin size={16} /> Kathmandu, Nepal
            </span>
          </div>

          <div className="mt-10">
            <Magnet padding={80} strength={4}>
              <ContactButton label="Download CV" href="/assets/CV.pdf" download />
            </Magnet>
          </div>
        </div>

        <TiltCard intensity={3} className="glass-panel rounded-[32px] p-8 sm:p-10">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full min-h-[280px] flex-col items-center justify-center text-center"
            >
              <p className="font-anton text-2xl uppercase text-[#EDE6D8]">Message received</p>
              <p className="mt-2 max-w-xs font-inter text-sm text-[#EDE6D8]/60">
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="font-kanit text-xs uppercase tracking-wide text-[#EDE6D8]/50">Name</label>
                <input
                  required
                  type="text"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-inter text-sm text-[#EDE6D8] outline-none transition-colors focus:border-[#C9A24D]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-kanit text-xs uppercase tracking-wide text-[#EDE6D8]/50">Email</label>
                <input
                  required
                  type="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-inter text-sm text-[#EDE6D8] outline-none transition-colors focus:border-[#C9A24D]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="font-kanit text-xs uppercase tracking-wide text-[#EDE6D8]/50">Message</label>
                <textarea
                  required
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-inter text-sm text-[#EDE6D8] outline-none transition-colors focus:border-[#C9A24D]"
                  placeholder="Tell me about your project..."
                />
              </div>
              <Magnet padding={60} strength={5} className="self-start">
                <ContactButton label="Send message" as="button" type="submit" />
              </Magnet>
            </form>
          )}
        </TiltCard>
      </div>
    </section>
  )
}
