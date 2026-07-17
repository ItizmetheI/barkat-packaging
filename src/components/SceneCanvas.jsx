import { Canvas } from '@react-three/fiber'

// Single persistent Canvas hosting every chapter - never create a Canvas per chapter.
// Camera position/rotation and per-chapter uniforms are driven from useScrollTimeline,
// not from anything inside this component. No per-chapter camera logic here.
export default function SceneCanvas({ children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#000000' }}>
      <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {children}
      </Canvas>
    </div>
  )
}
