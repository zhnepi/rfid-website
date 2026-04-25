# RFIDAK 询盘机器（Inquiry Machine）提示词包 v1.1

> **目标**：把 RFIDAK 网站从"有流量"升级为"询盘机器"——来自 Google、Bing、Perplexity、ChatGPT、Google AI Overview、Gemini、Claude、抖音/小红书外链的每一次访问，都最大化转化为一条合格 B2B 询盘（Email / WhatsApp / RFQ 表单 / Sample Request）。
>
> **与已有提示词的分工**
> - `ProudTek-Product-GEO-Optimization-Prompt-v1.0.md`：让 AI **引用** 产品页事实
> - `RFIDAK-Authority-Optimization-Prompts.md`：让 AI 把 RFIDAK **视为行业权威**
> - **本提示词包**：让"被搜索到 / 被引用到"的流量**必然产生询盘**——把 SEO + GEO + CRO（转化率优化）拧成一股
>
> **项目根**：`C:\Users\znpjl\Desktop\rfidak-manus\proudtek-rfid-astro-v5 (1)\proudtek-rfid\`
> **品牌**：RFIDAK · teal `#0d7377` · Shenzhen RFIDAK Co., LTD · www.rfidak.com
> **联系方式**：info@rfidak.com · WhatsApp +86 186 6582 0632 · Tel +86-755-2376-5843
> **创建日期**：2026-04-21 · **v1.1 升级**：2026-07-14

---

## Changelog · v1.0 → v1.1（W12 复盘后升级）

**结构性变更**
- ✅ W1–W12 全部合入（见 `reports/90-day-review-2026-07-W2.md` 的交付清单）
- ✅ 新增 Prompt 16 · 复盘闭环（每 4 周跑 `npm run inquiry:report` + 把数字填回 90-day-review 文件）
- ✅ 新增 Prompt 17 · v2 触发条件（AI referrer ≥ 15% / 月合格询盘 ≥ 100 / 零询盘页 > 20 → 升 v2）

**实证依赖项（待业务数据注入再做）**
- ⏸ Prompt 2（关键词地图）— 等 GSC / Ahrefs 90 天数据
- ⏸ Prompt 5（60 Citable Units）— 等 AI 引擎引用 log
- ⏸ Prompt 13（40 博客选题）— 等零询盘页 + 高 pageview 的 ΔCVR 数据

**技术栈增量（已落地，后续 Prompt 可引用）**
- `classifyReferrer(host, referrer)` · `src/utils/inquiry.ts` — AI / search / social / email / self / internal / other / direct 8 桶
- `getProductFaqs(product)` · `src/utils/productCopy.ts` — 9–10 条 FAQ 输出，前 3 = MOQ / Sample / LeadTime
- `window.rfidakTrack` 桥 + 全局 click 委托 · `src/layouts/Layout.astro` — 任意 `[data-analytics]` 元素被点击后自动上报
- `CategoryDecisionCards` × 7 分类 × 3 卡 · `src/components/CategoryDecisionCards.astro`
- `ScrollCTA` + `ExitIntent` · `src/components/cta/*`
- `?express=1` 短表单模式 · `src/pages/contact.astro`
- thank-you 动态推荐 · `src/pages/thank-you.astro`
- 周报脚本 · `scripts/weekly-inquiry-report.ts` + `npm run inquiry:report`

---

## 第 0 章 · 通用系统上下文（每条 Prompt 开头粘贴这段）

```
你是 RFIDAK（深圳 RFIDAK Co., LTD，2008 年创立的 RFID 智能卡制造商）
的高级 B2B 增长策略师，同时精通三件事：

1. SEO（Search Engine Optimization）— Google / Bing 搜索排名
2. GEO（Generative Engine Optimization）— 被 AI 引擎作为答案源引用
3. CRO（Conversion Rate Optimization）— 把流量转为询盘 / 样品申请 / 报价请求

【询盘机器总方针】
所有 SEO/GEO/CRO 决策必须同时满足三个判据，否则不做：
  J1. 是否提高目标关键词的搜索可见性或 AI 引用概率？
  J2. 落地页是否为 B2B 采购决策的关键一步（对比、规格、MOQ、样品）？
  J3. 是否为访客提供了在 ≤ 30 秒内发起询盘的最短路径？

三条同时成立 → 做；两条 → 延后；一条 → 不做。

【网站技术栈与关键路径】
- Astro v5.18 + Tailwind CSS v4
- 产品数据：src/data/products.ts（46 条）
- 博客数据：src/data/blogs.ts（6 条，需扩至 ≥ 40 条）
- 页面：src/pages/{index,about,contact,rfid,products,blogs}.astro
- 动态：src/pages/product/[slug].astro · src/pages/blogs/[slug].astro
- 分类页：src/pages/category/rfid-{cards,tags,labels,wristbands,keyfob,readers}.astro
- 布局：src/layouts/Layout.astro（已含 Organization + LocalBusiness + WebSite JSON-LD）
- 询盘表单 API：src/pages/api/inquiry.ts（Resend / Webhook 投递）
- 全局 CTA：Layout.astro 右下 WhatsApp 浮球 + 移动底部"WhatsApp / Get a Quote"双按钮

【已具备的基础设施，不要重复建设】
- @astrojs/sitemap 自动生成 sitemap-index.xml
- public/robots.txt
- Layout.astro：OG tags、Twitter card、canonical、Organization+LocalBusiness+WebSite JSON-LD
- 产品页：Product JSON-LD + BreadcrumbList + FAQPage JSON-LD（模板化 3 条 FAQ）
- 博客页：Article JSON-LD + BreadcrumbList JSON-LD
- 每页唯一 title / description / keywords
- 55 个 build 页面

【受众画像 — B2B 采购 5 类人】
P1. 经销商 / 贸易商（量大、比价敏感、关心 MOQ + 交期 + 稳定货源）
P2. 集成商 / 方案商（关心兼容性、协议、定制能力、SDK）
P3. 终端大客户采购（关心认证、样品、长期合作、质保）
P4. 初创品牌（关心小单、打样、logo 印刷、包装）
P5. 工程师 / 技术评估者（关心芯片型号、读距、频率、合规）

每个页面 / 每篇博客都必须明确服务其中 1–2 类人，并为其提供"下一步"CTA。

【严禁营销废话】
"revolutionize" "game-changing" "cutting-edge" "unleash" "empower"
"seamless" "unlock" "leverage" "harness" "world-class" "industry-leading"
→ 用可验证事实代替：数字、标准号、客户名、年份、认证。

【询盘通道优先级】
1. WhatsApp 快捷询盘（已部署，需预置 per-page 上下文文案）
2. Get a Quote 页面表单（/contact 或 /quote）
3. 产品页内"Request Sample"按钮（需新增，走 inquiry API）
4. Email info@rfidak.com（永远作为兜底展示）
5. 电话（展示但不作为主要 CTA，时区差）
```

