import { useRef, useEffect } from 'react'
import gsap from 'gsap'

// TODO: replace with Ahmed's real copy once the PRD's Section 8 items land (specs, certs,
// actual capabilities) - this is real corrugated-packaging process knowledge, not a
// fabricated claim about Barkat's own operations specifically.
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
  {
    start: 0.25,
    end: 0.38,
    eyebrow: '03 — THE BOND',
    title: 'Three layers become one.',
    body: 'Liner, flute, liner — pressed and bonded into a single board built to spec, not guessed at.',
  },
  {
    start: 0.38,
    end: 0.5,
    eyebrow: '04 — THE PRINT',
    title: 'Your brand, on the board.',
    body: 'Print goes on before the cut — built to survive the trip, not just look good on day one.',
  },
  {
    start: 0.5,
    end: 0.62,
    eyebrow: '05 — THE CUT',
    title: 'Precision, every time.',
    body: 'Every panel cut to the same line, at the same tolerance, order after order.',
  },
  {
    start: 0.62,
    end: 0.75,
    eyebrow: '06 — THE FOLD',
    title: 'Flat becomes box.',
    body: "The fold is where the design proves itself — or doesn't.",
  },
  {
    start: 0.75,
    end: 0.85,
    eyebrow: '07 — THE SPEC',
    title: 'Built for what it carries.',
    body: 'Flute type, board weight, burst strength — chosen for the load, not the average.',
  },
  {
    start: 0.85,
    end: 0.93,
    eyebrow: '08 — THE DOCK',
    title: 'Counted. Palletized. Gone.',
    body: 'On schedule, every order — this is the part that actually matters to the buyer.',
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
    <div style={{ position: 'fixed', inset: 0, zIndex: 8, pointerEvents: 'none' }}>
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
