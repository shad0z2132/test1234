import Link from "next/link"
import Image from "next/image"
import type { Artwork } from "@/lib/types"

/**
 * Home-page featured artwork — gallery-wall plate treatment.
 * - Roman numeral plate number, always-visible caption (unlike the
 *   hover-only ArtworkCard used in the gallery grid).
 * - Staggered aspect ratios + small column offsets for editorial rhythm.
 * - Status badge ("Disponibil", "Rezervat", "Vândut") in Raw Umber.
 */

const ROMAN = ["I", "II", "III", "IV", "V"] as const

const STATUS_COPY: Record<NonNullable<Artwork["price"]>["status"], string> = {
  available: "Disponibil",
  reserved: "Rezervat",
  sold: "Vândut",
  nfs: "Din colecție privată",
}

type Props = {
  artwork: Artwork
  index: number
  priority?: boolean
}

export function FeaturedArtwork({ artwork, index, priority = false }: Props) {
  /* Staggered aspect ratios create a more editorial, less grid-ish feel. */
  const aspect =
    index === 0 ? "aspect-[4/5]" : index === 1 ? "aspect-[3/5]" : "aspect-[4/6]"
  /* Column offsets (desktop only) — second plate drops, third rises slightly. */
  const offset =
    index === 1 ? "lg:mt-24" : index === 2 ? "lg:mt-12" : "lg:mt-0"

  return (
    <Link
      href={`/galerie/${artwork.slug}`}
      className={
        "group flex flex-col gap-6 focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground " +
        offset
      }
    >
      {/* Plate header — roman numeral + category */}
      <header className="flex items-baseline justify-between border-b border-foreground/15 pb-3">
        <span className="font-display text-2xl font-light italic text-accent md:text-3xl">
          {ROMAN[index] ?? String(index + 1)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
          {artwork.category}
        </span>
      </header>

      {/* Image frame */}
      <div className={"relative w-full overflow-hidden bg-surface " + aspect}>
        <Image
          src={artwork.image.url}
          alt={artwork.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={artwork.image.lqip}
          priority={priority}
          style={{
            transitionTimingFunction: "cubic-bezier(0.19,1,0.22,1)",
            transitionDuration: "800ms",
            transitionProperty: "filter, transform",
            willChange: "filter, transform",
            transform: "translateZ(0)",
          }}
          className="object-cover saturate-[0.82] group-hover:scale-[1.015] group-hover:saturate-100"
        />
      </div>

      {/* Gallery wall label — always visible */}
      <figcaption className="flex flex-col gap-3 pt-1">
        <div className="flex items-end justify-between gap-6">
          <h3 className="font-display text-2xl font-light italic leading-[1.1] text-foreground text-balance md:text-3xl">
            {artwork.title}
          </h3>
          <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
            {artwork.year}
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          {artwork.medium} · {artwork.dimensions.w} × {artwork.dimensions.h}{" "}
          {artwork.dimensions.unit}
        </p>

        {artwork.price?.status && (
          <div className="mt-2 flex items-center gap-3 border-t border-foreground/10 pt-3">
            <span
              aria-hidden
              className={
                "inline-block h-1.5 w-1.5 rounded-full " +
                (artwork.price.status === "available"
                  ? "bg-accent"
                  : "bg-foreground/30")
              }
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
              {STATUS_COPY[artwork.price.status]}
            </span>
          </div>
        )}
      </figcaption>
    </Link>
  )
}
