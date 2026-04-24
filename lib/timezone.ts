/**
 * ============================================================================
 * Timezone helpers — Vienna / Bucharest dual display.
 * ----------------------------------------------------------------------------
 * All stored times are UTC ISO strings. Display formatting uses the built-in
 * Intl.DateTimeFormat with IANA zones, so DST is handled correctly.
 * ============================================================================
 */

export const TIMEZONES = {
  vienna: "Europe/Vienna",
  bucharest: "Europe/Bucharest",
} as const

export type DisplayZone = keyof typeof TIMEZONES

/** Format an ISO UTC timestamp for a specific IANA zone, in Romanian. */
export function formatInZone(
  isoUtc: string,
  zone: DisplayZone,
  opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  },
): string {
  return new Intl.DateTimeFormat("ro-RO", {
    ...opts,
    timeZone: TIMEZONES[zone],
  }).format(new Date(isoUtc))
}

/** Short time-only formatter, used for compact session chips. */
export function formatTimeInZone(isoUtc: string, zone: DisplayZone): string {
  return new Intl.DateTimeFormat("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIMEZONES[zone],
  }).format(new Date(isoUtc))
}

/** Detect the user's IANA timezone safely (SSR-safe with fallback). */
export function detectUserTimezone(): string {
  if (typeof Intl === "undefined") return "Europe/Bucharest"
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Bucharest"
  } catch {
    return "Europe/Bucharest"
  }
}

/**
 * Rough mapping: if the user is in RO → show Bucharest first, else Vienna first.
 * Returns ordered pair for dual display.
 */
export function preferredZoneOrder(
  userZone: string,
): readonly [DisplayZone, DisplayZone] {
  if (userZone === TIMEZONES.bucharest) return ["bucharest", "vienna"]
  return ["vienna", "bucharest"]
}

/** Group ISO timestamps by day (in a given zone) for calendar-style rendering. */
export function groupByDay<T extends { startsAtUtc: string }>(
  items: T[],
  zone: DisplayZone,
): Map<string, T[]> {
  const fmt = new Intl.DateTimeFormat("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TIMEZONES[zone],
  })
  const groups = new Map<string, T[]>()
  for (const item of items) {
    const key = fmt.format(new Date(item.startsAtUtc))
    const arr = groups.get(key) ?? []
    arr.push(item)
    groups.set(key, arr)
  }
  return groups
}
