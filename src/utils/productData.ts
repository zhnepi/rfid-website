import type { Product, ProductDetailSection } from '../data/products';
import { normalizeText } from './content';

interface ProductSpecEntry {
  key: string;
  value: string;
}

function finalizeText(text = '') {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([([{])\s+/g, '$1')
    .replace(/\s+([)\]}])/g, '$1')
    .trim();
}

function normalizeTechnicalTerms(text = '') {
  return text
    .replace(/(\d+(?:\.\d+)?)\s*mhz\b/gi, '$1MHz')
    .replace(/(\d+(?:\.\d+)?)\s*khz\b/gi, '$1KHz')
    .replace(/\bdbi\b/gi, 'dBi')
    .replace(/\bev1\b/gi, 'EV1')
    .replace(/\bicode\b/gi, 'ICODE')
    .replace(/\bntag(?=\d)/gi, 'NTAG')
    .replace(/\bntag\b/gi, 'NTAG')
    .replace(/\bmifare\b/gi, 'MIFARE')
    .replace(/\bmifare\s+classic\b/gi, 'MIFARE Classic')
    .replace(/\bultralgiht\b/gi, 'Ultralight')
    .replace(/\bultralight\b(?=\s*(?:c|ev1)\b)/gi, 'Ultralight')
    .replace(/\bdesfire\b/gi, 'DESFire')
    .replace(/\bucode\b/gi, 'UCODE')
    .replace(/\b(\d+)k\b/g, '$1K');
}

function normalizeFrequencyRanges(text = '') {
  return text
    .replace(/\b(\d+(?:\.\d+)?)\s*MHz\s*-\s*(\d+(?:\.\d+)?)\s*MHz\b/g, '$1-$2MHz')
    .replace(/\b(\d+(?:\.\d+)?)\s*KHz\s*-\s*(\d+(?:\.\d+)?)\s*KHz\b/g, '$1-$2KHz');
}

function normalizeCatalogValue(text = '') {
  return finalizeText(
    normalizeFrequencyRanges(
      normalizeTechnicalTerms(
        text.replace(/([A-Za-z0-9.])\s+(LF|HF|UHF|NFC):/g, '$1; $2:')
      )
    )
  );
}

