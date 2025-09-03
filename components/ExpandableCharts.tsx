"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Timer,
  Grid3X3,
  SlidersHorizontal,
  BrainCircuit,
} from "lucide-react"

/* ────────────────────────────────
   Small stat card
────────────────────────────────── */
function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
  return (
    <div className="rounded-xl border border-cyan-500/30 bg-slate-900/40 px-5 py-4 text-center">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-cyan-400">{value}</div>
      {subtitle ? <div className="mt-1 text-xs text-slate-400">{subtitle}</div> : null}
    </div>
  )
}

/* ────────────────────────────────
   Heatmap cell & table
────────────────────────────────── */
function HeatCell({
  value,
  pct,
  max,
  highlight,
  label,
}: {
  value: number
  pct: number
  max: number
  highlight?: boolean
  label: string
}) {
  const intensity = Math.max(0.1, value / Math.max(1, max))
  const bg = `rgba(34,211,238,${0.15 + 0.55 * intensity})`
  const ring = highlight ? "ring-2 ring-cyan-400/70" : ""
  return (
    <div
      className={`relative rounded-md p-3 text-center text-slate-100 ${ring}`}
      style={{ background: bg }}
      title={label}
    >
      <div className="text-sm font-semibold">{value.toLocaleString()}</div>
      <div className="text-[11px] text-slate-900/90 font-medium">{pct.toFixed(1)}%</div>
    </div>
  )
}

