import { useRef } from 'react'
import Reveal from './Reveal'
import useParallax from '../hooks/useParallax'
import certsBg from '../assets/generated/certs-bg.jpg'

// TODO(Ahmed): these are the certifications a corrugated packaging plant of this
// scale would plausibly hold - NOT a verified list of Barkat's actual certifications.
// Confirm which ones the plant actually holds before this ships.
const CERTS = [
  {
    name: 'ISO 9001:2015',
    label: 'Quality Management',
    body: 'Quality management system audited across production, inspection, and corrective action.',
  },
  {
    name: 'FSC Chain of Custody',
    label: 'Responsible Sourcing',
    body: 'Fiber tracked from certified forest to finished board, every stage documented.',
  },
  {
    name: 'BRCGS Packaging',
    label: 'Packaging Materials Standard',
    body: 'Third-party audited standard for packaging safety, hygiene, and process control.',
  },
]

export default function CertificationsSection() {
  const sectionRef = useRef(null)
  const bgRef = useParallax(sectionRef, 45)

  return (
    <section
      ref={sectionRef}
      id="quality"
      style={{ padding: '112px 6%', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      <img
        ref={bgRef}
        src={certsBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{
          position: 'absolute',
          top: -45,
          left: 0,
          right: 0,
          height: 'calc(100% + 90px)',
          width: '100%',
          objectFit: 'cover',
          opacity: 0.14,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', opacity: 0.4, zIndex: 0, pointerEvents: 'none' }} />
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
          Certified, audited, traceable
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {CERTS.map((cert, i) => (
            <Reveal key={cert.name} delay={(i % 3) * 0.1}>
              <div style={{ border: '1px solid var(--border)', background: 'var(--bg-alt)', padding: 28, height: '100%' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: 10 }}>
                  {cert.label.toUpperCase()}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px' }}>{cert.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)', margin: 0 }}>{cert.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* TODO(Ahmed): confirm real recycled-content percentage and sourcing practices -
            placeholder figures in the right shape, not verified claims. */}
        <Reveal delay={0.2}>
          <div style={{ marginTop: 48, borderTop: '1px solid var(--border)', paddingTop: 40, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', margin: '0 0 10px' }}>Sourcing &amp; sustainability</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>
              Board runs on recycled and FSC-certified virgin fiber, and every box ships fully recyclable - no laminates or coatings
              that keep it out of a standard paper stream.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
