import Link from "next/link"
import Image from "next/image"
import type { Artwork } from "@/lib/types"

/**
 * Home-page featured artwork — gallery-wall plate treatment.
 * - Roman numeral plate, always-visible caption, status badge.
 * - Smooth, layered hover: image saturates + scales, plate line extends,
 *   roman numeral lifts in accent, caption row underlines, soft umber
 *   inner glow blooms from the bottom of the image.
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

  const ease = "cubic-bezier(0.19,1,0.22,1)"

  return (
    <Link
      href={`/galerie/${artwork.slug}`}
      className={
        "group flex flex-col gap-6 focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground " +
        offset
      }
    >
      {/* Plate header — roman numeral + category. Bottom border extends across full width on hover. */}
      <header className="relative flex items-baseline justify-between pb-3">
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-foreground/15"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-1/4 origin-left scale-x-0 bg-accent transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full group-hover:scale-x-100"
        />
        <span
          className="font-display text-2xl font-light italic text-accent transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-0.5 group-hover:tracking-[0.05em] md:text-3xl"
          style={{ willChange: "transform, letter-spacing" }}
        >
          {ROMAN[index] ?? String(index + 1)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50 transition-colors duration-[900ms] ease-out group-hover:text-foreground/80">
          {artwork.category}
        </span>
      </header>

      {/* Image frame — lifts subtly, scales image, saturates, blooms umber from below. */}
      <div
        className={
          "relative w-full overflow-hidden bg-surface transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1 " +
          aspect
        }
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
            transitionTimingFunction: ease,
            transitionDuration: "1200ms",
            transitionProperty: "filter, transform",
            willChange: "filter, transform",
            transform: "translateZ(0)",
          }}
          className="object-cover saturate-[0.78] group-hover:scale-[1.04] group-hover:saturate-100"
        />

        {/* Soft umber bloom from below — appears on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/25 via-accent/5 to-transparent opacity-0 transition-opacity duration-[1200ms] ease-out group-hover:opacity-100"
        />

        {/* Edge vignette tightens on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/0 transition-[box-shadow,ring-color] duration-[1200ms] ease-out group-hover:ring-accent/30"
        />
      </div>

      {/* Gallery wall label — always visible */}
      <figcaption className="flex flex-col gap-3 pt-1">
        <div className="flex items-end justify-between gap-6">
          <h3
            className="font-display text-2xl font-light italic leading-[1.1] text-foreground text-balance transition-colors duration-[900ms] ease-out group-hover:text-accent md:text-3xl"
          >
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
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          {artwork.medium} · {artwork.dimensions.w} × {artwork.dimensions.h}{" "}
          {artwork.dimensions.unit}
        </p>

        {artwork.price?.status && (
          <div className="mt-2 flex items-center gap-3 border-t border-foreground/10 pt-3">
            <span
              aria-hidden
              className={
                "inline-block h-1.5 w-1.5 rounded-full transition-transform duration-[900ms] ease-out group-hover:scale-150 " +
                (artwork.price.status === "available"
                  ? "bg-accent"
                  : "bg-foreground/30")
              }
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
              {STATUS_COPY[artwork.price.status]}
            </span>
            <span
              aria-hidden
              className="ml-auto font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/0 transition-colors duration-[900ms] ease-out group-hover:text-accent"
            >
              Vezi lucrarea →
            </span>
          </div>
        )}
      </figcaption>
    </Link>
  )
}
