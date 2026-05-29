"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { FullPageSpinner } from "@/components/ui/spinner"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()
      const params = new URLSearchParams(window.location.hash.slice(1))
      const accessToken = params.get("access_token")
      const refreshToken = params.get("refresh_token")

      if (accessToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken ?? "",
        })
      }

      // Also handle code exchange from the query params
      const code = new URLSearchParams(window.location.search).get("code")
      if (code) {
        await supabase.auth.exchangeCodeForSession(code)
      }

      const next = new URLSearchParams(window.location.search).get("next") ?? "/dashboard"
      router.push(next)
    }

    handleCallback()
  }, [router])

  return <FullPageSpinner />
}
