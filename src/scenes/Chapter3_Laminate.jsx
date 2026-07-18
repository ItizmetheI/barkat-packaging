import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import useChapterOpacity from '../hooks/useChapterOpacity'

const CHAPTER_START = 0.25
const CHAPTER_END = 0.38
const CAMERA_START = [0, 1.5, 3]
const CAMERA_END = [2, 3, 5]
const LOOK_AT = [0, 1.5, 0]
const LINER_UNBONDED_Z = 1.2
const LINER_BONDED_Z = 0.3
// Uncoated kraft liner board - lighter/flatter than the corrugated medium underneath
const LINER_COLOR = '#EDE6D6'

// Ch.3 THE LAMINATE: 25-38% scroll, camera pulls back+up to reveal the cross-section,
// two liner sheets animate in from either side and bond flat against the fluted core.
// ponytail: flute-type (A/B/C/E) toggle UI from the PRD is deferred - it's a secondary
// overlay on top of this core "liners bond" visual, not the chapter's point. Add once
// this pass is approved, wiring selected type into Chapter2's frequency/amplitude.
export default function Chapter3_Laminate({ progressRef }) {
  const topLinerRef = useRef(null)
  const bottomLinerRef = useRef(null)
  const { camera } = useThree()
  const getOpacity = useChapterOpacity(progressRef, CHAPTER_START, CHAPTER_END)

  useFrame(() => {
    const global = progressRef.current
    const local = THREE.MathUtils.clamp((global - CHAPTER_START) / (CHAPTER_END - CHAPTER_START), 0, 1)

    // Explicit handoff: only write the camera within this chapter's own range.
    if (global >= CHAPTER_START && global < CHAPTER_END) {
      camera.position.set(
        THREE.MathUtils.lerp(CAMERA_START[0], CAMERA_END[0], local),
        THREE.MathUtils.lerp(CAMERA_START[1], CAMERA_END[1], local),
        THREE.MathUtils.lerp(CAMERA_START[2], CAMERA_END[2], local)
      )
      camera.lookAt(...LOOK_AT)
    }

    const opacity = getOpacity()
    const z = THREE.MathUtils.lerp(LINER_UNBONDED_Z, LINER_BONDED_Z, local)
    if (topLinerRef.current) {
      topLinerRef.current.position.z = z
      topLinerRef.current.material.opacity = opacity
    }
    if (bottomLinerRef.current) {
      bottomLinerRef.current.position.z = -z
      bottomLinerRef.current.material.opacity = opacity
    }
  })

  return (
    <group position={[0, 1.5, 0]}>
      <mesh ref={topLinerRef} position={[0, 0, LINER_UNBONDED_Z]}>
        <planeGeometry args={[8, 4, 1, 1]} />
        {/* TODO: swap flat color for real uncoated/printed liner board photo texture */}
        <meshStandardMaterial color={LINER_COLOR} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={bottomLinerRef} position={[0, 0, -LINER_UNBONDED_Z]}>
        <planeGeometry args={[8, 4, 1, 1]} />
        <meshStandardMaterial color={LINER_COLOR} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
