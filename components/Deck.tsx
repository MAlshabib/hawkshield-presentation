"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Slide from "./Slide"
import { slides } from "@/data/slides"
import type { ZoomArchitectureRef } from "./ZoomArchitecture"

export default function Deck() {
  const visibleSlides = slides.filter(s => !s.hidden)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [archDrillActive, setArchDrillActive] = useState(false)
  const zoomArchitectureRef = useRef<ZoomArchitectureRef>(null)

  const nextSlide = useCallback(() => {
    // If we're on the zoom-architecture slide and drill is active, exit drill first
    if (visibleSlides[currentSlide].interactive === "zoom-architecture" && archDrillActive) {
      zoomArchitectureRef.current?.exitToOverview()
      return
    }
    setCurrentSlide((prev) => (prev + 1) % visibleSlides.length)
  }, [currentSlide, archDrillActive, visibleSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + visibleSlides.length) % visibleSlides.length)
  }, [visibleSlides])

  const handleDrillChange = useCallback((active: boolean) => {
    setArchDrillActive(active)
  }, [])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
        case " ":
          event.preventDefault()
          nextSlide()
          break
        case "ArrowLeft":
          event.preventDefault()
          prevSlide()
          break
      }
    },
    [nextSlide, prevSlide],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  const progressPercentage = ((currentSlide + 1) / visibleSlides.length) * 100

  return (
    <div className="min-h-screen relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50 no-print">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>



      {/* Main Slide Area */}
      <div className="flex min-h-screen">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="h-screen flex items-center justify-center p-8"
            >
              <Slide 
                slide={visibleSlides[currentSlide]} 
                slideNumber={currentSlide + 1} 
                totalSlides={visibleSlides.length}
                zoomArchitectureRef={zoomArchitectureRef}
                onDrillChange={handleDrillChange}
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 no-print">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="bg-slate-800/80 border-slate-600 hover:bg-slate-700 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-lg border border-slate-600">
          <span className="text-sm text-slate-300">
            {currentSlide + 1} / {visibleSlides.length}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          disabled={currentSlide === visibleSlides.length - 1}
          className="bg-slate-800/80 border-slate-600 hover:bg-slate-700 disabled:opacity-50"
        >
          {visibleSlides[currentSlide].interactive === "zoom-architecture" && archDrillActive ? "Exit Drill" : "Next"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #00e5ff 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, #00e5ff 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, #3b82f6 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  )
}
