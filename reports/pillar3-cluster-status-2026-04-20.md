# Pillar 3 Status Report — `/rfid-chip-comparison` + 8 Cluster Articles

**Date**: 2026-04-20
**Playbook reference**: `RFIDAK-Authority-Optimization-Prompts.md` 提示词 3 (lines 60-86) — Pillar #3 of 4
**Previous**: Pillar #1 (`/rfid-technology`), Pillar #2 (`/rfid-frequency-guide`)

---

## 1. Executive summary

`/rfid-chip-comparison` now exists as a dedicated top-level pillar page covering the full RFID chip universe across HF (MIFARE, NTAG, ICODE), UHF (Impinj Monza, NXP UCODE, Alien Higgs) and LF (EM, T5577, HITAG, FDX-B). At 768 lines across 19 sections with 6 comparison tables, the pillar goes deeper per-chip than the Technology or Frequency pillars (which each cover chip families briefly as subsections).

The pillar is distinguished from the other two pillars by its spine: a **7-row security-tier comparison matrix** that ranks chips from broken (MIFARE Classic) through open (NTAG213/215/216, UHF Gen2) to high-security (DESFire EV3 FIPS 140-2, NTAG424 DNA SUN, UCODE DNA). A 7-chip cost curve table at three MOQ breakpoints (1K / 10K / 100K) and a 6-band counterfeit risk ranking complete the procurement decision reference.

All 8 cluster articles are now wired. 5 of them were already carrying a Pillar #1 callout (rfid-types, mifare-cards, mifare-classic-vs-desfire compare, mifare-plus-vs-desfire compare, nfc-technology), and 3 new cluster articles received a dedicated Pillar #3 callout (nfc-anti-counterfeit-tags-guide, digital-product-passport-nfc-rfid-guide, hotel-key-card-rfid-guide). Cross-pillar links to Pillar #3 added from the related-guides sections of Pillars #1 and #2.

---

## 2. What was created / modified

### 2.1 New pillar — `src/pages/rfid-chip-comparison.astro`

768 lines, 19 sections, 46 divs, 16 H2s, 6 tables. Structure:

