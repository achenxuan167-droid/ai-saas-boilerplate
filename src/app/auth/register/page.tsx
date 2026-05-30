"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })
      if (error) setError(error.message)
      else if (data.session) router.push("/dashboard")
      else setSuccess(true)
    } catch {
      setError("Registration failed.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-wope-bg px-4">
        <div className="w-full max-w-sm rounded-2xl border border-wope-border bg-wope-card p-8 text-center">
          <p className="font-medium text-white">Check your email!</p>
          <p className="mt-2 text-sm text-wope-text-soft">
            We sent a confirmation link to <strong>{email}</strong>.
          </p>
          <a href="/auth/login" className="mt-4 inline-block text-sm font-medium text-wope-accent underline underline-offset-2">Back to sign in</a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-wope-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <a href="/" className="text-lg font-bold text-white">AISaaS</a>
          <h1 className="mt-6 text-2xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-wope-text-soft">Start building your AI SaaS today.</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-wope-text-soft">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
              className="mt-1 block h-12 w-full rounded-2xl border border-wope-border bg-wope-card px-4 text-white placeholder-wope-text-muted outline-none transition-colors focus:border-wope-accent" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-wope-text-soft">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="mt-1 block h-12 w-full rounded-2xl border border-wope-border bg-wope-card px-4 text-white placeholder-wope-text-muted outline-none transition-colors focus:border-wope-accent" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-wope-text-soft">Password</label>
            <input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters"
              className="mt-1 block h-12 w-full rounded-2xl border border-wope-border bg-wope-card px-4 text-white placeholder-wope-text-muted outline-none transition-colors focus:border-wope-accent" />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-full bg-wope-accent text-sm font-medium text-white transition-all duration-200 hover:bg-wope-accent-hover hover:shadow-[0_0_24px_rgba(113,61,255,0.3)] disabled:opacity-50">
            {loading ? <Spinner /> : "Create account"}
          </button>
          <p className="text-center text-sm text-wope-text-muted">
            Already have an account?{" "}
            <a href="/auth/login" className="font-medium text-white underline underline-offset-2">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  )
}
