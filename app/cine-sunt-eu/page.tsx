import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

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
      <section className="px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-6">
            <span className="h-px w-12 bg-accent" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Biografie · Atelier
            </span>
          </div>

          <h1 className="mt-12 font-display text-[clamp(64px,10vw,160px)] font-light leading-[0.92] tracking-[-0.03em] text-foreground text-balance">
            Cine sunt eu?
          </h1>

          <p className="mt-16 max-w-3xl font-display text-2xl font-light italic leading-snug text-muted-foreground md:text-3xl">
            M-am născut într-un oraș de câmpie și am învățat să privesc adâncul
            înainte de a avea cuvinte pentru el.
          </p>
        </div>
      </section>

      {/* PORTRAIT + FIRST PARAGRAPH */}
      <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
              <Image
                src="/studio-portrait.jpg"
                alt="Atelier de pictură cu lumină naturală și pânze stivuite"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Atelier · Viena, 2024
            </p>
          </div>

          <div className="flex flex-col gap-12 md:col-span-7 md:pt-8">
            <p className="font-sans text-lg leading-relaxed text-foreground md:text-xl">
              Mă numesc Maria. M-am născut în 1999, la Arad, și lucrez astăzi
              din Viena — un oraș care respiră straturi, istorie și o liniște
              aparte, potrivită pentru cineva care ascultă mult înainte să
              picteze. Între cele două locuri s-a format felul în care privesc
              lumea: cu un picior în pământul de acasă și cu celălalt în
              întrebările care nu se termină.
            </p>
          </div>
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
      <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            —
          </span>
          <blockquote className="mt-8 font-display text-4xl font-light italic leading-[1.15] text-foreground text-balance md:text-6xl">
            „Nu pictez ca să fiu înțeles. Pictez ca să nu mă pierd pe drum.”
          </blockquote>
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
          <h2 className="font-display text-4xl font-light leading-tight text-foreground text-balance md:text-6xl">
            Acum ai cuvintele. <br />
            Urmează imaginile.
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/galerie"
              className="inline-flex h-12 items-center justify-center bg-foreground px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent hover:text-foreground"
            >
              Vezi lucrările
            </Link>
            <a
              href="mailto:studio@example.com"
              className="inline-flex h-12 items-center justify-center border border-foreground bg-transparent px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Scrie-mi
            </a>
          </div>
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
        <div className="flex flex-col gap-2 md:col-span-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            {index} · {label}
          </span>
        </div>
        <div className="flex flex-col gap-8 md:col-span-9">
          <h2 className="font-display text-4xl font-light leading-tight text-foreground text-balance md:text-5xl">
            {title}
          </h2>
          <div className="flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
