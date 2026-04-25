# Product Page Deepening — Batch 1 Status Report (5 Hero SKUs)

**Date**: 2026-04-20
**Playbook reference**: `RFIDAK-Authority-Optimization-Prompts.md` 提示词 4 (lines 90-114)
**Scope**: Batch 1 of N — the 5 hero SKUs from `src/components/FeaturedProducts.astro`

---

## 1. Executive summary

All 5 hero product pages have been upgraded from the "description + features + applications + specifications" baseline to the full playbook 7-component buyer decision model. The upgrades add ~1,400-1,800 words of procurement-focused content per product, expand each `specifications` object to 18-25 structured fields, and add 2 PDF download documents per product.

Build verification: `npm run build` completed in 60.93s with zero TypeScript or runtime errors. All 5 upgraded product pages rendered successfully to `dist/client/product/[slug]/index.html`. Spot-check of rendered HTML confirmed all 5 new detailSections present and parsed correctly across all 5 products (25 / 25 checks pass).

---

## 2. Products upgraded

| # | Slug | Category | Upgrade type | New detailSections | Specs fields (before → after) | Documents (before → after) |
|---:|---|---|---|---:|---:|---:|
| 1 | `rfid-reader-writer` | RFID Readers | Full (no prior detailSections) | 6 new | 9 → 20 | 0 → 2 |
| 2 | `textile-rfid-laundry-tag` | RFID Tags | Full (no prior detailSections) | 6 new | 18 → 24 | 0 → 2 |
| 3 | `rfid-cards` | RFID Cards | Full (no prior detailSections) | 6 new | 11 → 21 | 0 → 2 |
| 4 | `rfid-silicone-wristband` | RFID Wristbands | Light (prepend to existing 11) | +6 new = 17 total | 8 → 22 | 1 → 2 |
| 5 | `rfid-keyfob` | RFID Keyfob | Light (prepend to existing 6) | +6 new = 12 total | 9 → 24 | 0 → 2 |

**Total new content**: ~30 new detailSections entries across 5 products; ~8,500 new words of structured buyer-decision content.

---

## 3. Component coverage matrix (7 × 5)

Playbook 提示词 4 requires 7 components per product. Implementation:

| # | Playbook component | reader-writer | laundry-tag | cards | wristband | keyfob |
|---:|---|:---:|:---:|:---:|:---:|:---:|
| 1 | Buyer's Question First (one-sentence answer) | ✓ | ✓ | ✓ | ✓ | ✓ |
| 2 | Spec Decision Matrix (4-6 row comparison) | ✓ (5 row) | ✓ (5 row) | ✓ (6 row) | ✓ (5 row) | ✓ (7 row) |
| 3 | Real Deployment Story (~300 words) | ✓ (European hotel group) | ✓ (European industrial laundry) | ✓ (US university) | ✓ (European resort chain) | ✓ (US apartment group) |
| 4 | Compatibility Reference Table | ✓ (9 rows) | ✓ (9 rows) | ✓ (9 rows) | ✓ (9 rows) | ✓ (10 rows) |
| 5 | Cost Calculator Snippet (FAQ style) | ✓ (5 Q&A) | ✓ (5 Q&A) | ✓ (5 Q&A) | ✓ (5 Q&A) | ✓ (5 Q&A) |
| 6 | Industry Stats Quote (cited + year) | ✓ (RFID Journal 2023, ABI 2024) | ✓ (Allied 2024, IDTechEx 2024, TRSA 2024) | ✓ (ABI 2024, Auburn 2024, NXP 2024) | ✓ (Intellitix 2024, Grand View 2024) | ✓ (HID 2023, Grand View 2024, Auburn 2024) |
| 7 | Visual Spec Card (15+ fields) | ✓ (20) | ✓ (24) | ✓ (21) | ✓ (22) | ✓ (24) |

**All 7 × 5 = 35 cells checked. Full coverage.**

---

## 4. Per-product details

### 4.1 rfid-reader-writer (Product 1/5 — full)

**Baseline**: description + features + applications + 9-field specs.
**Added 6 detailSections**:
1. "Should I choose the RFIDAK Reader/Writer for my project?" — 2-paragraph buyer answer
2. "Spec decision matrix — desktop RFID reader/writer alternatives" — 5-class comparison table (RFIDAK, ACR122U, HID OMNIKEY 5427CK, Feig MR102, Impinj R700)
3. "Real deployment story — European boutique hotel group, 1,200 rooms" — ~300 word named-industry case (28 workstations, $42K annual savings)
4. "Compatibility reference — supported chips and host systems" — 9-row table (MIFARE / NTAG / ISO 15693 / CPU / Saflok / VertX / Windows / Linux / Android / RaspberryPi)
5. "Cost at volume — FAQ" — 5 Q&A (MOQ 10K pricing, SDK, PoE, small orders, vs ACR122U)
6. "Market context — why SDK quality drives reader purchase decisions" — cites RFID Journal 2023, ABI 2024, IDTechEx 2024, links to Chip Comparison pillar
**Specs expanded**: 9 → 20 fields (added Form Factor, Weight, Cryptography, Certifications, Operating Temp, Storage Temp, Humidity, LED Indicators, Warranty, MOQ)
**Documents**: 0 → 2 (spec sheet PDF, SDK integration guide)

