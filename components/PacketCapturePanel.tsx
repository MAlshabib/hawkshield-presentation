"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Database, GitBranch, Layers, ShieldCheck, FileSpreadsheet } from "lucide-react"

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const dur = 800
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setDisplay(Math.round(value * (0.2 + 0.8 * p)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  delay = 0,
}: {
  icon: any
  label: string
  value: React.ReactNode
  sub?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { delay } }}
      className="rounded-xl border border-cyan-500/30 bg-slate-900/40 p-5"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-cyan-500/40 bg-cyan-400/10 p-2">
          <Icon className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="text-sm text-slate-300">{label}</div>
      </div>
      <div className="mt-2 text-3xl font-semibold text-cyan-300">{value}</div>
      {sub ? <div className="mt-1 text-xs text-slate-400">{sub}</div> : null}
    </motion.div>
  )
}

function StackedBar({
  leftPct,
  leftLabel,
  rightLabel,
}: {
  leftPct: number
  leftLabel: string
  rightLabel: string
}) {
  const rightPct = Math.max(0, 100 - leftPct)
  return (
    <div className="rounded-xl border border-cyan-500/20 bg-slate-900/30 p-5">
      <div className="mb-2 text-sm font-medium text-cyan-200">Class Balance</div>
      <div className="h-6 w-full overflow-hidden rounded-md bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${leftPct}%` }}
          transition={{ duration: 0.8 }}
          className="h-full bg-cyan-400/70"
          title={`${leftLabel} ~${leftPct}%`}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-300">
        <span>
          <span className="text-cyan-300">{leftLabel}</span> ~{leftPct}%
        </span>
        <span>
          <span className="text-slate-300">{rightLabel}</span> ~{rightPct}%
        </span>
      </div>
    </div>
  )
}

export default function PacketCapturePanel() {
  // Class balance constants
  const NORMAL_PCT = 0.85; // 85% normal
  const ATTACK_PCT = 1 - NORMAL_PCT; // 15% attack

  // 🔢 نفس الأرقام التي كنتِ تعرضينها
  const total = 50000
  const attackTypes = 6
  const features = 255

  // توازن (85% Normal / 15% Attack)
  const normalPct = Math.round(NORMAL_PCT * 100)

  const chips = useMemo(
    () => [
      { k: "Environment", v: "Isolated router (safe lab)" },
      { k: "Collection", v: "Self-collected" },
      { k: "Format", v: "CSV feature dumps" },
      { k: "Identifiers", v: "MAC/SSID filtered out" },
    ],
    []
  )

  return (
    <div className="space-y-8">
      {/* بطاقات الأرقام */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Database}
          label="Total Samples"
          value={
            <span className="tabular-nums">
              ~<AnimatedNumber value={total} />
            </span>
          }
          sub="~85% Normal / ~15% Attack"
          delay={0.0}
        />
        <StatCard
          icon={ShieldCheck}
          label="Attack Types"
          value={<AnimatedNumber value={attackTypes} />}
          sub="Deauth, Evil Twin, Rogue AP, KRACK, Re-Assoc, SSDP"
          delay={0.05}
        />
        <StatCard
          icon={Layers}
          label="Features"
          value={
            <span className="tabular-nums">
              ~<AnimatedNumber value={features} />
            </span>
          }
          sub="Behavioral + timing + radio stats"
          delay={0.1}
        />
        <StatCard
          icon={FileSpreadsheet}
          label="Dataset"
          value={"CSV"}
          sub="Ready for ML training"
          delay={0.15}
        />
      </div>

      {/* شريط مكدّس يوضح التوازن */}
      <StackedBar leftPct={normalPct} leftLabel="Normal" rightLabel="Attack" />

      {/* Key Facts chips */}
      <div className="rounded-xl border border-cyan-500/20 bg-slate-900/30 p-4">
        <div className="mb-2 text-sm font-medium text-cyan-200">Key Facts</div>
        <div className="flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <motion.span
              key={c.k}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.25 }}
              className="rounded-full border border-cyan-500/30 bg-cyan-400/10 px-3 py-1 text-xs text-slate-200"
              title={`${c.k}: ${c.v}`}
            >
              <span className="text-cyan-300">{c.k}</span>
              <span className="mx-1 opacity-60">•</span>
              {c.v}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400">
        Tip: numbers animate once to highlight scale; class balance bar reflects relative proportions.
      </div>
    </div>
  )
}