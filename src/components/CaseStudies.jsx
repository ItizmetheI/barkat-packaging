import paperRolls from '../assets/photos/paper-rolls-wide.jpg'
import warehouseDock from '../assets/photos/warehouse-dock.jpg'
import foldAssembly from '../assets/photos/fold-assembly.jpg'
import Reveal from './Reveal'

// TODO(Ahmed): these are illustrative examples of the kind of work this plant does, framed
// generically - no real client names or logos, since none are confirmed for public use.
// Replace with real named case studies once client permission is in place.
const CASES = [
  {
    eyebrow: 'E-COMMERCE',
    title: 'Fulfillment box redesign',
    body: 'A parcel-network shipper needed a right-sized mailer to cut dimensional-weight cost without losing crush resistance. Re-specced to E-flute at a tighter footprint - fewer void-fill inserts needed, lower freight cost per unit.',
    image: paperRolls,
  },
  {
    eyebrow: 'RETAIL',
    title: 'POP display rollout',
    body: 'A seasonal retail display needed to hold shape through a multi-week floor run under repeated restocking. Moved to reinforced B-flute with a locking base - held form through the full promotional window.',
    image: foldAssembly,
  },
  {
    eyebrow: 'INDUSTRIAL',
    title: 'Palletized shipping consolidation',
    body: 'A manufacturer was shipping components in mixed box sizes, complicating palletization. Standardized to two FOL sizes that nest cleanly on a standard pallet footprint - fewer SKUs, faster loading.',
    image: warehouseDock,
  },
]

export default function CaseStudies() {
  return (
    <section style={{ padding: 'calc(var(--header-h) + 112px) 6% 80px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: 'var(--ink)', margin: '0 0 12px', textAlign: 'center' }}>
          Work
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          Representative examples of the kind of spec problems this plant solves.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {CASES.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.1}>
              <div style={{ background: '#fff', border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(10,22,40,0.04)' }}>
                <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: 10 }}>
                    {item.eyebrow}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px' }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)', margin: 0 }}>{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
