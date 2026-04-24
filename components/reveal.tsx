"use client"

/**
 * Reveal — scroll-in wrapper used across home sections.
 * Mirrors the motion vocabulary of Hero/Manifest: opacity + y + blur,
 * ease-out-expo, once-only. Stagger via `delay` prop.
 */

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "motion/react"

const ease = [0.19, 1, 0.22, 1] as const

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  amount?: number
  as?: "div" | "section" | "header" | "li" | "span"
  className?: string
}

export function Reveal({
  children,
  delay = 0,
  y = 32,
  amount = 0.35,
  as = "div",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount, once: true, margin: "0px 0px -10% 0px" })
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 1.2, ease, delay }}
      style={{ willChange: "opacity, transform, filter" }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
