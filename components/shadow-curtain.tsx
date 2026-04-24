"use client"

/**
 * ShadowCurtain — the "emerge from shadow" page-load sequence.
 *
 * A full-viewport obsidian panel that lifts in 1.2s with Ease-Out-Expo.
 * Mounted once at the root layout; after fade-out it removes itself
 * from the compositor entirely (pointer-events: none + opacity-0 +
 * onAnimationComplete unmount).
 */

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion"

export function ShadowCurtain() {
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setMounted(false), 2000)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: DURATION.page, ease: EASE_OUT_EXPO, delay: 0.1 }}
      style={{ willChange: "opacity" }}
      className="pointer-events-none fixed inset-0 z-[60] bg-background"
    />
  )
}
