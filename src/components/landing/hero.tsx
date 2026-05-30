export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="animate-fade-up mb-6 inline-flex items-center rounded-full border border-wope-border bg-wope-card-soft px-4 py-1.5 text-sm font-medium uppercase tracking-widest text-wope-text-soft backdrop-blur-sm">
          Built for solo founders &amp; indie hackers
        </div>

        {/* Gradient Headline */}
        <h1 className="animate-fade-up animate-fade-up-delay-1 text-gradient text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl">
          Ship your AI SaaS in days, not months
        </h1>

        <p className="animate-fade-up animate-fade-up-delay-2 mt-6 text-lg leading-8 text-wope-text-soft">
          The Next.js boilerplate with{" "}
          <span className="font-semibold text-white">
            usage-based Stripe billing
          </span>{" "}
          built-in. Auth, payments, Supabase, and UX components &mdash;
          everything you need to launch your AI product, already integrated.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up animate-fade-up-delay-3 mt-10 flex items-center justify-center gap-4">
          <a
            href="/pricing"
            className="btn-glow inline-flex h-12 items-center justify-center rounded-full bg-wope-accent px-8 text-base font-medium text-white transition-all duration-200 hover:bg-wope-accent-hover hover:scale-105"
          >
            Get Access — $99
          </a>
          <a
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-full border border-wope-border bg-wope-card/50 px-8 text-base font-medium text-wope-text-soft backdrop-blur-sm transition-all duration-200 hover:border-wope-text-muted hover:text-white"
          >
            See Features
          </a>
        </div>

        <p className="animate-fade-up animate-fade-up-delay-4 mt-4 text-sm text-wope-text-muted">
          No subscription. Lifetime updates. Built with Next.js 15 + TypeScript.
        </p>
      </div>
    </section>
  )
}
