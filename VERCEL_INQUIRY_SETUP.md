# Vercel Inquiry Setup

## 1. Connect the project to Vercel

- Import this repository into Vercel.
- Keep the default Astro build command: `npm run build`.

## 2. Choose one delivery path

### Option A: Resend email delivery

Set these environment variables in Vercel:

- `RESEND_API_KEY`
- `INQUIRY_FROM_EMAIL`
- `INQUIRY_TO_EMAIL`

Recommended example:

```env
RESEND_API_KEY=re_xxxxx
INQUIRY_FROM_EMAIL="ProudTek Website <inquiry@proudtek.com>"
INQUIRY_TO_EMAIL=info@proudtek.com
```

Before going live:

- Verify your sender domain in Resend.
- Replace the default `onboarding@resend.dev` sender with your verified domain.

### Option B: Webhook / CRM delivery

Set these environment variables in Vercel:

- `INQUIRY_WEBHOOK_URL`
- `INQUIRY_WEBHOOK_SECRET` (optional but recommended)

The webhook receives:

- `submissionId`
- `submittedAt`
- `payload`
- `meta`

## 3. Enable Vercel Web Analytics

- Open the project in Vercel.
- Enable Web Analytics in the dashboard.

This project already emits custom events such as:

- `inquiry_form_view`
- `inquiry_form_started`
- `inquiry_submit_success`
- `inquiry_submit_failed`
- `inquiry_thank_you_view`
- `Inquiry Submitted` (server-side)

## 4. Test after deploy

After deployment:

1. Open `/contact`
2. Submit a real test inquiry
3. Confirm the user lands on `/thank-you`
4. Confirm the inquiry arrives in email or your webhook
5. Confirm events appear in Vercel Analytics

## 5. Current behavior in development

If no delivery environment variables are set, local development uses a safe `log-only` mode so the form can still be tested without sending real email.
