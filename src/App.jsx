import { useRef } from 'react'
import gsap from 'gsap'
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

function App() {
  const loadingRef = useRef(null)

  function handleLoadComplete() {
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
      <CinematicHero />

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
