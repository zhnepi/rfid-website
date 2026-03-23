export type ComparisonInquiryIntent =
  | 'chip-comparison'
  | 'frequency-comparison'
  | 'product-format-comparison'
  | 'laundry-tag-comparison';

export type StandardInquiryIntent = 'samples' | 'oem' | 'compatibility' | 'repeat-order';
export type ContactIntent = StandardInquiryIntent | ComparisonInquiryIntent;
export type ContactContextSource = 'generic' | 'comparison' | 'solution' | 'market' | 'product' | 'category' | 'blog' | 'evidence';

export interface ProductContactContext {
  slug: string;
  category: string;
}

export interface CategoryContactContext {
  key: string;
  slug?: string;
  categoryName: string;
}

export interface BlogContactContext {
  slug: string;
  category: string;
  title?: string;
}

export interface EvidenceContactContext {
  slug: string;
}

export interface ComparisonInquiryPath {
  intent: ComparisonInquiryIntent;
  title: string;
  description: string;
  cta: string;
  comparisonSlugs: string[];
}

export const comparisonInquiryPaths: ComparisonInquiryPath[] = [
  {
    intent: 'chip-comparison',
    title: 'Chip comparison',
    description: 'Best for buyers comparing card chip families and deciding whether to stay close to a legacy platform or move to a stronger security path.',
    cta: 'Start chip comparison inquiry',
    comparisonSlugs: ['mifare-classic-vs-desfire', 'mifare-plus-vs-desfire'],
  },
  {
    intent: 'frequency-comparison',
    title: 'Frequency comparison',
    description: 'Useful when the project is still deciding between LF, HF/NFC or UHF and needs the decision translated into a sample plan.',
    cta: 'Start frequency inquiry',
    comparisonSlugs: ['lf-vs-hf-rfid', 'hf-vs-uhf-rfid'],
  },
  {
    intent: 'product-format-comparison',
    title: 'Tag or credential format comparison',
    description: 'Built for teams choosing between cards and keyfobs, labels and hard tags, or PVC and paper card formats before they request samples.',
    cta: 'Compare formats with us',
    comparisonSlugs: ['rfid-cards-vs-keyfobs', 'rfid-labels-vs-hard-tags', 'pvc-rfid-cards-vs-paper-cards'],
  },
  {
    intent: 'laundry-tag-comparison',
    title: 'Laundry tag comparison',
    description: 'Helpful for linen, garment and reusable textile programs deciding between textile and silicone laundry tags.',
    cta: 'Discuss laundry tag fit',
    comparisonSlugs: ['textile-vs-silicone-laundry-tags'],
  },
];

const comparisonIntentBySlug = comparisonInquiryPaths.reduce<Record<string, ComparisonInquiryIntent>>((accumulator, path) => {
  path.comparisonSlugs.forEach((slug) => {
    accumulator[slug] = path.intent;
  });

  return accumulator;
}, {});

export function getComparisonInquiryIntent(comparisonSlug: string): ComparisonInquiryIntent {
  return comparisonIntentBySlug[comparisonSlug] || 'product-format-comparison';
}

export function getComparisonContactHref(comparisonSlug: string) {
  const intent = getComparisonInquiryIntent(comparisonSlug);

  return `/contact?intent=${intent}&comparison=${encodeURIComponent(comparisonSlug)}#contactForm`;
}

const solutionIntentBySlug: Record<string, StandardInquiryIntent> = {
  'access-control-rfid': 'compatibility',
  'hotel-access-rfid': 'compatibility',
  'laundry-linen-rfid': 'samples',
  'industrial-asset-tracking-rfid': 'samples',
  'library-media-rfid': 'compatibility',
  'event-nfc-rfid': 'oem',
};

const marketIntentBySlug: Record<string, StandardInquiryIntent> = {
  'north-america-rfid-cards': 'compatibility',
  'europe-laundry-rfid-tags': 'samples',
  'middle-east-anti-metal-rfid-tags': 'samples',
};

const evidenceIntentBySlug: Record<string, StandardInquiryIntent> = {
  certifications: 'compatibility',
  'quality-control': 'samples',
  'sample-policy': 'samples',
  'shipping-and-incoterms': 'repeat-order',
};

