import type { NavLink } from './navigation';

export interface EvidenceFaq {
  question: string;
  answer: string;
}

export interface EvidencePageConfig {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  highlights: Array<{
    title: string;
    description: string;
  }>;
  proofEyebrow: string;
  proofTitle: string;
  proofDescription: string;
  proofCards: Array<{
    title: string;
    description: string;
  }>;
  checklistEyebrow: string;
  checklistTitle: string;
  checklistDescription: string;
  checklist: string[];
  resourcesTitle: string;
  resourcesDescription: string;
  resources: NavLink[];
  faqs: EvidenceFaq[];
  ctaTitle: string;
  ctaDescription: string;
}

export const evidencePages: Record<string, EvidencePageConfig> = {
  certifications: {
    slug: 'certifications',
    title: 'RFID Certifications and Supplier Validation | RFIDAK',
    description:
      'Review RFIDAK certifications, supplier validation signals and the documents buyers often request before approving RFID cards, tags, labels and OEM projects.',
    keywords:
      'RFID certifications, RFID supplier validation, ISO 9001 RFID factory, ISO 14001 RFID manufacturer, RFIDAK certifications',
    heroEyebrow: 'Trust Signals',
    heroTitle: 'Certifications and supplier validation buyers often ask for before shortlisting an RFID factory',
    heroDescription:
      'Use this page when the team needs to review qualification and verification materials before samples, supplier approval or mass production planning.',
    highlights: [
      {
        title: 'Management-system confidence',
        description:
          'Useful for buyers who need to confirm that production and environmental management are being handled under recognized systems.',
      },
      {
        title: 'Procurement-ready documents',
        description:
          'Helpful when sourcing teams need certificate copies, supplier details and factory information for onboarding or internal approval.',
      },
      {
        title: 'Project-fit verification',
        description:
          'Certifications are strongest when combined with samples, compatibility checks and product-level testing for the real use case.',
      },
    ],
    proofEyebrow: 'What Buyers Usually Confirm',
    proofTitle: 'How certifications support supplier evaluation in real RFID buying conversations',
    proofDescription:
      'For most buyers, certifications are not the final decision by themselves. They become more useful when they sit alongside quality-control explanations, sample plans and a clear manufacturing scope.',
    proofCards: [
      {
        title: 'ISO 9001',
        description:
          'Shows that buyers are dealing with a factory that has an established quality-management framework instead of only a loose trading process.',
      },
      {
        title: 'ISO 14001',
        description:
          'Relevant for importers and enterprise buyers who need environmental-management signals during supplier review.',
      },
      {
        title: 'SGS or third-party verification',
        description:
          'Useful when procurement teams want an added layer of third-party supplier or factory validation before onboarding.',
      },
      {
        title: 'Scope matching',
        description:
          'Buyers should still confirm that the scope of the supplier and the product family fit the actual RFID project being planned.',
      },
    ],
    checklistEyebrow: 'Buyer Checklist',
    checklistTitle: 'What to request when certifications are part of supplier approval',
    checklistDescription:
      'Use the checklist below to keep certification review tied to the real project instead of treating it like a generic trust badge.',
    checklist: [
      'Request the latest certificate copy and verify the legal entity name matches the supplier you are speaking with.',
      'Confirm the scope and issuing body rather than assuming every certificate covers every product line equally.',
      'Ask how quality-control steps relate to the actual RFID product you plan to sample or purchase.',
      'If the project is highly sensitive, pair certification review with live samples, reader compatibility checks and production checkpoints.',
      'Use supplier validation together with commercial details like lead time, MOQ, export experience and communication quality.',
    ],
    resourcesTitle: 'Related Trust Pages',
    resourcesDescription:
      'Open the pages below if supplier validation still needs QC, sample-policy or live-project context.',
    resources: [
      {
        href: '/quality-control',
        name: 'Quality control workflow',
        description: 'See how incoming materials, encoding and final inspection are handled.',
      },
      {
        href: '/sample-policy',
        name: 'Sample policy',
        description: 'Review how stock samples, custom samples and pilot quantities are usually handled.',
      },
      {
        href: '/contact#contactForm',
        name: 'Talk to sales',
        description: 'Request current certificate copies or discuss validation requirements for a live project.',
      },
    ],
    faqs: [
      {
        question: 'Are certifications enough to approve an RFID supplier?',
        answer:
          'Usually no. Certifications help with supplier screening, but buyers still need to review samples, compatibility, communication quality and production fit for the exact project.',
      },
      {
        question: 'What certifications matter most for many RFID sourcing teams?',
        answer:
          'ISO 9001 is often the baseline quality-management signal. ISO 14001 can also matter when buyers have environmental review requirements, and some teams also ask for third-party verification such as SGS.',
      },
      {
        question: 'Should I ask for product-specific test information as well?',
        answer:
          'Yes. Product-specific checks such as chip verification, encoding accuracy, material suitability and packaging review are often more important than general supplier certificates once the project moves into sampling.',
      },
      {
        question: 'When should I discuss certifications with RFIDAK?',
        answer:
          'The best time is during supplier shortlisting or before internal procurement approval, especially if your company has onboarding or vendor-compliance steps.',
      },
    ],
    ctaTitle: 'Need supplier documents before you request samples?',
    ctaDescription:
      'Share your company\'s supplier-review requirements and we can point you to the right supporting information for the stage your project is in.',
  },
  'quality-control': {
    slug: 'quality-control',
    title: 'RFID Quality Control and Testing Workflow | RFIDAK',
    description:
      'Learn how RFIDAK approaches RFID quality control across materials, chip verification, encoding checks, print inspection and final packing review.',
    keywords:
      'RFID quality control, RFID testing process, RFID card quality check, RFID tag inspection, encoding verification RFID',
    heroEyebrow: 'Quality Control',
    heroTitle: 'How buyers can think about RFID quality control before approving samples or mass production',
    heroDescription:
      'Use this page to review the checkpoints buyers usually ask about around materials, chip handling, encoding, print consistency and shipment preparation.',
    highlights: [
      {
        title: 'Incoming-material review',
        description:
          'Helpful for projects where chip family, substrate, enclosure or print materials must match an approved specification.',
      },
      {
        title: 'Encoding and serialization checks',
        description:
          'Important when UID programming, numbering, barcodes or other variable-data steps are part of the order.',
      },
      {
        title: 'Final inspection before shipment',
        description:
          'Buyers often want to know how finished products are reviewed before packing and export.',
      },
    ],
    proofEyebrow: 'Inspection Workflow',
    proofTitle: 'The checkpoints buyers usually ask about in RFID production',
    proofDescription:
      'Quality conversations become more concrete when they move beyond general claims and into the actual checkpoints that protect compatibility, readability and shipment consistency.',
    proofCards: [
      {
        title: 'Chip and protocol confirmation',
        description:
          'Useful when the project depends on a specific chip family, memory structure or reader compatibility requirement.',
      },
      {
        title: 'Print and visual checks',
        description:
          'Relevant for branded cards, labels and credentials where artwork, numbering or visible coding must remain consistent.',
      },
      {
        title: 'Functional sample review',
        description:
          'Projects involving anti-metal tags, laundry tags or custom credentials benefit from testing samples in the real environment before scale-up.',
      },
      {
        title: 'Packing and shipment preparation',
        description:
          'Final review matters when buyers need correct labeling, lot separation, quantity control and export-ready packaging.',
      },
    ],
    checklistEyebrow: 'What To Ask',
    checklistTitle: 'Questions buyers should clarify before approving production',
    checklistDescription:
      'Use the questions below to turn a generic quality promise into something that fits the real project and its risk points.',
    checklist: [
      'Ask how chip type, frequency or protocol is confirmed before the run starts.',
      'Clarify whether serialization, barcodes, UID writing or other variable data will be checked during production or only at the end.',
      'For harsh environments, ask what sample tests are recommended before bulk approval.',
      'Confirm how finished goods are counted, separated and packed when multiple SKUs or encoded batches are involved.',
      'If your project is compatibility-sensitive, make sure sample approval criteria are documented before moving into production.',
    ],
    resourcesTitle: 'Useful Next Steps',
    resourcesDescription:
      'Open the pages below if quality control still needs to be reviewed alongside supplier validation and sample planning.',
    resources: [
      {
        href: '/certifications',
        name: 'Supplier certifications',
        description: 'Review supplier-level trust signals and validation context.',
      },
      {
        href: '/sample-policy',
        name: 'Sample policy',
        description: 'See how sampling can be used to validate fit before scale-up.',
      },
      {
        href: '/contact#contactForm',
        name: 'Discuss your QC priorities',
        description: 'Send your product, quantity and risk points so we can talk through the workflow.',
      },
    ],
    faqs: [
      {
        question: 'Why is sample testing still important if a supplier has quality procedures?',
        answer:
          'Because many RFID projects fail at the compatibility or environment stage, not at the generic production stage. Sample testing proves the product fits the actual reader, surface and workflow.',
      },
      {
        question: 'What quality checks matter most for encoded RFID products?',
        answer:
          'Chip selection, data-writing accuracy, visible numbering consistency and final batch separation usually matter most when encoding or serialization is involved.',
      },
      {
        question: 'Should quality discussions be different for cards, tags and labels?',
        answer:
          'Yes. Cards may focus more on print, finish and encoding, while industrial tags often depend more heavily on environment fit, attachment method and reading performance.',
      },
      {
        question: 'When should I raise quality-control questions with RFIDAK?',
        answer:
          'Ideally before sample approval or bulk quotation, especially if your buyer team already knows which checks are commercially critical for the project.',
      },
    ],
    ctaTitle: 'Need to align samples, QC checkpoints and production goals?',
    ctaDescription:
      'Send your application, reader requirement and order plan. We can help identify the quality checkpoints that matter most before production begins.',
  },
  'sample-policy': {
    slug: 'sample-policy',
    title: 'RFID Sample Policy and Pilot-Order Guidance | RFIDAK',
    description:
      'Understand how RFIDAK approaches standard samples, custom samples, pilot quantities and the information buyers should share before ordering RFID samples.',
    keywords:
      'RFID sample policy, RFID samples, RFID pilot order, custom RFID sample, RFID sampling process',
    heroEyebrow: 'Sample Planning',
    heroTitle: 'What buyers should know about RFID samples before moving into bulk production',
    heroDescription:
      'Use this page to decide when stock samples, customized samples or pilot runs make the most sense before placing a larger order.',
    highlights: [
      {
        title: 'Stock-sample evaluation',
        description:
          'Best when buyers first need to confirm the general product direction or compare several form factors quickly.',
      },
      {
        title: 'Custom-sample review',
        description:
          'Useful when chip matching, artwork, numbering, encoding or a special material must be validated before approval.',
      },
      {
        title: 'Pilot-to-production flow',
        description:
          'Helpful for projects that want to reduce risk before moving from sample approval into repeatable production.',
      },
    ],
    proofEyebrow: 'Sample Types',
    proofTitle: 'How buyers usually choose between standard samples, custom samples and pilot quantities',
    proofDescription:
      'Not every project needs the same sample path. The right choice depends on whether the real question is product direction, compatibility or final production details.',
    proofCards: [
      {
        title: 'Standard samples',
        description:
          'Good for comparing size, material, mounting style or general use-case fit before locking the exact specification.',
      },
      {
        title: 'Custom samples',
        description:
          'More suitable when the project needs a specific chip, printed design, UID handling, packaging note or attachment method.',
      },
      {
        title: 'Pilot quantities',
        description:
          'Useful when internal teams need a limited run for operational testing, user trials or system validation before bulk production.',
      },
      {
        title: 'Production lock-in',
        description:
          'Once the approved sample is clear, it becomes much easier to align mass-production details and reduce avoidable changes later.',
      },
    ],
    checklistEyebrow: 'Before You Ask For Samples',
    checklistTitle: 'Details that make sample recommendations much faster',
    checklistDescription:
      'The more practical context you share up front, the easier it becomes to suggest a useful sample set instead of generic pieces.',
    checklist: [
      'Share the product family you are considering and the environment where it will be used.',
      'If compatibility matters, include chip, protocol, reader model or a photo of the current credential when possible.',
      'If appearance matters, mention artwork, numbering, color or packaging expectations early.',
      'Explain whether you need a quick comparison sample or a sample that mirrors the final production design.',
      'State whether the project is still exploratory or already close to a pilot run or bulk order.',
    ],
    resourcesTitle: 'Pages To Review Before Sampling',
    resourcesDescription:
      'Open the pages below when sample planning also needs supplier evidence and delivery expectations.',
    resources: [
      {
        href: '/quality-control',
        name: 'Quality control workflow',
        description: 'See how sample approval can connect to production checkpoints.',
      },
      {
        href: '/shipping-and-incoterms',
        name: 'Shipping and incoterms',
        description: 'Review delivery and logistics topics that often follow sample approval.',
      },
      {
        href: '/contact#contactForm',
        name: 'Request samples',
        description: 'Send your use case and we can suggest a sample path.',
      },
    ],
    faqs: [
      {
        question: 'Should I start with standard samples or custom samples?',
        answer:
          'Start with standard samples when you are still comparing formats. Move to custom samples when final chip choice, print, numbering or environment fit must be validated.',
      },
      {
        question: 'When is a pilot quantity better than a single sample?',
        answer:
          'A pilot quantity makes more sense when the project needs a small operational run for internal testing, user trials or system validation before bulk production.',
      },
      {
        question: 'Why do RFID samples sometimes need more project detail than ordinary products?',
        answer:
          'Because RFID products can fail for compatibility reasons even when the format looks correct. Reader type, material, mounting surface and encoding requirements all matter early.',
      },
      {
        question: 'Can RFIDAK help buyers narrow the sample list?',
        answer:
          'Yes. If you share the application, reader requirement and any customization needs, RFIDAK can usually recommend a more focused sample path.',
      },
    ],
    ctaTitle: 'Ready to request RFID samples with a clearer plan?',
    ctaDescription:
      'Share your use case, chip requirement, quantity goal and timeline. We can help decide whether you need stock samples, custom samples or a pilot batch.',
  },
  'shipping-and-incoterms': {
    slug: 'shipping-and-incoterms',
    title: 'RFID Shipping, Export Terms and Incoterms | RFIDAK',
    description:
      'Review shipping topics buyers often discuss with RFIDAK, including export terms, delivery planning, packaging expectations and international order coordination.',
    keywords:
      'RFID shipping terms, RFID export shipping, RFID incoterms, RFID supplier delivery terms, RFIDAK shipping',
    heroEyebrow: 'Shipping And Delivery',
    heroTitle: 'Shipping and incoterms buyers often clarify before they approve an RFID order',
    heroDescription:
      'Use this page when samples or quotations are getting closer to a real order and delivery terms, export planning, packaging or paperwork still need to be clarified.',
    highlights: [
      {
        title: 'Trade-term clarity',
        description:
          'Important for buyers who need a clean discussion around responsibility, freight planning and landed-cost comparison.',
      },
      {
        title: 'Packaging and shipment prep',
        description:
          'Useful when projects require lot separation, export labeling or controlled packing arrangements.',
      },
      {
        title: 'Practical delivery planning',
        description:
          'Helpful for buyers who need to align production, inspection and shipping windows with their project schedule.',
      },
    ],
    proofEyebrow: 'What Buyers Usually Confirm',
    proofTitle: 'The delivery topics that matter most once a quote becomes a real project',
    proofDescription:
      'Shipping questions are easiest to solve when they are raised before the order is locked, especially if the project involves custom work, multiple SKUs or a tight rollout schedule.',
    proofCards: [
      {
        title: 'Incoterm alignment',
        description:
          'Buyers often need to clarify whether the discussion is around EXW, FOB, CIF, DDP or another export arrangement before comparing costs.',
      },
      {
        title: 'Lead-time coordination',
        description:
          'Production timing and shipping timing should be reviewed together, especially for custom cards, tags, labels or encoded orders.',
      },
      {
        title: 'Packing expectations',
        description:
          'Important when the order needs separated batches, carton marks, product grouping or buyer-specific handling notes.',
      },
      {
        title: 'Document preparation',
        description:
          'Some buyers need export documents, packing clarity or importer-facing details aligned before dispatch.',
      },
    ],
    checklistEyebrow: 'Delivery Checklist',
    checklistTitle: 'Questions to settle before shipment is arranged',
    checklistDescription:
      'Use the checklist below to reduce avoidable delays or misunderstandings once the goods are ready to move.',
    checklist: [
      'State your destination country and whether you already have a preferred freight arrangement or importer workflow.',
      'Clarify which incoterm you want to quote against before comparing suppliers.',
      'Mention if the shipment includes multiple SKUs, encoded lots or packaging rules that affect packing.',
      'Align production lead time and shipping window together rather than treating them as separate decisions.',
      'If delivery timing is critical, confirm which order details must be frozen before production starts.',
    ],
    resourcesTitle: 'Pages Buyers Often Review Next',
    resourcesDescription:
      'Open the pages below when delivery planning still needs to be tied back to supplier review and sample approval.',
    resources: [
      {
        href: '/sample-policy',
        name: 'Sample policy',
        description: 'Review how sample and pilot stages usually lead into delivery planning.',
      },
      {
        href: '/quality-control',
        name: 'Quality control workflow',
        description: 'See how inspection and shipment readiness fit together.',
      },
      {
        href: '/contact#contactForm',
        name: 'Discuss delivery terms',
        description: 'Send your destination, quantity and timing so we can talk through shipping options.',
      },
    ],
    faqs: [
      {
        question: 'Why should incoterms be discussed early in an RFID project?',
        answer:
          'Because trade terms affect cost comparison, responsibility and timeline expectations. Buyers avoid confusion when they define this before approving the order.',
      },
      {
        question: 'What shipping details matter most for custom RFID products?',
        answer:
          'Custom work often needs closer coordination around production completion, inspection readiness, batch separation and document timing before shipment.',
      },
      {
        question: 'Should shipping be discussed before or after samples?',
        answer:
          'The full shipping plan usually comes later, but it is smart to raise destination, urgency and trade-term expectations early so the quotation path stays realistic.',
      },
      {
        question: 'Can RFIDAK help buyers talk through delivery planning during quotation?',
        answer:
          'Yes. Once the project direction, quantity and destination are clearer, RFIDAK can discuss practical delivery considerations alongside the quote.',
      },
    ],
    ctaTitle: 'Need to align quote, lead time and delivery terms?',
    ctaDescription:
      'Send your destination market, expected quantity and preferred trade term. We can help make the quotation and shipping discussion cleaner from the start.',
  },
};
