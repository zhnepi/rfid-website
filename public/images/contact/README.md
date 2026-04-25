# /public/images/contact

Contact-page-specific images. Public URL: `https://www.rfidak.com/images/contact/<filename>`.

## Pending uploads

| Filename | What it should be | Size | Notes |
|---|---|---|---|
| `rfidak-wechat-qr.png` | WeChat QR code for the sales account | 400 × 400 px, transparent PNG | Export from WeChat → My Account → QR Code → Save to photo. Until uploaded, the contact page gracefully hides the image area. |
| `rfidak-wechat-work-qr.png` | WeChat Work (企业微信) QR for enterprise buyers | 400 × 400 px, transparent PNG | Optional; not yet referenced in code. |

## How to generate WeChat QR

1. Open WeChat on the sales phone
2. Profile (Me) → tap your QR icon (next to nickname)
3. Menu ⋯ → Save Image
4. Transfer to desktop, rename to `rfidak-wechat-qr.png`
5. Drop into this folder
6. The contact page will start showing the QR automatically — no code change needed.

## Security note

WeChat QR is semi-public (anyone who scans can request to add), but refresh it every 6 months as a precaution. If the sales WhatsApp / WeChat account ever rotates, update this file + the `content` field for the WeChat entry in `src/pages/contact.astro`.
