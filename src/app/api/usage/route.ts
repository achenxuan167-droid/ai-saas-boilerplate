import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { USAGE_LIMITS, type SubscriptionTier } from "@/types"

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const authHeader = req.headers.get("Authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get user's subscription tier
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("tier, status")
      .eq("user_id", user.id)
      .single()

    const tier: SubscriptionTier = subscription?.tier ?? "free"
    const limits = USAGE_LIMITS[tier]

    // Get current usage for this month
    const currentMonth = new Date().toISOString().slice(0, 7)
    const { data: usage } = await supabase
      .from("usage_records")
      .select("api_calls, tokens_used")
      .eq("user_id", user.id)
      .eq("month", currentMonth)
      .single()

    const currentCalls = usage?.api_calls ?? 0
    const currentTokens = usage?.tokens_used ?? 0

    // Check if over limit
    if (currentCalls >= limits.max_api_calls_per_month) {
      return NextResponse.json(
        { error: "API call limit reached", code: "OVER_LIMIT" },
        { status: 429 }
      )
    }

    if (currentTokens >= limits.max_tokens_per_month) {
      return NextResponse.json(
        { error: "Token limit reached", code: "OVER_LIMIT" },
        { status: 429 }
      )
    }

    // Record the usage
    const { api_calls: apiCalls = 1, tokens_used: tokensUsed = 0 } =
      await req.json()

    await supabase.from("usage_records").upsert(
      {
        user_id: user.id,
        month: currentMonth,
        api_calls: currentCalls + apiCalls,
        tokens_used: currentTokens + tokensUsed,
      },
      { onConflict: "user_id,month" }
    )

    return NextResponse.json({
      allowed: true,
      usage: {
        api_calls: currentCalls + apiCalls,
        tokens_used: currentTokens + tokensUsed,
        limit_api_calls: limits.max_api_calls_per_month,
        limit_tokens: limits.max_tokens_per_month,
      },
    })
  } catch (error) {
    console.error("Usage error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET current usage without recording
export async function GET(req: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const authHeader = req.headers.get("Authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("tier, status")
      .eq("user_id", user.id)
      .single()

    const tier: SubscriptionTier = subscription?.tier ?? "free"
    const limits = USAGE_LIMITS[tier]

    const currentMonth = new Date().toISOString().slice(0, 7)
    const { data: usage } = await supabase
      .from("usage_records")
      .select("api_calls, tokens_used")
      .eq("user_id", user.id)
      .eq("month", currentMonth)
      .single()

    return NextResponse.json({
      tier,
      status: subscription?.status ?? "active",
      usage: {
        api_calls: usage?.api_calls ?? 0,
        tokens_used: usage?.tokens_used ?? 0,
        limit_api_calls: limits.max_api_calls_per_month,
        limit_tokens: limits.max_tokens_per_month,
      },
    })
  } catch (error) {
    console.error("Usage fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
