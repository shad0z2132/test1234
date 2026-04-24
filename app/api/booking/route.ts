/**
 * ============================================================================
 * POST /api/booking
 * ----------------------------------------------------------------------------
 * Creates a workshop booking and a Zoom meeting.
 *
 * Production wiring (pseudocode):
 *   1. Validate BookingRequest with zod.
 *   2. Transaction (Postgres):
 *        SELECT seats_left FROM workshop_sessions WHERE id = $1 FOR UPDATE;
 *        if seats_left = 0 → 409 Conflict
 *        UPDATE workshop_sessions SET seats_left = seats_left - 1 WHERE id = $1;
 *        INSERT INTO bookings (...) RETURNING id;
 *   3. Zoom Server-to-Server OAuth:
 *        POST https://api.zoom.us/v2/users/{userId}/meetings
 *        body: { topic, type: 2, start_time, duration, timezone, settings: {...} }
 *   4. Send confirmation email (Resend) with ICS attachment in attendee's TZ.
 *   5. Return BookingConfirmation.
 *
 * This demo stub returns a deterministic fake confirmation so the preview works.
 * ============================================================================
 */

import { NextResponse } from "next/server"
import type { BookingConfirmation, BookingRequest } from "@/lib/types"
import { mockWorkshops } from "@/lib/mock-data"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: BookingRequest
  try {
    payload = (await request.json()) as BookingRequest
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  if (
    !payload.workshopSlug ||
    !payload.sessionId ||
    !payload.attendee?.email ||
    !payload.attendee?.name
  ) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  const workshop = mockWorkshops.find((w) => w.slug === payload.workshopSlug)
  const session = workshop?.sessions.find((s) => s.id === payload.sessionId)

  if (!workshop || !session) {
    return NextResponse.json({ error: "not_found" }, { status: 404 })
  }
  if (session.seatsLeft <= 0) {
    return NextResponse.json({ error: "sold_out" }, { status: 409 })
  }

  // Simulated latency so the submitting state is visible.
  await new Promise((r) => setTimeout(r, 900))

  const bookingId = `bk_${Math.random().toString(36).slice(2, 10)}`

  const confirmation: BookingConfirmation = {
    bookingId,
    zoomJoinUrl: `https://zoom.us/j/${Math.floor(Math.random() * 9e9 + 1e9)}?pwd=demo`,
    startsAt: session.startsAtUtc,
    calendarIcsUrl: `/api/ics/${bookingId}`,
  }

  return NextResponse.json(confirmation, { status: 200 })
}
