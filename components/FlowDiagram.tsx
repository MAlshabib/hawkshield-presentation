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
      {title && <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-cyan-400 text-center break-words">{title}</h3>}
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center w-full md:w-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-4 sm:p-6 rounded-lg border-2 ${step.color} bg-slate-900/50 sm:backdrop-blur-sm w-full md:min-w-[200px] min-w-0`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 sm:mb-3 p-2 sm:p-3 rounded-full bg-cyan-500/20">{step.icon}</div>
                <h4 className="font-semibold text-cyan-300 mb-1 sm:mb-2 text-sm sm:text-base break-words">{step.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 break-words">{step.description}</p>
              </div>
            </motion.div>

            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 0.5) * 0.2 }}
                className="mx-2 sm:mx-4 hidden md:block"
              >
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
