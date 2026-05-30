"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Spinner, FullPageSpinner } from "@/components/ui/spinner"

interface UsageData {
  tier: string; status: string
  usage: { api_calls: number; tokens_used: number; limit_api_calls: number; limit_tokens: number }
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
        fetch("/api/usage", { headers: { Authorization: `Bearer ${session.access_token}` } })
          .then((res) => res.json()).then(setUsage).finally(() => setLoading(false))
      } else setLoading(false)
    })
  }, [])

  if (loading) return <FullPageSpinner />
  if (!session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8">
            <h2 className="text-lg font-semibold text-white">Sign in to view your dashboard</h2>
            <p className="mt-2 text-sm text-wope-text-soft">You need to be signed in to see your usage.</p>
            <a href="/" className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-wope-accent px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-wope-accent-hover">Go Home</a>
          </CardContent>
        </Card>
      </div>
    )
  }

  const apiPercent = usage ? Math.round((usage.usage.api_calls / usage.usage.limit_api_calls) * 100) : 0
  const tokenPercent = usage ? Math.round((usage.usage.tokens_used / usage.usage.limit_tokens) * 100) : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-wope-text-soft">Welcome back. Here&apos;s your current usage.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Current Plan</h2>
            <span className="inline-flex items-center rounded-full bg-wope-green px-2.5 py-0.5 text-xs font-medium text-wope-green-text">{usage?.status ?? "active"}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-white">{usage?.tier === "pro" ? "Pro" : usage?.tier === "enterprise" ? "Enterprise" : "Free"}</p>
          <a href="/billing" className="mt-2 inline-block text-sm font-medium text-wope-accent underline underline-offset-2 hover:text-wope-accent-hover">Manage subscription →</a>
        </CardContent>
      </Card>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader><h3 className="text-sm font-medium text-wope-text-soft">API Calls</h3></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{usage?.usage.api_calls.toLocaleString() ?? 0}</p>
            <p className="mt-1 text-sm text-wope-text-muted">of {usage?.usage.limit_api_calls.toLocaleString() ?? 0} allowed</p>
            <div className="mt-3 h-2 w-full rounded-full bg-wope-card-soft">
              <div className="h-2 rounded-full bg-gradient-to-r from-wope-accent to-wope-accent-hover transition-all" style={{ width: `${Math.min(apiPercent, 100)}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h3 className="text-sm font-medium text-wope-text-soft">Tokens Used</h3></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{(usage?.usage.tokens_used ?? 0).toLocaleString()}</p>
            <p className="mt-1 text-sm text-wope-text-muted">of {(usage?.usage.limit_tokens ?? 0).toLocaleString()} allowed</p>
            <div className="mt-3 h-2 w-full rounded-full bg-wope-card-soft">
              <div className="h-2 rounded-full bg-gradient-to-r from-wope-accent to-wope-accent-hover transition-all" style={{ width: `${Math.min(tokenPercent, 100)}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
