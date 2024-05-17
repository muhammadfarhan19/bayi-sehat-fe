import React from 'react'

interface StatusBadgeProps {
  category: string | undefined
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ category }) => {
  return (
    <span
      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
        category === 'Underweight' ? 'text-black' : 'text-white'
      }`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full ${
          category === 'Normal' ? 'bg-teal-400' : category === 'Underweight' ? 'bg-yellow-400' : 'bg-red-500'
        }`}
      ></span>
      <span className="relative">{category}</span>
    </span>
  )
}

export default StatusBadge
