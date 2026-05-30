const stats = [
  { value: "2-3 weeks", label: "Saved per launch" },
  { value: "4", label: "Integrations pre-wired" },
  { value: "14 days", label: "From clone to deploy" },
  { value: "100%", label: "Solo-founder owned" },
]

export function Stats() {
  return (
    <section className="border-b border-hairline py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[28px] font-bold leading-[1.43] text-ink">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-sm text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
