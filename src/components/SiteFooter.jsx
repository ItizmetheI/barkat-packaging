export default function SiteFooter() {
  return (
    <footer
      style={{
        padding: '32px 6%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
        borderTop: '1px solid rgba(247,248,250,0.08)',
        fontSize: 13,
        color: 'rgba(247,248,250,0.5)',
      }}
    >
      <span>© {new Date().getFullYear()} Barkat Packaging</span>
      <span>Corrugated boxes, built to spec.</span>
    </footer>
  )
}
