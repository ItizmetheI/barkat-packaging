import heroVideo from '../assets/video/hero-manufacturing.mp4'

// The first real (non-3D) section a visitor reaches, right after the short scroll-scrubbed
// intro. Plain autoplay/muted/loop video banner - the technique every product site uses for
// a hero, not something that needs GSAP or scroll-scrubbing of its own.
// TODO: swap for Barkat's own plant-floor footage once Ahmed provides it.
export default function HeroVideo() {
  return (
    <section style={{ position: 'relative', height: '90vh', minHeight: 560, overflow: 'hidden' }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,14,20,0.55) 0%, rgba(10,14,20,0.35) 50%, rgba(10,14,20,0.85) 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 6%',
        }}
      >
        <div style={{ fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.2em', color: '#C9A961', marginBottom: 16 }}>
          BARKAT PACKAGING
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, color: '#F7F8FA', margin: 0, maxWidth: 900, lineHeight: 1.1 }}>
          Corrugated packaging, built to spec.
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(247,248,250,0.8)', marginTop: 20, maxWidth: 560 }}>
          From raw linerboard to a palletized order on the dock — every step run to a tolerance, not a guess.
        </p>
        <a
          href="#contact"
          style={{
            marginTop: 32,
            padding: '14px 32px',
            background: '#C9A961',
            color: '#0A1628',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textDecoration: 'none',
          }}
        >
          REQUEST A QUOTE
        </a>
      </div>
    </section>
  )
}
