"use client"

import { motion } from "framer-motion"
import {
  ShieldAlert, Zap, Bug, WifiOff, LockKeyhole, EyeOff, BellMinus, Brain, Wrench
} from "lucide-react"

const chip =
  "rounded-full border border-cyan-500/30 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-colors"

const item = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.12 + i * 0.08, duration: 0.22 },
  }),
}

export default function ProblemStatement() {
  const attacks = [
    "Deauth", "Evil Twin", "Rogue AP", "KRACK", "Re-Assoc", "SSDP/DoS"
  ]

  return (
    <div className="relative mx-auto max-w-5xl px-4 pt-2 pb-10">
      {/* subtle aura */}
      <div className="pointer-events-none absolute -inset-24 -z-10 rounded-full
                      bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_60%)]" />

      {/* Attack surface chips */}
      <motion.div
        initial="hidden" animate="show"
        className="mb-6 flex flex-wrap justify-center gap-2"
      >
        {attacks.map((a, i) => (
          <motion.span key={a} variants={item} custom={i} className={chip}>
            {a}
          </motion.span>
        ))}
      </motion.div>

      {/* Impact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-500/25 bg-slate-900/40 px-4 py-4"
        >
          <div className="flex items-center gap-2 text-cyan-300 mb-1">
            <WifiOff className="h-4 w-4" /> Availability
          </div>
          <div className="text-sm text-slate-300">Service disruption, disconnections, DoS.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-500/25 bg-slate-900/40 px-4 py-4"
        >
          <div className="flex items-center gap-2 text-cyan-300 mb-1">
            <LockKeyhole className="h-4 w-4" /> Confidentiality
          </div>
          <div className="text-sm text-slate-300">Data theft via rogue AP / man-in-the-middle.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-500/25 bg-slate-900/40 px-4 py-4"
        >
          <div className="flex items-center gap-2 text-cyan-300 mb-1">
            <Bug className="h-4 w-4" /> Integrity
          </div>
          <div className="text-sm text-slate-300">Session hijack, malicious config changes.</div>
        </motion.div>
      </div>

      {/* Why static rules fail */}
      <div className="rounded-xl border border-cyan-500/20 bg-slate-900/30 p-4">
        <div className="mb-2 flex items-center gap-2 text-cyan-300 font-semibold">
          <ShieldAlert className="h-4 w-4" /> Why static, rule-based IDS struggles
        </div>
        <ul className="space-y-2 text-[15px] leading-relaxed text-slate-200">
          <li className="flex items-start gap-2">
            <EyeOff className="mt-0.5 h-4 w-4 text-cyan-300" />
            Evasive attacks mutate packet patterns and bypass hand-crafted rules.
          </li>
          <li className="flex items-start gap-2">
            <BellMinus className="mt-0.5 h-4 w-4 text-cyan-300" />
            High false positives in busy environments → alert fatigue for admins.
          </li>
          <li className="flex items-start gap-2">
            <Wrench className="mt-0.5 h-4 w-4 text-cyan-300" />
            Rules are brittle & expensive to maintain across vendors and firmware.
          </li>
          <li className="flex items-start gap-2">
            <Brain className="mt-0.5 h-4 w-4 text-cyan-300" />
            No learning of “normal” behavior → poor detection of novel attacks.
          </li>
        </ul>
      </div>

      {/* One-line takeaway */}
      <div className="mt-6 rounded-lg border border-cyan-500/20 bg-gradient-to-r
                      from-cyan-400/10 to-blue-500/10 px-4 py-3 text-sm text-slate-200">
        We need an adaptive, ML-driven IPS that runs on-device and detects anomalies in <span className="text-cyan-300 font-medium">sub-second</span>.
      </div>
    </div>
  )
}