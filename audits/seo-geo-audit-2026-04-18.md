# RFIDAK SEO + GEO 现状审计

**审计日期**：2026-04-18
**审计范围**：156 个生成页面（25 静态 + 60 产品 + 33 博客 + 9 比较 + 7 解决方案 + 4 市场 + 3 作者 + 4 evidence + 3 索引页 + 7 分类 + 1 错误页）
**域名**：www.rfidak.com（rebrand from ProudTek 2026-04-17）

---

## A. 现状量化

### A.1 路由与页面分布

| 页面类型 | 数量 | 模板路径 |
|---|---|---|
| 静态首页/品牌页 | 25 | `src/pages/*.astro` 顶层 |
| 产品详情页 | 60 | `src/pages/product/[slug].astro` |
| 博客文章页 | 33 | `src/pages/blogs/[slug].astro` |
| 比较页 | 9 | `src/pages/compare/[slug].astro` |
| 解决方案页 | 7 | `src/pages/solutions/[slug].astro` |
| 市场页 | 4 | `src/pages/markets/[slug].astro` |
| 作者页 | 3 | `src/pages/authors/[slug].astro` |
| 分类页 | 7 | `src/pages/category/rfid-*.astro` |
| Evidence 页 | 4 | `src/pages/{certifications,quality-control,sample-policy,shipping-and-incoterms}.astro` |
| **总计** | **~156** | |

### A.2 页面 metadata（live preview 实测，5 个样本）

| 页面 | Title 长度 | Desc 长度 | Canonical | OG Image | LD 块数 | H1 | H2 | 内链 | Speakable |
|---|---:|---:|---|---|---:|---:|---:|---:|---|
| `/` | **85 ❌** | **218 ❌** | rfidak.com ✓ | ✓ | 3 | **0 ❌** | — | — | ✗ |
| `/product/rfid-silicone-wristband` | 68 ⚠️ | 125 ✓ | ✓ | ✓ | 5 | 1 ✓ | 16 | 71 | ✓ |
| `/category/rfid-wristbands` | 75 ⚠️ | 187 ⚠️ | ✓ | ✓ | **2 ⚠️** | 1 ✓ | 3 | 64 | **✗** |
| `/blogs/rfid-wristbands-for-events-and-hotels` | **86 ❌** | 155 ✓ | ✓ | ✓ | 5 | 1 ✓ | 16 | 75 | ✓ |
| `/rfid-technology` | 70 ⚠️ | 134 ✓ | ✓ | ✓ | **6 ✓** | 1 ✓ | 12 | 66 | ✗ |

**门槛**：Title ≤ 60、Desc 120-158、≥ 1 个 H1、各模板 ≥ 1 个 BreadcrumbList。

### A.3 JSON-LD 覆盖（按模板）

| 模板 / 路径 | Organization | WebSite | Product | Article | FAQPage | BreadcrumbList | HowTo | Speakable |
|---|---|---|---|---|---|---|---|---|
| `Layout.astro`（全站默认）| ✓ | ✓ | — | — | — | — | — | — |
| `product/[slug].astro` | ✓ | ✓ | ✓ | — | ✓ | ✓ | — | ✓ |
| `blogs/[slug].astro` | ✓ | ✓ | — | ✓ (BlogPosting) | ✓ | ✓ | — | ✓ |
| `category/*.astro` | ✓ | ✓ | — | — | **✗** | **✗** | — | **✗** |
| `compare/[slug].astro` | ✓ | ✓ | — | — | ? | ? | — | ✓ |
| `solutions/[slug].astro` | ✓ | ✓ | — | — | — | — | — | — |
| `markets/[slug].astro` | ✓ | ✓ | — | — | — | — | — | — |
| `authors/[slug].astro` | ✓ | ✓ | — | — | — | — | — | ✓ |
| `rfid-technology.astro` | ✓ | ✓ | — | TechArticle ✓ | ✓ | ✓ | ✓ | ✗ |
| `about.astro` | ✓ | ✓ | — | AboutPage ✓ | ✓ | ✓ | — | ✗ |
| `index.astro`（首页）| ✓ | ✓ | — | — | — | — | — | — |

**关键缺口**：分类页（**7 页**）+ 解决方案页（**7 页**）+ 市场页（**4 页**）= **18 页缺失 BreadcrumbList**；分类页缺 CollectionPage / ItemList；首页未补充自有 schema。

### A.4 内链密度（按模板）

| 模板 | 平均内链数 |
|---|---:|
| 首页 `/` | ~12-15 |
| 产品页 | 71 ✓ |
| 分类页 | 64 ✓ |
| 博客页 | 75 ✓ |
| Knowledge 页 | 66 ✓ |

整体内链密度健康。

### A.5 图片 alt 模式（27 个 alt 字符串采样）

