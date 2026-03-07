import React from "react";
import { FaUser, FaBook } from "react-icons/fa";

const CourseCard = ({ title, description, level, lessons, active }) => {
  return (
    <div
      className={`relative w-[300px] p-6 transition-all duration-300
        ${
          active
            ? "bg-white text-richblack-900 shadow-2xl"
            : "bg-richblack-800 text-white"
        }`}
    >
      {/* Highlight strip */}
      {active && (
        <div className="absolute right-0 top-0 h-full w-2 bg-yellow-400" />
      )}

      <h3 className="text-lg font-semibold">{title}</h3>

      <p
        className={`mt-3 text-sm leading-6 ${
          active ? "text-richblack-600" : "text-richblack-300"
        }`}
      >
        {description}
        
      </p>

      <div
        className={`mt-6 flex justify-between text-sm ${
          active ? "text-richblack-700" : "text-richblack-400"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaUser />
          <span>{level}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaBook />
          <span>{lessons} Lessons</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
