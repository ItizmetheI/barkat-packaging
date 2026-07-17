import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import SceneCanvas from './components/SceneCanvas'
import LoadingScreen from './components/LoadingScreen'
import SpecHUD from './components/SpecHUD'
import FounderQuote from './components/FounderQuote'
import ContactForm from './components/ContactForm'
import Chapter0_Load from './scenes/Chapter0_Load'
import PaperPlane from './scenes/PaperPlane'
import Chapter1_Feed from './scenes/Chapter1_Feed'
import Chapter2_Flute from './scenes/Chapter2_Flute'
import Chapter3_Laminate from './scenes/Chapter3_Laminate'
import Chapter4_Press from './scenes/Chapter4_Press'
import Chapter5_Cut from './scenes/Chapter5_Cut'
import Chapter6_Fold from './scenes/Chapter6_Fold'
import Chapter7_Spec from './scenes/Chapter7_Spec'
import Chapter8_Dock from './scenes/Chapter8_Dock'
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
  const { progressRef } = useScrollTimeline()
  const loadingRef = useRef(null)
  const paperRef = useRef(null)
  const fluteUniforms = useRef(createFluteUniforms()).current
  const debugRef = useRef(null)

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

  // ponytail: temporary debug readout for uFluteProgress - remove once Ch.2's scroll
  // tracking is confirmed working, per this prompt's own instruction.
  useEffect(() => {
    function tick() {
      if (debugRef.current) {
        debugRef.current.innerText = `uFluteProgress: ${fluteUniforms.uFluteProgress.value.toFixed(3)}`
      }
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [fluteUniforms])

  return (
    <>
      <SceneCanvas>
        <Chapter0_Load />
        <PaperPlane ref={paperRef} onBeforeCompile={handlePaperBeforeCompile} />
        <Chapter1_Feed progressRef={progressRef} paperRef={paperRef} />
        <Chapter2_Flute progressRef={progressRef} fluteUniforms={fluteUniforms} />
        <Chapter3_Laminate progressRef={progressRef} />
        <Chapter4_Press progressRef={progressRef} />
        <Chapter5_Cut progressRef={progressRef} />
        <Chapter6_Fold progressRef={progressRef} />
        <Chapter7_Spec progressRef={progressRef} />
        <Chapter8_Dock progressRef={progressRef} />
      </SceneCanvas>

      <SpecHUD progressRef={progressRef} />
      <FounderQuote progressRef={progressRef} />
      <ContactForm progressRef={progressRef} />

      <div
        ref={debugRef}
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 40,
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#F7F8FA',
          background: 'rgba(0,0,0,0.5)',
          padding: '4px 8px',
        }}
      >
        uFluteProgress: 0.000
      </div>

      {/* Full chapter map (Ch.0-10, 0-100%) now exists - this spacer's length is the actual
          scroll-to-progress mapping for the whole site, no longer a placeholder */}
      <div style={{ height: '1000vh' }} />

      <LoadingScreen ref={loadingRef} onComplete={handleLoadComplete} />
    </>
  )
}

export default App
