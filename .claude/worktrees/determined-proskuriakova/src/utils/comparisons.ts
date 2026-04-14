import { comparisonPagesList, type ComparisonPageContent } from '../data/comparisons';
import type { Product } from '../data/products';

type ProductComparisonTarget = Pick<Product, 'slug' | 'category'>;
type ComparisonContext = string;

const comparisonFallbacksByContext: Record<ComparisonContext, string[]> = {
  'RFID Cards': ['mifare-classic-vs-desfire', 'mifare-plus-vs-desfire', 'pvc-rfid-cards-vs-paper-cards', 'rfid-cards-vs-keyfobs', 'lf-vs-hf-rfid'],
  'rfid-cards': ['mifare-classic-vs-desfire', 'mifare-plus-vs-desfire', 'pvc-rfid-cards-vs-paper-cards', 'rfid-cards-vs-keyfobs', 'lf-vs-hf-rfid'],
  'RFID Tags': ['rfid-labels-vs-hard-tags', 'hf-vs-uhf-rfid', 'textile-vs-silicone-laundry-tags'],
  'rfid-tags': ['rfid-labels-vs-hard-tags', 'hf-vs-uhf-rfid', 'textile-vs-silicone-laundry-tags'],
  'RFID Labels': ['rfid-labels-vs-hard-tags', 'hf-vs-uhf-rfid'],
  'rfid-labels': ['rfid-labels-vs-hard-tags', 'hf-vs-uhf-rfid'],
  'RFID Wristbands': [],
  'rfid-wristbands': [],
  'RFID Keyfob': ['rfid-cards-vs-keyfobs', 'lf-vs-hf-rfid'],
  'rfid-keyfob': ['rfid-cards-vs-keyfobs', 'lf-vs-hf-rfid'],
  'RFID Readers': ['lf-vs-hf-rfid', 'hf-vs-uhf-rfid', 'mifare-classic-vs-desfire', 'mifare-plus-vs-desfire'],
  'rfid-readers': ['lf-vs-hf-rfid', 'hf-vs-uhf-rfid', 'mifare-classic-vs-desfire', 'mifare-plus-vs-desfire'],
  wearables: ['rfid-cards-vs-keyfobs', 'lf-vs-hf-rfid'],
  laundry: ['textile-vs-silicone-laundry-tags', 'hf-vs-uhf-rfid'],
};

const comparisonFallbacksBySolution: Record<string, string[]> = {
  'access-control-rfid': ['rfid-cards-vs-keyfobs', 'lf-vs-hf-rfid', 'mifare-classic-vs-desfire'],
  'hotel-access-rfid': ['rfid-cards-vs-keyfobs', 'mifare-classic-vs-desfire', 'pvc-rfid-cards-vs-paper-cards'],
  'laundry-linen-rfid': ['textile-vs-silicone-laundry-tags', 'hf-vs-uhf-rfid'],
  'industrial-asset-tracking-rfid': ['rfid-labels-vs-hard-tags', 'hf-vs-uhf-rfid'],
  'library-media-rfid': ['hf-vs-uhf-rfid', 'rfid-labels-vs-hard-tags'],
  'event-nfc-rfid': ['lf-vs-hf-rfid', 'rfid-cards-vs-keyfobs'],
};

const comparisonFallbacksByMarket: Record<string, string[]> = {
  'north-america-rfid-cards': ['mifare-classic-vs-desfire', 'rfid-cards-vs-keyfobs', 'lf-vs-hf-rfid'],
  'europe-laundry-rfid-tags': ['textile-vs-silicone-laundry-tags', 'hf-vs-uhf-rfid'],
  'middle-east-anti-metal-rfid-tags': ['rfid-labels-vs-hard-tags', 'hf-vs-uhf-rfid'],
};

const comparisonPageMap = new Map(comparisonPagesList.map((page) => [page.slug, page]));

function getDirectProductMatchSlugs(productSlugs: string[]) {
  if (productSlugs.length === 0) {
    return [];
  }

  const productSlugSet = new Set(productSlugs);

  return comparisonPagesList
    .filter((page) => page.productSlugs.some((slug) => productSlugSet.has(slug)))
    .map((page) => page.slug);
}

function getContextualFallbackSlugs(productSlug: string) {
  const slug = productSlug.toLowerCase();
  const fallbackSlugs = new Set<string>();

  if (slug.includes('laundry') || slug.includes('linen') || slug.includes('textile') || slug.includes('silicone')) {
    fallbackSlugs.add('textile-vs-silicone-laundry-tags');
  }

  if (slug.includes('paper-card') || slug.includes('ticket')) {
    fallbackSlugs.add('pvc-rfid-cards-vs-paper-cards');
  }

  if (slug.includes('keyfob') || slug.includes('glass-tag')) {
    fallbackSlugs.add('lf-vs-hf-rfid');
    fallbackSlugs.add('rfid-cards-vs-keyfobs');
  }

  if (slug.includes('sticker') || slug.includes('label') || slug.includes('metal') || slug.includes('pallet')) {
    fallbackSlugs.add('rfid-labels-vs-hard-tags');
  }

  return [...fallbackSlugs];
}

