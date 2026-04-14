export const inquiryTypeOptions = [
  'samples',
  'oem',
  'compatibility',
  'repeat-order',
  'chip-comparison',
  'frequency-comparison',
  'product-format-comparison',
  'laundry-tag-comparison',
  'general',
] as const;

export type InquiryType = (typeof inquiryTypeOptions)[number];

export interface InquiryPayload {
  name: string;
  email: string;
  inquiryType: InquiryType;
  preferredContact: string;
  company: string;
  country: string;
  product: string;
  quantityRange: string;
  subject: string;
  message: string;
  contextType: string;
  contextSlug: string;
  contextName: string;
  contextPage: string;
  sourcePath: string;
  sourcePageTitle: string;
  landingPage: string;
  referrer: string;
  referrerHost: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  msclkid: string;
  fbclid: string;
  timezone: string;
  browserLanguage: string;
  website: string;
}

export interface InquiryRequestMeta {
  ipAddress: string;
  userAgent: string;
  forwardedHost: string;
  country: string;
  region: string;
  city: string;
  submittedAt: string;
  submissionId: string;
}

export interface InquiryDeliveryConfig {
  resendApiKey?: string;
  fromEmail?: string;
  toEmail?: string;
  webhookUrl?: string;
  webhookSecret?: string;
  allowConsoleFallback?: boolean;
}

export interface InquiryDeliveryResult {
  mode: 'resend' | 'webhook' | 'resend+webhook' | 'log-only';
  emailDelivered: boolean;
  webhookDelivered: boolean;
}

const allowedInquiryTypes = new Set<string>(inquiryTypeOptions);

const singleLine = (value: unknown, maxLength: number) =>
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const multiLine = (value: unknown, maxLength: number) =>
  String(value ?? '')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, maxLength);

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export function sanitizeInquiryPayload(input: Record<string, unknown>): InquiryPayload {
  const normalizedInquiryType = singleLine(input.inquiryType, 48);

  return {
    name: singleLine(input.name, 80),
    email: singleLine(input.email, 160).toLowerCase(),
    inquiryType: (allowedInquiryTypes.has(normalizedInquiryType) ? normalizedInquiryType : 'general') as InquiryType,
    preferredContact: singleLine(input.preferredContact, 40),
    company: singleLine(input.company, 120),
    country: singleLine(input.country, 80),
    product: singleLine(input.product, 80),
    quantityRange: singleLine(input.quantityRange, 48),
    subject: singleLine(input.subject, 140),
    message: multiLine(input.message, 3000),
    contextType: singleLine(input.contextType, 40),
    contextSlug: singleLine(input.contextSlug, 120),
    contextName: singleLine(input.contextName, 160),
    contextPage: singleLine(input.contextPage, 300),
    sourcePath: singleLine(input.sourcePath, 240),
    sourcePageTitle: singleLine(input.sourcePageTitle, 200),
    landingPage: singleLine(input.landingPage, 300),
    referrer: singleLine(input.referrer, 300),
    referrerHost: singleLine(input.referrerHost, 160),
    utmSource: singleLine(input.utmSource, 120),
    utmMedium: singleLine(input.utmMedium, 120),
    utmCampaign: singleLine(input.utmCampaign, 160),
    utmTerm: singleLine(input.utmTerm, 160),
    utmContent: singleLine(input.utmContent, 160),
    gclid: singleLine(input.gclid, 200),
    msclkid: singleLine(input.msclkid, 200),
    fbclid: singleLine(input.fbclid, 200),
    timezone: singleLine(input.timezone, 80),
    browserLanguage: singleLine(input.browserLanguage, 48),
    website: singleLine(input.website, 120),
  };
}

export function validateInquiryPayload(payload: InquiryPayload) {
  const errors: string[] = [];

  if (!payload.name) errors.push('Please enter your name.');
  if (!payload.email || !emailRegex.test(payload.email)) errors.push('Please enter a valid email address.');
  if (!payload.subject || payload.subject.length < 5) errors.push('Please add a subject with at least 5 characters.');
  if (!payload.message || payload.message.length < 20) errors.push('Please add more project detail before sending.');
  if (!allowedInquiryTypes.has(payload.inquiryType)) errors.push('Please choose a valid inquiry type.');

  return errors;
}