const categoryKeyByName: Record<string, string> = {
  'RFID Cards': 'rfid-cards',
  'RFID Tags': 'rfid-tags',
  'RFID Labels': 'rfid-labels',
  'RFID Wristbands': 'rfid-wristbands',
  'RFID Keyfob': 'rfid-keyfob',
  'RFID Readers': 'rfid-readers',
};

const categoryIntentByKey: Record<string, StandardInquiryIntent> = {
  'rfid-cards': 'compatibility',
  'rfid-tags': 'samples',
  'rfid-labels': 'samples',
  'rfid-wristbands': 'oem',
  'rfid-keyfob': 'compatibility',
  'rfid-readers': 'compatibility',
};

const productIntentByCategory: Record<string, StandardInquiryIntent> = {
  'RFID Cards': 'compatibility',
  'RFID Labels': 'samples',
  'RFID Wristbands': 'oem',
  'RFID Keyfob': 'compatibility',
  'RFID Readers': 'compatibility',
  'RFID Tags': 'samples',
};

const blogIntentByCategory: Record<string, StandardInquiryIntent> = {
  'RFID TECHNOLOGY': 'compatibility',
  'RFID APPLICATIONS': 'samples',
};

const whatsappPhone = '8618665820632';
const emailAddress = 'info@proudtek.com';
const slugWordOverrides: Record<string, string> = {
  rfid: 'RFID',
  nfc: 'NFC',
  lf: 'LF',
  hf: 'HF',
  uhf: 'UHF',
  oem: 'OEM',
  sku: 'SKU',
  mifare: 'MIFARE',
  desfire: 'DESFire',
  pvc: 'PVC',
  qc: 'QC',
  api: 'API',
  uid: 'UID',
};

function getProductSlugIntent(slug: string): StandardInquiryIntent | null {
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug.includes('reader') || normalizedSlug.includes('writer')) {
    return 'compatibility';
  }

  if (normalizedSlug.includes('card') || normalizedSlug.includes('keyfob') || normalizedSlug.includes('glass-tag')) {
    return 'compatibility';
  }

  if (
    normalizedSlug.includes('wristband')
    || normalizedSlug.includes('bracelet')
    || normalizedSlug.includes('hotel')
    || normalizedSlug.includes('epoxy')
  ) {
    return 'oem';
  }

  if (
    normalizedSlug.includes('laundry')
    || normalizedSlug.includes('metal')
    || normalizedSlug.includes('pcb')
    || normalizedSlug.includes('ceramic')
    || normalizedSlug.includes('pallet')
    || normalizedSlug.includes('nail')
    || normalizedSlug.includes('tire')
    || normalizedSlug.includes('tyre')
    || normalizedSlug.includes('waste-bin')
    || normalizedSlug.includes('cable-tie')
    || normalizedSlug.includes('label')
    || normalizedSlug.includes('inlay')
  ) {
    return 'samples';
  }

  return null;
}

function getBlogSlugIntent(slug: string): StandardInquiryIntent | null {
  const normalizedSlug = slug.toLowerCase();

  if (
    normalizedSlug.includes('reader')
    || normalizedSlug.includes('writer')
    || normalizedSlug.includes('frequency')
    || normalizedSlug.includes('mifare')
    || normalizedSlug.includes('nfc-technology')
    || normalizedSlug.includes('keyfob')
    || normalizedSlug.includes('hotel-key-card')
  ) {
    return 'compatibility';
  }

  if (
    normalizedSlug.includes('wristband')
    || normalizedSlug.includes('events')
    || normalizedSlug.includes('order')
    || normalizedSlug.includes('china')
    || normalizedSlug.includes('nfc-tags-business')
  ) {
    return 'oem';
  }

  if (
    normalizedSlug.includes('laundry')
    || normalizedSlug.includes('anti-metal')
    || normalizedSlug.includes('supply-chain')
    || normalizedSlug.includes('barcode')
    || normalizedSlug.includes('rfid-types')
  ) {
    return 'samples';
  }

  return null;
}

