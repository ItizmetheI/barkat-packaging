// TODO(Ahmed): real facility address and hours - placeholders below, same convention as
// SiteFooter's placeholder contact details.
export default function FacilityInfo() {
  return (
    <section style={{ padding: '80px 6%', background: 'var(--bg)' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 40,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', margin: '0 0 12px' }}>Our facility</h2>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '0 0 4px' }}>123 Industrial Parkway, Suite 400</p>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '0 0 4px' }}>Mon–Sat, 9am–6pm</p>
        </div>
        <a
          href="https://maps.google.com/?q=123+Industrial+Parkway"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '12px 24px',
            border: '1px solid var(--border)',
            color: 'var(--ink)',
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          VIEW ON MAP
        </a>
      </div>
    </section>
  )
}
