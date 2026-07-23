// TODO(Ahmed): confirm real turnaround times, MOQs, and policies - these are placeholder
// answers in the right shape, not verified commitments.
const FAQS = [
  {
    q: 'What is the typical turnaround time?',
    a: 'Standard RSC orders typically run 5-7 business days from approved artwork. Die-cut and custom tooling add lead time for the first run.',
  },
  {
    q: 'Is there a minimum order quantity?',
    a: 'MOQs vary by box style and board weight - smaller runs are possible on standard styles, custom die-cut work generally needs higher volume to be cost-effective.',
  },
  {
    q: 'How do you choose the right flute and board weight?',
    a: 'Based on the load: weight, stacking height, and how it moves through your supply chain. We spec to the job, not a default.',
  },
  {
    q: 'Can you match our existing box spec?',
    a: 'Yes - send the current spec sheet or a sample and we’ll match or recommend an improvement if we see a gap.',
  },
  {
    q: 'Do you ship outside the region?',
    a: 'Freight is quoted per order based on volume and destination - ask when you request a quote.',
  },
]

export default function FaqSection() {
  return (
    <section style={{ padding: 'calc(var(--header-h) + 96px) 6% 40px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', margin: '0 0 32px', textAlign: 'center' }}>
          Common questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {FAQS.map((item) => (
            <div key={item.q} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px' }}>{item.q}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
