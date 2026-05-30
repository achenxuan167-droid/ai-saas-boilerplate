# AI SaaS Boilerplate

Next.js 16 + Stripe + Supabase 的 AI SaaS 样板项目。已上线 Vercel。

## Deploy
- **URL**: https://ai-saas-boilerplate-beta.vercel.app
- **Git**: `git log` — 2 commits (Initial release)
- **Status**: 已上线，页面内容正常展示

## Stack
| Layer | Tech |
|-------|------|
| Framework | Next.js 16.2.6 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth | Supabase SSR |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe (subscriptions + metered billing) |
| UI | lucide-react, react-hot-toast, clsx, tailwind-merge |

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Landing page (Hero + Features + Stats + CTA)
│   ├── layout.tsx            # Root layout
│   ├── globals.css
│   ├── pricing/              # Pricing page
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── dashboard/        # Main dashboard
│   │   ├── billing/          # Billing management
│   │   └── settings/         # Account settings
│   ├── auth/                 # Login, Register pages
│   └── api/
│       ├── stripe/checkout/  # Create Stripe Checkout session
│       ├── stripe/webhook/   # Stripe webhook handler
│       ├── usage/            # Usage tracking (GET + POST)
│       └── auth/callback/    # OAuth callback
├── components/
│   ├── ui/                   # Button, Card, Toast, Spinner, SignOut
│   ├── billing/              # PricingCard
│   └── landing/              # Hero, Features, Stats, CTA
├── hooks/                    # use-subscription, use-user
├── lib/
│   ├── stripe.ts             # Stripe server client
│   ├── supabase/             # client, server, middleware
│   └── utils.ts
├── types/index.ts
└── middleware.ts             # Auth middleware
```

## Commands
```bash
npm run dev    # 本地开发 (localhost:3000)
npm run build  # 生产构建
npm run start  # 启动生产服务
npm run lint   # ESLint 检查
```

## Stripe Testing
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
```

## 设计规范
所有 UI 开发必须遵循 impeccable 设计标准。
每次写完 UI 代码，自动运行 /impeccable polish。
设计参考：https://reactbits.dev（动画、组件风格、视觉效果）

## 视频处理
当需要分析视频时：
1. 用 ffmpeg 每秒提取1帧：
   ```bash
   ffmpeg -i input.mov -vf fps=1 frames/frame_%04d.jpg
   ```
2. 再逐帧分析图片内容

## Todo / Known Issues
- [ ] Landing page footer "Your Name" 还是占位符，需替换
- [ ] 社交媒体链接 (#) 还是占位符
- [ ] 项目 descriptions 还是占位内容
