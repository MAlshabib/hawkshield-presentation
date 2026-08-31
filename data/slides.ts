export interface SlideData {
  id: number
  title?: string
  points?: string[]
  note?: string
  type?: "cover" | "team" | "prototype" | "demo" | "qa" | "default"
  interactive?: string
  hidden?: boolean
}

export const slides: SlideData[] = [
  {
    id: 1,
    type: "cover",
    points: ["HawkShield | Wi-Fi Intrusion Detection System", "AI-powered real-time Wi-Fi threat detection"],
    note: "Welcome to HawkShield presentation. This is our AI-powered Wi-Fi security solution.",
  },
  {
    id: 2,
    title: "Table of Contents",
    points: [
      "Problem Statement",
      "Proposed Solution",
      "Saqr — AI Agent",
      "Why HawkShield",
      "Expected Cost",
      "Business Model",
      "Impact & Value",
      "Team & Roles",
    ],
    note: "Compact overview of the presentation's core sections.",
    interactive: "toc",
  },
  {
    id: 4,
    title: "Problem Statement",
    interactive: "problem",
    key: "problem",
    type: "component",
  },
  {
    id: 5,
    title: "Proposed Solution",
    points: [
      "ML-powered IDS for your Wi-Fi network",
      "Detects attacks in real time — Binary (attack vs. normal) + Multi-class (9 attack types)",
      "Instantly logs and alerts via the dashboard and Saqr, the AI agent",
    ],
    note: "Our ML-based approach delivers accurate, sub-second detection with full visibility through the dashboard and Saqr.",
    interactive: "solution-flow",
  },
  {
    id: 18,
    title: "Saqr — HawkShield's AI Agent",
    points: [
      "An AI Agent, not a plain RAG system — it calls tools and acts, not just retrieves",
      "Answers questions using live packet data + a curated attack knowledge base",
      "Powered by an LLM via OpenRouter for fast, accurate, factual answers",
    ],
    note: "Saqr is an autonomous agent that reasons over data and knowledge to assist analysts in real time.",
    interactive: "rag-system",
  },
  {
    id: 22,
    title: "Why HawkShield",
    points: [
      "Real ML detection — not static, outdated rule-based systems",
      "Sub-millisecond inference, sub-second end-to-end detection",
      "Runs fully on-device on affordable edge hardware — no cloud dependency",
      "Bilingual (Arabic/English) dashboard for full visibility",
      "Comes with Saqr, a built-in AI agent for instant answers",
    ],
    note: "Key differentiators that set HawkShield apart from traditional and commercial IDS/IPS solutions.",
  },
  {
    id: 20,
    title: "Expected Cost",
    points: [
      "Raspberry Pi 4 Model B (4GB) — edge compute unit",
      "ALFA AWUS036ACH Wi-Fi Adapter — monitor + injection",
      "Total hardware cost per unit (SAR)",
    ],
    note: "Simple hardware-only cost in Saudi Riyal (SAR); ML models are already developed.",
    interactive: "project-cost",
  },
  {
    id: 21,
    title: "Business Model",
    points: [
      "Value Propositions, Target Customers, Revenue Streams",
      "Distribution Channels, Cost Structure",
    ],
    note: "Business model summary covering value proposition, customers, revenue, distribution, and cost structure.",
    interactive: "business-model",
  },
  {
    id: 14,
    title: "Impact & Value",
    key: "impact",
    type: "component",
    interactive: "impact",
    points: [
      "⏱ Low latency (<1s)",
      "✅ High accuracy (>98%)",
      "💰 Cost efficiency vs. commercial IDS/IPS",
      "🏫 Universities, 🏢 Enterprises, 🌆 Smart Cities (NEOM)",
    ],
    note: "Interactive impact view with before/after metrics and outcome badges.",
  },
  {
    id: 16,
    title: "Team & Roles",
    type: "team",
    points: [
      "Ghala — Binary model + Frontend",
      "Mohammed — Data + Live detection + Backend",
      "Yaser — Multi-class model",
      "Lena — Integration + 3D prototype case",
      "Haya — Saqr Agent",
    ],
    note: "Collaborative team effort with specialized roles across ML, development, and integration.",
    interactive: "team-cards",
  },
]
