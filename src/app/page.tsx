import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Stats } from "@/components/landing/stats"
import { CTA } from "@/components/landing/cta"

export default function LandingPage() {
  return (
    <>
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="/" className="text-base font-semibold text-ink">
          AISaaS
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="/pricing"
            className="text-sm font-medium text-muted hover:text-ink"
          >
            Pricing
          </a>
          <a
            href="/auth/login"
            className="text-sm font-medium text-muted hover:text-ink"
          >
            Sign In
          </a>
          <a
            href="/auth/register"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-rausch px-4 text-sm font-medium text-white transition-colors hover:bg-rausch-active"
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
      <footer className="border-t border-hairline px-6 py-8 text-center text-sm text-muted">
        Built by{" "}
        <a href="#" className="underline underline-offset-2 hover:text-ink">
          Your Name
        </a>
        . Powered by Next.js + Supabase + Stripe.
      </footer>
    </>
  )
}
