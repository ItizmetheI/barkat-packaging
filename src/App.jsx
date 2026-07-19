import { useRef } from 'react'
import gsap from 'gsap'
import SceneCanvas from './components/SceneCanvas'
import LoadingScreen from './components/LoadingScreen'
import HeroVideo from './components/HeroVideo'
import ProcessGallery from './components/ProcessGallery'
import SpecHUD from './components/SpecHUD'
import FounderQuote from './components/FounderQuote'
import ContactForm from './components/ContactForm'
import SiteFooter from './components/SiteFooter'
import ChapterCopy from './components/ChapterCopy'
import Chapter0_Load from './scenes/Chapter0_Load'
import PaperPlane from './scenes/PaperPlane'
import Chapter1_Feed from './scenes/Chapter1_Feed'
import Chapter2_Flute from './scenes/Chapter2_Flute'
import useScrollTimeline from './hooks/useScrollTimeline'

// Shared uniforms for the flute vertex-displacement shader (Ch.2 mutates uFluteProgress
// each frame; uFrequency/uAmplitude are exposed so they're tunable without touching shader code)
function createFluteUniforms() {
  return {
    uFluteProgress: { value: 0 },
    uFrequency: { value: 14.0 },
    uAmplitude: { value: 0.2 },
  }
}

function App() {
  const introRef = useRef(null)
  const { progressRef } = useScrollTimeline(introRef)
  const loadingRef = useRef(null)
  const paperRef = useRef(null)
  const fluteUniforms = useRef(createFluteUniforms()).current

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

  // Injects the flute displacement into the shared paper plane's vertex shader, once,
  // when the material compiles. Lives here (not in PaperPlane.jsx) because it's Ch.2-specific
  // shader logic, not something the generic shared-mesh component should know about.
  function handlePaperBeforeCompile(shader) {
    shader.uniforms.uFluteProgress = fluteUniforms.uFluteProgress
    shader.uniforms.uFrequency = fluteUniforms.uFrequency
    shader.uniforms.uAmplitude = fluteUniforms.uAmplitude
    shader.vertexShader = `
      uniform float uFluteProgress;
      uniform float uFrequency;
      uniform float uAmplitude;
      ${shader.vertexShader}
    `.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      transformed.z += sin(uv.x * uFrequency) * uAmplitude * uFluteProgress;`
    )
  }

  return (
    <>
      {/* Short scroll-scrubbed 3D intro (Feed -> Flute, each chapter now spans half the
          local 0-1 range over 450vh, ~225vh per chapter) - a cinematic opener, not the whole
          site. SceneCanvas/ChapterCopy are both sticky within this wrapper so they release
          once it scrolls past, handing off to the normal-flowing website sections below. */}
      <div ref={introRef} style={{ position: 'relative', height: '450vh' }}>
        <SceneCanvas>
          <Chapter0_Load />
          <PaperPlane ref={paperRef} onBeforeCompile={handlePaperBeforeCompile} progressRef={progressRef} />
          <Chapter1_Feed progressRef={progressRef} paperRef={paperRef} />
          <Chapter2_Flute progressRef={progressRef} fluteUniforms={fluteUniforms} />
        </SceneCanvas>
        <ChapterCopy progressRef={progressRef} />
      </div>

      <HeroVideo />
      <ProcessGallery />
      <SpecHUD />
      <FounderQuote />
      <ContactForm />
      <SiteFooter />

      <LoadingScreen ref={loadingRef} onComplete={handleLoadComplete} />
    </>
  )
}

export default App
