"use client"

/**
 * ============================================================================
 * WorkshopBooking — multi-step booking flow with timezone handling
 * ----------------------------------------------------------------------------
 * STATE MACHINE
 *
 *   selecting-session
 *        │ (session chosen)
 *        ▼
 *   filling-details
 *        │ (submit)
 *        ▼
 *   submitting ──(error)──▶ failed ──(retry)──▶ submitting
 *        │ (ok)
 *        ▼
 *   confirmed   (terminal — shows Zoom link + calendar ICS)
 *
 * DATA FLOW
 *   Props:
 *     - workshop: Workshop  (from CMS, sessions[] included)
 *   Events:
 *     - POST /api/booking  (payload: BookingRequest)
 *   API response:
 *     - BookingConfirmation { bookingId, zoomJoinUrl, startsAt, calendarIcsUrl }
 *
 * TIMEZONE
 *   - All session startsAtUtc values are UTC.
 *   - Display layer renders BOTH Europe/Vienna and Europe/Bucharest.
 *   - The attendee's detected IANA zone is submitted so the server can issue
 *     a correctly-localized ICS file and email.
 *
 * ERROR HANDLING
 *   - Network / non-2xx          → transition to `failed` with message.
 *   - Client-side validation     → inline field errors, no state transition.
 *   - Full-seat race             → server returns 409; UI shows "locul a fost
 *     rezervat între timp", returns to `selecting-session`.
 * ============================================================================
 */

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import type {
  BookingConfirmation,
  BookingRequest,
  Workshop,
  WorkshopSession,
} from "@/lib/types"
import {
  detectUserTimezone,
  formatInZone,
  formatTimeInZone,
  groupByDay,
  preferredZoneOrder,
} from "@/lib/timezone"

type Step =
  | { name: "selecting-session" }
  | { name: "filling-details"; session: WorkshopSession }
  | { name: "submitting"; session: WorkshopSession }
  | { name: "failed"; session: WorkshopSession; message: string }
  | { name: "confirmed"; confirmation: BookingConfirmation }

type Props = { workshop: Workshop }