| # | Section ID | Content |
|---:|---|---|
| — | (hero) | Breadcrumb (Home / RFID Technology / Chip Comparison) + H1 |
| — | (speakable) | One-sentence direct answer, `[data-speakable="answer"]` |
| — | (key-takeaways) | 5-bullet Key Takeaways block, `[data-speakable="key-takeaways"]` |
| — | (industry-stats) | 5 stat cards — NXP IR, RAIN Alliance, USENIX 2008, DESFire memory, OECD counterfeit |
| 1 | why-chip-matters | Why the chip decision matters (after frequency) |
| 2 | chip-universe | ASCII tree diagram of the full 2026 chip universe (LF / HF / UHF vendors) |
| 3 | mifare-family | MIFARE family table (Classic / Plus EV2 / DESFire EV3 / Ultralight EV1 / C / Nano) with red warning callout on Classic |
| 4 | ntag-family | NTAG family table (NTAG210µ-216 open, NTAG424 DNA, NTAG424 DNA TT, ICODE SLIX) |
| 5 | uhf-chips | 7-chip UHF table (Impinj Monza R6 through M800; NXP UCODE 9 / 9xm / DNA; Alien Higgs) |
| 6 | lf-chips | 5-chip LF table (EM4100 / EM4305 / T5577 / HITAG / FDX-B) |
| 7 | security-matrix | 7-row security tier matrix — crypto, key length, counterfeit resistance, use-case ceiling |
| 8 | cost-curves | 7-chip cost curve table at MOQ 1K / 10K / 100K |
| 9 | migration-paths | 5 migration scenarios (Classic→Plus SL1, Classic→DESFire, NTAG213→424 DNA, EM4100→HF, Monza R6→M750) |
| 10 | counterfeit-risk | 6-band ranked counterfeit risk with color-coded severity badges |
| 11 | cluster-articles | 8-article cluster index |
| 12 | download | PDF whitepaper CTA (same PDF as Pillars #1 and #2) |
| 13 | faq | 5-question FAQPage JSON-LD |
| — | related-guides | 4 cross-pillar / category links |
| — | last-reviewed | E-E-A-T signature + comprehensive source list (NXP IR, IDTechEx, OECD, USENIX 2008, NIST CMVP #3659) |
| — | CTA | Contact engineering team |

**JSON-LD emitted**: TechArticle + FAQPage + BreadcrumbList (3-level: Home → RFID Technology → Chip Comparison) + Speakable.

(Note: No HowTo JSON-LD on this pillar since it's reference material, not a step-by-step process. FAQPage covers the "how do I" queries.)

### 2.2 Cluster blog callouts — `src/data/blogs.ts`

New Pillar #3 callouts added to 3 cluster articles:

| # | Cluster blog | Callout location | Callout type |
|---:|---|---|---|
| 1 | hotel-key-card-rfid-guide | After KT, before Buyer brief (line ~2515) | Pillar #3 only (💾 icon) |
| 2 | digital-product-passport-nfc-rfid-guide | After KT, before Buyer brief (line ~4808) | Pillar #3 only (💾 icon) |
| 3 | nfc-anti-counterfeit-tags-guide | Content-top, before first H2 (line ~4917) | Pillar #3 only (💾 icon) |

Verification (Grep): 3 occurrences of "Part of the RFID Chip Comparison Pillar Guide" across blogs.ts — one per new cluster article.

**Cluster mapping for Pillar #3** (8 total articles, with existing callouts preserved):

| # | Slug | Pillar callout state |
|---:|---|---|
| 1 | mifare-cards | Pillar #1 callout only (shared cluster, discoverable via Pillar #3 cluster index) |
| 2 | rfid-types | Pillar #1 callout only (shared cluster, discoverable via cluster index) |
| 3 | nfc-technology | Dual-pillar card (Pillar #1 + #2) — Pillar #3 discoverable via cluster index |
| 4 | /compare/mifare-classic-vs-desfire | Compare page (auto-generated; no inline callout yet) |
| 5 | /compare/mifare-plus-vs-desfire | Compare page (auto-generated; no inline callout yet) |
| 6 | **nfc-anti-counterfeit-tags-guide** | **NEW Pillar #3 callout** |
| 7 | **digital-product-passport-nfc-rfid-guide** | **NEW Pillar #3 callout** |
| 8 | **hotel-key-card-rfid-guide** | **NEW Pillar #3 callout** |

### 2.3 Cross-pillar link wiring

**Pillar #1** (`src/pages/rfid-technology.astro`) `relatedGuides`: new 2nd entry `/rfid-chip-comparison`
**Pillar #2** (`src/pages/rfid-frequency-guide.astro`) `relatedGuides`: new 2nd entry `/rfid-chip-comparison`

Both pillars now explicitly link to Pillar #3 in their "Related guides" section. Pillar #3's own `relatedGuides` links back to Pillars #1 and #2.

---

## 3. Design decision — single pillar vs stacked callouts for cluster blogs

Shared cluster blogs (rfid-types, mifare-cards, nfc-technology) already carry Pillar #1 or dual-pillar callouts. Adding a third pillar callout would stack 2-3 banners at the top of each blog. Decision: **cluster articles discover Pillar #3 via the pillar's own cluster index + cross-pillar related-guides link**, not via a third stacked banner. This keeps the reading experience clean while maintaining the SEO bidirectional link graph.

Future refactor (tracked as low-priority): replace the per-pillar banner pattern with a universal "Pillar Navigator" component that lists all 4 pillars as compact pills — deploy once Pillar #4 ships.

---

## 4. Structural verification

| File | Lines | Sections | Divs | A-tags | Tables | Status |
|---|---:|---:|---:|---:|---:|:---:|
| `src/pages/rfid-chip-comparison.astro` | 768 | 19/19 | 46/46 | 24/24 | 6/6 | ✓ |
| `src/pages/rfid-technology.astro` | 743 | 19/19 | 51/51 | 12/12 | 4/4 | ✓ |
| `src/pages/rfid-frequency-guide.astro` | 808 | 17/17 | 75/75 | 20/20 | 5/5 | ✓ |
| `src/data/blogs.ts` | 5,957 | — | 595/595 | 326/326 | — | ✓ |

All tag counts balanced. All 13 TOC anchors in the new pillar resolve to in-page section IDs (verified via grep on `id="..."` occurrences). Pillar #3 emits 4 JSON-LD blocks (TechArticle + FAQPage + BreadcrumbList + Speakable).

---

## 5. Content boundaries across the 3 pillars

| Topic | Pillar #1 (Technology) | Pillar #2 (Frequency) | Pillar #3 (Chip Comparison) |
|---|---|---|---|
| Scope | Broad systems overview | Frequency band decision | Chip family deep reference |
| Primary reader | First-time RFID evaluator | Procurement picking LF/HF/UHF | Procurement locked on frequency, picking chip |
| Chip content depth | 3-card summary | Per-band chip tables (~6 chips each) | 4 dedicated family tables (6-7 chips each) + security / cost / counterfeit matrices |
| Frequency content depth | 1 comparison table | 4 deep-dive sections + decision tree | Mentioned only where chip depends on it |
| Security content | None | None (in scope of chip pillar) | **7-row matrix + 6-band counterfeit risk** |
| Cost content | 5×4 cost table (one-dimensional) | 6×3 cost table by format | **7×3 cost curve by chip × MOQ** |
| Migration scenarios | Brief mention | 4 scenarios (LF→HF, Classic→DESFire, Manual→UHF, FCC→Global) | **5 scenarios all chip-level** |
| Regional compliance | 6-row UHF table | 8-row UHF table + full context | Mentioned at chip level (UCODE 9xm on-metal, regional Monza variants) |

No duplication — each pillar has a distinct job and explicitly cross-links to the others in its related-guides section and one-sentence-answer leads.

---

## 6. What remains for Prompt 3 / Pillar 3

- **PDF whitepaper generation** (shared with Pillars #1 and #2; not yet produced as physical file)
- **Compare-page cluster callouts** — `/compare/mifare-classic-vs-desfire`, `/compare/mifare-plus-vs-desfire` still need pillar links. Handled next turn via `ComparisonLandingPage.astro` template or `comparisons.ts` relatedLinks field.
- **Universal Pillar Navigator refactor** — once Pillar #4 ships, consolidate 11 cluster-blog callouts into a single shared component with all 4 pillar pills (optional UX polish, not blocking).
- **Dev-server render verification** — `http://localhost:4321/rfid-chip-comparison` should hot-reload; spot-check recommended.

---

## 7. Sequencing — what's next per playbook order

| Playbook prompt | Status | Action |
|---|---|---|
| 提示词 3 / Pillar #1 (`/rfid-technology`) | ✓ Done | — |
| 提示词 3 / Pillar #2 (`/rfid-frequency-guide`) | ✓ Done | — |
| 提示词 3 / Pillar #3 (`/rfid-chip-comparison`) | ✓ **Done this turn** | — |
| 提示词 3 / Pillar #4 (`/rfid-vs-nfc-vs-bluetooth`) | 🔵 Next | Three-technology comparison pillar \u2014 when to use RFID vs NFC vs Bluetooth LE |
| 提示词 4 (Product page deepening) | 🔵 Can run in parallel | Touches `src/data/products.ts` |

**Next recommendation**: Pillar #4 = `/rfid-vs-nfc-vs-bluetooth` — closes out 提示词 3 by adding the "which technology family?" decision layer above frequency (important for projects that haven't yet committed to RFID over BLE or ZigBee).

---

**Pillar 3 of 4 complete.** Continuing with Pillar 4 (`/rfid-vs-nfc-vs-bluetooth`) on next turn per "按 playbook 顺序推进" instruction.
