import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import useChapterOpacity from '../hooks/useChapterOpacity'

const CHAPTER_START = 0.85
const CHAPTER_END = 0.93
// Ch.9 (Word) and Ch.10 (Contact) are DOM-only overlays that dim/blur whatever 3D content
// is behind them - they don't bring their own geometry. So this is the site's final 3D
// image; it holds visible through the end of scroll instead of fading out mid-story.
const VISIBLE_END = 1.0
const CAMERA_START = [0, 1, 3.5]
const CAMERA_END = [7, 5, 15]
const LOOK_AT = [0, 1.5, 0]

const COLS = 4
const ROWS = 3
const LAYERS = 2
const COUNT = COLS * ROWS * LAYERS
const BOX_SIZE = 1.4
const GAP = 0.15
const PALLET_COLOR = '#8B6A4A'
const BOX_COLOR = '#1E3A5F'

const dummy = new THREE.Object3D()

// Ch.8 THE DOCK: 85-93% scroll, camera pulls back wide to reveal pallet/warehouse context
// as finished boxes stack on, one by one, staggered by index. InstancedMesh per the PRD's
// performance budget (Section 5) - never individual meshes in a loop.
export default function Chapter8_Dock({ progressRef }) {
  const meshRef = useRef(null)
  const palletMaterialRef = useRef(null)
  const { camera } = useThree()
  const getOpacity = useChapterOpacity(progressRef, CHAPTER_START, VISIBLE_END)

  const positions = useMemo(() => {
    const step = BOX_SIZE + GAP
    const originX = -((COLS - 1) * step) / 2
    const originZ = -((ROWS - 1) * step) / 2
    const list = []
    for (let l = 0; l < LAYERS; l++) {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          list.push([originX + c * step, 0.1 + BOX_SIZE / 2 + l * step, originZ + r * step])
        }
      }
    }
    return list
  }, [])

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

    if (palletMaterialRef.current) {
      palletMaterialRef.current.opacity = Math.min(THREE.MathUtils.clamp(local / 0.15, 0, 1), opacity)
    }

    if (meshRef.current) {
      positions.forEach((pos, i) => {
        const threshold = i / COUNT
        const reveal = THREE.MathUtils.clamp((local - threshold) / 0.15, 0, 1)
        dummy.position.set(pos[0], pos[1], pos[2])
        dummy.scale.setScalar(Math.min(reveal, opacity))
        dummy.updateMatrix()
        meshRef.current.setMatrixAt(i, dummy.matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.2, 4]} />
        <meshStandardMaterial ref={palletMaterialRef} color={PALLET_COLOR} transparent opacity={0} />
      </mesh>
      <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
        <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
        <meshStandardMaterial color={BOX_COLOR} />
      </instancedMesh>
    </group>
  )
}
