"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Slide from "./Slide"
import { slides } from "@/data/slides"
import type { ZoomArchitectureRef } from "./ZoomArchitecture"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Deck() {
  const visibleSlides = slides.filter(s => !s.hidden)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [archDrillActive, setArchDrillActive] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const zoomArchitectureRef = useRef<ZoomArchitectureRef>(null)
  const isMobile = useIsMobile()

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
      // Disable keyboard navigation on mobile to avoid conflicts
      if (isMobile) return
      
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
        case "Escape":
          if (showMobileMenu) setShowMobileMenu(false)
          break
      }
    },
    [nextSlide, prevSlide, isMobile, showMobileMenu],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  const progressPercentage = ((currentSlide + 1) / visibleSlides.length) * 100

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50 no-print">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 h-10 w-10 sm:h-auto sm:w-auto bg-slate-800/90 border-slate-600 hover:bg-slate-700 no-print backdrop-blur-sm"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      )}

      {/* Mobile Slide Navigator */}
      {isMobile && showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-16 right-3 left-3 sm:top-16 sm:right-4 sm:left-auto sm:w-80 z-40 bg-slate-800/95 border border-slate-600 rounded-xl p-4 max-h-[60vh] overflow-y-auto no-print backdrop-blur-md shadow-2xl"
        >
          <h3 className="text-sm font-semibold text-cyan-400 mb-3">Navigate to slide</h3>
          <div className="space-y-1">
            {visibleSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentSlide(index)
                  setShowMobileMenu(false)
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  index === currentSlide
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <span className="font-medium">{index + 1}.</span> {slide.title || "Cover"}
              </button>
            ))}
          </div>
        </motion.div>
      )}



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
              className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)] sm:pb-[calc(env(safe-area-inset-bottom)+7rem)]"
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
      </div>      {/* Navigation Controls */}
      <div className="fixed bottom-3 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-3 lg:gap-4 no-print px-3 sm:px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="h-10 sm:h-11 px-3 sm:px-4 bg-slate-800/90 border-slate-600 hover:bg-slate-700 disabled:opacity-50 text-xs sm:text-sm backdrop-blur-sm shadow-lg transition-all duration-200"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </Button>

        <div className="flex flex-1 justify-center items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800/90 rounded-lg border border-slate-600 backdrop-blur-sm shadow-lg min-w-[80px] sm:min-w-[100px]">
          <span className="text-xs sm:text-sm font-medium text-slate-300 tabular-nums whitespace-nowrap text-center">
            {currentSlide + 1} / {visibleSlides.length}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          disabled={currentSlide === visibleSlides.length - 1}
          className="h-10 sm:h-11 px-3 sm:px-4 bg-slate-800/90 border-slate-600 hover:bg-slate-700 disabled:opacity-50 text-xs sm:text-sm backdrop-blur-sm shadow-lg transition-all duration-200"
        >
          <span className="hidden sm:inline">{visibleSlides[currentSlide].interactive === "zoom-architecture" && archDrillActive ? "Exit Drill" : "Next"}</span>
          <span className="sm:hidden">{visibleSlides[currentSlide].interactive === "zoom-architecture" && archDrillActive ? "Exit" : "Next"}</span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
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
