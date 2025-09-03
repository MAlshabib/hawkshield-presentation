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
    points: ["HawkShield | Wi-Fi Intrusion Prevention System", "AI-powered real-time Wi-Fi defense"],
    note: "Welcome to HawkShield presentation. This is our AI-powered Wi-Fi security solution.",
  },
  {
  id: 2,
  title: "Table of Contents",
  points: [
    "Introduction & Motivation",
    "Problem Statement",
    "Proposed Solution",
    "System Architecture (drill-down)",
    "Data & Preprocessing",
    "Features",
    "Models & Evaluation",
    "Prototype (Hardware)",
    "Impact & Value",
    "Team & Roles",
    "Scope & Ethics",
    "RAG System",
    "Q&A"
  ],
  note: "Compact TOC: keep only the essentials. 'Live Demo' is intentionally omitted here, but the slide still exists.",
  interactive: "toc"
},
  {
    id: 3,
    title: "Introduction & Motivation",
    interactive: "intro-motivation",
    points: [
      "Wi-Fi = essential infrastructure",
      "Attacks are cheap and easy",
      "Rule-based IDS → outdated",
      "Need: adaptive, intelligent, real-time defense",
    ],
    note: "Wi-Fi security is critical as attacks become more sophisticated and traditional rule-based systems fail.",
  },
  {
    id: 4,
    title: "Problem Statement",
    interactive: "problem",
    key: "problem",
    type: "component"
  },
  {
    id: 5,
    title: "Proposed Solution",
    points: [
      "ML-powered IPS for the deployed network (organization's Wi-Fi)",
      "Binary → Attack vs Normal",
      "Multi-class → Attack type",
      "Defense: 100 attack packets per hour → triggers prevention (block/deauth)", // Updated defense logic from 10 packets threshold
      "Mapping: Deauth→Block · EvilTwin→Deauth · RogueAP→Deauth · Re-Assoc→Block · KRACK→Block · SSDP→Block · Others→Deauth+Block",
    ],
    note: "Our ML-based approach provides both detection and automated defense responses with 100 packets per hour threshold.",
    interactive: "solution-flow", // Updated interactive type
  },
  {
    id: 6,
    title: "System Architecture",
    points: [
      "Packet Capture (adapter monitor mode)",
      "Preprocessing (impute, scale, cat-vocab)",
      "Binary → detection · Multi-class → type",
      "Defense module (Block/Deauth)",
      "Frontend ↔️ Backend ↔️ Hardware",
    ],
    note: "End-to-end system from packet capture to automated defense with web interface.",
    interactive: "zoom-architecture", // Updated to use zoom navigation
  },
  {
    id: 7,
    title: "Data Collection",
    points: [
      "Features = ~255 (raw AWID-style capture)", // Updated from Features = 9
      "Data was self-collected in an isolated router environment, structured exactly like AWID but built by our team", // Added clarification about data source
      "Balanced normal vs attack",
      "CSV feature dumps",
    ],
    note: "We created our own balanced dataset with ~255 features by attacking an isolated network environment.",
    interactive: "data-collection", // Updated interactive type
    hidden: true,
  },
  {
    id: 8,
    title: "Preprocessing",
    points: [
      "Numeric imputation + scaling", // Updated formatting
      "Categorical encoding (with 'NA' for unknowns)", // Updated description
      "Enforced feature order for micro-batches", // Updated description
      "Identifier filtering (removing MAC/SSID → better generalization)", // Added identifier filtering
    ],
    note: "Data preprocessing ensures consistent feature representation and better generalization for real-time inference.",
    interactive: "preprocessing-steps", // Added interactive preprocessing visualization
    hidden: true,
  },
  {
    id: 9,
    title: "Features",
    points: [
      "Final selected features subset (top ~20 by importance)", // Updated to show top features by importance
      "Packet Length, Frame Type, Signal Strength, Channel Info, Timestamp Delta", // Added cleaner feature names
      "Protocol Version, Sequence Number, Retry Flag, Beacon Interval, Data Rate", // Added more features
      "Excluded identifiers (MAC/SSID) for better generalization",
    ],
    note: "Feature selection focuses on the most important behavioral patterns rather than identifiers.",
    interactive: "feature-importance", // Added feature importance visualization
    hidden: true,
  },
  {
    id: 10,
    title: "Models",
    points: [
      "LightGBM (Binary + Multi-class) - Main focus", // Updated to emphasize LightGBM as main
      "Alternatives tested: Random Forest & Neural Network", // Added alternatives section
      "RF → slower latency (~2s)", // Added why alternatives were dropped
      "Neural Network → higher training cost, ~3s latency", // Added neural network drawbacks
      "Anomaly detection → less reliable in real-time IPS", // Added anomaly detection mention
    ],
    note: "LightGBM chosen for optimal balance of accuracy and speed required for real-time detection.",
    interactive: "expandable-charts", // Added expandable charts for visualizations
    hidden: true,
  },
  {
    id: 11,
    title: "Results & Evaluation",
    points: [
      "Binary Accuracy ~98.5%", // Formatted performance metrics
      "Multi-class Accuracy 99.8%", // Separated metrics for clarity
      "Macro F1 ~93.9%", // Added F1 score
      "Latency <1s", // Emphasized latency
      "Note: Rogue AP has lower F1 (~0.70) due to limited data", // Added note about Rogue AP performance
    ],
    note: "Strong performance across metrics with sub-second latency, though Rogue AP detection needs more training data.",
    interactive: "performance-dashboard", // Updated interactive type
  },
  {
    id: 12,
    title: "Live Demo",
    type: "demo",
    points: ["live_detect.py · real-time detection (<1s)", "Terminal screenshot (Loaded → Attack Detected)"],
    note: "Demonstration of real-time attack detection in under 1 second.",
    interactive: "demo", // Added live demo animation
  },
  {
    id: 18,
    title: "RAG System for Wi-Fi Packet Analytics & Attack Knowledge", // Added new RAG system slide
    points: [
      "Packet Analytics (structured DB queries) + Attack Knowledge (curated file explanations)",
      "OOS → politely rejects irrelevant queries",
      "Knowledge Sources: PostgreSQL (packet logs) + attacks.txt (documentation)",
      "Pipeline: Classifier → SQL/Docs/OOS → Executor → GPT (gpt-4o) → short, factual answers",
    ],
    note: "RAG system provides intelligent query handling for both packet analytics and attack knowledge base.",
    interactive: "rag-system", // Added RAG system diagram
  },
  {
    id: 13,
    title: "Prototype (Hardware)",
    type: "prototype",
    points: ["NVIDIA Jetson TX1 + Alfa Wi-Fi adapter", "Images drop-in animation"],
    note: "Physical prototype using edge computing hardware for deployment flexibility.",
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
      "💰 Cost efficiency vs. commercial IPS",
      "🏫 Universities, 🏢 Enterprises, 🌆 Smart Cities (NEOM)",
    ],
    note: "Interactive impact view with before/after metrics and outcome badges.",
  },
  {
    id: 15,
    title: "Future Work",
    points: [
      "🔍 More attack types coverage", // Added icons for clarity
      "📊 Better Rogue AP data collection", // Added icon and specific mention
      "🖥️ Dashboard/SIEM integration", // Added icon
      "☁️ Cloud model updates", // Added icon
    ],
    note: "Roadmap includes expanding attack coverage, improving Rogue AP detection, and enterprise integration capabilities.",
    interactive: "future-roadmap", // Added interactive roadmap
  },
  {
    id: 17,
    title: "Scope & Ethics",
    points: [
      "🔒 Protects only the deployed network (admin access)", // Added security icon
      "🚫 No actions on external networks", // Added prohibition icon
      "🛡️ Ethical compliance: metadata-only logging, no personal data stored", // Added third bullet point as requested
    ],
    note: "Ethical deployment limited to authorized networks with proper administrative access and privacy protection.",
    interactive: "ethics-compliance", // Added interactive ethics visualization
    key: "ethics",
    type: "component"

  },
  {
    id: 16,
    title: "Team & Roles",
    type: "team",
    points: [
      "Ghala — Binary model + Frontend", // Kept existing roles but will update interactive component
      "Mohammed — Data + Live detection + Backend", // Removed Data Engineering as requested
      "Yaser — Multi-class model", // Removed Evaluation & Metrics as requested
      "Lina — Integration + 3D prototype case",
      "Haya — RAG", // Removed Documentation as requested
    ],
    note: "Collaborative team effort with specialized roles across ML, development, and integration.",
    interactive: "team-cards", // Updated to use team cards with photos
  },
  {
    id: 19, // Updated Q&A slide number
    title: "Q&A",
    type: "qa",
    points: ["Thank you · glowing logo"],
    note: "Thank you for your attention. Questions and discussion welcome.",
  },
]
