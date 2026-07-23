import { Helmet } from 'react-helmet-async'
import FaqSection from '../components/FaqSection'
import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact - Barkat Packaging</title>
        <meta name="description" content="Request a quote from Barkat Packaging - tell us your board type, dimensions, and order volume." />
      </Helmet>
      <FaqSection />
      <ContactForm />
    </>
  )
}
