import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Background-layer parallax: drifts an element a small, fixed px range as its section
// passes through the viewport, while foreground content (normal document flow) scrolls
// at the true 1x rate - that speed mismatch is what reads as depth. Distinct from
// useScrollTimeline: that hook pins a span and exposes 0-1 progress for chapter logic,
// this one just scrubs a single tween across a normally-flowing section.
export default function useParallax(sectionRef, distance = 60) {
  const bgRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return
    const tween = gsap.fromTo(
      bgRef.current,
      { y: -distance },
      {
        y: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [sectionRef, distance])

  return bgRef
}
