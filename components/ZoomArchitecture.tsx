"use client"
import PacketCapturePanel from "./PacketCapturePanel"

import { useState, useImperativeHandle, forwardRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Database, Cpu, Shield, Zap, ArrowLeft, ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import InteractiveTable from "./InteractiveTable"
import PreprocessingSteps from "./PreprocessingSteps"
import ExpandableCharts from "./ExpandableCharts"
import AttackDefenseMapping from "./AttackDefenseMapping"

type View = "overview" | "capture" | "preprocess" | "models" | "defense"

interface ZoomArchitectureProps {
  onZoomToSlide?: (slideIndex: number) => void
  onDrillChange?: (active: boolean) => void
  onTitleChange?: (title: string) => void
}

export type ZoomArchitectureRef = { 
  exitToOverview: () => void 
}

// --- Local "FeatureGallery" for Preprocessing (no new files needed) ---
type FeatureRow = {
  name: string;
  desc: string;
  bin: number;     // Binary importance (0..1)
  multi: number;   // Multi-class importance (0..1)
};

const CORE_FEATURES: FeatureRow[] = [
  { name: "Packet Rate", desc: "Frequency of packet transmission", bin: 0.24, multi: 0.19 },
  { name: "Signal Strength (RSSI)", desc: "RSSI values and variations", bin: 0.18, multi: 0.22 },
  { name: "Channel Usage", desc: "Channel hopping patterns", bin: 0.16, multi: 0.15 },
  { name: "Frame Types", desc: "Distribution of frame types", bin: 0.14, multi: 0.18 },
  { name: "Timing Intervals", desc: "Inter-packet timing patterns", bin: 0.12, multi: 0.13 },
  { name: "Sequence Numbers", desc: "Sequence number patterns", bin: 0.10, multi: 0.08 },
  { name: "Frame Sizes", desc: "Packet size distributions", bin: 0.06, multi: 0.05 },
  { name: "Beacon Count", desc: "802.11 beacons per window", bin: 0.08, multi: 0.07 },
  { name: "Probe Requests", desc: "Active scan attempts", bin: 0.09, multi: 0.06 },
  { name: "Retry Flag Rate", desc: "MAC layer retries density", bin: 0.07, multi: 0.09 },
  { name: "Mgmt/Data Ratio", desc: "Mgmt vs data frames", bin: 0.11, multi: 0.10 },
  { name: "SSID Changes", desc: "BSSID/SSID switching", bin: 0.05, multi: 0.07 },
];

function Bar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full bg-slate-800/70 rounded">
      <div
        className="h-2 rounded bg-gradient-to-r from-cyan-400 to-blue-500"
        style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
      />
    </div>
  );
}

function FeatureGallery() {
  const [metric, setMetric] = useState<"bin" | "multi">("bin");

  const filtered = useMemo(() => {
    // Sort a copy by the selected metric (no search box)
    return [...CORE_FEATURES].sort((a, b) => b[metric] - a[metric]);
  }, [metric]);

  const total = 31; // total engineered features in the pipeline
  const shown = filtered.length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Controls: metric sort only */}
      <div className="mb-6 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMetric("bin")}
            className={`px-3 py-1.5 rounded border ${metric==="bin" ? "border-cyan-400 text-cyan-300" : "border-slate-600 text-slate-300"} bg-slate-800/70`}
          >
            Sort: Binary
          </button>
          <button
            onClick={() => setMetric("multi")}
            className={`px-3 py-1.5 rounded border ${metric==="multi" ? "border-cyan-400 text-cyan-300" : "border-slate-600 text-slate-300"} bg-slate-800/70`}
          >
            Sort: Multi‑class
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((f) => (
          <div key={f.name} className="p-4 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-cyan-500/50 transition">
            <div className="flex items-baseline justify-between mb-2">
              <h4 className="text-slate-100 font-medium">{f.name}</h4>
              <span className="text-xs text-slate-400">{metric === "bin" ? "Binary" : "Multi"}: {(f[metric]*100).toFixed(0)}%</span>
            </div>
            <Bar value={f[metric]} />
            <p className="mt-2 text-xs text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <div>Showing {shown} of {total} engineered features</div>
      </div>
    </div>
  );
}
// --- End FeatureGallery ---

