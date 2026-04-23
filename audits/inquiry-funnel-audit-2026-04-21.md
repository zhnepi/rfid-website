# RFIDAK 询盘漏斗（Inquiry Funnel）诊断

**日期**：2026-04-21
**范围**：全站 156 个页面 × 询盘转化视角
**基准**：`RFIDAK-Inquiry-Machine-Prompts.md` 提示词 1
**互补**：`audits/seo-geo-audit-2026-04-18.md`（SEO/GEO 维度）· `audits/content-gap-2026-04-20.md`（内容差距）

## 概述与一句话结论

> **站内 SEO/GEO 基础已成熟，询盘漏斗的"末端机械"基本齐全（归因字段、事件分发、per-page 上下文工具函数），但"传动轴"没接上**——事件发射到 `window.dataLayer` 却没有消费者，Layout 浮球与 7 个分类页没接入已有的 `utils/contact.ts` 上下文化器。**修通 3 处（Layout 浮球、分类页 WhatsApp、客户端 Analytics 挂载）即可解锁已有投资的全部 ROI**。

### 已具备（勿重建）

- `src/utils/contact.ts`：完整的 per-URL `getContextualContactAction / getContextualWhatsAppAction / getContextualEmailAction` 工具链（~926 行）
- `src/pages/api/inquiry.ts`：Resend + Webhook + 蓝贵歉 22 个归因字段（UTM + gclid + fbclid + landing + referrer + timezone + language …）+ honeypot + 服务端 `track('Inquiry Submitted', …)` 到 Vercel Analytics
- `contact.astro`：10 个 `trackEvent(…)` 调用覆盖表单 view / start / quick-email-click / quick-whatsapp-click / email-backup / whatsapp-backup / submit-invalid / submit-success / submit-failed × 2
- `thank-you.astro`：submit 后内容按 intent 动态切换 + 2–4h 回复承诺 + nurture 模块（sample-policy / QC / WhatsApp）+ analytics event
- Landing 模板已用上下文化器：`{Product,Solution,Comparison,Market}LandingPage.astro` 全部通过 `getWhatsAppHref(config.whatsappMessage)` 生成 per-page 文案
- `public/llms.txt` · `llms-full.txt` · `robots.txt`（8 个 AI bot 白名单）· sitemap-index.xml

### 04-18 P0 校验（2026-04-18 → 2026-04-21 期间已修）

| 项 | 04-18 状态 | 04-21 实测 | 结论 |
|---|---|---|---|
| `astro.config.mjs` 的 `site:` | `proudtek.com` ❌ | `https://www.rfidak.com` | ✅ 已修 |
| 首页 H1 缺失 | 0 个 H1 | `<h1 class="sr-only">…Shenzhen, China</h1>`（line 21） | ✅ 已修 |
| 首页 title 长度 | 85 字符 | 62 字符 | ⚠️ 仍超目标 60，但已极大改善 |
| 首页 description 长度 | 218 字符 | 164 字符 | ⚠️ 仍超目标 158，但已极大改善 |

---

## A. 现状量化表

### A1. 获客 → 承接（SEO/GEO 流量到落地页的 CTA 可见性）

| # | 审计项 | 现状 | 目标 | Gap |
|---:|---|---|---|---|
| A1.1 | 7 个分类页首屏主 CTA | hero band 内**无 CTA**，仅面包屑 + 标题 + 描述（`rfid-cards.astro:25-40`） | 首屏内至少 1 组 `Get Quote / Request Sample` | ❌ |
| A1.2 | 7 个分类页底部 CTA 节 | 存在（`Request a Quote` + `WhatsApp Us`）但到表单跳转不带 intent/category 参数（`rfid-cards.astro:134-143`） | `?intent=samples&category=rfid-cards#contactForm` | ❌ |
| A1.3 | 分类页首屏决策卡（"按频率/芯片/应用选型"） | 不存在 | 3 张决策卡 | ❌ |
| A1.4 | Hero slider CTA 是否绑定当前 slide 上下文 | 3 slide 共用静态 `Explore Products` + `Get a Quote`（`HeroSlider.astro:60-65`） | 每 slide CTA 文案随 `slide.id` 变（Smart Card Manufacturer → Request Smart Card Quote …） | ❌ |
| A1.5 | Hero CTA 携带 slide 参数 | `/rfid` + `/contact` 无参数 | `/contact?intent=samples&source=hero-{slideId}` | ❌ |
| A1.6 | 顶部 Header CTA | `Get a Quote → /contact`（桌面 + 移动，`Header.astro`） | 保留即可 ✓ | ✅ |

