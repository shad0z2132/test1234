import Link from "next/link"
import Image from "next/image"
import type { Reflection } from "@/lib/types"

/**
 * Reflections index list — editorial, catalogue-style.
 * - Plate numbers (N° 001) in Raw Umber anchor each row.
 * - Hover thumbnail fades in to the right on desktop (0.8s expo).
 * - Row pads left 8px on hover; title shifts to Raw Umber.
 * - cursor-crosshair reinforces the "curated object" feel.
 */
export function ReflectionsList({ items }: { items: Reflection[] }) {
  if (items.length === 0) {
    return (
      <p className="border-t border-foreground/10 py-16 font-sans text-sm text-muted-foreground">
        Reflecțiile se pregătesc. Revino curând.
      </p>
    )
  }

  const [featured, ...rest] = items

  return (
    <div className="flex flex-col">
      {/* Featured reflection — hero plate */}
      <Link
        href={`/reflectii/${featured.slug}`}
        className="group relative grid cursor-crosshair grid-cols-1 gap-8 border-t border-foreground/20 py-16 transition-[padding] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:pl-4 focus-visible:pl-4 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground md:grid-cols-12 md:gap-12 md:py-24"
      >
        {/* Large cover */}
        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
            <Image
              src={featured.coverImage.url}
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover saturate-[0.8] transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.02] group-hover:saturate-100"
              style={{ willChange: "transform, filter" }}
            />
          </div>
        </div>

        {/* Meta + title + excerpt */}
        <div className="flex flex-col gap-8 md:col-span-7 md:justify-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">
            <span className="text-accent">Featured · N°&nbsp;001</span>
            <span className="text-foreground/20">·</span>
            <time dateTime={featured.publishedAt}>
              {formatDate(featured.publishedAt)}
            </time>
            <span className="text-foreground/20">·</span>
            <span>{featured.readingTimeMin} min lectură</span>
            <span className="text-foreground/20">·</span>
            <span className="text-foreground/40">{featured.tags[0]}</span>
          </div>
          <h3 className="font-display text-4xl font-light italic leading-[1.02] text-foreground text-balance transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-accent group-focus-visible:text-accent md:text-6xl">
            {featured.title}
          </h3>
          <p className="max-w-[56ch] font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
            {featured.excerpt}
          </p>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50 transition-colors duration-[800ms] ease-out group-hover:text-foreground">
            Citește reflecția →
          </span>
        </div>

        {/* Hover bottom hairline */}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent/60 transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </Link>

      {/* Remaining rows */}
      <ul className="flex flex-col">
        {rest.map((r, i) => (
          <li key={r._id} className="border-t border-foreground/10 last:border-b">
            <Link
              href={`/reflectii/${r.slug}`}
              className="group relative grid cursor-crosshair grid-cols-1 gap-4 py-12 transition-[padding] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:pl-8 focus-visible:pl-8 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground md:grid-cols-12 md:gap-8 md:py-16"
            >
              {/* Meta column */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/50 md:col-span-3 md:flex-col md:items-start md:gap-3">
                <span className="text-accent">
                  N°&nbsp;{String(i + 2).padStart(3, "0")}
                </span>
                <time dateTime={r.publishedAt}>{formatDate(r.publishedAt)}</time>
                <span>{r.readingTimeMin} min lectură</span>
                <span className="text-foreground/40">{r.tags[0]}</span>
              </div>

              {/* Title + excerpt */}
              <div className="flex flex-col gap-3 md:col-span-8">
                <h3 className="font-display text-3xl font-light italic leading-[1.1] text-foreground text-balance transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-accent group-focus-visible:text-accent md:text-4xl">
                  {r.title}
                </h3>
                <p className="line-clamp-2 max-w-[60ch] font-sans text-base leading-relaxed text-muted-foreground">
                  {r.excerpt}
                </p>
              </div>

              {/* Hover thumbnail — desktop only */}
              <div
                aria-hidden
                className="pointer-events-none hidden md:col-span-1 md:block md:self-center md:justify-self-end"
              >
                <div
                  className="relative aspect-[4/5] w-20 translate-x-4 overflow-hidden bg-surface opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  style={{ willChange: "transform, opacity" }}
                >
                  <Image
                    src={r.coverImage.url}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover saturate-[0.85]"
                  />
                </div>
              </div>

              {/* Hover bottom hairline */}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-foreground/30 transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d
    .toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .replace(".", "")
}
