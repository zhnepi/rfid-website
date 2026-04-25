/**
 * Generate JSON-LD for an RFID category landing page.
 * Returns an array containing BreadcrumbList + CollectionPage + ItemList,
 * ready to pass to Layout's `jsonLd` prop.
 */
import type { Product } from '../data/products';

const SITE_URL = 'https://www.rfidak.com';

export function buildCategoryJsonLd(opts: {
  categoryName: string;
  categorySlug: string;          // e.g. "rfid-cards"
  categoryProducts: Product[];
  description: string;
}) {
  const { categoryName, categorySlug, categoryProducts, description } = opts;
  const categoryUrl = `${SITE_URL}/category/${categorySlug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",          "item": SITE_URL + '/' },
      { "@type": "ListItem", "position": 2, "name": "RFID Products", "item": SITE_URL + '/rfid' },
      { "@type": "ListItem", "position": 3, "name": categoryName,    "item": categoryUrl }
    ]
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${categoryName} — RFIDAK Product Catalog`,
    "numberOfItems": categoryProducts.length,
    "itemListElement": categoryProducts.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `${SITE_URL}/product/${p.slug}`,
      "name": p.name
    }))
  };

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${categoryUrl}#webpage`,
    "name": categoryName,
    "description": description,
    "url": categoryUrl,
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    "about": {
      "@type": "Thing",
      "name": categoryName,
      "description": `${categoryName} manufactured by RFIDAK in Shenzhen, China`
    },
    "mainEntity": { "@id": `${categoryUrl}#item-list` },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["[data-speakable]", "h1", ".category-buying-guide"]
    },
    "breadcrumb": { "@id": `${categoryUrl}#breadcrumb` }
  };

  return [breadcrumb, collectionPage, itemList];
}
