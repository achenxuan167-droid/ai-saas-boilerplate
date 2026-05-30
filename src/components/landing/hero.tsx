export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-600">
            🚀 Built for solo founders &amp; indie hackers
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Ship your AI SaaS in days, not months
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The Next.js boilerplate with{" "}
            <span className="font-semibold text-gray-900">
              usage-based Stripe billing
            </span>{" "}
            built-in. Auth, payments, Supabase, and UX components —
            everything you need to launch your AI product, already integrated.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800"
            >
              Get Access — $99
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              See Features
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            No subscription. Lifetime updates. Built with Next.js 15 + TypeScript.
          </p>
        </div>
      </div>
    </section>
  )
}
