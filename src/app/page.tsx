import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Stats } from "@/components/landing/stats"
import { CTA } from "@/components/landing/cta"

export default function LandingPage() {
  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-bold text-gray-900">
          AISaaS
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="/pricing"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Pricing
          </a>
          <a
            href="/auth/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Sign In
          </a>
          <a
            href="/auth/register"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Get Started
          </a>
        </nav>
      </header>
      <main>
        <Hero />
        <Stats />
        <Features />
        <CTA />
      </main>
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        Built by{" "}
        <a href="#" className="underline underline-offset-2 hover:text-gray-700">
          Your Name
        </a>
        . Powered by Next.js + Supabase + Stripe.
      </footer>
    </>
  )
}
