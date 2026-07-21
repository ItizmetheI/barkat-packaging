import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import LoadingScreen from './components/LoadingScreen'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProcessPage from './pages/ProcessPage'
import ContactPage from './pages/ContactPage'

// Lenis smooth-scroll wraps native scroll (position:sticky, anchor links, a11y all keep
// working per Lenis's own docs) - it just interpolates scrollY toward its target instead of
// jumping, which is what makes wheel/trackpad input feel "buttery" instead of stepped.
// GSAP's ticker drives Lenis's raf loop (not Lenis's own internal one) so every ScrollTrigger
// update lands in the same frame as Lenis's - the official integration pattern, avoids jitter.
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    function raf(time) {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}

function App() {
  const loadingRef = useRef(null)
  const cinematicRef = useRef(null)
  useLenis()

  function handleLoadComplete() {
    // Fire the cinematic's entrance (video unblur/unzoom + title reveal) as the loading
    // screen starts fading, so the "wow" beat plays exactly when it's revealed - not before,
    // while it's still hidden behind the loading screen. No-ops safely (optional chaining)
    // if the first real page load is a deep link that isn't Home, since CinematicHero won't
    // be mounted in that case.
    cinematicRef.current?.playIntro()
    gsap.to(loadingRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        loadingRef.current.style.pointerEvents = 'none'
      },
    })
  }

  return (
    <>
      {/* LoadingScreen is a sibling of BrowserRouter, not inside it - React Router's
          client-side navigation only swaps what's inside <Routes>, so this only ever plays
          once per real page load, never on route changes, with no extra flag/logic needed. */}
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout cinematicRef={cinematicRef} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <LoadingScreen ref={loadingRef} onComplete={handleLoadComplete} />
    </>
  )
}

export default App
