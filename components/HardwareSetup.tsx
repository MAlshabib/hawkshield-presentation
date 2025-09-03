"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Cpu, Wifi, Gauge, Battery, DollarSign, Cable, Activity
} from "lucide-react"

/* ---------------- SmartImage (fallbacks) ---------------- */
function SmartImage({
  candidates,
  alt,
  className,
  width = 560,
  height = 240, // ~ h-60
}: {
  candidates: string[]
  alt: string
  className?: string
  width?: number
  height?: number
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const src = candidates[currentIndex] || "/placeholder.svg"
  
  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-950/60 ${className || ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto sm:h-[240px] object-contain"
        priority
        sizes="(max-width: 768px) 100vw, 560px"
        onLoad={() => {
          setIsLoading(false)
          setHasError(false)
        }}
        onError={() => { 
          if (currentIndex < candidates.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setIsLoading(true)
          } else {
            setHasError(true)
            setIsLoading(false)
          }
        }}
      />
      {hasError && currentIndex >= candidates.length - 1 && (
        <div className="absolute inset-0 grid place-items-center text-xs text-slate-500 bg-slate-800/50">
          <div className="text-center">
            <div>Image not found</div>
            <div className="text-[10px] mt-1 opacity-70">{alt}</div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 grid place-items-center text-xs text-slate-400 bg-slate-800/30">
          Loading...
        </div>
      )}
    </div>
  )
}

/* ---------------- Small UI bits ---------------- */
function StatChip({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-slate-900/40 px-2 sm:px-3 py-2 min-w-0">
      <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-300 flex-shrink-0" />
      <div className="text-[10px] sm:text-xs text-slate-300 min-w-0 break-words">{label}</div>
      <div className="ml-auto text-xs sm:text-sm font-semibold text-cyan-200 flex-shrink-0">{value}</div>
    </div>
  )
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-xs sm:text-sm">
      <span className="text-slate-300 break-words min-w-0">{k}</span>
      <span className="text-slate-200 break-words ml-2 text-right">{v}</span>
    </div>
  )
}

/* ---------------- Main ---------------- */
export default function HardwareSetup() {
  // تبديل أرقام المقاييس بين Bench و Live
  const [mode, setMode] = useState<"bench" | "live">("bench")

  const latency = mode === "bench" ? "< 0.8s" : "< 1.0s"
  const power   = mode === "bench" ? "~6W"   : "~7.5W"
  const cost    = "Low-cost"

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 sm:pb-16 w-full">
      {/* العنوان + سويتش الوضع */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg sm:text-2xl font-semibold text-cyan-300 break-words">Hardware Setup</h2>
        <div className="inline-flex overflow-hidden rounded-lg border border-cyan-500/30">
          <button
            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm min-h-[40px] ${mode==="bench" ? "bg-cyan-400/15 text-cyan-300" : "text-slate-300 hover:bg-cyan-400/10"}`}
            onClick={() => setMode("bench")}
          >
            Bench
          </button>
          <button
            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm min-h-[40px] ${mode==="live" ? "bg-cyan-400/15 text-cyan-300" : "text-slate-300 hover:bg-cyan-400/10"}`}
            onClick={() => setMode("live")}
          >
            Live
          </button>
        </div>
      </div>

      {/* مقاييس سريعة */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatChip icon={Gauge}   label="Inference Latency" value={latency} />
        <StatChip icon={Battery} label="Power Draw"        value={power} />
        <StatChip icon={DollarSign} label="Cost"           value={cost} />
      </div>

      {/* بطاقتا الأجهزة + المخطط */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
        {/* Raspberry Pi */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-cyan-500/30 bg-slate-900/40 p-3 sm:p-4"
        >
          <div className="flex items-center gap-2 text-cyan-300 mb-3">
            <Cpu className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> <span className="font-semibold text-sm sm:text-base">Raspberry Pi (Edge)</span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-700/50 mb-4 bg-slate-900/50">
            <SmartImage
              candidates={[
                "/assets/raspberry-pi.png",
              ]}
              alt="Raspberry Pi"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <SpecRow k="CPU"     v="Quad-core (ARM)" />
            <SpecRow k="RAM"     v="2–4 GB" />
            <SpecRow k="OS"      v="Linux (32/64-bit)" />
            <SpecRow k="Runtime" v="Python + LightGBM (CPU)" />
            <SpecRow k="Case & Cooling" v="Passive case (optional fan)" />
          </div>
        </motion.div>

        {/* مخطط الاتصال */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          className="hidden lg:block"
        >
          <div className="relative h-52 w-32">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center gap-2">
                <Cable className="h-5 w-5 text-cyan-300" />
                <div className="h-40 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-500 animate-pulse" />
                <Wifi className="h-5 w-5 text-cyan-300" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alfa Adapter */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-cyan-500/30 bg-slate-900/40 p-4"
        >
          <div className="flex items-center gap-2 text-cyan-300 mb-3">
            <Wifi className="h-4 w-4" /> <span className="font-semibold">Alfa Wi-Fi Adapter</span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-700/50 mb-4 bg-slate-900/50">
            <SmartImage
              candidates={[
                "/assets/alfa-adapter.png",
              ]}
              alt="Alfa Wi-Fi Adapter"
            />
          </div>

          <div className="space-y-2">
            <SpecRow k="Chipset"     v="Realtek RTL8812AU (example)" />
            <SpecRow k="Modes"       v="Monitor + Injection" />
            <SpecRow k="Bands"       v="2.4 / 5 GHz" />
            <SpecRow k="Interface"   v="USB 3.0" />
          </div>
        </motion.div>
      </div>

      {/* مسار البيانات */}
      <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/40 p-4">
        <div className="flex items-center gap-2 text-cyan-300 mb-2">
          <Activity className="h-4 w-4" /> <span className="font-semibold">Data Path (on device)</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-lg border border-cyan-500/30 bg-slate-900/60 px-2.5 py-1">Adapter (Monitor)</span>
          <span className="text-cyan-400">→</span>
          <span className="rounded-lg border border-cyan-500/30 bg-slate-900/60 px-2.5 py-1">Capture</span>
          <span className="text-cyan-400">→</span>
          <span className="rounded-lg border border-cyan-500/30 bg-slate-900/60 px-2.5 py-1">Preprocess</span>
          <span className="text-cyan-400">→</span>
          <span className="rounded-lg border border-cyan-500/30 bg-slate-900/60 px-2.5 py-1">LightGBM Inference</span>
          <span className="text-cyan-400">→</span>
          <span className="rounded-lg border border-cyan-500/30 bg-slate-900/60 px-2.5 py-1">Defense Action</span>
          <span className="text-cyan-400">↺</span>
          <span className="rounded-lg border border-cyan-500/30 bg-slate-900/60 px-2.5 py-1">Continuous Monitor</span>
        </div>
        <div className="mt-2 text-xs text-slate-400">
          All on-device (no cloud): enables real‑time IPS with low power usage and minimal cost.
        </div>
      </div>
    </div>
  )
}