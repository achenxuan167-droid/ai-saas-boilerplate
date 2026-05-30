export function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl">
          Start shipping today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-wope-text-soft">
          Join 100+ makers who launch faster with the AI SaaS boilerplate.
          Lifetime access, no recurring fees.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/pricing"
            className="btn-glow inline-flex h-12 items-center justify-center rounded-full bg-wope-accent px-8 text-base font-medium text-white transition-all duration-200 hover:bg-wope-accent-hover hover:scale-105"
          >
            Get Started — $99
          </a>
          <a
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-full border border-wope-border bg-wope-card/50 px-8 text-base font-medium text-wope-text-soft backdrop-blur-sm transition-all duration-200 hover:border-wope-text-muted hover:text-white"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
