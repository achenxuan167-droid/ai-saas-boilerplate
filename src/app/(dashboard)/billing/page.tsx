"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FullPageSpinner } from "@/components/ui/spinner"
import { useSubscription } from "@/hooks/use-subscription"
import { formatDate } from "@/lib/utils"

export default function BillingPage() {
  const { subscription, loading } = useSubscription()
  const [session, setSession] = useState<object | null>(null)

  useEffect(() => { createClient().auth.getSession().then(({ data }) => setSession(data.session)) }, [])

  if (loading) return <FullPageSpinner />
  if (!session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8">
            <h2 className="text-lg font-semibold text-white">Sign in to manage billing</h2>
            <p className="mt-2 text-sm text-wope-text-soft">You need to be signed in to view or change your subscription.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="mt-1 text-sm text-wope-text-soft">Manage your subscription and payment methods.</p>
      </div>
      <Card>
        <CardHeader><h2 className="text-base font-semibold text-white">Subscription Details</h2></CardHeader>
        <CardContent>
          {subscription ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-wope-text-soft">Plan</p><p className="mt-1 font-medium text-white">{subscription.tier === "pro" ? "Pro" : subscription.tier === "enterprise" ? "Enterprise" : "Free"}</p></div>
                <div><p className="text-sm text-wope-text-soft">Status</p><span className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${subscription.status === "active" ? "bg-wope-green text-wope-green-text" : "bg-yellow-500/15 text-yellow-400"}`}>{subscription.status}</span></div>
                <div><p className="text-sm text-wope-text-soft">Period start</p><p className="mt-1 font-medium text-white">{formatDate(subscription.current_period_start)}</p></div>
                <div><p className="text-sm text-wope-text-soft">Period end</p><p className="mt-1 font-medium text-white">{formatDate(subscription.current_period_end)}</p></div>
              </div>
              {subscription.stripe_customer_id && (
                <a href={`https://dashboard.stripe.com/customers/${subscription.stripe_customer_id}`} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-wope-border px-5 text-sm font-medium text-wope-text-soft transition-colors hover:bg-wope-card-soft hover:text-white">
                  Manage in Stripe →
                </a>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-wope-text-soft">You&apos;re on the Free plan.</p>
              <a href="/pricing" className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-wope-accent px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-wope-accent-hover hover:shadow-[0_0_20px_rgba(113,61,255,0.3)]">Upgrade →</a>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><h2 className="text-base font-semibold text-white">Current Charges</h2></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-wope-text-soft">Base plan</span><span className="font-medium text-white">{subscription?.tier === "pro" ? "$10/mo" : subscription?.tier === "enterprise" ? "$50/mo" : "$0/mo"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-wope-text-soft">Additional usage</span><span className="font-medium text-white">$0.00</span></div>
            <div className="border-t border-wope-border pt-3">
              <div className="flex justify-between text-sm"><span className="font-medium text-white">Total</span><span className="font-medium text-white">{subscription?.tier === "pro" ? "$10/mo" : subscription?.tier === "enterprise" ? "$50/mo" : "$0/mo"}</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
