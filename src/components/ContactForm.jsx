import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const CHAPTER_START = 0.97
const CHAPTER_END = 1.0

const inputStyle = {
  padding: '10px 12px',
  background: 'transparent',
  border: '1px solid rgba(247,248,250,0.25)',
  color: '#F7F8FA',
  fontFamily: 'inherit',
  fontSize: 14,
}

// Ch.10 CONTACT: 97-100% scroll, camera fixed (holds Ch.8's final position), UI takes over -
// RFQ form fades in over a blurred/dimmed scene (native CSS backdrop-filter, no library).
// TODO: wire submit to a real endpoint once Ahmed decides where RFQs should land.
export default function ContactForm({ progressRef }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    function tick() {
      const global = progressRef.current
      const local = Math.min(1, Math.max(0, (global - CHAPTER_START) / (CHAPTER_END - CHAPTER_START)))
      if (overlayRef.current) {
        overlayRef.current.style.opacity = local
        overlayRef.current.style.pointerEvents = local > 0.3 ? 'auto' : 'none'
      }
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [progressRef])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 14, 20, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <form
        style={{
          width: 'min(480px, 90vw)',
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
    </div>
  )
}
