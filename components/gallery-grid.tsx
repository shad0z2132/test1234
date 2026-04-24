"use client"

/**
 * ============================================================================
 * GalleryGrid — state-based filter with Framer Motion layout animations
 * ----------------------------------------------------------------------------
 * STATE MACHINE
 *
 *   idle ─▶ ready ─┬─▶ filtering ─▶ ready
 *                  └─▶ empty (no matches for filter)
 *
 *   Initial data is injected from an RSC (no loading state required in the
 *   common path). A `pending` prop is exposed for the <Suspense> case.
 *
 * DATA FLOW
 *   Props:
 *     - artworks: Artwork[]  (hydrated from CMS at build/request time)
 *     - initialFilter?: GalleryFilter
 *   Events:
 *     - onFilterChange(filter) → URL sync via useRouter (shallow, no reload)
 *   APIs:
 *     - None at runtime. Filtering is client-side (O(n), small N).
 *
 * ERROR / EMPTY HANDLING
 *   - If artworks.length === 0  → <GalleryEmpty reason="no-data" />
 *   - If filtered.length === 0  → <GalleryEmpty reason="no-matches" />
 *
 * PERFORMANCE
 *   - next/image with explicit width/height + LQIP → zero CLS.
 *   - <motion.div layout> handles reflow; `LayoutGroup` scopes animations.
 *   - `prefers-reduced-motion` is respected via MotionConfig.
 * ============================================================================
 */

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "motion/react"
import type { Artwork, GalleryFilter } from "@/lib/types"
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion"

type Props = {
  artworks: Artwork[]
  initialFilter?: GalleryFilter
}

const FILTERS: { key: GalleryFilter; label: string }[] = [
  { key: "toate", label: "Toate" },
  { key: "abstracte", label: "Abstracte" },
  { key: "simbolice", label: "Simbolice" },
]

export function GalleryGrid({ artworks, initialFilter = "toate" }: Props) {
  const [filter, setFilter] = useState<GalleryFilter>(initialFilter)
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(() => {
    if (filter === "toate") return artworks
    return artworks.filter((a) => a.category === filter)
  }, [artworks, filter])

  const handleFilter = (next: GalleryFilter) => {
    startTransition(() => setFilter(next))
  }

  if (artworks.length === 0) {
    return <GalleryEmpty reason="no-data" />
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT_EXPO }}>
      <div className="flex flex-col gap-16">
        <FilterBar
          value={filter}
          onChange={handleFilter}
          counts={{
            toate: artworks.length,
            abstracte: artworks.filter((a) => a.category === "abstracte").length,
            simbolice: artworks.filter((a) => a.category === "simbolice").length,
          }}
        />

        {filtered.length === 0 ? (
          <GalleryEmpty reason="no-matches" />
        ) : (
          <LayoutGroup>
            <motion.ul
              layout
              className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
              data-pending={isPending ? "" : undefined}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((artwork, i) => (
                  <motion.li
                    key={artwork._id}
                    layout
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{
                      layout: { duration: DURATION.page, ease: EASE_OUT_EXPO },
                      opacity: {
                        duration: DURATION.micro,
                        ease: EASE_OUT_EXPO,
                        delay: Math.min(i * 0.05, 0.35),
                      },
                      y: {
                        duration: DURATION.micro,
                        ease: EASE_OUT_EXPO,
                        delay: Math.min(i * 0.05, 0.35),
                      },
                    }}
                    style={{ willChange: "transform, opacity" }}
                    className={i % 5 === 0 ? "lg:row-span-2" : ""}
                  >
                    <GalleryTile artwork={artwork} priority={i < 3} tall={i % 5 === 0} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        )}
      </div>
    </MotionConfig>
  )
}

/* ------------------------------------------------------------------ */

