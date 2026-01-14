// src/components/ChallengeManagement/ChallengeSlideshow.tsx

import React from "react";
import CustomButton from "@/components/Custom/CustomButton";
import ChallengeCard from "@/components/Custom/ChallangeCard";
import type { ChallengeSlideshowProps } from "@/types/challengeElementsTypes";


const ChallengeSlideshow: React.FC<ChallengeSlideshowProps> = ({
  currentChallengeIndex,
  mockChallenges,
  nextSlide,
  prevSlide,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto relative">
      {/* Challenge Card */}
      <div className="w-full flex justify-center relative">
        <ChallengeCard
          key={mockChallenges[currentChallengeIndex].id}
          title={mockChallenges[currentChallengeIndex].title}
          description={mockChallenges[currentChallengeIndex].description}
          imageUrl={mockChallenges[currentChallengeIndex].imageUrl}
        />
      </div>

      {/* Slideshow Navigation Buttons */}
      <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2">
        <CustomButton
          className="bg-white text-secondary shadow-none hover:bg-blue-400 p-2 w-7 sm:w-8 md:w-8 rounded-[8px]"
          onClick={prevSlide}
        >
          &#8249;
        </CustomButton>
        <CustomButton
          className="bg-white text-secondary shadow-none hover:bg-blue-400 p-2 w-7 sm:w-8 md:w-8 rounded-[8px]"
          onClick={nextSlide}
        >
          &#8250;
        </CustomButton>
      </div>
    </div>
  );
};

export default ChallengeSlideshow;
