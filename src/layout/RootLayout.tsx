import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'
import CursorOrb from '@/components/CursorOrb'
import AmbientAtmosphere from '@/components/AmbientAtmosphere'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import ScrollToTop from './ScrollToTop'
import PageTransition from './PageTransition'

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Preloader />
      <AmbientAtmosphere />
      <CursorOrb />
      <CustomCursor />
      <SiteNav />
      <main id="top" className="relative">
        <PageTransition />
      </main>
      <SiteFooter />
    </>
  )
}
