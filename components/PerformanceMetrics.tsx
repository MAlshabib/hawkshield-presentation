"use client"

import { motion } from "framer-motion"

interface MetricProps {
  label: string
  value: string
  color: string
  delay: number
}

function Metric({ label, value, color, delay }: MetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`p-4 rounded-lg border-2 ${color} bg-slate-900/50 text-center`}
    >
      <div className="text-2xl font-bold text-cyan-300 mb-1">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </motion.div>
  )
}

export default function PerformanceMetrics() {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-6 text-cyan-400 text-center">Model Performance</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Metric label="Binary Accuracy" value="~98.5%" color="border-green-500/50" delay={0} />
        <Metric label="Multi-class Accuracy" value="99.8%" color="border-blue-500/50" delay={0.1} />
        <Metric label="Macro F1-Score" value="93.9%" color="border-purple-500/50" delay={0.2} />
        <Metric label="Detection Latency" value="<1s" color="border-cyan-500/50" delay={0.3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10"
      >
        <h4 className="font-semibold text-yellow-300 mb-2">Note on RogueAP Detection</h4>
        <p className="text-sm text-slate-300">
          RogueAP shows lower F1-score (~0.70) due to limited training samples. Future work includes expanding this
          dataset for improved detection.
        </p>
      </motion.div>
    </div>
  )
}
