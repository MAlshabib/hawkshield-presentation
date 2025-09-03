"use client"

import { motion } from "framer-motion"
import { Lightbulb, FolderOpen, RefreshCw, Database, FileText, MessageSquare } from "lucide-react"

export default function RAGSystemDiagram() {
  return (
    <div className="grid grid-cols-3 gap-8 h-full">
      {/* Core Idea */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-cyan-400">Core Idea</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-800/50 border border-cyan-400/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Packet Analytics</span>
            </div>
            <p className="text-xs text-gray-300">Structured DB queries for packet logs and statistics</p>
          </div>

          <div className="bg-gray-800/50 border border-cyan-400/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Attack Knowledge</span>
            </div>
            <p className="text-xs text-gray-300">Curated file explanations and documentation</p>
          </div>

          <div className="bg-gray-800/50 border border-red-400/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">OOS Handling</span>
            </div>
            <p className="text-xs text-gray-300">Politely rejects irrelevant queries</p>
          </div>
        </div>
      </motion.div>

      {/* Knowledge Sources */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <FolderOpen className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-cyan-400">Knowledge Sources</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="font-medium text-blue-400">PostgreSQL</span>
            </div>
            <p className="text-sm text-gray-300">Real-time packet logs and network statistics</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-green-400" />
              <span className="font-medium text-green-400">attacks.txt</span>
            </div>
            <p className="text-sm text-gray-300">Curated attack documentation and explanations</p>
          </div>
        </div>
      </motion.div>

      {/* Pipeline */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <RefreshCw className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-cyan-400">Pipeline</h3>
        </div>

        <div className="space-y-3">
          <motion.div
            className="bg-gray-800/50 border border-purple-400/30 rounded-lg p-3"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-sm font-medium text-purple-400">1. Classifier</span>
            <p className="text-xs text-gray-300 mt-1">Routes to SQL / Docs / OOS</p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
          </motion.div>

          <motion.div
            className="bg-gray-800/50 border border-purple-400/30 rounded-lg p-3"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-sm font-medium text-purple-400">2. Executor</span>
            <p className="text-xs text-gray-300 mt-1">Generates queries or retrieves docs</p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1 }}
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
          </motion.div>

          <motion.div
            className="bg-gray-800/50 border border-purple-400/30 rounded-lg p-3"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-sm font-medium text-purple-400">3. GPT (gpt-4o)</span>
            <p className="text-xs text-gray-300 mt-1">Short, factual answers</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Examples */}
      <motion.div
        className="col-span-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-gray-900/50 border border-cyan-400/30 rounded-lg p-4">
          <h4 className="text-sm font-bold text-cyan-400 mb-3">Query Examples</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-blue-400">"How many Deauth packets?"</span>
              <span className="text-gray-400">→</span>
              <span className="text-green-400">SQL Query</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-400">"What is Evil Twin attack?"</span>
              <span className="text-gray-400">→</span>
              <span className="text-yellow-400">Documentation</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
