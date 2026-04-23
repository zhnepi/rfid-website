# RFIDAK 网站权威化 / GEO+SEO / 可读性 / 结构优化 — 提示词集

> **使用方法**：每次只发送 **一条** 提示词。它们彼此独立，但**第 1 → 第 12** 顺序执行效果最好。每条提示我（或其他 AI agent）会读完后产出可落地的代码改动 + 验证报告。
>
> **项目根**：`C:\Users\znpjl\Desktop\rfidak-manus\proudtek-rfid-astro-v5 (1)\proudtek-rfid\`
> **关键路径**：`src/data/products.ts`（46+ 产品）、`src/data/blogs.ts`、`src/pages/`、`src/components/`、`src/layouts/Layout.astro`
> **品牌**：RFIDAK · teal `#0d7377` · Shenzhen RFIDAK Co., LTD · www.rfidak.com

---

## 阶段 1：诊断与基线

### 提示词 1 — 全站 SEO / GEO 现状审计

```
对 RFIDAK 网站做一次完整的 SEO + GEO 现状审计，输出一份诊断报告（保存到
audits/seo-geo-audit-YYYY-MM-DD.md）。

要扫描的项：
1. 页面层面：每个 src/pages/**/*.astro 的 title / description / keywords / og /
   canonical 是否完整，是否唯一，长度是否合规（title ≤ 60 字符，desc 120-158）
2. JSON-LD 覆盖：Organization、WebSite、Product、BreadcrumbList、FAQPage、
   Article、HowTo、Speakable 各覆盖了哪些页面
3. 内链密度：每个产品页 / 博客页平均内链数、孤岛页（无入链）清单
4. 图片 alt：扫描所有 <img>，列出无 alt / alt 为产品名简单重复的清单
5. 标题层级：H1/H2/H3 跳级、多 H1 的页面
6. URL 结构：是否所有 slug 都符合 kebab-case 且 ≤ 60 字符
7. GEO 信号：是否有「直接答案」段、Speakable cssSelector、引用权威来源
   (CAGR / market size 数据)、可被 LLM 抽取的对比表
8. 性能：每个路由的 HTML / JS / CSS 字节，最大首屏图

输出三段：
- A. 现状量化（数字表格）
- B. 头部 20 个 quick-win（按 ROI 排序，每条标注预计提升）
- C. 长期改造路线图（Q1-Q4，按主题分组）
```

---

### 提示词 2 — 竞品 / 行业头部 内容差距分析

```
找出 RFIDAK 在「权威信源」维度上的内容缺口。对比对象：HID Global、Avery Dennison
Smartrac、Identiv、Zebra Technologies 的产品页与知识中心。

输出 audits/content-gap-YYYY-MM-DD.md，包含：
1. 对比矩阵：[内容类型] x [竞品 vs RFIDAK] —— 例如「Chip family deep-dive」「Read
   range calculator」「Industry use case study」「Compliance whitepaper」「ROI
   calculator」「Sample request flow」「Spec sheet PDF download」
2. RFIDAK 缺失的 10 个权威内容类型（按对买家决策影响力排序）
3. 对每个缺口给出具体落地方案：新建几篇文章、放在哪个路径、引用哪些公开
   数据源（ABI Research、IDTechEx、AIM Global、GS1 等）
4. 5 篇可立即开工的 pillar article 题目和 1500 字大纲
```

---

## 阶段 2：内容权威化（打造行业信源）

### 提示词 3 — 知识中心（Pillar + Cluster）内容生产

```
基于「Pillar + Cluster」内容模型扩充 RFIDAK 的知识中心：

Pillar 页（顶层权威页，2500-4000 字）— 在 src/pages/ 新建或扩写：
1. /rfid-technology — 已存在，扩充到 4000 字含可下载 PDF 白皮书
2. /rfid-frequency-guide — LF/HF/UHF 全频段权威指南（新增）
3. /rfid-chip-comparison — MIFARE/NTAG/Ultralight/DESFire 全家族对比（新增）
4. /rfid-vs-nfc-vs-bluetooth — 三技术对比 pillar（新增）

Cluster 文章（每个 pillar 配 8-12 篇深度文章，1200-2000 字）—
src/data/blogs.ts 新增：每篇文章包含
  - Hero：自定义封面 + tldr summary
  - 5+ 数据点引用（含来源 + 年份）
  - 可被 LLM 抽取的对比表 / 时间线 / 流程图（用 ASCII 或 SVG）
  - 「Quote-able 一句话答案」段，放在文章顶部
  - 内链到 3+ 相关 cluster 文章 + 1 个 pillar
  - 真实买家场景小节（who / why / how / cost）
  - 作者署名（authors.ts 中的真实身份）+ 发布日期 + 最后更新
  - FAQ 5 条（FAQPage JSON-LD）

每条 cluster 文章发完后，回到对应 pillar 页加「下一步阅读」内链卡片。

工作单位：1 个 pillar + 8 个 cluster = 一次任务。
告诉我你要先生哪个 pillar，我会按顺序给你出全套草稿 + 数据。
```

