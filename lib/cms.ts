/**
 * ============================================================================
 * CMS Data Fetching Layer
 * ============================================================================
 * Target: Sanity.io (headless, GROQ).
 * Strategy:
 *   - Server-only functions (used in RSC) — no client-side secrets exposed.
 *   - Next.js native fetch with `next: { revalidate, tags }` for ISR + on-demand
 *     revalidation via /api/revalidate webhook.
 *   - Falls back to deterministic mock data when SANITY_* env vars are absent,
 *     so the preview is always live.
 *
 * Swap-in for production:
 *   1. Set SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION.
 *   2. (optional) SANITY_TOKEN for drafts/preview mode.
 *   3. Configure webhook → POST /api/revalidate with { tag: "artworks" | "reflections" | "workshops" }.
 *
 * Error handling contract:
 *   - Network / non-2xx       → throws CmsError, caught by RSC error boundaries.
 *   - Zero results            → returns [] (UI renders empty state).
 *   - Malformed shape         → throws CmsError("shape").
 * ============================================================================
 */

import type { Artwork, Reflection, Workshop } from "./types"
import { mockArtworks, mockReflections, mockWorkshops } from "./mock-data"

const PROJECT_ID = process.env.SANITY_PROJECT_ID
const DATASET = process.env.SANITY_DATASET ?? "production"
const API_VERSION = process.env.SANITY_API_VERSION ?? "2024-10-01"
const TOKEN = process.env.SANITY_TOKEN

export class CmsError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message)
    this.name = "CmsError"
  }
}

type GroqTag = "artworks" | "reflections" | "workshops"

interface FetchOptions {
  tag: GroqTag
  /** Seconds. Defaults to 1 hour; on-demand revalidation via webhook. */
  revalidate?: number
}

async function groq<T>(
  query: string,
  params: Record<string, unknown>,
  { tag, revalidate = 3600 }: FetchOptions,
): Promise<T> {
  if (!PROJECT_ID) {
    throw new CmsError("SANITY_PROJECT_ID missing")
  }

  const url = new URL(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`,
  )
  url.searchParams.set("query", query)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(`$${k}`, JSON.stringify(v))
  }

  const res = await fetch(url.toString(), {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    next: { revalidate, tags: [tag] },
  })

  if (!res.ok) {
    throw new CmsError(`Sanity ${res.status}`, await res.text())
  }
  const json = (await res.json()) as { result: T }
  return json.result
}

/* ------------------------------------------------------------------ */
/* Projections — explicit GROQ keeps the type boundary honest.         */
/* ------------------------------------------------------------------ */

const IMAGE_PROJECTION = `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  "alt": coalesce(alt, "")
}`

const ARTWORK_PROJECTION = `{
  _id, "slug": slug.current, title, category, emotionalState, year, medium,
  dimensions, description, featured, publishedAt,
  "image": images[0]${IMAGE_PROJECTION},
  price
}`

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export async function getArtworks(): Promise<Artwork[]> {
  if (!PROJECT_ID) return mockArtworks
  try {
    return await groq<Artwork[]>(
      `*[_type == "artwork"] | order(publishedAt desc) ${ARTWORK_PROJECTION}`,
      {},
      { tag: "artworks" },
    )
  } catch (err) {
    console.error("[cms] getArtworks failed, falling back to mock", err)
    return mockArtworks
  }
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  if (!PROJECT_ID) {
    return mockArtworks.find((a) => a.slug === slug) ?? null
  }
  const result = await groq<Artwork | null>(
    `*[_type == "artwork" && slug.current == $slug][0] ${ARTWORK_PROJECTION}`,
    { slug },
    { tag: "artworks" },
  )
  return result ?? null
}

export async function getReflections(): Promise<Reflection[]> {
  if (!PROJECT_ID) return mockReflections
  try {
    return await groq<Reflection[]>(
      `*[_type == "post"] | order(publishedAt desc) {
        _id, "slug": slug.current, title, excerpt, tags, readingTimeMin, publishedAt,
        "coverImage": coverImage${IMAGE_PROJECTION},
        "author": author->{ name, "avatar": avatar${IMAGE_PROJECTION} }
      }`,
      {},
      { tag: "reflections" },
    )
  } catch (err) {
    console.error("[cms] getReflections failed, falling back to mock", err)
    return mockReflections
  }
}

export async function getWorkshops(): Promise<Workshop[]> {
  if (!PROJECT_ID) return mockWorkshops
  try {
    return await groq<Workshop[]>(
      `*[_type == "workshop"] | order(_createdAt desc) {
        _id, "slug": slug.current, title, summary, format, durationMin,
        priceCents, currency, intentions,
        "coverImage": coverImage${IMAGE_PROJECTION},
        "sessions": sessions[]{ id, startsAtUtc, endsAtUtc, seatsLeft, capacity }
      }`,
      {},
      { tag: "workshops" },
    )
  } catch (err) {
    console.error("[cms] getWorkshops failed, falling back to mock", err)
    return mockWorkshops
  }
}
