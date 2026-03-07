import React from 'react'

export const HighlightText = ({text}) => {
  return (
    // apply gradient in this component #1FA2FF #12D8FA #A6FFCB
    <span className='bg-gradient-to-r from-[#1FA2FF]/80 via-[#12D8FA]/80 to-[#1FA2FF]/80
     bg-clip-text text-transparent  font-bold '>
        {text}
    </span>
  )
}

