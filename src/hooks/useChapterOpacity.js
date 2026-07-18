// Symmetric fade for a scroll-range: 0 -> 1 over the first `fadeFraction` of
// [chapterStart, chapterEnd], holds at 1, then 1 -> 0 over the last `fadeFraction`.
// Returns a getter (call it inside useFrame) rather than a value, so nothing here
// triggers a React re-render - matches the ref-mutation pattern every chapter uses.
//
// Without the fade-out half, a chapter's geometry stays fully opaque forever once
// revealed, stacking up at/near the world origin as later chapters mount theirs on
// top - this hook is what chapters were missing.
export default function useChapterOpacity(progressRef, chapterStart, chapterEnd, fadeFraction = 0.15) {
  const span = chapterEnd - chapterStart
  const fadeInEnd = chapterStart + span * fadeFraction
  const fadeOutStart = chapterEnd - span * fadeFraction

  return function getOpacity() {
    const global = progressRef.current
    if (global <= chapterStart || global >= chapterEnd) return 0
    if (global < fadeInEnd) return (global - chapterStart) / (fadeInEnd - chapterStart)
    if (global > fadeOutStart) return 1 - (global - fadeOutStart) / (chapterEnd - fadeOutStart)
    return 1
  }
}