### A2. 承接 → 转化（落地页内询盘路径最短化）

| # | 审计项 | 现状 | 目标 | Gap |
|---:|---|---|---|---|
| A2.1 | 产品页首屏首屏 CTA 可点 | 有双 CTA（`product/[slug].astro:933-946`：`productContactHref` + `productWhatsAppHref`） | 有 ✓ | ✅ |
| A2.2 | 产品页首屏 MOQ / Lead Time / 价格提示 | 不存在（靠 decision cards 的"What buyers usually confirm first"间接提及） | 明确 `MOQ 500 pcs · Lead Time 7–15d · Free sample 3d` 三点 | ❌ |
| A2.3 | 产品页 sticky 询盘面板 | 仅 section 导航 sticky（`[slug].astro:954-972`）；CTA 不 sticky | 桌面版右栏 `position: sticky` 含双 CTA + MOQ + Lead Time | ❌ |
| A2.4 | 产品页"Request Sample"独立短流程 | 不独立——样品/报价/兼容都走同一 `productContactHref`（intent 由 slug 推导） | 独立 `intent=samples&product={slug}&express=1` 短表单入口 | ❌ |
| A2.5 | 产品页 FAQ 数量 + 转化型前 3 条 | 3 条模板化（`[slug].astro:39-52`：customize / compatibility / samples） | ≥ 8 条，前 3 为"MOQ / 免费样品 / Lead Time" | ❌ |
| A2.6 | 产品页重复 CTA 数 | 7 个 wa.me/contact 命中（首屏 2 + mid 2 + bottom 3） | ≥ 5 ✓ | ✅ |
| A2.7 | 博客页末尾三阶 CTA（低/中/高意向） | 未统一——依赖 Newsletter 组件（只有 sample + WhatsApp，无低意向"下载指南"） | 三阶：PDF 下载 / Sample / Quote | ❌ |
| A2.8 | Compare/Solution/Market landing CTA | 全部用 `getWhatsAppHref(config.whatsappMessage)` + `getXContactHref` | ✅ | ✅ |

### A3. 表单摩擦（Contact + Sample 流程）

| # | 审计项 | 现状 | 目标 | Gap |
|---:|---|---|---|---|
| A3.1 | `contact.astro` 字段总数 | 10 用户可见 + 19 hidden 归因 + 1 honeypot = 30 | 用户可见 ≤ 10 | ✅ 良好 |
| A3.2 | 用户可见字段数 | 10：name / email / inquiryType / preferredContact / company / country / product / quantityRange / subject / message | 5–7 required，其余 optional | ✅（必填数 OK） |
| A3.3 | 必填字段数 | 5（name / email / inquiryType / subject / message） | 5–7 | ✅ |
| A3.4 | honeypot 反垃圾 | 有（`name="website"` + `tabindex=-1` + `autocomplete=off`，`contact.astro:~555`） | 有 | ✅ |
| A3.5 | 多步表单 | 单屏不分步 | 单屏 | ✅ |
| A3.6 | 响应时间承诺在表单附近 | ❌ 仅 thank-you 页写"2–4h"；表单顶端无 | 表单顶端"24h 内首次回复"徽章 | ❌ |
| A3.7 | Request Sample 独立短流程 | ❌ 无（和 quote 同表单） | `/quote-sample?product=…` 或表单内"express 开关" | ❌ |
| A3.8 | 移动底部 CTA 条遮挡 | 占 `pb-16 md:pb-0`（`Layout.astro:190`）——已留底部 padding | 检查各页最后 section 是否覆盖 | ✅ 基本 |

### A4. WhatsApp 上下文化（已有工具 vs 实际使用）