| 模式 | 占比 | 示例 | 评价 |
|---|---:|---|---|
| **描述性**（含上下文 + 关键词）| 35% | `${related.name} - ${related.category} by RFIDAK RFID manufacturer` | ✓ 好 |
| **简单产品名** | 55% | `alt={product.name}`、`alt={app.name}` | ⚠️ 弱 |
| **空 alt** | 0% | — | ✓ |
| **完全描述性 + 长尾关键词** | 10% | `Clean hospital bed linens in a healthcare facility` | ✓ 优秀 |

### A.6 标题层级

| 模板 | H1 个数 | H2 个数 | 评价 |
|---|---:|---:|---|
| `/` 首页 | **0** | — | ❌ 严重 |
| 产品页 | 1 | 16 | ✓ |
| 分类页 | 1 | 3 | ✓ |
| 博客页 | 1 | 16 | ✓ |
| `/rfid-technology` | 1 | 12 | ✓ |

### A.7 GEO 信号

| 信号 | 状态 |
|---|---|
| 引用权威（"according to / per / 2024 / 2023"） | ✓ products.ts、blogs.ts、blogSeo.ts 都有 16+ 处 |
| 一句话答案段（data-speakable="answer"） | ✗ 还没专门组件 |
| Speakable cssSelector | ✓ 产品页 / 博客 / 作者 / 词汇表 / 比较页 |
| 数据可抽取的对比表 | ✓ rfid-technology / 产品 specs |
| 数字化 How-to 列表 | ✓ about.astro 有 4 步 |
| FAQPage schema | ✓ 产品页 + 博客 + about |
| 产品 aggregateRating | ⚠️ Layout 全站统一 4.9（108 reviews），但产品级未补 |

### A.8 性能

| 指标 | 实测 |
|---|---|
| public/images/products/ 体积 | 13 MB（之前 102 MB → 已压缩 87%）|
| 单产品页平均 HTML | 369 KB |
| 单产品页图片总和 | 1.5 MB |
| 51 张图，平均 31 KB | ✓ |

### A.9 robots.txt + sitemap

| 项 | 状态 |
|---|---|
| AI crawler 白名单（GPTBot/ClaudeBot/PerplexityBot/Applebot 等 8 个） | ✓ |
| robots.txt sitemap URL | `https://www.rfidak.com/sitemap-index.xml` ✓ |
| `astro.config.mjs` 中 `site:` | **`https://www.proudtek.com` ❌**（rebrand 漏改）|
| sitemap 优先级分级 | ✓ 已分 5 个等级 |
| `filter: !includes('/api/')` | ✓ |
| `llms.txt` / `llms-full.txt` 引用 | ✓ |

---

## B. Top 20 Quick-Wins（按 ROI 排序）

| # | 优先级 | 改动 | 预计影响 | 工作量 |
|---:|---|---|---|---|
| **1** | 🔴 P0 | 修 `astro.config.mjs` site: `proudtek.com → rfidak.com` | 修复 sitemap URL 错位，避免 canonical/sitemap 双向矛盾 | 1 行改动 |
| **2** | 🔴 P0 | 给 `/` 首页加 `<h1>` | 修复严重 SEO 缺失，搜索引擎能识别页面主题 | 1 处改动 |
| **3** | 🔴 P0 | 缩短首页 title 85 → ≤ 60 字符 | Google 不再截断标题展示 | 1 行 |
| **4** | 🔴 P0 | 缩短首页 description 218 → 155 字符 | desc 完整展示在 SERP | 1 行 |
| **5** | 🟠 P1 | 给 7 个分类页加 `BreadcrumbList` JSON-LD | 7 个高流量页 rich snippet | 共 1 处模板改 |
| **6** | 🟠 P1 | 给 7 个分类页加 `CollectionPage` + `ItemList` JSON-LD | 分类页变成可被 LLM 抽取的产品集合 | 共 1 处模板改 |
| **7** | 🟠 P1 | 给 7 个分类页加 Speakable schema | 语音搜索覆盖 +7 页 | 共 1 处模板改 |
| **8** | 🟠 P1 | 缩短博客页 title（动态生成超过 80 字的）| 长尾博客 SERP 更完整 | productCopy.ts / blog title 截断 |
| **9** | 🟠 P1 | 给 7 个 solutions 页 + 4 个 markets 页加 BreadcrumbList | 11 页面包屑 | 模板级改 |
| **10** | 🟠 P1 | 给所有产品 detail 区加 "One-sentence answer" GEO 组件（`data-speakable="answer"`）| 显著提升被 ChatGPT / Perplexity 引用率 | 模板级 1 处 + productCopy.ts 增加字段 |
| **11** | 🟡 P2 | 给所有 `<img alt={product.name}>` 升级为含 frequency / use-case 的描述 | 图片 SEO + a11y | 30+ 处批量修 |
| **12** | 🟡 P2 | 在 about 页的 4 步流程加 HowTo schema | 1 个 HowTo rich snippet | 1 处模板改 |
| **13** | 🟡 P2 | 给产品页补 `aggregateRating` per-product（即使是占位 4.5+ 5 reviews）| Product rich snippet 多带星级 | products.ts 字段 + 模板 |
| **14** | 🟡 P2 | 给所有 `compare/[slug].astro` 加 ItemList schema 列出对比项 | 比较页可被 LLM 直接引用 | 模板级 |
| **15** | 🟡 P2 | 给所有 `solutions/[slug].astro` 和 `markets/[slug].astro` 加 Article 或 Service schema | 11 页类型化 schema | 模板级 |
| **16** | 🟡 P2 | 在 Layout.astro 加 `<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1">` | 让 Google 全量展示 snippet/preview | 1 行 |
| **17** | 🟡 P2 | 在 Layout.astro 加 hreflang（即使只有英语）`<link rel="alternate" hreflang="en" href="..."/>` 和 `hreflang="x-default"` | 多区域可扩展性铺路 | 1-2 行 |
| **18** | 🟡 P2 | 给 newsletter / contact form 加 ContactPage + ContactPoint schema | contact 页 rich data | 模板改 |
| **19** | 🟡 P2 | 给 sitemap 加图片扩展（`@astrojs/sitemap` `customPages` + `image` 字段）| Google Image SERP 收录 | astro.config.mjs |
| **20** | 🟢 P3 | 在 `<head>` 加 RSS feed `<link rel="alternate" type="application/rss+xml" href="/feed.xml"/>` | 博客订阅可发现性 | 1 行 |

