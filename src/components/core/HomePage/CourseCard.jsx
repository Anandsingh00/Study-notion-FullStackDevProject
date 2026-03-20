import React from "react";
import { MdPeople } from "react-icons/md";
import { PiTreeViewFill } from "react-icons/pi";
const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {

  const isActive = currentCard === cardData.heading;

  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`
        w-[300px] h-[280px]  p-6 cursor-pointer
        transition-all duration-300 flex flex-col justify-between
        
        ${isActive 
          ? "bg-white text-richblack-900 shadow-2xl scale-105 z-10 " 
          : "bg-richblack-800 text-richblack-25 "
        }
      `}
    >
      {/* Top Content */}
      <div>
        <h3
          className={`text-lg font-semibold mb-3 ${
          isActive ? "text-richblack-900" : "text-richblack-25"
          }`}
        >
          {cardData.heading}
        </h3>

        <p
          className={`text-md leading-6 opacity-80 font-inter font-medium ${
          isActive ? "text-richblack-700" : "text-richblack-400"
          }`}
        >
        {cardData.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div
        className={`flex justify-between items-center text-sm pt-6 border-t border-dashed 
        ${isActive ? "border-richblack-200" : "border-richblack-400"}`}
      >
        <p
          className={`flex items-center gap-2 ${
            isActive ? "text-blue-500" : "text-richblack-400"
          }`}
        >
          <MdPeople size={20} />
          {cardData.level}
        </p>

        <p
          className={`flex items-center gap-2  ${
            isActive ? "text-blue-500" : "text-richblack-400"
          }`}
        >
          <PiTreeViewFill size={20} />
          {cardData.lessonNumber} Lessons
        </p>
      </div>
    </div>
  );
};

export default CourseCard;