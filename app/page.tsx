import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { FeaturedArtwork } from "@/components/featured-artwork"
import { Manifest } from "@/components/manifest"
import { Pillars } from "@/components/pillars"
import { WorkshopCTA } from "@/components/workshop-cta"
import { ReflectionsList } from "@/components/reflections-list"
import { Reveal } from "@/components/reveal"
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

      {/* 02 — INVITAȚIE — asymmetric intro with pulled marginalia */}
      <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
        />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <Reveal as="div" className="flex flex-col gap-4 md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
              02 — Invitație
            </span>
            <span
              aria-hidden
              className="hidden h-px w-12 bg-accent md:inline-block"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              Atelier · Viena
            </span>
          </Reveal>

          <div className="flex flex-col gap-10 md:col-span-9">
            <Reveal delay={0.15}>
              <p className="font-display text-3xl font-light leading-[1.2] text-foreground text-balance md:text-[3.25rem] md:leading-[1.1]">
                Nu pictez ca să decorez un perete.{" "}
                <span className="italic text-muted-foreground">
                  Pictez ca să dau chip lucrurilor care, altfel, ar rămâne
                  neauzite.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="max-w-[52ch] font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                Dacă ai ajuns aici, probabil cauți același lucru: o imagine
                care să spună în locul tău ceea ce încă nu știi să spui.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — MANIFEST */}
      <Manifest />

      {/* 04 — FEATURED LUCRĂRI — editorial plates with staggered offsets */}
      <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col gap-8 pb-20 md:pb-28">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
                    04 — Lucrări
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-px w-16 bg-foreground/20 md:inline-block"
                  />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/30">
                  Selecție · {featured.length} / {artworks.length}
                </span>
              </div>

              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
                <h2 className="max-w-[16ch] font-display text-4xl font-light leading-[1.02] text-foreground text-balance md:text-7xl">
                  Ce se vede{" "}
                  <span className="italic text-muted-foreground">
                    când privești încet
                  </span>
                </h2>
                <Link
                  href="/galerie"
                  className="group relative inline-flex items-center self-start font-mono text-xs uppercase tracking-[0.3em] text-foreground md:self-auto"
                >
                  <span className="relative">
                    Vezi toată galeria →
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-1 left-0 h-px w-[30%] bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((artwork, i) => (
              <Reveal as="li" key={artwork._id} delay={i * 0.12}>
                <FeaturedArtwork
                  artwork={artwork}
                  index={i}
                  priority={i === 0}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — PRACTICĂ (Ulei · Simbol · Umbră) */}
      <Pillars />

      {/* 06 — WORKSHOP CTA */}
      <WorkshopCTA />

      {/* 07 — REFLECȚII */}
      <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
        />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-16">
          <Reveal>
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
                    07 — Reflecții
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-px w-16 bg-foreground/20 md:inline-block"
                  />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/30">
                  Arhivă deschisă
                </span>
              </div>

              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
                <h2 className="max-w-[14ch] font-display text-4xl font-light leading-[1.05] text-foreground text-balance md:text-7xl">
                  Însemnări{" "}
                  <span className="italic text-muted-foreground">
                    din atelier
                  </span>
                </h2>
                <p className="max-w-[36ch] font-sans text-base leading-relaxed text-muted-foreground">
                  Texte scurte, jurnale de lucru, note din nopțile în care
                  pictura nu iese — și din cele în care, în sfârșit, iese.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ReflectionsList items={reflections} />
          </Reveal>

          <Link
            href="/reflectii"
            className="group relative inline-flex w-fit items-center pt-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors duration-[800ms] ease-out hover:text-foreground"
          >
            <span className="relative">
              Vezi toate reflecțiile →
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-1 left-0 h-px w-[30%] bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
              />
            </span>
          </Link>
        </div>
      </section>

      {/* 08 — FOOTER */}
      <SiteFooter />
    </main>
  )
}
