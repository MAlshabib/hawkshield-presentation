"use client"

import { motion } from "framer-motion"
import { Gauge, BellOff, PlugZap, ShieldCheck, Zap } from "lucide-react"

const card =
  "rounded-xl border border-cyan-500/30 bg-slate-900/40 px-5 py-4 text-center"

function StatCard({
  icon: Icon,
  title,
  value,
  sub,
  i = 0,
}: {
  icon: any
  title: string
  value: string
  sub?: string
  i?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * i, duration: 0.25 }}
      className={card}
    >
      <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10">
        <Icon className="h-4 w-4 text-cyan-300" />
      </div>
      <div className="text-sm text-slate-300">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-cyan-400">{value}</div>
      {sub ? <div className="mt-1 text-xs text-slate-400">{sub}</div> : null}
    </motion.div>
  )
}

export default function ImpactValue() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-14">
      {/* Headline metric cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatCard i={0} icon={Gauge}     title="Detection Time" value="< 1s" sub="Automated" />
        <StatCard i={1} icon={BellOff}   title="False Positives" value="< 2%" sub="after tuning" />
        <StatCard i={2} icon={PlugZap}   title="Downtime" value="Minimal" sub="~95% reduction" />
        <StatCard i={3} icon={ShieldCheck} title="Coverage" value="6 types" sub="attack classes" />
        <StatCard i={4} icon={Zap}       title="Response" value="Real-time" sub="on-device" />
      </div>

      {/* Before / After table */}
      <div className="rounded-xl border border-cyan-500/20 bg-slate-900/30 p-4">
        <div className="mb-3 text-base font-semibold text-cyan-300">
          Impact & Value Metrics
        </div>
        <div className="overflow-hidden rounded-lg border border-cyan-500/10">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-slate-900/40 text-slate-300">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Metric</th>
                <th className="px-4 py-2 text-left font-medium">Current State</th>
                <th className="px-4 py-2 text-left font-medium">With HawkShield</th>
                <th className="px-4 py-2 text-left font-medium">Improvement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 text-slate-200">
              <tr>
                <td className="px-4 py-2">Detection Time</td>
                <td className="px-4 py-2">Manual (~hours)</td>
                <td className="px-4 py-2">Automated (&lt;1s)</td>
                <td className="px-4 py-2">99.9% faster</td>
              </tr>
              <tr>
                <td className="px-4 py-2">False Positives</td>
                <td className="px-4 py-2">High (~30%)</td>
                <td className="px-4 py-2">Low (&lt;2%)</td>
                <td className="px-4 py-2">93% reduction</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Network Downtime</td>
                <td className="px-4 py-2">Extended</td>
                <td className="px-4 py-2">Minimal</td>
                <td className="px-4 py-2">~95% reduction</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Security Coverage</td>
                <td className="px-4 py-2">Partial</td>
                <td className="px-4 py-2">Comprehensive</td>
                <td className="px-4 py-2">6× attack types</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Response Time</td>
                <td className="px-4 py-2">Delayed</td>
                <td className="px-4 py-2">Real-time</td>
                <td className="px-4 py-2">Immediate</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* footnote */}
        <div className="mt-3 text-xs text-slate-400">
          Notes: metrics reflect our tuned LightGBM on edge (Raspberry&nbsp;Pi) with on-device preprocessing.
        </div>
      </div>
    </div>
  )
}