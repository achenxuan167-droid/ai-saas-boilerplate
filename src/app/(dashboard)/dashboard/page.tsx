"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Spinner, FullPageSpinner } from "@/components/ui/spinner"

interface UsageData {
  tier: string
  status: string
  usage: {
    api_calls: number
    tokens_used: number
    limit_api_calls: number
    limit_tokens: number
  }
}

export default function DashboardPage() {
  const [session, setSession] = useState<object | null>(null)
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

      if (session?.access_token) {
        fetch("/api/usage", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUsage(data)
          })
          .finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })
  }, [])

  if (loading) return <FullPageSpinner />

  if (!session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to view your dashboard
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You need to be signed in to see your usage and billing
              information.
            </p>
            <a
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Go Home
            </a>
          </CardContent>
        </Card>
      </div>
    )
  }

  const apiPercent = usage
    ? Math.round(
        (usage.usage.api_calls / usage.usage.limit_api_calls) * 100
      )
    : 0
  const tokenPercent = usage
    ? Math.round(
        (usage.usage.tokens_used / usage.usage.limit_tokens) * 100
      )
    : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back. Here&apos;s your current usage.
        </p>
      </div>

      {/* Plan info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              Current Plan
            </h2>
            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
              {usage?.status ?? "active"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-gray-900">
            {usage?.tier === "pro"
              ? "Pro"
              : usage?.tier === "enterprise"
                ? "Enterprise"
                : "Free"}
          </p>
          <a
            href="/billing"
            className="mt-2 inline-block text-sm font-medium text-gray-600 underline underline-offset-2 hover:text-gray-900"
          >
            Manage subscription →
          </a>
        </CardContent>
      </Card>

      {/* Usage stats */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-gray-600">
              API Calls
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              {usage?.usage.api_calls.toLocaleString() ?? 0}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              of {usage?.usage.limit_api_calls.toLocaleString() ?? 0} allowed
            </p>
            <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-gray-900 transition-all"
                style={{ width: `${Math.min(apiPercent, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-gray-600">Tokens Used</h3>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              {(usage?.usage.tokens_used ?? 0).toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              of {(usage?.usage.limit_tokens ?? 0).toLocaleString()} allowed
            </p>
            <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-gray-900 transition-all"
                style={{ width: `${Math.min(tokenPercent, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
