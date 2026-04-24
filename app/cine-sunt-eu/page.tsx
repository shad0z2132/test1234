import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"

export const metadata = {
  title: "Cine sunt eu — Studio",
  description:
    "Artist născut la Arad, bazat în Viena. Pictez simboluri, arhetipuri și umbra — ceea ce trăiește în tăcere în fiecare dintre noi.",
}

export default function CineSuntEuPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-48">
        {/* Massive ghost word */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-8 top-40 select-none font-display text-[20vw] font-light italic leading-none text-accent/[0.04] md:text-[15vw]"
        >
          Eu
        </span>

        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex items-center gap-6">
              <span className="h-px w-12 bg-accent" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Biografie · Atelier
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-12 font-display text-[clamp(64px,10vw,160px)] font-light leading-[0.92] tracking-[-0.03em] text-foreground text-balance">
              Cine sunt <span className="italic text-muted-foreground">eu</span>?
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-16 max-w-3xl font-display text-2xl font-light italic leading-snug text-muted-foreground md:text-3xl">
              M-am născut într-un oraș de câmpie și am învățat să privesc adâncul
              înainte de a avea cuvinte pentru el.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PORTRAIT + FIRST PARAGRAPH */}
      <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div>
              <div className="group relative aspect-[3/4] w-full overflow-hidden bg-surface">
                <Image
                  src="/studio-portrait.jpg"
                  alt="Atelier de pictură cu lumină naturală și pânze stivuite"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover saturate-[0.82] transition-all duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:saturate-100"
                  style={{ willChange: "transform, filter" }}
                  priority
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/20 via-accent/5 to-transparent opacity-0 transition-opacity duration-[1200ms] ease-out group-hover:opacity-100"
                />
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Atelier · Viena, 2024
              </p>
            </div>
          </Reveal>

          <Reveal delay={180} className="md:col-span-7">
            <div className="flex flex-col gap-12 md:pt-8">
              <p className="font-sans text-lg leading-relaxed text-foreground md:text-xl">
                <span className="float-left mr-3 mt-1 font-display text-7xl font-light italic leading-[0.8] text-accent md:text-8xl">
                  M
                </span>
                ă numesc Maria. M-am născut în 1999, la Arad, și lucrez astăzi
                din Viena — un oraș care respiră straturi, istorie și o liniște
                aparte, potrivită pentru cineva care ascultă mult înainte să
                picteze. Între cele două locuri s-a format felul în care privesc
                lumea: cu un picior în pământul de acasă și cu celălalt în
                întrebările care nu se termină.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CE CAUT */}
      <Chapter index="01" label="Practică" title="Ce caut în fiecare lucrare">
        <p>
          Pictez cu ulei și acrilic pentru că îmi trebuie o materie care să
          opună rezistență — ceva care să nu se lase modelat ușor, așa cum nu
          se lasă modelate nici trăirile pe care le explorez. Lucrez cu
          simboluri, cu arhetipuri și cu ceea ce Jung numea{" "}
          <em className="font-display not-italic italic text-foreground">umbra</em>
          : acele părți din noi pe care nu le arătăm, dar care ne conduc mai
          mult decât recunoaștem.
        </p>
        <p>
          Nu le pictez ca să le exorcizez. Le pictez ca să le dau demnitate.
        </p>
      </Chapter>

      {/* DE CE */}
      <Chapter index="02" label="Motivație" title="De ce fac asta">
        <p>
          Cred că arta cea mai onestă nu vine din a spune ceva nou, ci din a
          recunoaște, încet, ceea ce era deja acolo. Fiecare pânză este o
          întâlnire — între ceea ce știu și ceea ce încă nu îndrăznesc să știu.
        </p>
        <p>
          Dacă, privindu-le, simți că una dintre ele te-a văzut pe tine,
          înseamnă că lucrarea și-a găsit celălalt capăt.
        </p>
      </Chapter>

      {/* PULL QUOTE */}
      <section className="relative border-t border-border px-6 py-32 md:px-12 md:py-48">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 select-none font-display text-[200px] font-light italic leading-none text-accent/[0.06] md:top-16 md:text-[280px]"
        >
          „
        </span>
        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              —
            </span>
          </Reveal>
          <Reveal delay={140}>
            <blockquote className="mt-8 font-display text-4xl font-light italic leading-[1.15] text-foreground text-balance md:text-6xl">
              „Nu pictez ca să fiu înțeles. Pictez ca să nu mă pierd pe drum.”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* FORMARE */}
      <Chapter index="03" label="Formare" title="Formare și practică">
        <p>
          Practica mea artistică este continuă și autodidactă în cea mai mare
          parte, susținută de studiul psihologiei analitice, al simbolisticii
          și al artei figurative europene.
        </p>
        <p>
          Pregătesc, în paralel, o tranziție către arta-terapie formală —
          pentru că ceea ce se întâmplă deja, tăcut, în workshopurile mele,
          merită un cadru profesional pe măsură.
        </p>
      </Chapter>

      {/* CTA FINAL */}
      <section className="border-t border-border px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-display text-4xl font-light leading-tight text-foreground text-balance md:text-6xl">
              Acum ai cuvintele. <br />
              <span className="italic text-muted-foreground">Urmează imaginile.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/galerie"
                className="group inline-flex h-12 items-center gap-3 bg-foreground px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-colors duration-[800ms] ease-out hover:bg-accent hover:text-foreground"
              >
                <span>Vezi lucrările</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-[800ms] ease-out group-hover:translate-x-2"
                >
                  →
                </span>
              </Link>
              <a
                href="mailto:studio@example.com"
                className="inline-flex h-12 items-center justify-center border border-foreground bg-transparent px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors duration-[800ms] ease-out hover:border-accent hover:text-accent"
              >
                Scrie-mi
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function Chapter({
  index,
  label,
  title,
  children,
}: {
  index: string
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-3 md:sticky md:top-32 md:self-start">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              {index} · {label}
            </span>
            <span
              aria-hidden
              className="mt-2 h-px w-12 bg-accent/40"
            />
          </div>
        </Reveal>
        <Reveal delay={140} className="md:col-span-9">
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-4xl font-light leading-tight text-foreground text-balance md:text-5xl">
              {title}
            </h2>
            <div className="flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
              {children}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
