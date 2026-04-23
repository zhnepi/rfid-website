import { getSolutionContactHref } from '../utils/contact';

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionResource {
  href: string;
  name: string;
  description: string;
}

export interface SolutionPageContent {
  key: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  signals: Array<{ title: string; description: string }>;
  workflowTitle: string;
  workflowDescription: string;
  workflowSteps: string[];
  productSlugs: string[];
  relatedMarketSlugs: string[];
  resources: SolutionResource[];
  faqs: SolutionFaq[];
  ctaTitle: string;
  ctaDescription: string;
  whatsappMessage: string;
}

export const solutionPages: Record<string, SolutionPageContent> = {
  'access-control-rfid': {
    key: 'access-control-rfid',
    slug: 'access-control-rfid',
    name: 'Access control credentials',
    title: 'Access Control RFID Solutions - Cards, Keyfobs and Credential Supply | RFIDAK',
    description:
      'Use-case hub for RFID access control covering cards, keyfobs, credential matching, legacy reader compatibility, sample testing and repeat credential supply.',
    keywords:
      'access control RFID solutions, RFID access cards, RFID keyfobs, access control credentials, door access RFID',
    heroEyebrow: 'Access Control Hub',
    heroTitle: 'RFID products and buyer checkpoints for office, apartment, campus and facility access control',
    heroDescription:
      'Built for security integrators, property operators, distributors and sourcing teams that need compatible RFID credentials for installed readers, plus a clear path from sample matching into repeat supply.',
    signals: [
      {
        title: 'Existing readers drive the shortlist',
        description:
          'Access-control projects usually start with a current credential, reader model or installed system rather than an empty product search.',
      },
      {
        title: 'Multiple credential formats may coexist',
        description:
          'Many projects mix cards, keyfobs and backup formats depending on user group, issuance model and the daily environment.',
      },
      {
        title: 'Repeat issuance is part of the buying logic',
        description:
          'After the first approval, buyers often need a stable SKU and numbering approach so new tenants, staff or members can be issued quickly.',
      },
    ],
    workflowTitle: 'How access-control credential projects usually move',
    workflowDescription:
      'The most reliable path begins with compatibility, then confirms credential format and numbering details before the project moves into recurring issuance or replenishment.',
    workflowSteps: [
      'Start from the current reader, working credential or installed system so protocol compatibility is solved first.',
      'Choose the credential format that fits the user flow, such as cards for standard issuance or keyfobs for portable everyday access.',
      'Confirm numbering, print or encoding details on an approved sample before large-batch issuance begins.',
      'Keep the approved chip and format tied to one repeatable SKU so future staff, resident or member issuance stays simple.',
    ],
    productSlugs: ['rfid-cards', 'rfid-clamshell-card', 'rfid-keyfob', 'nfc-epoxy-card'],
    relatedMarketSlugs: ['north-america-rfid-cards'],
    resources: [
      {
        href: '/category/rfid-cards',
        name: 'RFID cards category',
        description: 'Useful for office, apartment, school and parking credentials that need printable card formats.',
      },
      {
        href: '/category/rfid-keyfob',
        name: 'RFID keyfob category',
        description: 'A good path for portable access credentials and key-tag-based issuance programs.',
      },
      {
        href: '/blogs/rfid-keyfob-buying-guide',
        name: 'RFID keyfob guide',
        description: 'Compare shell styles, reader matching and access-control buying checkpoints.',
      },
      {
        href: '/blogs/rfid-frequency-guide',
        name: 'RFID frequency guide',
        description: 'Helpful when the buyer needs to narrow LF versus HF credential matching.',
      },
      {
        href: '/markets/north-america-rfid-cards',
        name: 'North America access-card hub',
        description: 'Useful when the access-control conversation is also region-specific for North America.',
      },
    ],
    faqs: [
      {
        question: 'What should I send first for an access-control credential inquiry?',
        answer:
          'The best starting point is a current working card or keyfob, reader details if known and the target quantity. That usually narrows the compatible options quickly.',
      },
      {
        question: 'How do I choose between cards and keyfobs for access control?',
        answer:
          'Cards work well for standard issuance and printed identification, while keyfobs are often preferred for portable everyday access on a keychain. Some programs use both.',
      },
      {
        question: 'Can old access-control systems still use new RFID credentials?',
        answer:
          'Sometimes yes, but the answer depends on reader compatibility. That is why matching to the installed system should happen before graphic design or finishing decisions.',
      },
      {
        question: 'What makes repeat credential supply easier?',
        answer:
          'A fixed chip, format, numbering method and saved artwork approval make ongoing issuance and replenishment much smoother.',
      },
    ],
    ctaTitle: 'Need RFID cards or keyfobs for access control?',
    ctaDescription:
      'Send your current reader or credential details, target quantity and whether you need cards, keyfobs or both. We can help narrow the right sample path.',
    whatsappMessage: 'Hi, I need RFID cards or keyfobs for an access-control project.',
  },
  'hotel-access-rfid': {
    key: 'hotel-access-rfid',
    slug: 'hotel-access-rfid',
    name: 'Hotel access and guest credentials',
    title: 'Hotel RFID Solutions - Key Cards, Wristbands and Guest Credentials | RFIDAK',
    description:
      'Use-case hub for hotel RFID projects covering key cards, resort wristbands, guest credentials, lock compatibility, sample approval and repeat replenishment.',
    keywords:
      'hotel RFID solutions, hotel key cards supplier, resort RFID wristbands, guest access RFID, hotel door lock cards',
    heroEyebrow: 'Hotel And Resort Hub',
    heroTitle: 'RFID products and buying steps for hotel access, guest identity and resort operations',
    heroDescription:
      'Built for hospitality suppliers, hotel operators and sourcing teams that need lock-compatible guest credentials, branded room cards, resort wristbands and a clean repeat-order process once the first sample is approved.',
    signals: [
      {
        title: 'Lock compatibility comes first',
        description:
          'Most hotel RFID projects begin by matching the current lock system or guest credential before artwork or finishing details are finalized.',
      },
      {
        title: 'Guest-facing branding matters',
        description:
          'Hotels and resorts often need print quality, color consistency and a premium finish that fits the property brand as well as the lock environment.',
      },
      {
        title: 'Replenishment needs to stay simple',
        description:
          'Once the credential is approved, buyers typically want repeat batches without re-opening every chip, print and numbering decision from scratch.',
      },
    ],
    workflowTitle: 'How hotel RFID buying conversations usually move',
    workflowDescription:
      'The most efficient hospitality projects move from lock matching into sample approval, then into print, numbering and replenishment planning.',
    workflowSteps: [
      'Confirm the current lock brand, working card or chip family so compatibility is solved before design details take over the conversation.',
      'Choose the guest credential format based on the property workflow: standard room cards, premium cards, wristbands for resorts or backup keyfobs.',
      'Approve artwork, numbering, encoding and packaging details on a real sample before the full guest-card batch is released.',
      'Store the approved specification under one repeatable SKU so future replenishment stays fast and consistent across properties.',
    ],
    productSlugs: ['rfid-cards', 'rfid-clamshell-card', 'rfid-silicone-wristband', 'rfid-keyfob'],
    relatedMarketSlugs: ['north-america-rfid-cards'],
    resources: [
      {
        href: '/blogs/hotel-key-card-rfid-guide',
        name: 'Hotel RFID card guide',
        description: 'Compare hotel key card types, lock matching questions and replenishment considerations.',
      },
      {
        href: '/category/rfid-cards',
        name: 'RFID cards category',
        description: 'Browse PVC cards, clamshell cards and card inlays that fit hotel access workflows.',
      },
      {
        href: '/category/rfid-wristbands',
        name: 'RFID wristbands category',
        description: 'Useful for resorts, pools, lockers and cashless guest experiences.',
      },
      {
        href: '/sample-policy',
        name: 'Sample policy',
        description: 'Helpful when the hotel project starts with lock matching or branded guest-card approval.',
      },
      {
        href: '/markets/north-america-rfid-cards',
        name: 'North America hotel and access card hub',
        description: 'Useful when the buyer conversation is also region-specific for the United States or Canada.',
      },
    ],
    faqs: [
      {
        question: 'What is the fastest way to match a hotel RFID card to an existing lock system?',
        answer:
          'Start with the current working card, the lock brand or a reader detail if available. That usually shortens the sample-matching cycle more than starting from card design alone.',
      },
      {
        question: 'Should resorts choose RFID cards or wristbands?',
        answer:
          'That depends on guest flow. Cards suit room access and standard issuance, while wristbands work well when the guest also needs pool, locker, activity or cashless access throughout the stay.',
      },
      {
        question: 'How do repeat hotel key card orders move faster?',
        answer:
          'A saved approval set for chip, print, numbering and finish helps repeat orders move quickly without rebuilding the whole specification each time.',
      },
      {
        question: 'Can RFIDAK support both branded guest cards and testing samples?',
        answer:
          'Yes. Hospitality projects usually start with compatibility or sample approval, then move into the branded production version once the credential and print finish are confirmed.',
      },
    ],
    ctaTitle: 'Need hotel RFID cards or wristbands matched to a guest workflow?',
    ctaDescription:
      'Send the lock brand, current card or wristband idea, target quantity and any branding notes. We can suggest the most practical hospitality sample path.',
    whatsappMessage: 'Hi, I need RFID products for hotel access or resort guest credentials.',
  },
  'laundry-linen-rfid': {
    key: 'laundry-linen-rfid',
    slug: 'laundry-linen-rfid',
    name: 'Laundry and linen tracking',
    title: 'Laundry RFID Solutions - Linen, Uniform and Textile Tracking | RFIDAK',
    description:
      'Use-case hub for laundry RFID projects covering textile tags, silicone tags, PPS tags, wash-cycle planning, pilot testing and repeat supply for linen and garment programs.',
    keywords:
      'laundry RFID solutions, linen tracking RFID, textile RFID tags, uniform RFID management, washable RFID tags',
    heroEyebrow: 'Laundry And Linen Hub',
    heroTitle: 'RFID products and buyer checkpoints for linen, garment and reusable textile tracking',
    heroDescription:
      'Designed for industrial laundries, healthcare textile programs, garment processors and integrators that need tags built around wash conditions, attachment method and operational read points rather than generic tag catalogs.',
    signals: [
      {
        title: 'Attachment method decides durability',
        description:
          'Laundry buyers often narrow the shortlist by sewn-in, heat-sealed or button-style installation before they compare anything else.',
      },
      {
        title: 'Wash environment changes the tag choice',
        description:
          'Temperature, detergents, pressure and finishing conditions usually matter more than a broad request for a washable RFID tag.',
      },
      {
        title: 'Pilot validation reduces rollout risk',
        description:
          'Many laundry programs benefit from a pilot where the approved tag is tested through real sort, wash, pack and return routines before scale-up.',
      },
    ],
    workflowTitle: 'How laundry RFID projects usually move from idea to approved repeat supply',
    workflowDescription:
      'The most stable textile RFID projects begin with the real wash environment, confirm attachment style on samples, then lock the approved tag for replenishment.',
    workflowSteps: [
      'Define whether the project tags flat linen, uniforms, garments, mats or mixed reusable textiles because the tag shape and attachment method often differ.',
      'Share wash, drying and ironing conditions so the shortlist can focus on constructions that fit the real processing environment.',
      'Run a pilot with the chosen tag on the real textile and at the real read points before rolling the same construction into larger quantities.',
      'Keep the approved laundry tag format stable for repeat orders so the operational team is not re-testing different constructions later.',
    ],
    productSlugs: ['textile-rfid-laundry-tag', 'silicone-laundry-tag', 'pps-laundry-tag-rfid-button', 'rfid-reader-writer'],
    relatedMarketSlugs: ['europe-laundry-rfid-tags'],
    resources: [
      {
        href: '/blogs/laundry-rfid-tags-buying-guide',
        name: 'Laundry RFID buying guide',
        description: 'Useful for wash-cycle questions, attachment methods and pilot planning.',
      },
      {
        href: '/category/rfid-tags',
        name: 'RFID tags category',
        description: 'See laundry, anti-metal and rugged tags in one place before narrowing to textile-specific options.',
      },
      {
        href: '/product/textile-rfid-laundry-tag',
        name: 'Textile laundry tag product page',
        description: 'A representative product page for heat-seal and sewn textile tag discussions.',
      },
      {
        href: '/quality-control',
        name: 'Quality control page',
        description: 'Helpful when the buyer wants more detail on material handling and inspection before shipment.',
      },
      {
        href: '/markets/europe-laundry-rfid-tags',
        name: 'Europe laundry RFID hub',
        description: 'Useful when the textile project is region-specific and the buyer needs a Europe-oriented landing page.',
      },
    ],
    faqs: [
      {
        question: 'What should I send first for a laundry RFID inquiry?',
        answer:
          'The most useful starting details are textile type, wash conditions, attachment method and the read points in the real workflow. Those inputs usually narrow the tag choice quickly.',
      },
      {
        question: 'Is a pilot batch worth doing before a large linen rollout?',
        answer:
          'Yes. A pilot helps confirm durability and operational reading before a larger order is committed, especially when multiple laundries or textile classes are involved.',
      },
      {
        question: 'How do I choose between textile, silicone and PPS laundry tags?',
        answer:
          'The right format depends on the textile, attachment method and processing conditions. Different textile programs often need different constructions even if they all fall under laundry tracking.',
      },
      {
        question: 'Can repeat laundry tag orders stay consistent after approval?',
        answer:
          'Yes. Once the textile project confirms an approved tag format, keeping that same construction and attachment logic in repeat supply helps avoid unnecessary re-testing.',
      },
    ],
    ctaTitle: 'Need RFID tags for linen, garment or reusable textile tracking?',
    ctaDescription:
      'Share the textile type, wash conditions and attachment style. We can suggest the best laundry sample set and the next pilot step.',
    whatsappMessage: 'Hi, I need RFID products for laundry, linen or garment tracking.',
  },
  'industrial-asset-tracking-rfid': {
    key: 'industrial-asset-tracking-rfid',
    slug: 'industrial-asset-tracking-rfid',
    name: 'Industrial asset tracking',
    title: 'Industrial RFID Solutions - Asset Tracking for Tools, Equipment and Containers | RFIDAK',
    description:
      'Use-case hub for industrial RFID asset tracking with anti-metal tags, cable ties, pallet tags and rugged transponders for tools, equipment, bins and reusable assets.',
    keywords:
      'industrial RFID solutions, asset tracking RFID tags, anti-metal tags, pallet RFID tags, tool tracking RFID',
    heroEyebrow: 'Industrial Asset Hub',
    heroTitle: 'RFID products and buying steps for tools, equipment, returnable assets and metal-heavy environments',
    heroDescription:
      'Built for factory teams, system integrators, facility contractors and logistics operators that need the right RFID enclosure, mounting method and read behavior for real operational surfaces.',
    signals: [
      {
        title: 'The asset surface changes the answer',
        description:
          'Industrial RFID projects often split immediately between standard surfaces and metal-heavy assets because the tag construction must follow the environment.',
      },
      {
        title: 'Mounting method affects field success',
        description:
          'Adhesive, screw, rivet or cable-tie installation can change the best tag style even when the chip family stays similar.',
      },
      {
        title: 'On-site read testing is essential',
        description:
          'A rugged tag that looks right on paper still needs to be tested on the real asset, with the real reader position and operating conditions.',
      },
    ],
    workflowTitle: 'How industrial asset-tracking projects usually move',
    workflowDescription:
      'The most useful industrial RFID path starts from the asset and surface, then narrows by mounting, range and environment before the final sample set is chosen.',
    workflowSteps: [
      'Identify the asset class first: tool, pallet, metal cabinet, container, MRO part or another reusable object that shapes the mounting surface.',
      'Confirm whether the environment includes metal, outdoor exposure, heat, abrasion or handling stress so the shortlist does not rely on standard labels by mistake.',
      'Test sample tags on the real asset at the intended read distance and read angle before scaling the project.',
      'Once one rugged format is approved, keep the same installation logic and SKU so repeat supply supports the same field behavior.',
    ],
    productSlugs: ['rfid-metal-tag', 'pallet-rfid-tag', 'rfid-cable-tie-tag', 'high-temperature-rfid-tag'],
    relatedMarketSlugs: ['middle-east-anti-metal-rfid-tags'],
    resources: [
      {
        href: '/blogs/anti-metal-rfid-tags-guide',
        name: 'Anti-metal tag guide',
        description: 'A strong starting point for metal surfaces, equipment and facility assets.',
      },
      {
        href: '/category/rfid-tags',
        name: 'Industrial RFID tags category',
        description: 'Compare cable-tie, anti-metal, pallet, nail and other rugged formats before requesting samples.',
      },
      {
        href: '/blogs/rfid-supply-chain',
        name: 'RFID for logistics and supply chain',
        description: 'Useful when the asset project overlaps with pallets, returnable transport items or warehouse flow.',
      },
      {
        href: '/quality-control',
        name: 'Quality control page',
        description: 'Helpful when asset programs need more confidence in material inspection and production consistency.',
      },
      {
        href: '/markets/middle-east-anti-metal-rfid-tags',
        name: 'Middle East anti-metal buyer hub',
        description: 'Useful when the asset conversation is also tied to a region-specific sourcing path.',
      },
    ],
    faqs: [
      {
        question: 'How do I know if I need an anti-metal RFID tag?',
        answer:
          'If the tag mounts on or very near metal, an anti-metal construction is usually the safer starting point because standard labels often lose stability and range on metal surfaces.',
      },
      {
        question: 'What details help the fastest industrial tag recommendation?',
        answer:
          'Photos of the asset, the surface type, preferred mounting method, environment and target read distance all make sample matching much more accurate.',
      },
      {
        question: 'Should I test more than one rugged tag on the same asset?',
        answer:
          'Yes. When the asset is critical or the surface is complex, comparing two or three candidate tags on the real object is often the quickest way to confirm the strongest option.',
      },
      {
        question: 'Can one industrial tag format work across every asset in a site?',
        answer:
          'Sometimes, but not always. Many projects use one dominant tag family and a second format for special cases like curved metal, high temperature or small asset space.',
      },
    ],
    ctaTitle: 'Need RFID tags for industrial asset tracking or rugged deployment?',
    ctaDescription:
      'Send asset photos, surface details and the target read point. We can suggest an industrial sample set built around the real field environment.',
    whatsappMessage: 'Hi, I need RFID products for industrial asset tracking.',
  },
  'library-media-rfid': {
    key: 'library-media-rfid',
    slug: 'library-media-rfid',
    name: 'Library and media management',
    title: 'Library RFID Solutions - Books, Media and Self-Service Workflows | RFIDAK',
    description:
      'Use-case hub for library RFID projects covering book labels, media tags, desk readers, patron cards and self-check workflows for schools, public libraries and media centers.',
    keywords:
      'library RFID solutions, RFID library labels, library book tags, self check RFID library, media management RFID',
    heroEyebrow: 'Library And Media Hub',
    heroTitle: 'RFID products and buying steps for library circulation, shelving and self-service media workflows',
    heroDescription:
      'Built for librarians, integrators, education buyers and media-center teams that need dependable label supply, circulation-ready tag formats, reader matching and patron credential planning.',
    signals: [
      {
        title: 'Label shape and placement matter',
        description:
          'Library RFID projects often depend on thin label constructions that fit books and media without disrupting shelving or circulation.',
      },
      {
        title: 'The workflow is broader than the label',
        description:
          'Book labels, desk readers and sometimes patron cards all need to work together in self-check, returns and shelving processes.',
      },
      {
        title: 'Consistency matters over time',
        description:
          'Libraries usually care about dependable label supply and a stable specification because collections are tagged in phases, not always in one batch.',
      },
    ],
    workflowTitle: 'How library RFID projects usually move',
    workflowDescription:
      'The strongest library RFID plans begin with the collection type and workflow, then connect the right label format to readers, patron credentials and phased rollout needs.',
    workflowSteps: [
      'Define whether the project covers books only, mixed media or a larger circulation system that also includes patron cards and desk readers.',
      'Choose a label format that fits the material, placement position and handling routine inside the collection.',
      'Confirm how the labels interact with check-in, self-service, security gates or desk workflows before ordering in full volume.',
      'Keep the approved tag and label specification consistent across tagging phases so the collection behaves the same over time.',
    ],
    productSlugs: ['library-rfid-tags', 'uhf-library-label', 'rfid-reader-writer', 'rfid-cards'],
    relatedMarketSlugs: [],
    resources: [
      {
        href: '/category/rfid-labels',
        name: 'RFID labels category',
        description: 'Browse library labels, NFC stickers and other thin printable formats.',
      },
      {
        href: '/product/library-rfid-tags',
        name: 'Library RFID tags product page',
        description: 'A representative starting point for book and media tag selection.',
      },
      {
        href: '/rfid-technology',
        name: 'RFID technology guide',
        description: 'Helpful when library teams need a broader explanation of frequencies and reader behavior.',
      },
      {
        href: '/blogs/nfc-technology',
        name: 'NFC technology guide',
        description: 'Useful when the project overlaps with user tap experiences or broader HF technology questions.',
      },
      {
        href: getSolutionContactHref('library-media-rfid'),
        name: 'Discuss library RFID rollout',
        description: 'Useful for book tagging phases, reader matching and patron-card planning.',
      },
    ],
    faqs: [
      {
        question: 'What does a typical library RFID rollout usually include?',
        answer:
          'Many projects include labels for books or media first, then connect those labels to desk readers, self-service workflows and sometimes patron credentials depending on the system design.',
      },
      {
        question: 'How important is label placement in library RFID?',
        answer:
          'Placement matters because the label should fit the material and circulation workflow without affecting handling, shelving or the ability to read reliably at check-in and check-out points.',
      },
      {
        question: 'Can library RFID projects be rolled out in phases?',
        answer:
          'Yes. Many collections are tagged in stages, which makes a stable label specification and repeatable supply more important than a one-time batch mindset.',
      },
      {
        question: 'Do I need separate readers for library RFID workflows?',
        answer:
          'That depends on the system design. Some projects only need label supply first, while others also need compatible desk readers or enrollment hardware as part of the rollout.',
      },
    ],
    ctaTitle: 'Need RFID labels or readers for a library or media workflow?',
    ctaDescription:
      'Share the collection type, rollout scope and workflow goals. We can help narrow the right labels, readers and supporting product pages to test next.',
    whatsappMessage: 'Hi, I need RFID products for a library or media management project.',
  },
  'event-nfc-rfid': {
    key: 'event-nfc-rfid',
    slug: 'event-nfc-rfid',
    name: 'Events, retail and NFC engagement',
    title: 'Event And NFC RFID Solutions - Wristbands, Stickers and Smart Interaction Products | RFIDAK',
    description:
      'Use-case hub for events, retail NFC and smart interaction projects covering wristbands, NFC stickers, labels, attendance workflows and guest or shopper engagement.',
    keywords:
      'event RFID solutions, NFC marketing tags, RFID event wristbands, NFC stickers retail, smart interaction RFID',
    heroEyebrow: 'Events And NFC Hub',
    heroTitle: 'RFID products and buying steps for event entry, retail NFC and smart interaction workflows',
    heroDescription:
      'Built for event teams, retail marketers, venue operators and sourcing teams that need wearable credentials, NFC stickers or smart packaging paths tied to real user interaction rather than generic product lists.',
    signals: [
      {
        title: 'The tap experience shapes the product choice',
        description:
          'Projects that depend on smartphone taps or guest interactions usually need a very different product path from pure back-of-house tracking workflows.',
      },
      {
        title: 'Wearable versus adhesive formats',
        description:
          'Event entry and guest ID often lean toward wristbands, while promotions, packaging and retail engagement usually start with stickers or labels.',
      },
      {
        title: 'Brand presentation matters',
        description:
          'These projects often care about visible print, guest-facing design and the quality of the physical interaction as much as the chip itself.',
      },
    ],
    workflowTitle: 'How event and NFC engagement projects usually move',
    workflowDescription:
      'The best route starts with the user interaction, then narrows by wearable versus label format, visible branding and whether the workflow is entry, attendance, cashless or tap-to-open content.',
    workflowSteps: [
      'Define the user interaction first: event entry, attendance, loyalty, packaging tap, product authentication or content launch.',
      'Choose the format that fits the interaction, such as a wristband for guest wear or an NFC sticker for products, packaging or displays.',
      'Confirm the visual design, data-writing approach and read device before scaling production for a campaign or event.',
      'Keep the approved SKU and artwork consistent if the event, campaign or retail program repeats over multiple runs.',
    ],
    productSlugs: ['rfid-silicone-wristband', 'nfc-sticker', 'uhf-sticker', 'nfc-epoxy-card'],
    relatedMarketSlugs: [],
    resources: [
      {
        href: '/blogs/rfid-wristbands-for-events-and-hotels',
        name: 'RFID wristband guide',
        description: 'Helpful for event entry, guest wearables and hospitality-style workflows.',
      },
      {
        href: '/blogs/nfc-tags-business-use-cases',
        name: 'NFC business use cases',
        description: 'Useful for smartphone tap interactions, marketing and customer engagement ideas.',
      },
      {
        href: '/category/rfid-labels',
        name: 'RFID labels and stickers category',
        description: 'A good path for NFC stickers, UHF labels and printable smart packaging formats.',
      },
      {
        href: '/category/rfid-wristbands',
        name: 'RFID wristbands category',
        description: 'Browse wearable formats for events, attendance and guest access.',
      },
      {
        href: getSolutionContactHref('event-nfc-rfid'),
        name: 'Discuss event or NFC samples',
        description: 'Useful for campaign timing, sample planning and format selection before launch.',
      },
    ],
    faqs: [
      {
        question: 'Should an event project start with wristbands or cards?',
        answer:
          'That depends on how the guest carries the credential. Wristbands work best when the credential needs to stay on the user, while cards are more common when the project also needs printed identification.',
      },
      {
        question: 'When is an NFC sticker better than a standard RFID label?',
        answer:
          'NFC stickers are usually the better starting point when the user interaction depends on a smartphone tap or a marketing experience rather than only operational scanning.',
      },
      {
        question: 'What details help the fastest NFC sample recommendation?',
        answer:
          'The most useful inputs are the tap scenario, the surface the sticker goes on, the visible design requirement and whether the project needs writable data or just a fixed link.',
      },
      {
        question: 'Can one project mix wristbands and stickers?',
        answer:
          'Yes. Some events and venues use wristbands for guest identity and access while also using stickers or labels for booths, packaging or promotional touchpoints.',
      },
    ],
    ctaTitle: 'Need wristbands, stickers or NFC products for an event or retail interaction?',
    ctaDescription:
      'Send the user interaction, timeline and preferred format. We can help narrow the right sample path for event access or NFC engagement.',
    whatsappMessage: 'Hi, I need RFID or NFC products for an event, retail or smart interaction project.',
  },
};

export const solutionPagesList = Object.values(solutionPages);
