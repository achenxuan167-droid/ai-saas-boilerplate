import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    if (!signature) {
      return NextResponse.json(
        { error: "No signature" },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    const supabase = createServerSupabaseClient()

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const userId = session.metadata?.user_id
        const tier = session.metadata?.tier ?? "pro"

        if (!userId) {
          console.error("No user_id in session metadata")
          break
        }

        // Upsert subscription record
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        )

        const sub = subscription as unknown as {
          status: string
          id: string
          current_period_start: number
          current_period_end: number
        }
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          tier,
          status: sub.status,
          stripe_subscription_id: sub.id,
          stripe_customer_id: session.customer as string,
          current_period_start: new Date(
            sub.current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(
            sub.current_period_end * 1000
          ).toISOString(),
        })

        break
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subEvent = event.data.object as unknown as {
          id: string
          customer: string
          status: string
          current_period_start: number
          current_period_end: number
        }

        // Find the user by customer ID
        const { data: users } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", subEvent.customer)
          .single()

        if (!users) {
          console.error("No subscription found for customer:", subEvent.customer)
          break
        }

        const status = subEvent.status === "active" ? "active" : "canceled"

        await supabase
          .from("subscriptions")
          .update({
            status,
            current_period_start: new Date(
              subEvent.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              subEvent.current_period_end * 1000
            ).toISOString(),
          })
          .eq("stripe_customer_id", subEvent.customer)

        break
      }

      case "invoice.paid": {
        // Reset usage for the billing period
        const invoice = event.data.object
        const customerId = invoice.customer as string

        const { data: userSubscription } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single()

        if (userSubscription) {
          // Archive old usage records
          await supabase
            .from("usage_records")
            .update({ billing_period_ended: true })
            .eq("user_id", userSubscription.user_id)
        }

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    )
  }
}
