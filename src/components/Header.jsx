import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { animate } from 'animejs'
import { NAV_LINKS } from '../config/nav'

// Fixed (not sticky) so it floats over the top of the page on every route, including the
// cinematic video on Home - that's what makes the video read as part of the site instead
// of a separate intro with no chrome. Its translucent blurred background already looks
// right over both video and light content, so no per-route background switching needed.
// Explicit height (var(--header-h)) instead of implicit padding-based height so every page's
// top section can compensate with exact, non-guessed top padding.
export default function Header() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

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
      <Link
        to="/"
        onClick={() => setMobileOpen(false)}
        style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--ink)', textDecoration: 'none' }}
      >
        BARKAT
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMobileOpen((v) => !v)}
        style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer' }}
      >
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <path d="M0 1h22M0 8h22M0 15h22" stroke="var(--ink)" strokeWidth="2" />
        </svg>
      </button>

      <nav aria-label="Main navigation" className={`nav-links${mobileOpen ? ' nav-links-open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            aria-current={pathname === link.to ? 'page' : undefined}
            onClick={() => setMobileOpen(false)}
            onMouseEnter={(e) => {
              animate(e.currentTarget, { color: '#0a1628', duration: 200, ease: 'outQuad' })
              animate(e.currentTarget.querySelector('.nav-underline'), { scaleX: 1, duration: 200, ease: 'outQuad' })
            }}
            onMouseLeave={(e) => {
              animate(e.currentTarget, { color: 'rgba(10, 22, 40, 0.7)', duration: 200, ease: 'outQuad' })
              animate(e.currentTarget.querySelector('.nav-underline'), { scaleX: 0, duration: 200, ease: 'outQuad' })
            }}
            style={{
              position: 'relative',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--ink-soft)',
              textDecoration: 'none',
              padding: '6px 0',
            }}
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

        {/* TODO(Ahmed): real phone number */}
        <a href="tel:+15550000000" style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          (555) 000-0000
        </a>

        <Link
          to="/contact"
          onClick={() => setMobileOpen(false)}
          onMouseEnter={(e) => animate(e.currentTarget, { backgroundColor: '#2e7bc4', duration: 200, ease: 'outQuad' })}
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
