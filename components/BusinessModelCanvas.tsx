"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Users, DollarSign, Share2, Settings } from "lucide-react"

interface Column {
  icon: any
  title: string
  items: string[]
}

const columns: Column[] = [
  {
    icon: ShieldCheck,
    title: "Value Proposition",
    items: [
      "Real-time (<1s) threat detection",
      "Bilingual dashboard + Saqr AI agent",
      "Cheaper than commercial IDS/IPS",
      "On-device inference, no cloud dependency",
    ],
  },
  {
    icon: Users,
    title: "Target Customers",
    items: [
      "Universities & campuses",
      "Enterprises & SMEs",
      "Government / Smart Cities",
      "MSSPs & ISP partners",
    ],
  },
  {
    icon: DollarSign,
    title: "Revenue Streams",
    items: [
      "Hardware unit sales",
      "Annual software license",
      "Managed monitoring contracts",
      "Custom integration fees",
    ],
  },
  {
    icon: Share2,
    title: "Distribution Channels",
    items: [
      "Direct B2B sales",
      "System integrator partners",
      "Government tenders",
      "Telecom/ISP bundling",
    ],
  },
  {
    icon: Settings,
    title: "Cost Structure",
    items: [
      "Hardware & assembly",
      "ML/R&D engineering",
      "Cloud & API costs (Saqr)",
      "Support & maintenance",
    ],
  },
]

export default function BusinessModelCanvas() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 w-full">
      {columns.map((col, i) => (
        <motion.div
          key={col.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className="rounded-xl border border-cyan-500/30 bg-slate-900/40 overflow-hidden flex flex-col"
        >
          <div className="flex flex-col items-center gap-2 px-3 py-4 border-b border-cyan-500/20 bg-cyan-500/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15">
              <col.icon className="h-4 w-4 text-cyan-300" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-cyan-300 text-center break-words">
              {col.title}
            </h3>
          </div>
          <ul className="px-3 py-3 space-y-2 flex-1">
            {col.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span className="break-words">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}
