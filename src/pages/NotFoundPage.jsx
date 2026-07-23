import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFoundPage() {
  return (
    <section
      style={{
        padding: 'calc(var(--header-h) + 112px) 6% 112px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'var(--bg)',
      }}
    >
      <Helmet>
        <title>Page not found - Barkat Packaging</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--ink)', margin: '0 0 12px' }}>Page not found</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '0 0 24px' }}>The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
        Back to home
      </Link>
    </section>
  )
}
