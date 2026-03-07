import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [

    {
        Logo:logo1,
        Heading:"Leadership",
        Description:"Fully committed to the success of the company"
    },
    {
        Logo:logo2,
        Heading:"Responsibility",
        Description:"Fully committed to the success of the company"
    },
     {
        Logo:logo3,
        Heading:"Flexibility",
        Description:"The ability to switch is an important skill"
    },
     {
        Logo:logo4,
        Heading:"Solve the problem",
        Description:"Code your way to a solution"
    }
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-12 mt-10 items-center'>
            
            <div className='w-[45%] flex flex-col'>
                {
                    timeline.map( (element , index ) => {
                        return (
                            <div className='flex flex-row gap-6 m-8' key={index}>

                                <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                    <img src={element.Logo} alt="" />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                                <div>
                                    
                                </div>

                            </div>
                        )
                    } )
                }
            </div>

            <div className='relative shadow-blue-400'>
                <img src={timelineImage}
                 alt="timeLineImage" 
                 className='shadow-white object-cover h-[400px] '
                 />

                 <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-4 left-[50%] translate-x-[-50%] translate-y-[-50%]
                 '>
                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-400 p-6'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-caribbeangreen-200 text-sm'>Years of Experience</p>
                        </div>

                        <div className='flex gap-6 items-center px-7'>
                             <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-200 text-sm'>type of courses</p>
                        </div>
                 </div>
            </div>


        </div>
    </div>
  )
}

export default TimelineSection