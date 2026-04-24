"use client"

/**
 * Workshop CTA (Prompt 3).
 * - Two-column on desktop (7/5), stacked on mobile (image first).
 * - Sharp 0px button: transparent → Gesso fill on hover over 0.8s, text inverts.
 * - Caret → slides 8px right over the same 0.8s.
 * - Studio image: saturate(0.85) → 1.0 when the section enters the viewport.
 * - Raw Umber hairline separates from previous section.
 */

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "motion/react"
import { ParallaxImage } from "@/components/parallax-image"
import { EASE_OUT_EXPO as ease, DURATION } from "@/lib/motion"

export function WorkshopCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3, once: true })

  return (
    <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
      {/* Raw Umber hairline — absolute, top */}
      <span
        aria-hidden
        className="absolute inset-x-6 top-0 h-px bg-accent md:inset-x-16 lg:inset-x-32"
      />

      <div
        ref={ref}
        className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-24"
      >
        {/* Left column — editorial copy, 7/12 */}
        <div className="order-2 flex flex-col gap-10 lg:order-1 lg:col-span-7">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
            03 — Prezență
          </span>

          <h2 className="font-display font-light italic leading-[1.05] text-foreground text-balance text-[clamp(2.5rem,5vw,4.5rem)]">
            Un loc în care nu ți se cere să produci ceva frumos.
          </h2>

          <p className="max-w-[38ch] font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
            Întâlniri online, în grupuri mici, unde culoarea devine limbaj și
            tăcerea devine material de lucru. Nu ai nevoie să știi să pictezi —
            ai nevoie doar să fii dispus să te privești.
          </p>

          {/* Metadata row */}
          <ul className="flex flex-wrap gap-x-10 gap-y-3 border-y border-border py-5 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            <li className="flex items-center gap-3">
              <span className="text-foreground/40">Durată</span>
              <span className="text-foreground">90 min</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-foreground/40">Grup</span>
              <span className="text-foreground">max 8 persoane</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-foreground/40">Format</span>
              <span className="text-foreground">Zoom</span>
            </li>
          </ul>

          {/* Sharp button, 0px radius, 0.8s invert */}
          <Link
            href="/workshops"
            className="group inline-flex w-fit items-center gap-3 border border-foreground bg-transparent px-12 py-5 font-sans text-sm uppercase tracking-[0.2em] text-foreground transition-colors duration-[800ms] ease-out hover:bg-foreground hover:text-background"
          >
            <span>Rezervă-ți locul</span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-[800ms] ease-out group-hover:translate-x-2"
            >
              →
            </span>
          </Link>

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.page, ease, delay: 0.3 }}
            style={{ willChange: "opacity, transform" }}
            className="mt-6 max-w-[40ch] border-l border-accent pl-6 font-display text-xl font-light italic leading-snug text-muted-foreground md:text-2xl"
          >
            „Am venit să pictez. Am plecat cu ceva ce nu știam că pierdusem."
          </motion.blockquote>
        </div>

        {/* Right column — studio image, 5/12, parallaxed */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <ParallaxImage intensity={0.8} className="relative aspect-[4/5] w-full bg-surface">
            <Image
              src="/studio-portrait.jpg"
              alt="Atelier cu lumină naturală, pânze stivuite lângă perete"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              style={{
                transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                transitionDuration: "800ms",
                transitionProperty: "filter",
                willChange: "filter, transform",
              }}
              className={
                "object-cover " + (inView ? "saturate-100" : "saturate-[0.82]")
              }
            />
          </ParallaxImage>
        </div>
      </div>
    </section>
  )
}