function buildComparisonPages(slugs: string[], limit: number) {
  const seen = new Set<string>();
  const pages: ComparisonPageContent[] = [];

  for (const slug of slugs) {
    if (seen.has(slug)) {
      continue;
    }

    const page = comparisonPageMap.get(slug);

    if (!page) {
      continue;
    }

    seen.add(slug);
    pages.push(page);

    if (pages.length >= limit) {
      break;
    }
  }

  return pages;
}

export function getProductComparisonLinks(product: ProductComparisonTarget, limit = 3) {
  const directMatchSlugs = getDirectProductMatchSlugs([product.slug]);

  return buildComparisonPages(
    [
      ...directMatchSlugs,
      ...getContextualFallbackSlugs(product.slug),
      ...(comparisonFallbacksByContext[product.category] || []),
    ],
    limit
  );
}

export function getCategoryComparisonLinks(
  comparisonContext: ComparisonContext,
  categoryProducts: Array<Pick<ProductComparisonTarget, 'slug'>> = [],
  limit = 4
) {
  const directMatchSlugs = getDirectProductMatchSlugs(categoryProducts.map((product) => product.slug));

  return buildComparisonPages(
    [
      ...directMatchSlugs,
      ...(comparisonFallbacksByContext[comparisonContext] || []),
    ],
    limit
  );
}

export function getSolutionComparisonLinks(solutionSlug: string, productSlugs: string[], limit = 4) {
  const focusedProductSlugs = productSlugs.filter((slug) => slug !== 'rfid-reader-writer');
  const directSolutionSlugs = comparisonPagesList
    .filter((page) => page.relatedSolutionSlugs.includes(solutionSlug))
    .map((page) => page.slug);

  return buildComparisonPages(
    [
      ...directSolutionSlugs,
      ...getDirectProductMatchSlugs(focusedProductSlugs),
      ...(comparisonFallbacksBySolution[solutionSlug] || []),
    ],
    limit
  );
}

export function getMarketComparisonLinks(marketSlug: string, productSlugs: string[], limit = 4) {
  const focusedProductSlugs = productSlugs.filter((slug) => slug !== 'rfid-reader-writer');

  return buildComparisonPages(
    [
      ...getDirectProductMatchSlugs(focusedProductSlugs),
      ...(comparisonFallbacksByMarket[marketSlug] || []),
    ],
    limit
  );
}

export function getBlogComparisonLinks(postSlug: string, category: string, limit = 3) {
  const slug = postSlug.toLowerCase();
  const fallbackSlugs = new Set<string>();

  if (slug.includes('hotel-key-card')) {
    fallbackSlugs.add('mifare-classic-vs-desfire');
    fallbackSlugs.add('rfid-cards-vs-keyfobs');
    fallbackSlugs.add('lf-vs-hf-rfid');
  }

  if (slug.includes('laundry')) {
    fallbackSlugs.add('textile-vs-silicone-laundry-tags');
    fallbackSlugs.add('hf-vs-uhf-rfid');
  }

  if (slug.includes('anti-metal')) {
    fallbackSlugs.add('rfid-labels-vs-hard-tags');
    fallbackSlugs.add('hf-vs-uhf-rfid');
  }

  if (slug.includes('labels-vs-hard-tags')) {
    fallbackSlugs.add('rfid-labels-vs-hard-tags');
    fallbackSlugs.add('hf-vs-uhf-rfid');
  }

  if (slug.includes('reader')) {
    fallbackSlugs.add('lf-vs-hf-rfid');
    fallbackSlugs.add('hf-vs-uhf-rfid');
    fallbackSlugs.add('mifare-plus-vs-desfire');
  }

  if (slug.includes('keyfob')) {
    fallbackSlugs.add('rfid-cards-vs-keyfobs');
    fallbackSlugs.add('lf-vs-hf-rfid');
  }

  if (slug.includes('wristband')) {
    fallbackSlugs.add('rfid-cards-vs-keyfobs');
    fallbackSlugs.add('lf-vs-hf-rfid');
  }

  if (slug.includes('nfc') || slug.includes('mifare')) {
    fallbackSlugs.add('mifare-classic-vs-desfire');
    fallbackSlugs.add('mifare-plus-vs-desfire');
    fallbackSlugs.add('hf-vs-uhf-rfid');
  }

  if (slug.includes('supply') || slug.includes('barcode') || slug.includes('frequency')) {
    fallbackSlugs.add('hf-vs-uhf-rfid');
    fallbackSlugs.add('lf-vs-hf-rfid');
    fallbackSlugs.add('rfid-labels-vs-hard-tags');
  }

  if (slug.includes('order-rfid-cards')) {
    fallbackSlugs.add('mifare-classic-vs-desfire');
    fallbackSlugs.add('pvc-rfid-cards-vs-paper-cards');
    fallbackSlugs.add('rfid-cards-vs-keyfobs');
  }

  if (category === 'RFID APPLICATIONS') {
    fallbackSlugs.add('hf-vs-uhf-rfid');
    fallbackSlugs.add('rfid-labels-vs-hard-tags');
  }

  return buildComparisonPages([...fallbackSlugs], limit);
}
