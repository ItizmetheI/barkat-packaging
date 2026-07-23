import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../config/nav'

export default function SiteFooter() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(247,248,250,0.7)' }}>
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '64px 6% 32px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 48,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: 320 }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.25em', color: '#F7F8FA', marginBottom: 12 }}>BARKAT</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Corrugated packaging built to spec — linerboard in, a palletized order out the dock door.
          </p>
        </div>

        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.1em', color: 'rgba(247,248,250,0.45)', marginBottom: 14 }}>SITE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.to} style={{ fontSize: 14, color: 'rgba(247,248,250,0.75)', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.1em', color: 'rgba(247,248,250,0.45)', marginBottom: 14 }}>GET IN TOUCH</div>
          {/* TODO: swap in Ahmed's real contact details once provided */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <span>sales@barkatpackaging.example</span>
            <a href="tel:+15550000000" style={{ color: 'inherit', textDecoration: 'none' }}>
              (555) 000-0000
            </a>
            <span>Mon–Sat, 9am–6pm</span>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(247,248,250,0.1)',
          padding: '20px 6%',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          fontSize: 13,
          color: 'rgba(247,248,250,0.45)',
        }}
      >
        <span>© {new Date().getFullYear()} Barkat Packaging</span>
        <span>Every order, to spec.</span>
      </div>
    </footer>
  )
}
