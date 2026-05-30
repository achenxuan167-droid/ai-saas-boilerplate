"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { FloatingParticles } from "@/components/landing/floating-particles"
import { GlowCard } from "@/components/landing/glow-card"
import { SegmentedControl } from "@/components/landing/segmented-control"
import { Marquee } from "@/components/landing/marquee"

/* ============================================================
   Wope-style animation specs
   ============================================================
   1. Hero stagger: 0.12s gap, 0.8s, ease [0.16,1,0.3,1], y 24→0
   2. Dashboard scroll parallax: scale 0.92→1, rotateX 12°→0, perspective 1000px
   3. GlowCard: mouse-track radial gradient, hover scale 1.015, 300ms ease-out
   4. SegmentedControl: spring stiffness 380, damping 30
   5. Marquee: 25s linear infinite, doubled array
   6. Shimmer button: 3s ease-in-out, white/20 slash
   ============================================================ */

// ---- Spec 1: Hero stagger variants ----
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const breathingShadow = [
  "0 0 8px rgba(168, 85, 247, 0.2)",
  "0 0 20px rgba(168, 85, 247, 0.5)",
  "0 0 8px rgba(168, 85, 247, 0.2)",
]

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/auth/login", label: "Sign In" },
]

const features = [
  { title: "Usage-Based Stripe Billing", desc: "Built-in metered billing via Stripe. Support per-token, per-call, or per-seat pricing out of the box." },
  { title: "Supabase Auth + Database", desc: "Magic link & OAuth sign-in, Row Level Security, and a pre-built subscription table schema." },
  { title: "AI-Ready Architecture", desc: "Streaming response patterns, token tracking middleware, ready to plug into Claude, OpenAI, or any API." },
  { title: "Landing Page & Marketing", desc: "SEO-optimized landing page, pricing table, blog-ready layout. Launch without a separate marketing site." },
  { title: "Dashboard & Analytics", desc: "User dashboard with live usage charts, subscription status, billing history." },
  { title: "One-Click Deploy", desc: "Deploy to Vercel in one click. Production-ready from minute one." },
]

