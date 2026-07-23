import Reveal from './Reveal'

// TODO(Ahmed): illustrative verticals based on what a plant this size typically serves -
// not a verified client list. Replace with real named industries/clients once confirmed.
const INDUSTRIES = [
  {
    name: 'Food & Beverage',
    body: 'Grease-resistant liners and food-safe board for packaging that ships close to the product.',
    specs: 'Moisture-resistant options, C-flute standard',
  },
  {
    name: 'E-Commerce & Retail',
    body: 'Right-sized mailers and shipping boxes built for parcel networks, not pallet freight.',
    specs: 'E-flute mailers, RSC shipping boxes',
  },
  {
    name: 'Industrial & Manufacturing',
    body: 'Heavy-duty double-wall construction for dense, high-weight components and parts.',
    specs: 'B/C double wall, FOL construction',
  },
  {
    name: 'Agriculture',
    body: 'Ventilated designs for produce that needs airflow in transit, built to stack on a pallet without crushing.',
    specs: 'Vented die-cut, wax-alternative coatings',
  },
  {
    name: 'Pharmaceuticals',
    body: 'Tamper-evident and traceable packaging for regulated goods, documented from board to dock.',
    specs: 'Tamper-evident closures, lot tracking compatible',
  },
]

export default function IndustriesGrid() {
  return (
    <section style={{ padding: '96px 6%', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--ink)', margin: '0 0 12px', textAlign: 'center' }}>
          Industries we pack for
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          Different loads need different boards. Here's how spec choices change by industry.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.name} delay={(i % 3) * 0.1}>
              <div style={{ border: '1px solid var(--border)', background: 'var(--bg-alt)', padding: 28, height: '100%' }}>
                <h3 style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px' }}>{industry.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)', margin: '0 0 14px' }}>{industry.body}</p>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--accent)', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  {industry.specs}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
