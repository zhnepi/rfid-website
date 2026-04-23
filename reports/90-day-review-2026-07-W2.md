# RFIDAK 询盘机器 — 90 天复盘（W12）

**时间窗口**：2026-04-22（W1 起点） → 2026-07-14（W12 复盘日）
**来源**：`audits/inquiry-funnel-audit-2026-04-21.md` 的 12 周路线图
**复盘者**：Claude Opus 4.7（1M context）
**配套**：路线图、各周实际 edit、`reports/inquiry-YYYY-Www.md`（每周由 `npm run inquiry:report` 生成）

> ⚠️ 本文档是**结构性复盘**。截至写作时业务端的 W0 基线 + W12 实测数据未注入；所有量化格子留 `TBD`，等 Vercel Analytics + CRM 出数后由下一轮数据注入填实。结构 / quick-win 生效清单 / v1.1 迭代建议**不依赖**业务数据。

---

## A. 90 天实际交付清单（技术侧）

| 周 | 主题 | 交付物 | 文件 / 路径 | 状态 |
|---|---|---|---|---|
| W1 | Analytics 贯通 + P0 快修 | Layout 浮球 + 移动底条上下文化；7 分类页 CTA → 上下文；Vercel Analytics 挂载 + `window.rfidakTrack` 桥；FAQ 号码修正 | `Layout.astro` · `category/rfid-*.astro` × 7 · `FAQ.astro` · `thank-you.astro` | ✅ |
| W2 | 信任 & 表单承诺 | 表单顶 "24h 回复" 徽章；TrustBadges 深链到 `/certifications` 锚点；EvidencePage 自动生成锚点 | `contact.astro` · `TrustBadges.astro` · `EvidencePage.astro` | ✅（无真实 PDF 时以深链替代，不伪造） |
| W3 | Hero + 产品首屏 CRO | HeroSlider 3 slide 独立 CTA + source=hero-{id}；产品首屏 MOQ / Lead Time / Free Sample 3 项；右栏 `lg:sticky lg:top-24` | `HeroSlider.astro` · `product/[slug].astro` | ✅ |
| W4 | 全站 CTA 埋点 + AI referrer 分桶 | `classifyReferrer` + `ReferrerBucket` (30+ 域白名单 + 国家子域 regex)；api/inquiry.ts 写 `referrer_bucket`；Layout 加全局 click 委托 | `utils/inquiry.ts` · `api/inquiry.ts` · `Layout.astro` · Header/Footer CTAs | ✅ |
| W5 | 产品 FAQ 深化 + 分类决策卡 | `getProductFaqs` 输出 9–10 条 FAQ（前 3 = MOQ/Sample/LeadTime）；`CategoryDecisionCards` × 7 分类 × 3 卡 | `utils/productCopy.ts` · `product/[slug].astro` · `CategoryDecisionCards.astro` · 7 分类页 | ✅ |
| W6 | ScrollCTA + ExitIntent | 70% 滚动升起 + 桌面 mouseleave 模态 + 7 天 localStorage 抑制；接入产品 / 7 分类 / 博客 / solutions | `components/cta/ScrollCTA.astro` · `cta/ExitIntent.astro` · 上述模板引入 | ✅ |
| W7 | 周报脚本 | `scripts/weekly-inquiry-report.ts`；无 token 优雅降级；ISO 周号输出 `reports/inquiry-YYYY-Www.md` | `scripts/` · `package.json` | ✅（骨架可跑，实际数据需 `VERCEL_ANALYTICS_TOKEN`） |
| W8 | FAQ 三连 CTA + llms 补全 | FAQ 末尾 WhatsApp + Quote + Sample 三连；`llms.txt` 补 intent 深链；`llms-full.txt` 追加 20+ QA 段 | `FAQ.astro` · `public/llms.txt` · `public/llms-full.txt` | ✅ |
| W9 | Sample Express 独立短表单 | `?express=1` 隐藏 5 个非核心字段 + 标题 / 按钮换文案 + 隐藏 sidebar + inquiryType 预填 samples；产品首屏 "Free Sample (60s)" 入口 | `contact.astro` · `product/[slug].astro` | ✅ |
| W10 | thank-you 动态推荐 + Newsletter email 兜底 | thank-you 按 intent/product/category 客户端渲染 3 产品 + 3 博客；Newsletter 加 email-only 表单（hidden inquiryType=compatibility） | `thank-you.astro` · `Newsletter.astro` | ✅ |
| W11 | Solutions 模板对齐 | Hero 加 3 信任锚 + 2 CTA；底部 3 CTA（Quote / Sample Express / WhatsApp）；接入 ScrollCTA + ExitIntent | `SolutionLandingPage.astro` | ✅ |
| W12 | 复盘 + v1.1 | 本文件；`RFIDAK-Inquiry-Machine-Prompts.md` 升级到 v1.1（Changelog + Prompt 16/17） | `reports/90-day-review-2026-07-W2.md` · `RFIDAK-Inquiry-Machine-Prompts.md` | ✅ |

