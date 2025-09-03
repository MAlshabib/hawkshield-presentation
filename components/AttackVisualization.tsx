"use client"

import { motion } from "framer-motion"
import { Wifi, WifiOff, Shield, AlertTriangle } from "lucide-react"

const attackTypes = [
  { name: "Deauth", icon: WifiOff, color: "text-red-400", defense: "Block" },
  { name: "Evil Twin", icon: Wifi, color: "text-orange-400", defense: "Deauth" },
  { name: "Rogue AP", icon: AlertTriangle, color: "text-yellow-400", defense: "Deauth" },
  { name: "KRACK", icon: Shield, color: "text-purple-400", defense: "Block" },
  { name: "Re-Assoc", icon: Wifi, color: "text-pink-400", defense: "Block" },
  { name: "SSDP", icon: AlertTriangle, color: "text-indigo-400", defense: "Block" },
]

export default function AttackVisualization() {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-6 text-cyan-400 text-center">Attack → Defense Mapping</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attackTypes.map((attack, index) => (
          <motion.div
            key={attack.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-4 rounded-lg border border-cyan-500/30 bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <attack.icon className={`w-6 h-6 ${attack.color}`} />
                <span className="font-medium text-slate-300">{attack.name}</span>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="px-2 py-1 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-300"
              >
                {attack.defense}
              </motion.div>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
