import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { Subscription } from "@/types"

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("subscriptions")
      .select("*")
      .single()
      .then(({ data }) => {
        setSubscription(data)
        setLoading(false)
      })
  }, [])

  return { subscription, loading }
}
