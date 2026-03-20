import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import { HighlightText } from './HighlightText';
import CourseCard from "./CourseCard";



const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career path"
];

const ExploreMore = () => {

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }

  return (
    <div className="w-full">

      {/* TOP SECTION */}
      <div className="bg-richblack-900 pt-16 pb-52">

        <div className='text-4xl font-semibold text-center text-white'>
          Unlock the
          <HighlightText text={" Power of Code"} />
        </div>

        <p className='text-center text-richblack-300 text-md mt-3'>
          Learn to build anything you can imagine
        </p>

        {/* Tabs */}
        <div className='flex justify-center mt-8'>
          <div className='flex rounded-full bg-richblack-800 p-1 gap-3'>
            {
              tabsName.map((element, index) => (
                <div
                  key={index}
                  onClick={() => setMyCards(element)}
                  className={`px-6 py-2 rounded-full cursor-pointer transition-all duration-200
                  ${currentTab === element
                      ? "bg-richblack-900 text-white"
                      : "text-richblack-300 hover:text-white"
                    }
                  `}
                >
                  {element}
                </div>
              ))
            }
          </div>
        </div>

      </div>

      {/* LIGHT SECTION */}
      <div className="bg-richblack-5 relative pb-20">

        {/* CARDS */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-36 flex flex-row w-full justify-center gap-7">

          {
            courses.map((element, index) => (
              <CourseCard
                key={element.heading}
                cardData={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default ExploreMore;