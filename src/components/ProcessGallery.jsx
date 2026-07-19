import rawMaterial from '../assets/photos/raw-material.jpg'
import fluteTexture from '../assets/photos/flute-texture.jpg'
import printPress from '../assets/photos/print-press.jpg'
import precisionCut from '../assets/photos/precision-cut.jpg'
import foldAssembly from '../assets/photos/fold-assembly.jpg'
import warehouseDock from '../assets/photos/warehouse-dock.jpg'

// Bond through Dock used to be 3D chapters (Ch.3-8); moved here as a real-photo grid once
// the 3D scroll was cut down to a short Feed/Flute intro. Same verbatim copy that was
// already approved for those chapters, just presented over photography instead of WebGL.
// TODO: swap stock photos for real Barkat plant-floor photography once Ahmed provides it.
const STEPS = [
  {
    eyebrow: '03 — THE BOND',
    title: 'Three layers become one.',
    body: 'Liner, flute, liner — pressed and bonded into a single board built to spec, not guessed at.',
    image: rawMaterial,
  },
  {
    eyebrow: '04 — THE PRINT',
    title: 'Your brand, on the board.',
    body: 'Print goes on before the cut — built to survive the trip, not just look good on day one.',
    image: printPress,
  },
  {
    eyebrow: '05 — THE CUT',
    title: 'Precision, every time.',
    body: 'Every panel cut to the same line, at the same tolerance, order after order.',
    image: precisionCut,
  },
  {
    eyebrow: '06 — THE FOLD',
    title: 'Flat becomes box.',
    body: "The fold is where the design proves itself — or doesn't.",
    image: foldAssembly,
  },
  {
    eyebrow: '07 — THE SPEC',
    title: 'Built for what it carries.',
    body: 'Flute type, board weight, burst strength — chosen for the load, not the average.',
    image: fluteTexture,
  },
  {
    eyebrow: '08 — THE DOCK',
    title: 'Counted. Palletized. Gone.',
    body: 'On schedule, every order — this is the part that actually matters to the buyer.',
    image: warehouseDock,
  },
]

export default function ProcessGallery() {
  return (
    <section style={{ padding: '96px 6%', maxWidth: 1400, margin: '0 auto' }}>
      <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 700, color: '#F7F8FA', margin: '0 0 48px', textAlign: 'center' }}>
        From board to box
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
        {STEPS.map((step) => (
          <div key={step.eyebrow} style={{ background: '#0F1520', border: '1px solid rgba(247,248,250,0.08)' }}>
            <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
              <img src={step.image} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: '#C9A961', marginBottom: 10 }}>
                {step.eyebrow}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: '#F7F8FA', margin: '0 0 8px' }}>{step.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(247,248,250,0.7)', margin: 0 }}>{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
