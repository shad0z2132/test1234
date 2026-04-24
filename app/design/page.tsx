import { SiteNav } from "@/components/site-nav"
import { ArtworkCard } from "@/components/artwork-card"

// ----------------------------------------------------------------------------
// Design tokens (single source of truth for the showcase)
// ----------------------------------------------------------------------------

const palette = [
  {
    name: "Deep Obsidian",
    token: "--background",
    hex: "#0A0A0A",
    role: "Base canvas. The void where meaning emerges.",
    swatchClass: "bg-background",
    textClass: "text-foreground",
  },
  {
    name: "Gesso",
    token: "--foreground",
    hex: "#E8E6E1",
    role: "Primary text. Prepared surface, warm white.",
    swatchClass: "bg-foreground",
    textClass: "text-background",
  },
  {
    name: "Raw Umber",
    token: "--accent",
    hex: "#8B4513",
    role: "Singular accent. Earth, shadow, the archetypal.",
    swatchClass: "bg-accent",
    textClass: "text-foreground",
  },
  {
    name: "Elevated Obsidian",
    token: "--surface",
    hex: "#141414",
    role: "Cards, nav fill, subtle surfaces.",
    swatchClass: "bg-surface",
    textClass: "text-foreground",
  },
  {
    name: "Dimmed Gesso",
    token: "--muted-foreground",
    hex: "#8A8680",
    role: "Secondary text, metadata, captions.",
    swatchClass: "bg-[#8A8680]",
    textClass: "text-background",
  },
]

const typeScale = [
  {
    level: "01",
    name: "Display XL",
    family: "Cormorant Garamond",
    size: "clamp(72px, 10vw, 160px)",
    tracking: "-0.03em",
    leading: "0.92",
    className:
      "font-display font-light text-[clamp(72px,10vw,160px)] leading-[0.92] tracking-[-0.03em]",
    sample: "Cine sunt eu",
  },
  {
    level: "02",
    name: "Display L",
    family: "Cormorant Garamond",
    size: "clamp(56px, 6vw, 96px)",
    tracking: "-0.02em",
    leading: "1.0",
    className:
      "font-display font-light italic text-[clamp(56px,6vw,96px)] leading-[1.0] tracking-[-0.02em]",
    sample: "The shadow remembers",
  },
  {
    level: "03",
    name: "Display M",
    family: "Cormorant Garamond",
    size: "48px",
    tracking: "-0.015em",
    leading: "1.1",
    className:
      "font-display font-normal text-5xl leading-[1.1] tracking-[-0.015em]",
    sample: "Abstracte · Simbolice",
  },
  {
    level: "04",
    name: "Heading 1",
    family: "Cormorant Garamond",
    size: "32px",
    tracking: "-0.01em",
    leading: "1.2",
    className:
      "font-display font-normal text-[32px] leading-[1.2] tracking-[-0.01em]",
    sample: "Workshops for the inner world",
  },
  {
    level: "05",
    name: "Heading 2",
    family: "Cormorant Garamond",
    size: "24px",
    tracking: "0",
    leading: "1.3",
    className: "font-display font-medium text-2xl leading-[1.3]",
    sample: "Reflecții recente",
  },
  {
    level: "06",
    name: "Body Large",
    family: "Geist",
    size: "18px",
    tracking: "-0.005em",
    leading: "1.6",
    className:
      "font-sans font-normal text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground",
    sample:
      "Fiecare lucrare este o întâlnire cu ceea ce rămâne nespus — o tăcere privită îndelung.",
  },
  {
    level: "07",
    name: "Body",
    family: "Geist",
    size: "15px",
    tracking: "0",
    leading: "1.6",
    className: "font-sans font-normal text-[15px] leading-relaxed text-foreground",
    sample:
      "The practice moves between abstract and symbolic registers, attending to the archetypes that surface when language falls quiet.",
  },
  {
    level: "08",
    name: "Caption",
    family: "Geist",
    size: "13px",
    tracking: "0.01em",
    leading: "1.5",
    className:
      "font-sans font-normal text-[13px] leading-[1.5] tracking-[0.01em] text-muted-foreground",
    sample: "Oil on linen · 140 × 100 cm · 2024",
  },
  {
    level: "09",
    name: "Micro / Label",
    family: "Geist Mono",
    size: "10px",
    tracking: "0.24em",
    leading: "1",
    className:
      "font-mono font-medium text-[10px] leading-none tracking-[0.24em] uppercase text-accent",
    sample: "Abstracte / No. 014",
  },
]

