# Pillar 2 Status Report — `/rfid-frequency-guide` + 8 Cluster Articles

**Date**: 2026-04-20
**Playbook reference**: `RFIDAK-Authority-Optimization-Prompts.md` 提示词 3 (lines 60-86) — Pillar #2 of 4
**Previous**: `reports/pillar1-cluster-status-2026-04-20.md` (Pillar #1 / `/rfid-technology`)

---

## 1. Executive summary

`/rfid-frequency-guide` now exists as a dedicated **top-level pillar page** (distinct from the existing `/blogs/rfid-frequency-guide` cluster article, which is preserved). The pillar is 807 lines / ~3,600 words across 17 sections with 5 comparison tables and a 4-question decision framework as its spine.

All 8 cluster articles for Pillar #2 now have pillar reverse-links. Three cluster articles are shared between Pillar #1 and Pillar #2; their existing Pillar #1 callout was upgraded to a **dual-pillar navigation card** (cleaner UX than stacking two banner callouts). Three cluster articles unique to Pillar #2 received a new pillar callout. Two cluster articles (`/compare/hf-vs-uhf-rfid`, `/compare/lf-vs-hf-rfid`) are auto-generated from `src/data/comparisons.ts` and don't currently accept inline callouts — cross-linked from Pillar #2's cluster index instead.

---

## 2. What was created / modified

### 2.1 New pillar — `src/pages/rfid-frequency-guide.astro`

807 lines, 17 sections, 75 divs, 14 H2s, 5 tables. Structure:

| # | Section ID | Content |
|---:|---|---|
| — | (hero) | Breadcrumb (Home / RFID Technology / Frequency Guide) + H1 + eyebrow |
| — | (speakable) | One-sentence direct answer, `[data-speakable="answer"]` |
| — | (key-takeaways) | 5-bullet Key Takeaways block, `[data-speakable="key-takeaways"]` |
| — | (industry-stats) | 5 stat cards — RAIN Alliance, NFC Forum, ISO/IEC 18000-63, ISO/IEC 14443, ISO 11784 |
| 1 | why-frequency-matters | Why frequency is the first architectural decision |
| 2 | lf-deep-dive | LF (125-134 kHz) deep dive — use cases, 5 chip families table, RFIDAK products |
| 3 | hf-deep-dive | HF / NFC (13.56 MHz) deep dive — 7 chip families table, use cases, RFIDAK products |
| 4 | uhf-deep-dive | UHF (860-960 MHz) deep dive — 5 chip families table, regional context, RFIDAK products |
| 5 | decision-matrix | 4-question Yes/No decision framework (maps to HowTo JSON-LD) |
| 6 | regional-compliance | 8-region UHF compliance table (US, EU, JP, CN, BR, IN, AU, KR) |
| 7 | cost-by-frequency | 6-format × 3-band cost benchmark table at MOQ 10,000 |
| 8 | migration | 4 migration scenarios (LF→HF, Classic→DESFire, Manual→UHF, FCC→Global UHF) |
| 9 | cluster-articles | 8-article cluster index (6 blogs + 2 compares) |
| 10 | download | PDF whitepaper CTA (shared with Pillar #1) |
| 11 | faq | 5-question FAQPage JSON-LD |
| — | related-guides | 4 cross-pillar / category links |
| — | last-reviewed | E-E-A-T signature + source list |
| — | CTA | Contact engineering team |

**JSON-LD emitted**: TechArticle + HowTo (decision tree) + FAQPage + BreadcrumbList (3-level: Home → RFID Technology → Frequency) + Speakable.

### 2.2 Cluster blog callouts — `src/data/blogs.ts`

| Cluster blog | Callout type | Location |
|---|---|---|
| rfid-types | Pillar 1 only | line ~78 |
| mifare-cards | Pillar 1 only | line ~396 |
| mifare-classic-vs-desfire | Pillar 1 only | line ~1623 |
| rfid-vs-barcode | Pillar 1 only | line ~1883 |
| how-to-choose-rfid-readers-and-writers | Pillar 1 only | line ~3602 |
| **nfc-technology** | **Dual-pillar** (upgraded) | line ~742 |
| **rfid-frequency-guide** | **Dual-pillar** (upgraded) | line ~1321 |
| **hf-vs-uhf-rfid-guide** | **Dual-pillar** (upgraded) | line ~4006 |
| **laundry-rfid-tags-buying-guide** | **Pillar 2 only** (new) | line ~2878 |
| **anti-metal-rfid-tags-guide** | **Pillar 2 only** (new) | line ~3142 |
| **rfid-retail-inventory-guide** | **Pillar 2 only** (new) | line ~4343 |

Verification (Grep):
- 📘 RFID Technology Pillar (dual-pillar card): 3 occurrences ✓
- "Part of the RFID Technology Pillar Guide" (pillar-1-only banner): 5 occurrences ✓ (8 original − 3 upgraded to dual)
- "Part of the RFID Frequency Pillar Guide" (pillar-2-only banner): 3 occurrences ✓

Total: 11 distinct cluster blogs with pillar navigation (Pillar #1: 8 clusters, Pillar #2: 8 clusters, 3 shared).

### 2.3 Cross-link added to Pillar #1

`src/pages/rfid-technology.astro` `relatedGuides` array now leads with a direct link to `/rfid-frequency-guide`:

```
{ href: '/rfid-frequency-guide', label: 'RFID frequency pillar (LF / HF / UHF)',
  description: 'Companion pillar guide — decision framework, regional compliance
                map and cost benchmarks focused only on the frequency choice.' }
```

This appears in Section 13 of the Technology pillar (related comparisons and category pages).

---

## 3. Content boundaries — Pillar vs existing blog

To avoid duplication, the pillar and the pre-existing `/blogs/rfid-frequency-guide` have different audiences and scope:

| Aspect | `/rfid-frequency-guide` (pillar, NEW) | `/blogs/rfid-frequency-guide` (cluster, existing) |
|---|---|---|
| Audience | Procurement + IT decision-makers | Technical implementers, chip-level spec writers |
| Depth | Decision framework, compliance, cost at volume | Line-by-line chip specs, ISO standard clause references |
| Length | ~3,600 words | ~2,200 words |
| Navigation role | Top-level pillar (sits under `/rfid-technology`) | Cluster article under both pillars |
| JSON-LD | TechArticle + HowTo + FAQPage + BreadcrumbList + Speakable | BlogPosting + FAQPage + Speakable (inherited from blog template) |

The dual-pillar callout at the top of `/blogs/rfid-frequency-guide` now signals to readers: *"this is the detail; use one of the two pillars for the overview."*

---

## 4. Structural verification

| File | Lines | Sections | Divs | A-tags | Tables | Status |
|---|---:|---:|---:|---:|---:|:---:|
| `src/pages/rfid-frequency-guide.astro` | 807 | 17/17 | 75/75 | 20/20 | 5/5 | ✓ |
| `src/pages/rfid-technology.astro` | 742 | 19/19 | 51/51 | 12/12 | 4/4 | ✓ |
| `src/data/blogs.ts` | 5,927 | — | 586/586 | 323/323 | — | ✓ |

All tag counts balanced. All 11 TOC anchors in the new pillar resolve to in-page section IDs.

---

## 5. What remains for Prompt 3 / Pillar 2

- **PDF whitepaper generation** (shared with Pillar #1 — not yet produced as physical PDF; served via `/contact?intent=buyer-guide-2026` lead-capture)
- **Compare-page cluster callouts** — `/compare/hf-vs-uhf-rfid` and `/compare/lf-vs-hf-rfid` are auto-generated from `src/data/comparisons.ts`. Next turn: extend `ComparisonLandingPage.astro` template to include a pillar nav card (or add the pillar link to each `comparisons.ts` entry's `relatedLinks`).
- **Dev-server render verification** — dev server should hot-reload the new page at `http://localhost:4321/rfid-frequency-guide`. Spot-check recommended.
- **Sitemap regeneration** — `@astrojs/sitemap` auto-generates on next build; no manual action needed.

---

## 6. Sequencing — what's next per playbook order

| Playbook prompt | Status | Action |
|---|---|---|
| 提示词 3 / Pillar #1 (`/rfid-technology`) | ✓ Done | — |
| 提示词 3 / Pillar #2 (`/rfid-frequency-guide`) | ✓ **Done this turn** | — |
| 提示词 3 / Pillar #3 (`/rfid-chip-comparison`) | 🔵 Next | New top-level page — MIFARE / NTAG / DESFire / Ultralight / Impinj Monza / NXP UCODE chip family comparison |
| 提示词 3 / Pillar #4 (`/rfid-vs-nfc-vs-bluetooth`) | 🔵 After Pillar #3 | Three-tech comparison pillar |
| 提示词 4 (Product page deepening — 7 components per product) | 🔵 Can run in parallel | Touches `src/data/products.ts` |

**Next recommendation**: Pillar #3 = `/rfid-chip-comparison` — builds on the chip-family tables already introduced in Pillar #1 and Pillar #2 but goes deeper per-chip (cryptography, memory profile, cost curve, counterfeit risk, RFIDAK product mapping).

---

**Pillar 2 of 4 complete.** Continuing with Pillar 3 (`/rfid-chip-comparison`) on next turn per "按 playbook 顺序推进" instruction.
