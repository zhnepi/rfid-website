import { track } from '@vercel/analytics/server';
export { renderers } from '../../renderers.mjs';

const inquiryTypeOptions = [
  "samples",
  "oem",
  "compatibility",
  "repeat-order",
  "chip-comparison",
  "frequency-comparison",
  "product-format-comparison",
  "laundry-tag-comparison",
  "general"
];
const allowedInquiryTypes = new Set(inquiryTypeOptions);
const singleLine = (value, maxLength) => String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
const multiLine = (value, maxLength) => String(value ?? "").replace(/\r\n/g, "\n").trim().slice(0, maxLength);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
function sanitizeInquiryPayload(input) {
  const normalizedInquiryType = singleLine(input.inquiryType, 48);
  return {
    name: singleLine(input.name, 80),
    email: singleLine(input.email, 160).toLowerCase(),
    inquiryType: allowedInquiryTypes.has(normalizedInquiryType) ? normalizedInquiryType : "general",
    preferredContact: singleLine(input.preferredContact, 40),
    company: singleLine(input.company, 120),
    country: singleLine(input.country, 80),
    product: singleLine(input.product, 80),
    quantityRange: singleLine(input.quantityRange, 48),
    subject: singleLine(input.subject, 140),
    message: multiLine(input.message, 3e3),
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
    website: singleLine(input.website, 120)
  };
}
function validateInquiryPayload(payload) {
  const errors = [];
  if (!payload.name) errors.push("Please enter your name.");
  if (!payload.email || !emailRegex.test(payload.email)) errors.push("Please enter a valid email address.");
  if (!payload.subject || payload.subject.length < 5) errors.push("Please add a subject with at least 5 characters.");
  if (!payload.message || payload.message.length < 20) errors.push("Please add more project detail before sending.");
  if (!allowedInquiryTypes.has(payload.inquiryType)) errors.push("Please choose a valid inquiry type.");
  return errors;
}
function isLikelySpam(payload) {
  return Boolean(payload.website);
}
function collectRequestMeta(headers, submissionId) {
  return {
    ipAddress: singleLine((headers.get("x-forwarded-for") || "").split(",")[0], 120),
    userAgent: singleLine(headers.get("user-agent"), 240),
    forwardedHost: singleLine(headers.get("x-forwarded-host") || headers.get("host"), 160),
    country: singleLine(headers.get("x-vercel-ip-country"), 8),
    region: singleLine(headers.get("x-vercel-ip-country-region"), 80),
    city: singleLine(headers.get("x-vercel-ip-city"), 120),
    submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
    submissionId
  };
}
async function deliverInquiry(payload, meta, config) {
  {
    {
      throw new Error("No inquiry delivery channel is configured. Set RESEND_API_KEY with INQUIRY_FROM_EMAIL, or set INQUIRY_WEBHOOK_URL.");
    }
  }
}

const prerender = false;
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  }
});
const isJsonRequest = (request) => {
  const accept = request.headers.get("accept") || "";
  const contentType = request.headers.get("content-type") || "";
  const requestedWith = request.headers.get("x-requested-with") || "";
  return accept.includes("application/json") || contentType.includes("application/json") || requestedWith.toLowerCase() === "xmlhttprequest";
};
const getRedirectPath = (origin, intent, submissionId) => {
  const redirectUrl = new URL("/thank-you", origin);
  redirectUrl.searchParams.set("intent", intent || "general");
  redirectUrl.searchParams.set("submission", submissionId);
  return redirectUrl;
};
const readRequestBody = async (request) => {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const payload = await request.json();
    return typeof payload === "object" && payload ? payload : {};
  }
  const formData = await request.formData();
  const body = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") {
      body[key] = value;
    }
  });
  return body;
};
const POST = async ({ request, redirect, url }) => {
  try {
    const rawBody = await readRequestBody(request);
    const payload = sanitizeInquiryPayload(rawBody);
    const submissionId = crypto.randomUUID();
    const meta = collectRequestMeta(request.headers, submissionId);
    const redirectUrl = getRedirectPath(url, payload.inquiryType, submissionId);
    if (isLikelySpam(payload)) {
      return isJsonRequest(request) ? json({ ok: true, redirectTo: redirectUrl.toString(), submissionId, spam: true }) : redirect(redirectUrl.toString(), 303);
    }
    const errors = validateInquiryPayload(payload);
    if (errors.length > 0) {
      return isJsonRequest(request) ? json({ ok: false, errors }, 422) : new Response(errors[0], { status: 422 });
    }
    const delivery = await deliverInquiry(payload, meta, {
      resendApiKey: undefined                              ,
      fromEmail: undefined                                   || "ProudTek Website <onboarding@resend.dev>",
      toEmail: undefined                                 || "info@proudtek.com",
      webhookUrl: undefined                                   ,
      webhookSecret: undefined                                      ,
      allowConsoleFallback: false
    });
    await track(
      "Inquiry Submitted",
      {
        inquiry_intent: payload.inquiryType,
        context_type: payload.contextType || "none",
        delivery_mode: delivery.mode
      },
      { request }
    );
    return isJsonRequest(request) ? json({
      ok: true,
      redirectTo: redirectUrl.toString(),
      submissionId,
      deliveryMode: delivery.mode
    }) : redirect(redirectUrl.toString(), 303);
  } catch (error) {
    console.error("[api/inquiry] submission failed", error);
    return isJsonRequest(request) ? json(
      {
        ok: false,
        error: "We could not submit your inquiry right now. Please try again or use the email / WhatsApp backup."
      },
      500
    ) : new Response("Unable to submit inquiry right now.", { status: 500 });
  }
};
const GET = async () => json(
  {
    ok: false,
    error: "Method not allowed."
  },
  405
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
