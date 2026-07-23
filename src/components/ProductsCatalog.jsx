import Reveal from './Reveal'

// TODO(Ahmed): confirm which of these box styles the plant actually runs, and real spec
// ranges per style - this is a representative catalog for the styles a corrugated plant
// this size would typically produce, not a verified list of Barkat's actual capabilities.
const PRODUCTS = [
  {
    name: 'RSC — Regular Slotted Container',
    label: 'Most common',
    body: 'The standard shipping box - four flaps meet at the top and bottom center. Fastest to produce, lowest cost per unit.',
    specs: 'C-flute, 32–44 ECT, single or double wall',
  },
  {
    name: 'Die-Cut Boxes',
    label: 'Custom shape',
    body: 'Cut to a specific blueprint rather than a standard slot pattern - inserts, trays, and non-rectangular forms.',
    specs: 'B or C-flute, tooling required per design',
  },
  {
    name: 'Telescoping Boxes',
    label: 'Two-piece',
    body: 'A separate lid and base that telescope together - used where a box is opened and closed repeatedly.',
    specs: 'C-flute, reinforced corners available',
  },
  {
    name: 'POP Displays',
    label: 'Retail-ready',
    body: 'Point-of-purchase display units built to hold shape and graphics on a retail floor, not just ship product.',
    specs: 'E or B-flute, high-graphic print compatible',
  },
  {
    name: 'Mailer / Literature Boxes',
    label: 'Small-parcel',
    body: 'Self-locking, tuck-style boxes sized for e-commerce parcels and printed materials - no tape required to close.',
    specs: 'E-flute, 200–275 lb test',
  },
  {
    name: 'FOL — Full Overlap',
    label: 'Heavy-duty',
    body: 'Flaps fully overlap top and bottom for maximum stacking strength - built for heavier, denser loads.',
    specs: 'B or C-flute, double wall available',
  },
]

export default function ProductsCatalog() {
  return (
    <section style={{ padding: '96px 6%', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--ink)', margin: '0 0 12px', textAlign: 'center' }}>
          Box styles &amp; capabilities
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          Every style below is built to the spec the load needs - flute type, board weight, and burst strength chosen per order, not defaulted.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.name} delay={(i % 3) * 0.1}>
              <div style={{ border: '1px solid var(--border)', background: 'var(--bg-alt)', padding: 28, height: '100%' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: 10 }}>
                  {product.label.toUpperCase()}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px' }}>{product.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)', margin: '0 0 14px' }}>{product.body}</p>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--ink-soft)', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  {product.specs}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
