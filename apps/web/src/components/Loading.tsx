import React from 'react'
import { motion } from 'framer-motion'

const Loading: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-white"
      aria-label="Loading..."
      role="status"
    >
      <motion.div
        className="w-16 h-16 md:w-12 md:h-12 border-4 border-orange-500 border-t-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: [0.4, 0, 0.2, 1], // Ease-out for a smoother finish
        }}
      />
    </div>
  )
}

export default Loading
