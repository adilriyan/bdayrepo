import React from 'react'

export interface CakeFoodProps {
  kind: string
}

export const CakeFood: React.FC<CakeFoodProps> = ({ kind }) => {
  return (
    <span className={`food-icon food-${kind.replace(/\s+/g, '-')}`} aria-hidden="true">
      <i />
      <b />
      <em />
    </span>
  )
}

