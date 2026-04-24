/**
 * ============================================================================
 * Domain types — single source of truth for CMS + runtime contracts.
 * Shaped after Sanity.io documents but portable to any headless CMS.
 * ============================================================================
 */

export type Locale = "ro" | "en"

export type ArtworkCategory = "abstracte" | "simbolice"

export type GalleryFilter = "toate" | ArtworkCategory

/** Sanity image asset projection (what we select with GROQ). */
export interface CmsImage {
  /** Fully resolved URL (CDN). */
  url: string
  /** Intrinsic dimensions — required to prevent CLS with next/image. */
  width: number
  height: number
  /** Low-quality image placeholder (base64) for blurDataURL. */
  lqip: string
  /** Accessibility. Always required. */
  alt: string
}

export interface PriceInfo {
  amountCents: number
  currency: "EUR" | "USD" | "RON"
  status: "available" | "reserved" | "sold" | "nfs"
}

export interface Artwork {
  _id: string
  slug: string
  title: string
  category: ArtworkCategory
  /** Drives the state-based masonry filter (melancolie, extaz, liniște, ...). */
  emotionalState: string[]
  year: number
  medium: string
  dimensions: { w: number; h: number; unit: "cm" | "in" }
  description: string
  image: CmsImage
  price?: PriceInfo
  featured: boolean
  publishedAt: string
}

export interface Reflection {
  _id: string
  slug: string
  title: string
  excerpt: string
  coverImage: CmsImage
  tags: string[]
  author: { name: string; avatar?: CmsImage }
  readingTimeMin: number
  publishedAt: string
  /** Rich text body is kept opaque at the boundary; rendered by PortableText. */
  body?: unknown
}

export interface WorkshopSession {
  id: string
  /** ISO 8601 in UTC. Display layer converts to Europe/Vienna / Europe/Bucharest. */
  startsAtUtc: string
  endsAtUtc: string
  seatsLeft: number
  capacity: number
}

export interface Workshop {
  _id: string
  slug: string
  title: string
  summary: string
  format: "online" | "hibrid"
  durationMin: number
  priceCents: number
  currency: "EUR" | "RON"
  intentions: string[]
  coverImage: CmsImage
  sessions: WorkshopSession[]
}

/**
 * Booking payload — what the client sends to /api/booking.
 * Narrow by construction; server re-validates with zod.
 */
export interface BookingRequest {
  workshopSlug: string
  sessionId: string
  attendee: {
    name: string
    email: string
    intention?: string
  }
  /** IANA timezone detected from the browser, used for the ICS attachment. */
  timezone: string
}

export interface BookingConfirmation {
  bookingId: string
  zoomJoinUrl: string
  /** ISO 8601. */
  startsAt: string
  calendarIcsUrl: string
}

/** Discriminated union for any async resource. Used by UI state machines. */
export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; message: string }