export function WorkshopBooking({ workshop }: Props) {
  const [step, setStep] = useState<Step>({ name: "selecting-session" })
  const [userTz, setUserTz] = useState<string>("Europe/Bucharest")

  useEffect(() => {
    setUserTz(detectUserTimezone())
  }, [])

  const order = preferredZoneOrder(userTz)

  return (
    <section
      aria-labelledby="booking-title"
      className="border-t border-border pt-16"
    >
      <header className="flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
          Rezervare
        </span>
        <h2
          id="booking-title"
          className="font-display text-4xl font-light leading-tight text-foreground text-balance md:text-5xl"
        >
          Rezervă-ți locul
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Orele sunt afișate în fusul tău orar — și, în paralel, în fusul orar
          al atelierului (Viena). Confirmarea și linkul Zoom ajung la tine pe
          e-mail imediat după rezervare.
        </p>
      </header>

      <div className="mt-16">
        <AnimatePresence mode="wait">
          {step.name === "selecting-session" && (
            <StepMotion key="select">
              <SessionPicker
                workshop={workshop}
                zones={order}
                onChoose={(session) =>
                  setStep({ name: "filling-details", session })
                }
              />
            </StepMotion>
          )}

          {step.name === "filling-details" && (
            <StepMotion key="details">
              <DetailsForm
                workshop={workshop}
                session={step.session}
                zones={order}
                userTimezone={userTz}
                onBack={() => setStep({ name: "selecting-session" })}
                onSubmit={async (payload) => {
                  setStep({ name: "submitting", session: step.session })
                  try {
                    const res = await fetch("/api/booking", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    })
                    if (!res.ok) {
                      const msg =
                        res.status === 409
                          ? "Locul a fost rezervat între timp. Alege o altă sesiune."
                          : "Nu am putut finaliza rezervarea. Încearcă din nou."
                      throw new Error(msg)
                    }
                    const confirmation =
                      (await res.json()) as BookingConfirmation
                    setStep({ name: "confirmed", confirmation })
                  } catch (err) {
                    setStep({
                      name: "failed",
                      session: step.session,
                      message:
                        err instanceof Error
                          ? err.message
                          : "Eroare necunoscută.",
                    })
                  }
                }}
              />
            </StepMotion>
          )}

          {step.name === "submitting" && (
            <StepMotion key="submitting">
              <SubmittingState />
            </StepMotion>
          )}

          {step.name === "failed" && (
            <StepMotion key="failed">
              <FailedState
                message={step.message}
                onRetry={() =>
                  setStep({ name: "filling-details", session: step.session })
                }
                onReset={() => setStep({ name: "selecting-session" })}
              />
            </StepMotion>
          )}

          {step.name === "confirmed" && (
            <StepMotion key="confirmed">
              <ConfirmedState confirmation={step.confirmation} zones={order} />
            </StepMotion>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function StepMotion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SessionPicker({
  workshop,
  zones,
  onChoose,
}: {
  workshop: Workshop
  zones: readonly ["vienna" | "bucharest", "vienna" | "bucharest"]
  onChoose: (s: WorkshopSession) => void
}) {
  const available = workshop.sessions.filter((s) => s.seatsLeft > 0)
  const grouped = useMemo(
    () => groupByDay(available, zones[0]),
    [available, zones],
  )

  if (available.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-display text-2xl font-light text-foreground">
          Toate locurile sunt ocupate momentan.
        </p>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
          Scrie-mi două rânduri și te anunț personal când deschidem următoarele
          sesiuni.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-12">
      {[...grouped.entries()].map(([day, sessions]) => (
        <div key={day} className="flex flex-col gap-6">
          <h3 className="font-display text-xl font-light capitalize text-foreground">
            {day}
          </h3>
          <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((s) => (
              <li key={s.id} className="bg-background">
                <button
                  type="button"
                  onClick={() => onChoose(s)}
                  className="flex w-full flex-col items-start gap-4 p-6 text-left transition-colors hover:bg-surface focus:outline-none focus-visible:bg-surface md:p-8"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    {s.seatsLeft} / {s.capacity} locuri libere
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="font-display text-3xl font-light leading-none text-foreground">
                      {formatTimeInZone(s.startsAtUtc, zones[0])}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {zones[0] === "vienna" ? "Viena" : "București"}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 font-mono text-[11px] text-muted-foreground">
                    <span>
                      {formatTimeInZone(s.startsAtUtc, zones[1])}
                    </span>
                    <span className="uppercase tracking-[0.18em] text-muted-foreground/70">
                      {zones[1] === "vienna" ? "Viena" : "București"}
                    </span>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-foreground">
                    <span className="h-px w-6 bg-accent" aria-hidden />
                    Alege
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function DetailsForm({
  workshop,
  session,
  zones,
  userTimezone,
  onBack,
  onSubmit,
}: {
  workshop: Workshop
  session: WorkshopSession
  zones: readonly ["vienna" | "bucharest", "vienna" | "bucharest"]
  userTimezone: string
  onBack: () => void
  onSubmit: (payload: BookingRequest) => void | Promise<void>
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [intention, setIntention] = useState("")
  const [errors, setErrors] = useState<Partial<Record<"name" | "email", string>>>(
    {},
  )

  const validate = (): boolean => {
    const next: typeof errors = {}
    if (name.trim().length < 2) next.name = "Te rog introdu numele tău."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Adresa de e-mail nu pare validă."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      <aside className="flex flex-col gap-6 border-l border-accent pl-8 lg:col-span-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
          Sesiunea aleasă
        </span>
        <h3 className="font-display text-2xl font-light leading-tight text-foreground">
          {workshop.title}
        </h3>
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {zones[0] === "vienna" ? "Viena" : "București"}
            </dt>
            <dd className="text-foreground">
              {formatInZone(session.startsAtUtc, zones[0])}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {zones[1] === "vienna" ? "Viena" : "București"}
            </dt>
            <dd className="text-muted-foreground">
              {formatInZone(session.startsAtUtc, zones[1])}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Durată
            </dt>
            <dd className="text-foreground">{workshop.durationMin} minute</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Contribuție
            </dt>
            <dd className="text-foreground">
              {(workshop.priceCents / 100).toFixed(0)} {workshop.currency}
            </dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 text-left font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          ← Alege altă sesiune
        </button>
      </aside>

      <form
        className="flex flex-col gap-8 lg:col-span-8"
        onSubmit={(e) => {
          e.preventDefault()
          if (!validate()) return
          onSubmit({
            workshopSlug: workshop.slug,
            sessionId: session.id,
            attendee: {
              name: name.trim(),
              email: email.trim(),
              intention: intention.trim() || undefined,
            },
            timezone: userTimezone,
          })
        }}
      >
        <Field
          label="Nume"
          htmlFor="b-name"
          error={errors.name}
          hint="Cum preferi să îți spun în cerc."
        >
          <input
            id="b-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="h-12 w-full border-b border-border bg-transparent px-0 font-sans text-base text-foreground outline-none transition-colors focus:border-accent"
          />
        </Field>

        <Field
          label="E-mail"
          htmlFor="b-email"
          error={errors.email}
          hint="Aici trimit linkul Zoom și confirmarea."
        >
          <input
            id="b-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
            className="h-12 w-full border-b border-border bg-transparent px-0 font-sans text-base text-foreground outline-none transition-colors focus:border-accent"
          />
        </Field>

        <Field
          label="Intenție (opțional)"
          htmlFor="b-intent"
          hint="Un rând despre ce aduci în cerc. Rămâne între noi."
        >
          <textarea
            id="b-intent"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            rows={3}
            className="w-full resize-none border-b border-border bg-transparent px-0 py-3 font-sans text-base text-foreground outline-none transition-colors focus:border-accent"
          />
        </Field>

        <div className="flex flex-wrap items-center gap-6 pt-4">
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center bg-foreground px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent hover:text-foreground"
          >
            Confirmă rezervarea
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Fusul tău: {userTimezone}
          </p>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

function SubmittingState() {
  return (
    <div className="flex items-center gap-4 py-16">
      <div className="h-px w-12 animate-pulse bg-accent" aria-hidden />
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-foreground">
        Confirmăm rezervarea…
      </p>
    </div>
  )
}

function FailedState({
  message,
  onRetry,
  onReset,
}: {
  message: string
  onRetry: () => void
  onReset: () => void
}) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-6 border-l border-accent py-8 pl-8"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
        Ceva nu a funcționat
      </span>
      <p className="font-display text-2xl font-light text-foreground text-balance">
        {message}
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-12 items-center justify-center bg-foreground px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent hover:text-foreground"
        >
          Încearcă din nou
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-12 items-center justify-center border border-foreground bg-transparent px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Alege altă sesiune
        </button>
      </div>
    </div>
  )
}

function ConfirmedState({
  confirmation,
  zones,
}: {
  confirmation: BookingConfirmation
  zones: readonly ["vienna" | "bucharest", "vienna" | "bucharest"]
}) {
  return (
    <div className="flex flex-col gap-8 border-l border-accent py-8 pl-8">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
        Rezervare confirmată
      </span>
      <h3 className="font-display text-4xl font-light leading-tight text-foreground text-balance md:text-5xl">
        Te aștept în cerc.
      </h3>
      <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
        Ți-am trimis confirmarea și linkul Zoom pe e-mail. Dacă nu îl găsești în
        30 de minute, verifică folderul de spam sau scrie-mi personal.
      </p>

      <dl className="flex flex-col gap-4 border-t border-border pt-8 text-sm">
        <div className="flex flex-col gap-1">
          <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {zones[0] === "vienna" ? "Viena" : "București"}
          </dt>
          <dd className="text-foreground">
            {formatInZone(confirmation.startsAt, zones[0])}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {zones[1] === "vienna" ? "Viena" : "București"}
          </dt>
          <dd className="text-muted-foreground">
            {formatInZone(confirmation.startsAt, zones[1])}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-4 pt-4">
        <a
          href={confirmation.zoomJoinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center bg-foreground px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent hover:text-foreground"
        >
          Deschide linkul Zoom
        </a>
        <a
          href={confirmation.calendarIcsUrl}
          className="inline-flex h-12 items-center justify-center border border-foreground bg-transparent px-8 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Adaugă în calendar
        </a>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        ID rezervare · {confirmation.bookingId}
      </p>
    </div>
  )
}
