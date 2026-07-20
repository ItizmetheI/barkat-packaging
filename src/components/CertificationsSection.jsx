import { useRef } from 'react'
import Reveal from './Reveal'
import useParallax from '../hooks/useParallax'

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
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-8%',
          left: 0,
          right: 0,
          margin: '0 auto',
          width: 'min(70vw, 820px)',
          height: 'min(70vw, 820px)',
          border: '1px solid var(--accent)',
          opacity: 0.08,
          transform: 'rotate(45deg)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
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
      </div>
    </section>
  )
}
