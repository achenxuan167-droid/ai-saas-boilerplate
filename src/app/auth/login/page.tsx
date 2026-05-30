"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push("/dashboard")
    } catch {
      setError("Login failed.")
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
      })
      if (error) setError(error.message)
      else setSent(true)
    } catch {
      setError("Failed to send magic link.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-wope-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <a href="/" className="text-lg font-bold text-white">AISaaS</a>
          <h1 className="mt-6 text-2xl font-bold text-white">Sign in to your account</h1>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-wope-border bg-wope-card p-6 text-center">
            <p className="font-medium text-white">Check your email!</p>
            <p className="mt-1 text-sm text-wope-text-soft">
              We sent a magic link to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-wope-text-soft">Email</label>
              <input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 block h-12 w-full rounded-2xl border border-wope-border bg-wope-card px-4 text-white placeholder-wope-text-muted outline-none transition-colors focus:border-wope-accent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-wope-text-soft">Password</label>
              <input
                id="password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="mt-1 block h-12 w-full rounded-2xl border border-wope-border bg-wope-card px-4 text-white placeholder-wope-text-muted outline-none transition-colors focus:border-wope-accent"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-full bg-wope-accent text-sm font-medium text-white transition-all duration-200 hover:bg-wope-accent-hover hover:shadow-[0_0_24px_rgba(113,61,255,0.3)] disabled:opacity-50"
            >
              {loading ? <Spinner /> : "Sign in"}
            </button>
            <p className="text-center text-sm text-wope-text-muted">
              Don&apos;t have an account?{" "}
              <a href="/auth/register" className="font-medium text-white underline underline-offset-2">Create one</a>
            </p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-wope-border" /></div>
              <div className="relative flex justify-center text-sm"><span className="bg-wope-bg px-2 text-wope-text-muted">or</span></div>
            </div>
            <button type="button" onClick={handleMagicLink} disabled={!email}
              className="flex h-12 w-full items-center justify-center rounded-full border border-wope-border text-sm font-medium text-wope-text-soft transition-colors hover:bg-wope-card-soft hover:text-white disabled:opacity-50">
              Send magic link
            </button>
            <button type="button" onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
              })
            }}
              className="flex h-12 w-full items-center justify-center rounded-full border border-wope-border text-sm font-medium text-wope-text-soft transition-colors hover:bg-wope-card-soft hover:text-white">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-wope-text-muted">By signing in, you agree to our Terms of Service.</p>
      </div>
    </div>
  )
}