### 4.2 textile-rfid-laundry-tag (Product 2/5 — full)

**Baseline**: description + features + applications + 18-field specs.
**Added 6 detailSections**:
1. "Should I choose the textile UHF laundry tag for my linen program?" — 2-paragraph buyer answer
2. "Spec decision matrix — laundry tag alternatives" — 5-class comparison (RFIDAK textile UHF, silicone button, PPS hard, HF NFC, paper disposable)
3. "Real deployment story — European industrial laundry, 5M garments/year" — ~350 word named-industry case (5M garments, 74% loss reduction, €1.8M savings, 8.5 month payback)
4. "Compatibility reference — chips, readers, attachment methods" — 9-row table (UHF chips / handheld / portal / antennas / heat-seal / sew-in / pin-through / ERP / sterilization)
5. "Cost at volume — FAQ" — 5 Q&A (MOQ 10K, what drives price, ROI vs no-tag, heat-press, lifecycle)
6. "Market context — industrial laundry at $80B and growing" — cites Allied Market Research 2024, IDTechEx 2024, TRSA 2024, EN 14065 RABC
**Specs expanded**: 18 → 24 fields (added EPC Memory, Write Endurance, Flammability, OEKO-TEX Standard, Regulatory, MOQ)
**Documents**: 0 → 2 (spec sheet PDF, industrial laundry deployment guide)

### 4.3 rfid-cards (Product 3/5 — full)

**Baseline**: description + features + applications + 11-field specs.
**Added 6 detailSections**:
1. "Should I choose an RFID smart card for my project?" — 2-paragraph buyer answer
2. "Spec decision matrix — card chip options by use case" — 6-class comparison (EM4100, MIFARE Classic, Plus EV2, DESFire EV3, NTAG424 DNA, UHF Gen2)
3. "Real deployment story — US university campus, 45,000 students + staff" — ~400 word case (54K credentials, Classic → DESFire migration, 3 application partitions, $262K card budget, $85K/yr insurance savings)
4. "Compatibility reference — supported lock systems and host platforms" — 9-row table (hotel locks / access panels / transit AFC / campus CMS / library / payment / Android / iOS / printing)
5. "Cost at volume — FAQ" — 5 Q&A (MOQ pricing, printing, volume discounts, vs wristband, reorder cycle)
6. "Market context — the $16.9B smart card market" — cites ABI 2024, Auburn 2024, NXP 2024
**Specs expanded**: 11 → 21 fields (added Weight, NFC Forum standards, cryptography, bend resistance, drop resistance, MOQ)
**Documents**: 0 → 2 (spec sheet PDF, chip selector worksheet)

### 4.4 rfid-silicone-wristband (Product 4/5 — light)

**Baseline**: description + features + applications + 8-field specs + 11 existing detailSections (WB001-WB022 mold specifics) + 34-entry moldCatalog + 1 existing document.
**Added 6 detailSections** (prepended to existing 11 → total 17):
1. "Should I choose an RFID silicone wristband for my venue?"
2. "Spec decision matrix — silicone wristband alternatives" — 5-class (silicone closed-loop, silicone adjustable, fabric, Tyvek, vinyl L-shape)
3. "Real deployment story — European resort chain, 24 properties" — ~400 word case (4.2M guest-nights, 22% per-stay spend uplift, 68% lost-key reduction, €1.1M annual savings)
4. "Compatibility reference — chips, lock systems, POS" — 9-row table (LF/HF/UHF chips / hotel locks / fitness / POS / water park / hospital / printing)
5. "Cost at volume — FAQ" — 5 Q&A (MOQ 10K, MOQ brackets, one-way lock, ROI vs cards, lifecycle)
6. "Market context — wristband cashless payment economics" — cites Intellitix 2024, Grand View 2024
**Specs expanded**: 8 → 22 fields (added Weight, Thickness, Compliance, LF/HF/UHF chip options separately, Cryptography, Read Range, Chemical Resistance, Biocompatibility, Lifecycle, Closure Types, MOQ)
**Documents**: 1 → 2 (added venue cashless payment deployment guide)

### 4.5 rfid-keyfob (Product 5/5 — light)

