import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { easeInOutCubic } from '../utils/easing'

const CHAPTER_START = 0.5
const CHAPTER_END = 1.0
const ROTATION_Y_START = -0.1
const ROTATION_Y_END = 0.1

// Ch.2 THE FLUTE: 50-100% scroll, camera holds and orbits rotation.y -0.1->0.1, drives the
// shared PaperPlane's flute-deformation uniforms directly from scroll position - the
// deformation amount IS the scroll position (kept raw/linear, not eased - it's a physical
// unspool, not a camera move), no separate tween. Pure controller - the plane and its shader
// live in PaperPlane.jsx / App.jsx, shared with Ch.1.
export default function Chapter2_Flute({ progressRef, fluteUniforms }) {
  const { camera } = useThree()

  useFrame(() => {
    const global = progressRef.current
    const local = THREE.MathUtils.clamp((global - CHAPTER_START) / (CHAPTER_END - CHAPTER_START), 0, 1)
    const eased = easeInOutCubic(local)

    fluteUniforms.uFluteProgress.value = local

    // Explicit handoff: only write the camera within this chapter's own range.
    if (global >= CHAPTER_START && global < CHAPTER_END) {
      camera.position.set(0, 1.5, 3)
      camera.rotation.set(0, THREE.MathUtils.lerp(ROTATION_Y_START, ROTATION_Y_END, eased), 0)
    }
  })

  return null
}
