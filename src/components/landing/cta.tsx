export function CTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-[22px] font-medium leading-[1.18] text-ink sm:text-3xl">
          Start shipping today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-body">
          Join 100+ makers who launch faster with the AI SaaS boilerplate.
          Lifetime access, no recurring fees.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/pricing"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-rausch px-6 text-base font-medium text-white transition-colors hover:bg-rausch-active"
          >
            Get Started — $99
          </a>
          <a
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-hairline bg-canvas px-6 text-base font-medium text-ink transition-colors hover:bg-surface-soft"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