| # | 页面类型 | 当前 WhatsApp 文案 | 是否走 `utils/contact.ts` | Gap |
|---:|---|---|---|---|
| A4.1 | Layout 桌面浮球 | `"Hi, I'd like to inquire about RFID products"`（通用，硬编码 `Layout.astro:195`） | ❌ | ❌ |
| A4.2 | Layout 移动底部条 | `"Hi, I'd like to inquire about RFID products"`（同上，硬编码 `Layout.astro:213`） | ❌ | ❌ |
| A4.3 | 7 个分类页（`category/rfid-*.astro`） | `"Hi, I need custom RFID {category}"`——**硬编码**，不走 utils | ❌ | ❌ |
| A4.4 | 60 个产品页 | `getProductWhatsAppHref(product)`（含产品名） | ✅ | ✅ |
| A4.5 | 7 solutions / 9 compare / 4 markets | `getWhatsAppHref(config.whatsappMessage)` | ✅ | ✅ |
| A4.6 | 4 evidence 页 | 用上下文化 href ✓ | ✅ | ✅ |
| A4.7 | Newsletter 组件 sample CTA | `"Hi, I'd like to request free RFID samples"`（硬编码，`Newsletter.astro`） | ❌ | ⚠️ 低优先级 |
| A4.8 | thank-you 页"Continue on WhatsApp" | `https://wa.me/8618665820632`（无 text 参数，`thank-you.astro:89`） | ❌ | ⚠️ |

**关键杠杆点**：A4.1 + A4.2（2 行改动）+ A4.3（7 个分类页各改 1 行）= **9 行代码让全站 WhatsApp 文案自动契合当前页面上下文**，零新代码，完全复用 `getContextualWhatsAppAction(Astro.url.pathname)`。

### A5. 信任层触达（Trust-to-Conversion）

| # | 审计项 | 现状 | 目标 | Gap |
|---:|---|---|---|---|
| A5.1 | 首页证书条 | `TrustBadges.astro:3-6`：ISO 9001 / ISO 14001 / SGS（仅文字 + 勾图标） | 点击可打开证书 PDF | ❌（证书 PDF 缺失） |
| A5.2 | `public/downloads/` 证书 PDF | 只有 12 个产品 catalog PDF，**无任何证书 PDF**（ISO/SGS） | 至少 3 份证书（ISO-9001.pdf / ISO-14001.pdf / SGS-audit.pdf） | ❌ 资产待上传 |
| A5.3 | 证书专页 `/certifications` | 存在（`certifications.astro`） | ✅ | ✅ |
| A5.4 | 首页客户 logo 条 | `ClientLogos.astro` 组件存在 | ✅ | ✅ |
| A5.5 | 客户 logo 条在产品/分类首屏附近 | ❌ 只在首页 | 分类首屏 + 产品页 sticky 旁放"Verified Buyers" | ❌ |
| A5.6 | 响应时间承诺在 `/contact` 表单页 | ❌（thank-you 页才出现 "2–4h"） | 表单顶端展示徽章 | ❌ |
| A5.7 | 工厂实景展示 | `FactoryProofSection.astro` 存在于 about 页 | 分类/产品页下方也引用 | ⚠️ |
| A5.8 | 产品 aggregateRating | 有（slug-hash 占位 4.5–4.9，`[slug].astro:62-70`） | 可运行；替换为真 review | ✅（可用但伪数据） |

### A6. 归因闭环（Attribution）

| # | 审计项 | 现状 | 目标 | Gap |
|---:|---|---|---|---|
| A6.1 | 服务端事件 `Inquiry Submitted` → Vercel Analytics | ✅（`api/inquiry.ts:90-98`） | ✅ | ✅ |
| A6.2 | 客户端 pageview / 自动链接追踪 | ❌ 未装 `<Analytics />` 客户端组件 | 装到 `Layout.astro` | ❌ |
| A6.3 | 前端 `trackEvent()` 调用数（contact.astro） | 10 个事件定义 | 保留 | ✅ |
| A6.4 | `window.rfidakTrack` 的消费者 | **无**——事件 push 到 `window.dataLayer` 后无脚本消费 | 定义 `window.rfidakTrack = window.va?.track` 初始化桥 | ❌ |
| A6.5 | 产品/分类/landing 的 CTA `data-analytics` 埋点 | ❌ 零 | 所有 quote/sample/whatsapp/email CTA 加 `data-analytics="{action}_{surface}_{page}"` | ❌ |
| A6.6 | 全量归因字段采集 | ✅（19 hidden input：UTM + gclid + msclkid + fbclid + landing + referrer + timezone …） | ✅ | ✅ |
| A6.7 | AI 引擎 referrer 显式分桶 | ❌（`api/inquiry.ts` 记录原始 referrer 但不分桶） | `source = 'ai_engine:chatgpt\|perplexity\|gemini\|claude\|copilot'` | ❌ |
| A6.8 | 周度询盘报告脚本 | ❌ 无 | `scripts/weekly-inquiry-report.ts` | ❌ |

