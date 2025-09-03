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
      <h3 className="text-xl font-semibold mb-6 text-cyan-400 text-center">Team & Roles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-lg border-2 ${member.color} ${member.bgColor} bg-slate-900/50 transition-all duration-300 cursor-pointer`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 rounded-full bg-slate-800/50">
                <member.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <h4 className="font-bold text-lg text-cyan-300 mb-2">{member.name}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
