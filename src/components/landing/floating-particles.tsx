"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

interface Particle {
  id: number
  x: number
  top: number
  delay: number
  duration: number
  size: number
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: randomBetween(2, 96),
        top: randomBetween(5, 90),
        delay: randomBetween(0, 5),
        duration: randomBetween(6, 10),
        size: randomBetween(2, 5),
      }))
    )
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
