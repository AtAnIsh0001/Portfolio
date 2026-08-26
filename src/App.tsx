import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AudioProvider } from '@/context/AudioContext'
import { CursorProvider } from '@/context/CursorContext'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { startSmoothScroll, stopSmoothScroll } from '@/lib/lenis'
import RootLayout from '@/layout/RootLayout'
import Home from '@/pages/Home'
import ServicesPage from '@/pages/ServicesPage'
import ProjectsPage from '@/pages/ProjectsPage'
import SkillsPage from '@/pages/SkillsPage'
import ContactPage from '@/pages/ContactPage'

function SmoothScrollController() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    startSmoothScroll()
    return () => stopSmoothScroll()
  }, [reducedMotion])

  return null
}

export default function App() {
  return (
    <AudioProvider>
      <CursorProvider>
        <SmoothScrollController />
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CursorProvider>
    </AudioProvider>
  )
}
