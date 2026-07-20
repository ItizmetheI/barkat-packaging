import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import LoadingScreen from './components/LoadingScreen'
import CinematicHero from './components/CinematicHero'
import Header from './components/Header'
import AboutSection from './components/AboutSection'
import ProcessGallery from './components/ProcessGallery'
import CertificationsSection from './components/CertificationsSection'
import SpecHUD from './components/SpecHUD'
import FounderQuote from './components/FounderQuote'
import ContactForm from './components/ContactForm'
import SiteFooter from './components/SiteFooter'

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
    // while it's still hidden behind the loading screen.
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
      {/* Cinematic opener (real footage, scroll-scrubbed) - deliberately has no Header
          rendered anywhere near it. Header only exists further down the tree, in normal
          document flow after this, so the nav can't appear during the cinematic. */}
      <CinematicHero ref={cinematicRef} />

      <Header />
      <AboutSection />
      <ProcessGallery />
      <CertificationsSection />
      <SpecHUD />
      <FounderQuote />
      <ContactForm />
      <SiteFooter />

      <LoadingScreen ref={loadingRef} onComplete={handleLoadComplete} />
    </>
  )
}

export default App
