import { forwardRef, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// Repeating sine-wave-like corrugation flute cross-section, 800x100 viewBox
const FLUTE_PATH =
  'M0,50 C25,10 75,10 100,50 C125,90 175,90 200,50 C225,10 275,10 300,50 C325,90 375,90 400,50 C425,10 475,10 500,50 C525,90 575,90 600,50 C625,10 675,10 700,50 C725,90 775,90 800,50'

const LoadingScreen = forwardRef(function LoadingScreen({ onComplete }, ref) {
  const scopeRef = useRef(null)
  const leftPathRef = useRef(null)
  const rightPathRef = useRef(null)
  const wordmarkRef = useRef(null)
  const counterRef = useRef(null)

  useGSAP(
    () => {
      const leftLength = leftPathRef.current.getTotalLength()
      const rightLength = rightPathRef.current.getTotalLength()

      gsap.set(leftPathRef.current, { strokeDasharray: leftLength, strokeDashoffset: leftLength })
      gsap.set(rightPathRef.current, { strokeDasharray: rightLength, strokeDashoffset: rightLength })
      gsap.set(wordmarkRef.current, { opacity: 0 })
      gsap.set(counterRef.current, { innerText: 0 })

      const tl = gsap.timeline({ onComplete: () => onComplete?.() })

      // Fixed floor: overlay stays up at least 1.5s even if everything else finishes sooner
      tl.to({}, { duration: 1.5 }, 0)

      tl.to(leftPathRef.current, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0)
      tl.to(rightPathRef.current, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0)

      tl.to(
        counterRef.current,
        { innerText: 100, duration: 1.5, ease: 'power1.out', snap: { innerText: 1 } },
        0
      )

      tl.to(wordmarkRef.current, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 1.2)
    },
    { scope: scopeRef }
  )

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
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0A0E14',
      }}
    >
      <svg
        style={{ position: 'absolute', left: 0, top: '50%', height: 160, width: '100%', transform: 'translateY(-50%)' }}
        viewBox="0 0 800 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path ref={leftPathRef} d={FLUTE_PATH} fill="none" stroke="#FFFFFF" strokeWidth="2" transform="translate(0, -20)" />
        <path
          ref={rightPathRef}
          d={FLUTE_PATH}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          transform="translate(0, 20) scale(-1, 1) translate(-800, 0)"
        />
      </svg>

      {/* Placeholder for the real logo mark - swap for the interlocking SVG logo once received */}
      <span ref={wordmarkRef} style={{ position: 'relative', fontSize: 24, fontWeight: 600, letterSpacing: '0.3em', color: '#FFFFFF' }}>
        BARKAT
      </span>

      <span
        ref={counterRef}
        style={{ position: 'absolute', bottom: 24, left: 24, fontFamily: 'monospace', fontSize: 14, color: '#FFFFFF' }}
      >
        0
      </span>
    </div>
  )
})

export default LoadingScreen
