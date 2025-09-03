"use client"

import { motion } from "framer-motion"
import { Database, Scale, Tag, Filter, ArrowRight } from "lucide-react"

export default function PreprocessingSteps() {
  const steps = [
    {
      icon: Database,
      title: "Numeric Imputation + Scaling",
      description: "Fill missing values and normalize ranges",
      color: "text-blue-400",
    },
    {
      icon: Tag,
      title: "Categorical Encoding",
      description: "Convert categories with 'NA' for unknowns",
      color: "text-green-400",
    },
    {
      icon: Scale,
      title: "Feature Order Enforcement",
      description: "Consistent ordering for micro-batches",
      color: "text-yellow-400",
    },
    {
      icon: Filter,
      title: "Identifier Filtering",
      description: "Remove MAC/SSID for better generalization",
      color: "text-purple-400",
    },
  ]

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const Icon = step.icon
        return (
          <div key={index} className="flex items-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="w-20 h-20 bg-gray-800/50 border border-cyan-400/30 rounded-xl flex items-center justify-center mb-2 hover:border-cyan-400/60 transition-all duration-300">
                <Icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <h3 className="text-sm font-medium text-gray-300 mb-1">{step.title}</h3>
              <p className="text-xs text-gray-500 max-w-24">{step.description}</p>
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                className="mx-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (index + 0.5) * 0.2 }}
              >
                <ArrowRight className="w-5 h-5 text-cyan-400" />
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}