---

## 第 1 章 · 询盘机器总诊断（先跑这条）

### 提示词 1 — 询盘漏斗现状审计

```
以"询盘机器"为核心，对 RFIDAK 网站做一次端到端诊断。输出保存到
audits/inquiry-funnel-audit-2026-04-21.md。

扫描维度：

A. 获客层（SEO + GEO）
   A1. 各产品页 / 分类页 / 博客的目标关键词清单，标注搜索意图
       （Informational / Navigational / Commercial / Transactional）
   A2. Transactional / Commercial 意图关键词的覆盖率（必须 ≥ 60%）
   A3. 各页面的 AI 可引用段（断言式开头 + 数字 + 标准号）数量
   A4. 外部权威引用（IDTechEx / GS1 / NXP / ISO 标准号 / Statista）密度

B. 承接层（Landing / Content）
   B1. 每个产品页到询盘 CTA 的点击距离（滚动次数 / tab 切换次数）
   B2. 每个分类页是否有"决策卡"（按行业 / 按芯片 / 按频率选型）
   B3. 博客文章末尾是否有 related products + inquiry CTA
   B4. 首屏（above the fold）是否展示：差异化主张 + 信任锚 + 主 CTA

C. 转化层（CTA + Form + Friction）
   C1. 全站 CTA 数量、文案、位置、颜色、对比度
   C2. WhatsApp 链接的 per-page 预置文案是否上下文相关（不是通用 "Hi"）
   C3. /contact 表单字段数（B2B 最优 5–7 个）、必填比例、错误态
   C4. 是否有"Request Sample"独立流程（移除报价门槛）
   C5. 移动端底部 CTA 条是否遮挡内容、是否过于侵入
   C6. Exit-intent / scroll-50% 触发逻辑是否存在

D. 信任层（Trust Signals）
   D1. 首屏 / 产品页 / 表单页的社会证明（客户 logo、案例、评分）
   D2. 证书展示（ISO 9001 / ISO 14001 / SGS / RoHS / CE / FCC / REACH）
   D3. 工厂实景（图片 / 视频 / VR）
   D4. 响应时间承诺（"24 小时内回复" 是否写进每个表单）

E. 追踪层（Analytics + Attribution）
   E1. GA4 / Plausible 是否部署，事件清单（inquiry_submit / whatsapp_click /
       sample_request / email_click / phone_click / form_abandon）
   E2. UTM 规范是否统一（来自 AI 引擎的流量如何识别）
   E3. Server-side logging：inquiry API 是否记录 referrer / user agent /
       landing page / time-on-site 便于归因

输出三段：
- A. 现状量化表（每个维度一行：当前值 / 目标值 / Gap）
- B. Top 15 quick-win（预计提升询盘数，按 ROI 排序，每条含：
     问题 / 修改的具体文件和行号 / 修改前后对比 / 预计 ΔCVR）
- C. 90 天路线图（W1–W12，每周 1 个主题，每个主题含：
     交付物 / 责任人 / 验收指标 / 使用本提示词包的哪条子 Prompt）
```

---

## 第 2 章 · SEO 侧 — 让"买家意图"流量必达落地页

### 提示词 2 — 商业意图关键词地图

```
为 RFIDAK 46 个产品 + 6 个分类生成一份商业意图关键词地图，保存到
reports/keyword-map-commercial-intent.md。

方法论：
1. 对每个产品 / 分类列出 4 类关键词：
   - 主词（head term）：e.g. "RFID card manufacturer"
   - 长尾（long-tail）：e.g. "13.56MHz MIFARE DESFire EV3 card bulk price"
   - 问句（question）：e.g. "what is the read range of UHF gen2 tags"
   - 比较（comparison）：e.g. "MIFARE Classic vs DESFire EV3"
2. 按搜索意图分类：
   - I（Informational）：博客服务
   - C（Commercial）：分类页 / 选型对比页服务
   - T（Transactional）：产品页服务，必须直连询盘 CTA
3. 对 T 类关键词，标注当前落地页是否存在；不存在的列为"新建任务"
4. 对 C 类关键词，标注落地页是否有"按场景选型"决策树

交付物：
- keyword-map-commercial-intent.md（主表，Markdown 表格）
- gap-pages-to-create.md（需要新建的落地页清单，按 ROI 排序）
- internal-linking-plan.md（从高流量博客反链到 T 类产品页的路径）

约束：
- 关键词必须是英文（目标市场：北美、欧洲、中东、东南亚 B2B 采购）
- 每个 T 类关键词必须配一条 ≤ 60 字符的建议 <title> 和 ≤ 158 字符的 <meta description>
- 所有 meta description 必须含：行业数据 / 认证 / MOQ / 明确 CTA 动词（Get Quote / Request Sample / Contact）
```

