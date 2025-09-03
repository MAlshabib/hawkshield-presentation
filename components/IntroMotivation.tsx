"use client"

import { motion } from "framer-motion"
import {
  Wifi, ShieldAlert, Zap, BrainCircuit, ChevronRight, BarChart3
} from "lucide-react"
import { useMemo } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

/* typing cursor */
const Cursor = () => (
  <span className="inline-block w-3 h-5 translate-y-[2px] bg-cyan-300/80 animate-pulse rounded-[2px] ml-1" />
)

export default function IntroMotivation() {
  const isMobile = useIsMobile()
  
  // stagger helpers
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.25 } }),
  }

  const bullets = useMemo(() => [
    {
      icon: Wifi,
      text: "Wi‑Fi is critical infrastructure (homes, campuses, hospitals, factories).",
    },
    {
      icon: Zap,
      text: "Attacks are cheap & automated: deauth, evil twin, rogue AP.",
    },
    {
      icon: ShieldAlert,
      text: "Rule‑based IDS misses novel or obfuscated attacks.",
    },
    {
      icon: BrainCircuit,
      text: "We need adaptive, intelligent, real‑time defense at the edge.",
    },
  ], [])

  return (
    <div className="relative mx-auto max-w-4xl px-4 pt-2 pb-10">
      {/* subtle aura */}
      <div className="pointer-events-none absolute -inset-20 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_60%)]" />

      {/* quick stats chips */}
      <motion.div
        initial="hidden" animate="show"
        className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {[
          { icon: Wifi, label: "Devices / home", value: "~25" },
          { icon: BarChart3, label: "Wi‑Fi probes/day (campus)", value: "1000s" },
          { icon: Zap, label: "Attack kit cost", value: "< $50" },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            variants={item}
            custom={i}
            className="flex items-center gap-3 rounded-xl border border-cyan-500/25 bg-slate-900/40 px-4 py-3"
          >
            <c.icon className="h-5 w-5 text-cyan-300" />
            <div className="text-sm text-slate-300">{c.label}</div>
            <div className="ml-auto text-cyan-200 font-semibold">{c.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* problem statement banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-6 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4"
      >
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-cyan-300 mt-0.5" />
          <p className="text-sm text-slate-200 leading-relaxed">
            Traditional rule‑based Wi‑Fi IDS struggles against adaptive adversaries. We propose a lightweight, ML‑driven IPS that learns normal behavior and flags anomalies in <span className="text-cyan-300 font-medium">sub‑second, on‑device</span>.
          </p>
        </div>
      </motion.div>

      {/* bullets (stagger) */}
      <ul className="mt-8 space-y-4">
        {bullets.map((b, i) => (
          <motion.li
            key={i}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            custom={i}
            className="flex items-start gap-3"
          >
            <div className="mt-1.5 h-2 w-2 rounded-full bg-cyan-400/80" />
            <div className="text-[15px] leading-relaxed text-slate-200 flex-1">
              <span className="inline-flex items-center gap-2">
                <b.icon className="h-[18px] w-[18px] text-cyan-300" />
                <span>{b.text}</span>
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}