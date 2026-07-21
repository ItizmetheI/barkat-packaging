import { animate } from 'animejs'
import Reveal from './Reveal'

const inputStyle = {
  padding: '10px 12px',
  background: '#fff',
  border: '1px solid var(--border)',
  color: 'var(--ink)',
  fontFamily: 'inherit',
  fontSize: 14,
}

// Static contact/RFQ section - a normal part of the page now, not a blurred overlay that
// only appeared in the final 3% of the old 8-chapter 3D scroll.
// TODO: wire submit to a real endpoint once Ahmed decides where RFQs should land.
export default function ContactForm() {
  return (
    <section id="contact" style={{ padding: 'calc(var(--header-h) + 112px) 6% 112px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-alt)' }}>
      <Reveal style={{ width: 'min(480px, 100%)' }}>
        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            padding: 32,
            background: '#fff',
            border: '1px solid var(--border)',
            boxShadow: '0 1px 3px rgba(10,22,40,0.04)',
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 style={{ color: 'var(--ink)', fontSize: 20, margin: 0, fontWeight: 600 }}>Get a Quote</h2>
          <input placeholder="Full name" style={inputStyle} />
          <input placeholder="Company" style={inputStyle} />
          <input placeholder="Work email" type="email" style={inputStyle} />
          <textarea placeholder="Board type, dimensions, order volume — tell us what you need" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
          <button
            type="submit"
            onMouseEnter={(e) => animate(e.currentTarget, { scale: 1.03, duration: 180, ease: 'outQuad' })}
            onMouseLeave={(e) => animate(e.currentTarget, { scale: 1, duration: 180, ease: 'outQuad' })}
            onMouseDown={(e) => animate(e.currentTarget, { scale: 0.96, duration: 150, ease: 'outQuad' })}
            onMouseUp={(e) => animate(e.currentTarget, { scale: 1.03, duration: 150, ease: 'outQuad' })}
            style={{
              marginTop: 8,
              padding: '12px 20px',
              background: 'var(--ink)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            GET QUOTE
          </button>
        </form>
      </Reveal>
    </section>
  )
}
