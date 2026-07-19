import { forwardRef, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const VISIBLE_END = 1.0 // combined Ch.1 (unspool) + Ch.2 (flute) range - both now span the full intro, fades out as the intro hands off to the real DOM site
const FADE_FRACTION = 0.15
const FADE_OUT_START = VISIBLE_END - VISIBLE_END * FADE_FRACTION

// The single shared kraft-paper/board plane that Ch.1 (unspool) and Ch.2 (flute deform)
// both drive. Owned here, not duplicated per-chapter - two overlapping planes would pop/jump
// as scroll crosses the chapter boundary. 128 X-segments (Ch.2's requirement) so the flute
// wave in Ch.2 deforms smoothly; Ch.1 only needs UV offset, which doesn't care about segment count.
//
// Owns its own visibility fade (combined Ch.1+Ch.2 range), independently of which of those
// two chapters currently has camera control - without this it stays opaque forever once
// revealed, sitting behind every later chapter for the rest of the scroll.
//
// Fade-out only, not the symmetric useChapterOpacity pattern every other chapter uses: this
// is the very first thing on screen, with nothing before it to hand off from, so it's fully
// visible from global=0 (the moment the loading screen crossfades away) rather than fading
// in from invisible.
const PaperPlane = forwardRef(function PaperPlane({ onBeforeCompile, progressRef }, ref) {
  const materialRef = useRef(null)

  useFrame(() => {
    const global = progressRef.current
    let opacity = 1
    if (global >= VISIBLE_END) opacity = 0
    else if (global > FADE_OUT_START) {
      opacity = THREE.MathUtils.clamp(1 - (global - FADE_OUT_START) / (VISIBLE_END - FADE_OUT_START), 0, 1)
    }
    if (materialRef.current) materialRef.current.opacity = opacity
  })

  return (
    <mesh ref={ref} position={[0, 1.5, 0]}>
      <planeGeometry args={[6, 3, 128, 1]} />
      {/* TODO: swap flat color for real kraft-paper photo texture - Ahmed will drop a local
          image into /src/assets once available; no external generation service is used here */}
      <meshStandardMaterial
        ref={materialRef}
        color="#C4A876"
        onBeforeCompile={onBeforeCompile}
        transparent
        opacity={1}
      />
    </mesh>
  )
})

export default PaperPlane