export function isLikelySpam(payload: InquiryPayload) {
  return Boolean(payload.website);
}

export function collectRequestMeta(headers: Headers, submissionId: string): InquiryRequestMeta {
  return {
    ipAddress: singleLine((headers.get('x-forwarded-for') || '').split(',')[0], 120),
    userAgent: singleLine(headers.get('user-agent'), 240),
    forwardedHost: singleLine(headers.get('x-forwarded-host') || headers.get('host'), 160),
    country: singleLine(headers.get('x-vercel-ip-country'), 8),
    region: singleLine(headers.get('x-vercel-ip-country-region'), 80),
    city: singleLine(headers.get('x-vercel-ip-city'), 120),
    submittedAt: new Date().toISOString(),
    submissionId,
  };
}

export function buildInquiryText(payload: InquiryPayload, meta: InquiryRequestMeta) {
  const lines = [
    `Submission ID: ${meta.submissionId}`,
    `Submitted At: ${meta.submittedAt}`,
    meta.forwardedHost ? `Host: ${meta.forwardedHost}` : '',
    meta.ipAddress ? `IP Address: ${meta.ipAddress}` : '',
    meta.country ? `Country: ${meta.country}` : '',
    meta.region ? `Region: ${meta.region}` : '',
    meta.city ? `City: ${meta.city}` : '',
    meta.userAgent ? `User Agent: ${meta.userAgent}` : '',
    '',
    'CONTACT DETAILS',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : '',
    payload.country ? `Country / Region: ${payload.country}` : '',
    payload.preferredContact ? `Preferred Contact: ${payload.preferredContact}` : '',
    '',
    'INQUIRY DETAILS',
    `Inquiry Type: ${payload.inquiryType}`,
    payload.product ? `Product Interest: ${payload.product}` : '',
    payload.quantityRange ? `Estimated Quantity: ${payload.quantityRange}` : '',
    `Subject: ${payload.subject}`,
    '',
    'MESSAGE',
    payload.message,
    '',
    'ATTRIBUTION',
    payload.contextType ? `Context Type: ${payload.contextType}` : '',
    payload.contextName ? `Context Name: ${payload.contextName}` : '',
    payload.contextSlug ? `Context Slug: ${payload.contextSlug}` : '',
    payload.contextPage ? `Context Page: ${payload.contextPage}` : '',
    payload.sourcePath ? `Source Path: ${payload.sourcePath}` : '',
    payload.sourcePageTitle ? `Source Page Title: ${payload.sourcePageTitle}` : '',
    payload.landingPage ? `First Landing Page: ${payload.landingPage}` : '',
    payload.referrer ? `Referrer: ${payload.referrer}` : '',
    payload.referrerHost ? `Referrer Host: ${payload.referrerHost}` : '',
    payload.utmSource ? `UTM Source: ${payload.utmSource}` : '',
    payload.utmMedium ? `UTM Medium: ${payload.utmMedium}` : '',
    payload.utmCampaign ? `UTM Campaign: ${payload.utmCampaign}` : '',
    payload.utmTerm ? `UTM Term: ${payload.utmTerm}` : '',
    payload.utmContent ? `UTM Content: ${payload.utmContent}` : '',
    payload.gclid ? `GCLID: ${payload.gclid}` : '',
    payload.msclkid ? `MSCLKID: ${payload.msclkid}` : '',
    payload.fbclid ? `FBCLID: ${payload.fbclid}` : '',
    payload.timezone ? `Timezone: ${payload.timezone}` : '',
    payload.browserLanguage ? `Browser Language: ${payload.browserLanguage}` : '',
  ];

  return lines.filter(Boolean).join('\n');
}

