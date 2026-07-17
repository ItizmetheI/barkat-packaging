import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Single ScrollTrigger tied to document scroll - the one source of truth for
// scroll progress (0-1). Chapters remap this to their own local range instead
// of creating their own ScrollTriggers.
export default function useScrollTimeline() {
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
        setProgress(self.progress)
      },
    })
    return () => trigger.kill()
  }, [])

  return { progress, progressRef }
}
