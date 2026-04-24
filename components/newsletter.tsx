"use client"

/**
 * Newsletter micro-form (Prompt 5).
 * - Borderless input, 1px bottom border only.
 * - Border opacity 30% → 100% on focus over 0.8s.
 * - On valid submit: input content cross-fades to a quiet success message.
 */

import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"

const ease = [0.22, 1, 0.36, 1] as const

type Status = "idle" | "sending" | "sent"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setStatus("sending")
    // Local-only demo; replace with /api/subscribe when wired.
    await new Promise((r) => setTimeout(r, 700))
    setStatus("sent")
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
        Scrisori rare din atelier
      </span>

      <div className="relative min-h-[56px]">
        <AnimatePresence mode="wait" initial={false}>
          {status !== "sent" ? (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease }}
              className="group flex items-center gap-4"
            >
              <input
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                placeholder="adresa ta de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "sending"}
                className="peer w-full border-0 border-b border-foreground/30 bg-transparent pb-3 pt-1 font-sans text-base text-foreground placeholder:text-foreground/30 transition-[border-color] duration-[800ms] ease-out focus:border-foreground focus:outline-none disabled:opacity-50"
                aria-label="Adresa ta de e-mail"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="shrink-0 font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 transition-colors duration-[800ms] ease-out hover:text-foreground disabled:opacity-50"
              >
                {status === "sending" ? "Trimit…" : "Trimite →"}
              </button>
            </motion.form>
          ) : (
            <motion.p
              key="sent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease }}
              className="border-b border-foreground pb-3 pt-1 font-display text-base italic text-foreground"
              role="status"
              aria-live="polite"
            >
              Îți mulțumesc. Îți scriu în curând.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
