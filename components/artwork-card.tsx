import Image from "next/image"

type Props = {
  src: string
  alt: string
  title: string
  year: string
  medium: string
  category: string
  priority?: boolean
  blurDataURL?: string
}

/**
 * Frameless artwork card.
 *
 * Motion spec:
 *   • Default saturate(0.82). Hover → saturate(1) over 0.8s Ease-Out-Expo.
 *   • Caption block fades up (translateY 8px → 0) + opacity 0→1 over 0.8s.
 *   • Image sits on its own GPU layer (translateZ(0) + will-change) so the
 *     filter animation never re-paints neighbours during gallery reflow.
 */
export function ArtworkCard({
  src,
  alt,
  title,
  year,
  medium,
  category,
  priority = false,
  blurDataURL,
}: Props) {
  const easeExpo = "cubic-bezier(0.19, 1, 0.22, 1)"

  return (
    <figure className="group relative flex flex-col gap-6">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL}
          style={{
            transitionTimingFunction: easeExpo,
            transitionDuration: "800ms",
            transitionProperty: "filter, transform",
            willChange: "filter, transform",
            transform: "translateZ(0)",
          }}
          className="object-cover saturate-[0.82] group-hover:scale-[1.015] group-hover:saturate-100"
        />

        {/* Hover scrim */}
        <div
          aria-hidden
          style={{ transitionTimingFunction: easeExpo, transitionDuration: "800ms" }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        />

        {/* Hover caption */}
        <figcaption
          style={{
            transitionTimingFunction: easeExpo,
            transitionDuration: "800ms",
            transitionProperty: "opacity, transform",
            willChange: "opacity, transform",
          }}
          className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-2 p-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            {category}
          </span>
          <h3 className="font-display text-2xl font-light italic leading-tight text-foreground text-balance">
            {title}
          </h3>
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
            {medium} · {year}
          </p>
        </figcaption>
      </div>

      <div className="flex items-end justify-between gap-6 md:hidden">
        <h3 className="font-display text-xl font-light italic leading-tight text-foreground">
          {title}
        </h3>
        <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
          {year}
        </span>
      </div>
    </figure>
  )
}
