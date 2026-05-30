"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface Props {
  tabs: string[]
  defaultTab?: string
}

export function SegmentedControl({ tabs, defaultTab }: Props) {
  const [active, setActive] = useState(defaultTab ?? tabs[0])

  return (
    <div className="inline-flex space-x-1 rounded-full bg-zinc-900 p-1 border border-zinc-800">
      {tabs.map((tab) => {
        const isActive = active === tab
        return (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="relative rounded-full px-3 py-1 text-xs font-medium text-white/45 transition-colors duration-200 hover:text-white/80 focus-visible:outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isActive && (
              <motion.span
                layoutId="seg-bubble"
                className="absolute inset-0 z-10 rounded-full bg-white/10 mix-blend-difference"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={isActive ? "text-white" : ""}>{tab}</span>
          </button>
        )
      })}
    </div>
  )
}
