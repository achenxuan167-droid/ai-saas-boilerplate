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
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })

      if (error) {
        setError(error.message)
      } else if (data.session) {
        router.push("/dashboard")
      } else {
        setSuccess(true)
      }
    } catch {
      setError("Registration failed. Is Supabase configured?")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
        <div className="w-full max-w-sm rounded-2xl border border-hairline bg-surface-soft p-8 text-center">
          <p className="font-medium text-ink">Check your email!</p>
          <p className="mt-2 text-sm text-muted">
            We sent a confirmation link to <strong>{email}</strong>.
            Click it to activate your account.
          </p>
          <a
            href="/auth/login"
            className="mt-4 inline-block text-sm font-medium text-ink underline underline-offset-2"
          >
            Back to sign in
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <a href="/" className="text-base font-semibold text-ink">
            AISaaS
          </a>
          <h1 className="mt-6 text-[22px] font-medium leading-[1.18] text-ink">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted">
            Start building your AI SaaS today.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-ink"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-1 block h-12 w-full rounded-lg border border-hairline px-3 py-2 text-base text-ink placeholder-muted-soft focus:border-ink focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ink"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 block h-12 w-full rounded-lg border border-hairline px-3 py-2 text-base text-ink placeholder-muted-soft focus:border-ink focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-ink"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="mt-1 block h-12 w-full rounded-lg border border-hairline px-3 py-2 text-base text-ink placeholder-muted-soft focus:border-ink focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-[#c13515]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-rausch px-4 text-base font-medium text-white hover:bg-rausch-active disabled:opacity-50"
          >
            {loading ? <Spinner /> : "Create account"}
          </button>

          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-medium text-ink underline underline-offset-2"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