---

## B. KPI 对比（待业务数据注入）

| 指标 | W0 基线 | W12 现状 | Δ | 备注 |
|---|---:|---:|---:|---|
| 月合格询盘数 | `TBD` | `TBD` | `TBD` | 目标 × 2.5–3；需业务按企业邮箱（非 gmail/outlook 个人域）过滤后手工分类 |
| Vercel Analytics 月 pageview | `0` (W1 起点挂载前无数据) | `TBD` | `TBD` | W1 QW#3 上线后 72h 内开始出数；目标上升 40%+ |
| `inquiry_submit_success` 事件率 | `TBD` | `TBD` | `TBD` | 目标 ≥ 4%；需等 Analytics token 就绪后从周报抽取 |
| AI 引擎 referrer 占比 | `0` (W4 前无分桶) | `TBD` | `TBD` | 目标 ≥ 10%；W4 `classifyReferrer` 上线后实测 |
| WhatsApp 点击数 / 月 | `TBD` | `TBD` | `TBD` | 目标提升 30%+；W1/W4 埋点覆盖桌面 / 移动 / 浮球 / Hero / 产品 / 分类 / blog / solutions 全部 WA 入口 |
| 合格率（@company email） | 粗估 60% | `TBD` | `TBD` | 目标 ≥ 70% |
| sample → first-order 转化 | `TBD` | `TBD` | `TBD` | 目标 ≥ 20%；需销售 CRM / 飞书表维护 |

### 数据注入操作指引

1. 打开 Vercel 项目 → Settings → Tokens 生成只读 Analytics token
2. 本地 `.env`：`VERCEL_ANALYTICS_TOKEN=xxx` + `VERCEL_PROJECT_ID=xxx`（可选 `VERCEL_TEAM_ID`）
3. `npm run inquiry:report -- --days=90` 产出 90 天聚合 MD
4. 把 MD 顶部的 4 个关键数字填回本文件 B 表格

---

## C. Top 5 生效 quick-win（按预期 ROI 排序；实际需用周报数据反向验证）

1. **W1 QW#1/#2 — WhatsApp 上下文化**（10 行代码 × 杠杆最大） — 之前浮球文案"Hi, I'd like to inquire about RFID products"通用度过高，上下文化后 per-page 具体文案对买家预选产品更直观
2. **W3 QW#6 — Hero 3 slide 独立 CTA + source=hero-{id}** — 每个 slide 一个落地意图（cards/tags/wristbands），首页第一触点就分漏斗
3. **W9 A2.4 — Sample Express 短表单** — 5 字段 vs 10 字段，预期 B2B 表单完成率 +20–40%（行业基准：字段 -50% 对应完成率 +30%）
4. **W4 QW#10 — AI 引擎 referrer 分桶** — 一旦拿到数据，能识别 ChatGPT / Perplexity / Gemini / Claude / Copilot / Doubao / Kimi 各自贡献，让 llms-full.txt 投入有实测反馈
5. **W5 QW#11 — 产品 FAQ ≥ 8 条 + 前 3 conversion-focused** — MOQ / Sample / Lead Time 当作 FAQ 第一梯队，既挡住 AI Overview 抓取，也帮 B2B 买家一次看完最关心的 3 个数字

## D. 未达预期 / 待观察（3 项）

