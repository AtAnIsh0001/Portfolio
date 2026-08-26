import FadeIn from '@/components/FadeIn'
import HeroCanvas from './HeroCanvas'

export default function CarouselSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 py-24 sm:px-10 lg:px-16">
      <FadeIn className="mb-10 text-center">
        <p className="font-kanit text-xs uppercase tracking-[0.3em] text-[#C9A24D]">Who I am, depending on the day</p>
        <h2 className="font-anton mt-3 text-[10vw] uppercase leading-none text-[#EDE6D8] sm:text-5xl">
          Four Roles, One Craft
        </h2>
      </FadeIn>
      <HeroCanvas />
    </section>
  )
}