function resolveCategoryKey(category: CategoryContactContext | string) {
  if (typeof category === 'string') {
    return categoryKeyByName[category] || category;
  }

  return category.key || category.slug || categoryKeyByName[category.categoryName] || '';
}

function humanizeSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => slugWordOverrides[part.toLowerCase()] || `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function getGenericWhatsAppMessage(intent: ContactIntent) {
  if (intent === 'compatibility') {
    return 'Hi ProudTek, I need help checking RFID compatibility and narrowing the right product path for my project.';
  }

  if (intent === 'oem') {
    return 'Hi ProudTek, I need help with RFID customization, branding or OEM planning for my project.';
  }

  if (intent === 'repeat-order') {
    return 'Hi ProudTek, I need help preparing an RFID repeat order and confirming the next supply step.';
  }

  if (intent === 'chip-comparison') {
    return 'Hi ProudTek, I need help comparing RFID chip options before moving into samples or a quote.';
  }

  if (intent === 'frequency-comparison') {
    return 'Hi ProudTek, I need help comparing RFID frequency options before I lock the shortlist.';
  }

  if (intent === 'product-format-comparison') {
    return 'Hi ProudTek, I need help comparing RFID product formats before I request samples.';
  }

  if (intent === 'laundry-tag-comparison') {
    return 'Hi ProudTek, I need help comparing laundry RFID tag formats before pilot testing.';
  }

  return 'Hi ProudTek, I want help narrowing the right RFID samples and next steps for my project.';
}

export const intentEmailPrefills: Record<ContactIntent, { subject: string; message: string }> = {
  samples: {
    subject: 'RFID sample request',
    message: `Hi ProudTek,

I would like to request RFID samples.

Product type:
Chip / protocol:
Application:
Quantity goal:
Target timeline:
`,
  },
  oem: {
    subject: 'RFID OEM / customization inquiry',
    message: `Hi ProudTek,

I need support with a custom RFID project.

Product type:
Chip / protocol:
Customization details:
Artwork / numbering / encoding:
Quantity goal:
`,
  },
  compatibility: {
    subject: 'RFID compatibility check',
    message: `Hi ProudTek,

I need help checking compatibility.

Current reader / lock / system:
Current credential or chip:
Target product type:
Application:
`,
  },
  'repeat-order': {
    subject: 'RFID repeat order inquiry',
    message: `Hi ProudTek,

I would like to discuss a repeat RFID order.

Previous product / SKU:
Quantity:
Any changes from last order:
Target delivery timing:
`,
  },
  'chip-comparison': {
    subject: 'RFID chip comparison inquiry',
    message: `Hi ProudTek,

I need help narrowing an RFID chip comparison before samples or quoting.

Current system / reader:
Target card or credential:
Application:
Quantity / timeline:
`,
  },
  'frequency-comparison': {
    subject: 'RFID frequency comparison inquiry',
    message: `Hi ProudTek,

I need help comparing RFID frequency options before moving into samples.

Current reader / device:
Target use case:
Preferred form factor:
Quantity / timeline:
`,
  },
  'product-format-comparison': {
    subject: 'RFID format comparison inquiry',
    message: `Hi ProudTek,

I need help comparing two RFID product formats before requesting samples or a quote.

Current shortlist:
Application:
Surface or operating environment:
Quantity / timeline:
`,
  },
  'laundry-tag-comparison': {
    subject: 'Laundry RFID tag comparison inquiry',
    message: `Hi ProudTek,

I need help comparing laundry RFID tag formats before pilot testing.