### A7. 跨层协同（SEO × GEO × CRO 一致性）

| # | 审计项 | 现状 | 目标 | Gap |
|---:|---|---|---|---|
| A7.1 | llms.txt 含 sample request URL | 仅含 `contact` URL | 追加 `https://www.rfidak.com/contact?intent=samples#contactForm` | ❌ 低优先级 |
| A7.2 | 首页 FAQ 数据一致性 | **FAQ 第 6 条 WhatsApp 号 `+86-13631526015` 与全站 `+86-18665820632` 冲突**（`FAQ.astro:第6条答案`） | 统一号码 | ❌ **数据错误** |
| A7.3 | FAQ 末尾 CTA | ❌ FAQ 内无任何 CTA 链接 | "Still have questions? [WhatsApp] [Get Quote]" | ❌ |
| A7.4 | Newsletter 组件功能 | 实为 sample-CTA 块（无 email 捕获） | 加**兜底** email 捕获"Email me the catalog PDF" | ⚠️ |
| A7.5 | thank-you 页推荐产品/博客 | 仅静态推荐 sample-policy + QC + WhatsApp，无 related products/blogs | 按 intent / product slug 动态推 3 条 | ❌ |
| A7.6 | Exit-intent / Scroll-CTA | ❌ 全站无 | 桌面 exit-intent + 移动 70% scroll-CTA | ❌ |
| A7.7 | Hero slide 首屏缺价值主张 | slide 文字 `"We supply smart cards and security."` 弱，无数字/认证 | `"5M cards/month · ISO 9001 · 108 clients in 50+ countries"` | ⚠️ |

---

## B. Top 15 Quick-Win

按 **ΔCVR 预期 × (1 / 工作量)** 降序。预计 ΔCVR 为基于行业基准（B2B CRO 标准）的合理估计，非预测。

### 🔴 P0 — 1–2 天内可完成

| # | 改动 | 证据 | 方案 | ΔCVR 估计 | 工作量 |
|---:|---|---|---|---|---|
| **1** | **Layout.astro 全局 WhatsApp 浮球 + 移动条改为 per-page 上下文** | `Layout.astro:195`、`Layout.astro:213`（2 处硬编码） | 在 Layout frontmatter 加 `const whatsapp = getContextualWhatsAppAction(Astro.url.pathname)`；2 个 `<a href>` 改为 `{whatsapp.href}` | 浮球 CTR +10–20% | S（~10 min） |
| **2** | **7 个分类页 CTA 改为走 `getCategoryContactHref + getWhatsAppHref`** | `category/rfid-*.astro` × 7，每个 2 处硬编码 wa.me 和 `/contact`（无 intent 参数） | 每页 frontmatter 加 `const cat = getCategoryContactHref(categoryName); const wa = getWhatsAppHref(…per-category message…)`；底部 CTA 用之 | 分类页 CTA CTR +5–10% | S（7 × 5 min） |
| **3** | **客户端 Vercel Analytics 挂载 + rfidakTrack 桥** | 无 `<Analytics />` 客户端组件（`src/layouts/Layout.astro` 无） | `import { Analytics } from '@vercel/analytics/astro'`；`<Analytics />` 插到 `</body>` 前；再加一行 `<script>window.rfidakTrack = (n,p)=>window.va?.track?.(n,p)</script>` | 解锁已有 10 个事件 + 全量 pageview | S（~15 min） |
| **4** | **FAQ.astro 第 6 条 WhatsApp 号码修正** | `FAQ.astro:第6条answer` → `+86-13631526015`（错），全站标准 `+86-18665820632` | `Edit` 一处 | 防止失联询盘（未知但真实的漏斗泄漏） | S（~2 min） |

