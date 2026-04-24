"use client"

/**
 * Hero — full-bleed cinematic parallax.
 *
 * One immersive frame: a heavy oil painting fills the entire viewport and
 * translates + scales on scroll while the editorial chrome (top index bar,
 * staircased headline, caption, bottom scroll cue) floats above it.
 *
 * Motion:
 *   • Background image parallaxes from y: 0% → -18% across scroll,
 *     and scale decays from 1.18 → 1.08 (very subtle ken-burns on exit).
 *   • Foreground content translates +40% on scroll for depth separation.
 *   • Page-load: headline stairs emerge from shadow with 0.3s stagger.
 *   • Ease-Out-Expo, 1.2s page / 0.8s micro.
 *   • All transforms are GPU-promoted via translateZ(0) + will-change.
 */

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
} from "motion/react"
import { EASE_OUT_EXPO, DURATION, GPU } from "@/lib/motion"

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  // Scroll progress from the top of the hero (0) to when it has fully scrolled
  // past the viewport top (1). We use that window so parallax starts on mount
  // rather than after the section is out of view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Background: translate up + gentle scale decay (ken-burns on exit).
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1.08])

  // Vignette deepens as we scroll → content on next section reads cleaner.
  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.95])

  // Foreground content: gently slides down as we scroll, fades out near end.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0])

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT_EXPO }}>
      <section
        ref={ref}
        aria-label="Hero"
        className="relative h-[110vh] min-h-[720px] w-full overflow-hidden bg-background"
      >
        {/* ─────────────────────────────────────────────────────────────── */}
        {/* LAYER 1 · Full-bleed parallax background                        */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden
          style={{
            y: bgY,
            scale: bgScale,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
          className="absolute inset-0"
        >
          <Image
            src="/artwork-symbolic-01.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover saturate-[0.78]"
          />
        </motion.div>

        {/* LAYER 2 · Cinematic vignettes — keep type readable */}
        <motion.div
          aria-hidden
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/20 to-background/60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(10,10,10,0.6) 80%)",
          }}
        />

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* LAYER 3 · Editorial chrome (floats above the painting)          */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
            willChange: "transform, opacity",
          }}
          className="relative z-10 flex h-full flex-col"
        >
          {/* TOP INDEX BAR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.page, delay: 0.3 }}
            className="mt-24 border-y border-foreground/15 backdrop-blur-[2px] md:mt-28"
          >
            <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-16 lg:px-32">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground md:text-xs">
                Studio · N° 01
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/60 md:inline">
                Monograph — Vol. I
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground md:text-xs">
                Viena / Arad · MMXXVI
              </span>
            </div>
          </motion.div>

          {/* CENTER STAGE */}
          <div className="flex flex-1 items-center">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-32">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.micro, delay: 0.6 }}
                style={GPU.both}
                className="flex items-center gap-4"
              >
                <span className="h-px w-10 bg-accent" aria-hidden />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
                  01 — Invitație
                </span>
              </motion.div>

              {/* Staircased display headline */}
              <h1 className="mt-10 font-display font-light leading-[0.9] tracking-[-0.025em] text-foreground text-[clamp(3.75rem,11vw,11rem)]">
                <motion.span
                  initial={{ opacity: 0, y: 64, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: DURATION.page, delay: 0.9 }}
                  style={GPU.both}
                  className="block"
                >
                  Fac vizibil
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 64, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: DURATION.page, delay: 1.2 }}
                  style={GPU.both}
                  className="block pl-[0.55em] italic text-foreground/85"
                >
                  ceea ce trăiește
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 64, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: DURATION.page, delay: 1.5 }}
                  style={GPU.both}
                  className="block pl-[1.1em] italic text-foreground/70"
                >
                  în tăcere.
                </motion.span>
              </h1>

              {/* Subhead + CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.page, delay: 2.0 }}
                style={GPU.both}
                className="mt-14 flex max-w-[560px] flex-col gap-8"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: DURATION.page, delay: 2.2 }}
                  style={{ ...GPU.both, transformOrigin: "left center" }}
                  className="block h-px w-16 bg-accent"
                  aria-hidden
                />
                <p className="font-sans text-base leading-relaxed text-foreground/80 md:text-lg">
                  Picturi în ulei și acrilic care traduc lumea interioară —
                  <span className="text-foreground">
                    {" "}
                    umbra, arhetipul, emoția{" "}
                  </span>
                  care nu încape în cuvinte — într-o formă pe care o poți privi
                  în ochi.
                </p>

                <div className="flex flex-col items-start gap-5 pt-2 sm:flex-row sm:items-center sm:gap-10">
                  <PrimaryCTA href="/galerie" label="Intră în galerie" />
                  <UnderlineLink
                    href="/workshops"
                    label="Sau rezervă un workshop"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* BOTTOM CHROME — archetype indices + scroll cue + caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.page, delay: 2.4 }}
            className="border-t border-foreground/15 backdrop-blur-[2px]"
          >
            <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-16 lg:px-32">
              {/* Archetype indices */}
              <ul className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground md:gap-14 md:text-xs">
                <li className="flex items-center gap-2">
                  <span className="text-foreground/45">I</span>
                  <span>Umbră</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-foreground/45">II</span>
                  <span>Simbol</span>
                </li>
                <li className="hidden items-center gap-2 sm:flex">
                  <span className="text-foreground/45">III</span>
                  <span>Prezență</span>
                </li>
              </ul>

              {/* Feature-artwork caption (center on desktop) */}
              <div className="hidden items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60 lg:flex">
                <span className="font-display text-sm italic not-italic tracking-normal text-foreground">
                  Martor
                </span>
                <span>ulei pe pânză · 120 × 90 cm · 2024</span>
                <span className="text-foreground/40">Cat. 01</span>
              </div>

              <ScrollCue />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}

/* ------------------------------------------------------------------ */

function PrimaryCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden border border-foreground px-8 py-4 font-sans text-xs uppercase tracking-[0.25em] text-foreground"
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
      <span className="relative z-10 transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-background">
        {label}
      </span>
      <span
        aria-hidden
        className="relative z-10 transition-[transform,color] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1 group-hover:text-background"
      >
        →
      </span>
    </Link>
  )
}

function UnderlineLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center font-sans text-sm text-foreground/85"
    >
      <span className="relative">
        {label}
        <span
          aria-hidden
          style={{
            transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
            transitionDuration: "800ms",
            willChange: "width",
          }}
          className="pointer-events-none absolute -bottom-1 left-0 h-px w-[40%] bg-current transition-[width] group-hover:w-full"
        />
      </span>
    </Link>
  )
}

function ScrollCue() {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
        Scroll
      </span>
      <span className="relative block h-8 w-px overflow-hidden bg-foreground/20">
        <motion.span
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: 2,
            ease: EASE_OUT_EXPO,
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
          className="absolute inset-x-0 block h-full bg-accent"
          style={{ willChange: "transform" }}
        />
      </span>
    </div>
  )
}
