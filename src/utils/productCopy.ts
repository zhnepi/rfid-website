import type { Product } from '../data/products';
import { truncateText } from './content';

interface ProductCopyProfile {
  question: string;
  summary: string;
  intro: string;
}

function getProductText(product: Product) {
  return `${product.slug} ${product.name} ${product.category}`.toLowerCase();
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function getProductCopyProfile(product: Product): ProductCopyProfile {
  const text = getProductText(product);
  const inCategory = (category: Product['category']) => product.category === category;
  const matches = (...terms: string[]) => hasAny(text, terms);

  if (inCategory('RFID Readers') || matches('reader', 'writer', 'encoder', 'module')) {
    return {
      question: 'Need hardware that can read or encode the exact chip family you plan to deploy?',
      summary: 'Use this hardware for enrollment, encoding, and compatibility checks before rollout or system handoff.',
      intro:
        'Use this hardware when the project needs enrollment, encoding, or compatibility testing around a specific chip family and interface. Confirm protocol support, SDK expectations, and deployment style before the shortlist is locked.',
    };
  }

  if (matches('laundry', 'linen', 'pps-laundry')) {
    return {
      question: 'Will this tag survive washing, heat, pressure, and bulk linen handling?',
      summary: 'Built for linen, uniform, and garment workflows where wash durability matters as much as read performance.',
      intro:
        'Use this tag when wash cycles, heat, pressure, and attachment method matter more than a generic tag name. Confirm fabric match, mounting style, and read behavior before samples move forward.',
    };
  }

  if (matches('metal', 'pcb', 'ceramic', 'on-metal')) {
    return {
      question: 'Will it keep reading reliably when mounted on metal?',
      summary: 'Use anti-metal construction when assets, bins, or equipment sit on metal and standard tags lose range.',
      intro:
        'Use this tag when the asset sits on metal and a standard label or inlay would lose performance. Confirm surface type, mounting method, and required read distance before sample approval.',
    };
  }

  if (inCategory('RFID Wristbands') || matches('wristband', 'bracelet')) {
    return {
      question: 'Need a wearable credential guests can tap all day?',
      summary: 'A strong fit for venues that need waterproof access, guest ID, or cashless tap in a wearable format.',
      intro:
        'Use this wristband when guests need a credential they can wear, tap, and keep comfortable through the whole visit. Confirm chip match, band material, closure style, and branding before samples are approved.',
    };
  }

  if (inCategory('RFID Keyfob') || matches('keyfob', 'transponder')) {
    return {
      question: 'Need a smaller credential than a full-size RFID card?',
      summary: 'Useful for apartments, gyms, parking systems, and everyday access programs built around portable credentials.',
      intro:
        'Use this keyfob or transponder when the credential needs to stay on keys, in pockets, or with everyday access routines. Confirm reader compatibility, shell style, numbering, and branding before production planning starts.',
    };
  }

  if (matches('windshield', 'vehicle')) {
    return {
      question: 'Is this for vehicle access or windshield placement?',
      summary: 'Designed for parking control, gated access, and vehicle identification workflows that start from the glass position.',
      intro:
        'Use this tag when vehicles need to be identified through windshield placement or lane-based reading. Confirm placement zone, read range, tamper expectations, and climate exposure before samples are approved.',
    };
  }

  if (matches('tyre', 'tire')) {
    return {
      question: 'Will the tag need to survive tire production or lifecycle tracking?',
      summary: 'Made for tire manufacturing, traceability, and service workflows where heat, pressure, and durability come first.',
      intro:
        'Use this tag when the project follows tires through manufacturing, service, or lifecycle traceability. Confirm mounting method, curing or operating temperature, and reading setup before the first sample batch.',
    };
  }

  if (matches('nail')) {
    return {
      question: 'Tagging wood, pallets, concrete, or trees in rough conditions?',
      summary: 'A fit for wood, tree, pallet, and construction workflows where the tag needs to be driven into the material.',
      intro:
        'Use this nail-style tag when the item is wood, concrete, or another non-metal surface that suits drilled or hammered installation. Confirm substrate hardness, tag size, and reading setup before field sampling.',
    };
  }

  if (matches('cable')) {
    return {
      question: 'Need loop-on installation for cables, pipes, bins, or returnable assets?',
      summary: 'Useful when fast loop attachment and tamper-evident or reusable closure matter more than flush mounting.',
      intro:
        'Use this cable tie tag when operators need fast loop installation around assets, pipes, bins, or returnable transport items. Confirm one-time or reusable closure, environment, and read distance before samples are approved.',
    };
  }

  if (matches('waste-bin', 'bin-tag', 'waste bin')) {
    return {
      question: 'Need a rugged tag for waste bins, outdoor assets, or route-based collection?',
      summary: 'A strong fit for bin identification, municipal tracking, and outdoor workflows that need durable mounting and repeat reading.',
      intro:
        'Use this bin tag when outdoor waste handling, route verification, or municipal asset tracking requires a durable fixed tag. Confirm mounting hole, reader setup, and weather exposure before the rollout plan is locked.',
    };
  }

  if (matches('pallet')) {
    return {
      question: 'Need a pallet tag that can be fixed, read quickly, and reused across cycles?',
      summary: 'Designed for warehouse, RTI, and pallet workflows where fixed mounting and fast identification matter.',
      intro:
        'Use this pallet tag when the project tracks returnable pallets or load carriers through warehouses and distribution loops. Confirm mounting position, reader setup, and impact exposure before approving samples.',
    };
  }

  if (matches('library')) {
    return {
      question: 'Is this meant for books, media, or document circulation?',
      summary: 'A good fit for library circulation, shelving, and item-level media management where thin handling matters.',
      intro:
        'Use this tag or label when books, media, or document circulation needs item-level identification that fits shelving and checkout workflows. Confirm reading mode, conversion process, and visible print needs before rollout.',
    };
  }

  if (matches('coin', 'epoxy', 'fpc', 'mini-rfid-tag', 'bullet', 'glass')) {
    return {
      question: 'Need a compact RFID format for tight space or embedded placement?',
      summary: 'A fit for compact assets and embedded builds where space is limited but identification still matters.',
      intro:
        'Use this compact form factor when the RFID unit needs to fit inside a small product, tool, or molded part. Confirm available space, substrate, and required read distance before the sample plan is locked.',
    };
  }

  if (inCategory('RFID Labels') || matches('label', 'sticker')) {
    return {
      question: 'Need a thin RFID format for print, packaging, or item-level tracking?',
      summary: 'Best when thin construction, visible print, or roll handling matters as much as chip selection.',
      intro:
        'Use this label or sticker when print flow, packaging fit, or item-level handling matters as much as RF performance. Confirm reading mode, adhesive, label stock, and printer path before rollout.',
    };
  }

  // Sub-type branches for card family — each card subtype has a distinct buyer decision.
  // These branches run BEFORE the generic card fallback (below) so the buyer sees copy that
  // matches the actual material / format they are looking at, not a one-size-fits-all line.
  // (Product card differentiation fix 2026-04-23 per brand review.)

  if (matches('wood-card', 'wood card', 'bamboo card', 'walnut card')) {
    return {
      question: 'Need a premium, eco-friendly credential that feels different in the hand?',
      summary: 'A fit for boutique hotels, luxury brand programs, and sustainability-minded corporate gift cards that still need full RFID function.',
      intro:
        'Use this wood card when the project wants a tactile premium finish — bamboo, walnut, cherry or custom — without sacrificing chip compatibility. Confirm wood grain tolerance, protective lacquer finish, and RFID-embedded location before sample approval.',
    };
  }

  if (matches('paper-card', 'paper card', 'disposable card')) {
    return {
      question: 'Need a disposable credential where the per-unit cost matters more than lifetime?',
      summary: 'A fit for event passes, transit day-tickets, festival wristband alternatives, and time-limited visitor badges at $0.10–0.30 per unit.',
      intro:
        'Use this paper card when each credential has a short useful life (hours to weeks) and cost per unit drives the project. Confirm printed artwork path, HF/UHF chip option, and recycling disposal fit before rollout.',
    };
  }

  if (matches('clamshell')) {
    return {
      question: 'Need a rugged 1.8mm credential for outdoor or construction-site access?',
      summary: 'A fit for construction site badges, warehouse access, outdoor parking, and wet-environment credentials where thin PVC cards crack or delaminate.',
      intro:
        'Use this clamshell card when daily-carry durability, rain exposure, or keychain abrasion have broken thinner cards in the past. Confirm chip family, riveted chip placement, belt-clip accessory and color-tier visibility before piloting.',
    };
  }

  if (matches('epoxy-card', 'epoxy card', 'nfc coin', 'nfc-coin')) {
    return {
      question: 'Need a waterproof, domed NFC credential for pool, gym, or tech promo?',
      summary: 'A fit for waterpark season passes, fitness NFC chips, tap-to-launch product campaigns, and cases where a visible-chip look is the design goal.',
      intro:
        'Use this epoxy-dome card or NFC coin when the credential will see water, sweat, or heavy fingerprint contact. Confirm dome diameter, UV-stability of the epoxy, and printed artwork under the dome before approving samples.',
    };
  }

  if (matches('inlay', 'prelam')) {
    return {
      question: 'Are you laminating, converting, or embedding RFID into your own final product?',
      summary: 'A fit for card manufacturers, book converters, luxury-goods brands, and OEM integrators who bring their own lamination, printing, or packaging workflow.',
      intro:
        'Use this inlay or prelam when your team handles the lamination, die-cutting, or embedding step in-house. Confirm antenna geometry, chip family, pitch / roll format, and release-liner compatibility with your laminator before ordering sample rolls.',
    };
  }

  if (inCategory('RFID Cards') || matches('card')) {
    return {
      question: 'Need a credential that must match an installed reader or hotel lock?',
      summary: 'A fit for access control, hotel keys, transit cards, and cashless events where chip family and reader compatibility matter more than material.',
      intro:
        'Use this standard PVC card when the project starts from installed reader compatibility, hotel lock matching, or card production requirements. Confirm chip family (MIFARE Classic vs Plus vs DESFire), print finish, and encoding needs before samples are approved.',
    };
  }

  if (inCategory('RFID Tags')) {
    return {
      question: 'Will this tag fit the surface, mounting method, and read distance your workflow needs?',
      summary: 'Use this tag when surface, enclosure, and installation details matter as much as chip choice.',
      intro:
        'Use this tag when the workflow depends on matching the right surface, enclosure, and attachment method before sampling. Confirm environment, mounting style, and read expectations before moving into a quote or pilot batch.',
    };
  }

  return {
    question: `Is ${product.name.toLowerCase()} the right fit for this workflow?`,
    summary: 'Use the real environment, compatibility path, and buying stage to decide whether this format belongs on the shortlist.',
    intro:
      'Use the real environment, compatibility path, and approval workflow to decide whether this product should stay on the shortlist. Confirm the main constraint early so samples are easier to compare.',
  };
}

export function getProductBuyerQuestion(product: Product) {
  return getProductCopyProfile(product).question;
}

export function getProductBuyerSummary(product: Product, maxLength = 120) {
  return truncateText(getProductCopyProfile(product).summary, maxLength);
}

export function getProductBuyerIntro(product: Product, maxLength?: number) {
  const intro = getProductCopyProfile(product).intro;
  return typeof maxLength === 'number' ? truncateText(intro, maxLength) : intro;
}

/**
 * One-sentence direct answer for GEO (AI search engines).
 * Format: "[Product] is a/an [key trait] [category-singular] made by RFIDAK for [use case],
 *          with [key chip/spec] and [MOQ] minimum order."
 * Deterministic derivation from specifications + category so every product gets one without
 * additional copy work. Always declarative, <= 230 characters.
 */
export function getProductDirectAnswer(product: Product): string {
  const specs = product.specifications || {};

  // Derive a category-singular noun
  const categoryMap: Record<string, string> = {
    'RFID Cards': 'RFID smart card',
    'RFID Tags': 'RFID tag',
    'RFID Labels': 'RFID label',
    'RFID Wristbands': 'RFID wristband',
    'RFID Keyfob': 'RFID keyfob',
    'RFID Readers': 'RFID reader',
    'RFID Rings': 'NFC smart ring',
  };
  const categoryNoun = categoryMap[product.category] || 'RFID product';

  // Pick key differentiator: material, frequency, chip family, closure
  const material    = specs['Material'] || specs['Body Material'] || specs['Band Material'] || specs['Housing Material'] || '';
  const freq        = specs['Operating Frequency'] || specs['Frequency'] || '';
  const chipOpts    = specs['Chip Options'] || specs['Chip'] || '';
  const moq         = specs['MOQ'] || '';
  const closure     = specs['Closure'] || '';
  const dim         = specs['Dimensions'] || specs['Size'] || '';

  const firstPhrase = (s: string) => {
    // Strip parenthetical asides first so the comma split doesn't break inside them.
    const stripped = String(s).replace(/\s*\([^)]*\)/g, '').trim();
    const head = stripped.split(/[,;·]/)[0].trim();
    return head.replace(/[\s\(]+$/, '').trim();
  };

  // Build the 1-sentence answer: prefer short keys
  const parts: string[] = [];
  parts.push(`${product.name} is a ${categoryNoun} manufactured by RFIDAK`);

  const qualifier = [material, closure].filter(Boolean).slice(0, 2).map(firstPhrase).join(', ');
  if (qualifier) parts[0] = `${product.name} is a ${qualifier.toLowerCase()} ${categoryNoun} manufactured by RFIDAK`;

  if (freq) parts.push(`operating at ${firstPhrase(freq).toLowerCase()}`);
  if (chipOpts) parts.push(`with ${firstPhrase(chipOpts)} chip support`);
  if (dim) parts.push(`(${firstPhrase(dim)})`);
  if (moq) parts.push(`from ${firstPhrase(moq).toLowerCase()} MOQ`);

  // Join with ", " but drop trailing comma before "(...)".
  let text = parts.join(', ').replace(/, \(/g, ' (') + '.';
  // Safety clamp.
  if (text.length > 250) text = text.slice(0, 247).replace(/[,;]?\s+\S*$/, '') + '.';
  return text;
}

// W5 QW#11: generate ≥ 8 FAQs per product, with the first 3 being conversion-focused
// (MOQ / Free Sample / Lead Time). Subsequent FAQs pull from spec + category context.
export interface ProductFaq {
  question: string;
  answer: string;
}

function getCategoryMoq(category: string): string {
  const map: Record<string, string> = {
    'RFID Cards': '500 pieces',
    'RFID Tags': '1,000 pieces',
    'RFID Labels': '1,000 pieces',
    'RFID Wristbands': '500 pieces',
    'RFID Keyfob': '500 pieces',
    'RFID Readers': '1 piece (for evaluation); 10+ for bulk order',
    'RFID Rings': '200 pieces',
  };

  return map[category] || '500 pieces';
}

function getCategoryTooling(category: string): string {
  if (category === 'RFID Tags' || category === 'RFID Labels') {
    return 'Custom shape, material or antenna tooling typically requires 3,000–5,000 pieces to cover one-time mold / die-cut setup cost.';
  }

  if (category === 'RFID Wristbands') {
    return 'Custom silicone / PVC molds require 2,000–5,000 pieces to amortize tooling; paper / fabric wristbands keep the standard MOQ.';
  }

  if (category === 'RFID Cards') {
    return 'Custom die-cut shapes, oversized inlays or specialty substrates (wood, metal) move MOQ to 2,000–5,000 pieces due to tooling.';
  }

  return 'Custom shapes, molds or non-standard materials typically move MOQ to 2,000–5,000 pieces to cover tooling setup.';
}

export function getProductFaqs(product: Product): ProductFaq[] {
  const specs = product.specifications || {};
  const pickSpec = (...keys: string[]): string => {
    for (const k of keys) {
      const v = specs[k];

      if (typeof v === 'string' && v.trim()) return v.trim();
    }

    return '';
  };

  const moq = getCategoryMoq(product.category);
  const tooling = getCategoryTooling(product.category);
  const chip = pickSpec('Chip Options', 'Chip', 'Supported Chips', 'Chip Family');
  const freq = pickSpec('Operating Frequency', 'Frequency');
  const material = pickSpec('Material', 'Substrate Material', 'Body Material', 'Band Material', 'Housing Material');
  const dimensions = pickSpec('Dimensions', 'Size');
  const categoryName = product.category;
  const name = product.name;

  const faqs: ProductFaq[] = [];

  // --- 1. MOQ (conversion) ---
  faqs.push({
    question: `What is the minimum order quantity (MOQ) for ${name}?`,
    answer: `For ${name}, the standard MOQ starts at ${moq} on stock SKUs. ${tooling} Exact MOQ and unit pricing are quoted per project once chip, customization and packaging are confirmed.`,
  });

  // --- 2. Free samples (conversion) ---
  faqs.push({
    question: `Does RFIDAK provide free samples of ${name}?`,
    answer: `Yes. Stock ${categoryName.toLowerCase()} samples of ${name} are typically free; we only ask buyers to cover DHL/FedEx express shipping. Samples ship in 1–3 business days after your order is confirmed and arrive in 2–5 days to most countries. Custom samples (new chip, new size, printed artwork) usually take 3–7 additional days.`,
  });

  // --- 3. Lead time (conversion) ---
  faqs.push({
    question: `What is the production lead time for ${name}?`,
    answer: `Standard ${name} orders ship in 7–15 business days after PO confirmation and artwork approval. Large runs (>100k units) or orders with complex encoding / custom molds may take 15–25 business days. Rush production is available on request for time-sensitive launches; confirm MOQ and artwork early to protect the timeline.`,
  });

  // --- 4. Customization ---
  faqs.push({
    question: `Can ${name} be customized for my brand or project?`,
    answer: `Yes. ${name} supports end-to-end customization: full-color CMYK / silk-screen / UV printing, laser engraving, serial numbering, custom chip encoding (UID write, NDEF, sector locking), custom shape / size (subject to tooling MOQ), and packaging. Share your artwork, chip requirement and quantity and we will return a spec sheet + price within 24 hours.`,
  });

  // --- 5. Chip / compatibility ---
  faqs.push({
    question: chip
      ? `Which RFID chips are supported for ${name}?`
      : `Is ${name} compatible with my existing reader or system?`,
    answer: chip
      ? `${name} supports ${chip}. Before ordering, share your reader model or current credential so we can confirm the exact chip variant (e.g., MIFARE Classic 1K vs DESFire EV3, NTAG213 vs 215) and avoid compatibility issues after lamination.`
      : `Compatibility depends on the frequency band (LF 125 kHz / HF 13.56 MHz / UHF 860–960 MHz) and chip family used by your reader or installed system. Send a photo of your current card / reader model and we will recommend the matching chip + test a sample before bulk order.`,
  });

  // --- 6. Certifications / QC ---
  faqs.push({
    question: `What certifications and quality control does RFIDAK apply to ${name}?`,
    answer: `RFIDAK operates under ISO 9001:2015 (Quality Management) and ISO 14001 (Environmental Management), audited by SGS. ${name} is subject to incoming material inspection, in-process QC at every lamination / bonding / encoding step, and 100% electrical performance testing before shipment. Products meet CE, FCC, RoHS and REACH as applicable by market. Full test reports are available on request for buyer audits.`,
  });

  // --- 7. Printing / encoding (contextual) ---
  if (categoryName === 'RFID Readers') {
    faqs.push({
      question: `Does ${name} ship with an SDK or sample code?`,
      answer: `Yes. ${name} ships with SDK and sample code (Windows / Linux / Android where applicable), plus USB-HID keyboard-emulation mode for zero-integration deployments. Request the developer bundle at inquiry stage and we will include it with the evaluation unit.`,
    });
  } else {
    faqs.push({
      question: `Can ${name} be pre-encoded or printed with my artwork before shipment?`,
      answer: `Yes. ${name} can ship with UID range assignment, NDEF URL encoding (for NFC), sector-locked user data, serial numbering, and CMYK / silk-screen / UV printing of your artwork. Provide an AI/PDF artwork file at 300 dpi with 3 mm bleed and a chip-encoding spec; we return a digital proof for approval before production.`,
    });
  }

  // --- 8. Shipping / Incoterms ---
  faqs.push({
    question: `How does RFIDAK ship ${name} internationally?`,
    answer: `RFIDAK ships ${name} via DHL / FedEx / UPS (door-to-door, 3–5 days to most countries), air cargo (5–7 days for heavier orders), or sea freight (20–35 days for bulk over 500 kg). Standard Incoterms are EXW, FOB Shenzhen and DDP; choose based on customs clearance preferences. Commercial invoice, packing list and CoC / MSDS are included automatically.`,
  });

  // --- 9. Repeat orders ---
  faqs.push({
    question: `How does RFIDAK handle repeat orders of ${name}?`,
    answer: `For repeat buyers, RFIDAK locks tooling, artwork and chip encoding on file so subsequent POs ship faster — typically 5–10 business days for stock chip types at previously-run quantities. Price is adjusted transparently per chip market rate and FX movement; we flag any chip shortage (e.g., DESFire EV3) before quotation so the project plan stays realistic.`,
  });

  // --- 10. Frequency / dimensions detail (bonus, category-dependent) ---
  if (freq || dimensions) {
    const parts: string[] = [];

    if (freq) parts.push(`frequency ${freq}`);
    if (dimensions) parts.push(`dimensions ${dimensions}`);
    faqs.push({
      question: `What are the technical specifications of ${name}?`,
      answer: `Key ${name} specs: ${parts.join('; ')}${material ? `; substrate ${material}` : ''}. A full technical datasheet including read range, chip memory map, IP / temperature rating and compliance certificates is available on request; attach your reader model and target environment so we can confirm suitability before quoting.`,
    });
  }

  return faqs;
}
