import type { Artwork, Reflection, Workshop } from "./types"

/* Deterministic preview data. Replaces Sanity until env vars are set. */

const img = (url: string, alt: string, w = 1200, h = 1500) => ({
  url,
  width: w,
  height: h,
  // Tiny inline SVG placeholder (valid base64 PNG-like stand-in for blurDataURL).
  lqip:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxNDE0MTQiLz48L3N2Zz4=",
  alt,
})

export const mockArtworks: Artwork[] = [
  {
    _id: "a1",
    slug: "pragul-diminetii",
    title: "Pragul dimineții",
    category: "abstracte",
    emotionalState: ["liniște", "tranziție"],
    year: 2024,
    medium: "Ulei pe pânză",
    dimensions: { w: 140, h: 100, unit: "cm" },
    description:
      "O lumină care iese din întuneric ca o respirație lungă. Pictura începe acolo unde cuvântul se oprește.",
    image: img("/artwork-abstract-01.jpg", "Pictură abstractă în ulei, lumină umbrită emergând din întuneric"),
    price: { amountCents: 420000, currency: "EUR", status: "available" },
    featured: true,
    publishedAt: "2024-09-12",
  },
  {
    _id: "a2",
    slug: "umbra-care-asculta",
    title: "Umbra care ascultă",
    category: "simbolice",
    emotionalState: ["introspecție", "umbră"],
    year: 2024,
    medium: "Ulei pe pânză",
    dimensions: { w: 180, h: 120, unit: "cm" },
    description:
      "O siluetă arhetipală în negativul obscur. Figura nu se oferă — te așteaptă să o recunoști.",
    image: img("/artwork-symbolic-01.jpg", "Figură arhetipală siluetată cu lumină umbrie pe margini", 1200, 1500),
    price: { amountCents: 680000, currency: "EUR", status: "available" },
    featured: true,
    publishedAt: "2024-11-02",
  },
  {
    _id: "a3",
    slug: "axa-tacerii",
    title: "Axa tăcerii",
    category: "abstracte",
    emotionalState: ["liniște", "verticalitate"],
    year: 2025,
    medium: "Ulei pe pânză",
    dimensions: { w: 120, h: 90, unit: "cm" },
    description:
      "O bandă verticală de pigment cremos pe fond de obsidian. Materia ca rugăciune.",
    image: img("/artwork-abstract-02.jpg", "Bandă verticală de pigment cremos pe fond negru"),
    price: { amountCents: 360000, currency: "EUR", status: "reserved" },
    featured: false,
    publishedAt: "2025-01-18",
  },
  {
    _id: "a4",
    slug: "mainile-care-cer",
    title: "Mâinile care cer",
    category: "simbolice",
    emotionalState: ["dorință", "vulnerabilitate"],
    year: 2023,
    medium: "Ulei pe pânză",
    dimensions: { w: 100, h: 80, unit: "cm" },
    description:
      "Două mâini ieșind din întuneric. Tenebrismul renascentist ca limbaj al dorului.",
    image: img("/artwork-symbolic-02.jpg", "Două mâini emergând din întuneric cu lumină caldă"),
    price: { amountCents: 540000, currency: "EUR", status: "sold" },
    featured: true,
    publishedAt: "2023-05-22",
  },
  {
    _id: "a5",
    slug: "rana-deschisa",
    title: "Rană deschisă",
    category: "abstracte",
    emotionalState: ["durere", "deschidere"],
    year: 2024,
    medium: "Ulei pe pânză",
    dimensions: { w: 90, h: 70, unit: "cm" },
    description: "Un gest orizontal. Nu metaforă — anatomie a emoției.",
    image: img("/artwork-abstract-03.jpg", "Abstract orizontal, gest în cremos pe fond obscur"),
    price: { amountCents: 280000, currency: "EUR", status: "available" },
    featured: false,
    publishedAt: "2024-06-30",
  },
  {
    _id: "a6",
    slug: "martorul",
    title: "Martorul",
    category: "simbolice",
    emotionalState: ["prezență", "observare"],
    year: 2025,
    medium: "Ulei pe pânză",
    dimensions: { w: 70, h: 70, unit: "cm" },
    description:
      "Un ochi care se deschide din negativul tabloului. Arhetipul privirii interioare.",
    image: img("/artwork-symbolic-03.jpg", "Un ochi arhetipal emergând din negrul profund", 1200, 1200),
    price: { amountCents: 320000, currency: "EUR", status: "available" },
    featured: false,
    publishedAt: "2025-02-10",
  },
]

