import React, { useState } from 'react'

export const Filters = ({ filterProducts }) => {
  const handleFilterHighToLow = () => {
    filterProducts('highToLow')
  }

  const handleFilterLowToHigh = () => {
    filterProducts('lowToHigh')
  }

  return (
    <div>
      <button onClick={handleFilterHighToLow}>High to Low</button>
      <button onClick={handleFilterLowToHigh}>Low to High</button>
    </div>
  )
}