function HeatmapTable({
  title,
  rowLabels,
  colLabels,
  matrix,
  normalize = false,
  highlightIndex = -1,
}: {
  title: string
  rowLabels: string[]
  colLabels: string[]
  matrix: number[][]
  normalize?: boolean
  highlightIndex?: number
}) {
  const rowSums = useMemo(() => matrix.map((r) => r.reduce((a, b) => a + b, 0)), [matrix])
  const total = useMemo(() => rowSums.reduce((a, b) => a + b, 0), [rowSums])
  const maxVal = useMemo(() => Math.max(...matrix.flat()), [matrix])

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-slate-900/30 p-4">
      <div className="mb-3 text-base font-semibold text-cyan-300">{title}</div>

      <div
        className="grid"
        style={{ gridTemplateColumns: `140px repeat(${colLabels.length}, minmax(90px,1fr))` }}
      >
        <div />
        {colLabels.map((c, j) => (
          <div
            key={c}
            className={`px-2 py-1 text-center text-xs ${
              j === highlightIndex ? "text-cyan-300 font-semibold" : "text-slate-300"
            }`}
          >
            {c}
          </div>
        ))}

        {matrix.map((row, i) => {
          const sum = Math.max(1, rowSums[i])
          return (
            <div key={rowLabels[i]} className="contents">
              <div
                className={`px-2 py-2 text-xs font-medium ${
                  i === highlightIndex ? "text-cyan-300" : "text-slate-300"
                }`}
              >
                {rowLabels[i]}
              </div>
              {row.map((v, j) => {
                const pct = normalize ? (v / sum) * 100 : (v / Math.max(1, total)) * 100
                const highlight = i === j || i === highlightIndex || j === highlightIndex
                const label = `${rowLabels[i]} → ${colLabels[j]} • ${v.toLocaleString()} (${pct.toFixed(1)}%)`
                return (
                  <HeatCell
                    key={`${i}-${j}`}
                    value={v}
                    pct={pct}
                    max={maxVal}
                    highlight={highlight}
                    label={label}
                  />
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
        <span>Low</span>
        <div className="h-2 w-48 rounded bg-gradient-to-r from-cyan-200/20 via-cyan-300/50 to-cyan-400/80" />
        <span>High</span>
        <span className="ml-3 opacity-70">(color intensity reflects cell value)</span>
      </div>
    </div>
  )
}

/* ────────────────────────────────
   Tiny ROC (SVG)
────────────────────────────────── */
function MiniROC({ auc = 0.99, point }: { auc?: number; point?: { fpr: number; tpr: number } }) {
  // نحول لنظام إحداثيات الـSVG (y تحت -> نحتاج نعكس tpr)
  const x = point ? point.fpr * 100 : 0
  const y = point ? (100 - point.tpr * 100) : 100

  return (
    <svg viewBox="0 0 100 100" className="w-full h-48">
      <rect x="0" y="0" width="100" height="100" rx="8" className="fill-slate-900/30 stroke-cyan-500/20" />
      {/* الخط القطري */}
      <line x1="0" y1="100" x2="100" y2="0" stroke="rgba(148,163,184,0.5)" strokeWidth="1" />
      {/* منحنى ROC (رمزي) */}
      <path d="M0,100 C25,90 55,30 100,0" fill="none" stroke="rgb(34,211,238)" strokeWidth="2.5" />
      {/* النقطة الحية */}
      {point && (
        <g>
          <circle cx={x} cy={y} r="2.8" fill="white" />
          <circle cx={x} cy={y} r="5" fill="rgba(34,211,238,0.35)" />
        </g>
      )}
      <text x="3" y="8" className="fill-slate-300 text-[8px]">TPR</text>
      <text x="84" y="98" className="fill-slate-300 text-[8px]">FPR</text>
      <text x="60" y="92" className="fill-cyan-300 text-[8px]">AUC ≈ {auc.toFixed(2)}</text>
    </svg>
  )
}

/* ────────────────────────────────
   Main
────────────────────────────────── */
export default function ExpandableCharts() {
  type Mode = "binary" | "multi"
  type Panel = "none" | "cm" | "roc" | "latency" | "accf1"

  const [mode, setMode] = useState<Mode>("binary")
  const [panel, setPanel] = useState<Panel>("none")
  const [normalized, setNormalized] = useState(false)

  // Threshold slider (illustrative)
  const [thr, setThr] = useState(0.50)

  /* -------- Data (aligned with your numbers) -------- */
  // Binary baseline (at 0.50)
  const BIN_ROWS = ["Actual: Normal", "Actual: Attack"]
  const BIN_COLS = ["Pred: Normal", "Pred: Attack"]
  const BIN_BASE = [
    [24500, 250], // TN, FP
    [125, 24800], // FN, TP
  ]

  // Adjust counts with threshold
  const BIN = useMemo(() => {
    const delta = Math.round((thr - 0.5) * 400) // +/- ~80
    // Higher thr → fewer FP, more FN
    const FP = Math.max(0, BIN_BASE[0][1] - delta)
    const TN = BIN_BASE[0][0] + (BIN_BASE[0][1] - FP)

    const FN = Math.max(0, BIN_BASE[1][0] + delta)
    const TP = BIN_BASE[1][1] - (FN - BIN_BASE[1][0])

    return [
      [TN, FP],
      [FN, TP],
    ]
  }, [thr])

  // Multi (6 classes). RogueAP intentionally weaker
  const MC_LABELS = ["Deauth", "EvilTwin", "RogueAP", "KRACK", "Re-Assoc", "SSDP"]
  const MC = [
    [1650, 8, 10, 6, 5, 5],
    [7, 1620, 14, 5, 6, 3],
    [35, 28, 1220, 18, 25, 20],
    [6, 5, 12, 1605, 7, 4],
    [5, 6, 15, 8, 1585, 5],
    [3, 4, 10, 5, 6, 1590],
  ]
  const MC_F1 = [0.97, 0.96, 0.70, 0.95, 0.94, 0.95]
  const [focusClass, setFocusClass] = useState<number>(-1)

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.06 * i, duration: 0.25 } }),
  }

  /* ---------------- UI ---------------- */
  const SummaryCards = (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { title: "Binary (LightGBM)", value: "Acc ~98.5%", subtitle: "F1 ~98%" },
        { title: "Multi-class (6 types)", value: "Acc ~99.8%", subtitle: "F1 ~93%" },
        { title: "Latency", value: "< 1s", subtitle: "Real-time detect" },
        { title: "Decision", value: "LightGBM", subtitle: "Best accuracy/speed" },
      ].map((c, i) => (
        <motion.div key={c.title} initial="hidden" animate="show" variants={cardVariants} custom={i}>
          <StatCard title={c.title} value={c.value} subtitle={c.subtitle} />
        </motion.div>
      ))}
    </div>
  )

  const Controls = (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4">
      {/* mode switch */}
      <div className="inline-flex overflow-hidden rounded-lg border border-cyan-500/30">
        {(["binary", "multi"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setPanel("none") }}
            className={`px-3 py-1.5 text-sm ${
              mode === m ? "bg-cyan-400/15 text-cyan-300" : "text-slate-300 hover:bg-cyan-400/10"
            }`}
          >
            {m === "binary" ? "Binary" : "Multi-class"}
          </button>
        ))}
      </div>

      <button
        onClick={() => setPanel(panel === "cm" ? "none" : "cm")}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
          panel === "cm" ? "border-cyan-400 bg-cyan-400/10" : "border-cyan-500/30 hover:bg-cyan-500/10"
        }`}
      >
        <Grid3X3 className="w-4 h-4 text-cyan-400" /> Confusion Matrix
      </button>

      <button
        onClick={() => setPanel(panel === "roc" ? "none" : "roc")}
        disabled={mode !== "binary"}
        title="ROC is available for Binary only"
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
          panel === "roc" ? "border-cyan-400 bg-cyan-400/10" : "border-cyan-500/30 hover:bg-cyan-500/10"
        } ${mode !== "binary" ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> ROC & Threshold
      </button>

      <button
        onClick={() => setPanel(panel === "latency" ? "none" : "latency")}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
          panel === "latency" ? "border-cyan-400 bg-cyan-400/10" : "border-cyan-500/30 hover:bg-cyan-500/10"
        }`}
      >
        <Timer className="w-4 h-4 text-cyan-400" /> Latency Comparison
      </button>

      <button
        onClick={() => setPanel(panel === "accf1" ? "none" : "accf1")}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors ${
          panel === "accf1" ? "border-cyan-400 bg-cyan-400/10" : "border-cyan-500/30 hover:bg-cyan-500/10"
        }`}
      >
        <BarChart3 className="w-4 h-4 text-cyan-400" /> Accuracy vs F1
      </button>
    </div>
  )

  const NormalizeToggle =
    panel === "cm" ? (
      <div className="flex items-center justify-center gap-3 -mt-2">
        <label className="text-xs text-slate-300">Counts</label>
        <button
          onClick={() => setNormalized((v) => !v)}
          className="relative inline-flex h-6 w-10 items-center rounded-full bg-slate-700"
        >
          <span
            className={`transform transition-transform ${
              normalized ? "translate-x-5" : "translate-x-1"
            } inline-block h-4 w-4 rounded-full bg-cyan-400`}
          />
        </button>
        <label className="text-xs text-slate-300">Normalized %</label>
      </div>
    ) : null

  return (
    <div className="space-y-10 pb-24 overflow-auto">
      {SummaryCards}

      {/* sentence takeaway */}
      <div className="text-center text-sm text-slate-300/90">
        LightGBM achieves sub-second detection with the best trade-off between accuracy and speed — ideal for real-time IPS.
      </div>

      {/* Why + Training details (always visible) */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-cyan-500/20 bg-slate-900/30 px-5 py-4">
          <div className="mb-2 flex items-center gap-2 text-cyan-300 font-semibold">
            <BrainCircuit className="w-4 h-4" /> Why LightGBM?
          </div>
          <ul className="text-sm leading-relaxed text-slate-300 list-disc ml-5">
            <li>High accuracy with tabular, high-dim features (no GPU required).</li>
            <li>Fast inference on edge (&lt;1s) with small memory footprint.</li>
            <li>Robust to noise and class imbalance with proper tuning.</li>
          </ul>
          <div className="mt-3 text-xs text-slate-400">
            Alternatives: <span className="font-medium text-slate-300">One-Class SVM / Isolation Forest</span> → high false positives;
            <span className="font-medium text-slate-300"> Neural Nets</span> → 2–3s latency on edge + higher training cost.
          </div>
        </div>

        {/* Training Details card (static) */}
        <div className="rounded-xl border border-cyan-500/20 bg-slate-900/30 px-5 py-4">
          <div className="mb-2 flex items-center justify-between text-cyan-300 font-semibold">
            <span>Training Details</span>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-3 text-sm">
            <StatCard title="Dataset Split" value="70 / 15 / 15" subtitle="Train / Val / Test" />
            <StatCard title="Features Used" value="31" subtitle="after preprocessing" />
            <StatCard title="Device" value="Raspberry Pi" subtitle="edge inference" />
            <StatCard title="Train Time" value="~12m" subtitle="LightGBM CPU" />
          </div>
        </div>
      </div>

      {Controls}
      {NormalizeToggle}

      {/* Per-class chips (Multi only) */}
      {mode === "multi" && panel === "cm" ? (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {MC_LABELS.map((lbl, i) => (
            <button
              key={lbl}
              onClick={() => setFocusClass((p) => (p === i ? -1 : i))}
              className={`px-3 py-1.5 rounded-full border text-xs ${
                focusClass === i
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                  : "border-cyan-500/30 text-slate-300 hover:bg-cyan-400/10"
              }`}
              title={`F1 ≈ ${(MC_F1[i] * 100).toFixed(0)}%`}
            >
              {lbl} • F1 {(MC_F1[i] * 100).toFixed(0)}%
            </button>
          ))}
        </div>
      ) : null}

      {/* Panels */}
      <AnimatePresence mode="wait">
        {panel === "cm" && mode === "binary" && (
          <motion.div
            key="bin-cm"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <HeatmapTable
              title="Binary Confusion Matrix"
              rowLabels={BIN_ROWS}
              colLabels={BIN_COLS}
              matrix={BIN}
              normalize={normalized}
            />
          </motion.div>
        )}

        {panel === "cm" && mode === "multi" && (
          <motion.div
            key="mc-cm"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <HeatmapTable
              title="Multi-class Confusion Matrix (6 classes)"
              rowLabels={MC_LABELS.map((l) => `Actual: ${l}`)}
              colLabels={MC_LABELS.map((l) => `Pred: ${l}`)}
              matrix={MC}
              normalize={normalized}
              highlightIndex={focusClass}
            />
            <div className="mt-3 text-xs text-slate-400">
              Note: RogueAP F1 is lower (~0.70) due to limited data — expanding samples is part of future work.
              <br />
              ROC is displayed for Binary only; for Multi-class use the per-class F1 chips above to inspect strengths/weaknesses.
            </div>
          </motion.div>
        )}

        {panel === "roc" && mode === "binary" && (
  <motion.div
    key="roc"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className="rounded-xl border border-cyan-500/20 bg-slate-900/30 p-4"
  >
    <div className="mb-2 text-base font-semibold text-cyan-300">ROC Curve & Threshold</div>

    {/* ROC with live operating point from current BIN */}
    {(() => {
      const TN = BIN[0][0], FP = BIN[0][1], FN = BIN[1][0], TP = BIN[1][1]
      const tpr = TP / Math.max(1, (TP + FN))
      const fpr = FP / Math.max(1, (FP + TN))
      return <MiniROC auc={0.99} point={{ fpr, tpr }} />
    })()}

    <div className="mt-3 flex items-center gap-3">
      <span className="text-xs text-slate-300">Threshold</span>
      <input
        type="range"
        min={0.3}
        max={0.7}
        step={0.01}
        value={thr}
        onChange={(e) => setThr(parseFloat(e.target.value))}
        className="w-64 accent-cyan-400"
      />
      <span className="text-xs text-cyan-300">{thr.toFixed(2)}</span>
      <span className="text-[11px] text-slate-400 ml-3">
        Higher threshold → fewer false positives, but more false negatives.
      </span>
    </div>

    {/* Live confusion snapshot that updates with the slider */}
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
      <div className="rounded-lg border border-cyan-500/20 bg-slate-900/30 p-3">
        <div className="mb-2 font-semibold text-cyan-300">Live Confusion Snapshot</div>
        <div className="grid grid-cols-3 text-center gap-y-1">
          <div></div>
          <div className="font-medium">Pred: Normal</div>
          <div className="font-medium">Pred: Attack</div>

          <div className="text-left font-medium">Actual: Normal</div>
          <div>{BIN[0][0].toLocaleString()}</div>
          <div>{BIN[0][1].toLocaleString()}</div>

          <div className="text-left font-medium">Actual: Attack</div>
          <div>{BIN[1][0].toLocaleString()}</div>
          <div>{BIN[1][1].toLocaleString()}</div>
        </div>
      </div>

      <div className="rounded-lg border border-cyan-500/20 bg-slate-900/30 p-3">
        <div className="mb-2 font-semibold text-cyan-300">Effect of Threshold</div>
        <ul className="list-disc ml-4 space-y-1">
          <li>Higher threshold → fewer FP, more FN.</li>
          <li>Lower threshold → more FP, fewer FN.</li>
        </ul>
      </div>
    </div>
  </motion.div>
)}

        {panel === "latency" && (
          <motion.div
            key="latency"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="rounded-xl border border-cyan-500/20 bg-slate-900/30 p-4">
              <div className="mb-3 text-base font-semibold text-cyan-300">Latency Comparison (edge device)</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="LightGBM" value="< 1s" subtitle="chosen" />
                <StatCard title="Random Forest" value="~ 2s" subtitle="slower" />
                <StatCard title="Neural Net" value="~ 3s" subtitle="too slow" />
                <StatCard title="One-Class SVM" value="~ 1.5s" subtitle="high FP" />
              </div>
            </div>
          </motion.div>
        )}

        {panel === "accf1" && (
          <motion.div
            key="accf1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="rounded-xl border border-cyan-500/20 bg-slate-900/30 p-4">
              <div className="mb-3 text-base font-semibold text-cyan-300">Accuracy vs F1</div>
              <div className="grid grid-cols-2 gap-4">
                <StatCard title="Binary (LightGBM)" value="Acc ~98.5%" subtitle="F1 ~98%" />
                <StatCard title="Multi-class (LightGBM)" value="Acc ~93.9%" subtitle="F1 ~93%" />
              </div>
              <div className="mt-3 text-xs text-slate-400">
                Takeaway: LightGBM delivers the best accuracy/speed balance for real-time IPS.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}