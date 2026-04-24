import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { ArtworkCard } from "@/components/artwork-card"
import { WorkshopCTA } from "@/components/workshop-cta"
import { ReflectionsList } from "@/components/reflections-list"
import { getArtworks, getReflections } from "@/lib/cms"

export const metadata = {
  title: "Studio — Picturi despre lumea interioară",
  description:
    "Picturi în ulei și acrilic despre lumea interioară — umbră, simbol, prezență. Galerie, workshop-uri online și reflecții din atelier.",
}

export default async function HomePage() {
  const [artworks, reflections] = await Promise.all([
    getArtworks(),
    getReflections(),
  ])

  const featured = artworks.filter((a) => a.featured).slice(0, 3)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* 01 — HERO */}
      <Hero />

      {/* INTRO — editorial paragraph, sets voice */}
      <section className="px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
              02 — Invitație
            </span>
          </div>
          <p className="font-display text-3xl font-light leading-[1.25] text-foreground text-balance md:col-span-9 md:text-4xl">
            Nu pictez ca să decorez un perete. Pictez ca să dau chip lucrurilor
            care, altfel, ar rămâne neauzite. Dacă ai ajuns aici, probabil cauți
            același lucru: o imagine care să spună în locul tău ceea ce încă nu
            știi să spui.
          </p>
        </div>
      </section>

      {/* 02 — FEATURED GALLERY (three featured, saturate-reveal cards) */}
      <section className="px-6 py-24 md:px-16 md:py-40 lg:px-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-6 pb-12 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
                02 — Lucrări
              </span>
              <h2 className="font-display text-4xl font-light leading-[1.05] text-foreground text-balance md:text-6xl">
                Ce se vede{" "}
                <span className="italic text-muted-foreground">
                  când privești încet
                </span>
              </h2>
            </div>
            <Link
              href="/galerie"
              className="group relative inline-flex items-center self-start font-sans text-sm text-foreground md:self-auto"
            >
              <span className="relative">
                Vezi toată galeria →
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1 left-0 h-px w-[40%] bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
                />
              </span>
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((artwork, i) => (
              <li key={artwork._id}>
                <Link
                  href={`/galerie/${artwork.slug}`}
                  className="block focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                >
                  <ArtworkCard
                    src={artwork.image.url}
                    alt={artwork.image.alt}
                    category={`${artwork.category} / ${String(i + 1).padStart(3, "0")}`}
                    title={artwork.title}
                    year={String(artwork.year)}
                    medium={`${artwork.medium} · ${artwork.dimensions.w} × ${artwork.dimensions.h} ${artwork.dimensions.unit}`}
                    blurDataURL={artwork.image.lqip}
                    priority={i === 0}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — WORKSHOP CTA */}
      <WorkshopCTA />

      {/* 04 — REFLECTIONS INDEX (editorial list, not cards) */}
      <section className="px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-12">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
              04 — Reflecții
            </span>
            <h2 className="font-display text-4xl font-light leading-tight text-foreground text-balance md:text-6xl">
              Însemnări din atelier
            </h2>
          </div>

          <ReflectionsList items={reflections} />

          <Link
            href="/reflectii"
            className="group relative inline-flex w-fit items-center pt-4 font-sans text-sm text-muted-foreground transition-colors duration-[800ms] ease-out hover:text-foreground"
          >
            <span className="relative">
              Vezi toate reflecțiile →
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-1 left-0 h-px w-[40%] bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
              />
            </span>
          </Link>
        </div>
      </section>

      {/* 05 — FOOTER */}
      <SiteFooter />
    </main>
  )
}
