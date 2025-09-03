import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Orbitron } from "next/font/google"
import "./globals.css"
import "@/styles/logo.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "HawkShield - Wi-Fi Intrusion Prevention System",
  description: "AI-powered real-time Wi-Fi defense presentation",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} antialiased`}>
      <body className="bg-gradient-to-br from-slate-900 to-slate-950 text-white min-h-screen">
        <div className="hs-logo-fixed" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
