import { Canvas } from '@react-three/fiber'

// Single persistent Canvas hosting every chapter - never create a Canvas per chapter.
// Camera position/rotation and per-chapter uniforms are driven from useScrollTimeline,
// not from anything inside this component. No per-chapter camera logic here.
//
// Sticky, not fixed: it pins to the viewport only while its parent (the short 3D-intro
// wrapper) is being scrolled through, then releases naturally so the real DOM website
// below can take over the rest of the page instead of the 3D canvas covering everything.
export default function SceneCanvas({ children }) {
  return (
    <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 0, background: '#000000' }}>
      <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* Native three.js fog (no dependency) - cheap depth cue, matches the void so it reads as atmosphere not a hard cutoff */}
        <fogExp2 attach="fog" args={['#000000', 0.025]} />
        {children}
      </Canvas>
    </div>
  )
}