### 🟠 P1 — 一周内可完成

| # | 改动 | 证据 | 方案 | ΔCVR 估计 | 工作量 |
|---:|---|---|---|---|---|
| **5** | **Contact 表单顶端加"24h 内回复"承诺徽章** | `contact.astro` 表单顶无响应时间信号 | 加 `<ResponseTimePledge>` 组件（或直接 inline）：`⏱ Replies in 2–4 business hours · 24h guaranteed` | 表单完成率 +3–8% | S–M |
| **6** | **HeroSlider 3 个 slide 的 CTA 携带 slide.id** | `HeroSlider.astro:60-65` | `/contact?intent=samples&source=hero-{slide.id}`；CTA 文案随 slide 变（Smart Card → Request Card Sample, Laundry → Laundry Tag Sample, Wristband → Event Wristband Quote） | 首页 CTA CTR +5–15% | S–M |
| **7** | **产品页首屏 sticky 询盘面板 + MOQ / Lead Time** | `product/[slug].astro:894-949` 首屏无 sticky、无 MOQ/Lead Time | 把右栏 `<div class="space-y-6">` 加 `lg:sticky lg:top-24`；Decision Cards 上方加"MOQ 500 · Lead Time 7–15d · Free sample 3d"三点 | 产品页询盘率 +10–20% | M |
| **8** | **CTA 统一埋点 `data-analytics`** | 零 `data-analytics=` | 所有 quote/sample/whatsapp/email 的 `<a>` 加 `data-analytics="{action}_{surface}_{template}"`；Layout 加全局代理监听 `click` 事件自动 `rfidakTrack` | 全站 CTA 漏斗可见 | M（全站一次性批量） |
| **9** | **FAQ.astro 末尾加三连 CTA** | `FAQ.astro` 末尾仅 script，无 CTA 区 | `<div class="mt-10 flex gap-3"> … [WhatsApp] [Get Quote] [Request Sample] …` | FAQ 段 CTA 点击率从 0% 到 3–8% | S |
| **10** | **inquiry.ts 增加 AI 引擎 referrer 分桶** | `api/inquiry.ts` 记录原始 referrer 未分桶 | 加 `const referrerSource = classifyReferrer(referrerHost)` —— 命中 `chat.openai.com\|perplexity.ai\|gemini.google.com\|claude.ai\|copilot.microsoft.com` 时写入 `source` 字段；`track(..., { referrer_bucket })` | 识别 AI 流量贡献 | S |

### 🟡 P2 — 两周内可完成

| # | 改动 | 证据 | 方案 | ΔCVR 估计 | 工作量 |
|---:|---|---|---|---|---|
| **11** | **产品页 FAQ 从 3 条扩到 ≥ 8 条，前 3 为转化型** | `product/[slug].astro:39-52` | 前 3 条改为 MOQ / Free Sample / Lead Time；后 5 条基于 `productCopy.ts` 生成技术/合规问答 | FAQ rich snippet + 页面停留 +10% | M |
| **12** | **上传 3 份证书 PDF + TrustBadges 点击可下载** | `public/downloads/` 只有产品 PDF；`TrustBadges.astro:21-31` 仅文字 | 上传 `ISO-9001.pdf` / `ISO-14001.pdf` / `SGS-audit.pdf` 到 `public/downloads/certs/`；组件加 `<a href target=_blank>` 包裹每项 | 信任度 → 询盘 +2–5% | S（代码）+ 资产上传 |
| **13** | **新增 `<ScrollCTA>` 组件：滚动 70% 底部升起 per-page CTA** | 无 | 新建 `src/components/cta/ScrollCTA.astro`；产品/分类/博客模板引入；内容调用 `getContextualWhatsAppAction` | 长页转化补位 +3–8% | M |
| **14** | **新增 `<ExitIntent>` 组件：桌面鼠标上移出视口触发样品邀请** | 无 | 新建 `src/components/cta/ExitIntent.astro`（7 天 localStorage 防疲劳）；产品/分类引入 | 离开前补位 +2–5% | M |
| **15** | **新增 `scripts/weekly-inquiry-report.ts`** | 无 | 读 Vercel Analytics API + webhook 落表 → 每周一 cron/手动 `npm run inquiry:report` 产出 `reports/inquiry-YYYY-WW.md` | 归因闭环可用 | M |

