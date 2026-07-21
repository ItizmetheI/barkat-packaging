import { GrainGradient } from '@paper-design/shaders-react'
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

// Static stat strip - part of the site's light theme like everything else now (was one of
// four sections silently hardcoding its own separate dark palette, which is why "white and
// navy" wasn't reading through - see index.css). Background is a live animated shader
// (GrainGradient) re-keyed to light/warm tones instead of navy - this was the flattest
// section on the site, and it's the one place a genuinely animated background earns its
// keep without competing with real photography.
export default function SpecHUD() {
  return (
    <section id="specs" style={{ padding: '72px 6%', position: 'relative', overflow: 'hidden' }}>
      <GrainGradient
        colors={['#F7F8FA', '#EEF0F3', '#E8DCC0', '#DCE3EA']}
        colorBack="#EEF0F3"
        softness={0.75}
        intensity={0.25}
        noise={0.04}
        shape="ripple"
        speed={0.25}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32,
        }}
      >
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 16 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em', color: 'var(--ink-soft)' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, color: 'var(--ink)', marginTop: 4 }}>{stat.value}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
