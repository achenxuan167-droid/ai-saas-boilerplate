"use client"

import { PricingCard } from "@/components/billing/pricing-card"
import type { PriceConfig } from "@/types"

const prices: PriceConfig[] = [
  {
    tier: "free",
    name: "Free",
    description: "Try it out before you buy.",
    monthlyPrice: 0,
    stripePriceId: "price_free",
    features: [
      "100 API calls / month",
      "50K tokens / month",
      "Basic dashboard",
      "Community support",
    ],
  },
  {
    tier: "pro",
    name: "Pro",
    description: "For production AI apps.",
    monthlyPrice: 1000,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "price_pro",
    highlighted: true,
    features: [
      "10,000 API calls / month",
      "1M tokens / month",
      "Usage analytics dashboard",
      "Stripe metered billing",
      "Priority email support",
      "Cancel anytime",
    ],
  },
  {
    tier: "enterprise",
    name: "Enterprise",
    description: "For high-volume apps.",
    monthlyPrice: 5000,
    stripePriceId:
      process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID ?? "price_enterprise",
    features: [
      "100,000 API calls / month",
      "10M tokens / month",
      "Everything in Pro, plus:",
      "Custom rate limits",
      "API key management",
      "Team members",
      "99.9% SLA",
      "Dedicated support",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="/" className="text-base font-semibold text-ink">
          AISaaS
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="/auth/login"
            className="text-sm font-medium text-muted hover:text-ink"
          >
            Sign In
          </a>
          <a
            href="/auth/register"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-rausch px-4 text-sm font-medium text-white transition-colors hover:bg-rausch-active"
          >
            Get Started
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-[28px] font-bold leading-[1.43] text-ink sm:text-4xl">
            Simple, usage-based pricing
          </h1>
          <p className="mt-4 text-base text-body">
            Start free. Upgrade when you grow. No hidden fees.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3">
          {prices.map((price) => (
            <PricingCard key={price.tier} price={price} />
          ))}
        </div>
      </main>
    </div>
  )
}
