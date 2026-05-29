# AISaaS Boilerplate

**The Next.js boilerplate with usage-based Stripe billing built-in.**

Stop wiring up Stripe webhooks and Supabase auth for the third time. Focus on your AI product, not your billing infrastructure.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Usage-Based Billing** | Stripe metered billing — per-token, per-call, or per-seat pricing |
| **Auth** | Supabase Auth with Magic Link & Google OAuth |
| **Database** | Supabase with Row Level Security and pre-built schemas |
| **AI-Ready** | Token tracking, usage quotas, streaming response patterns |
| **Dashboard** | Live usage charts, subscription status, billing history |
| **Landing Page** | SEO-optimized marketing site with pricing table |
| **One-Click Deploy** | Deploy to Vercel in minutes |

## 🧱 Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Auth | Supabase Auth |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe (subscriptions + metered billing) |
| Deployment | Vercel |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)
- A [Stripe](https://stripe.com) account (test mode)

### 1. Clone & install

```bash
git clone https://github.com/your-org/ai-saas-boilerplate.git my-ai-app
cd my-ai-app
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration at `supabase/migrations/001_init.sql`
3. Go to **Project Settings → API** and copy your URL and anon key
4. Go to **Authentication → Providers** and enable Google (optional)

### 3. Set up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create two products in **Stripe Dashboard → Products**:
   - **Pro** — $10/month (recurring)
   - **Enterprise** — $50/month (recurring)
3. Copy the Price IDs (looks like `price_abc123`)
4. Get your API keys from **Stripe Dashboard → Developers → API Keys**

### 4. Configure environment

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_pro_...
NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID=price_enterprise_...
NEXT_PUBLIC_SITE_URL=localhost:3000
```

### 5. Start Stripe webhook forwarding

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret (`whsec_...`) to your `.env.local`.

### 6. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're live.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── pricing/              # Pricing page
│   ├── (dashboard)/          # Protected dashboard routes
│   │   └── dashboard/        # Main dashboard
│   │   └── billing/          # Billing management
│   │   └── settings/         # Account settings
│   └── api/
│       ├── stripe/
│       │   ├── checkout/     # Create Stripe Checkout session
│       │   └── webhook/      # Stripe webhook handler
│       ├── usage/            # Usage tracking (GET + POST)
│       └── auth/callback/    # OAuth callback handler
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── billing/              # Billing-related components
│   └── landing/              # Landing page sections
├── hooks/                    # React hooks
├── lib/
│   ├── stripe.ts             # Stripe server client
│   ├── supabase/             # Supabase clients (browser + server)
│   └── utils.ts              # Helpers
├── types/                    # TypeScript types
└── middleware.ts             # Auth middleware
```

## 🔌 Tracking Usage in Your AI App

To track API usage from your AI route:

```typescript
// In your AI API route (app/api/chat/route.ts)
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "")
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser(token)

  // ✅ Track this call
  await fetch(new URL("/api/usage", process.env.NEXT_PUBLIC_SITE_URL).toString(), {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ api_calls: 1, tokens_used: 450 }),
  })

  // Your AI logic here...
}
```

## 🧪 Stripe Webhook Testing

```bash
# Trigger a checkout session completed event
stripe trigger checkout.session.completed

# Trigger a subscription update
stripe trigger customer.subscription.updated
```

## 🚢 Deployment

Deploy to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/ai-saas-boilerplate)

Set the same environment variables from `.env.local` in your Vercel project dashboard.

## 📝 License

MIT — use it for anything, commercial or personal.

## 🙋 FAQ

**Can I use this for a non-AI SaaS?**
Yes. The usage-based billing works for any subscription — just remove the token tracking.

**Do I need to keep the landing page?**
No. The landing page is yours to customize, replace, or remove.

**How long does it take to set up?**
About 30 minutes to configure Stripe + Supabase, clone, and deploy.

**Will you add new features?**
Yes — this is actively maintained. Buyers get lifetime updates.