const spacing = [
  { token: "xs", px: 8, rem: "0.5rem", use: "Inline icon gap" },
  { token: "sm", px: 16, rem: "1rem", use: "Tight stack, form rows" },
  { token: "md", px: 24, rem: "1.5rem", use: "Component internal padding" },
  { token: "lg", px: 32, rem: "2rem", use: "Card metadata gap" },
  { token: "xl", px: 48, rem: "3rem", use: "Intra-section blocks" },
  { token: "2xl", px: 64, rem: "4rem", use: "Section inner padding" },
  { token: "3xl", px: 96, rem: "6rem", use: "Section dividers (mobile)" },
  { token: "4xl", px: 128, rem: "8rem", use: "Section dividers (desktop)" },
  { token: "5xl", px: 192, rem: "12rem", use: "Hero breathing room" },
  { token: "6xl", px: 256, rem: "16rem", use: "Editorial silence" },
]

// ----------------------------------------------------------------------------
// Section scaffolding
// ----------------------------------------------------------------------------

function SectionLabel({
  index,
  title,
}: {
  index: string
  title: string
}) {
  return (
    <div className="flex items-baseline gap-6 border-b border-border pb-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
        {index}
      </span>
      <h2 className="font-display text-3xl font-light text-foreground md:text-4xl">
        {title}
      </h2>
    </div>
  )
}

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO ------------------------------------------------------------- */}
      <section className="relative flex min-h-[92vh] flex-col justify-end px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-48">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-16">
          <div className="flex items-center gap-6">
            <span className="h-px w-12 bg-accent" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Design System · v1.0
            </span>
          </div>

          <h1 className="font-display text-[clamp(64px,10vw,160px)] font-light leading-[0.92] tracking-[-0.03em] text-foreground text-balance">
            Inner world,{" "}
            <span className="italic text-muted-foreground">shadow,</span>
            <br />
            and archetypes.
          </h1>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <p className="font-display text-2xl font-light italic leading-snug text-muted-foreground md:col-span-6 md:col-start-1">
              A visual grammar for an elite artist and web3 branding practice —
              minimalist, introspective, cinematic.
            </p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:col-span-4 md:col-start-9">
              {[
                ["Palette", "3 + 2 neutrals"],
                ["Type", "Cormorant · Geist"],
                ["Grid", "8px base"],
                ["Radius", "0px"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="font-display text-lg text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* PALETTE ---------------------------------------------------------- */}
      <section
        id="palette"
        className="px-6 py-24 md:px-12 md:py-40"
        aria-labelledby="palette-title"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel index="01" title="Palette" />

          <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-5">
            {palette.map((c) => (
              <article
                key={c.token}
                className={`flex aspect-[3/4] flex-col justify-between p-6 md:p-8 ${c.swatchClass} ${c.textClass}`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] opacity-70">
                  {c.token}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-2xl font-light leading-tight">
                    {c.name}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-80">{c.role}</p>
                  <span className="font-mono text-[11px] tracking-[0.1em] opacity-90">
                    {c.hex}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Five tokens. No more. Raw Umber is the only chromatic voice — used
            sparingly as a rule, a timestamp, a threshold. Everything else is
            obsidian and gesso: the studio wall and the prepared canvas.
          </p>
        </div>
      </section>

      {/* TYPOGRAPHY ------------------------------------------------------- */}
      <section
        id="typography"
        className="border-t border-border px-6 py-24 md:px-12 md:py-40"
        aria-labelledby="type-title"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel index="02" title="Typography" />

          <div className="mt-16 flex flex-col divide-y divide-border">
            {typeScale.map((t) => (
              <div
                key={t.level}
                className="grid grid-cols-1 gap-8 py-10 md:grid-cols-12 md:gap-12 md:py-14"
              >
                <div className="flex flex-col gap-2 md:col-span-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    {t.level} · {t.name}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {t.family}
                  </span>
                  <dl className="mt-3 flex flex-col gap-1 font-mono text-[11px] text-muted-foreground">
                    <div className="flex justify-between gap-4">
                      <dt>size</dt>
                      <dd className="text-foreground">{t.size}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>leading</dt>
                      <dd className="text-foreground">{t.leading}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>tracking</dt>
                      <dd className="text-foreground">{t.tracking}</dd>
                    </div>
                  </dl>
                </div>
                <div className="flex items-center md:col-span-9">
                  <p className={`${t.className} text-balance`}>{t.sample}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPACING ---------------------------------------------------------- */}
      <section
        id="spacing"
        className="border-t border-border px-6 py-24 md:px-12 md:py-40"
        aria-labelledby="spacing-title"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel index="03" title="Spacing · 8px Grid" />

          <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-12">
            <p className="font-display text-xl font-light italic leading-snug text-muted-foreground md:col-span-4">
              Space is not the absence of form — it is the form. Sections
              breathe at 128–256px on desktop. Nothing is crowded.
            </p>

            <div className="md:col-span-8">
              <ul className="flex flex-col divide-y divide-border">
                {spacing.map((s) => (
                  <li
                    key={s.token}
                    className="grid grid-cols-12 items-center gap-6 py-5"
                  >
                    <span className="col-span-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                      {s.token}
                    </span>
                    <span className="col-span-2 font-mono text-xs text-foreground">
                      {s.px}px
                    </span>
                    <span className="col-span-2 font-mono text-xs text-muted-foreground">
                      {s.rem}
                    </span>
                    <div className="col-span-6 flex items-center gap-4">
                      <div
                        className="h-px bg-accent"
                        style={{ width: `${Math.min(s.px, 256)}px` }}
                        aria-hidden
                      />
                      <span className="text-xs text-muted-foreground">
                        {s.use}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENTS ------------------------------------------------------- */}
      <section
        id="components"
        className="border-t border-border px-6 py-24 md:px-12 md:py-40"
        aria-labelledby="components-title"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel index="04" title="Components" />

          {/* Buttons */}
          <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="font-display text-2xl font-light text-foreground">
                Buttons
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Sharp 0px radius. No shadows. Hover is a color shift, never a
                lift. Type is Geist, uppercase, tracked to 0.18em.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:col-span-8">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center bg-foreground px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent hover:text-foreground"
              >
                Rezervă workshop
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center border border-foreground bg-transparent px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Vezi galeria
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center border border-border bg-surface px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Ghost
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-accent"
              >
                <span className="h-px w-6 bg-accent" aria-hidden />
                Solicită achiziție
              </button>
            </div>
          </div>

          {/* Glass Nav demo */}
          <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="font-display text-2xl font-light text-foreground">
                Glassmorphism Nav
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                40% background opacity with backdrop-blur-xl and
                backdrop-saturate-150. Sits above the hero. Border-bottom uses
                60% of the base border token.
              </p>
            </div>
            <div className="relative overflow-hidden md:col-span-8">
              <div
                className="relative h-[240px] w-full bg-cover bg-center"
                style={{ backgroundImage: "url(/artwork-abstract-01.jpg)" }}
                aria-hidden
              >
                <div className="absolute inset-x-0 top-0 border-b border-border/60 bg-background/40 px-6 py-4 backdrop-blur-xl backdrop-saturate-150">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm uppercase tracking-[0.2em] text-foreground">
                      Studio
                    </span>
                    <div className="hidden gap-6 md:flex">
                      {["Cine sunt eu", "Galerie", "Workshops"].map((l) => (
                        <span
                          key={l}
                          className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                      RO / EN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frameless artwork cards */}
          <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="font-display text-2xl font-light text-foreground">
                Frameless Artwork Cards
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                No border, no radius, no shadow. The image is the object. A
                single umber category label precedes the title. Hover scales
                the image 1.02 over 1200ms.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                <ArtworkCard
                  src="/artwork-abstract-01.jpg"
                  alt="Abstract painting with raw umber light emerging from darkness"
                  category="Abstracte / 014"
                  title="Pragul dimineții"
                  year="2024"
                  medium="Oil on linen · 140 × 100 cm"
                />
                <ArtworkCard
                  src="/artwork-symbolic-01.jpg"
                  alt="Silhouetted archetypal figure with amber rim light"
                  category="Simbolice / 007"
                  title="Umbra care ascultă"
                  year="2024"
                  medium="Oil on linen · 180 × 120 cm"
                />
                <ArtworkCard
                  src="/artwork-abstract-02.jpg"
                  alt="Vertical band of cream and umber pigment on obsidian"
                  category="Abstracte / 022"
                  title="Axa tăcerii"
                  year="2025"
                  medium="Oil on linen · 120 × 90 cm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER ----------------------------------------------------------- */}
      <footer className="border-t border-border px-6 py-16 md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <span className="font-display text-2xl uppercase tracking-[0.2em] text-foreground">
              Studio
            </span>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Visual art and web3 branding practice exploring the inner world,
              the shadow, and the archetypes that surface in silence.
            </p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:items-end">
            <span>© 2026 · All rights reserved</span>
            <span className="text-accent">v1.0 — Design System</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