export const mockReflections: Reflection[] = [
  {
    _id: "r1",
    slug: "pictura-ca-limbaj-al-umbrei",
    title: "Pictura ca limbaj al umbrei",
    excerpt:
      "Ce se întâmplă între pictor și pânză atunci când nimeni nu privește? Un scurt eseu despre materie și recunoaștere.",
    coverImage: img("/artwork-abstract-01.jpg", "Pictură abstractă, lumină în obscur"),
    tags: ["umbră", "proces"],
    author: { name: "Maria V." },
    readingTimeMin: 4,
    publishedAt: "2025-01-04",
  },
  {
    _id: "r2",
    slug: "arhetipul-martorului",
    title: "Arhetipul martorului",
    excerpt:
      "Despre figura interioară care privește fără să judece și despre cum încearcă arta să o picteze.",
    coverImage: img("/artwork-symbolic-03.jpg", "Ochi arhetipal, pictură simbolică"),
    tags: ["arhetip", "jung"],
    author: { name: "Maria V." },
    readingTimeMin: 6,
    publishedAt: "2025-02-18",
  },
  {
    _id: "r3",
    slug: "intre-arad-si-viena",
    title: "Între Arad și Viena",
    excerpt:
      "Însemnare despre cum două geografii formează o privire — un picior în pământul de acasă, celălalt în întrebări.",
    coverImage: img("/studio-portrait.jpg", "Atelier de pictură, lumină naturală"),
    tags: ["biografie", "atelier"],
    author: { name: "Maria V." },
    readingTimeMin: 3,
    publishedAt: "2024-11-29",
  },
]

/* Helper: build ISO strings relative to "now" for a living demo. */
const daysFromNow = (d: number, hour = 18): string => {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() + d)
  date.setUTCHours(hour, 0, 0, 0)
  return date.toISOString()
}

export const mockWorkshops: Workshop[] = [
  {
    _id: "w1",
    slug: "cerc-de-expresie-creativa",
    title: "Cerc de expresie creativă",
    summary:
      "Un spațiu online, în grup mic, în care culoarea devine limbaj și tăcerea devine material de lucru.",
    format: "online",
    durationMin: 90,
    priceCents: 4500,
    currency: "EUR",
    intentions: ["prezență", "expresie", "umbră"],
    coverImage: img("/artwork-abstract-02.jpg", "Atelier online de expresie creativă"),
    sessions: [
      { id: "s1", startsAtUtc: daysFromNow(5, 18), endsAtUtc: daysFromNow(5, 19), seatsLeft: 6, capacity: 8 },
      { id: "s2", startsAtUtc: daysFromNow(12, 18), endsAtUtc: daysFromNow(12, 19), seatsLeft: 3, capacity: 8 },
      { id: "s3", startsAtUtc: daysFromNow(19, 18), endsAtUtc: daysFromNow(19, 19), seatsLeft: 8, capacity: 8 },
      { id: "s4", startsAtUtc: daysFromNow(26, 18), endsAtUtc: daysFromNow(26, 19), seatsLeft: 0, capacity: 8 },
    ],
  },
  {
    _id: "w2",
    slug: "lucru-cu-umbra",
    title: "Lucru cu umbra",
    summary:
      "O sesiune tematică, pentru cei care sunt deja familiarizați cu procesul. Lucrăm cu simbol și arhetip.",
    format: "online",
    durationMin: 120,
    priceCents: 6500,
    currency: "EUR",
    intentions: ["umbră", "arhetip"],
    coverImage: img("/artwork-symbolic-01.jpg", "Atelier tematic lucru cu umbra"),
    sessions: [
      { id: "s5", startsAtUtc: daysFromNow(9, 17), endsAtUtc: daysFromNow(9, 19), seatsLeft: 4, capacity: 6 },
      { id: "s6", startsAtUtc: daysFromNow(23, 17), endsAtUtc: daysFromNow(23, 19), seatsLeft: 6, capacity: 6 },
    ],
  },
]
