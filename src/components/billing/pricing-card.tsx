"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import type { PriceConfig } from "@/types"

interface PricingCardProps {
  price: PriceConfig
  onSelect?: (price: PriceConfig) => Promise<void>
}

export function PricingCard({ price, onSelect }: PricingCardProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (onSelect) {
      setLoading(true)
      try {
        await onSelect(price)
      } finally {
        setLoading(false)
      }
      return
    }

    setLoading(true)
    try {
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/api/auth/callback?redirect=/pricing`,
          },
        })
        return
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: price.stripePriceId,
          tier: price.tier,
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 ${
        price.highlighted
          ? "border-ink bg-surface-soft shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px]"
          : "border-hairline bg-canvas"
      }`}
    >
      {price.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1 text-xs font-medium text-white">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-base font-semibold text-ink">{price.name}</h3>
        <p className="mt-2 text-sm text-muted">{price.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-[28px] font-bold text-ink">
          ${(price.monthlyPrice / 100).toFixed(0)}
        </span>
        <span className="ml-1 text-sm text-muted">/month</span>
      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        className={`mb-8 flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
          price.highlighted
            ? "bg-rausch text-white hover:bg-rausch-active"
            : "border border-hairline bg-canvas text-ink hover:bg-surface-soft"
        } disabled:opacity-50`}
      >
        {loading ? <Spinner /> : `Get ${price.name}`}
      </button>

      <ul className="flex flex-col gap-3">
        {price.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-body">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-rausch" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
