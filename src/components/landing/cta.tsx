export function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Start shipping today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Join 100+ makers who launch faster with the AI SaaS boilerplate.
          Lifetime access, no recurring fees.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/pricing"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800"
          >
            Get Started — $99
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
