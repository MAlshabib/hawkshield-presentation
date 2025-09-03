"use client"
import IntroMotivation from "./IntroMotivation"
import ProblemStatement from "./ProblemStatement"

import HardwareSetup from "./HardwareSetup"
import ImpactValue from "./ImpactValue"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { SlideData } from "@/data/slides"
import type { ZoomArchitectureRef } from "./ZoomArchitecture"
import { RefObject } from "react"
import SlideImage from "./SlideImage"
import InteractiveTable from "./InteractiveTable"
import FlowDiagram from "./FlowDiagram"
import AttackVisualization from "./AttackVisualization"
import PerformanceMetrics from "./PerformanceMetrics"
import TeamCards from "./TeamCards"
import LiveDemo from "./LiveDemo"
import AttackDefenseMapping from "./AttackDefenseMapping"
import ZoomArchitecture from "./ZoomArchitecture"
import PreprocessingSteps from "./PreprocessingSteps"
import ExpandableCharts from "./ExpandableCharts"
import RAGSystemDiagram from "./RAGSystemDiagram"
import ScopeEthics from "./ScopeEthics"
import { Database, Shield, Eye, Cpu, Brain } from "lucide-react"

interface SlideProps {
  slide: SlideData
  slideNumber: number
  totalSlides: number
  zoomArchitectureRef?: RefObject<ZoomArchitectureRef | null>
  onDrillChange?: (active: boolean) => void
}

