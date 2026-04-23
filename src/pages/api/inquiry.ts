import type { APIRoute } from 'astro';
import { track } from '@vercel/analytics/server';
import {
  classifyReferrer,
  collectRequestMeta,
  deliverInquiry,
  isLikelySpam,
  sanitizeInquiryPayload,
  validateInquiryPayload,
} from '../../utils/inquiry';

export const prerender = false;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

const isJsonRequest = (request: Request) => {
  const accept = request.headers.get('accept') || '';
  const contentType = request.headers.get('content-type') || '';
  const requestedWith = request.headers.get('x-requested-with') || '';

  return accept.includes('application/json')
    || contentType.includes('application/json')
    || requestedWith.toLowerCase() === 'xmlhttprequest';
};

const getRedirectPath = (origin: URL, intent: string, submissionId: string) => {
  const redirectUrl = new URL('/thank-you', origin);
  redirectUrl.searchParams.set('intent', intent || 'general');
  redirectUrl.searchParams.set('submission', submissionId);
  return redirectUrl;
};

const readRequestBody = async (request: Request) => {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const payload = await request.json();
    return typeof payload === 'object' && payload ? payload as Record<string, unknown> : {};
  }

  const formData = await request.formData();
  const body: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      body[key] = value;
    }
  });

  return body;
};

export const POST: APIRoute = async ({ request, redirect, url }) => {
  try {
    const rawBody = await readRequestBody(request);
    const payload = sanitizeInquiryPayload(rawBody);
    const submissionId = crypto.randomUUID();
    const meta = collectRequestMeta(request.headers, submissionId);
    const redirectUrl = getRedirectPath(url, payload.inquiryType, submissionId);

    if (isLikelySpam(payload)) {
      return isJsonRequest(request)
        ? json({ ok: true, redirectTo: redirectUrl.toString(), submissionId, spam: true })
        : redirect(redirectUrl.toString(), 303);
    }

    const errors = validateInquiryPayload(payload);

    if (errors.length > 0) {
      return isJsonRequest(request)
        ? json({ ok: false, errors }, 422)
        : new Response(errors[0], { status: 422 });
    }

    const delivery = await deliverInquiry(payload, meta, {
      resendApiKey: import.meta.env.RESEND_API_KEY,
      fromEmail: import.meta.env.INQUIRY_FROM_EMAIL || 'RFIDAK Website <onboarding@resend.dev>',
      toEmail: import.meta.env.INQUIRY_TO_EMAIL || 'info@rfidak.com',
      webhookUrl: import.meta.env.INQUIRY_WEBHOOK_URL,
      webhookSecret: import.meta.env.INQUIRY_WEBHOOK_SECRET,
      allowConsoleFallback: import.meta.env.DEV,
    });

    const referrerBucket = classifyReferrer(payload.referrerHost, payload.referrer);

    await track(
      'Inquiry Submitted',
      {
        inquiry_intent: payload.inquiryType,
        context_type: payload.contextType || 'none',
        delivery_mode: delivery.mode,
        referrer_bucket: referrerBucket,
        utm_source: payload.utmSource || 'none',
        utm_medium: payload.utmMedium || 'none',
      },
      { request }
    );

    return isJsonRequest(request)
      ? json({
          ok: true,
          redirectTo: redirectUrl.toString(),
          submissionId,
          deliveryMode: delivery.mode,
        })
      : redirect(redirectUrl.toString(), 303);
  } catch (error) {
    console.error('[api/inquiry] submission failed', error);

    return isJsonRequest(request)
      ? json(
          {
            ok: false,
            error: 'We could not submit your inquiry right now. Please try again or use the email / WhatsApp backup.',
          },
          500
        )
      : new Response('Unable to submit inquiry right now.', { status: 500 });
  }
};

export const GET: APIRoute = async () =>
  json(
    {
      ok: false,
      error: 'Method not allowed.',
    },
    405
  );
