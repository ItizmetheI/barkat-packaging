import Reveal from './Reveal'

// TODO: replace with Ahmed's real factory specs (PRD Section 8 open item - flute types
// offered, GSM range, capacity/day, certifications). These are representative industry-
// standard reference figures for corrugated packaging, not claims about Barkat specifically.
const STATS = [
  { label: 'FLUTE TYPE', value: 'C' },
  { label: 'GSM RANGE', value: '120–450' },
  { label: 'BURST STRENGTH', value: '≥ 12 kg/cm²' },
  { label: 'CAPACITY', value: '50,000 units/day' },
]

// Static stat strip - a deliberate dark inverted band between light sections for rhythm,
// not a photo-behind-text treatment (kept it to one flat color - cleaner reads as more
// premium than a busy background image fighting four stat callouts for attention).
export default function SpecHUD() {
  return (
    <section id="specs" style={{ padding: '72px 6%', background: 'var(--ink)' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32,
        }}
      >
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div style={{ borderLeft: '2px solid #C9A961', paddingLeft: 16 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em', color: 'rgba(247,248,250,0.6)' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, color: '#F7F8FA', marginTop: 4 }}>{stat.value}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
