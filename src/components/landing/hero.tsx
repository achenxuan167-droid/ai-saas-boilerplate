export function Hero() {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-hairline bg-surface-soft px-4 py-1.5 text-sm text-muted">
            Built for solo founders &amp; indie hackers
          </div>
          <h1 className="text-[28px] font-bold leading-[1.43] text-ink sm:text-5xl">
            Ship your AI SaaS in days, not months
          </h1>
          <p className="mt-6 text-base leading-6 text-body">
            The Next.js boilerplate with{" "}
            <span className="font-semibold text-ink">
              usage-based Stripe billing
            </span>{" "}
            built-in. Auth, payments, Supabase, and UX components —
            everything you need to launch your AI product, already integrated.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-rausch px-6 text-base font-medium text-white transition-colors hover:bg-rausch-active"
            >
              Get Access — $99
            </a>
            <a
              href="#features"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-hairline bg-canvas px-6 text-base font-medium text-ink transition-colors hover:bg-surface-soft"
            >
              See Features
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">
            No subscription. Lifetime updates. Built with Next.js 15 + TypeScript.
          </p>
        </div>
      </div>
    </section>
  )
}
