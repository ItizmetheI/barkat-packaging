// Single source for the site's top-level nav - Header.jsx and SiteFooter.jsx both render
// from this instead of keeping two separately-maintained copies, which is how they drifted
// out of sync before (Header said "Company", Footer still said "About" for the same route).
// 5 pages total: Process/Products/Industries deliberately live on one route (/process) -
// related "what we do and for whom" content, not three thin pages each with their own nav slot.
export const NAV_LINKS = [
  { label: 'Company', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
]
