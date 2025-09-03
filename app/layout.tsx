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
  description: "AI-powered real-time Wi-Fi defense system with machine learning-based threat detection and automated response. Experience the future of network security with 98%+ accuracy.",
  keywords: ["Wi-Fi security", "intrusion prevention", "AI", "machine learning", "network security", "cybersecurity", "HawkShield"],
  authors: [{ name: "HawkShield Team" }],
  creator: "HawkShield Team",
  publisher: "HawkShield",
  generator: 'Next.js',
  applicationName: "HawkShield Presentation",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  themeColor: "#22d3ee",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover'
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hawkshield.malshabib.dev",
    title: "HawkShield - AI-Powered Wi-Fi Intrusion Prevention System",
    description: "Revolutionary AI-powered real-time Wi-Fi defense system with machine learning-based threat detection and automated response. Protecting networks with 98%+ accuracy and <1s response time.",
    siteName: "HawkShield",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "HawkShield - Wi-Fi Intrusion Prevention System",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hawkshield",
    creator: "@malshabib",
    title: "HawkShield - AI-Powered Wi-Fi Security",
    description: "Revolutionary AI-powered Wi-Fi defense system with 98%+ accuracy and <1s response time. Experience the future of network security.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.jpg", type: "image/jpeg", sizes: "32x32" },
    ],
    apple: [
      { url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} antialiased`}>
      <head>
        {/* Enhanced PWA Support */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HawkShield" />
        <meta name="application-name" content="HawkShield" />
        
        {/* Theme and Browser UI */}
        <meta name="theme-color" content="#22d3ee" />
        <meta name="msapplication-TileColor" content="#1e293b" />
        <meta name="msapplication-navbutton-color" content="#22d3ee" />
        
        {/* Enhanced Security and Performance */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="true" />
        
        {/* Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "HawkShield",
              "description": "AI-powered real-time Wi-Fi Intrusion Prevention System",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "HawkShield Team"
              }
            })
          }}
        />
        
        {/* Preload critical images for faster loading */}
        <link rel="preload" href="/logo.jpg" as="image" type="image/jpeg" />
      </head>
      <body className="bg-gradient-to-br from-slate-900 to-slate-950 text-white min-h-screen touch-pan-y selection:bg-cyan-400/20 selection:text-cyan-300">
        <div className="hs-logo-fixed" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
