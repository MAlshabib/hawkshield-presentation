"use client"

import { motion } from "framer-motion"
import { Lock, Eye, ShieldCheck } from "lucide-react"

export default function ScopeEthics() {
  return (
    <div className="space-y-8 pb-16">
      <h2 className="text-2xl font-semibold text-cyan-300">
        Scope & Ethics
      </h2>

      {/* Quick principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-cyan-500/30 bg-slate-900/40 p-4">
          <div className="text-cyan-300 font-medium"><Lock className="inline w-4 h-4 mr-1 text-cyan-300" /> Privacy</div>
          <div className="text-slate-300 text-sm mt-1">
            Limited retention: MAC/SSID kept up to 7 days for audit/forensics, then auto-purged. Payloads are anonymized.  
            Compliant with <span className="text-cyan-400">GDPR</span>.
          </div>
        </div>
        <div className="rounded-lg border border-cyan-500/30 bg-slate-900/40 p-4">
          <div className="text-cyan-300 font-medium"><Eye className="inline w-4 h-4 mr-1 text-cyan-300" /> Transparency</div>
          <div className="text-slate-300 text-sm mt-1">
            Open source algorithms & reproducible evaluation.  
            Following <span className="text-cyan-400">IEEE</span> standards.
          </div>
        </div>
        <div className="rounded-lg border border-cyan-500/30 bg-slate-900/40 p-4">
          <div className="text-cyan-300 font-medium"><ShieldCheck className="inline w-4 h-4 mr-1 text-cyan-300" /> Security</div>
          <div className="text-slate-300 text-sm mt-1">
            End-to-end encryption, on-device processing only.  
            Certified <span className="text-cyan-400">ISO 27001</span>.
          </div>
        </div>
      </div>

      {/* Detailed table */}
      <div className="rounded-xl border border-cyan-500/30 bg-slate-900/40 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 text-cyan-300">
            <tr>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Measure</th>
              <th className="px-4 py-2 text-left">Implementation</th>
              <th className="px-4 py-2 text-left">Compliance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-slate-300">
            <tr>
              <td className="px-4 py-2">Privacy</td>
              <td>Data Anonymization</td>
              <td>MAC/SSID retained ≤ 7 days (auto-purged)</td>
              <td>✓ GDPR (data minimization & retention policy)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Transparency</td>
              <td>Open Source Components</td>
              <td>Public algorithms</td>
              <td>✓ IEEE</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Accountability</td>
              <td>Audit Trails</td>
              <td>All actions logged</td>
              <td>✓ SOC2</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Fairness</td>
              <td>Bias Prevention</td>
              <td>Balanced training data</td>
              <td>✓ AI Ethics</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Security</td>
              <td>Encrypted Communication</td>
              <td>End-to-end encryption</td>
              <td>✓ ISO 27001</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}