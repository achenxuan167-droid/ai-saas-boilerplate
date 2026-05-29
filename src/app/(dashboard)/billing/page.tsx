"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FullPageSpinner } from "@/components/ui/spinner"
import { useSubscription } from "@/hooks/use-subscription"
import { formatDate, formatAmount } from "@/lib/utils"

export default function BillingPage() {
  const { subscription, loading } = useSubscription()
  const [session, setSession] = useState<object | null>(null)

  useEffect(() => {
    createClient().auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
  }, [])

  if (loading) return <FullPageSpinner />

  if (!session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to manage billing
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You need to be signed in to view or change your subscription.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your subscription and payment methods.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-gray-900">
            Subscription Details
          </h2>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {subscription.tier === "pro"
                      ? "Pro"
                      : subscription.tier === "enterprise"
                        ? "Enterprise"
                        : "Free"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      subscription.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current period start</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {formatDate(subscription.current_period_start)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current period end</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {formatDate(subscription.current_period_end)}
                  </p>
                </div>
              </div>

              {subscription.stripe_customer_id && (
                <a
                  href={`https://dashboard.stripe.com/customers/${subscription.stripe_customer_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Manage in Stripe →
                </a>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">
                You&apos;re on the Free plan.
              </p>
              <a
                href="/pricing"
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Upgrade →
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Price breakdown */}
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-gray-900">
            Current Charges
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base plan</span>
              <span className="font-medium text-gray-900">
                {subscription?.tier === "pro"
                  ? "$10/mo"
                  : subscription?.tier === "enterprise"
                    ? "$50/mo"
                    : "$0/mo"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Additional usage</span>
              <span className="font-medium text-gray-900">$0.00</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-medium text-gray-900">
                  {subscription?.tier === "pro"
                    ? "$10/mo"
                    : subscription?.tier === "enterprise"
                      ? "$50/mo"
                      : "$0/mo"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
