"use client"

import { motion } from "framer-motion"
import { Code, Database, Brain, FileText, Cpu } from "lucide-react"

const teamMembers = [
  {
    name: "Ghala",
    role: "Binary Model + Frontend",
    icon: Brain,
    color: "border-pink-500/50 hover:border-pink-400",
    bgColor: "hover:bg-pink-500/10",
  },
  {
    name: "Mohammed",
    role: "Data + Live Detection + Backend + Defense",
    icon: Database,
    color: "border-blue-500/50 hover:border-blue-400",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    name: "Yaser",
    role: "Multi-class Model",
    icon: Code,
    color: "border-green-500/50 hover:border-green-400",
    bgColor: "hover:bg-green-500/10",
  },
  {
    name: "Lina",
    role: "Integration + 3D Prototype Case",
    icon: Cpu,
    color: "border-purple-500/50 hover:border-purple-400",
    bgColor: "hover:bg-purple-500/10",
  },
  {
    name: "Haya",
    role: "RAG + Documentation",
    icon: FileText,
    color: "border-cyan-500/50 hover:border-cyan-400",
    bgColor: "hover:bg-cyan-500/10",
  },
]

export default function TeamCards() {
  return (
    <div className="w-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-cyan-400 text-center">Team & Roles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`p-4 sm:p-6 rounded-lg border-2 ${member.color} ${member.bgColor} bg-slate-900/50 transition-all duration-300 cursor-pointer min-w-0`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-full bg-slate-800/50">
                <member.icon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
              </div>
              <h4 className="font-bold text-base sm:text-lg text-cyan-300 mb-1 sm:mb-2 break-words">{member.name}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-words">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