---

### 提示词 4 — 产品页深度化（每页 ≥ 1500 字 + 7 类组件）

```
重写 src/data/products.ts 中 46+ 产品的 detailSections，让每个产品页达到
「行业级技术规格 + 买家决策辅助」的深度。每个产品至少包含以下 7 类组件：

1. **Buyer's Question First**（一句话答案，放在 description 顶部）—
   "Should I choose [product] for [use case]?" → 直接回答 1-2 句
2. **Spec Decision Matrix**（4-6 行对比表）— 同类产品横向对比，列出关键 trade-off
3. **Real Deployment Story**（300 字案例）— 客户行业 + 数量级 + 实际收益
4. **Compatibility Reference Table**（可被 LLM 抽取）— 与主流系统对接
   清单（Saflok / VingCard / SALTO / Impinj / Zebra 等）
5. **Cost Calculator Snippet**（FAQ 风格）— "How much does X cost at 10K pcs?"
6. **Industry Stats Quote**（带年份 + 来源）— "Per [Source 2024], [stat]"
7. **Visual Spec Card**（结构化 specs 数据扩到 15+ 字段）

附带：
- 每个产品至少 1 篇关联 cluster 博客（双向内链）
- 每个产品 documents 字段挂 ≥ 2 个下载文件（spec sheet PDF + sample
  request form 或 chip selector worksheet）
- moldCatalog（如适用）每条 note 标准化为 "[shape] · [size] · [chip] · [use]"

工作单位：每次 5 个产品。先回报告：你选了哪 5 个、改到了哪个深度、新生成
的关联博客文章题目。
```

---

### 提示词 5 — 作者 E-E-A-T 体系（专家署名 + 资质）

```
为 RFIDAK 网站建立完整的 E-E-A-T 信号系统：

1. 扩写 src/data/authors.ts，每位作者补全：
   - 真实头像（先用占位图，标注「待替换为本人照片」）
   - 任职年限 + 在 RFIDAK 的角色 + 此前工作单位
   - 行业证书（GS1 / AIM / RFID Journal certified）
   - LinkedIn / Twitter / Personal website
   - 已发表文章 / 会议演讲清单
   - 一段自述（150 字，写明擅长领域）

2. 在 src/pages/authors/[slug].astro 模板里，补充：
   - 「Recently authored」最近发布的文章列表（按时间倒序）
   - 「Quoted by」外部媒体引用（先放占位）
   - JSON-LD `Person` schema with sameAs 数组

3. 每个 src/data/blogs.ts 文章要有真实 authorId，移除任何匿名 / 编辑部
   署名，改用具体作者

4. 在 src/layouts/Layout.astro 的 Organization JSON-LD 加：
   - foundingLocation, employees, awards, certifications
   - sameAs（LinkedIn / YouTube 已有，再加 Wikipedia / Crunchbase 占位）

输出 reports/eeat-coverage-YYYY-MM-DD.md 显示哪些页面 E-E-A-T 信号已经
完整，哪些还缺。
```

---

## 阶段 3：GEO（让 AI 搜索引用 RFIDAK）

### 提示词 6 — Direct-Answer 段 + Speakable schema

```
对所有产品页和博客文章注入 GEO 必备结构：

1. 每个产品页（src/pages/product/[slug].astro 模板）增加 hero 区下方的
   「One-sentence answer」组件：
   - 内容：用一句话回答「这个产品适合哪种买家」
   - 标签：<p data-speakable="answer" class="text-xl font-medium ...">
   - 例如："RFIDAK Silicone Wristband is a food-grade, IP68-rated NFC band
     that fits 12K+ daily-use programs in resorts, gyms, and hospitals."

2. 在每个产品页、博客页的 SpeakableSpecification.cssSelector 中加入：
   - "[data-speakable='answer']"
   - "[data-speakable='spec-table']"
   - 已有的 "[data-speakable]" 保留

3. 博客文章顶部统一加 "Key takeaways" 卡片（3 条要点 bullet），用
   data-speakable="key-takeaways"

4. 每页底部加一个 "Was this answer helpful?" 微反馈组件（不做后端，仅
   收集 GA event）+ "Last reviewed: [date] by [author]" 时效信号

验证：用 Schema.org Validator + Google Rich Results Test 跑首页、一个
产品页、一篇博客，截图保存到 audits/。
```

