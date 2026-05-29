import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { absoluteUrl } from "@/lib/utils"

export async function POST(req: Request) {
  try {
    const { priceId, tier } = await req.json()
    const stripe = getStripe()

    // Get the current user from Supabase
    const supabase = createServerSupabaseClient()
    const authHeader = req.headers.get("Authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token)

    if (!user?.email) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create or retrieve Stripe customer
    const { data: existingSub } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single()

    let customerId: string | undefined = existingSub?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id },
      })
      customerId = customer.id
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: absoluteUrl("/dashboard?checkout=success"),
      cancel_url: absoluteUrl("/pricing?checkout=canceled"),
      metadata: {
        user_id: user.id,
        tier,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