---

## C. 90 天路线图（W1–W12）

每周 1 主题，映射到 `RFIDAK-Inquiry-Machine-Prompts.md` 的 Prompt 编号。

### W1（2026-04-22–28）· Analytics 贯通 + 高杠杆快修
- **交付物**：P0 的 4 项全部合入
- **对应 Prompt**：Prompt 9（WhatsApp 上下文化）的一部分 + Prompt 15 的 1
- **修改文件**：`Layout.astro` · `category/rfid-*.astro`（7）· `FAQ.astro`
- **验收**：
  - `npm run build` 无错
  - devtools 打开首页在 `wa.me/…` 文案含 "RFIDAK RFID homepage" 上下文
  - 打开任一产品页 → 切到分类页 → 再切首页，浮球文案动态变
  - Vercel 分析面板 72h 内出现 pageview 数据
  - 打开 `/contact` 提交表单，落到 thank-you 后 Vercel 面板出现 `inquiry_thank_you_view` 自定义事件

### W2 · 信任 & 表单承诺
- **交付物**：Quick-Win #5（表单 24h 承诺）+ #12（证书 PDF 链接）
- **对应 Prompt**：Prompt 11（信任层批量升级）
- **修改文件**：`TrustBadges.astro` · `contact.astro` · 上传 `public/downloads/certs/*.pdf`
- **验收**：证书项可下载；`/contact` 表单顶端徽章可见；Lighthouse a11y ≥ 95

### W3 · Hero + 产品页首屏 CRO
- **交付物**：Quick-Win #6（Hero slide CTA 绑定上下文）+ #7（产品页 sticky + MOQ/Lead Time）
- **对应 Prompt**：Prompt 3（分类首屏 CRO 重写的思路迁移到 Hero）+ Prompt 4（产品页询盘路径）
- **修改文件**：`HeroSlider.astro` · `product/[slug].astro`
- **验收**：3 slide CTA 文案不同；桌面版产品页任意滚动位置双 CTA 常驻右侧；移动端 MOQ/Lead Time 列表在首屏

### W4 · 全站 CTA data-analytics + AI 引擎归因
- **交付物**：Quick-Win #8（`data-analytics` 埋点批量）+ #10（AI referrer 分桶）
- **对应 Prompt**：Prompt 15 的 2 + 提示词 1 补充
- **修改文件**：Layout.astro 加全局 click 监听；`api/inquiry.ts` 加 classifyReferrer；所有主 CTA 组件加 data-attr
- **验收**：Vercel 面板按 `data-analytics` key 自动聚合；提交询盘后 metadata.referrer_bucket 可见

### W5 · 产品页 FAQ 深化 + 分类页决策卡
- **交付物**：Quick-Win #11（产品 FAQ ≥ 8 条）+ A1.3（分类页 3 张决策卡）
- **对应 Prompt**：Prompt 5（Citable Units 产品维度）+ Prompt 3（分类首屏）
- **修改文件**：`product/[slug].astro` FAQ 区 + `productCopy.ts` · 7 个分类页
- **验收**：所有产品页 FAQ ≥ 8；前 3 条为 MOQ/Sample/Lead Time；分类页首屏有"按频率/芯片/应用"决策卡

### W6 · ScrollCTA + ExitIntent
- **交付物**：Quick-Win #13 + #14
- **对应 Prompt**：Prompt 10（Exit-Intent + Scroll-Depth）
- **修改文件**：`src/components/cta/ScrollCTA.astro`（新）+ `ExitIntent.astro`（新）；产品/分类/博客模板引入
- **验收**：桌面版鼠标移出触发 1 次；localStorage 7 天抑制；移动无 exit-intent 但 scroll-70% 升起条可见

