import { Helmet } from 'react-helmet-async'
import ProcessGallery from '../components/ProcessGallery'
import ProductsCatalog from '../components/ProductsCatalog'
import IndustriesGrid from '../components/IndustriesGrid'

// Process, Products, and Industries are one page - related "what we do and for whom"
// content, not three separate thin pages.
export default function ProcessPage() {
  return (
    <>
      <Helmet>
        <title>Process &amp; Products - Barkat Packaging</title>
        <meta
          name="description"
          content="From board to box, the box styles we run, and the industries we spec for - bonding, printing, cutting, folding, RSC through FOL, food & beverage through pharma."
        />
      </Helmet>
      <ProcessGallery />
      <ProductsCatalog />
      <IndustriesGrid />
    </>
  )
}
