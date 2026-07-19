// Shared easing helper for scroll-scrubbed camera moves - constant-velocity lerp reads as
// mechanical, this gives motion a cinematic accelerate/decelerate curve instead.
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