### W7 · 周报脚本 + 归因复盘
- **交付物**：Quick-Win #15（`scripts/weekly-inquiry-report.ts`）+ 第 1 份 `reports/inquiry-2026-W17.md`
- **对应 Prompt**：Prompt 15 的 3/4
- **修改文件**：`scripts/weekly-inquiry-report.ts`（新）· `package.json` 加 `"inquiry:report"` script
- **验收**：命令可跑，产出含 inquiry 数 / AI 渠道占比 / top-10 落地页 / 零询盘页清单

### W8 · llms.txt 补全 + FAQ CTA 补位
- **交付物**：Quick-Win #9（FAQ 三连 CTA）+ A7.1（llms.txt sample URL）
- **对应 Prompt**：Prompt 6（llms.txt）+ 补位任务
- **修改文件**：`FAQ.astro` · `public/llms.txt` · `public/llms-full.txt`
- **验收**：FAQ 末尾 3 CTA 点击触发 Analytics 事件；`curl rfidak.com/llms.txt` 含 sample URL

### W9 · Request Sample 独立短流程
- **交付物**：A2.4（独立 sample 短表单）
- **对应 Prompt**：Prompt 8（表单减摩擦）的深化
- **修改文件**：`src/pages/contact.astro` 加 `?express=1` 模式（只显示 name/email/product/country/quantity 5 字段）；产品页右栏 "Free Sample" 按钮链过来
- **验收**：express 模式 5 字段；submit 后 thank-you；vs 完整表单 CVR 对比实验建 baseline

### W10 · Thank-you 页动态推荐 + Newsletter 兜底 email
- **交付物**：A7.5（thank-you 动态推荐）+ A7.4（Newsletter 加 email 兜底）
- **对应 Prompt**：Prompt 4 延伸 + Prompt 14 的 CTA ladder
- **修改文件**：`thank-you.astro` · `Newsletter.astro`
- **验收**：thank-you 按 intent 推 3 博客 + 3 产品；Newsletter 加 email-only 表单兜底

### W11 · Category 页决策树 + 行业落地页微调
- **交付物**：A1.3（决策树）+ Prompt 12 的 solutions 结构对齐
- **对应 Prompt**：Prompt 3 + Prompt 12
- **修改文件**：7 个分类页 · `solutions/[slug].astro` 模板微调（对齐 Prompt 12 检查表）
- **验收**：分类页首屏 3 步决策树可交互；solutions 所有页含痛点 + 推荐产品 + 案例

### W12 · 复盘 + v1.1
- **交付物**：90 天 KPI 对比报告（基线 vs 现状）+ 提示词包 v1.1
- **修改文件**：`reports/90-day-review-2026-07-W2.md`（新）· `RFIDAK-Inquiry-Machine-Prompts.md`（升到 v1.1）
- **验收**：月询盘数 / AI 占比 / 合格率 / sample→order 转化 4 个 KPI 绝对数；v1.1 根据实际数据迭代 Prompt 2/5/13

---

## D. 风险与注意事项

1. **Quick-Win #1（Layout 浮球上下文化）**：`Astro.url.pathname` 在 Astro v5 的静态路由下是生成时路径，不是浏览器当前路径——这里是可以的（每页 SSG 生成时即固化）。动态路由如 `/product/[slug]` 依然正确。不需要客户端 JS。

2. **Quick-Win #3（客户端 Analytics）**：`@vercel/analytics/astro` 在非 Vercel 部署环境仍会尝试 POST，建议用环境变量 gate 开。Build 时会加载一个 ~2KB 脚本，不会影响 LCP。

3. **Quick-Win #4（FAQ 号码）**：建议同步检查 `blogs.ts` 中是否散布有错误号码——本轮 grep 仅发现 FAQ.astro 一处，但需 full-text 复查。

4. **Quick-Win #12（证书 PDF）**：资产侧需先获得真实 PDF 文件；如暂无可先用 `certifications.astro` 页面的截图文件替代，但**不要**放伪造的 PDF——任何可下载文件必须是真实审计结果。

5. **W9（sample express）**：该独立流程与现有 inquiryType='samples' 有重叠，需明确定位——建议 express 针对"我就是要样品不想谈别的"的 P1 买家；保留完整表单给 P2/P3 深度沟通。

