"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface FlowStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

interface FlowDiagramProps {
  steps: FlowStep[]
  title?: string
}

export default function FlowDiagram({ steps, title }: FlowDiagramProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-xl font-semibold mb-6 text-cyan-400 text-center">{title}</h3>}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-6 rounded-lg border-2 ${step.color} bg-slate-900/50 backdrop-blur-sm min-w-[200px]`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 p-3 rounded-full bg-cyan-500/20">{step.icon}</div>
                <h4 className="font-semibold text-cyan-300 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400">{step.description}</p>
              </div>
            </motion.div>

            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 0.5) * 0.2 }}
                className="mx-4 hidden md:block"
              >
                <ArrowRight className="w-6 h-6 text-cyan-400" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
