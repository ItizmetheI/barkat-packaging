import Reveal from './Reveal'

// TODO(Ahmed): these are the certifications a corrugated packaging plant of this
// scale would plausibly hold - NOT a verified list of Barkat's actual certifications.
// Confirm which ones the plant actually holds before this ships.
const CERTS = [
  {
    name: 'ISO 9001:2015',
    label: 'Quality Management',
    body: 'Certified quality management system covering production, inspection, and continuous improvement.',
  },
  {
    name: 'FSC Chain of Custody',
    label: 'Responsible Sourcing',
    body: 'Fiber traceable from certified forests through every stage of board production.',
  },
  {
    name: 'BRCGS Packaging',
    label: 'Packaging Materials Standard',
    body: 'Global standard for packaging safety, hygiene, and manufacturing quality control.',
  },
]

export default function CertificationsSection() {
  return (
    <section id="quality" style={{ padding: '112px 6%', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
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
          Certified quality
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
