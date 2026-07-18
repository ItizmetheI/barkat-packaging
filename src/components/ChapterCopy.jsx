import { useRef, useEffect } from 'react'
import gsap from 'gsap'

// TODO: replace with Ahmed's real copy once the PRD's Section 8 items land (specs, certs,
// actual capabilities) - this is real corrugated-packaging process knowledge, not a
// fabricated claim about Barkat's own operations specifically.
const CHAPTERS = [
  {
    start: 0,
    end: 0.1,
    eyebrow: '01 — RAW MATERIAL',
    title: 'It starts as a single sheet.',
    body: 'Kraft linerboard, sourced virgin or recycled, arrives as continuous rolls before a single flute is formed.',
  },
  {
    start: 0.1,
    end: 0.25,
    eyebrow: '02 — THE CORE',
    title: 'Flat paper becomes structure.',
    body: 'Corrugating rollers press the medium into a wave — the flute — that gives the board its cushioning and crush resistance.',
  },
  {
    start: 0.25,
    end: 0.38,
    eyebrow: '03 — BONDING THE BOARD',
    title: 'Three layers, one board.',
    body: 'Liner, fluted medium, liner — starch adhesive bonds them under heat and pressure into a single corrugated sheet.',
  },
  {
    start: 0.38,
    end: 0.5,
    eyebrow: '04 — PRINT & FINISH',
    title: 'Brand meets board.',
    body: 'Flexographic printing applies your artwork directly to the board surface — graphics built to survive the shipping process.',
  },
  {
    start: 0.5,
    end: 0.62,
    eyebrow: '05 — DIE-CUT PRECISION',
    title: 'Cut to the exact shape.',
    body: 'Steel-rule dies score and cut each panel in one pass — the blueprint for every fold that follows.',
  },
  {
    start: 0.62,
    end: 0.75,
    eyebrow: '06 — FORMED TO SPEC',
    title: 'Flat becomes box.',
    body: 'Creased lines fold into shape and lock — the same die-line, every time, at production speed.',
  },
  {
    start: 0.75,
    end: 0.85,
    eyebrow: '07 — BUILT TO SPEC',
    title: 'Every box, engineered.',
    body: 'Flute type, board weight, and burst strength are chosen for the load — not guessed at.',
  },
  {
    start: 0.85,
    end: 0.93,
    eyebrow: '08 — READY TO SHIP',
    title: 'Palletized. Counted. Gone.',
    body: 'Finished boxes stack, shrink-wrap, and roll straight to the dock — on schedule, every order.',
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
