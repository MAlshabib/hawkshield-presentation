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
    <div className="w-full max-h-[65vh] overflow-y-auto">
      {title && <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-cyan-400 break-words sticky top-0 bg-slate-900/95 backdrop-blur-sm py-2 z-10">{title}</h3>}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-lg border border-cyan-500/30 bg-slate-900/50">
            <table className="min-w-full w-full text-sm sm:text-base">
              <thead className="sticky top-12 bg-cyan-500/20 backdrop-blur-sm z-10">
                <tr>
                  {data.headers.map((header, index) => (
                    <motion.th
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-cyan-300 border-r border-cyan-500/30 last:border-r-0"
                    >
                      <div className="break-words">{header}</div>
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
                        className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-300 border-r border-cyan-500/20 last:border-r-0 break-words"
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
      </div>
    </div>
  )
}