---

## C. 长期路线图（Q1-Q4，对应 12-prompt playbook）

### Q1（4-6 周）— 内容权威化基础

- **Prompt 5**：作者 E-E-A-T 体系（Person schema + 任职年限 + 证书 + LinkedIn）
- **Prompt 6**：所有产品页注入 "Direct-answer" 一句话答案组件
- **Prompt 7**：每篇内容 ≥ 3 处真实来源引用 + markdown 对比表
- 完成 Top 20 quick-wins 中的 P0 + P1 全部 11 项

### Q2（4-6 周）— GEO 化 + 内容深度

- **Prompt 3**：建 4 个 pillar（rfid-technology 扩 4000 字 + 3 个新 pillar：rfid-frequency-guide / rfid-chip-comparison / rfid-vs-nfc-vs-bluetooth）
- **Prompt 4**：把 60 个产品页深度化（每次 5 个 × 12 轮，达到 1500 字 + 7 类组件）
- **Prompt 9**：图片 alt + 全 schema 复盘（HowTo / VideoObject / Review / ReviewRating）

### Q3（6-8 周）— 长尾扩张 + 内容广度

- **Prompt 3**：每个 pillar 配 8-12 篇 cluster 文章（约 32 篇新博客）
- **Prompt 8**：长尾页扩张（用例 × 行业 × 区域三维矩阵 → 200-400 新页面）
- 程序化 SEO：useCases.ts / industries.ts / regions.ts 三个新数据源

### Q4（4-6 周）— 排版 + 信息架构 + 性能

- **Prompt 10**：排版 / 可读性系统（统一字号、line-height、Prose 组件、Callout 组件）
- **Prompt 11**：信息架构 + 导航重构（顶部 mega-menu、URL 简化 → 301、全站搜索）
- **Prompt 12**：高流量页排版升级（首页 / 分类 / 产品 / 博客 4 类）

### 持续监控

- 每月跑 Lighthouse + GSC（Search Console）+ Bing Webmaster
- 每季度对比竞品（HID / Avery Dennison / Identiv / Zebra）的内容增量
- 跟踪 LLM 引用：每月在 ChatGPT / Perplexity / Google AI Overview 输入「best RFID wristband for festival」「RFID silicone wristband manufacturer」等核心查询，看 RFIDAK 是否被引用

---

## D. 风险 / 注意

1. **域名混乱风险（最高优先级）** — `astro.config.mjs` 还在 `proudtek.com`，会让 build 出来的 sitemap.xml 全部用 proudtek.com，但 Layout.astro 的 canonical 是 rfidak.com。Google 看到 sitemap 与 canonical 不一致，会忽略 sitemap 或降权。**必须立即修**。

2. **首页 H1 缺失** — 这是基础 SEO 失误。首页是品牌权威页，必须有清晰 H1 标题。

3. **rebrand 漏网** — 我之前 rebrand script 只 walk 了 `src/`、3 个 public 文本文件、1 个 build_catalog.py。**漏掉**：astro.config.mjs、`*.bak`、`.fuse_hidden*`。建议下次 rebrand 全项目走（除 node_modules / .vercel / .git）。

4. **分类页 schema 弱** — 7 个分类页是高流量入口（"RFID Wristbands manufacturer"、"RFID Cards China" 这类核心词的落地页），目前只有 Organization + WebSite 两个 schema，连 BreadcrumbList 都没有。

5. **产品 FAQ schema 已存在** — 之前 audit 文档说产品页 FAQ 没 wrap schema，实测确实有 FAQPage schema 在产品页输出。✓

---

## 文档元信息

- 数据来源：`Explore` agent + 直接 Read + 生产 dev server live HTML
- 后续动作建议：按上面 Top 20 顺序执行；P0 4 项可一次性完成。
