"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FullPageSpinner } from "@/components/ui/spinner"
import type { User } from "@supabase/supabase-js"

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        setUser(data.user)
        setLoading(false)
      })
  }, [])

  if (loading) return <FullPageSpinner />

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-gray-900">Profile</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="mt-1 font-medium text-gray-900">
                {user?.email ?? "—"}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">User ID</label>
              <p className="mt-1 font-mono text-sm text-gray-500">
                {user?.id ?? "—"}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Signed up</label>
              <p className="mt-1 font-medium text-gray-900">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