---

### 提示词 7 — 引用权威 + 数据可抽取的表格 / 列表

```
让 RFIDAK 的内容更容易被 LLM 引用。在所有 description / detailSections
中执行：

1. 每篇内容至少 3 处「[数据] (来源, 年份)」格式的引用，例如：
   - "The global RFID market reached $16.9B in 2023 (ABI Research, 2024)"
   - "60-80% reduction in gate processing time (Event Tech Association, 2024)"
   只用真实可查的来源（ABI、IDTechEx、Gartner、IDC、行业协会、上市公司
   年报）。如果造不出真实数据就写「Industry estimate」而不是编造数字。

2. 把对比信息一律改成 markdown 表格（不是散文段），方便 LLM 抽取：
   | Chip | Memory | Auth | Best for | Cost/pc |
   每张表 ≥ 3 行，列名一致。

3. 「How to choose」「When to use」「vs alternative」类内容统一改成
   numbered list（1. 2. 3.），每条 ≤ 25 字，不要嵌套子列表

4. 给每个产品页加 "Frequently asked technical questions" 区块，4 条
   FAQ，每条问题 12 字内、答案 30-60 字（适配 ChatGPT 的引用长度）

执行后扫描全站，输出 reports/citation-density.md：每页平均引用数、
可抽取表格数、FAQ 数。
```

---

## 阶段 4：SEO 传统优化

### 提示词 8 — 长尾关键词页扩张（程序化生成）

```
基于现有 46 个产品 + 7 个分类，程序化生成 200+ 长尾页面，覆盖
"[product] for [industry/use case/region]" 模式的搜索意图。

实现方式：在 src/pages/ 新建动态路由：
- /product-use-case/[product-slug]/[use-case].astro
- /industry-rfid/[industry].astro
- /region-rfid-supplier/[region].astro

数据源在 src/data/ 新建：
- useCases.ts — 25 个用例（hotel / festival / hospital / parking / library / ...）
- industries.ts — 15 个行业
- regions.ts — 30 个国家 / 地区（North America / Europe / Middle East 等）

每页 800-1200 字，自动从产品 + 用例 / 行业 / 区域三方组合内容。每页要有：
- 独特 H1（不与产品页重复）
- 自定义 description（动态生成 + 关键词模板）
- 5+ 内链到具体产品 + 1 个 pillar
- 局部 FAQ
- BreadcrumbList JSON-LD 反映 hub-and-spoke 结构

预计新增 200-400 索引页。生成后跑 sitemap-index.xml 自动更新（@astrojs/sitemap）。
报告新增页面数 + 与现有页面的内链密度变化。
```

---

### 提示词 9 — 全站图片 alt + structured data 复盘

```
两件事：

A. 图片 alt 重写
- 扫描 src/pages/ + src/components/ + src/data/products.ts 所有 <img> 和
  cover/image 字段
- 把 alt="[product name]" 这种重复名字的改成
  "[descriptor] [product] used in [context], [key feature]"
- 例如：alt="RFID Silicone Wristband" →
  "Blue food-grade silicone NFC wristband worn at a water park, IP68-rated for pool immersion"
- 每张图 alt 100-125 字符，含 1 个长尾关键词

B. Structured data 全量补齐
- Product：每个产品 schema 必含 brand / sku / mpn / offers / aggregateRating
  (先用 review 占位)、weight、material、color
- BreadcrumbList：所有 hub 页面（不止产品页）都要补
- Article：所有 blog 必含 author / datePublished / dateModified / wordCount
- HowTo：把现有「How to choose」段重构成 HowTo schema
- VideoObject：如果有 YouTube embed
- ItemList：分类页的产品列表

跑 schema 验证后输出 reports/structured-data-coverage.md。
```

---

## 阶段 5：可读性 + 排版 + 结构

### 提示词 10 — 排版与可读性系统升级

```
统一全站排版规范，提升可读性：

1. 字体系统（src/styles/global.css）
   - 正文：Inter / system-ui 17px / line-height 1.7
   - 长段：max-width: 65ch
   - H1: 36-48px / 1.1, H2: 28-32px / 1.2, H3: 22-24px / 1.3
   - 标题与正文之间的间距用 CSS variables 统一

2. 排版组件（在 src/components/ 新建）
   - <Prose>：长文容器，自动应用 text-wrap: balance（标题）/ pretty（正文）
   - <Callout type="info|warning|success|quote">：在 detailSections 中
     可用 markdown 触发的提示卡
   - <DefinitionList>：术语表组件
   - <KeyValuePill>：spec 行内 inline 标签

3. 在所有产品页、blog 页应用：
   - 段落 ≤ 80 字，超过自动断行（在 productCopy.ts 增加 wrapper）
   - 长 specs 表加搜索框（client-side filter）
   - 添加目录侧边栏（已有 sticky nav，再加左侧 ToC for blog 长文）

4. 全站统一空白节奏：
   - section padding: 96px desktop / 64px tablet / 48px mobile
   - card 间距：24px gap
   - 统一 border-radius: 12px (cards), 8px (pills), 6px (inputs)

执行后用 Lighthouse 跑首页 / 产品页 / 博客 3 个样本，截图前后对比。
```

