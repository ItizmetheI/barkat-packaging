import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CHAPTER_START = 0.38
const CHAPTER_END = 0.5
const CAMERA_X_START = -4
const CAMERA_X_END = 4
const CAMERA_Y = 1.5
const CAMERA_Z = 1.2
// Just in front of Ch.3's bonded liner (z=0.3) so the print layer reads as ink on that surface
const PRINT_Z = 0.35
// A lightened version of the brand navy from the earlier PRD's locked palette (Section 3,
// #0A1628) - the literal hex was nearly invisible against the scene's black void background,
// so this brightens it while staying in the same navy family. Placeholder for a real client
// print-sample photo.
const PRINT_COLOR = '#1E3A5F'

// Ch.4 THE PRESS: 38-50% scroll, camera glides laterally (macro) across the board surface
// as a print layer crossfades in over the bonded liner - TODO: swap for real client print photo
export default function Chapter4_Press({ progressRef }) {
  const printRef = useRef(null)
  const { camera } = useThree()

  useFrame(() => {
    const global = progressRef.current
    const local = THREE.MathUtils.clamp((global - CHAPTER_START) / (CHAPTER_END - CHAPTER_START), 0, 1)

    if (global >= CHAPTER_START) {
      const x = THREE.MathUtils.lerp(CAMERA_X_START, CAMERA_X_END, local)
      camera.position.set(x, CAMERA_Y, CAMERA_Z)
      camera.lookAt(x, CAMERA_Y, 0)
    }

    if (printRef.current) {
      printRef.current.material.opacity = local
    }
  })

  return (
    <mesh ref={printRef} position={[0, 1.5, PRINT_Z]}>
      <planeGeometry args={[8, 4, 1, 1]} />
      <meshStandardMaterial color={PRINT_COLOR} transparent opacity={0} side={THREE.DoubleSide} />
    </mesh>
  )
}