function cleanImportedText(text = '') {
  const cleaned = normalizeText(text)
    .replace(/\bProud\s*Tek RFID\b/gi, 'The RFID')
    .replace(/\bProudTek RFID\b/gi, 'The RFID')
    .replace(/\bProud\s*Tek'?s\b/gi, 'The')
    .replace(/\bProudTek'?s\b/gi, 'The')
    .replace(/\bProud\s*Tek is able to\b/gi, 'Can')
    .replace(/\bProudTek is able to\b/gi, 'Can')
    .replace(/\bProud\s*Tek\b/gi, 'The')
    .replace(/\bProudTek\b/gi, 'The')
    .replace(/\bfrom the global world\b/gi, 'worldwide')
    .replace(/\bperfect electrical performance\b/gi, 'stable electrical performance')
    .replace(/\bnew generation lead-frame production craft\b/gi, 'lead-frame production methods')
    .replace(/\bshowing very stable performance\b/gi, 'for stable performance')
    .replace(/\bFeatured with\b/gi, 'Designed with')
    .replace(/\bthe only way to open the tag is to cut off the cable\b/gi, 'the cable must be cut to remove the tag')
    .replace(/\bwhich will provide visual evidence of tamper\b/gi, 'which makes tampering visible')
    .replace(/\bthe management work of waste bins could be dramatically improved, reduced loss and save labor costs\b/gi, 'bin identification and collection records can be handled with less manual effort')
    .replace(/\bit is a perfect way to wood track\b/gi, 'it is well suited to wood tracking')
    .replace(/\bThis component contains\b/gi, 'It contains')
    .replace(/\bThe key transponder are\b/gi, 'The key transponder is')
    .replace(/\blead-frame production methods ensures consistent quality\b/gi, 'Lead-frame production methods help maintain consistent quality')
    .replace(/(\d(?:\.\d+)?)\s*[^\x00-\x7F]+\s*(\d(?:\.\d+)?)/g, '$1-$2')
    .replace(/[\u0080-\uFFFF]+/g, ' ');

  return normalizeCatalogValue(
    cleaned
      .replace(/(?<![A-Za-z0-9-])([+-]?\d+(?:\.\d+)?)\s*-\s*C\b/gi, '$1 deg C')
      .replace(/(?<![A-Za-z0-9-])([+-]?\d+(?:\.\d+)?)\s+C\b/gi, '$1 deg C')
      .replace(/([0-9])\s*~\s*([0-9])/g, '$1-$2')
  );
}

function preserveImportedSeparator(text = '') {
  return text.replace(/([A-Za-z)])\s*[^\x00-\x7F]{1,6}\s*([A-Za-z(])/g, '$1 - $2');
}

function cleanSpecKey(key: string) {
  return finalizeText(
    cleanImportedText(key)
      .replace(/\bInstalling\b/gi, 'Installation')
      .replace(/\bMounting ways\b/gi, 'Mounting')
      .replace(/\bWorking temperature\b/gi, 'Working Temperature')
      .replace(/\bStorage temperature\b/gi, 'Storage Temperature')
      .replace(/\bReading distance\b/gi, 'Reading Distance')
      .replace(/\bReading range\b/gi, 'Reading Range')
  );
}

function cleanTemperatureValue(raw: string) {
  const matches = raw.match(/[+-]?\d+(?:\.\d+)?/g);

  if (!matches || matches.length === 0) {
    return cleanImportedText(raw);
  }

  if (matches.length === 1) {
    return `${matches[0]} deg C`;
  }

  return `${matches[0]} deg C to ${matches[1]} deg C`;
}

function cleanDimensionValue(raw: string) {
  const hadLeadingMarker = /^[^\x00-\x7F]+/.test(raw);
  const cleaned = cleanImportedText(raw)
    .replace(hadLeadingMarker ? /^(\d)/ : /^$/, hadLeadingMarker ? 'Dia $1' : '')
    .replace(/\s*[xX*]\s*/g, ' x ')
    .replace(/:\s*/g, ': ')
    .replace(/\s*\/\s*/g, ' / ');

  return finalizeText(
    cleaned
      .replace(/\bDia\s+((?:\d+(?:\.\d+)?\s*\/\s*)+\d+(?:\.\d+)?)\s*mm\b/gi, (_, list: string) =>
        `Dia ${list
          .split(/\s*\/\s*/)
          .map((item) => `${item}mm`)
          .join(' / ')}`
      )
      .replace(/(?<=(?:mm|cm|m))\)(?=[,\s]|$)/gi, '')
      .replace(/\b(\d+(?:\.\d+)?)\s*mm\s*-\s*(\d+(?:\.\d+)?)\s*mm\b/gi, '$1-$2mm')
  );
}

function cleanSpecValue(key: string, value: string | number) {
  const raw = String(value);
  const lowerKey = key.toLowerCase();

  if (lowerKey.includes('temperature')) {
    return cleanTemperatureValue(raw);
  }

  if (lowerKey.includes('dimension') || lowerKey === 'size') {
    return cleanDimensionValue(raw);
  }

  return normalizeCatalogValue(
    cleanImportedText(raw)
      .replace(/:\s*/g, ': ')
      .replace(/(\d+(?:\.\d+)?)\s*MHZ\b/gi, '$1MHz')
      .replace(/(\d+(?:\.\d+)?)\s*KHZ\b/gi, '$1KHz')
      .replace(/(\d+(?:\.\d+)?)MHz\s*-\s*(\d+(?:\.\d+)?)Mhz/gi, '$1-$2MHz')
      .replace(/(\d+(?:\.\d+)?)MHz\s*-\s*(\d+(?:\.\d+)?)MHz/gi, '$1-$2MHz')
  );
}

export function getProductSpecificationEntries(product: Product): ProductSpecEntry[] {
  return Object.entries(product.specifications || {})
    .filter(([, value]) => typeof value === 'string' || typeof value === 'number')
    .map(([key, value]) => ({
      key: cleanSpecKey(key),
      value: cleanSpecValue(key, value),
    }))
    .filter((entry) => entry.key && entry.value);
}

export function getProductFeatureList(product: Product) {
  return (product.features || [])
    .map((feature) =>
      cleanImportedText(preserveImportedSeparator(feature))
        .replace(/^Frequency customizable - Can\b/i, 'Frequency can')
        .replace(/^Frequency can adjust the frequency by tuning the antenna design$/i, 'Frequency can be adjusted by tuning the antenna design')
    )
    .filter(Boolean);
}

export function getProductApplications(product: Product) {
  return (product.applications || [])
    .map((application) => cleanImportedText(preserveImportedSeparator(application)))
    .filter(Boolean);
}

export function getProductDetailSections(product: Product): ProductDetailSection[] {
  return (product.detailSections || [])
    .map((section) => ({
      ...section,
      title: cleanImportedText(section.title),
      content: cleanImportedText(section.content),
    }))
    .filter((section) => section.title || section.content);
}
