"use client"

import { motion } from "framer-motion"
import { Terminal, Zap, Shield, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function LiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)

  const demoSteps = [
    { text: "$ python live_detect.py", icon: Terminal },
    { text: "Loading models...", icon: Zap },
    { text: "Monitoring network traffic...", icon: Shield },
    { text: "⚠️  ATTACK DETECTED: Deauth Attack", icon: AlertCircle },
    { text: "Defense activated: Blocking malicious packets", icon: Shield },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-cyan-400 text-center">Live Detection Demo</h3>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black/80 rounded-lg border border-green-500/30 p-6 font-mono"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-slate-400 text-sm">HawkShield Terminal</span>
        </div>

        <div className="space-y-2">
          {demoSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.3,
                color: index === currentStep ? "#00ff88" : "#64748b",
              }}
              className="flex items-center gap-3"
            >
              <step.icon className="w-4 h-4" />
              <span className="text-sm">{step.text}</span>
              {index === currentStep && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  className="text-green-400"
                >
                  |
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
          className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm"
        >
          Detection Time: 0.8s | Confidence: 99.2% | Action: Block
        </motion.div>
      </motion.div>
    </div>
  )
}
