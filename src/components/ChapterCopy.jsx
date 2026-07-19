import { useRef, useEffect } from 'react'
import gsap from 'gsap'

// Only the two chapters that still run as 3D (Feed, Flute) - Bond through Dock moved to
// ProcessGallery.jsx as real-photo sections once the 3D scroll was cut down to a short
// intro instead of the whole site. Same verbatim copy as before, not rewritten.
const CHAPTERS = [
  {
    start: 0,
    end: 0.1,
    eyebrow: '01 — THE FEED',
    title: 'One sheet. Every box starts here.',
    body: 'Raw linerboard, uncut and unformed — the beginning of every order that leaves the plant.',
  },
  {
    start: 0.1,
    end: 0.25,
    eyebrow: '02 — THE FLUTE',
    title: 'Strength is built, not added.',
    body: 'The corrugated wave is what turns flat paper into structure — this is the shape that carries the load.',
  },
]
const EDGE_FADE = 0.15 // fraction of each chapter's own range spent fading in/out at its edges

// Per-chapter eyebrow/headline/body copy - the narrative text the 3D chapters never had.
// Positioned mid-left so it clears SpecHUD's corner stat badges (Ch.7 overlaps both).
export default function ChapterCopy({ progressRef }) {
  const elsRef = useRef([])

  useEffect(() => {
    function tick() {
      const global = progressRef.current
      CHAPTERS.forEach((ch, i) => {
        const el = elsRef.current[i]
        if (!el) return
        const span = ch.end - ch.start
        const fadeInEnd = ch.start + span * EDGE_FADE
        const fadeOutStart = ch.end - span * EDGE_FADE
        let opacity = 0
        if (global >= ch.start && global <= ch.end) {
          if (global < fadeInEnd) opacity = (global - ch.start) / (fadeInEnd - ch.start)
          else if (global > fadeOutStart) opacity = 1 - (global - fadeOutStart) / (ch.end - fadeOutStart)
          else opacity = 1
        }
        el.style.opacity = Math.max(0, Math.min(1, opacity))
      })
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [progressRef])

  return (
    <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 8, pointerEvents: 'none' }}>
      {CHAPTERS.map((ch, i) => (
        <div
          key={ch.eyebrow}
          ref={(el) => (elsRef.current[i] = el)}
          style={{ position: 'absolute', left: '8%', top: '38%', maxWidth: 420, opacity: 0 }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.15em', color: '#C9A961', marginBottom: 10 }}>
            {ch.eyebrow}
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 600, color: '#F7F8FA', margin: '0 0 12px', lineHeight: 1.15 }}>
            {ch.title}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(247,248,250,0.75)', margin: 0 }}>{ch.body}</p>
        </div>
      ))}
    </div>
  )
}
