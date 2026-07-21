import { useOutletContext, Link } from 'react-router-dom'
import CinematicHero from '../components/CinematicHero'
import SpecHUD from '../components/SpecHUD'
import HomeExplore from '../components/HomeExplore'
import FounderQuote from '../components/FounderQuote'

export default function HomePage() {
  const cinematicRef = useOutletContext()
  return (
    <>
      <CinematicHero ref={cinematicRef} />
      <SpecHUD />
      <HomeExplore />
      <FounderQuote />
      <section style={{ padding: '80px 6%', textAlign: 'center', background: 'var(--bg-alt)' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: 'var(--ink)', margin: '0 0 20px' }}>
          Ready to spec an order?
        </h2>
        <Link
          to="/contact"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'var(--ink)',
            color: 'var(--bg)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          GET A QUOTE
        </Link>
      </section>
    </>
  )
}
