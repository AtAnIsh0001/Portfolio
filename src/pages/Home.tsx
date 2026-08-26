import HeroSection from '@/components/hero/HeroSection'
import CarouselSection from '@/components/hero/CarouselSection'
import AboutSection from '@/components/about/AboutSection'
import MarqueeSection from '@/components/MarqueeSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <CarouselSection />
      <MarqueeSection />
      <AboutSection />
    </>
  )
}
