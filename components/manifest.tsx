"use client"

/**
 * Manifest band — full-width pull quote with scroll-reveal per line.
 * - Sits between the intro and the featured works on the home page.
 * - Each line emerges from shadow (opacity + y + blur) on scroll into view.
 * - Raw Umber vertical hairline on the left anchors it as a quoted block.
 */

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { EASE_OUT_EXPO as ease, DURATION } from "@/lib/motion"

const LINES = [
  "Nu pictez ca să fiu înțeles.",
  "Pictez ca să nu mă pierd pe drum.",
]

export function Manifest() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35, once: true })

  return (
    <section
      ref={ref}
      className="relative px-6 py-40 md:px-16 md:py-56 lg:px-32"
    >
      {/* Top + bottom hairlines, Raw Umber at 30% */}
      <span
        aria-hidden
        className="absolute inset-x-6 top-0 h-px bg-accent/30 md:inset-x-16 lg:inset-x-32"
      />
      <span
        aria-hidden
        className="absolute inset-x-6 bottom-0 h-px bg-accent/30 md:inset-x-16 lg:inset-x-32"
      />

      <div className="mx-auto flex max-w-[1400px] flex-col gap-16">
        {/* Section header row */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
              03 — Manifest
            </span>
            <span
              aria-hidden
              className="hidden h-px w-16 bg-foreground/20 md:inline-block"
            />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/30">
            Atelier · MMXXVI
          </span>
        </div>

        {/* Quoted block */}
        <blockquote className="relative">
          {/* Left anchor rule */}
          <span
            aria-hidden
            className="absolute -left-6 top-2 hidden h-[calc(100%-1rem)] w-px bg-accent md:block"
          />

          <div className="font-display text-[clamp(2.75rem,7vw,7rem)] font-light leading-[1.02] tracking-[-0.02em] text-foreground">
            {LINES.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : undefined
                }
                transition={{
                  duration: DURATION.page,
                  ease,
                  delay: 0.1 + i * 0.35,
                }}
                style={{ willChange: "opacity, transform, filter" }}
                className={
                  "block text-balance " +
                  (i === 1 ? "italic text-muted-foreground" : "")
                }
              >
                {line}
              </motion.span>
            ))}
          </div>
        </blockquote>

        {/* Attribution row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: DURATION.page, ease, delay: 1.1 }}
          className="flex items-end justify-between border-t border-foreground/10 pt-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
            — Însemnare din atelier, Viena
          </span>
          <span className="font-display text-2xl font-light italic text-foreground/70">
            M.&nbsp;V.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
