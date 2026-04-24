import Image from "next/image"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { WorkshopBooking } from "@/components/workshop-booking"
import { Reveal } from "@/components/reveal"
import { getWorkshops } from "@/lib/cms"

export const metadata = {
  title: "Workshop-uri — Expresie creativă online",
  description:
    "Workshop-uri online de expresie creativă pe Zoom. Grupuri mici, prezență ghidată, fără evaluare. Rezervă-ți locul.",
}

export const revalidate = 300

export default async function WorkshopsPage() {
  const workshops = await getWorkshops()
  const primary = workshops[0]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-40 md:px-12 md:pb-24 md:pt-48">
        {/* Massive ghost word */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-12 top-32 select-none font-display text-[18vw] font-light italic leading-none text-accent/[0.04] md:text-[14vw]"
        >
          Cerc
        </span>

        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex items-center gap-6">
              <span className="h-px w-12 bg-accent" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Online · Zoom · Grupuri de maxim 8
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-12 font-display text-[clamp(56px,9vw,140px)] font-light leading-[0.92] tracking-[-0.03em] text-foreground text-balance">
              Workshop-uri de <br />
              <span className="italic text-muted-foreground">expresie creativă</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-12 max-w-3xl font-display text-xl font-light italic leading-snug text-muted-foreground md:text-2xl">
              Un loc în care nu ți se cere să produci ceva frumos. Ți se cere doar
              să fii prezent.
            </p>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <Chapter
        index="01"
        label="Hook"
        body={
          <>
            <p>
              Sunt oameni care desenează de mici și oameni care nu au mai ținut o
              pensulă din clasa a patra. În spațiul acestor întâlniri, diferența
              dispare în primele zece minute.
            </p>
            <p>
              Ce rămâne este ceea ce ai venit, de fapt, să întâlnești: pe tine,
              fără filtrul zilei de ieri.
            </p>
          </>
        }
      />

      {/* HOW IT WORKS */}
      <Chapter
        index="02"
        label="Cum arată o sesiune"
        body={
          <>
            <p>
              Ne întâlnim online, pe Zoom, în grupuri mici — niciodată mai mult
              de opt persoane, ca să existe loc pentru fiecare voce. O sesiune
              durează aproximativ 90 de minute și are trei momente:
            </p>
            <ul className="flex flex-col gap-3 pl-4">
              <li>
                <strong className="font-display font-normal text-foreground">
                  Un punct de aterizare
                </strong>{" "}
                — respirație, liniște, un text scurt.
              </li>
              <li>
                <strong className="font-display font-normal text-foreground">
                  Lucru cu materialele tale
                </strong>{" "}
                — hârtie, culori, orice ai la îndemână.
              </li>
              <li>
                <strong className="font-display font-normal text-foreground">
                  Un cerc final de împărtășire
                </strong>{" "}
                — voluntar. Nu se corectează. Nu se evaluează. Se privește
                împreună.
              </li>
            </ul>
          </>
        }
      />

      {/* FOR WHOM */}
      <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-3 md:sticky md:top-32 md:self-start">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                03 · Pentru cine
              </span>
              <span aria-hidden className="mt-2 h-px w-12 bg-accent/40" />
            </div>
          </Reveal>
          <Reveal delay={140} className="md:col-span-9">
            <div className="flex flex-col gap-8">
              <h2 className="font-display text-4xl font-light leading-tight text-foreground text-balance md:text-5xl">
                Pentru cine sunt <span className="italic text-muted-foreground">aceste întâlniri</span>
              </h2>
              <ul className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
                {[
                  "Pentru cei care simt că trăiesc repede și se ating de ei înșiși rar.",
                  "Pentru cei care trec printr-o schimbare interioară și caută un limbaj pentru ea.",
                  "Pentru cei care iubesc arta, dar au fost învățați cândva că „nu au talent” — o minciună blândă pe care o dezfacem împreună.",
                  "Pentru terapeuți, creativi și profesioniști care vor să lucreze cu propria umbră, nu doar cu a celorlalți.",
                ].map((line, i) => (
                  <li
                    key={i}
                    className="group flex gap-6 bg-background p-8 text-base leading-relaxed text-muted-foreground transition-colors duration-[800ms] ease-out hover:bg-surface hover:text-foreground"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent transition-transform duration-[800ms] ease-out group-hover:translate-y-[-2px]">
                      0{i + 1}
                    </span>
                    <span className="max-w-md">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUE STACK */}
      <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4 md:sticky md:top-32 md:self-start">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                04 · Ce primești
              </span>
              <h2 className="font-display text-4xl font-light leading-tight text-foreground md:text-5xl">
                Ce iei <span className="italic text-muted-foreground">cu tine</span>
              </h2>
              <span aria-hidden className="mt-2 h-px w-12 bg-accent/40" />
            </div>
          </Reveal>
          <Reveal delay={140} className="md:col-span-8">
            <dl className="flex flex-col divide-y divide-border">
              {[
                [
                  "90 de minute de prezență ghidată",
                  "Într-un grup restrâns de maxim opt oameni.",
                ],
                [
                  "Bibliotecă privată",
                  "Întrebări și exerciții pe care le poți relua oricând.",
                ],
                [
                  "Înregistrarea părții ghidate",
                  "Audio. Partea de împărtășire nu se înregistrează, din respect.",
                ],
                [
                  "Recomandare personalizată",
                  "Un exercițiu individual, trimis prin e-mail în 48 de ore.",
                ],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="group grid grid-cols-12 items-start gap-6 py-6 transition-[padding] duration-[800ms] ease-out hover:pl-4"
                >
                  <dt className="col-span-12 font-display text-xl font-light text-foreground transition-colors duration-[800ms] ease-out group-hover:text-accent md:col-span-5">
                    {title}
                  </dt>
                  <dd className="col-span-12 text-sm leading-relaxed text-muted-foreground md:col-span-7">
                    {body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4 md:sticky md:top-32 md:self-start">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                05 · Limite profesionale
              </span>
              <span aria-hidden className="mt-2 h-px w-12 bg-accent/40" />
            </div>
          </Reveal>
          <Reveal delay={140} className="md:col-span-8">
            <div className="flex max-w-2xl flex-col gap-6">
            <h2 className="font-display text-4xl font-light leading-tight text-foreground md:text-5xl">
              Ce nu sunt aceste workshopuri
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Nu sunt terapie. Nu înlocuiesc un cadru clinic și nu pretind să o
              facă. Sunt un spațiu de expresie creativă, ghidat cu grijă, care
              pentru mulți devine primul pas către a-și lua propriile trăiri în
              serios.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pregătesc, în paralel, formarea în artă-terapie; până atunci,
              păstrez această distincție limpede — pentru siguranța ta.
            </p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
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
            <blockquote className="mt-8 font-display text-3xl font-light italic leading-[1.2] text-foreground text-balance md:text-5xl">
              „Am venit să pictez. Am plecat cu ceva ce nu știam că pierdusem.”
            </blockquote>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Participantă, cerc online · 2024
            </p>
          </Reveal>
        </div>
      </section>

      {/* WORKSHOP DETAIL + BOOKING */}
      {primary ? (
        <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
              <Reveal className="md:col-span-5">
                <div className="group relative aspect-[4/5] w-full overflow-hidden bg-surface">
                  <Image
                    src={primary.coverImage.url}
                    alt={primary.coverImage.alt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover saturate-[0.82] transition-all duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:saturate-100"
                    style={{ willChange: "transform, filter" }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/20 via-accent/5 to-transparent opacity-0 transition-opacity duration-[1200ms] ease-out group-hover:opacity-100"
                  />
                </div>
              </Reveal>
              <Reveal delay={140} className="md:col-span-7">
                <div className="flex flex-col justify-center gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    Sesiuni deschise
                  </span>
                  <h2 className="font-display text-4xl font-light leading-tight text-foreground text-balance md:text-6xl">
                    {primary.title}
                  </h2>
                  <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                    {primary.summary}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-6 text-sm">
                    <div className="flex flex-col gap-1">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                        Durată
                      </dt>
                      <dd className="font-display text-2xl text-foreground">
                        {primary.durationMin} min
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                        Contribuție
                      </dt>
                      <dd className="font-display text-2xl text-foreground">
                        {(primary.priceCents / 100).toFixed(0)} {primary.currency}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>

            <div className="mt-24">
              <WorkshopBooking workshop={primary} />
            </div>
          </div>
        </section>
      ) : null}

      {/* LOW-FRICTION CTA */}
      <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-display text-3xl font-light leading-tight text-foreground text-balance md:text-5xl">
              Încă nu ești <span className="italic text-muted-foreground">sigur</span>?
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <a
              href="mailto:studio@example.com?subject=Întrebare%20despre%20workshop"
              className="group inline-flex h-12 items-center gap-3 border border-foreground bg-transparent px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors duration-[800ms] ease-out hover:border-accent hover:text-accent"
            >
              <span>Scrie-mi două rânduri · Îți răspund personal</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-[800ms] ease-out group-hover:translate-x-2"
              >
                →
              </span>
            </a>
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
  body,
}: {
  index: string
  label: string
  body: React.ReactNode
}) {
  return (
    <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-3 md:sticky md:top-32 md:self-start">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              {index} · {label}
            </span>
            <span aria-hidden className="mt-2 h-px w-12 bg-accent/40" />
          </div>
        </Reveal>
        <Reveal delay={140} className="md:col-span-9">
          <div className="flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
            {body}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
