import { Link } from 'react-router-dom'
import { animate } from 'animejs'

const LINKS = [
  { label: 'Company', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Quality', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// Fixed (not sticky) so it floats over the top of the page on every route, including the
// cinematic video on Home - that's what makes the video read as part of the site instead
// of a separate intro with no chrome. Its translucent blurred background already looks
// right over both video and light content, so no per-route background switching needed.
// Explicit height (var(--header-h)) instead of implicit padding-based height so every page's
// top section can compensate with exact, non-guessed top padding.
export default function Header() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 'var(--header-h)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 6%',
        background: 'rgba(247,248,250,0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Link to="/" style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--ink)', textDecoration: 'none' }}>
        BARKAT
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            onMouseEnter={(e) => {
              animate(e.currentTarget, { color: '#0a1628', duration: 200, ease: 'outQuad' })
              animate(e.currentTarget.querySelector('.nav-underline'), { scaleX: 1, duration: 200, ease: 'outQuad' })
            }}
            onMouseLeave={(e) => {
              animate(e.currentTarget, { color: 'rgba(10, 22, 40, 0.7)', duration: 200, ease: 'outQuad' })
              animate(e.currentTarget.querySelector('.nav-underline'), { scaleX: 0, duration: 200, ease: 'outQuad' })
            }}
            style={{ position: 'relative', fontSize: 14, fontWeight: 500, color: 'var(--ink-soft)', textDecoration: 'none' }}
          >
            {link.label}
            <span
              className="nav-underline"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -3,
                height: 1,
                background: 'currentColor',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />
          </Link>
        ))}
        <Link
          to="/contact"
          onMouseEnter={(e) => animate(e.currentTarget, { backgroundColor: '#b8933f', duration: 200, ease: 'outQuad' })}
          onMouseLeave={(e) => animate(e.currentTarget, { backgroundColor: '#0a1628', duration: 200, ease: 'outQuad' })}
          style={{
            padding: '10px 20px',
            background: 'var(--ink)',
            color: 'var(--bg)',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
        >
          GET A QUOTE
        </Link>
      </nav>
    </header>
  )
}
