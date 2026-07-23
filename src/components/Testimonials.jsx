import Reveal from './Reveal'

// TODO(Ahmed): placeholder quotes matching the tone of the existing FounderQuote content -
// replace with real customer quotes once available, same convention as elsewhere on the site.
const QUOTES = [
  {
    quote: 'We switched suppliers after one shipment showed up with crushed corners. Barkat specs the board for the load - that hasn’t happened since.',
    attribution: 'Operations Lead, regional e-commerce fulfillment',
  },
  {
    quote: 'The die-cut tooling turnaround was faster than we budgeted for, and the first run matched spec without a second pass.',
    attribution: 'Packaging Buyer, consumer goods manufacturer',
  },
  {
    quote: 'Consistent burst strength order after order is the whole ask. That’s what we get.',
    attribution: 'Plant Manager, industrial components supplier',
  },
]

export default function Testimonials() {
  return (
    <section style={{ padding: '80px 6% 112px', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {QUOTES.map((item, i) => (
            <Reveal key={item.attribution} delay={i * 0.1}>
              <div style={{ border: '1px solid var(--border)', background: '#fff', padding: 28, height: '100%' }}>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink)', fontStyle: 'italic', margin: '0 0 16px' }}>
                  "{item.quote}"
                </p>
                <p style={{ fontSize: 12, letterSpacing: '0.05em', color: 'var(--accent)', textTransform: 'uppercase', margin: 0 }}>
                  {item.attribution}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