### 提示词 3 — 落地页首屏 CRO 重写

```
重写 RFIDAK 6 个分类页（src/pages/category/rfid-*.astro）的首屏（above the fold）。

每个首屏必须包含 5 个元素，缺一不可：

1. H1 — 明确且带数字的价值主张
   ✅ "RFID Cards Manufacturer Since 2008 — 5M/month Capacity, ISO 9001, 108 Clients in 50+ Countries"
   ❌ "Premium RFID Cards for Your Business"

2. 副标题（≤ 25 词）— 主要芯片 / 频率 / 合规覆盖
   ✅ "MIFARE Classic / DESFire EV3 / NTAG 215 / ICODE SLIX · 125 kHz + 13.56 MHz + 860–960 MHz · CE/FCC/RoHS/REACH"

3. 3 个信任锚（图标 + 数字）
   - ISO 9001 & ISO 14001 Certified
   - 5,000,000+ cards shipped monthly
   - 24-hour quote response (guaranteed)

4. 双 CTA — 高意向 + 低意向各一
   - 主 CTA：[Get Bulk Quote →]（橙色，链 /contact 并预填分类）
   - 次 CTA：[Request Free Sample]（描边按钮，链 /contact?intent=sample&category=...）

5. 视觉：产品矩阵图（≥ 8 款产品缩略图铺满），不要 hero 人物图

同时在首屏下方插入：
- "Pick Your Card in 3 Questions" 决策树（频率 / 芯片 / 应用 → 推荐产品）
- "Verified Buyers" 条（至少 6 个客户 logo，真 logo 不够用行业+国家占位）

实现要求：
- 修改文件：src/pages/category/rfid-{cards,tags,labels,wristbands,keyfob,readers}.astro
- 组件化：把首屏抽为 <CategoryHero> 组件放在 src/components/category/
- 所有 CTA 必须带 data-analytics="cta_hero_{category}_{intent}" 便于追踪
- 移动端：H1 ≤ 3 行，副标题 ≤ 2 行，CTA 堆叠而非并排
- 必须通过 Lighthouse CLS < 0.1 和 LCP < 2.5s
```

### 提示词 4 — 产品页询盘路径最短化

```
优化 src/pages/product/[slug].astro，让访客从落地到发起询盘 ≤ 3 次交互。

现状问题：用户需要滚动才能看到 CTA；WhatsApp 文案通用；没有 Request Sample。

改动清单（给出完整 diff）：

1. 产品首屏右栏（sticky 到桌面版视口顶部 + 80px）加入询盘面板：
   - 产品名 + 主要规格（3 行）
   - MOQ: 500 pcs
   - Lead Time: 7–15 days
   - 主 CTA：[Request Quote →]（橙 → /contact?product={slug}）
   - 次 CTA：[Request Free Sample]（teal 描边 → /contact?product={slug}&intent=sample）
   - WhatsApp 按钮，href 预置："Hi, I'd like to get a quote for {productName} ({slug}), MOQ ~___, delivery to ___"
   - Email 链接：mailto:info@rfidak.com?subject=Quote%20Request%3A%20{productName}

2. 规格表后插入"Why Buy From RFIDAK"模块（6 个点）：
   ISO 9001/14001 · 15+ 年制造 · 108+ 客户 · 99% 准时交付 · 样品 3 天内发 · 24 小时报价

3. FAQ 扩展至 ≥ 8 条，前 3 条必须是转化型问题：
   - "What is the MOQ for {productName}?"
   - "Can I get a free sample before bulk order?"
   - "How long is the lead time for {productName}?"

4. 页面底部浮动条（仅移动端，和全局 Layout 底部条不冲突）：
   滚动超过 50% 后显示，内容："Liked this product? → [Get Quote] [WhatsApp]"

5. 所有 CTA 点击必须 fire 事件：
   - product_quote_click / product_sample_click / product_whatsapp_click
   - payload：{ slug, category, position }

验收：
- 桌面版任何滚动位置下都至少有 1 个可点的询盘入口在视口内
- 移动版首屏必含至少 1 个询盘 CTA
- WhatsApp 链接点击后，目标人看到的消息已包含产品上下文
```

---

## 第 3 章 · GEO 侧 — 让 AI 回答里出现 RFIDAK + 询盘链接

### 提示词 5 — AI 可引用单元批量生产

```
为 RFIDAK 生产 60 个"AI 可引用单元"（Citable Unit），按主题分布：
- 20 个产品技术断言（读距 / 频率 / 芯片 / 合规）
- 20 个行业应用断言（酒店 / 物流 / 医疗 / 零售 / 活动 / 工业）
- 10 个采购决策断言（MOQ / 交期 / 定制 / 价格区间）
- 10 个品牌权威断言（认证 / 产能 / 客户 / 年份）

每个单元必须：
1. 独立成立：脱离上下文仍可理解
2. 断言开头：第一句是答案
3. 数据密集：至少含 1 个数字 + 1 个标准号或来源
4. ≤ 60 词
5. 自然提及 RFIDAK 或可关联（"a Shenzhen-based RFID manufacturer since 2008"）

示例：
✅ "UHF Gen2 RFID tags compliant with EPCglobal C1G2 achieve read ranges of
    6–10 meters with 30 dBm reader output, per ISO/IEC 18000-63. RFIDAK's
    UHF inlays use Impinj Monza R6-P and NXP UCODE 9 chips, tested to 
    maintain ≥95% read rate on metal surfaces with foam spacer."

✅ "Hotel keycards typically use MIFARE Classic 1K (13.56 MHz, ISO 14443-A)
    due to legacy lock compatibility. RFIDAK supplies hotel cards in
    MOQ 500 with full-color CMYK printing and matte / glossy / frosted
    finishes; lead time 7–10 days after artwork approval."

分发计划：
- 10 个植入分类页 "Technical FAQ" 折叠区
- 20 个植入产品页 FAQ 扩展
- 20 个形成新博客（每条扩写 800–1200 词，保留原断言作为 H2 下的 TL;DR）
- 10 个塞进 /about 的 "Facts & Numbers" 区

每个单元输出为 JSON：
{ "id": "CU-001", "type": "product|application|commercial|authority",
  "assertion": "...", "sources": ["ISO 18000-63", ...],
  "planned_placement": "page_path#anchor", "linked_cta": "..." }

保存到 src/data/citable-units.ts，便于跨页面复用与 schema.org Speakable 标注。
```