export function buildInquiryHtml(payload: InquiryPayload, meta: InquiryRequestMeta) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h1 style="font-size:22px;margin:0 0 16px">New website inquiry</h1>
      <p style="margin:0 0 16px"><strong>Submission ID:</strong> ${escapeHtml(meta.submissionId)}<br /><strong>Submitted At:</strong> ${escapeHtml(meta.submittedAt)}</p>
      <h2 style="font-size:16px;margin:24px 0 8px">Contact details</h2>
      <p style="margin:0 0 16px">
        <strong>Name:</strong> ${escapeHtml(payload.name)}<br />
        <strong>Email:</strong> ${escapeHtml(payload.email)}<br />
        ${payload.company ? `<strong>Company:</strong> ${escapeHtml(payload.company)}<br />` : ''}
        ${payload.country ? `<strong>Country / Region:</strong> ${escapeHtml(payload.country)}<br />` : ''}
        ${payload.preferredContact ? `<strong>Preferred Contact:</strong> ${escapeHtml(payload.preferredContact)}<br />` : ''}
      </p>
      <h2 style="font-size:16px;margin:24px 0 8px">Inquiry details</h2>
      <p style="margin:0 0 16px">
        <strong>Inquiry Type:</strong> ${escapeHtml(payload.inquiryType)}<br />
        ${payload.product ? `<strong>Product Interest:</strong> ${escapeHtml(payload.product)}<br />` : ''}
        ${payload.quantityRange ? `<strong>Estimated Quantity:</strong> ${escapeHtml(payload.quantityRange)}<br />` : ''}
        <strong>Subject:</strong> ${escapeHtml(payload.subject)}
      </p>
      <h2 style="font-size:16px;margin:24px 0 8px">Message</h2>
      <pre style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px">${escapeHtml(payload.message)}</pre>
      <h2 style="font-size:16px;margin:24px 0 8px">Attribution</h2>
      <pre style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px">${escapeHtml(buildInquiryText(payload, meta).split('\nATTRIBUTION\n')[1] || '')}</pre>
    </div>
  `;
}

async function sendViaResend(
  payload: InquiryPayload,
  meta: InquiryRequestMeta,
  config: InquiryDeliveryConfig
) {
  if (!config.resendApiKey || !config.fromEmail || !config.toEmail) {
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.toEmail],
      reply_to: payload.email,
      subject: `[Website Inquiry] ${payload.subject}`,
      text: buildInquiryText(payload, meta),
      html: buildInquiryHtml(payload, meta),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend delivery failed: ${response.status} ${errorText}`);
  }

  return true;
}

async function sendViaWebhook(
  payload: InquiryPayload,
  meta: InquiryRequestMeta,
  config: InquiryDeliveryConfig
) {
  if (!config.webhookUrl) {
    return false;
  }

  const response = await fetch(config.webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(config.webhookSecret ? { 'x-proudtek-webhook-secret': config.webhookSecret } : {}),
    },
    body: JSON.stringify({
      submissionId: meta.submissionId,
      submittedAt: meta.submittedAt,
      payload,
      meta,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Webhook delivery failed: ${response.status} ${errorText}`);
  }

  return true;
}

export async function deliverInquiry(
  payload: InquiryPayload,
  meta: InquiryRequestMeta,
  config: InquiryDeliveryConfig
): Promise<InquiryDeliveryResult> {
  let emailDelivered = false;
  let webhookDelivered = false;

  if (!config.resendApiKey && !config.webhookUrl) {
    if (!config.allowConsoleFallback) {
      throw new Error('No inquiry delivery channel is configured. Set RESEND_API_KEY with INQUIRY_FROM_EMAIL, or set INQUIRY_WEBHOOK_URL.');
    }

    console.info('[inquiry:log-only]', {
      submissionId: meta.submissionId,
      payload,
      meta,
    });

    return {
      mode: 'log-only',
      emailDelivered: false,
      webhookDelivered: false,
    };
  }

  if (config.resendApiKey) {
    emailDelivered = await sendViaResend(payload, meta, config);
  }

  if (config.webhookUrl) {
    webhookDelivered = await sendViaWebhook(payload, meta, config);
  }

  return {
    mode: emailDelivered && webhookDelivered ? 'resend+webhook' : emailDelivered ? 'resend' : 'webhook',
    emailDelivered,
    webhookDelivered,
  };
}
