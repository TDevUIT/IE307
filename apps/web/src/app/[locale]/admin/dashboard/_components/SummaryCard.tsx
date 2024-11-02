// SummaryCard.tsx
import React from 'react'

interface SummaryCardProps {
  title: string
  count: number
  icon?: React.ReactNode
  bgColor?: string
  onClick?: () => void
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, icon, bgColor = 'bg-gray-200', onClick }) => (
  <div onClick={onClick} className={`p-6 rounded-lg shadow-lg ${bgColor} hover:shadow-xl transition-shadow duration-300 cursor-pointer`}>
    <div className="flex items-center space-x-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{count}</p>
      </div>
    </div>
  </div>
)

export default SummaryCard
