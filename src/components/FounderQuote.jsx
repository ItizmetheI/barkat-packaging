// TODO: replace with the real founder/plant manager quote (PRD Section 8 open item)
const QUOTE =
  '"Every box that leaves this floor carries our name on it. We don’t ship anything we wouldn’t stand behind ourselves."'
const ATTRIBUTION = 'Founder & Plant Manager, Barkat Packaging'

// Static testimonial section - a normal part of the page now, not a scroll-triggered
// dim-and-fade overlay tied to the old 8-chapter 3D journey.
export default function FounderQuote() {
  return (
    <section
      style={{
        padding: '120px 15%',
        textAlign: 'center',
        background: '#0A0E14',
      }}
    >
      <p style={{ color: '#F7F8FA', fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
        {QUOTE}
      </p>
      <p style={{ color: '#C9A961', fontSize: 14, letterSpacing: '0.1em', marginTop: 24, textTransform: 'uppercase' }}>
        {ATTRIBUTION}
      </p>
    </section>
  )
}
