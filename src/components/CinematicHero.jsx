import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { animate } from 'animejs'
import useScrollTimeline from '../hooks/useScrollTimeline'
import cinematicVideo from '../assets/video/cinematic-line.mp4'

// Beats keyed to the actual footage (checked frame-by-frame: 0-2s unspooling paper roll,
// 2-6s blade/precision shots, 6-8s the box folding up, 8-10s finished boxes stacking) -
// title/body reused verbatim from the same approved chapter copy used elsewhere on the
// site (Feed/Cut/Fold/Dock), not rewritten, just re-timed to the video instead of a 3D scene.
const BEATS = [
  {
    start: 0,
    end: 2,
    label: 'THE FEED',
    title: 'One sheet. Every box starts here.',
    body: 'Raw linerboard, uncut and unformed — the beginning of every order that leaves the plant.',
  },
  {
    start: 2,
    end: 6,
    label: 'THE CUT',
    title: 'Precision, every time.',
    body: 'Every panel cut to the same line, at the same tolerance, order after order.',
  },
  {
    start: 6,
    end: 8,
    label: 'THE FOLD',
    title: 'Flat becomes box.',
    body: "The fold is where the design proves itself — or doesn't.",
  },
  {
    start: 8,
    end: 10,
    label: 'THE DOCK',
    title: 'Counted. Palletized. Gone.',
    body: 'On schedule, every order — this is the part that actually matters to the buyer.',
  },
]
const EDGE_FADE = 0.2

// The cinematic opener: real footage, scroll-scrubbed (not autoplaying) so scroll position
// IS the timeline, same way the site's old WebGL camera moves worked - just driving a
// <video>'s currentTime instead of a Three.js camera. Captions are timed to the footage's
// own beats and sit inside a bottom scrim baked into the frame rather than a floating card,
// so they read as part of the shot instead of a UI layer slapped over it.
//
// No nav renders anywhere in this component or its wrapper - Header.jsx is a sibling placed
// after this in App.jsx, so it's structurally impossible for the nav to appear mid-cinematic.
// A small beat rail (right edge) and a scroll cue (first beat only) give orientation instead -
// "where am I / what do I do" without breaking that rule.
export default function CinematicHero() {
  const wrapperRef = useRef(null)
  const videoRef = useRef(null)
  const durationRef = useRef(10) // updated from real metadata once loaded; safe fallback matches the source file
  const elsRef = useRef([])
  const railElsRef = useRef([])
  const scrollCueRef = useRef(null)
  const { progressRef } = useScrollTimeline(wrapperRef, 0.35) // small smoothing lag - raw 1:1 scroll->seek on fast wheel ticks reads as stuttery since video seeks aren't instant

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true // ignore the source clip's audio entirely, per instruction
    video.pause()

    function onMeta() {
      if (video.duration && Number.isFinite(video.duration)) durationRef.current = video.duration
    }
    video.addEventListener('loadedmetadata', onMeta)

    let lastTime = -1
    let cueDismissed = false
    function tick() {
      const duration = durationRef.current
      const progress = progressRef.current
      const targetTime = gsap.utils.clamp(0, duration, progress * duration)
      // Skip redundant seeks - same clamped time would otherwise re-set every tick for no reason
      if (Math.abs(targetTime - lastTime) > 0.01) {
        video.currentTime = targetTime
        lastTime = targetTime
      }

      if (!cueDismissed && progress > 0.02 && scrollCueRef.current) {
        cueDismissed = true
        animate(scrollCueRef.current, { opacity: 0, duration: 300, ease: 'outQuad' })
      }

      BEATS.forEach((beat, i) => {
        const el = elsRef.current[i]
        const railEl = railElsRef.current[i]
        if (!el) return
        const span = beat.end - beat.start
        const fadeInEnd = beat.start + span * EDGE_FADE
        const fadeOutStart = beat.end - span * EDGE_FADE
        let opacity = 0
        const active = targetTime >= beat.start && targetTime <= beat.end
        if (active) {
          if (targetTime < fadeInEnd) opacity = (targetTime - beat.start) / (fadeInEnd - beat.start)
          else if (targetTime > fadeOutStart) opacity = 1 - (targetTime - fadeOutStart) / (beat.end - fadeOutStart)
          else opacity = 1
        }
        el.style.opacity = Math.max(0, Math.min(1, opacity))
        if (railEl) {
          railEl.style.opacity = active ? 1 : 0.35
          railEl.style.transform = active ? 'scaleY(1)' : 'scaleY(0.5)'
        }
      })
    }
    gsap.ticker.add(tick)
    return () => {
      video.removeEventListener('loadedmetadata', onMeta)
      gsap.ticker.remove(tick)
    }
  }, [progressRef])

  // Scroll cue: a simple looping nudge, independent of scroll position - this is exactly
  // the kind of self-contained entrance/attention animation anime.js is for (the caption
  // fades above are driven directly by scroll math and must stay untouched by any easing
  // library, or they'd desync from the video).
  useEffect(() => {
    if (!scrollCueRef.current) return
    const anim = animate(scrollCueRef.current.querySelector('span'), {
      translateY: [0, 8, 0],
      loop: true,
      duration: 1400,
      ease: 'inOutSine',
    })
    return () => anim.pause()
  }, [])

  return (
    <div ref={wrapperRef} style={{ position: 'relative', height: '400vh', background: '#05070a' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src={cinematicVideo}
          muted
          playsInline
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Baked-in vignette + bottom scrim, not a floating text box - this is what makes the
            captions read as graded into the shot instead of a UI layer on top of it. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(5,7,10,0.4) 0%, rgba(5,7,10,0) 25%, rgba(5,7,10,0) 55%, rgba(5,7,10,0.92) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'absolute', left: '6%', right: '6%', bottom: '9%' }}>
          {BEATS.map((beat, i) => (
            <div
              key={beat.title}
              ref={(el) => (elsRef.current[i] = el)}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, maxWidth: 640, opacity: 0 }}
            >
              <div style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.2em', color: '#C9A961', marginBottom: 10 }}>
                {beat.label}
              </div>
              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 700,
                  color: '#F7F8FA',
                  margin: '0 0 10px',
                  lineHeight: 1.15,
                  textShadow: '0 2px 24px rgba(0,0,0,0.5)',
                }}
              >
                {beat.title}
              </h1>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: 'rgba(247,248,250,0.82)',
                  margin: 0,
                  maxWidth: 460,
                  textShadow: '0 1px 12px rgba(0,0,0,0.6)',
                }}
              >
                {beat.body}
              </p>
            </div>
          ))}
        </div>

        {/* Beat rail: orientation ("where am I in this") without being a nav menu - stays
            inside the cinematic, doesn't violate "no nav during the cinematic". */}
        <div
          style={{
            position: 'absolute',
            right: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {BEATS.map((beat, i) => (
            <div
              key={beat.label}
              ref={(el) => (railElsRef.current[i] = el)}
              style={{ width: 3, height: 22, background: '#C9A961', opacity: 0.35, transform: 'scaleY(0.5)', transition: 'opacity 0.2s' }}
            />
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            top: '6%',
            left: '6%',
            fontFamily: 'monospace',
            fontSize: 12,
            letterSpacing: '0.25em',
            color: 'rgba(247,248,250,0.7)',
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}
        >
          BARKAT PACKAGING
        </div>

        <div
          ref={scrollCueRef}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '4%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: 'rgba(247,248,250,0.7)',
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.15em',
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}
        >
          SCROLL
          <span style={{ display: 'block', fontSize: 16 }}>↓</span>
        </div>
      </div>
    </div>
  )
}
