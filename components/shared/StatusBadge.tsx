import React from 'react'

import { BabyType } from '../../types/babyType'

interface StatusBadgeProps {
  baby: BabyType
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ baby }) => {
  return (
    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
      <span
        aria-hidden
        className={`rounded-ful absolute inset-0 rounded-full opacity-50 ${
          baby.status.category === 'Normal' ? 'bg-red-200 text-red-900' : 'bg-teal-200'
        }`}
      ></span>
      <span className="relative">{baby.status ? 'Normal' : 'Severely Underweight'}</span>
    </span>
  )
}

export default StatusBadge
