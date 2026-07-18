import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CHAPTER_START = 0.75
const CHAPTER_END = 0.85
const CAMERA_START = [0, 2, 4]
const CAMERA_END = [0, 1, 3.5]
const LOOK_AT = [0, 1, 0]

// Ch.7 THE SPEC: 75-85% scroll, camera settles front-on the folded box while HUD stat
// callouts (SpecHUD.jsx, a DOM overlay - HUD text doesn't belong inside the WebGL canvas)
// fade in around it. No new geometry - the box is already sitting there from Ch.6.
// TODO: swap the box's surface for real product photography once provided.
export default function Chapter7_Spec({ progressRef }) {
  const { camera } = useThree()

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
  })

  return null
}
