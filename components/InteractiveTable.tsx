"use client"

import { motion } from "framer-motion"

interface TableData {
  headers: string[]
  rows: string[][]
}

interface InteractiveTableProps {
  data: TableData
  title?: string
}

export default function InteractiveTable({ data, title }: InteractiveTableProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-xl font-semibold mb-4 text-cyan-400">{title}</h3>}
      <div className="overflow-hidden rounded-lg border border-cyan-500/30 bg-slate-900/50">
        <table className="w-full">
          <thead>
            <tr className="bg-cyan-500/20">
              {data.headers.map((header, index) => (
                <motion.th
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-3 text-left text-sm font-semibold text-cyan-300 border-r border-cyan-500/30 last:border-r-0"
                >
                  {header}
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (rowIndex + 1) * 0.1 }}
                className="border-t border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-sm text-slate-300 border-r border-cyan-500/20 last:border-r-0"
                  >
                    {cell}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
