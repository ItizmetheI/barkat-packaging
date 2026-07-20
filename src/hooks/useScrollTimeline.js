import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Single ScrollTrigger tied to a scroll span - the one source of truth for that
// span's progress (0-1). Chapters remap this to their own local range instead of
// creating their own ScrollTriggers.
//
// Scoped to triggerRef's element (its own height defines the 0-1 span) rather than
// document.body, so the 3D chapter intro can occupy a short pinned span up top while
// the rest of the page is a normal-flowing website below it - not the whole document.
export default function useScrollTimeline(triggerRef, scrub = true) {
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub,
      onUpdate: (self) => {
        progressRef.current = self.progress
        setProgress(self.progress)
      },
    })
    return () => trigger.kill()
  }, [triggerRef, scrub])

  return { progress, progressRef }
}
