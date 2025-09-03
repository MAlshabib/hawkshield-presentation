"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface SlideImageProps {
  src: string
  alt: string
  caption?: string
}

export default function SlideImage({ src, alt, caption }: SlideImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-center"
    >
      <div className="relative group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="relative overflow-hidden rounded-2xl bg-slate-800 p-4"
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={300}
            height={200}
            className="rounded-lg object-cover"
            placeholder="blur"
            blurDataURL="/computer-hardware.png"
          />
          <motion.div
            className="absolute inset-0 bg-cyan-400/10 rounded-2xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        {caption && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-slate-400 mt-3"
          >
            {caption}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
