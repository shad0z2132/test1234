import Link from "next/link"
import { Newsletter } from "@/components/newsletter"

/**
 * Minimal Footer (Prompt 5).
 * - Raw Umber 1px hairline top, 20% opacity.
 * - Wordmark + "Viena · Arad" · 3 nav columns · newsletter micro-form.
 * - Massive top padding so the footer reads as a *page*, not a strip.
 * - All links use the 0.8s underline-extend interaction.
 */

const NAV_GROUPS: { label: string; items: { label: string; href: string }[] }[] = [
  {
    label: "Atelier",
    items: [
      { label: "Cine sunt eu", href: "/cine-sunt-eu" },
      { label: "Proces", href: "/cine-sunt-eu#proces" },
      { label: "Scrie-mi", href: "mailto:studio@example.com" },
      { label: "Arhiva", href: "/galerie" },
    ],
  },
  {
    label: "Lucrări",
    items: [
      { label: "Toate", href: "/galerie" },
      { label: "Abstracte", href: "/galerie?filter=abstracte" },
      { label: "Simbolice", href: "/galerie?filter=simbolice" },
      { label: "Dosar privat", href: "mailto:studio@example.com?subject=Dosar privat" },
    ],
  },
  {
    label: "Scriere",
    items: [
      { label: "Reflecții", href: "/reflectii" },
      { label: "Workshop-uri", href: "/workshops" },
      { label: "Jurnal audio", href: "/reflectii" },
      { label: "Note de lectură", href: "/reflectii" },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="relative overflow-hidden px-6 pb-16 pt-32 md:px-16 md:pt-48 lg:px-32"
    >
      {/* Raw Umber hairline — 20% opacity */}
      <span
        aria-hidden
        className="absolute inset-x-6 top-0 h-px bg-accent opacity-20 md:inset-x-16 lg:inset-x-32"
      />

      {/* Massive ghost wordmark — anchored to bottom */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[24vw] font-light italic leading-none text-accent/[0.03] md:text-[18vw]"
      >
        Studio
      </span>

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          {/* Wordmark + location stamp */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 font-display text-2xl italic tracking-[-0.02em] text-foreground transition-[letter-spacing] duration-[1500ms] ease-out hover:tracking-[0.01em]"
            >
              <span>Studio</span>
              <span
                aria-hidden
                className="h-px w-0 bg-accent transition-[width] duration-[1500ms] ease-out group-hover:w-8"
              />
            </Link>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
              Viena · Arad
            </span>
            <p className="mt-3 max-w-[26ch] font-display text-base font-light italic leading-snug text-foreground/50">
              Pictură, scriere, prezență — privite îndelung.
            </p>
          </div>

          {/* Three nav columns */}
          <nav className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:col-span-5 lg:gap-12">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="flex flex-col gap-5">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/40">
                  {group.label}
                </span>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <Newsletter />
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="flex flex-col gap-6 border-t border-foreground/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            © {year} Studio
            <Separator />
            <FooterLink href="/legal/termeni" muted>
              Termeni
            </FooterLink>
            <Separator />
            <FooterLink href="/legal/confidentialitate" muted>
              Confidențialitate
            </FooterLink>
            <Separator />
            <FooterLink href="/design" muted>
              Credite
            </FooterLink>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            Built slow. On purpose.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */

function FooterLink({
  href,
  children,
  muted = false,
}: {
  href: string
  children: React.ReactNode
  muted?: boolean
}) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http")
  const color = muted ? "text-foreground/40" : "text-foreground/60"
  const Cmp: React.ElementType = isExternal ? "a" : Link
  return (
    <Cmp
      href={href}
      className={
        "group relative inline-flex items-center font-sans text-sm " +
        (muted ? "text-[10px] uppercase tracking-[0.3em] " : "") +
        color +
        " transition-colors duration-[800ms] ease-out hover:text-foreground"
      }
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-[40%] bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
        />
      </span>
    </Cmp>
  )
}

function Separator() {
  return (
    <span aria-hidden className="mx-3 text-foreground/20">
      ·
    </span>
  )
}