6. **W4（data-analytics 批量）**：一次性批量修改 30+ 个 CTA 有 regression 风险，建议分 3 批（Layout/Header 1 批 · 模板 1 批 · 组件 1 批），每批跑一次 build + 手工检查。

7. **与 04-18 审计的残余项**：首页 title（62）和 desc（164）仍超目标（60/158）各 2–6 字符，建议 W1 顺带修；其余 16 个 04-18 P1/P2 quick-wins 与本审计不冲突，可独立推进。

---

## E. 成功指标（90 天基线 → 目标）

| 指标 | 基线（W0 需实测） | W12 目标 | 测量方式 |
|---|---|---|---|
| 月合格询盘数 | 实测 | × 2.5–3 | inquiry webhook + 企业邮箱手工分类 |
| Vercel Analytics 月 pageview | W1 第一次有数 | 上升 40%+ | Vercel 面板 |
| `inquiry_submit_success` 事件率（表单访客 → 提交） | 需 W4 埋点后测 | ≥ 4% | Vercel Custom Events |
| AI 引擎 referrer 占比 | W4 可见 | ≥ 10% | `api/inquiry.ts` 新增的 `referrer_bucket` |
| WhatsApp 点击数 / 月 | 需 W4 `data-analytics` 埋后测 | 提升 30%+ | `whatsapp_click_*` 事件聚合 |
| 合格率（@company email 非 gmail） | 粗估 60% | ≥ 70% | 周报脚本分类 |
| sample → first-order 转化 | 手工记录 | ≥ 20% | 销售 CRM 或飞书表 |

---

## F. 本轮不做（明确作用域）

- 不修代码（本轮只读）
- 不跑 Prompt 2（关键词地图）/ Prompt 5（60 Citable Units）/ Prompt 13（40 博客选题）——分别对应 W8+ 的内容引擎阶段
- 不做竞品分析（不在 Prompt 1 范围）
- 不重复 04-18 SEO/GEO 审计的 20 quick-win 清单；以上 Top 15 与之正交
- 不设计弹层 UI 视觉（W6 ScrollCTA/ExitIntent 具体视觉可在执行时定）

---

## 附录 · 关键文件索引（供 W1–W12 各周直接打开）

| 周 | 主要文件 |
|---|---|
| W1 | `src/layouts/Layout.astro` · `src/pages/category/rfid-{cards,keyfob,labels,readers,rings,tags,wristbands}.astro` · `src/components/FAQ.astro` |
| W2 | `src/components/TrustBadges.astro` · `src/pages/contact.astro`（~ line 1180 表单顶） · `public/downloads/certs/`（新） |
| W3 | `src/components/HeroSlider.astro` · `src/pages/product/[slug].astro`（line 893–950 首屏右栏） |
| W4 | `src/layouts/Layout.astro`（全局 click 监听）· `src/pages/api/inquiry.ts` · 所有 CTA 组件 |
| W5 | `src/pages/product/[slug].astro`（FAQ 区 line 39–52） · `src/utils/productCopy.ts` · 7 个 category 页 |
| W6 | `src/components/cta/ScrollCTA.astro`（新）· `src/components/cta/ExitIntent.astro`（新） |
| W7 | `scripts/weekly-inquiry-report.ts`（新）· `package.json` |
| W8 | `src/components/FAQ.astro` · `public/llms.txt` · `public/llms-full.txt` |
| W9 | `src/pages/contact.astro`（express 模式）· `src/pages/product/[slug].astro`（sample CTA 入口） |
| W10 | `src/pages/thank-you.astro` · `src/components/Newsletter.astro` |
| W11 | 7 个 `category/rfid-*.astro` · `src/components/SolutionLandingPage.astro` |
| W12 | `reports/90-day-review-2026-07-W2.md`（新）· `RFIDAK-Inquiry-Machine-Prompts.md`（升 v1.1） |

---

**元信息**
- 审计者：Claude Opus 4.7（1M context）
- 方法：文件静态扫描 + grep 采样 + 与 04-18 SEO/GEO 审计对照
- 未使用：无 Lighthouse / GSC / 真实 Analytics 数据（这些需在 W1 analytics 上线后逐步补）
- 下一轮（本审计之后）：用户如同意，直接进入 W1 执行——开一个新会话贴"按本审计 W1 执行"即可
