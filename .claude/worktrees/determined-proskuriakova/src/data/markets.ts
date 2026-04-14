export interface MarketFaq {
  question: string;
  answer: string;
}

export interface MarketResource {
  href: string;
  name: string;
  description: string;
}

export interface MarketPageContent {
  key: string;
  slug: string;
  regionName: string;
  productFocus: string;
  title: string;
  description: string;
  keywords: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  signals: Array<{ title: string; description: string }>;
  buyerProfiles: Array<{ title: string; description: string }>;
  marketDrivers: Array<{ title: string; description: string }>;
  checklistTitle: string;
  checklistDescription: string;
  checklist: string[];
  productSlugs: string[];
  resources: MarketResource[];
  faqs: MarketFaq[];
  ctaTitle: string;
  ctaDescription: string;
  whatsappMessage: string;
}

export const marketPages: Record<string, MarketPageContent> = {
  'north-america-rfid-cards': {
    key: 'north-america-rfid-cards',
    slug: 'north-america-rfid-cards',
    regionName: 'North America',
    productFocus: 'RFID cards for access, hotel and membership programs',
    title: 'RFID Cards for North America - Access, Hotel and Membership Card Supply | ProudTek',
    description:
      'Buyer-focused landing page for North American RFID card sourcing. Compare access cards, hotel key cards, clamshell cards and card inlays with sample planning, compatibility checks and repeat-order support.',
    keywords:
      'RFID cards North America, hotel key cards USA, access control cards Canada, RFID card supplier North America, custom RFID cards',
    heroEyebrow: 'North America Buyer Hub',
    heroTitle: 'RFID card sourcing support for North American access, hotel and membership programs',
    heroDescription:
      'Built for importers, integrators, hospitality suppliers and multi-site operators that need reliable sample approval, reader matching and repeat-order planning for RFID cards shipped into the United States and Canada.',
    signals: [
      {
        title: 'Replacement access credentials',
        description:
          'A large share of projects start with replacing existing office, apartment or parking credentials that must match installed readers.',
      },
      {
        title: 'Hotel card replenishment',
        description:
          'Hospitality buyers often need branded guest cards, quick lock-system checks and dependable replenishment for multiple properties.',
      },
      {
        title: 'Membership and campus issuance',
        description:
          'Programs with ongoing issuance usually care about artwork consistency, numbering logic and repeatable encoding workflows.',
      },
    ],
    buyerProfiles: [
      {
        title: 'Security and access-control integrators',
        description:
          'Usually validating chip protocol, reader compatibility and whether the card needs printing only or pre-encoding before deployment.',
      },
      {
        title: 'Hotel and resort suppliers',
        description:
          'Often balancing guest-brand presentation, lock compatibility and the ability to reorder the same card style quickly.',
      },
      {
        title: 'Membership, club and campus teams',
        description:
          'Typically focused on variable numbering, branded print quality and credential replenishment that stays consistent over time.',
      },
    ],
    marketDrivers: [
      {
        title: 'Sample-first approval is common',
        description:
          'Many North American buyers want physical samples before confirming a bulk card program, especially for access-control replacements and hotel deployments.',
      },
      {
        title: 'Compatibility matters more than appearance',
        description:
          'The fastest way to avoid a project delay is to start with the current reader, lock brand or working credential rather than only a card photo.',
      },
      {
        title: 'Repeat orders need clean SKU control',
        description:
          'Once the first sample is approved, buyers usually want a simple path for repeat batches with the same chip, finish and numbering setup.',
      },
    ],
    checklistTitle: 'What North American buyers usually send before asking for a quote',
    checklistDescription:
      'A short but complete brief makes card matching and sample planning much faster, especially when the program replaces an installed credential.',
    checklist: [
      'Current reader, lock brand or software platform the new card must match.',
      'Chip family or a photo of the current working credential if the chip is unknown.',
      'Whether you need blank cards, printed cards, serial numbering or pre-encoding.',
      'Card material or format preference such as standard PVC, clamshell or inlay.',
      'Target quantity, launch timing and whether repeat replenishment is expected.',
    ],
    productSlugs: ['rfid-cards', 'rfid-clamshell-card', 'rfid-card-inlay', 'nfc-epoxy-card'],
    resources: [
      {
        href: '/category/rfid-cards',
        name: 'RFID cards category',
        description: 'Browse the broader family of PVC, clamshell, paper, wood and NFC-friendly card formats.',
      },
      {
        href: '/blogs/how-to-order-rfid-cards-from-china',
        name: 'RFID card sourcing guide',
        description: 'Review sample planning, MOQ, artwork approval and factory communication before ordering.',
      },
      {
        href: '/blogs/hotel-key-card-rfid-guide',
        name: 'Hotel RFID card guide',
        description: 'Useful for lock-system matching, hospitality print choices and guest-card replenishment.',
      },
      {
        href: '/sample-policy',
        name: 'Sample policy',
        description: 'See how stock samples, custom samples and pilot quantities are usually handled before production.',
      },
      {
        href: '/shipping-and-incoterms',
        name: 'Shipping and Incoterms',
        description: 'Clarify delivery expectations, timing buffers and the export terms used in quote discussions.',
      },
    ],
    faqs: [
      {
        question: 'What is the best starting point if I only have a current access card sample?',
        answer:
          'Send a clear photo of the working card, the reader or lock brand if known, and the target quantity. That is usually enough to start a card-matching conversation and shortlist samples.',
      },
      {
        question: 'Can ProudTek support hotel card replenishment for North American properties?',
        answer:
          'Yes. The usual process is to confirm lock compatibility first, then align branding, numbering or encoding details so repeat orders stay consistent across properties.',
      },
      {
        question: 'Should I choose clamshell cards or standard PVC cards?',
        answer:
          'Standard PVC cards fit most office, hotel and membership programs. Clamshell cards are often chosen when buyers need a thicker credential for heavier daily use or specific legacy reader environments.',
      },
      {
        question: 'What speeds up a repeat RFID card order?',
        answer:
          'Keeping the approved chip, artwork file, finish and numbering setup tied to a stable SKU makes repeat ordering much smoother than rebuilding the specification each time.',
      },
    ],
    ctaTitle: 'Need RFID cards matched for a North American project?',
    ctaDescription:
      'Send your current credential details, target quantity and any artwork notes. We can recommend the right card samples and outline the quickest path into production or replenishment.',
    whatsappMessage: 'Hi, I need RFID cards for a North American access or hotel project.',
  },
  'europe-laundry-rfid-tags': {
    key: 'europe-laundry-rfid-tags',
    slug: 'europe-laundry-rfid-tags',
    regionName: 'Europe',
    productFocus: 'Laundry RFID tags for linen, garment and textile tracking',
    title: 'Laundry RFID Tags for Europe - Linen, Workwear and Textile Tracking | ProudTek',
    description:
      'Buyer-focused landing page for European laundry RFID projects. Compare textile, silicone and PPS laundry tags with wash-cycle planning, attachment choices and repeat supply support.',
    keywords:
      'laundry RFID tags Europe, textile RFID tags Europe, linen tracking RFID supplier, workwear RFID tags, washable RFID tags',
    heroEyebrow: 'Europe Buyer Hub',
    heroTitle: 'Laundry RFID tags for European linen, workwear and reusable textile programs',
    heroDescription:
      'Designed for industrial laundries, garment processors, healthcare textile programs and solution partners that need repeatable wash performance, attachment guidance and sample validation before rollout.',
    signals: [
      {
        title: 'Industrial laundry circulation',
        description:
          'Programs often involve large linen or garment volumes where attachment method and long-cycle survivability matter as much as chip choice.',
      },
      {
        title: 'Healthcare and workwear traceability',
        description:
          'Workwear and healthcare textile buyers usually want consistent reading through repeated wash, sort and return workflows.',
      },
      {
        title: 'Pilot validation before scale-up',
        description:
          'European deployments commonly begin with a controlled pilot to confirm wash performance, reader behavior and handling speed.',
      },
    ],
    buyerProfiles: [
      {
        title: 'Industrial laundry operators',
        description:
          'Usually comparing washable tag formats, sewing or heat-seal attachment methods and how quickly a pilot can move into regular replenishment.',
      },
      {
        title: 'Healthcare and hospitality textile programs',
        description:
          'Often focused on linen traceability, garment lifecycle visibility and tags that survive repeated handling without creating discomfort or damage.',
      },
      {
        title: 'System integrators for laundry software',
        description:
          'Typically need reader compatibility, on-site test support and tag formats that behave consistently across the operational flow.',
      },
    ],
    marketDrivers: [
      {
        title: 'Attachment method drives success',
        description:
          'Choosing between sewn, pouch or heat-seal installation is often the difference between a smooth deployment and early tag failure.',
      },
      {
        title: 'Wash environment should be specified early',
        description:
          'Temperature, detergents, pressure and ironing conditions help narrow down the right laundry tag faster than simply asking for a generic washable tag.',
      },
      {
        title: 'Repeat supply matters after the pilot',
        description:
          'Once the pilot proves out, buyers usually want the same approved construction available for regular replenishment without specification drift.',
      },
    ],
    checklistTitle: 'What European laundry buyers usually clarify before sample approval',
    checklistDescription:
      'The most productive laundry RFID conversations start with the wash environment, the textile type and the attachment method instead of chip name alone.',
    checklist: [
      'Whether the tags will go into flat linen, uniforms, garments, mats or another textile class.',
      'Wash, drying, ironing or finishing conditions that affect tag durability.',
      'Preferred attachment method such as sewn-in, heat sealed or button style.',
      'Reader setup, read points and whether the program begins with a pilot or full rollout.',
      'Estimated textile volume, replenishment rhythm and shipping destination.',
    ],
    productSlugs: ['textile-rfid-laundry-tag', 'silicone-laundry-tag', 'pps-laundry-tag-rfid-button', 'rfid-reader-writer'],
    resources: [
      {
        href: '/category/rfid-tags',
        name: 'RFID tags category',
        description: 'Compare laundry, industrial, anti-metal and rugged tag formats used across operational programs.',
      },
      {
        href: '/blogs/laundry-rfid-tags-buying-guide',
        name: 'Laundry RFID guide',
        description: 'A practical guide for tag construction, wash-cycle questions and pilot planning.',
      },
      {
        href: '/product/textile-rfid-laundry-tag',
        name: 'Textile laundry tag product page',
        description: 'Review a representative washable tag format for garment and linen tracking.',
      },
      {
        href: '/quality-control',
        name: 'Quality control page',
        description: 'See how materials, encoding and final inspection are organized before shipment.',
      },
      {
        href: '/sample-policy',
        name: 'Sample policy',
        description: 'Useful when the project starts with an evaluation batch or a limited-site pilot.',
      },
    ],
    faqs: [
      {
        question: 'What details matter most when choosing a laundry RFID tag for Europe?',
        answer:
          'The most important inputs are textile type, wash conditions, attachment method and the read points in the real workflow. Those factors usually determine the tag construction faster than price alone.',
      },
      {
        question: 'Is a pilot run recommended before a full laundry rollout?',
        answer:
          'Yes. A pilot helps confirm read consistency, attachment durability and how the tag behaves through your actual wash and sort cycle before wider deployment.',
      },
      {
        question: 'Which laundry RFID tag format is best for garments versus flat linen?',
        answer:
          'There is no single best format. Garments, workwear and flat linen often suit different tag shapes or attachment methods, so matching the tag to the textile and handling routine is important.',
      },
      {
        question: 'Can ProudTek support repeat orders once the approved laundry tag is fixed?',
        answer:
          'Yes. After the approved tag format is confirmed, repeat orders are usually organized around the same construction, chip and attachment expectations so replenishment stays predictable.',
      },
    ],
    ctaTitle: 'Need laundry RFID tags for a European textile program?',
    ctaDescription:
      'Share your wash environment, attachment method and pilot scope. We can suggest the most practical sample set and outline a repeat-supply path after validation.',
    whatsappMessage: 'Hi, I need laundry RFID tags for a European linen or garment project.',
  },
  'middle-east-anti-metal-rfid-tags': {
    key: 'middle-east-anti-metal-rfid-tags',
    slug: 'middle-east-anti-metal-rfid-tags',
    regionName: 'Middle East',
    productFocus: 'Anti-metal RFID tags for facilities, equipment and outdoor assets',
    title: 'Anti-Metal RFID Tags for the Middle East - Asset, Utility and Facility Tracking | ProudTek',
    description:
      'Buyer-focused landing page for Middle East anti-metal RFID projects. Compare printable metal tags, ceramic tags and rugged on-metal formats with mounting guidance, sample validation and shipping support.',
    keywords:
      'anti-metal RFID tags Middle East, on metal RFID tags UAE, asset tracking RFID tags Saudi Arabia, outdoor RFID tags, printable metal RFID tags',
    heroEyebrow: 'Middle East Buyer Hub',
    heroTitle: 'Anti-metal RFID tags for Middle East facility, equipment and outdoor asset programs',
    heroDescription:
      'Built for contractors, industrial integrators and asset-tracking teams that need stable RFID performance on metal surfaces, field-friendly mounting options and reliable sample validation before scale-up.',
    signals: [
      {
        title: 'Metal-heavy asset environments',
        description:
          'Projects often involve metal cabinets, tools, MEP assets, utility equipment or outdoor infrastructure where standard labels underperform.',
      },
      {
        title: 'Outdoor and heat-aware selection',
        description:
          'Buyers usually care about enclosure strength, mounting method and how the tag performs under field exposure rather than only catalog appearance.',
      },
      {
        title: 'Integrator-led sample evaluation',
        description:
          'Many projects start with a focused sample set that compares two or three on-metal constructions before the final deployment choice is made.',
      },
    ],
    buyerProfiles: [
      {
        title: 'Facility and maintenance contractors',
        description:
          'Usually looking for durable on-metal tags that can stay legible and readable on equipment, service assets or installed infrastructure.',
      },
      {
        title: 'Utility and municipal asset teams',
        description:
          'Often focused on outdoor exposure, fastener choice and a repeatable tag format that can be used across many asset classes.',
      },
      {
        title: 'Industrial solution integrators',
        description:
          'Typically testing tag behavior on the real asset, at the real read distance, with the same reader setup planned for deployment.',
      },
    ],
    marketDrivers: [
      {
        title: 'Mounting choice affects reliability',
        description:
          'Adhesive, screw, rivet or bracket mounting should be aligned with the asset surface and service routine before the final sample is chosen.',
      },
      {
        title: 'Real-surface testing is essential',
        description:
          'A tag that performs well on one metal surface may not behave the same on a different enclosure shape or read angle, so asset-level validation matters.',
      },
      {
        title: 'Shipping clarity helps project timing',
        description:
          'Projects tied to installations or maintenance windows usually move better when samples, approvals and export timing are planned as one process.',
      },
    ],
    checklistTitle: 'What Middle East anti-metal projects usually confirm before sampling',
    checklistDescription:
      'A strong on-metal RFID shortlist starts with the actual asset and environment. The more specific the asset data, the faster the sample recommendation becomes useful.',
    checklist: [
      'Asset material, shape and whether the tag sits on flat metal, curved metal or mixed surfaces.',
      'Indoor or outdoor exposure, heat conditions and any abrasion or cleaning concerns.',
      'Preferred mounting method such as adhesive, screw, rivet or embedded placement.',
      'Required read distance, reader type and the angle or location where the read happens.',
      'Sample quantity, rollout phase and target delivery timing for the project.',
    ],
    productSlugs: ['rfid-metal-tag', 'high-temperature-rfid-tag', 'rfid-ceramic-tag', 'rfid-pcb-tag'],
    resources: [
      {
        href: '/category/rfid-tags',
        name: 'Industrial RFID tags category',
        description: 'Browse anti-metal, high-temperature, cable-tie and other rugged tag options in one place.',
      },
      {
        href: '/blogs/anti-metal-rfid-tags-guide',
        name: 'Anti-metal tag guide',
        description: 'Compare on-metal tag formats and understand why standard labels often fail on metal assets.',
      },
      {
        href: '/product/rfid-metal-tag',
        name: 'Printable RFID metal tag',
        description: 'See a representative product page for equipment and fixed-asset identification on metal.',
      },
      {
        href: '/quality-control',
        name: 'Quality control page',
        description: 'Review how material selection, encoding and inspection steps are organized before shipment.',
      },
      {
        href: '/shipping-and-incoterms',
        name: 'Shipping and Incoterms',
        description: 'Useful for aligning quote terms, export timing and delivery expectations for project schedules.',
      },
    ],
    faqs: [
      {
        question: 'Why are anti-metal RFID tags usually recommended for Middle East equipment projects?',
        answer:
          'When the asset surface is metal, anti-metal tag constructions are typically needed to keep read performance stable. Standard labels often lose range or consistency once mounted on metal.',
      },
      {
        question: 'How should I decide between printable metal tags, ceramic tags and PCB tags?',
        answer:
          'That choice usually depends on asset size, mounting constraints, heat exposure and desired read behavior. A small comparison sample set is often the fastest way to confirm the right fit.',
      },
      {
        question: 'What information helps the fastest anti-metal sample recommendation?',
        answer:
          'Photos of the actual asset, approximate dimensions, the target read point, environmental exposure and the preferred mounting method all make sample matching much more accurate.',
      },
      {
        question: 'Can ProudTek help after the sample stage if the project expands into a wider rollout?',
        answer:
          'Yes. Once the approved tag format is clear, the discussion usually shifts into consistent repeat supply, numbering or encoding needs and delivery scheduling for rollout phases.',
      },
    ],
    ctaTitle: 'Need on-metal RFID tags for a Middle East asset project?',
    ctaDescription:
      'Send asset photos, the mounting preference and target read distance. We can suggest anti-metal sample options that fit the field environment and rollout timeline.',
    whatsappMessage: 'Hi, I need anti-metal RFID tags for a Middle East asset or facility project.',
  },
};

export const marketPagesList = Object.values(marketPages);

export const marketLinks = marketPagesList.map((page) => ({
  name: page.regionName,
  href: `/markets/${page.slug}`,
  description: page.productFocus,
}));
