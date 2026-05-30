"use client"

import { useRef, type ReactNode, type CSSProperties } from "react"

export function MouseGlowCard({
  children,
  className = "",
  glowColor = "rgba(113, 61, 255, 0.12)",
}: {
  children: ReactNode
  className?: string
  glowColor?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={`mouse-glow ${className}`}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        ref.current?.style.setProperty("--mx", `${x}px`)
        ref.current?.style.setProperty("--my", `${y}px`)
        ref.current?.style.setProperty("--glow-color", glowColor)
      }}
    >
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