Textile or garment type:
Wash conditions:
Attachment preference:
Quantity / timeline:
`,
  },
};

function getGenericEmailPrefill(intent: ContactIntent) {
  return intentEmailPrefills[intent] || intentEmailPrefills.samples;
}

function buildContextualEmailPrefill(
  intent: ContactIntent,
  source: ContactContextSource,
  contextName?: string,
  contextPage?: string
) {
  const genericPrefill = getGenericEmailPrefill(intent);

  if (!contextName) {
    return genericPrefill;
  }

  const contextLabel = source === 'comparison'
    ? 'Comparison topic'
    : source === 'solution'
      ? 'Solution path'
      : source === 'market'
        ? 'Market path'
        : source === 'product'
          ? 'Product page'
          : source === 'category'
            ? 'Category page'
            : source === 'evidence'
              ? 'Evidence page'
              : source === 'blog'
                ? 'Guide page'
                : 'Page';

  return {
    subject: `${genericPrefill.subject}: ${contextName}`,
    message: `${genericPrefill.message.trimEnd()}\n${contextLabel}: ${contextName}${contextPage ? `\nReference page: ${contextPage}` : ''}\n`,
  };
}

function buildContextualWhatsAppMessage(
  intent: ContactIntent,
  source: ContactContextSource,
  contextName?: string
) {
  if (!contextName) {
    return getGenericWhatsAppMessage(intent);
  }

  if (source === 'comparison') {
    return `Hi ProudTek, I'm comparing ${contextName} and need help turning this tradeoff into the right sample, compatibility or quote path.`;
  }

  if (source === 'product') {
    return `Hi ProudTek, I'm reviewing your ${contextName} product page and need help choosing the right sample, compatibility or quote path for my project.`;
  }

  if (source === 'category') {
    return `Hi ProudTek, I'm reviewing your ${contextName} category page and need help narrowing the right options for my project.`;
  }

  if (source === 'solution') {
    return `Hi ProudTek, I'm reviewing your ${contextName} solution page and need help translating this workflow into the right RFID shortlist and next step.`;
  }

  if (source === 'market') {
    return `Hi ProudTek, I'm reviewing your ${contextName} market page and need help with the right sample or sourcing path for this region.`;
  }

  if (source === 'blog') {
    return `Hi ProudTek, I'm reading your ${contextName} guide and need help applying it to my RFID project.`;
  }

  if (source === 'evidence') {
    return `Hi ProudTek, I'm reviewing your ${contextName} page and want to confirm supplier proof and the right next buying step.`;
  }

  if (source === 'generic') {
    return `Hi ProudTek, I'm browsing your ${contextName} and need help with the right next RFID step for my project.`;
  }

  return `Hi ProudTek, I'm reviewing your ${contextName} page and need help with the right next RFID step for my project.`;
}

function getGenericPathContext(pathname: string) {
  if (pathname === '/') return { name: 'ProudTek RFID homepage', source: 'generic' as const };
  if (pathname === '/compare') return { name: 'RFID comparison hub', source: 'generic' as const };
  if (pathname === '/markets') return { name: 'RFID markets hub', source: 'generic' as const };
  if (pathname === '/solutions') return { name: 'RFID solutions hub', source: 'generic' as const };
  if (pathname === '/blogs') return { name: 'RFID buyer guides hub', source: 'generic' as const };
  if (pathname === '/rfid-technology') return { name: 'RFID technology guide', source: 'generic' as const };
  if (pathname === '/products') return { name: 'RFID product families page', source: 'generic' as const };
  if (pathname === '/rfid') return { name: 'RFID full catalog', source: 'generic' as const };
  if (pathname === '/contact') return { name: 'contact page', source: 'generic' as const };

  return null;
}

function getContextNameFromPath(pathname: string, source: ContactContextSource) {
  const normalizedPath = normalizePathname(pathname);
  const genericContext = getGenericPathContext(normalizedPath);

  if (genericContext) {
    return genericContext.name;
  }

  const segments = normalizedPath.split('/').filter(Boolean);
  const slug = segments[1] || segments[0];

  if (!slug) {
    return '';
  }

  if (source === 'comparison') {
    return humanizeSlug(slug);
  }

  if (source === 'product') {
    return humanizeSlug(slug);
  }

  if (source === 'category') {
    return humanizeSlug(slug);
  }

  if (source === 'solution') {
    return humanizeSlug(slug);
  }

  if (source === 'market') {
    return humanizeSlug(slug);
  }

  if (source === 'blog') {
    return humanizeSlug(slug);
  }

  if (source === 'evidence') {
    return humanizeSlug(slug);
  }

  return humanizeSlug(slug);
}

