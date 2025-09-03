"use client"

import { motion } from "framer-motion"
import { Shield, Wifi, AlertTriangle, Zap, RefreshCw, Radio } from "lucide-react"

export default function AttackDefenseMapping() {
  const attackDefensePairs = [
    {
      attack: "Deauth Attack",
      defense: "Block Packets",
      icon: Wifi,
      color: "from-red-500 to-orange-500",
      description: "Disconnects clients → Block malicious packets",
    },
    {
      attack: "Evil Twin",
      defense: "Deauth Rogue AP",
      icon: AlertTriangle,
      color: "from-purple-500 to-pink-500",
      description: "Fake access point → Deauth the imposter",
    },
    {
      attack: "Rogue AP",
      defense: "Deauth Unauthorized",
      icon: Radio,
      color: "from-yellow-500 to-red-500",
      description: "Unauthorized AP → Deauth rogue device",
    },
    {
      attack: "KRACK",
      defense: "Block Exploit",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      description: "Key reinstallation → Block exploit packets",
    },
    {
      attack: "Re-Association",
      defense: "Block Requests",
      icon: RefreshCw,
      color: "from-green-500 to-teal-500",
      description: "Forced reconnection → Block malicious requests",
    },
    {
      attack: "SSDP Flood",
      defense: "Block Traffic",
      icon: Shield,
      color: "from-indigo-500 to-purple-500",
      description: "Service discovery flood → Block SSDP traffic",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-6">
      {attackDefensePairs.map((pair, index) => {
        const Icon = pair.icon
        return (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`bg-gradient-to-r ${pair.color} p-0.5 rounded-xl`}>
              <div className="bg-gray-900 rounded-xl p-4 h-full">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon className="w-6 h-6 text-white" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{pair.attack}</h3>
                    <p className="text-xs text-gray-300">↓</p>
                    <h4 className="font-medium text-cyan-400 text-sm">{pair.defense}</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-400">{pair.description}</p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
