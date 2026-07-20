import { animate } from 'animejs'

const LINKS = [
  { label: 'Company', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Quality', href: '#quality' },
  { label: 'Contact', href: '#contact' },
]

// Sticky nav for the real (non-cinematic) site. Deliberately a normal-flow element placed
// AFTER the cinematic hero in App.jsx, not a global fixed overlay - that's what keeps it
// structurally impossible for the nav to appear during the cinematic, rather than relying
// on a scroll-position check that could drift out of sync.
export default function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 6%',
        background: 'rgba(247,248,250,0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--ink)' }}>BARKAT</span>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
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
          </a>
        ))}
        <a
          href="#contact"
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
        </a>
      </nav>
    </header>
  )
}
