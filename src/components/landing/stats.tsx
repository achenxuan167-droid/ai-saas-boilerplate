const stats = [
  { value: "2-3 weeks", label: "Saved per launch" },
  { value: "4", label: "Integrations pre-wired" },
  { value: "14 days", label: "From clone to deploy" },
  { value: "100%", label: "Solo-founder owned" },
]

export function Stats() {
  return (
    <section className="border-b border-gray-200 py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-bold tracking-tight text-gray-900">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-sm text-gray-600">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
