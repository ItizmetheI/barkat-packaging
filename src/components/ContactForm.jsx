import Reveal from './Reveal'

const inputStyle = {
  padding: '10px 12px',
  background: 'transparent',
  border: '1px solid rgba(247,248,250,0.25)',
  color: '#F7F8FA',
  fontFamily: 'inherit',
  fontSize: 14,
}

// Static contact/RFQ section - a normal part of the page now, not a blurred overlay that
// only appeared in the final 3% of the old 8-chapter 3D scroll.
// TODO: wire submit to a real endpoint once Ahmed decides where RFQs should land.
export default function ContactForm() {
  return (
    <section id="contact" style={{ padding: '96px 6%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F1520' }}>
      <Reveal style={{ width: 'min(480px, 100%)' }}>
        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            padding: 32,
            background: '#0A0E14',
            border: '1px solid rgba(247,248,250,0.15)',
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 style={{ color: '#F7F8FA', fontSize: 20, margin: 0, fontWeight: 600 }}>Request a Quote</h2>
          <input placeholder="Name" style={inputStyle} />
          <input placeholder="Company" style={inputStyle} />
          <input placeholder="Email" type="email" style={inputStyle} />
          <textarea placeholder="Tell us about your packaging needs" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
          <button
            type="submit"
            style={{
              marginTop: 8,
              padding: '12px 20px',
              background: '#C9A961',
              color: '#0A1628',
              border: 'none',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            SEND REQUEST
          </button>
        </form>
      </Reveal>
    </section>
  )
}