---

### 提示词 11 — 信息架构 + 导航重构

```
重新设计 RFIDAK 的信息架构：

1. 顶部导航（src/components/Header.astro）
   - 简化为 5 项：Home / Products / Knowledge / Use Cases / Contact
   - Products mega-menu：4 列布局，第 1-3 列按分类，第 4 列「Quick filters」
     （by frequency / by industry / by certification）
   - Knowledge：Pillar + 最新 blog + Glossary + Whitepapers
   - Use Cases：按行业 + 按地区两个维度切换

2. 面包屑（src/components/Breadcrumb.astro）
   - 所有非首页页面强制显示
   - 加 microdata（已有 JSON-LD，再加 itemtype=...）

3. 页脚（src/components/Footer.astro）
   - 重新分组：Products / Knowledge / Company / Resources / Legal
   - 加 newsletter signup（lead capture）
   - 加 trust signals 行：ISO / RoHS / FCC / CE 认证图标

4. 全站搜索（新建 src/pages/search.astro + 简易 client-side index）
   - 搜索 products + blogs + glossary
   - 高亮关键词
   - 结果分类显示（Products / Articles / FAQs）

5. URL 简化
   - /category/rfid-cards → /products/cards
   - /product/[slug] → 保持
   - /blogs/[slug] → /knowledge/[slug]
   全部加 301 redirect（在 astro.config.mjs 或 _redirects 文件）

执行前先输出迁移计划，包含全部影响的内链路径，然后再批量改。
```

---

### 提示词 12 — 落地页 / 分类页 / 首页排版升级

```
按统一的设计语言重做高流量页：

1. 首页（src/pages/index.astro）
   - Hero 区：大标题 + 一句价值主张 + 双 CTA（Browse / Get Quote）+ trust
     bar（ISO / 50+ countries / 15+ years）
   - 4 列产品分类卡（带 hover 动画 + 产品数）
   - 「Why choose RFIDAK」3 列 USP（手工艺 / 速度 / 全球出货）
   - 「Industries we serve」横向滚动 8 行业卡
   - 最新博客 3 篇 + 客户 logo 墙
   - Final CTA section

2. 产品分类页（7 个 src/pages/category/*.astro）
   - 顶部加 quick-filter chip 行（frequency / chip family / certification）
   - 网格卡：每张含 hero 图 + 名 + 一句卖点 + 起订量 + 价格区间（如有）
   - 右侧 sticky 「Compare up to 3」面板（client-side state）
   - 末尾加 buying guide CTA + 该分类下 top 3 用例

3. 单产品页（src/pages/product/[slug].astro）
   - 现有 sticky nav 保留，加「Save to compare」按钮
   - Hero 区下方插「Why this matters」一句话答案（GEO 用）
   - Spec 表加搜索框 + 「Compare with similar」横向链
   - 底部 FAQ 区加可点击折叠 + Schema.org/FAQPage
   - 加「Related industry guides」3 篇博客

4. 博客文章页（src/pages/blogs/[slug].astro）
   - 左侧固定 ToC + reading progress bar
   - 文章正文 max-width 70ch
   - 段落间距加大、引用 / 数据强调样式
   - 文末加 author bio + related articles 3 篇 + newsletter signup

每个改动都要跑：
- 生产 build 大小检查（不超过当前 ±10%）
- Lighthouse 4 项分数（performance / a11y / SEO / best practices）
- 桌面 + 移动端截图对比
```

---

## 附：单次工作粒度建议

每条提示在一次会话里只做 **一项主要交付**。如果某条范围太大（如提示 4 要重写 46 个产品），按 **每次 5 个产品** 拆分多轮。

每次执行完，让我交付：
- 改动清单（文件路径 + 行数）
- 验证截图 / 数据
- 下一步建议

---

**文档生成时间**：2026-04-18
**适用项目**：RFIDAK Astro v5 (`proudtek-rfid-astro-v5 (1)/proudtek-rfid/`)
**使用方式**：每次复制 1 条提示词发给 AI agent，观察执行结果后再发下一条。
