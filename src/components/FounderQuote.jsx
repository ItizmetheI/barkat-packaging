import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const CHAPTER_START = 0.93
const CHAPTER_END = 0.97

// TODO: replace with the real founder/plant manager quote (PRD Section 8 open item)
const QUOTE =
  '"Every box that leaves this floor carries our name on it. We don’t ship anything we wouldn’t stand behind ourselves."'
const ATTRIBUTION = 'Founder & Plant Manager, Barkat Packaging'

// Ch.9 THE WORD: 93-97% scroll, camera holds (Ch.8's final position) while the scene dims
// and a founder quote fades in. Pure DOM overlay - nothing here needs to touch the 3D scene.
export default function FounderQuote({ progressRef }) {
  const dimRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    function tick() {
      const global = progressRef.current
      const local = Math.min(1, Math.max(0, (global - CHAPTER_START) / (CHAPTER_END - CHAPTER_START)))
      if (dimRef.current) dimRef.current.style.opacity = local * 0.85
      if (textRef.current) textRef.current.style.opacity = local
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [progressRef])

  return (
    <>
      <div
        ref={dimRef}
        style={{ position: 'fixed', inset: 0, zIndex: 20, background: '#000000', opacity: 0, pointerEvents: 'none' }}
      />
      <div
        ref={textRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 21,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 15%',
          textAlign: 'center',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <p style={{ color: '#F7F8FA', fontSize: 24, lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>{QUOTE}</p>
        <p style={{ color: '#C9A961', fontSize: 14, letterSpacing: '0.1em', marginTop: 24, textTransform: 'uppercase' }}>
          {ATTRIBUTION}
        </p>
      </div>
    </>
  )
}
