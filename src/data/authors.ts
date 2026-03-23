import { getIntentContactHref } from '../utils/contact';

export interface AuthorProfile {
  id: string;
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  bio: string;
  expertise: string[];
  focusAreas: string[];
  profileHighlights: string[];
  profileLinks: Array<{
    href: string;
    label: string;
    description: string;
  }>;
  sameAs?: string[];
}

export const authors: AuthorProfile[] = [
  {
    id: 'proudtek-rfid-editorial-team',
    slug: 'proudtek-rfid-editorial-team',
    name: 'ProudTek RFID Editorial Team',
    role: 'Manufacturer editorial team',
    shortBio:
      'ProudTek publishes practical RFID guides to help buyers compare chips, product formats, sampling plans and sourcing options before production.',
    bio:
      'This editorial profile represents the ProudTek team responsible for educational content, buyer guides and category explainers across the website. The content focuses on practical product selection questions covering RFID cards, tags, labels, wristbands, keyfobs and readers, with an emphasis on compatibility, customization and sample planning.',
    expertise: [
      'RFID product selection',
      'NFC and HF card applications',
      'UHF tag and label deployment',
      'RFID sourcing and sample planning',
      'Access control credentials',
      'Laundry and industrial RFID tags',
    ],
    focusAreas: [
      'Helping buyers compare product families before requesting samples',
      'Explaining frequency, chip and protocol basics in plain language',
      'Connecting application content to real product and category pages',
      'Supporting sourcing conversations around MOQ, customization and compatibility',
    ],
    profileHighlights: [
      'Covers cards, tags, labels, wristbands, keyfobs and reader hardware',
      'Built for buyers, distributors, integrators and project teams',
      'Links research content directly to sample-ready product paths',
    ],
    profileLinks: [
      {
        href: '/blogs',
        label: 'Browse buyer guides',
        description: 'Read practical RFID, NFC and sourcing articles.',
      },
      {
        href: '/rfid-technology',
        label: 'Read the technology guide',
        description: 'Review standards, frequencies and selection basics.',
      },
      {
        href: getIntentContactHref('samples'),
        label: 'Ask about a live project',
        description: 'Share your use case and move into samples or quoting.',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/proudtek',
      'https://www.youtube.com/@proudtek',
    ],
  },
];

export function getAuthorById(id: string) {
  return authors.find((author) => author.id === id);
}
