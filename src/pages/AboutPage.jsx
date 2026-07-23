import { Helmet } from 'react-helmet-async'
import AboutSection from '../components/AboutSection'
import CertificationsSection from '../components/CertificationsSection'
import FacilityInfo from '../components/FacilityInfo'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Company - Barkat Packaging</title>
        <meta name="description" content="Barkat Packaging supplies corrugated boxes built to the buyer's spec - board weight, flute profile, burst strength. ISO 9001, FSC, and BRCGS certified." />
      </Helmet>
      <AboutSection />
      <CertificationsSection />
      <FacilityInfo />
    </>
  )
}
