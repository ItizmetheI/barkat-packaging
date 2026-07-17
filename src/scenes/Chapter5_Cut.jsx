import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CHAPTER_START = 0.5
const CHAPTER_END = 0.62
const CAMERA_Z_START = 4
const CAMERA_Z_END = 7
const LINE_Z = 0.4
const LINE_COLOR = '#F7F8FA'
const HIGHLIGHT_COLOR = '#C9A961'

// Rectangular die-line panel outline + one internal fold line, in the board's own XY plane
const OUTLINE_POINTS = [
  [-3.5, 1.8, LINE_Z],
  [3.5, 1.8, LINE_Z],
  [3.5, -1.8, LINE_Z],
  [-3.5, -1.8, LINE_Z],
  [-3.5, 1.8, LINE_Z],
]
const FOLD_POINTS = [
  [0, 1.8, LINE_Z],
  [0, -1.8, LINE_Z],
]

// Ch.5 THE CUT: 50-62% scroll, camera pulls back to a dead-on view of the board face while
// a die-line panel outline draws progressively and one panel highlights.
// ponytail note: the PRD literally says "rotation.x:-90 top-down", but our board's face lies
// along Z (not Y) throughout the whole scene - a literal -90 X rotation would show it edge-on
// (a thin line), not the die-line design. Reinterpreted as a pulled-back dead-on view, which is
// what "read the die-line blueprint" actually needs given the geometry we built in Ch.1-4.
export default function Chapter5_Cut({ progressRef }) {
  const outlineRef = useRef(null)
  const foldRef = useRef(null)
  const highlightRef = useRef(null)
  const { camera } = useThree()

  // Built imperatively + rendered via <primitive> rather than the <line> JSX intrinsic,
  // which crashed the R3F reconciler on this three.js version (context-loss loop).
  const outlineLine = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(OUTLINE_POINTS.map((p) => new THREE.Vector3(...p)))
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: LINE_COLOR }))
  }, [])
  const foldLine = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(FOLD_POINTS.map((p) => new THREE.Vector3(...p)))
    // ponytail: plain line, not dashed - LineDashedMaterial + computeLineDistances crashed
    // the WebGL context in this environment; the dash detail isn't worth chasing further.
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: LINE_COLOR }))
  }, [])

  useFrame(() => {
    const global = progressRef.current
    const local = THREE.MathUtils.clamp((global - CHAPTER_START) / (CHAPTER_END - CHAPTER_START), 0, 1)

    if (global >= CHAPTER_START) {
      camera.position.set(0, 1.5, THREE.MathUtils.lerp(CAMERA_Z_START, CAMERA_Z_END, local))
      camera.lookAt(0, 1.5, 0)
    }

    const outlineReveal = THREE.MathUtils.clamp(local / 0.7, 0, 1)
    const foldReveal = THREE.MathUtils.clamp((local - 0.3) / 0.5, 0, 1)
    const highlight = THREE.MathUtils.clamp((local - 0.75) / 0.25, 0, 1)

    if (outlineRef.current) {
      outlineRef.current.geometry.setDrawRange(0, Math.floor(outlineReveal * OUTLINE_POINTS.length))
    }
    if (foldRef.current) {
      foldRef.current.geometry.setDrawRange(0, Math.floor(foldReveal * FOLD_POINTS.length))
    }
    if (highlightRef.current) {
      highlightRef.current.material.opacity = highlight * 0.35
    }
  })

  return (
    <group>
      <primitive object={outlineLine} ref={outlineRef} />
      <primitive object={foldLine} ref={foldRef} />
      <mesh ref={highlightRef} position={[-1.75, 1.5, LINE_Z - 0.01]}>
        <planeGeometry args={[3.5, 3.6, 1, 1]} />
        <meshBasicMaterial color={HIGHLIGHT_COLOR} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
