import { Suspense } from "react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { GalleryGrid, GallerySkeleton } from "@/components/gallery-grid"
import { getArtworks } from "@/lib/cms"

export const metadata = {
  title: "Galerie — Simbolice & Abstracte",
  description:
    "Lucrări simbolice și abstracte în ulei și acrilic. Dosare private disponibile pentru colecționari și curatori.",
}

export const revalidate = 3600

export default function GaleriePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section className="px-6 pb-20 pt-40 md:px-12 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-6">
            <span className="h-px w-12 bg-accent" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Galerie · 2023 — 2025
            </span>
          </div>

          <h1 className="mt-12 font-display text-[clamp(56px,9vw,140px)] font-light leading-[0.92] tracking-[-0.03em] text-foreground text-balance">
            Lucrări
          </h1>

          <p className="mt-12 max-w-2xl font-display text-xl font-light italic leading-snug text-muted-foreground md:text-2xl">
            Două direcții, același drum: spre interior. Alege de unde vrei să
            începi.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-16 border-t border-border pt-16 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                Simbolice
              </span>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Figuri, arhetipuri, prezențe. Lucrări în care forma este
                recunoscută înainte de a fi numită — un chip, o mână, o siluetă
                care pare să te fi așteptat.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                Abstracte
              </span>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Fără figură, fără poveste spusă direct. Doar materie, tensiune,
                lumină care iese din întuneric ca o respirație lungă.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="border-t border-border px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Suspense fallback={<GallerySkeleton />}>
            <GalleryGridServer />
          </Suspense>
        </div>
      </section>

      {/* COLLECTOR NOTE */}
      <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              Pentru colecționari
            </span>
          </div>
          <div className="flex flex-col gap-6 md:col-span-8">
            <p className="max-w-2xl font-display text-2xl font-light leading-snug text-foreground md:text-3xl">
              Fiecare lucrare disponibilă include dimensiuni, tehnică, an și,
              la cerere, certificat de autenticitate și istoricul piesei.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Pentru colecționari și curatori, dosarele complete se trimit
              discret, prin e-mail.
            </p>
            <a
              href="mailto:studio@example.com?subject=Solicitare%20dosar%20privat"
              className="mt-4 inline-flex h-12 w-fit items-center justify-center bg-foreground px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent hover:text-foreground"
            >
              Solicită un dosar privat
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

async function GalleryGridServer() {
  const artworks = await getArtworks()
  return <GalleryGrid artworks={artworks} />
}