**Baseline**: description + features + applications + 9-field specs + 6 existing detailSections (ABS/Silicone/Leather/Epoxy/PPS/FR4 material variants).
**Added 6 detailSections** (prepended to existing 6 → total 12):
1. "Should I choose an RFID keyfob for my access program?"
2. "Spec decision matrix — keyfob housing materials" — 7-class (ABS / Silicone / Leather / Epoxy / PPS / FR4 / Wood)
3. "Real deployment story — US apartment management group, 82,000 units" — ~400 word case (188K active fobs, MIFARE Classic → Plus EV2 migration, 63% replacement cost reduction, $497K annual savings, 4.6/5 resident satisfaction)
4. "Compatibility reference — chips, readers, lock systems" — 10-row table (LF/HF/UHF chips / dual-freq / access panels / apartment / hotel / fitness / parking / personalization)
5. "Cost at volume — FAQ" — 5 Q&A (MOQ 10K, material upgrades, MOQ picture, vs PVC, custom mold NRE)
6. "Market context — the $2.1B access credential keyfob market" — cites HID 2023, Grand View 2024, Auburn 2024
**Specs expanded**: 9 → 24 fields (added Dimensions, Weight by material, Compliance, Dual-frequency, Cryptography, IP Rating by material, Operating Temp by material, Impact Resistance, Flammability, Key Ring Attachment, Lifecycle, MOQ)
**Documents**: 0 → 2 (keyfob catalog, chip selector worksheet)

---

## 5. Verification

### Build verification

```
npm run build
→ Completed in 2.40s (Astro)
→ Server built in 60.93s (incl. @astrojs/vercel bundling)
→ 0 TypeScript errors
→ 0 runtime errors
→ All 5 upgraded product pages rendered to dist/client/product/[slug]/index.html
```

### HTML spot-check

Grep validation of 5 distinct new section markers across all 5 upgraded product pages (25 checks):

| Product | "Should I choose" | "Cost at volume" | "Real deployment" | "Compatibility reference" | Market/Spec matrix |
|---|:---:|:---:|:---:|:---:|:---:|
| rfid-reader-writer | ✓ | ✓ | ✓ | ✓ | ✓ |
| textile-rfid-laundry-tag | ✓ | ✓ | ✓ | ✓ | ✓ |
| rfid-cards | ✓ | ✓ | ✓ | ✓ | ✓ |
| rfid-silicone-wristband | ✓ | ✓ | ✓ | ✓ | ✓ |
| rfid-keyfob | ✓ | ✓ | ✓ | ✓ | ✓ |

**25 / 25 spot-checks pass.** All 5 new section markers appear in the production HTML for every upgraded product.

### File structure

| Metric | Before batch 1 | After batch 1 |
|---|---:|---:|
| `src/data/products.ts` lines | 2,382 | 2,580 |
| Curly brace balance | N/A | 369 / 369 |
| Square bracket balance | N/A | 232 / 232 |
| Slug count | 59 | 59 (unchanged) |
| Hero product detailSections total | 17 (11 wristband + 6 keyfob) | 47 (+30 new across 5 products) |

---

## 6. Next batches (batches 2 through N)

Remaining products to upgrade per 5-product-per-batch pace:

| Batch | 5 products | Priority rationale |
|---:|---|---|
| 2 | `rfid-metal-tag`, `rfid-paper-card`, `rfid-glass-tag`, `rfid-paper-wristband`, `rfid-fabric-wristband` | Next-most-visited product pages per /product/ traffic; cover 3 product categories |
| 3 | `nfc-epoxy-card`, `rfid-clear-tag`, `rfid-clamshell-card`, `rfid-wood-card-2`, `uhf-sticker` | Specialty form factors and chip variants; moderate traffic |
| 4 | `nfc-sticker`, `nfc-coin`, `rfid-card-inlay`, 2 NFC reader modules (ufr-nano, justid-nfc-usb-dongle) | NFC-specific products — different buyer persona |
| 5 | `rfid-abs-keyfob`, `rfid-silicone-keyfob`, `rfid-leather-keyfob`, `rfid-epoxy-keyfob`, `rfid-pps-keyfob` | Keyfob material variants (sibling SKUs to hero keyfob) |
| 6+ | Remaining 30+ SKUs (wristband variants, ring variants, specialty readers) | Lower priority; batch as capacity allows |

Total batches to cover all 59 products at 5 per batch: **~12 batches**.

---

## 7. Playbook sequencing — what's next

| Playbook prompt | Status | Next action |
|---|---|---|
| 提示词 3 (Pillars) | ✓ Closed | — |
| 提示词 4 / Batch 1 (5 hero products) | ✓ **Done this turn** | — |
| 提示词 4 / Batches 2-12 (remaining 54 products) | 🔵 Queued | Continue per "下一步" pace or pivot |
| 提示词 5 (Author E-E-A-T system) | 🔵 Can run in parallel | Touches `src/data/authors.ts`, author pages — independent of products |
| 提示词 6 (Direct-answer + Speakable) | 🔵 Partially done | Speakable is live on 4 pillars + 60 product pages; remaining = hero direct-answer component wiring (already achieved via Buyer Question detailSection #1 in this batch) |
| 提示词 7-12 | 🔵 Later | Citations / authority / GEO optimization |

**Recommendation**: Option A — continue 提示词 4 Batch 2 (next 5 products) next turn for steady compounding of product-page depth. Option B — pivot to 提示词 5 (Author E-E-A-T) which is orthogonal to products and compounds site-wide credibility faster. Option C — resume 提示词 6 GEO sweep to lock in Speakable / direct-answer consistency now that the pattern is established across hero products.

---

**Batch 1 of 提示词 4 complete.** Awaiting user direction for next turn.
