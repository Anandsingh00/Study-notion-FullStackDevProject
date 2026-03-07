import React from 'react'
import { CTAButton } from './CTAButton';
import { HighlightText } from './HighlightText';
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({
    position,
    heading ,
    subheading,
    ctabtn1 , ctabtn2 ,
    backgroundGradient ,
    codeColor , codeblock
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
          
      {/* Section - 1 */}
      <div className=' w-[40%] flex flex-col items-start'>
        {heading}
        <div className=' mt-4 max-w-[450px] flex items-start text-richblack-300 '>
          {subheading}
        </div>

        <div className='my-12 flex flex-row gap-4'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btnText}
              <FaArrowRight/>
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              {ctabtn2.btnText}
          </CTAButton>

        </div>

      </div>

      {/* Section - 2 */}
  <div className="relative h-fit flex flex-row w-full py-4 lg:w-[500px]">

    
    <div className="w-full h-[320px] flex flex-row rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden">


      <div className="w-[15%] text-center flex flex-col justify-start py-4 text-richblack-400 font-inter font-bold">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
      </div>

      
      <div className={`w-[85%] py-4 pr-4 font-bold font-mono ${codeColor}`}>
        <TypeAnimation
          sequence={[codeblock, 2000, ""]}
          repeat={Infinity}
          cursor={true}
          omitDeletionAnimation={true}
          style={{
            whiteSpace: "pre-line",
            display: "block",
          }}
        />
      </div>

    </div>
  </div>
    </div>
  )
}

export default CodeBlocks