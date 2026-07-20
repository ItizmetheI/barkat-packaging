import Reveal from './Reveal'

// TODO: replace narrative below with Ahmed's real company history (founding story, milestones).
// Kept deliberately generic/credible - no invented founding year or unverifiable claims.
const NARRATIVE =
  "Barkat Packaging has spent years supplying corrugated boxes to manufacturers and distributors who can't afford a shipment that shows up crushed. We build every order to the buyer's spec - board weight, flute, burst strength - rather than sending whatever's closest on the shelf. That discipline is why customers keep coming back order after order."

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
  return (
    <section id="about" style={{ padding: '112px 6%', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
                Who we are
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
