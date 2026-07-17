import { forwardRef } from 'react'

// The single shared kraft-paper/board plane that Ch.1 (unspool) and Ch.2 (flute deform)
// both drive. Owned here, not duplicated per-chapter - two overlapping planes would pop/jump
// as scroll crosses the chapter boundary. 128 X-segments (Ch.2's requirement) so the flute
// wave in Ch.2 deforms smoothly; Ch.1 only needs UV offset, which doesn't care about segment count.
const PaperPlane = forwardRef(function PaperPlane({ onBeforeCompile }, ref) {
  return (
    <mesh ref={ref} position={[0, 1.5, 0]}>
      <planeGeometry args={[6, 3, 128, 1]} />
      {/* TODO: swap flat color for real kraft-paper photo texture */}
      <meshStandardMaterial color="#C4A876" onBeforeCompile={onBeforeCompile} />
    </mesh>
  )
})

export default PaperPlane
