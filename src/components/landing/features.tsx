import { Check } from "lucide-react"

const features = [
  {
    title: "Usage-Based Stripe Billing",
    description:
      "Built-in metered billing via Stripe. Support per-token, per-call, or per-seat pricing out of the box. No manual invoicing.",
  },
  {
    title: "Supabase Auth + Database",
    description:
      "Magic link & OAuth sign-in, Row Level Security, and a pre-built subscription table schema. Your data stays yours.",
  },
  {
    title: "AI-Ready Architecture",
    description:
      "Streaming response patterns, token tracking middleware, and a usage quota system ready to plug into Claude, OpenAI, or any API.",
  },
  {
    title: "Landing Page & Marketing",
    description:
      "SEO-optimized landing page, pricing table, blog-ready layout. Launch without needing a separate marketing site.",
  },
  {
    title: "Dashboard & Analytics",
    description:
      "User dashboard with live usage charts, subscription status, billing history. Your customers see what they use.",
  },
  {
    title: "One-Click Deploy",
    description:
      "Deploy to Vercel in one click. Environment variables documented. Production-ready from minute one.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-b border-gray-200 py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to launch
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Stop wiring up Stripe webhooks and Supabase auth for the third time.
            Focus on your AI product, not your billing infrastructure.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900">
                <Check className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
