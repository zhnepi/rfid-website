# /public/downloads

Buyer-facing documents that the site links to directly. Anything dropped here is publicly accessible at `https://www.rfidak.com/downloads/<filename>`.

## Certificate scans (referenced from /certifications)

The certifications page expects these files. Upload the real scans (PDF preferred, PNG acceptable) with exactly these filenames — then edit `src/data/evidencePages.ts` and replace each `PLACEHOLDER-*` certificate number / issue date / expiry date with the real values printed on the physical certificate.

| Filename | What it should contain |
|---|---|
| `rfidak-iso-9001-certificate.pdf` | ISO 9001:2015 (Quality Management System) — issued to Shenzhen RFIDAK Co., LTD |
| `rfidak-iso-14001-certificate.pdf` | ISO 14001:2015 (Environmental Management System) — issued to Shenzhen RFIDAK Co., LTD |
| `rfidak-sgs-factory-audit.pdf` | SGS on-site factory audit report |
| `rfidak-ce-declaration-of-conformity.pdf` | CE Declaration of Conformity (EN 300 330 / EN 302 208) |
| `rfidak-fcc-part-15-test-report.pdf` | FCC Part 15 Subpart C test report |
| `rfidak-rohs-statement.pdf` | EU RoHS compliance statement (2011/65/EU + 2015/863) |

## Checklist before publish

- [ ] Scan each certificate at 300 DPI minimum; flatten to single PDF per cert
- [ ] Redact / blur any sensitive internal-only fields (internal inspection stamps, etc.)
- [ ] Confirm the legal entity name "Shenzhen RFIDAK Co., LTD" is clearly visible on each scan
- [ ] Confirm the certificate number is legible (this must match the value in evidencePages.ts)
- [ ] Confirm the issue date and expiry date are legible
- [ ] Upload to this folder with exactly the filename listed above
- [ ] Edit `src/data/evidencePages.ts` `certificateRegistry.records` entries:
  - Replace each `PLACEHOLDER-*` with the real cert number
  - Update `issueDate` and `expiryDate` (ISO 8601 format, e.g. `2024-03-15`)
  - Verify the `verifyUrl` for each cert points to the issuer's public registry
- [ ] After deploy, open https://www.rfidak.com/certifications and click every "View certificate" and "Verify with issuer" link to confirm all 6 work end to end

## Other buyer documents (future)

- `rfidak-company-profile.pdf` — 1-page company overview for buyers to share internally
- `rfidak-product-catalog-2026.pdf` — product range catalog
- `rfidak-chip-selector-worksheet.pdf` — fillable form for buyers specifying chip + memory + format
