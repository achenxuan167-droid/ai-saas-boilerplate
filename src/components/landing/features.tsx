import { Check } from "lucide-react"
import { MouseGlowCard } from "@/components/ui/mouse-glow-card"

const features = [
  { title: "Usage-Based Stripe Billing", description: "Built-in metered billing via Stripe. Support per-token, per-call, or per-seat pricing out of the box. No manual invoicing." },
  { title: "Supabase Auth + Database", description: "Magic link & OAuth sign-in, Row Level Security, and a pre-built subscription table schema. Your data stays yours." },
  { title: "AI-Ready Architecture", description: "Streaming response patterns, token tracking middleware, and a usage quota system ready to plug into Claude, OpenAI, or any API." },
  { title: "Landing Page & Marketing", description: "SEO-optimized landing page, pricing table, blog-ready layout. Launch without needing a separate marketing site." },
  { title: "Dashboard & Analytics", description: "User dashboard with live usage charts, subscription status, billing history. Your customers see what they use." },
  { title: "One-Click Deploy", description: "Deploy to Vercel in one click. Environment variables documented. Production-ready from minute one." },
]

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to launch
          </h2>
          <p className="mt-4 text-lg text-wope-text-soft">
            Stop wiring up Stripe webhooks and Supabase auth for the third time.
            Focus on your AI product, not your billing infrastructure.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <MouseGlowCard
              key={feature.title}
              className={`rounded-2xl border border-wope-border-strong bg-wope-card transition-all duration-300 hover:border-wope-text-muted hover:-translate-y-1 ${i < 3 ? "animate-fade-up" : ""} ${i < 3 ? `animate-fade-up-delay-${i + 1}` : ""}`}
            >
              <div className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-wope-accent/15">
                  <Check className="h-5 w-5 text-wope-accent" />
                </div>
                <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-wope-text-soft">{feature.description}</p>
              </div>
            </MouseGlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
