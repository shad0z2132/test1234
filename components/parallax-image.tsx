"use client"

/**
 * ParallaxImage — subtle vertical parallax on heavy oil-painting images.
 *
 * - Uses motion/react `useScroll` + `useTransform` to translate the inner image
 *   by ~12% of its own height across the time it is in view.
 * - Only `transform: translate3d()` is animated → image stays on its own
 *   compositor layer, no layout thrash, no paint storms.
 * - The inner wrapper is pre-scaled by 1.14 so parallax travel never exposes
 *   the underlying background.
 * - Respects prefers-reduced-motion automatically via MotionConfig at the root.
 */

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { EASE_OUT_EXPO } from "@/lib/motion"

type Props = {
  children: ReactNode
  /** 0 = no parallax, 1 = default (~12% travel). */
  intensity?: number
  className?: string
}

export function ParallaxImage({ children, intensity = 1, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const travel = 6 * intensity // percent
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${travel}%`, `${travel}%`],
  )

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, willChange: "transform" }}
        transition={{ ease: EASE_OUT_EXPO }}
        className="absolute inset-0 scale-[1.14]"
      >
        {children}
      </motion.div>
    </div>
  )
}
