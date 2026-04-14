import { marketLinks } from './markets';

export interface NavLink {
  name: string;
  href: string;
  description?: string;
}

export interface HeaderNavItem extends NavLink {
  submenu?: NavLink[];
  activePrefixes?: string[];
}

export const productCategoryLinks: NavLink[] = [
  { name: 'RFID Cards', href: '/category/rfid-cards', description: 'Access cards, hotel key cards, NFC cards and card inlays.' },
  { name: 'RFID Tags', href: '/category/rfid-tags', description: 'Industrial, laundry, anti-metal and asset tracking tags.' },
  { name: 'RFID Labels', href: '/category/rfid-labels', description: 'NFC stickers, UHF labels and tamper-evident labels.' },
  { name: 'RFID Wristbands', href: '/category/rfid-wristbands', description: 'Silicone, disposable and hospitality wristbands.' },
  { name: 'RFID Keyfobs', href: '/category/rfid-keyfob', description: 'Portable access credentials and key tags.' },
  { name: 'RFID Readers', href: '/category/rfid-readers', description: 'Desktop readers, reader writers and OEM modules.' },
];

export const guideLinks: NavLink[] = [
  { name: 'RFID Technology Guide', href: '/rfid-technology', description: 'Understand LF, HF/NFC, UHF and product selection basics.' },
  { name: 'Buyer Guides & Blog', href: '/blogs', description: 'Read sourcing guides, application notes and compatibility articles.' },
  { name: 'Comparison Pages', href: '/compare', description: 'Compare chips, credential formats, labels vs tags and HF vs UHF decision paths.' },
  { name: 'Use Case Solutions', href: '/solutions', description: 'Jump into hotel, laundry, asset-tracking and library-specific RFID landing pages.' },
  { name: 'Markets And Regions', href: '/markets', description: 'Explore buyer-oriented landing pages for North America, Europe and Middle East sourcing paths.' },
  { name: 'Product Families', href: '/products', description: 'Compare product groups before going into the full catalog.' },
  { name: 'Full Catalog', href: '/rfid', description: 'Browse the image-first catalog across all RFID SKUs.' },
];

export const evidenceLinks: NavLink[] = [
  { name: 'Certifications', href: '/certifications', description: 'Review supplier validation signals buyers often request before shortlisting.' },
  { name: 'Quality Control', href: '/quality-control', description: 'See how materials, encoding and final inspection are usually reviewed.' },
  { name: 'Sample Policy', href: '/sample-policy', description: 'Understand standard samples, custom samples and pilot-quantity planning.' },
  { name: 'Shipping Terms', href: '/shipping-and-incoterms', description: 'Clarify delivery planning, export terms and shipment expectations.' },
];

export const headerNavItems: HeaderNavItem[] = [
  { name: 'Home', href: '/', activePrefixes: ['/'] },
  { name: 'About', href: '/about', activePrefixes: ['/about'] },
  {
    name: 'Products',
    href: '/products',
    submenu: productCategoryLinks,
    activePrefixes: ['/products', '/rfid', '/product', '/category'],
  },
  { name: 'Guide', href: '/rfid-technology', activePrefixes: ['/rfid-technology', '/compare', '/markets', '/solutions'] },
  { name: 'Blog', href: '/blogs', activePrefixes: ['/blogs'] },
  { name: 'Contact', href: '/contact', activePrefixes: ['/contact'] },
];

export const quickNavLinks: HeaderNavItem[] = [
  { name: 'Product Families', href: '/products', activePrefixes: ['/products'] },
  { name: 'Full Catalog', href: '/rfid', activePrefixes: ['/rfid', '/product', '/category'] },
  { name: 'RFID Cards', href: '/category/rfid-cards', activePrefixes: ['/category/rfid-cards'] },
  { name: 'RFID Tags', href: '/category/rfid-tags', activePrefixes: ['/category/rfid-tags'] },
  { name: 'RFID Labels', href: '/category/rfid-labels', activePrefixes: ['/category/rfid-labels'] },
  { name: 'RFID Wristbands', href: '/category/rfid-wristbands', activePrefixes: ['/category/rfid-wristbands'] },
  { name: 'RFID Readers', href: '/category/rfid-readers', activePrefixes: ['/category/rfid-readers'] },
];

export const footerQuickLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Product Families', href: '/products' },
  { name: 'Full Catalog', href: '/rfid' },
  { name: 'RFID Technology Guide', href: '/rfid-technology' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Markets', href: '/markets' },
  { name: 'Comparisons', href: '/compare' },
  { name: 'Buyer Guides', href: '/blogs' },
  { name: 'Contact Us', href: '/contact?intent=samples#contactForm' },
];

export { marketLinks };
