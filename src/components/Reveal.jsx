import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

// Reusable scroll-in animation: fades/slides an element up once it enters the viewport.
// Plain IntersectionObserver, no new dependency and no GSAP ScrollTrigger needed for this -
// unobserves itself after the first reveal since it never needs to re-trigger.
// Reveal itself is driven by animejs (outExpo ease) instead of a CSS transition string.
export default function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 900,
            delay: delay * 1000,
            ease: 'outExpo',
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} style={{ ...style, opacity: 0 }}>
      {children}
    </div>
  )
}
