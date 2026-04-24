import type { Metadata } from "next"
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NoiseOverlay } from "@/components/noise-overlay"
import { ShadowCurtain } from "@/components/shadow-curtain"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Studio — Picturi despre lumea interioară",
    template: "%s · Studio",
  },
  description:
    "Picturi în ulei și acrilic despre lumea interioară — umbră, simbol, prezență. Galerie, workshop-uri online și reflecții din atelier.",
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark" as const,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ro"
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ShadowCurtain />
        {children}
        <NoiseOverlay />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
