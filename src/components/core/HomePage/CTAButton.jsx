import React from 'react'
import {Link} from "react-router-dom";


export const CTAButton = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[15px] px-6 py-3 rounded-md font-bold uppercase
            ${active ? "bg-yellow-50 text-black hover:shadow-yellow-500/20": "bg-richblack-800 hover:shadow-richblack-500/20"}
            hover:scale-95 transition-all duration-200 hover:shadow-xl 
            `}>
            {children}
        </div>
    </Link>
  )
}