function getWhatsAppLabel(source: ContactContextSource) {
  if (source === 'product') return 'WhatsApp this product';
  if (source === 'category') return 'WhatsApp this category';
  if (source === 'solution') return 'WhatsApp this solution';
  if (source === 'market') return 'WhatsApp this market';
  if (source === 'comparison') return 'WhatsApp this comparison';
  if (source === 'blog') return 'WhatsApp this guide';
  if (source === 'evidence') return 'WhatsApp about proof';

  return 'WhatsApp for a quick check';
}

export function getSolutionInquiryIntent(solutionSlug: string): StandardInquiryIntent {
  return solutionIntentBySlug[solutionSlug] || 'samples';
}

export function getMarketInquiryIntent(marketSlug: string): StandardInquiryIntent {
  return marketIntentBySlug[marketSlug] || 'samples';
}

export function getEvidenceInquiryIntent(evidenceSlug: string): StandardInquiryIntent {
  return evidenceIntentBySlug[evidenceSlug] || 'samples';
}

export function getProductInquiryIntent(product: ProductContactContext): StandardInquiryIntent {
  return getProductSlugIntent(product.slug) || productIntentByCategory[product.category] || 'samples';
}

export function getBlogInquiryIntent(blog: BlogContactContext): StandardInquiryIntent {
  return getBlogSlugIntent(blog.slug) || blogIntentByCategory[blog.category] || 'samples';
}

export function getCategoryInquiryIntent(category: CategoryContactContext | string): StandardInquiryIntent {
  const categoryKey = resolveCategoryKey(category);

  return categoryIntentByKey[categoryKey] || 'samples';
}

export function getIntentContactHref(intent: ContactIntent) {
  return `/contact?intent=${intent}#contactForm`;
}