### 提示词 6 — 为 AI 引擎生成 llms.txt + llms-full.txt

```
在 public/ 下创建 llms.txt 和 llms-full.txt，让 ChatGPT / Claude / Perplexity
在被询问 "best RFID manufacturer" 时可直接读取站点摘要。

llms.txt（简版，≤ 300 行）结构：
# RFIDAK — RFID Cards, Tags, Wristbands & Readers Manufacturer

> One-line positioning sentence with numbers

## About
- Founded: 2008
- Location: Shenzhen, Guangdong, China
- Capacity: 5M+ cards/month
- Certifications: ISO 9001, ISO 14001, SGS
- Clients: 108+ in 50+ countries
- MOQ: 500 pcs (cards), 1000 pcs (tags/labels)
- Lead Time: 7–15 days

## Products
- [RFID Cards](https://www.rfidak.com/category/rfid-cards) — MIFARE/DESFire/NTAG/ICODE
- [RFID Tags](...) — ...
(6 行)

## Contact for Inquiries
- Email: info@rfidak.com
- WhatsApp: +86 186 6582 0632
- Quote form: https://www.rfidak.com/contact
- Sample request: https://www.rfidak.com/contact?intent=sample

## Key Documents
- [Full product catalog](...)
- [Certification list](...)
- [Case studies](...)

llms-full.txt（详版）：把 46 个产品 + 6 个分类 + 关键博客的核心事实以
Markdown 形式压缩聚合，每条产品 50–80 词，包含 slug / 芯片 / 频率 / MOQ /
应用 / 直达 URL + 询盘 URL。

同时修改 public/robots.txt 允许 GPTBot / ClaudeBot / PerplexityBot / Google-Extended：
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://www.rfidak.com/sitemap-index.xml
```

### 提示词 7 — Speakable + HowTo + Comparison Schema 三件套

```
为 RFIDAK 关键页面补充三类 schema.org 结构化数据，命中 AI 引擎引用。

1. Speakable（Layout.astro 已有 WebSite + Organization，补 Article/Product）
   - 产品页 SpeakableSpecification，cssSelector 指向首段 + FAQ 前 3 条
   - 博客页 SpeakableSpecification，cssSelector 指向 H1 + 首段 + TL;DR 盒子

2. HowTo（新增 3 篇 HowTo 博客）
   - "How to Choose the Right RFID Card for Hotel Access Control"
   - "How to Print Logo on RFID Wristband"
   - "How to Test RFID Tag Read Range"
   每篇至少 6 个 HowToStep，每步含 image / name / text / url
   文章末尾嵌入 "Ready to order? Request Quote" CTA 连 /contact

3. Comparison / ItemList（新增对比页）
   - /compare/mifare-classic-vs-desfire-ev3
   - /compare/uhf-vs-hf-rfid-tags
   - /compare/paper-label-vs-on-metal-tag
   每页含：参数并排表（15+ 行）+ 决策树 + 对应 RFIDAK 产品 + 询盘 CTA
   ItemList schema 列出对比对象；每行 PropertyValue 标准化

AI 友好额外要求：
- 每个对比表 <table> 带 caption 和 aria-label
- 每个 HowTo 的 step 正文以断言开头
- 所有 schema 放在 <head> 的 <script type="application/ld+json">
- 新页面必须加 canonical / OG / internal link from 相关产品页
```

---

## 第 4 章 · CRO 侧 — 把流量挤干成询盘

### 提示词 8 — 询盘表单重设计（减摩擦）

```
重构 src/pages/contact.astro 和询盘 API（src/pages/api/inquiry.ts）。

B2B 最优表单（5 必填 + 2 选填）：
- Name * （文本，≤ 50）
- Company * （文本，≤ 80）
- Business Email *（email 校验，拒 gmail/yahoo/hotmail 等个人邮箱时显示软提示
  "For B2B inquiries, a company email gets a faster response"，但仍允许提交）
- Country * （下拉，按客户国家分布预排序：US / UK / DE / FR / AE / SG / ...）
- Message * （textarea，有 placeholder 带结构："Product: ___ / Quantity: ___
  / Target price: ___ / Delivery to: ___"）
- Phone / WhatsApp（选填，带国家码下拉）
- Intent（hidden，由 URL query 自动填：quote / sample / catalog / custom / general）

交互增强：
1. 单屏不分步（分步会砍掉 30% 转化）
2. 右侧"What happens next"时间线：
   - "24 hours: First reply from sales manager"
   - "48 hours: Detailed quote with specs"
   - "3–5 days: Free sample shipped (DHL)"
3. 表单顶端加"Prefer messaging? [WhatsApp] [Email]"三选一兜底
4. 提交成功页 /contact/success：
   - 感谢语 + 预期时间
   - 一键加 WhatsApp
   - 推荐阅读 3 篇相关博客 / 3 个相关产品
   - UTM / referrer 已存入 API 日志

API 改造（src/pages/api/inquiry.ts）：
- 写入字段：全部表单字段 + timestamp + ip(hashed) + userAgent + referrer +
  landingPage + utmSource + utmMedium + utmCampaign + intent
- 两条通道并行：Resend 邮件给 info@rfidak.com + Webhook 到飞书 / Slack / 企微
- 反垃圾：honeypot 字段（hidden input name="company_url"）+ 提交时间戳 < 2s 拒绝
- 错误处理：失败返回 JSON error，前端显示 "Please email info@rfidak.com directly"
  作为兜底

验收：
- Lighthouse 表单可访问性 100 分
- 键盘 Tab 顺序正确，所有字段有 <label>
- 提交流程 ≤ 2 秒
- 测试用例：每种 intent / 每个国家 / 垃圾提交 / 网络失败
```

