export type SubscriptionTier = "free" | "pro" | "enterprise"

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "unpaid"
  | "paused"

export interface Profile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  tier: SubscriptionTier
  status: SubscriptionStatus
  stripe_subscription_id: string | null
  stripe_customer_id: string | null
  current_period_start: string
  current_period_end: string
  created_at: string
}

export interface UsageRecord {
  id: string
  user_id: string
  date: string
  api_calls: number
  tokens_used: number
}

export interface UsageLimit {
  tier: SubscriptionTier
  max_api_calls_per_month: number
  max_tokens_per_month: number
  price_per_additional_call: number // in cents
}

export const USAGE_LIMITS: Record<SubscriptionTier, UsageLimit> = {
  free: {
    tier: "free",
    max_api_calls_per_month: 100,
    max_tokens_per_month: 50_000,
    price_per_additional_call: 0,
  },
  pro: {
    tier: "pro",
    max_api_calls_per_month: 10_000,
    max_tokens_per_month: 1_000_000,
    price_per_additional_call: 0.01, // $0.0001 per additional call
  },
  enterprise: {
    tier: "enterprise",
    max_api_calls_per_month: 100_000,
    max_tokens_per_month: 10_000_000,
    price_per_additional_call: 0.005,
  },
}

export interface PriceConfig {
  tier: SubscriptionTier
  name: string
  description: string
  monthlyPrice: number // in cents
  features: string[]
  highlighted?: boolean
  stripePriceId: string
}