1. **W11 Solutions 案例 section** — 审计 W11 验收要求"含痛点 + 推荐产品 + 案例"。**案例**部分因"不做虚构"风险暂以 `config.signals`（决策信号）+ `config.workflowSteps`（工作流）代替真实 case study。需后续业务补 2–3 篇真实客户案例（匿名化可接受）再升级该区块
2. **W12 KPI 数据** — 业务端 Vercel Analytics token + CRM 出数未就位，所有量化格留 `TBD`。是整个 90 天路线图最大的一块未完成
3. **W6 ExitIntent 击中率未测** — localStorage 7 天抑制 + 桌面独占的设计在理论上合理，但实际转化率需等周报数据出来才能判断阈值（目前 70% scroll / mouseleave-top）是否需要调整

## E. v1.1 提示词迭代建议

### 结构性升级（v1.1 直接做）
- 新增 **Prompt 16 · 复盘闭环**：规定每 4 周跑 `npm run inquiry:report` + 本文件 B 表增量更新。
- 新增 **Prompt 17 · v2 触发条件**：当下列任一命中即升级到 v2：
  - AI 引擎 referrer ≥ 15%（说明 GEO 投入跑通）
  - 月合格询盘 ≥ 100 条（进入质量优化阶段）
  - 零询盘页清单 > 20 个（长尾需重写，而非一处处改）

### 需实测数据才能升级（标记待注入）
- **Prompt 2（关键词地图）** — 需要 Google Search Console + Ahrefs/SEMrush 的 90 天数据反向修正主打关键词
- **Prompt 5（60 Citable Units）** — 需要 Perplexity/ChatGPT 实际引用 log 才能判断哪些单元被频繁抓取 vs 冷门
- **Prompt 13（40 博客选题）** — 需要零询盘页 + 高 pageview 页的 ΔCVR 数据校准选题分布

---

## F. 风险与债务

1. **真实案例**：案例 section 以方法论 + 决策信号替代；下一版必须补实证。建议提前取得 3 个客户的授权（行业名 + 数量 + 结果，不透露公司名也可）
2. **llms.txt / llms-full.txt 的版本漂移**：产品变更后需要手动同步（脚本化待做）。Prompt 17 触发 v2 时一并做
3. **Sample Express 短表单的垃圾邮件风险**：字段减少、门槛降低。honeypot `website` 保留；若 7 日内 spam > 10% 需加 reCAPTCHA v3
4. **W10 thank-you 客户端渲染**：Astro 页面是静态 SSG，推荐是 runtime 读 URL params 后渲染。如果 SEO 爬虫抓 thank-you 页不会看到推荐 —— 这正确，因为 thank-you 是 `noindex`
5. **ExitIntent 对无障碍用户**：模态有 Esc 关闭 + 背景点击关闭 + `aria-modal="true"` + focus trap 未实现。审计不大需要，但理想下一步加焦点管理

---

## G. 下一个 4 周（W13–W16）建议主攻

根据用户在 W12 复盘时提出的 "RFID 顶流" 诉求（内容深度 / AI 引擎入口 / E-E-A-T / 站外放大器 / 现在到 W12 已规划但没做的），ranked ROI：

1. **内容深度**：博客 6 → 30（覆盖 `ProudTek-Blog-Upgrade-Prompts-v3.1-Local.md` 的 Pillar + Cluster + Comparison 三层）
2. **数据注入**：本文件 B 表的 7 个 KPI 填实
3. **E-E-A-T**：给每位现有 author 补 LinkedIn / 背景 / 领域年限
4. **站外**：YouTube 频道开号 + 每产品 60 秒工厂实拍（先从 Top 5 卖得最多的产品开始）

---

**元信息**
- 复盘者：Claude Opus 4.7（1M context）
- 方法：代码静态扫描 + `audits/inquiry-funnel-audit-2026-04-21.md` 验收比对 + 路线图交付清单复核
- 未使用：无 Vercel Analytics 实测数据 / 无 CRM sample-to-order 数据
- 下一步：业务端注入 KPI 数据后重写 B 表 + Top 5 / 未达预期 + Prompt 2/5/13 微调
