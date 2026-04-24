/**
 * Practică — three editorial pillars (Ulei · Simbol · Umbră).
 * - 1px hairline dividers via `gap-px` + colored parent bg.
 * - Roman numerals in Raw Umber (accent).
 * - Balanced dense copy, gallery-catalogue feel.
 */

type Pillar = {
  roman: string
  tag: string
  title: string
  body: string
}

const PILLARS: Pillar[] = [
  {
    roman: "I",
    tag: "Materie",
    title: "Ulei",
    body: "Materia rezistă. De aceea o folosesc — pentru că trăirile adevărate nu se lasă modelate ușor. Fiecare strat este o decizie întoarsă spre interior.",
  },
  {
    roman: "II",
    tag: "Limbaj",
    title: "Simbol",
    body: "Imaginile vechi rămân vii pentru că niciodată nu au fost inventate. Le regăsesc, le ascult, le pictez — ca pe niște prieteni care te așteaptă.",
  },
  {
    roman: "III",
    tag: "Direcție",
    title: "Umbră",
    body: "Tot ceea ce nu este privit devine, în timp, greutate. Pictura este felul meu de a aduce în lumină ceea ce rămăsese tăcut.",
  },
]

export function Pillars() {
  return (
    <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-20">
        {/* Section header */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
                05 — Practică
              </span>
              <span
                aria-hidden
                className="hidden h-px w-16 bg-foreground/20 md:inline-block"
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/30">
              III / III
            </span>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="max-w-[18ch] font-display text-4xl font-light leading-[1.05] text-foreground text-balance md:text-6xl">
              Trei axe ale atelierului.
            </h2>
            <p className="max-w-[44ch] font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              Fiecare lucrare se sprijină pe aceleași trei întrebări: ce materie
              aleg, ce limbaj recunosc, spre ce direcție mă întorc.
            </p>
          </div>
        </div>

        {/* Three pillars — hairline-divided cells */}
        <ul className="grid grid-cols-1 gap-px overflow-hidden bg-foreground/10 md:grid-cols-3">
          {PILLARS.map((p) => (
            <li
              key={p.roman}
              className="group flex flex-col gap-10 bg-background p-10 transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-surface md:p-14"
            >
              {/* Top row — roman + tag */}
              <header className="flex items-baseline justify-between border-b border-foreground/10 pb-4">
                <span className="font-display text-5xl font-light italic text-accent md:text-6xl">
                  {p.roman}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                  {p.tag}
                </span>
              </header>

              {/* Title */}
              <h3 className="font-display text-3xl font-light leading-tight text-foreground md:text-4xl">
                {p.title}
              </h3>

              {/* Body */}
              <p className="max-w-[34ch] font-sans text-base leading-relaxed text-muted-foreground">
                {p.body}
              </p>

              {/* Bottom chrome */}
              <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                  Ax.&nbsp;{p.roman}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-[10px] text-foreground/30 transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2"
                >
                  →
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
