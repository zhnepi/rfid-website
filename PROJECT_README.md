# ProudTek RFID - Astro Website

基于 rfidak.com 复现的 RFID 产品网站，使用 Astro 框架构建。

## 技术栈

- **框架**: Astro v5.16.9
- **样式**: Tailwind CSS v4
- **字体**: Google Fonts (Poppins, Dancing Script)

## 项目结构

```
proudtek-rfid/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── HeroSlider.astro
│   │   ├── ServiceCards.astro
│   │   ├── AboutSection.astro
│   │   ├── FeaturedProducts.astro
│   │   ├── ApplicationsSection.astro
│   │   ├── BlogPreview.astro
│   │   ├── Testimonials.astro
│   │   └── Newsletter.astro
│   ├── data/
│   │   └── products.ts   # 产品数据（36个产品）
│   ├── layouts/
│   │   └── Layout.astro  # 主布局
│   ├── pages/
│   │   ├── index.astro   # 首页
│   │   ├── about.astro   # 关于我们
│   │   ├── rfid.astro    # RFID产品列表
│   │   ├── products.astro # 产品分类
│   │   ├── blogs.astro   # 博客
│   │   ├── contact.astro # 联系我们
│   │   └── product/
│   │       └── [slug].astro  # 产品详情页（动态路由）
│   └── styles/
│       └── global.css    # 全局样式
├── public/
│   ├── favicon.svg
│   └── images/
│       └── products/     # 产品图片
└── dist/                 # 构建输出目录（42个页面）
```

## 页面列表

### 主要页面（6个）
| 页面 | 路径 | 描述 |
|------|------|------|
| 首页 | `/` | 轮播横幅、服务介绍、公司简介、特色产品、应用场景、博客预览、客户评价 |
| 关于我们 | `/about` | 公司介绍、15年经验、8大优势、统计数据 |
| RFID产品 | `/rfid` | 36个RFID产品网格展示 |
| 产品分类 | `/products` | 产品分类页面 |
| 博客 | `/blogs` | 博客文章列表 |
| 联系我们 | `/contact` | 联系信息和表单 |

### 产品详情页（36个）
所有产品详情页路径格式: `/product/[slug]`

每个产品详情页包含：
- 产品图片画廊（支持多图切换）
- 产品描述
- 规格参数表
- 相关产品推荐
- 面包屑导航
- 询价按钮

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 功能特点

- **响应式设计**: 支持桌面和移动设备
- **产品图片画廊**: 产品详情页支持多图切换
- **规格参数表**: 每个产品都有详细的规格参数
- **相关产品推荐**: 产品详情页显示同类别的相关产品
- **面包屑导航**: 产品详情页有清晰的导航路径
- **SEO友好**: 每个页面都有独立的标题

## 设计特点

- **主色调**: 青色 (#00bcd4)
- **字体**: Poppins (正文), Dancing Script (装饰标题)
- **卡片布局**: 产品以网格卡片形式展示
- **悬停效果**: 产品卡片有放大和阴影效果

## 部署

构建后的静态文件位于 `dist/` 目录，可以部署到任何静态托管服务:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 许可

仅供学习和参考使用。
