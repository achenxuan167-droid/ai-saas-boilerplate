"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { MouseGlowCard } from "@/components/ui/mouse-glow-card"
import { createClient } from "@/lib/supabase/client"
import type { PriceConfig } from "@/types"

interface PricingCardProps {
  price: PriceConfig
  onSelect?: (price: PriceConfig) => Promise<void>
}

export function PricingCard({ price, onSelect }: PricingCardProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (onSelect) { setLoading(true); try { await onSelect(price) } finally { setLoading(false) }; return }
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/api/auth/callback?redirect=/pricing` } })
        return
      }
      const response = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ priceId: price.stripePriceId, tier: price.tier }) })
      const data = await response.json()
      if (data.url) window.location.href = data.url
    } catch (error) { console.error("Checkout error:", error) } finally { setLoading(false) }
  }

  const cardClass = price.highlighted
    ? "rounded-2xl border border-wope-accent/40 bg-wope-card shadow-[0_0_40px_rgba(113,61,255,0.2)] hover:shadow-[0_0_60px_rgba(113,61,255,0.3)] transition-shadow"
    : "rounded-2xl border border-wope-border-strong bg-wope-card transition-all duration-300 hover:border-wope-text-muted hover:-translate-y-1"

  return (
    <MouseGlowCard className={cardClass}>
      <div className="p-8">
        {price.highlighted && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-wope-accent px-4 py-1 text-xs font-medium text-white shadow-[0_0_20px_rgba(113,61,255,0.4)]">
            Most Popular
          </div>
        )}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white">{price.name}</h3>
          <p className="mt-2 text-sm text-wope-text-soft">{price.description}</p>
        </div>
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">${(price.monthlyPrice / 100).toFixed(0)}</span>
          <span className="ml-1 text-sm text-wope-text-muted">/month</span>
        </div>
        <button onClick={handleClick} disabled={loading}
          className={`mb-8 flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
            price.highlighted
              ? "btn-glow bg-wope-accent text-white hover:bg-wope-accent-hover hover:scale-105"
              : "border border-wope-border text-wope-text-soft hover:bg-wope-card-soft hover:text-white"
          }`}>
          {loading ? <Spinner /> : `Get ${price.name}`}
        </button>
        <ul className="flex flex-col gap-3">
          {price.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-wope-text-soft">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-wope-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </MouseGlowCard>
  )
}
