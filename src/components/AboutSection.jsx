import { useRef } from 'react'
import Reveal from './Reveal'
import useParallax from '../hooks/useParallax'
import aboutBg from '../assets/generated/about-bg.jpg'

// TODO: replace narrative below with Ahmed's real company history (founding story, milestones).
// Kept deliberately generic/credible - no invented founding year or unverifiable claims.
const NARRATIVE =
  "Barkat Packaging supplies corrugated boxes to manufacturers and distributors who can't afford a shipment that shows up crushed. Every order is built to the buyer's spec - board weight, flute profile, burst strength - never whatever's closest on the shelf. That discipline is why customers keep placing the next order, and the one after that."

// TODO: confirm these figures with Ahmed before launch - placeholders, not verified facts.
const FACTS = [
  { value: '15+', label: 'Years in operation' },
  { value: '98%', label: 'On-time delivery' },
  { value: '40,000', label: 'Sq. ft. facility' },
  { value: '120+', label: 'Box types produced' },
]

// Distinct from SpecHUD's dark left-border stat strip: light section, big number over
// label in a horizontal row, no border/card chrome - reads as a fact row, not a spec sheet.
export default function AboutSection() {
  const sectionRef = useRef(null)
  const bgRef = useParallax(sectionRef, 50)

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ padding: 'calc(var(--header-h) + 112px) 6% 112px', background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}
    >
      <img
        ref={bgRef}
        src={aboutBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{
          position: 'absolute',
          top: -50,
          left: 0,
          right: 0,
          height: 'calc(100% + 100px)',
          width: '100%',
          objectFit: 'cover',
          opacity: 0.16,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-alt)', opacity: 0.35, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 56, alignItems: 'start' }}>
          <Reveal>
            <div>
              <h2
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  margin: '0 0 24px',
                  letterSpacing: '-0.01em',
                }}
              >
                Built to spec, not to shelf
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>{NARRATIVE}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px 24px' }}>
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <div style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                    {fact.value}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em', color: 'var(--ink-soft)', marginTop: 8 }}>
                    {fact.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
