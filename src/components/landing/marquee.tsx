"use client"

const items = [
  "Stripe", "Supabase", "OpenAI", "Vercel", "Next.js",
  "Tailwind CSS", "TypeScript", "PostgreSQL",
]

export function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-white/[0.06] py-5">
      <div className="flex animate-marquee gap-14 whitespace-nowrap shrink-0">
        {doubled.map((name, i) => (
          <span
            key={i}
            className="text-sm font-medium text-white/20 transition-colors hover:text-white/45"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