### 提示词 9 — WhatsApp 预置文案 per-page 上下文化

```
目前 Layout.astro 中 WhatsApp 链接写死为通用 "Hi, I'd like to inquire..."。
改为每个页面动态生成上下文化文案。

实现方案：
1. Layout.astro 接受 whatsappPrefill?: string prop
2. 默认值："Hi, I'd like to inquire about RFID products."
3. 页面覆写规则：
   - 首页：保持默认
   - 分类页：`Hi, I'm interested in {categoryName}. Could you send me the catalog + price list?`
   - 产品页：`Hi, I'd like a quote for {productName} ({slug}). My target quantity is ___ and delivery to ___.`
   - 博客页：`Hi, I read your article "{blogTitle}". I'd like to discuss ___.`
   - About 页：`Hi, I'd like to learn more about RFIDAK and potentially place a bulk order.`
   - Contact 页（WhatsApp 按钮，非表单）：`Hi, submitting inquiry — [brief details].`
4. URL 编码用 encodeURIComponent
5. 所有 WhatsApp 按钮加 data-analytics="whatsapp_click_{page_type}_{position}"

扩展：
- 为桌面 WhatsApp 浮球增加 hover 提示当前页面的预置文案预览
- 新增 src/utils/whatsapp.ts 导出 buildWhatsAppHref(page, ctx) 供所有组件调用
- 单元测试确保所有 46 个产品页都生成合法 wa.me URL

