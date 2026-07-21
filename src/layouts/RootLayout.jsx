import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import SiteFooter from '../components/SiteFooter'

// Persistent site chrome - rendered once by React Router, never remounted on client-side
// navigation between routes. cinematicRef passes through to whichever page needs it
// (only HomePage does) via Outlet context instead of prop-drilling through this layout.
export default function RootLayout({ cinematicRef }) {
  const { pathname } = useLocation()

  // BrowserRouter (declarative mode) has no built-in scroll restoration - without this,
  // navigating to a new page leaves the visitor scrolled to wherever they were on the last
  // one. Lenis wraps native scroll, so a native scrollTo is enough to sync both.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      <main>
        <Outlet context={cinematicRef} />
      </main>
      <SiteFooter />
    </>
  )
}