export function getWhatsAppHref(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export function getEmailHref(subject: string, message: string) {
  return `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

export function getIntentWhatsAppMessage(intent: ContactIntent) {
  return getGenericWhatsAppMessage(intent);
}

export function getIntentWhatsAppHref(intent: ContactIntent) {
  return getWhatsAppHref(getIntentWhatsAppMessage(intent));
}

export function getIntentEmailPrefill(intent: ContactIntent) {
  return getGenericEmailPrefill(intent);
}

export function getIntentEmailHref(intent: ContactIntent) {
  const prefill = getIntentEmailPrefill(intent);

  return getEmailHref(prefill.subject, prefill.message);
}

export function getContextualInquiryLabel(
  intent: StandardInquiryIntent,
  context: 'product' | 'solution' | 'market' | 'category' | 'blog' | 'evidence' = 'product'
) {
  if (context === 'blog') {
    if (intent === 'compatibility') return 'Ask about this guide';
    if (intent === 'oem') return 'Discuss this project';
    if (intent === 'repeat-order') return 'Plan next order';

    return 'Use this in a sample plan';
  }

  if (context === 'evidence') {
    if (intent === 'compatibility') return 'Share approval requirements';
    if (intent === 'oem') return 'Discuss project scope';
    if (intent === 'repeat-order') return 'Align delivery terms';

    return 'Discuss sample planning';
  }

  if (context === 'solution') {
    if (intent === 'compatibility') return 'Discuss this workflow';
    if (intent === 'oem') return 'Discuss solution build';
    if (intent === 'repeat-order') return 'Plan repeat supply';

    return 'Plan solution samples';
  }

  if (context === 'market') {
    if (intent === 'compatibility') return 'Ask about regional fit';
    if (intent === 'oem') return 'Discuss branded rollout';
    if (intent === 'repeat-order') return 'Discuss repeat supply';

    return 'Request regional samples';
  }

  if (context === 'category') {
    if (intent === 'compatibility') return 'Ask about compatibility';
    if (intent === 'oem') return 'Discuss customization';
    if (intent === 'repeat-order') return 'Plan repeat order';

    return 'Ask about samples';
  }

  if (intent === 'compatibility') return 'Ask about compatibility';
  if (intent === 'oem') return 'Discuss customization';
  if (intent === 'repeat-order') return 'Plan repeat order';

  return 'Ask about samples';
}

export function getSolutionContactHref(solutionSlug: string) {
  const intent = getSolutionInquiryIntent(solutionSlug);

  return `/contact?intent=${intent}&solution=${encodeURIComponent(solutionSlug)}#contactForm`;
}

export function getMarketContactHref(marketSlug: string) {
  const intent = getMarketInquiryIntent(marketSlug);

  return `/contact?intent=${intent}&market=${encodeURIComponent(marketSlug)}#contactForm`;
}

export function getEvidenceContactHref(evidenceSlug: string) {
  const intent = getEvidenceInquiryIntent(evidenceSlug);

  return `/contact?intent=${intent}&evidence=${encodeURIComponent(evidenceSlug)}#contactForm`;
}

export function getProductContactHref(product: ProductContactContext) {
  const intent = getProductInquiryIntent(product);

  return `/contact?intent=${intent}&product=${encodeURIComponent(product.slug)}#contactForm`;
}

export function getBlogContactHref(blog: BlogContactContext) {
  const intent = getBlogInquiryIntent(blog);

  return `/contact?intent=${intent}&blog=${encodeURIComponent(blog.slug)}#contactForm`;
}

export function getCategoryContactHref(category: CategoryContactContext | string) {
  const categoryKey = resolveCategoryKey(category);
  const intent = getCategoryInquiryIntent(category);

  return `/contact?intent=${intent}&category=${encodeURIComponent(categoryKey)}#contactForm`;
}

export interface ContextualContactAction {
  href: string;
  intent: ContactIntent;
  label: string;
  source: ContactContextSource;
}

function normalizePathname(pathname: string) {
  const sanitizedPathname = (pathname || '').split(/[?#]/)[0] || '/';

  if (!sanitizedPathname || sanitizedPathname === '/') {
    return '/';
  }

  return sanitizedPathname.replace(/\/+$/, '') || '/';
}

function getComparisonInquiryLabel(intent: ComparisonInquiryIntent) {
  if (intent === 'chip-comparison') return 'Discuss this comparison';
  if (intent === 'frequency-comparison') return 'Discuss frequency fit';
  if (intent === 'laundry-tag-comparison') return 'Discuss laundry tag fit';

  return 'Discuss format options';
}

export interface ContextualWhatsAppAction {
  href: string;
  intent: ContactIntent;
  label: string;
  message: string;
  source: ContactContextSource;
}

export interface ContextualEmailAction {
  href: string;
  intent: ContactIntent;
  label: string;
  subject: string;
  message: string;
  source: ContactContextSource;
}

export function getContextualContactAction(pathname: string): ContextualContactAction {
  const normalizedPath = normalizePathname(pathname);
  const segments = normalizedPath.split('/').filter(Boolean);
  const [section, slug] = segments;

  if (section === 'product' && slug) {
    const product = { slug, category: '' };
    const intent = getProductInquiryIntent(product);

    return {
      href: getProductContactHref(product),
      intent,
      label: getContextualInquiryLabel(intent, 'product'),
      source: 'product',
    };
  }

  if (section === 'category' && slug) {
    const intent = getCategoryInquiryIntent(slug);

    return {
      href: getCategoryContactHref(slug),
      intent,
      label: getContextualInquiryLabel(intent, 'category'),
      source: 'category',
    };
  }

  if (section === 'solutions' && slug) {
    const intent = getSolutionInquiryIntent(slug);

    return {
      href: getSolutionContactHref(slug),
      intent,
      label: getContextualInquiryLabel(intent, 'solution'),
      source: 'solution',
    };
  }

  if (section === 'markets' && slug) {
    const intent = getMarketInquiryIntent(slug);

    return {
      href: getMarketContactHref(slug),
      intent,
      label: getContextualInquiryLabel(intent, 'market'),
      source: 'market',
    };
  }

  if (section === 'compare' && slug) {
    const intent = getComparisonInquiryIntent(slug);

    return {
      href: getComparisonContactHref(slug),
      intent,
      label: getComparisonInquiryLabel(intent),
      source: 'comparison',
    };
  }

  if (section === 'blogs' && slug) {
    const intent = getBlogInquiryIntent({ slug, category: '' });

    return {
      href: getBlogContactHref({ slug, category: '' }),
      intent,
      label: getContextualInquiryLabel(intent, 'blog'),
      source: 'blog',
    };
  }

  if (segments.length === 1 && section && evidenceIntentBySlug[section]) {
    const intent = getEvidenceInquiryIntent(section);

    return {
      href: getEvidenceContactHref(section),
      intent,
      label: getContextualInquiryLabel(intent, 'evidence'),
      source: 'evidence',
    };
  }

  if (normalizedPath === '/compare') {
    return {
      href: getIntentContactHref('product-format-comparison'),
      intent: 'product-format-comparison',
      label: 'Discuss comparisons',
      source: 'generic',
    };
  }

  if (normalizedPath === '/markets') {
    return {
      href: getIntentContactHref('samples'),
      intent: 'samples',
      label: 'Request regional samples',
      source: 'generic',
    };
  }

  if (normalizedPath === '/solutions') {
    return {
      href: getIntentContactHref('samples'),
      intent: 'samples',
      label: 'Plan solution samples',
      source: 'generic',
    };
  }

  if (normalizedPath === '/blogs' || normalizedPath === '/rfid-technology') {
    return {
      href: getIntentContactHref('compatibility'),
      intent: 'compatibility',
      label: 'Ask about this guide',
      source: 'generic',
    };
  }

  if (normalizedPath === '/products' || normalizedPath === '/rfid') {
    return {
      href: getIntentContactHref('samples'),
      intent: 'samples',
      label: 'Ask about samples',
      source: 'generic',
    };
  }

  return {
    href: getIntentContactHref('samples'),
    intent: 'samples',
    label: 'Request samples',
    source: 'generic',
  };
}

export function getContextualWhatsAppAction(pathname: string): ContextualWhatsAppAction {
  const contactAction = getContextualContactAction(pathname);
  const contextName = getContextNameFromPath(pathname, contactAction.source);
  const message = buildContextualWhatsAppMessage(contactAction.intent, contactAction.source, contextName);

  return {
    href: getWhatsAppHref(message),
    intent: contactAction.intent,
    label: getWhatsAppLabel(contactAction.source),
    message,
    source: contactAction.source,
  };
}

function getContextPageFromPath(pathname: string, source: ContactContextSource) {
  const normalizedPath = normalizePathname(pathname);

  if (source === 'generic' && normalizedPath === '/') {
    return 'https://www.proudtek.com/';
  }

  if (source === 'generic') {
    return `https://www.proudtek.com${normalizedPath}`;
  }

  return `https://www.proudtek.com${normalizedPath}`;
}

function getEmailLabel(source: ContactContextSource) {
  if (source === 'product') return 'Email this product';
  if (source === 'category') return 'Email this category';
  if (source === 'solution') return 'Email this solution';
  if (source === 'market') return 'Email this market';
  if (source === 'comparison') return 'Email this comparison';
  if (source === 'blog') return 'Email this guide';
  if (source === 'evidence') return 'Email about proof';

  return 'Email support';
}

export function getContextualEmailAction(pathname: string): ContextualEmailAction {
  const contactAction = getContextualContactAction(pathname);
  const contextName = getContextNameFromPath(pathname, contactAction.source);
  const contextPage = getContextPageFromPath(pathname, contactAction.source);
  const prefill = buildContextualEmailPrefill(contactAction.intent, contactAction.source, contextName, contextPage);

  return {
    href: getEmailHref(prefill.subject, prefill.message),
    intent: contactAction.intent,
    label: getEmailLabel(contactAction.source),
    subject: prefill.subject,
    message: prefill.message,
    source: contactAction.source,
  };
}

export function getProductWhatsAppHref(product: ProductContactContext & { name?: string }) {
  const contextName = product.name || humanizeSlug(product.slug);
  const intent = getProductInquiryIntent(product);

  return getWhatsAppHref(buildContextualWhatsAppMessage(intent, 'product', contextName));
}