// ---- Spec 2: Scroll-tilt container for dashboard ----
function ScrollTiltDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1])
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [12, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1])

  return (
    <div ref={ref} className="[perspective:1000px] py-4">
      <motion.div
        style={{ scale, rotateX, opacity, transformOrigin: "top center" }}
        className="mx-auto max-w-5xl rounded-xl border border-white/10 bg-zinc-950/80 shadow-[0_0_60px_rgba(168,85,247,0.08)] backdrop-blur-md"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[11px] text-white/30">Dashboard — AISaaS</span>
          <div className="w-14" />
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-[172px] shrink-0 flex-col border-r border-white/5 sm:flex">
            <div className="flex-1 space-y-0.5 px-3 py-4">
              {[
                { icon: "□", label: "Dashboard", active: true },
                { icon: "◉", label: "Analytics", active: false },
                { icon: "◎", label: "Reports", active: false },
                { icon: "⚙", label: "Settings", active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs ${
                    item.active
                      ? "bg-white/[0.07] font-medium text-white/85"
                      : "text-white/35 hover:bg-white/[0.03] hover:text-white/55"
                  }`}
                >
                  <span className="text-[10px]">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2.5 border-t border-white/5 px-3 py-3">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
              <div>
                <div className="text-[11px] font-medium text-white/70">Alex Chen</div>
                <div className="text-[10px] text-white/30">alex@aisaas.dev</div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 border-b border-white/5 px-5 py-2.5">
              <div className="flex h-7 flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3">
                <span className="text-[10px] text-white/25">🔍</span>
                <span className="text-[11px] text-white/25">Search anything...</span>
              </div>
              <span className="text-sm text-white/25">🔔</span>
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
            </div>

            <div className="p-5">
              {/* Spec 4: SegmentedControl */}
              <div className="mb-4">
                <SegmentedControl tabs={["Overview", "Keywords", "Competitors", "Reports"]} />
              </div>

              {/* Stats cards */}
              <div className="mb-5 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: "⚡", label: "Total API Calls", value: "128.4K", change: "+12.5%", up: true },
                  { icon: "🔑", label: "Active Keys", value: "24", change: "+3 this week", up: true },
                  { icon: "💎", label: "Tokens Used", value: "842K", change: "-2.1%", up: false },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-white/40">{card.label}</span>
                      <span className="text-sm">{card.icon}</span>
                    </div>
                    <div className="text-xl font-semibold text-white/85">{card.value}</div>
                    <div
                      className={`mt-1 flex items-center gap-1 text-[11px] ${
                        card.up ? "text-green-400/80" : "text-red-400/70"
                      }`}
                    >
                      <span>{card.up ? "▲" : "▼"}</span>
                      {card.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="mb-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mb-3 text-xs font-medium text-white/50">API Usage (last 7 days)</div>
                <svg viewBox="0 0 400 100" className="h-24 w-full">
                  {[25, 50, 75].map((y) => (
                    <line key={y} x1="30" y1={y} x2="390" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
                  ))}
                  {[65, 42, 78, 55, 88, 70, 95].map((h, i) => (
                    <rect
                      key={i}
                      x={40 + i * 48}
                      y={100 - h}
                      width={32}
                      height={h}
                      rx="3"
                      fill={i === 6 ? "rgba(168,85,247,0.5)" : "rgba(168,85,247,0.2)"}
                    />
                  ))}
                </svg>
                <div className="mt-2 flex justify-between px-2 text-[10px] text-white/25">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="rounded-xl border border-white/[0.06]">
                <div className="flex items-center border-b border-white/[0.06] px-4 py-2.5">
                  <span className="text-xs font-medium text-white/50">Recent API Keys</span>
                </div>
                <div className="hidden items-center gap-4 border-b border-white/[0.04] px-4 py-2 text-[10px] font-medium text-white/25 sm:flex">
                  <span className="w-28">Name</span>
                  <span className="w-16">Status</span>
                  <span className="w-20">Created</span>
                  <span className="flex-1">Usage</span>
                </div>
                {[
                  { name: "prod-api-key", status: "Active", date: "May 28", usage: "56.2K calls", dot: "bg-green-400", txt: "text-green-400/70" },
                  { name: "staging-env", status: "Active", date: "May 25", usage: "12.8K calls", dot: "bg-green-400", txt: "text-green-400/70" },
                  { name: "dev-sandbox", status: "In Progress", date: "May 20", usage: "3.1K calls", dot: "bg-yellow-400", txt: "text-yellow-400/70" },
                  { name: "legacy-migration", status: "Paused", date: "May 12", usage: "892 calls", dot: "bg-white/25", txt: "text-white/30" },
                ].map((row) => (
                  <div key={row.name}
                    className="flex items-center gap-4 border-b border-white/[0.03] px-4 py-2.5 last:border-b-0"
                  >
                    <span className="w-28 text-xs font-medium text-white/75">{row.name}</span>
                    <span className={`flex w-16 items-center gap-1.5 text-[11px] ${row.txt}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${row.dot}`} />{row.status}
                    </span>
                    <span className="hidden w-20 text-[11px] text-white/35 sm:block">{row.date}</span>
                    <span className="flex-1 text-[11px] text-white/40">{row.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ---- Main page ----
export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0118] text-white">
      {/* Background */}
      <div className="bg-grid" />
      <div className="orb-1" />
      <div className="orb-2" />
      <div className="orb-3" />
      <FloatingParticles />

      <div className="relative z-10">
        {/* ---- Nav ---- */}
        <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <a href="/" className="text-lg font-bold text-white">AISaaS</a>
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-white/60 transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
            <a
              href="/auth/register"
              className="inline-flex h-10 items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-purple-500/20"
            >
              Get Started
            </a>
          </nav>
        </header>

        {/* ---- Hero (Spec 1: stagger) ---- */}
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-24 text-center sm:pt-32">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1
              variants={itemVariants}
              className="text-gradient text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl"
            >
              Ship your AI SaaS in days, not months
            </motion.h1>

            <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/55">
              The Next.js boilerplate with{" "}
              <span className="font-semibold text-white">usage-based Stripe billing</span>{" "}
              built-in. Auth, payments, Supabase, and UX components — everything you need to launch your AI product, already integrated.
            </motion.p>

            <motion.div variants={itemVariants}>
              <div className="mt-10 flex items-center justify-center gap-4">
                {/* Spec 6: Shimmer button on CTA */}
                <motion.a
                  href="/pricing"
                  animate={{ boxShadow: breathingShadow }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(168, 85, 247, 0.8)" }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative inline-flex h-12 items-center overflow-hidden rounded-full border border-purple-500/50 bg-purple-500/15 px-8 text-base font-medium text-white backdrop-blur-sm"
                >
                  <span className="relative z-10">Get Access — $99</span>
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.08] to-transparent group-hover:animate-none" />
                </motion.a>

                <a
                  href="#features"
                  className="inline-flex h-12 items-center rounded-full border border-white/10 bg-white/5 px-8 text-base font-medium text-white/60 backdrop-blur-sm transition-colors hover:border-white/25 hover:text-white"
                >
                  See Features
                </a>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="mt-4 text-sm text-white/35">
              No subscription. Lifetime updates. Built with Next.js 15 + TypeScript.
            </motion.p>
          </motion.div>
        </section>

        {/* ---- Spec 5: Marquee logo wall ---- */}
        <Marquee />

        {/* ---- Spec 2: Dashboard scroll-tilt parallax ---- */}
        <ScrollTiltDashboard />

        {/* ---- Spec 3: Feature cards with GlowCard ---- */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-gradient text-3xl font-bold sm:text-4xl">Everything you need to launch</h2>
            <p className="mt-3 text-lg text-white/45">
              Stop wiring up Stripe webhooks for the third time. Focus on your AI product.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <GlowCard key={f.title} className="p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-sm text-purple-300">
                  ✓
                </div>
                <h3 className="text-sm font-semibold text-white/85">{f.title}</h3>
                <p className="mt-2 text-xs text-white/40">{f.desc}</p>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* ---- Footer ---- */}
        <footer className="px-6 py-8 text-center text-sm text-white/30">
          Built by{" "}
          <a href="#" className="underline underline-offset-2 transition-colors hover:text-white/50">
            Your Name
          </a>
          . Powered by Next.js + Supabase + Stripe.
        </footer>
      </div>
    </div>
  )
}
