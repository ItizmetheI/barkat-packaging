import { Helmet } from 'react-helmet-async'
import CaseStudies from '../components/CaseStudies'
import Testimonials from '../components/Testimonials'

export default function WorkPage() {
  return (
    <>
      <Helmet>
        <title>Work - Barkat Packaging</title>
        <meta name="description" content="Representative packaging spec work across e-commerce, retail, and industrial shipping." />
      </Helmet>
      <CaseStudies />
      <Testimonials />
    </>
  )
}
