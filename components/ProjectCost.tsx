"use client"

import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"

interface BOMRow {
  component: string
  spec: string
  price: number
}

const BOM: BOMRow[] = [
  { component: "Raspberry Pi 4 Model B (4GB)", spec: "Edge compute unit", price: 370 },
  { component: "ALFA AWUS036ACH Wi-Fi Adapter", spec: "Monitor + Injection, USB 3.0", price: 250 },
]

const total = BOM.reduce((sum, r) => sum + r.price, 0)
const fmt = (n: number) => `SAR ${n.toLocaleString("en-US")}`

export default function ProjectCost() {
  return (
    <div className="mx-auto max-w-3xl px-1 sm:px-4 pb-10 space-y-5 sm:space-y-6">
      {/* Headline card */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-cyan-500/30 bg-slate-900/40 px-6 sm:px-10 py-4 sm:py-5 text-center"
        >
          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10">
            <DollarSign className="h-4 w-4 text-cyan-300" />
          </div>
          <div className="text-xs sm:text-sm text-slate-300">Total Hardware Cost</div>
          <div className="mt-1 text-2xl sm:text-3xl font-semibold text-cyan-400">{fmt(total)}</div>
          <div className="mt-1 text-[10px] sm:text-xs text-slate-400">per unit</div>
        </motion.div>
      </div>

      {/* BOM Table */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-cyan-400 text-center">
          Hardware Bill of Materials
        </h3>
        <div className="overflow-hidden rounded-lg border border-cyan-500/30 bg-slate-900/50">
          <table className="min-w-full w-full text-sm">
            <thead className="bg-cyan-500/20">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-cyan-300 border-r border-cyan-500/30">Component</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-cyan-300 border-r border-cyan-500/30">Spec</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-right font-semibold text-cyan-300">Price (SAR)</th>
              </tr>
            </thead>
            <tbody>
              {BOM.map((row, idx) => (
                <motion.tr
                  key={row.component}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="border-t border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
                >
                  <td className="px-3 sm:px-4 py-2 text-slate-200 border-r border-cyan-500/20 break-words">{row.component}</td>
                  <td className="px-3 sm:px-4 py-2 text-slate-400 border-r border-cyan-500/20 break-words">{row.spec}</td>
                  <td className="px-3 sm:px-4 py-2 text-right text-cyan-300 font-medium">{row.price}</td>
                </motion.tr>
              ))}
              <tr className="border-t border-cyan-500/30 bg-cyan-500/10">
                <td colSpan={2} className="px-3 sm:px-4 py-2.5 text-right font-bold text-cyan-300">Total</td>
                <td className="px-3 sm:px-4 py-2.5 text-right font-bold text-cyan-300">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-[11px] sm:text-xs text-slate-400 text-center">
          ML models are already trained — this covers only the two hardware components used in the prototype.
          Prices reflect Saudi retail market rates (2026 estimate).
        </div>
      </div>
    </div>
  )
}
