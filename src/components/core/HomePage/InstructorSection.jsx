import React from 'react'
import instructor_image from "../../../assets/Images/Instructor.png";
import {HighlightText} from "./HighlightText"
import { CTAButton } from './CTAButton';
import { FaArrowRight } from 'react-icons/fa6';

const InstructorSection = () => {
  return (
    <div className='flex flex-row items-center gap-28 mt-24'>

      <div>
        <img src={instructor_image} alt="InstructorImage" />
      </div>

      <div className='w-[30%] ml-10'>
        <div className='text-4xl font-semibold'>
          Become an <HighlightText text={"Instructor"}/>
        </div>

        <div className='mt-5 text-left text-richblack-600 text-base font-medium'>
          Instructors from around the world teach millions of students on StudyNotion. 
          We provide the tools and skills to teach what you love.
        </div>

        {/* Button moved here */}
        <div className='mt-20 w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
            <div className='flex flex-row gap-2 items-center'>
                Start Teaching Today
                <FaArrowRight/>
            </div>
          </CTAButton>
        </div>

      </div>

    </div>
  )
}

export default InstructorSection