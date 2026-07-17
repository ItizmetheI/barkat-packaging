import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const CHAPTER_START = 0.75
const CHAPTER_END = 0.85

// TODO: replace with Ahmed's real factory specs (PRD Section 8 open item - flute types
// offered, GSM range, capacity/day, certifications). These are representative industry-
// standard reference figures for corrugated packaging, not claims about Barkat specifically.
const STATS = [
  { label: 'FLUTE TYPE', value: 'C', style: { top: '18%', left: '8%' } },
  { label: 'GSM RANGE', value: '120–450', style: { top: '18%', right: '8%' } },
  { label: 'BURST STRENGTH', value: '≥ 12 kg/cm²', style: { bottom: '20%', left: '8%' } },
  { label: 'CAPACITY', value: '50,000 units/day', style: { bottom: '20%', right: '8%' } },
]

// DOM overlay (not inside the R3F canvas - HUD text doesn't belong in WebGL) that fades
// its stat callouts in during Ch.7's scroll range. Reads progressRef directly via GSAP's
// ticker, same "no React re-render per frame" approach the 3D chapters use.
export default function SpecHUD({ progressRef }) {
  const containerRef = useRef(null)

  useEffect(() => {
    function tick() {
      const global = progressRef.current
      const local = Math.min(1, Math.max(0, (global - CHAPTER_START) / (CHAPTER_END - CHAPTER_START)))
      if (containerRef.current) {
        containerRef.current.style.opacity = local
        containerRef.current.style.pointerEvents = local > 0.05 ? 'auto' : 'none'
      }
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [progressRef])

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 10, opacity: 0 }}>
      {STATS.map((stat) => (
        <div
          key={stat.label}
          style={{
            position: 'absolute',
            ...stat.style,
            fontFamily: 'monospace',
            color: '#F7F8FA',
            borderLeft: '2px solid #C9A961',
            paddingLeft: 10,
          }}
        >
          <div style={{ fontSize: 12, letterSpacing: '0.1em', opacity: 0.6 }}>{stat.label}</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{stat.value}</div>
        </div>
      ))}
    </div>
  )
}
