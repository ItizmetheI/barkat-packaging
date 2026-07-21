import { Link } from 'react-router-dom'
import Reveal from './Reveal'

// Reuses the card visual language already established by CertificationsSection/ProcessGallery
// (bordered card, monospace accent eyebrow, h3 + body) rather than inventing new styling -
// just makes each card a real link into the site's other pages.
const CARDS = [
  {
    to: '/about',
    eyebrow: 'THE COMPANY',
    title: 'Who builds it',
    body: 'Years in operation, the facility, the numbers behind every order that ships on time.',
  },
  {
    to: '/process',
    eyebrow: 'THE PROCESS',
    title: 'How it’s made',
    body: 'Board to box in six steps - liner and flute through print, cut, fold, and the dock.',
  },
]

export default function HomeExplore() {
  return (
    <section style={{ padding: '96px 6%', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {CARDS.map((card, i) => (
          <Reveal key={card.to} delay={i * 0.1}>
            <Link
              to={card.to}
              style={{
                display: 'block',
                border: '1px solid var(--border)',
                background: 'var(--bg-alt)',
                padding: 32,
                textDecoration: 'none',
                height: '100%',
              }}
            >
              <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: 10 }}>
                {card.eyebrow}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-soft)', margin: 0 }}>{card.body}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