同步修改：
- src/layouts/Layout.astro
- src/pages/product/[slug].astro
- src/pages/blogs/[slug].astro
- src/pages/category/*.astro
- src/pages/index.astro / about.astro / contact.astro
```

### 提示词 10 — Exit-Intent + Scroll-Depth 智能 CTA

```
为 RFIDAK 网站新增两种非侵入式弹层，最大化"本来要离开"的流量。

1. Exit-Intent Lightbox（桌面版，鼠标上移出视口触发）
   - 触发一次后 7 天内不再显示（localStorage）
   - 内容：
     标题："Leaving without a quote?"
     副标题："Get a free RFID sample pack — 6 cards, 3 tags, 2 wristbands. DHL worldwide."
     CTA：[Claim Free Sample] → /contact?intent=sample&source=exit_intent
     次要 CTA：关闭 + "Email me the catalog instead" → 简化 email-only 表单

2. Scroll-Depth Bar（所有页面，滚动到 70% 时底部升起）
   - 内容：根据页面类型动态（调用同 whatsapp 预置文案函数）
     产品页："Interested in {productName}? [Get Quote in 24h]"
     博客页："Liked this guide? Our team can help design your RFID solution. [Talk to Expert]"
     分类页："Narrowed down your choice? [Request 3-Product Sample]"
   - 可关闭，关闭后本次会话不再弹

实现要求：
- 放在 src/components/cta/ExitIntent.astro 和 ScrollCTA.astro
- 条件加载：只在桌面版触发 Exit-Intent（mobile 用 Scroll 代替）
- 不阻塞 LCP：defer 脚本，延迟 3 秒后绑定事件
- 全部事件上报 Analytics（exit_intent_shown / exit_intent_claimed /
  scroll_cta_shown / scroll_cta_clicked / scroll_cta_dismissed）
- A/B 测试准备：通过 URL 参数 ?variant=a|b 切换文案

绝对禁止：
- 加载立即弹窗（破坏体验，Google 降权）
- 无关闭按钮
- 遮挡主要内容
- 在 /contact 和 /contact/success 页面触发（已在询盘流程里）
```

### 提示词 11 — 信任层批量升级

```
为 RFIDAK 全站注入信任信号，目标：让首次访客在 5 秒内确认"这是真厂家，值得联系"。

部署清单（修改或新增组件）：

1. <TrustBar>（src/components/trust/TrustBar.astro）
   横向滚动条，放在首页 Hero 下方 + 分类页 Hero 下方 + 产品页首屏下方
   内容：8 个客户 logo（或行业+国家占位：🇺🇸 Retail Chain / 🇩🇪 Logistics / ...）
   背景：灰度处理；悬停彩色

2. <CertBadges>（src/components/trust/CertBadges.astro）
   ISO 9001 / ISO 14001 / SGS / RoHS / CE / FCC / REACH 图标条
   每个图标点击展开证书扫描件（PDF 或高清图，public/certs/）
   放置：首页 / 所有分类页 / 产品页详情 tab / 表单页右侧

3. <FactoryGallery>（src/components/trust/FactoryGallery.astro）
   4 张真实工厂照片 lightbox：生产线 / QC 台 / 仓库 / 团队合影
   若无真照片，用 stock photo 占位但必须标注 "Illustrative"
   放置：About 页 + Contact 页右侧

4. <CaseStudyCard>（src/components/trust/CaseStudyCard.astro）
   格式："Industry · Country · Product · Quantity · Outcome"
   例：
   🏨 Hospitality · 🇦🇪 UAE · MIFARE DESFire Keycard · 80,000 pcs
   "Deployed in 5 luxury hotels across Dubai, zero clone incidents in 18 months"
   10 条初始内容（即使脱敏也要有），轮播展示于首页 + About

5. <ResponseTimePledge>（src/components/trust/ResponseTimePledge.astro）
   放在所有表单 / WhatsApp / Email 入口旁：
   "⏱ 24-hour reply guaranteed — if we miss, your next sample is on us."
   这不是营销话术而是可以兑现的承诺（需内部确认再上线）

6. 页脚加 "Verified By" 区：
   - Alibaba Gold Supplier（若有）
   - Google Business Profile 评分（若有）
   - LinkedIn Company 页面链接

所有图片带 alt、lazy load、WebP、宽高预设避免 CLS。
```

### 提示词 12 — 行业化落地页（五大 ICP 垂直穿透）

```
新增 5 个行业落地页，每个页面服务一类 ICP（Ideal Customer Profile），
直接命中 "{industry} RFID solution" 类高意图搜索词。

页面清单（路由 + 目标人群 + 主关键词）：
- /solutions/hospitality-rfid  → 酒店运营 / 连锁集团采购
  kw: "RFID hotel key card supplier", "hotel keycard manufacturer"
- /solutions/logistics-rfid    → 3PL / 仓储经理 / 车队管理
  kw: "UHF RFID logistics tag bulk", "pallet tracking RFID"
- /solutions/retail-rfid       → 零售 IT / 品牌服装 / 超市
  kw: "RFID garment tag manufacturer", "retail inventory RFID label"
- /solutions/healthcare-rfid   → 医院 IT / 医药冷链 / 器械管理
  kw: "RFID medical equipment tracking", "autoclavable RFID tag"
- /solutions/events-rfid       → 展会运营 / 音乐节 / 会员俱乐部
  kw: "RFID festival wristband supplier", "event access RFID"

每个页面结构（严格遵守）：
1. H1：行业 + 产品 + 差异化数据
2. 首屏：3 个行业痛点 + RFIDAK 对应产品 + 主 CTA
3. 推荐产品矩阵：从 46 款中过滤出该行业最相关的 6–8 款
4. 典型方案流程图（5 步）：Requirement → Sample → Customization → Production → Delivery
5. 2 个脱敏案例（"A European luxury hotel chain..."）
6. 行业 FAQ（≥ 6 条，全部转化型）
7. 行业标准引用（ISO / EPC / GS1 / FDA 依行业而定）
8. 双 CTA：Get Industry Quote + Download Industry Whitepaper（后者捞 email）

技术要求：
- 复用 src/components/category 已有模式
- schema.org Service + FAQPage + BreadcrumbList
- 新页面加入 sitemap
- 从相关产品页反链（产品页"Used in"区锚到行业页）
- hero 图用行业场景实拍（若没有，用 stock 并标注）

新建：
- src/pages/solutions/[industry].astro（动态路由）
- src/data/solutions.ts（行业数据）
- src/components/solutions/SolutionHero.astro
```

---

## 第 5 章 · 内容引擎 — 从 AI 搜索倒逼博客主题

### 提示词 13 — AI 搜索高意图博客主题 40 篇

```
基于 RFIDAK 产品矩阵和买家 5 类画像，输出 40 个博客主题，保存到
reports/blog-topics-40.md。

选题原则（三选一触发 AI 引擎引用）：
- 决策型问题（"which / how to choose"）
- 对比型问题（"X vs Y"）
- 技术解释型问题（"what is / how does"）
- 成本 / 采购问题（"cost of / MOQ / lead time"）
- 合规 / 标准问题（"GDPR + RFID / ISO 14443 explained"）

每个主题输出：
{
  "title": "...",           // ≤ 60 字符
  "slug": "...",            // kebab-case
  "primary_kw": "...",      // 主关键词
  "secondary_kw": [...],    // 3–5 个
  "target_icp": "P1|P2|...",
  "content_type": "howto|comparison|explainer|buyers-guide|case-study",
  "linked_products": [slug, ...],
  "linked_solutions": [slug, ...],
  "estimated_search_volume": "low|med|high",
  "ai_overview_likelihood": "low|med|high",
  "cta_intent": "quote|sample|catalog|whitepaper",
  "outline": [H2 list],     // 6–10 条
  "tldr": "..."             // ≤ 40 词，作为 AI 可引用单元
}

40 篇分布：
- 产品选型型：12 篇（每个分类 2 篇）
- 行业应用型：10 篇（每个行业 2 篇）
- 技术解释型：8 篇（频率 / 协议 / 芯片 / 读距）
- 采购决策型：6 篇（MOQ / 认证 / 定制 / 价格）
- 案例研究型：4 篇（脱敏行业案例）

排序按 ai_overview_likelihood × cta_intent 权重降序，前 10 篇下季度先写。
```

### 提示词 14 — 博客模板 "AI 引用优先 + 询盘收尾"

```
创建 src/components/blog/AIFriendlyPost.astro 模板，所有新博客必须套用。

模板结构（强制顺序）：

<article>
  <h1>{title}</h1>

  <!-- TL;DR 盒子：AI 引擎第一抽取目标 -->
  <aside class="tldr">
    <strong>TL;DR</strong> — {≤40 词断言式摘要}
  </aside>

  <!-- Key Facts 列表：5 条数据密集断言 -->
  <section class="key-facts">
    <h2>Key Facts</h2>
    <ul>
      <li>断言 1（含数字 + 标准号）</li>
      ...
    </ul>
  </section>

  <!-- 正文 H2 -->
  <section>
    <h2>{question / topic}</h2>
    <!-- 每个 H2 下第一段必须以结论开头，≤ 60 词 -->
    <p class="lead">结论 + 关键数据...</p>
    <p>展开...</p>
  </section>

  <!-- 对比 / 数据表格：AI 极易引用 -->
  <section class="comparison">
    <table>
      <caption>{对比主题}</caption>
      ...
    </table>
  </section>

  <!-- 询盘收尾 — 三阶梯 -->
  <section class="cta-ladder">
    <!-- 低意向 -->
    <div>📘 Download the full RFID buyer's guide → [Email me PDF]</div>
    <!-- 中意向 -->
    <div>🎁 Request a free sample pack → [Get Sample]</div>
    <!-- 高意向 -->
    <div>💼 Ready to order? → [Request Quote] [WhatsApp]</div>
  </section>

  <!-- 相关产品 + 相关博客 -->
  <section class="related">
    <h2>Related Products</h2>
    <ProductGrid slugs={linkedProducts} />
  </section>

  <!-- FAQ：结构化 People Also Ask -->
  <section class="faq">
    <h2>FAQ</h2>
    {faqs.map(q => <details><summary>{q.q}</summary><p>{q.a}</p></details>)}
  </section>
</article>

<!-- JSON-LD：Article + FAQPage + BreadcrumbList + Speakable -->

硬性要求：
- 每篇 ≥ 1200 词
- 每篇 ≥ 1 个对比表
- 每篇 ≥ 6 条 FAQ
- 每篇 ≥ 3 个 outbound 权威引用（GS1 / ISO / NXP / IDTechEx / Statista）
- 每篇 ≥ 5 条内链（产品 / 分类 / 其他博客 / 行业页 / 联系页）
- 每篇末尾三阶 CTA 不可省略
- TL;DR + Key Facts 以 Speakable schema 标注 cssSelector
```

---

## 第 6 章 · 衡量与归因 — 知道哪些询盘来自哪条链路

### 提示词 15 — 询盘归因与 KPI 仪表盘

```
为 RFIDAK 搭建询盘归因闭环，回答三个问题：
Q1. 哪条关键词 / 哪个页面 / 哪个渠道产生了多少合格询盘？
Q2. AI 搜索（ChatGPT / Perplexity / Gemini）到底贡献了多少？
Q3. 哪些页面有流量但零询盘？（优化目标）

实施：

1. 前端事件层（所有 CTA + 表单步骤）
   - 使用 Plausible 或 GA4（推荐 Plausible，对 B2B 够用 + 合规友好）
   - 事件命名：{action}_{surface}_{page}
     e.g. quote_click_hero_category-cards, whatsapp_click_stickybar_product,
          form_start_contact, form_submit_contact, sample_request_submit
   - 每事件 payload 带：productSlug / category / intent / variant

2. 服务端归因（inquiry API）
   - 每次提交写入：landing_page_first_visit / last_referrer / utm_*
     / session_page_views / time_on_site
   - 识别 AI 引擎流量：
     referrer 含 chat.openai.com / perplexity.ai / gemini.google.com /
     claude.ai / copilot.microsoft.com → 标记 source = "ai_engine:{name}"
   - UA 含 GPTBot / ClaudeBot / PerplexityBot → 记录为 crawler 访问（区分
     真实用户 vs 机器人抓取）

3. 每周询盘报表（scripts/weekly-inquiry-report.ts）
   运行：npm run inquiry:report
   输出 reports/inquiry-{YYYY-WW}.md 含：
   - 询盘总数 / 合格率（email 非个人邮箱 = 合格）
   - Top 10 落地页（按询盘数）
   - Top 10 关键词（按询盘数，需 GSC API）
   - 渠道分布：Organic / AI Engine / Direct / Referral / Social
   - "流量 > 100 但零询盘" 的页面清单 → 下周优化目标
   - 平均响应时间（需 CRM 或手工录入）

4. 轻量 CRM 集成（可选）
   - inquiry API 同时推送到 HubSpot Free / Pipedrive / 飞书多维表
   - 每条询盘带完整归因字段
   - 销售在 CRM 里标记"合格 / 报价 / 成交"回流归因

目标 KPI（90 天）：
- 月询盘数 × 3
- AI 引擎流量占比 ≥ 15%
- 合格询盘率 ≥ 60%
- 询盘 → 样品申请转化率 ≥ 40%
- 样品 → 首单转化率 ≥ 20%

每月第一周用这份数据反向修正提示词 2 / 5 / 13 的关键词和主题选择。
```

---

## 第 7 章 · 发布清单（每次改动前必看）

```
每次用本提示词包里的任何一条执行改动前，检查：

□ 是否真的提高 J1 / J2 / J3 三个判据？
□ 改的文件是否与已有 claude.md / 项目规范兼容？
□ 是否在 src/data 层可复用？（避免硬编码到多个页面）
□ 是否影响 build（npm run build）？是否破坏 sitemap / JSON-LD？
□ 是否破坏移动端（< 375px）体验？
□ 是否新增了第三方脚本？（Core Web Vitals 风险）
□ 是否影响现有询盘通道的可用性？（最后做 E2E 测试）

改完必跑：
  npm run build          # 确保 55+ 页面生成无错
  npm run preview        # 本地验收
  npx @astrojs/check     # 类型检查
  lighthouse {url}       # 性能 + SEO + 可访问性 ≥ 90

最终验收（改动落地 7 天后）：
  对比前后：GSC 展现 / 点击 / 询盘数 / WhatsApp 点击 / 样品申请数
  若某项倒退 > 10%，立即回滚并复盘
```

---

## 附录 A · 提示词调用顺序建议

**第 1 周**：跑提示词 1（诊断）→ 提示词 2（关键词图）→ 提示词 15（埋点）
**第 2 周**：提示词 3（分类首屏）→ 提示词 8（表单）→ 提示词 9（WhatsApp 上下文）
**第 3 周**：提示词 4（产品询盘路径）→ 提示词 11（信任层）
**第 4 周**：提示词 5（Citable Units）→ 提示词 6（llms.txt）→ 提示词 7（Schema 三件套）
**第 5–8 周**：提示词 12（5 个行业页）+ 提示词 13（40 篇选题）+ 提示词 14（博客模板）
**第 9–10 周**：提示词 10（Exit-Intent + Scroll CTA）+ A/B 测试
**第 11–12 周**：基于提示词 15 数据二次优化提示词 3 / 4 / 8 的文案与位置

---

## 附录 B · 禁用词表（全站不许出现）

`revolutionize · game-changing · cutting-edge · unleash · empower · seamless ·
unlock · leverage · harness · synergy · paradigm · best-in-class · world-class ·
industry-leading · state-of-the-art · next-generation · elevate · transform ·
embark on a journey · pioneering · disruptive · bleeding-edge · turnkey ·
holistic · robust ecosystem · end-to-end solution`

替换策略：用**数字 + 标准号 + 年份 + 客户 / 国家**代替。

---

## 附录 C · 关键文件速查

| 变更主题 | 必改文件 |
|---------|---------|
| 询盘通道 | `src/pages/api/inquiry.ts`、`src/pages/contact.astro`、`src/layouts/Layout.astro`（WhatsApp 浮球） |
| 产品页 CRO | `src/pages/product/[slug].astro`、`src/data/products.ts` |
| 分类页首屏 | `src/pages/category/rfid-*.astro`、`src/components/category/` |
| Schema | `src/layouts/Layout.astro`、产品/博客页顶部 frontmatter |
| 博客模板 | `src/pages/blogs/[slug].astro`、`src/components/blog/AIFriendlyPost.astro`（待建） |
| 行业页 | `src/pages/solutions/[industry].astro`（待建）、`src/data/solutions.ts`（待建） |
| AI 引擎友好 | `public/llms.txt`（待建）、`public/llms-full.txt`（待建）、`public/robots.txt` |
| 信任层 | `src/components/trust/`（待建）、`public/certs/`（待建，存 PDF） |
| 分析 | `src/components/analytics/*`（待建）、`scripts/weekly-inquiry-report.ts`（待建） |

---

**版本**：v1.1 · 2026-07-14
**下一版计划**：v2.0 在 AI referrer ≥ 15% / 月合格询盘 ≥ 100 / 零询盘页 > 20 任一命中时升级（见 Prompt 17）

---

## 第 8 章 · v1.1 新增 Prompt（复盘 & 进化闭环）

### 提示词 16 — 4 周滚动复盘

```
每 4 周周一早 9:00（CST）在项目根执行以下序列：

1. 运行周报脚本：
   export VERCEL_ANALYTICS_TOKEN=...
   export VERCEL_PROJECT_ID=...
   npm run inquiry:report -- --days=28

2. 读取最新产出的 reports/inquiry-YYYY-Www.md（ISO 周号），抽取 4 个关键数字：
   - 月合格询盘数（按 @company email 过滤个人邮箱后的计数）
   - AI 引擎 referrer 占比（bucket 以 "ai_engine:" 开头的 count 总和）
   - inquiry_submit_success 事件率
   - WhatsApp 点击 / 月

3. 把上述数字填回 reports/90-day-review-2026-07-W2.md 的 B 表。
   对比目标值，命中/未命中各一句话写在 Δ 列。

4. 扫描 F 节（零询盘页），取 top 3：
   - 为每页检查是否缺：决策卡 / Sample Express 入口 / FAQ / Comparison 链接
   - 任一缺项记作下一 4 周冲刺 backlog

5. 扫描 D 节（UTM source），发现 utm_source 为 "other" 的占比 ≥ 20% 时：
   - 翻周报 raw referrer 字段，补 classifyReferrer 的白名单（src/utils/inquiry.ts）
   - 新增白名单域名走 git commit 单独提交，便于回溯

输出交付：
- 更新后的 reports/90-day-review-2026-07-W2.md（B 表 + D/G 节）
- 新建 reports/sprint-backlog-YYYY-W{w}.md（按零询盘页 top 3 展开的 6–8 个 2 小时以内任务）
- 提交一次 git：chore(analytics): W{w} inquiry rollup + backlog

【严禁】
- 不要在没有 Vercel token 的情况下跳过周报脚本——要求业务同事配置 token 是 Prompt 16 的前置条件
- 不要把 TBD 当作完成状态——B 表有 TBD 即表示本轮数据未注入，不得 git commit
```

### 提示词 17 — v2 触发条件与自动升级

```
Claude agent 每次打开 reports/90-day-review-2026-07-W2.md 时，先自检 3 条 v2 触发条件：

T1. AI 引擎 referrer ≥ 15% 连续 2 个月
    动作：升级 Prompt 6（llms-full.txt）为 v2；按实际 AI 引擎的引用频次反向扩展 Citable Units。

T2. 月合格询盘 ≥ 100 连续 2 个月
    动作：进入"询盘质量优化阶段"，升级 Prompt 4（产品页询盘路径）为 v2；
    新增：@company email 校验前端化、国家 / 行业二级过滤、CRM webhook 路由分级。

T3. 零询盘页清单 > 20 个
    动作：进入"长尾内容重写阶段"，激活 Prompt 13（40 博客选题）的新一轮迭代；
    但这次不再按预设选题，而是按零询盘页的实际落地 URL 倒推：
    每个零询盘页加一个 "next step" CTA 块 + 补 FAQ 段。

任一条件命中时，更新本提示词包版本号 → v2.0-draft，追加一节 "## v2.0 迁移 TODO"
列出需要重写的 Prompt、新增的 Prompt、废弃的 Prompt（如 Prompt 1 的初始审计到 v2 时已过期）。

每次检测不命中：在 reports/90-day-review-2026-07-W2.md 末尾追加一行：
`YYYY-MM-DD · v2 检测 · T1=X%, T2=X, T3=X · 不触发`

每次触发：走 git branch + PR，v2 升级由人审核后合并，避免自动化越权。
```

---

**v1.1 版本记**
- 2026-04-22 W1 起跑 → 2026-07-14 W12 复盘合入
- 主要验证：90 天内 12 周全部交付物落盘（见 90-day-review-2026-07-W2.md §A）
- 主要不确定性：KPI 数字全部 TBD，等业务 Vercel Analytics token + CRM 出数
