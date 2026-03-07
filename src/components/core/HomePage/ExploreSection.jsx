import React from "react";
import CourseCard from "./CourseCard";
import {CTAButton} from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

const ExploreSection = () => {
  return (
    <div className="relative w-full">
      
      {/* ---------- HERO SECTION ---------- */}
      <div className="bg-richblack-900 py-24 text-center">
        <h2 className="text-4xl font-semibold text-white">
          Unlock the <span className="text-cyan-400">Power of Code</span>
        </h2>

        <p className="mt-3 text-richblack-300">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* ---------- FLOATING CARDS ---------- */}
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 w-11/12 max-w-6xl">
        <div className="flex justify-center gap-6">
          <CourseCard
            title="Learn HTML"
            description="This course covers the basic concepts of HTML including creating and structuring web pages."
            level="Beginner"
            lessons={6}
            active={true}
          />

          <CourseCard
            title="Learn CSS"
            description="This course explores advanced topics in HTML5 and CSS3, including animations and layouts."
            level="Beginner"
            lessons={6}
            active={false}
          />

          <CourseCard
            title="Responsive Web Design"
            description="Learn responsive design techniques to adapt layouts for different devices and screen sizes."
            level="Beginner"
            lessons={6}
            active={false}
          />
        </div>
      </div>

      {/* ---------- CTA SECTION ---------- */}
      <div className="pt-56 pb-20 bg-richblack-50 text-center">
        <div className="flex justify-center gap-6">
          <CTAButton active={true} linkto="/signup">
            <div className="flex items-center gap-2">
              Explore Full Catalog <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={false} linkto="/signup">
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