export default function Slide({ slide, zoomArchitectureRef, onDrillChange }: SlideProps) {
  const [overrideTitle, setOverrideTitle] = useState<string | undefined>()

  useEffect(() => {
    // Reset title when slide unmounts or changes
    return () => setOverrideTitle(undefined)
  }, [slide.id])
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const renderInteractiveContent = () => {
    switch (slide.interactive) {
      case "intro":
      case "intro-motivation":
        return <IntroMotivation />
      case "problem":
        return <ProblemStatement />
      case "attack-defense-mapping":
        return <AttackDefenseMapping />

      case "solution-flow":
        return (
          <FlowDiagram
            title="ML-Powered Defense Flow"
            steps={[
              {
                id: "detect",
                title: "Detection",
                description: "Binary & Multi-class ML models",
                icon: <Eye className="w-6 h-6 text-cyan-400" />,
                color: "border-cyan-500/50",
              },
              {
                id: "analyze",
                title: "Analysis",
                description: "100 attack packets/hour → prevention trigger",
                icon: <Brain className="w-6 h-6 text-cyan-400" />,
                color: "border-blue-500/50",
              },
              {
                id: "defend",
                title: "Defense",
                description: "Automated Block/Deauth response",
                icon: <Shield className="w-6 h-6 text-cyan-400" />,
                color: "border-green-500/50",
              },
            ]}
          />
        )

      case "zoom-architecture":
        return (
          <ZoomArchitecture 
            ref={zoomArchitectureRef} 
            onDrillChange={onDrillChange}
            onTitleChange={setOverrideTitle}
          />
        )

      case "data-collection":
        return (
          <InteractiveTable
            title="Dataset Statistics"
            data={{
              headers: ["Metric", "Value", "Description"],
              rows: [
                ["Total Samples", "~50,000", "Balanced normal vs attack traffic"],
                ["Attack Types", "6", "Deauth, Evil Twin, Rogue AP, KRACK, Re-Assoc, SSDP"],
                ["Features", "9", "Behavioral patterns (no MAC/SSID identifiers)"],
                ["Environment", "Isolated", "Controlled router environment"],
                ["Format", "CSV", "Feature dumps for ML training"],
              ],
            }}
          />
        )

      case "preprocessing-steps":
        return <PreprocessingSteps />

      case "feature-importance":
        return (
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
        )

      case "expandable-charts":
        return <ExpandableCharts />

      case "hardware-setup":
        return <HardwareSetup />

      case "performance-dashboard":
        return <PerformanceMetrics />

      case "demo":
        return <LiveDemo />

      case "impact-metrics":
        return (
          <InteractiveTable
            title="Impact & Value Metrics"
            data={{
              headers: ["Metric", "Current State", "With HawkShield", "Improvement"],
              rows: [
                ["Detection Time", "Manual (~hours)", "Automated (<1s)", "99.9% faster"],
                ["False Positives", "High (~30%)", "Low (<2%)", "93% reduction"],
                ["Network Downtime", "Extended", "Minimal", "~95% reduction"],
                ["Security Coverage", "Partial", "Comprehensive", "6x attack types"],
                ["Response Time", "Delayed", "Real-time", "Immediate"],
              ],
            }}
          />
        )
      case "impact":
        return <ImpactValue />

      case "future-roadmap":
        return (
          <FlowDiagram
            title="Future Development Roadmap"
            steps={[
              {
                id: "phase1",
                title: "Phase 1: Enhancement",
                description: "Advanced ML models & cloud integration",
                icon: <Brain className="w-6 h-6 text-cyan-400" />,
                color: "border-cyan-500/50",
              },
              {
                id: "phase2",
                title: "Phase 2: Expansion",
                description: "IoT device protection & enterprise features",
                icon: <Shield className="w-6 h-6 text-cyan-400" />,
                color: "border-blue-500/50",
              },
              {
                id: "phase3",
                title: "Phase 3: Innovation",
                description: "AI-powered threat prediction & automation",
                icon: <Eye className="w-6 h-6 text-cyan-400" />,
                color: "border-green-500/50",
              },
            ]}
          />
        )

      case "team-cards":
        return <TeamCards />

      case "ethics-compliance":
        return <ScopeEthics />
      case "ethics":
        return <ScopeEthics />

      case "rag-system":
        return <RAGSystemDiagram />

      case "toc":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {slide.points?.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-lg border border-cyan-500/30 bg-slate-900/50 hover:bg-cyan-500/10 transition-colors cursor-pointer text-center min-h-[80px] flex items-center justify-center"
              >
                <div className="text-lg text-slate-300 font-medium">{point}</div>
              </motion.div>
            ))}
          </div>
        )

      case "attacks":
        return <AttackVisualization />

      case "flow":
        return (
          <FlowDiagram
            title="ML-Powered Defense Flow"
            steps={[
              {
                id: "detect",
                title: "Detection",
                description: "Binary & Multi-class ML models",
                icon: <Eye className="w-6 h-6 text-cyan-400" />,
                color: "border-cyan-500/50",
              },
              {
                id: "analyze",
                title: "Analysis",
                description: "100 attack packets/hour → prevention trigger",
                icon: <Brain className="w-6 h-6 text-cyan-400" />,
                color: "border-blue-500/50",
              },
              {
                id: "defend",
                title: "Defense",
                description: "Automated Block/Deauth response",
                icon: <Shield className="w-6 h-6 text-cyan-400" />,
                color: "border-green-500/50",
              },
            ]}
          />
        )

      case "architecture":
        return (
          <FlowDiagram
            title="System Architecture Flow"
            steps={[
              {
                id: "capture",
                title: "Packet Capture",
                description: "Monitor mode adapter",
                icon: <Database className="w-6 h-6 text-cyan-400" />,
                color: "border-purple-500/50",
              },
              {
                id: "preprocess",
                title: "Preprocessing",
                description: "Impute, scale, categorize",
                icon: <Cpu className="w-6 h-6 text-cyan-400" />,
                color: "border-yellow-500/50",
              },
              {
                id: "ml",
                title: "ML Models",
                description: "Binary + Multi-class detection",
                icon: <Brain className="w-6 h-6 text-cyan-400" />,
                color: "border-blue-500/50",
              },
              {
                id: "defense",
                title: "Defense Module",
                description: "Block/Deauth actions",
                icon: <Shield className="w-6 h-6 text-cyan-400" />,
                color: "border-green-500/50",
              },
            ]}
          />
        )

      case "dataset":
        return (
          <InteractiveTable
            title="Dataset Statistics"
            data={{
              headers: ["Metric", "Value", "Description"],
              rows: [
                ["Total Samples", "~50,000", "Balanced normal vs attack traffic"],
                ["Attack Types", "6", "Deauth, Evil Twin, Rogue AP, KRACK, Re-Assoc, SSDP"],
                ["Features", "9", "Behavioral patterns (no MAC/SSID identifiers)"],
                ["Environment", "Isolated", "Controlled router environment"],
                ["Format", "CSV", "Feature dumps for ML training"],
              ],
            }}
          />
        )

      case "models":
        return (
          <InteractiveTable
            title="Model Comparison"
            data={{
              headers: ["Model", "Task", "Accuracy", "F1-Score", "Latency"],
              rows: [
                ["LightGBM", "Binary Classification", "~98.5%", "~98.0%", "<1s"],
                ["LightGBM", "Multi-class Classification", "99.8%", "93.9%", "<1s"],
                ["Alternative", "Random Forest", "~95%", "~92%", "~2s"],
                ["Alternative", "Neural Network", "~97%", "~94%", "~3s"],
              ],
            }}
          />
        )

      case "metrics":
        return <PerformanceMetrics />

      case "team":
        return <TeamCards />

      default:
        // Render bullet points for unknown or missing interactive keys
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {slide.points?.map((point, index) => (
              <motion.div key={index} variants={itemVariants} className="flex items-start gap-4 group">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-3 flex-shrink-0 group-hover:bg-blue-400 transition-colors" />
                <div className="text-lg text-slate-300 leading-relaxed text-balance">{point}</div>
              </motion.div>
            ))}
          </motion.div>
        )
    }
  }

  if (slide.type === "cover") {
    return (
      <div className="text-center max-w-4xl mx-auto print-slide">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hs-hero" />
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8 space-y-6">
            {slide.points?.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={index === 0 ? "text-4xl font-bold text-cyan-400 orbitron" : "text-xl text-slate-300"}
              >
                {point}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    )
  }

  if (slide.type === "team") {
    return (
      <div className="max-w-5xl mx-auto print-slide">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-cyan-400 mb-12 text-center orbitron"
        >
          {slide.title}
        </motion.h1>
        <TeamCards />
      </div>
    )
  }

  if (slide.type === "prototype") {
    return (
      <div className="max-w-5xl mx-auto print-slide">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-cyan-400 mb-12 text-center orbitron"
        >
          {slide.title}
        </motion.h1>
        {/* Use the dedicated hardware setup component (Raspberry Pi + Alfa) */}
        <HardwareSetup />
      </div>
    )
  }

  if (slide.type === "qa") {
    return (
      <div className="text-center max-w-4xl mx-auto print-slide">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-5xl font-bold text-cyan-400 mb-8 orbitron"
            animate={{ textShadow: ["0 0 20px #00e5ff", "0 0 30px #00e5ff", "0 0 20px #00e5ff"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Questions & Answers
          </motion.h1>
          <div className="hs-hero scale-75" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-slate-300 mt-8"
          >
            Thank you for your attention
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto print-slide">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-cyan-400 mb-12 text-center orbitron"
      >
        {overrideTitle ?? slide.title}
      </motion.h1>

      {slide.interactive ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {renderInteractiveContent()}
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {slide.points?.map((point, index) => (
            <motion.div key={index} variants={itemVariants} className="flex items-start gap-4 group">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-3 flex-shrink-0 group-hover:bg-blue-400 transition-colors" />
              <div className="text-lg text-slate-300 leading-relaxed text-balance">{point}</div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
