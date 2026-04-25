# vercel.json · 配置说明

**创建日期**:2026-04-24
**原因**:SEO/GEO 审计(2026-03-15)报告标红 `Missing Security Headers`。`astro.config.mjs` 的 `server.headers` 块**只应用于 `astro dev`**,不会被 Vercel 应用到生产响应上。本文件是生产环境 headers 的唯一来源。

---

## 1. 安全头部(应用于所有路径 `/(.*)`)

### Content-Security-Policy(CSP)
限制浏览器只能从白名单加载资源。当前策略:

| 指令 | 允许源 | 原因 |
|---|---|---|
| `default-src` | `'self'` | 兜底:只有同源 |
| `script-src` | `'self' 'unsafe-inline' https://va.vercel-scripts.com` | Astro 注入的 hydration 脚本 + Layout.astro 里的 `rfidakTrack` bridge + Vercel Analytics |
| `style-src` | `'self' 'unsafe-inline'` | Tailwind 运行时样式 + 组件内联 style |
| `img-src` | `'self' data: https:` | 博客中引用的 Wikipedia / Unsplash 等 HTTPS 图 + data: URI SVG |
| `font-src` | `'self' data:` | 自托管字体(public/fonts) |
| `connect-src` | `'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com` | Vercel Analytics 上报 |
| `frame-src` | `'none'` | 不嵌入任何 iframe |
| `frame-ancestors` | `'none'` | 不允许任何网站把 RFIDAK 嵌入 iframe(防点击劫持) |
| `object-src` | `'none'` | 禁止 Flash / Java applet |
| `base-uri` | `'self'` | 防止 base 标签劫持 |
| `form-action` | `'self'` | 表单只能提交到同源 |
| `upgrade-insecure-requests` | - | 自动把 http:// 资源升级到 https:// |

### 其他安全头部

| Header | Value | 作用 |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | 浏览器不要"猜" Content-Type |
| `X-Frame-Options` | `DENY` | 不允许任何站点 iframe 嵌入(向后兼容 `frame-ancestors`) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 只在同源请求发完整 referrer;跨源只发 origin |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | 强制 2 年 HTTPS,含子域名 + 申请 HSTS preload |
| `Permissions-Policy` | camera / mic / geolocation / payment 等全部 `()` 关闭 | 禁止网页调用不需要的浏览器功能 |
| `Cross-Origin-Opener-Policy` | `same-origin` | 浏览器进程隔离,提高 Spectre 类攻击防御 |
| `X-DNS-Prefetch-Control` | `on` | 允许浏览器预解析外链 DNS,SEO 加分 |
| `X-Permitted-Cross-Domain-Policies` | `none` | 禁止 Flash/Silverlight 跨域访问(legacy) |

---

## 2. 缓存策略

不同资源类型有不同缓存寿命,平衡速度和更新频率:

| 路径 | Cache-Control | 原因 |
|---|---|---|
| `/_astro/*` | `public, max-age=31536000, immutable` | Astro 构建产物带 hash,永不变 |
| `/fonts/*` | `public, max-age=31536000, immutable` | 字体永不变 |
| `/images/*` | `public, max-age=2592000, stale-while-revalidate=604800` | 30 天缓存 + 7 天异步刷新 |
| `/downloads/*` | `public, max-age=86400, stale-while-revalidate=604800` | 证书 / spec sheet 偶尔更新 |
| `/llms.txt` / `/llms-full.txt` | `public, max-age=3600, stale-while-revalidate=86400` | AI 爬虫频繁读,1 小时足够 |
| `/sitemap*.xml`, `/robots.txt`, `/rss.xml` | `public, max-age=3600, stale-while-revalidate=86400` | 搜索引擎 1 小时抓一次足够 |

---

## 3. 永久重定向

| From | To | 原因 |
|---|---|---|
| `/about-us` | `/about` | 从原 rfidak.com 的 WordPress URL 格式迁移 |
| `/news` → `/blogs` | `/blogs` | 同上 |
| `/news/*` | `/blogs/*` | 旧博客 URL |
| `/product-category/:category` | `/category/:category` | 简化路径 |

**注意**:这些 301 重定向会把原 WordPress 时代(rfidak.com 线上还是 WP 站)积累的 Google 排名和外链**保留**,是搜索引擎友好的迁移方式。

---

## 4. 其他设置

- `cleanUrls: true` — 访问 `/about` 或 `/about.html` 都指向同一资源,URL 无 `.html` 扩展名
- `trailingSlash: false` — 访问 `/about/` 自动 301 到 `/about`,避免 canonical 分裂

---

## 5. 部署后验证(push 成功后做)

### 工具 A:[securityheaders.com](https://securityheaders.com)
输入 `https://www.rfidak.com` — 应得 **A 级或 A+**。如果是 B 或更低,看哪个 header 缺。

### 工具 B:[CSP Evaluator](https://csp-evaluator.withgoogle.com/)
粘贴 CSP 字符串进去,确认没有高危 warning。
**预期警告**(可接受):
- `'unsafe-inline' in script-src` — 因为 Astro 和 rfidakTrack 需要
**不应出现的警告**:
- `'unsafe-eval'` — 如果出现说明有 eval() 代码,要检查

### 工具 C:Chrome DevTools Network 标签
打开 `https://www.rfidak.com`,F12 → Network → 选 `www.rfidak.com` 主文档 → Headers。确认上述所有头部都存在。

### 工具 D:Vercel Analytics 是否还工作
部署后访问几个页面,几小时后在 Vercel Dashboard → Analytics 看是否有数据。如果没有,说明 `connect-src` 漏了域名,需要回来补。

---

## 6. 如果 CSP 误杀了某个功能

症状:某个页面的某个按钮没反应,或图片不加载,或 Vercel Analytics 数据为 0。

诊断:打开 Chrome DevTools → Console,找带 `Refused to load` / `Content Security Policy` 字样的红字错误。错误信息会精确告诉你被 block 的 URL 和违反的指令。

修复:在对应的 CSP 指令里把那个域名加到白名单。例如:
```
// 被 block 的是 https://cdn.example.com/foo.js
// 在 script-src 最后加这个域名:
script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://cdn.example.com;
```

redeploy 后生效。

---

## 7. 后续可加强的项(非必须)

- **移除 `script-src` 的 `'unsafe-inline'`**:改用 nonce 或 hash,安全性更高但实现复杂(需要在 Astro build 时计算所有 inline script 的 SHA-256 hash 并注入 CSP)
- **Content-Security-Policy-Report-Only**:先在生产跑 7 天 `Report-Only` 模式,收集 violation 报告,再切回强制模式
- **Sentry 或 CSP Report 集成**:把 CSP 违反事件上报,持续监控
