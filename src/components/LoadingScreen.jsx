import { forwardRef, useEffect, useRef } from 'react'
import { createTimeline } from 'animejs'

// Isometric box wireframe that assembles itself, then fills in as solid faces - literally
// the product, not a generic loading spinner. Replaces the old flute-wave draw.
// Vertices (viewBox -70,-70 to 70,70): T top, L upper-left, R upper-right, C the front
// vertex where all 3 faces meet, BL/BR lower corners, B bottom.
const OUTLINE = 'M0,-55 L-48,-27 L-48,27 L0,55 L48,27 L48,-27 Z'
const INNER_LINES = ['M-48,-27 L0,0', 'M48,-27 L0,0', 'M0,0 L0,55']
const TOP_FACE = '0,-55 -48,-27 0,0 48,-27'
const LEFT_FACE = '-48,-27 -48,27 0,55 0,0'
const RIGHT_FACE = '48,-27 0,0 0,55 48,27'

const LoadingScreen = forwardRef(function LoadingScreen({ onComplete }, ref) {
  const scopeRef = useRef(null)
  const outlineRef = useRef(null)
  const innerRefs = useRef([])
  const faceRefs = useRef([])
  const wordmarkRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const outlineLength = outlineRef.current.getTotalLength()
    outlineRef.current.style.strokeDasharray = outlineLength
    outlineRef.current.style.strokeDashoffset = outlineLength

    const counterState = { value: 0 }
    const tl = createTimeline({ onComplete: () => onComplete?.() })

    tl.add(outlineRef.current, { strokeDashoffset: 0, duration: 900, ease: 'inOutQuad' }, 0)
    tl.add(
      counterState,
      {
        value: 100,
        duration: 1300,
        ease: 'outQuad',
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = Math.round(counterState.value)
        },
      },
      0
    )
    tl.add(innerRefs.current, { opacity: [0, 1], duration: 250 }, 800)
    tl.add(faceRefs.current, { opacity: [0, 1], duration: 350 }, 950)
    tl.add(wordmarkRef.current, { opacity: [0, 1], translateY: [8, 0], duration: 400 }, 1300)
    // Fixed floor: overlay stays up at least 1.7s even though the visuals finish sooner
    tl.add({}, { duration: 400 }, 1700)

    return () => tl.pause()
  }, [onComplete])

  return (
    <div
      ref={(node) => {
        scopeRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        overflow: 'hidden',
        background: '#0A1628',
      }}
    >
      <svg width="140" height="140" viewBox="-70 -70 140 140" aria-hidden="true">
        <polygon points={TOP_FACE} fill="#7FBEEA" ref={(el) => (faceRefs.current[0] = el)} style={{ opacity: 0 }} />
        <polygon points={LEFT_FACE} fill="#4A9EDE" ref={(el) => (faceRefs.current[1] = el)} style={{ opacity: 0 }} />
        <polygon points={RIGHT_FACE} fill="#2E6DA4" ref={(el) => (faceRefs.current[2] = el)} style={{ opacity: 0 }} />
        {INNER_LINES.map((d, i) => (
          <path key={d} d={d} stroke="#0A1628" strokeWidth="1.5" style={{ opacity: 0 }} ref={(el) => (innerRefs.current[i] = el)} />
        ))}
        <path ref={outlineRef} d={OUTLINE} fill="none" stroke="#F7F8FA" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>

      <span ref={wordmarkRef} style={{ opacity: 0, fontSize: 20, fontWeight: 600, letterSpacing: '0.25em', color: '#F7F8FA' }}>
        BARKAT PACKAGING
      </span>

      <span
        ref={counterRef}
        style={{ position: 'absolute', bottom: 24, left: 24, fontFamily: 'monospace', fontSize: 14, color: '#F7F8FA' }}
      >
        0
      </span>
    </div>
  )
})

export default LoadingScreen
