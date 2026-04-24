/**
 * Motion tokens — strict spec from the Motion Design brief.
 * All animations site-wide MUST source from this file.
 *
 *   ease: Ease-Out-Expo   → cubic-bezier(0.19, 1, 0.22, 1)
 *   page-level durations  → 1.2s  (hero entrance, gallery layout, page-load curtain)
 *   micro-interactions    → 0.8s  (hover, underline extend, scrim reveals)
 */

export const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const

export const DURATION = {
  page: 1.2,
  micro: 0.8,
} as const

/** Shared Framer Motion transitions. */
export const T = {
  page: { duration: DURATION.page, ease: EASE_OUT_EXPO },
  micro: { duration: DURATION.micro, ease: EASE_OUT_EXPO },
} as const

/** will-change shorthand — use sparingly; lift to new layer only when animating. */
export const GPU = {
  transform: { willChange: "transform" },
  opacity: { willChange: "opacity" },
  both: { willChange: "opacity, transform" },
  filter: { willChange: "filter, transform" },
} as const
