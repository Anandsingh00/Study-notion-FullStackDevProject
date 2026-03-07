import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import {Link} from "react-router-dom";
import {HighlightText} from "../components/core/HomePage/HighlightText";
import {CTAButton} from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import  CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"

function Home() {
  return (
    <div className='min-h-[200vh] pb-40'>

        {/* section-1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between '>

            <Link to={"/signup"}>
              <div className='group mt-12 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit 
                hover:shadow-lg hover:shadow-richblack-500/20'>

                    <div className='flex flex-row items-center gap-5 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an instructor</p>
                        <FaArrowRight /> 
                    </div>
                </div>
            </Link>

        <div className='text-center text-4xl font-semibold mt-6'>
            Empower Your Future with 
            <HighlightText text={" Coding Skills"}/>
        </div>
            
        <div className='w-[80%] mt-4 text-center text-lg font-bold text-richblack-300 '>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 

        </div>

        <div className='flex flex-row mt-8 gap-7'>
            {/* create two button components */}
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>

        </div>

        <div className='mx-3 my-12 shadow-blue-200  w-full max-w-[900px]'>
            <video
            muted
            loop
            autoPlay
            >
                <source src={Banner}></source>

            </video>
        </div>

        {/* code section-1 */}
        <div>
            <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock Your 
                        <HighlightText text={" Coding Potential "}/>
                        with our online courses
                    </div>
                }
                subheading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "Try it Yourself",
                        linkto: "/signup",
                        active:true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn More",
                        linkto: "/login",
                        active:false,
                    }
                }

                codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={"text-yellow-25"}
            />
        </div>

        {/* code section-2 */}
        <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start  
                        <HighlightText text={" coding in seconds "}/>
                    </div>
                }
                subheading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={
                    {
                        btnText: "Continue Lessons",
                        linkto: "/signup",
                        active:true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn More",
                        linkto: "/login",
                        active:false,
                    }
                }
                codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={"text-yellow-25"}
            />
        </div>

        </div>

      

        {/* section-2 */}
        <div className='bg-pure-greys-5 text-richblack-700 min-h-screen'>
           

            <div className='mx-auto w-11/12 max-w-maxContent flex-col items-center justify-between gap-7 '>
            
            <div className='flex flex-row gap-5 mt-[90px]'>
                <div className='text-4xl font-inter font-semibold w-[600px] text-richblack-900'>
                    Get the Skills you need for a 
                    <HighlightText text={" job that is in demand."}/>
                </div>
                
                <div className='w-[500px] gap-10 text-richblack-700 flex flex-col items-start font-inter'>
                    <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                         <CTAButton active={true} linkto={"/signup"}>
                        <div >
                                Learn More
                        </div>
                    </CTAButton>
                </div>
            </div>

            <TimelineSection/>
            {/* <LearningLanguageSection/> */}

            </div>


        </div>

        {/* section-3 */}


        {/*footer */}

                
    </div>
    
  )
}

export default Home