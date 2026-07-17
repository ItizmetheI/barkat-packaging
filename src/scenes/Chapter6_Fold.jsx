import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CHAPTER_START = 0.62
const CHAPTER_END = 0.75
const CAMERA_START = [3, 2, 3]
const CAMERA_END = [0, 2, 4]
const LOOK_AT = [0, 1, 0]
// Same lightened brand navy as Ch.4's print layer - this is that same printed board, now folding
const BOARD_COLOR = '#1E3A5F'
const PANEL_SIZE = 2

// Ch.6 THE FOLD: 62-75% scroll, camera orbits a folding board as 4 wall panels hinge up
// from a fixed base into an open box. ponytail: 5 panels (base + 4 walls), not the PRD's
// full 6 - the lid needs a second-order hinge (parented to an already-rotating wall) and
// the PRD calls this "simple rigged animation, not complex modeling." Add the lid once
// this pass is approved.
export default function Chapter6_Fold({ progressRef }) {
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const { camera } = useThree()

  useFrame(() => {
    const global = progressRef.current
    const local = THREE.MathUtils.clamp((global - CHAPTER_START) / (CHAPTER_END - CHAPTER_START), 0, 1)

    if (global >= CHAPTER_START) {
      camera.position.set(
        THREE.MathUtils.lerp(CAMERA_START[0], CAMERA_END[0], local),
        THREE.MathUtils.lerp(CAMERA_START[1], CAMERA_END[1], local),
        THREE.MathUtils.lerp(CAMERA_START[2], CAMERA_END[2], local)
      )
      camera.lookAt(...LOOK_AT)
    }

    if (frontRef.current) frontRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, 0, local)
    if (backRef.current) backRef.current.rotation.x = THREE.MathUtils.lerp(-Math.PI / 2, 0, local)
    if (leftRef.current) leftRef.current.rotation.z = THREE.MathUtils.lerp(Math.PI / 2, 0, local)
    if (rightRef.current) rightRef.current.rotation.z = THREE.MathUtils.lerp(-Math.PI / 2, 0, local)
  })

  return (
    <group>
      {/* base panel, flat on the ground */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[PANEL_SIZE, PANEL_SIZE, 1, 1]} />
        <meshStandardMaterial color={BOARD_COLOR} side={THREE.DoubleSide} />
      </mesh>

      {/* 4 wall panels, each a hinge group at its base edge with the panel offset above it */}
      <group ref={frontRef} position={[0, 0, PANEL_SIZE / 2]}>
        <mesh position={[0, PANEL_SIZE / 2, 0]}>
          <planeGeometry args={[PANEL_SIZE, PANEL_SIZE, 1, 1]} />
          <meshStandardMaterial color={BOARD_COLOR} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={backRef} position={[0, 0, -PANEL_SIZE / 2]}>
        <mesh position={[0, PANEL_SIZE / 2, 0]}>
          <planeGeometry args={[PANEL_SIZE, PANEL_SIZE, 1, 1]} />
          <meshStandardMaterial color={BOARD_COLOR} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={leftRef} position={[-PANEL_SIZE / 2, 0, 0]}>
        <mesh position={[0, PANEL_SIZE / 2, 0]}>
          <planeGeometry args={[PANEL_SIZE, PANEL_SIZE, 1, 1]} />
          <meshStandardMaterial color={BOARD_COLOR} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={rightRef} position={[PANEL_SIZE / 2, 0, 0]}>
        <mesh position={[0, PANEL_SIZE / 2, 0]}>
          <planeGeometry args={[PANEL_SIZE, PANEL_SIZE, 1, 1]} />
          <meshStandardMaterial color={BOARD_COLOR} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}