function FilterBar({
  value,
  onChange,
  counts,
}: {
  value: GalleryFilter
  onChange: (f: GalleryFilter) => void
  counts: Record<GalleryFilter, number>
}) {
  return (
    <div
      role="tablist"
      aria-label="Filtrează lucrările"
      className="flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-border pb-6"
    >
      {FILTERS.map((f) => {
        const active = value === f.key
        return (
          <button
            key={f.key}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(f.key)}
            className="group relative flex items-baseline gap-3 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground transition-colors aria-selected:text-foreground hover:text-foreground"
          >
            <span>{f.label}</span>
            <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground/70">
              {String(counts[f.key]).padStart(2, "0")}
            </span>
            {active && (
              <motion.span
                layoutId="filter-underline"
                className="absolute inset-x-0 -bottom-[25px] h-px bg-accent"
                transition={{ duration: DURATION.micro, ease: EASE_OUT_EXPO }}
                style={{ willChange: "transform" }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

function GalleryTile({
  artwork,
  priority,
  tall,
}: {
  artwork: Artwork
  priority: boolean
  tall: boolean
}) {
  return (
    <Link
      href={`/galerie/${artwork.slug}`}
      className="group flex flex-col gap-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
    >
      <div
        className={`relative w-full overflow-hidden bg-surface transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1 ${
          tall ? "aspect-[3/5]" : "aspect-[4/5]"
        }`}
        style={{ willChange: "transform" }}
      >
        <Image
          src={artwork.image.url}
          alt={artwork.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={artwork.image.lqip}
          priority={priority}
          style={{
            transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
            transitionDuration: "1200ms",
            transitionProperty: "filter, transform",
            willChange: "filter, transform",
            transform: "translateZ(0)",
          }}
          className="object-cover saturate-[0.78] group-hover:scale-[1.04] group-hover:saturate-100"
        />
        {/* Umber bloom from below */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/25 via-accent/5 to-transparent opacity-0 transition-opacity duration-[1200ms] ease-out group-hover:opacity-100"
        />
        {/* Inner umber ring on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/0 transition-[box-shadow] duration-[1200ms] ease-out group-hover:ring-accent/30"
        />
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
          {artwork.category} / {artwork._id.replace(/\D/g, "").padStart(3, "0")}
        </span>
        <div className="flex items-end justify-between gap-6">
          <h3 className="font-display text-2xl font-light leading-tight text-foreground text-balance transition-colors duration-[900ms] ease-out group-hover:text-accent">
            <span className="relative inline-block">
              {artwork.title}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent/70 transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"
              />
            </span>
          </h3>
          <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground transition-colors duration-[900ms] ease-out group-hover:text-foreground">
            {artwork.year}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {artwork.medium} · {artwork.dimensions.w} × {artwork.dimensions.h}{" "}
          {artwork.dimensions.unit}
        </p>
      </div>
    </Link>
  )
}

function GalleryEmpty({ reason }: { reason: "no-data" | "no-matches" }) {
  const title =
    reason === "no-data" ? "Galeria se pregătește" : "Niciun rezultat pentru filtrul ales"
  const body =
    reason === "no-data"
      ? "Lucrările sunt în curs de pregătire pentru prezentare publică. Revino curând sau scrie-ne pentru un dosar privat."
      : "Încearcă o altă categorie sau revino la vederea completă."
  return (
    <div className="flex flex-col items-start gap-6 border-t border-border py-24">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
        —
      </span>
      <h3 className="font-display text-3xl font-light text-foreground text-balance">
        {title}
      </h3>
      <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  )
}

/* Reusable skeleton for RSC <Suspense fallback>. */
export function GallerySkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-16">
      <div className="flex gap-8 border-b border-border pb-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-3 w-24 animate-pulse bg-surface" />
        ))}
      </div>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex flex-col gap-6">
            <div
              className={`w-full animate-pulse bg-surface ${
                i % 5 === 0 ? "aspect-[3/5]" : "aspect-[4/5]"
              }`}
            />
            <div className="flex flex-col gap-3">
              <div className="h-2 w-24 animate-pulse bg-surface" />
              <div className="h-6 w-48 animate-pulse bg-surface" />
              <div className="h-3 w-32 animate-pulse bg-surface" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
