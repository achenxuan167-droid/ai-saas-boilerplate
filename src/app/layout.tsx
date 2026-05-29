import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/providers"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: {
    default: "AISaaS — The Next.js Boilerplate with AI Usage-Based Billing",
    template: "%s | AISaaS Boilerplate",
  },
  description:
    "Ship your AI SaaS faster. Next.js + Stripe usage-based billing + Supabase — fully integrated, ready to deploy.",
  openGraph: {
    title: "AISaaS Boilerplate",
    description:
      "Ship your AI SaaS with usage-based billing built-in. One-click deploy.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-white antialiased")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
