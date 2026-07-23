import { useRef } from 'react'
import warehouseWide from '../assets/photos/warehouse-wide.jpg'
import Reveal from './Reveal'
import useParallax from '../hooks/useParallax'

// TODO: replace with the real founder/plant manager quote (PRD Section 8 open item)
const QUOTE =
  '"Our name is on every box that leaves this floor. We don’t sign off on a run we wouldn’t trust with our own freight."'
const ATTRIBUTION = 'Founder & Plant Manager, Barkat Packaging'

// Static testimonial section - a normal part of the page now, not a scroll-triggered
// dim-and-fade overlay tied to the old 8-chapter 3D journey.
export default function FounderQuote() {
  const sectionRef = useRef(null)
  const bgRef = useParallax(sectionRef, 40)

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '120px 15%',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <img
        ref={bgRef}
        src={warehouseWide}
        alt=""
        loading="lazy"
        style={{ position: 'absolute', top: -40, left: 0, right: 0, height: 'calc(100% + 80px)', width: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.82) 50%, rgba(10,22,40,0.9) 100%)' }} />
      <Reveal style={{ position: 'relative' }}>
        <p style={{ color: '#F7F8FA', fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
          {QUOTE}
        </p>
        <p style={{ color: '#4A9EDE', fontSize: 14, letterSpacing: '0.1em', marginTop: 24, textTransform: 'uppercase' }}>
          {ATTRIBUTION}
        </p>
      </Reveal>
    </section>
  )
}