const ZoomArchitecture = forwardRef<ZoomArchitectureRef, ZoomArchitectureProps>(
  ({ onZoomToSlide, onDrillChange, onTitleChange }, ref) => {
    const [view, setView] = useState<View>("overview")
    const [preprocessSub, setPreprocessSub] = useState(0)
    const [preprocessTab, setPreprocessTab] = useState<"steps" | "importance" | "gallery">("steps");

    const titles: Record<View, string> = {
      overview: "System Architecture",
      capture: "Packet Capture",
      preprocess: "Preprocessing",
      models: "ML Models",
      defense: "Defense Module",
    }

    useEffect(() => {
      onDrillChange?.(view !== "overview")
      onTitleChange?.(titles[view])
    }, [view, onDrillChange, onTitleChange])

    useImperativeHandle(ref, () => ({
      exitToOverview: () => {
        setView("overview")
        setPreprocessSub(0)
      }
    }))

    const modules = [
      { id: "capture", name: "Packet Capture", icon: Database, description: "Monitor mode adapter" },
      { id: "preprocess", name: "Preprocessing", icon: Cpu, description: "Impute, scale, categorize" },
      { id: "models", name: "ML Models", icon: Zap, description: "Binary + Multi-class detection" },
      { id: "defense", name: "Defense Module", icon: Shield, description: "Block/Deauth actions" },
    ]

    const handleModuleClick = (moduleId: string) => {
      setView(moduleId as View)
      setPreprocessSub(0) // Reset preprocess sub-page
      setPreprocessTab("steps");
    }

    const handleBackToOverview = () => {
      setView("overview")
      setPreprocessSub(0)
      setPreprocessTab("steps");
    }

    const renderSubview = () => {
      switch (view) {
        case "capture":
          return (
            <PacketCapturePanel />
          )
        case "preprocess":
          return (
            <div className="max-w-6xl mx-auto">
              {/* Tab switcher */}
              <div className="mb-6 flex items-center justify-center gap-3">
                <Button
                  variant={preprocessTab === "steps" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreprocessTab("steps")}
                  className={preprocessTab === "steps" ? "bg-cyan-600/80 hover:bg-cyan-600" : "bg-slate-800/80 border-slate-600 hover:bg-slate-700"}
                >
                  Pipeline Steps
                </Button>
                <Button
                  variant={preprocessTab === "importance" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreprocessTab("importance")}
                  className={preprocessTab === "importance" ? "bg-cyan-600/80 hover:bg-cyan-600" : "bg-slate-800/80 border-slate-600 hover:bg-slate-700"}
                >
                  Feature Importance
                </Button>
                <Button
                  variant={preprocessTab === "gallery" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreprocessTab("gallery")}
                  className={preprocessTab === "gallery" ? "bg-cyan-600/80 hover:bg-cyan-600" : "bg-slate-800/80 border-slate-600 hover:bg-slate-700"}
                >
                  Feature Gallery (Top 12 / 31)
                </Button>
              </div>

              {/* Tab content */}
              {preprocessTab === "steps" && (
                <PreprocessingSteps />
              )}

              {preprocessTab === "importance" && (
                <InteractiveTable
                  title="Feature Importance Analysis"
                  data={{
                    headers: ["Feature", "Binary Importance", "Multi-class Importance", "Description"],
                    rows: [
                      ["Packet Rate", "0.24", "0.19", "Frequency of packet transmission"],
                      ["Signal Strength", "0.18", "0.22", "RSSI values and variations"],
                      ["Channel Usage", "0.16", "0.15", "Channel hopping patterns"],
                      ["Frame Types", "0.14", "0.18", "Distribution of frame types"],
                      ["Timing Intervals", "0.12", "0.13", "Inter-packet timing patterns"],
                      ["Sequence Numbers", "0.10", "0.08", "Sequence number patterns"],
                      ["Frame Sizes", "0.06", "0.05", "Packet size distributions"],
                    ],
                  }}
                />
              )}

              {preprocessTab === "gallery" && (
                <FeatureGallery />
              )}
            </div>
          )
        case "models":
          return <ExpandableCharts />
        case "defense":
          return <AttackDefenseMapping />
        default:
          return null
      }
    }

    return (
      <div className="relative w-full h-full flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {view === "overview" ? (
            <motion.div
              key="overview"
              className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8 w-full max-w-6xl mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {modules.map((module, index) => {
                const Icon = module.icon
                return (
                  <div key={module.id} className="flex flex-col md:flex-row items-center justify-center w-full md:w-auto">
                    <motion.div
                      className="relative group cursor-pointer w-full md:w-auto flex-shrink-0"
                      whileHover={{ scale: 1.03 }}
                      onClick={() => handleModuleClick(module.id)}
                      style={{ transformOrigin: "center" }}
                    >
                      <div className="w-full md:w-28 lg:w-36 h-28 md:h-28 lg:h-36 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-400/30 flex flex-col items-center justify-center p-3 md:p-4 group-hover:border-cyan-400/60 transition-all duration-300 min-h-[100px] relative z-10">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-cyan-400 mb-1 md:mb-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-center text-gray-300 font-medium break-words leading-tight">{module.name}</span>
                        <span className="text-[10px] md:text-xs text-center text-gray-400 mt-0.5 md:mt-1 break-words hidden sm:block leading-tight">{module.description}</span>
                      </div>
                      <div className="absolute inset-0 bg-cyan-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                    {index < modules.length - 1 && (
                      <motion.div
                        className="w-1 h-8 md:w-8 lg:w-12 md:h-1 bg-gradient-to-b md:bg-gradient-to-r from-cyan-400 to-blue-500 my-3 md:my-0 md:mx-3 lg:mx-6 hidden sm:block flex-shrink-0"
                        initial={{ scaleX: 0, scaleY: 0 }}
                        animate={{ scaleX: 1, scaleY: 1 }}
                        transition={{ delay: index * 0.2 }}
                      />
                    )}
                  </div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="subview"
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToOverview}
                  className="bg-slate-800/80 border-slate-600 hover:bg-slate-700 text-xs sm:text-sm min-h-[40px]"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Architecture</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </div>
              <div className="pt-16">
                {renderSubview()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ZoomArchitecture.displayName = "ZoomArchitecture"

export default ZoomArchitecture
