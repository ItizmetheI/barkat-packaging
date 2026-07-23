import { useRef } from 'react'
import { animate } from 'animejs'
import rawMaterial from '../assets/photos/raw-material.jpg'
import fluteTexture from '../assets/photos/flute-texture.jpg'
import printPress from '../assets/photos/print-press.jpg'
import precisionCut from '../assets/photos/precision-cut.jpg'
import foldAssembly from '../assets/photos/fold-assembly.jpg'
import warehouseDock from '../assets/photos/warehouse-dock.jpg'
import Reveal from './Reveal'
import useParallax from '../hooks/useParallax'
import processBg from '../assets/generated/process-bg.jpg'

// Bond through Dock used to be 3D chapters (Ch.3-8); moved here as a real-photo grid once
// the 3D scroll was cut down to a cinematic Feed/Cut/Fold/Dock teaser. Same verbatim copy
// that was already approved for those chapters, just presented over photography.
// TODO: swap stock photos for real Barkat plant-floor photography once Ahmed provides it.
const STEPS = [
  {
    eyebrow: '03 — THE BOND',
    title: 'Three layers become one.',
    body: 'Liner, flute, liner — pressed and bonded into a single board built to spec, not guessed at.',
    image: rawMaterial,
  },
  {
    eyebrow: '04 — THE PRINT',
    title: 'Your brand, on the board.',
    body: 'Print goes on before the cut — built to survive the trip, not just look good on day one.',
    image: printPress,
  },
  {
    eyebrow: '05 — THE CUT',
    title: 'Precision, every time.',
    body: 'Every panel cut to the same line, at the same tolerance, order after order.',
    image: precisionCut,
  },
  {
    eyebrow: '06 — THE FOLD',
    title: 'Flat becomes box.',
    body: "The fold is where the design proves itself — or doesn't.",
    image: foldAssembly,
  },
  {
    eyebrow: '07 — THE SPEC',
    title: 'Built for what it carries.',
    body: 'Flute type, board weight, burst strength — chosen for the load, not the average.',
    image: fluteTexture,
  },
  {
    eyebrow: '08 — THE DOCK',
    title: 'Counted. Palletized. Gone.',
    body: 'On schedule, every order — this is the part that actually matters to the buyer.',
    image: warehouseDock,
  },
]

export default function ProcessGallery() {
  const sectionRef = useRef(null)
  const bgRef = useParallax(sectionRef, 55)

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ padding: 'calc(var(--header-h) + 112px) 6% 112px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      <img
        ref={bgRef}
        src={processBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{
          position: 'absolute',
          top: -55,
          left: 0,
          right: 0,
          height: 'calc(100% + 110px)',
          width: '100%',
          objectFit: 'cover',
          opacity: 0.13,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', opacity: 0.45, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2
          style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 700,
            color: 'var(--ink)',
            margin: '0 0 56px',
            textAlign: 'center',
            letterSpacing: '-0.01em',
          }}
        >
          From board to box
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {STEPS.map((step, i) => (
            <Reveal key={step.eyebrow} delay={(i % 3) * 0.1}>
              <div
                onMouseEnter={(e) =>
                  animate(e.currentTarget, {
                    scale: 1.03,
                    boxShadow: '0 18px 32px rgba(10,22,40,0.18)',
                    duration: 220,
                    ease: 'outQuad',
                  })
                }
                onMouseLeave={(e) =>
                  animate(e.currentTarget, {
                    scale: 1,
                    boxShadow: '0 1px 3px rgba(10,22,40,0.04)',
                    duration: 220,
                    ease: 'outQuad',
                  })
                }
                style={{ background: '#fff', border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(10,22,40,0.04)' }}
              >
                <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: 10 }}>
                    {step.eyebrow}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px' }}>{step.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)', margin: 0 }}>{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
