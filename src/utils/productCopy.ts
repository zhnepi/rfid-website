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

  if (matches('wood')) {
    return {
      question: 'Looking for a premium tactile finish with full RFID capability?',
      summary: 'A fit for brands, hotels, and events that want an eco-friendly or premium card feel — available in bamboo, walnut, and custom wood types.',
      intro:
        'Use this card when the project calls for a distinctive look and tactile finish that sets the credential apart. Confirm wood type, print compatibility, and chip selection before samples are approved.',
    };
  }

  if (matches('paper')) {
    return {
      question: 'Need a low-cost or recyclable RFID card for high-volume use?',
      summary: 'A fit for events, transit tickets, and short-lifecycle projects where cost per unit and recyclability matter most.',
      intro:
        'Use this card when per-unit cost, disposal, or recyclability drives the format decision more than durability. Confirm paper stock weight, print method, and chip choice before sampling.',
    };
  }

  if (matches('clamshell')) {
    return {
      question: 'Need a thicker, more durable card for rough-use environments?',
      summary: 'A fit for factories, construction sites, and high-wear access control where a standard PVC card would not survive daily handling.',
      intro:
        'Use this clamshell card when the credential needs to survive drops, outdoor weather, or rough daily handling. Confirm reader compatibility, print area, and slot-punch requirements before production.',
    };
  }

  if (inCategory('RFID Cards') || matches('card', 'inlay', 'prelam')) {
    return {
      question: 'Need a credential that must match an installed reader or hotel lock?',
      summary: 'A fit for access control, hotel keys, ticketing, and projects that start from reader matching or card production.',
      intro:
        'Use this card or inlay when the project starts from installed reader compatibility, hotel lock matching, or card production requirements. Confirm protocol, chip path, print finish, and encoding needs before samples are approved.',
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
