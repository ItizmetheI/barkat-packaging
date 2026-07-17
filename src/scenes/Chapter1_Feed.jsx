import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CHAPTER_START = 0
const CHAPTER_END = 0.1
const CAMERA_START_Z = 8
const CAMERA_END_Z = 3

// Ch.1 THE FEED: 0-10% scroll, camera dollies (0,1.5,8)->(0,1.5,3), kraft paper plane unspools
// via UV offset. Pure controller now - the plane itself lives in PaperPlane.jsx, shared with Ch.2.
export default function Chapter1_Feed({ progressRef, paperRef }) {
  const { camera } = useThree()

  useFrame(() => {
    const local = THREE.MathUtils.clamp(
      (progressRef.current - CHAPTER_START) / (CHAPTER_END - CHAPTER_START),
      0,
      1
    )

    camera.position.set(0, 1.5, THREE.MathUtils.lerp(CAMERA_START_Z, CAMERA_END_Z, local))
    camera.lookAt(0, 1.5, 0)

    // TODO: swap flat color for real kraft-paper photo texture; offset.x below then drives the unspool motion
    const material = paperRef.current?.material
    if (material?.map) {
      material.map.offset.x = local * 2
    }
  })

  return null
}
