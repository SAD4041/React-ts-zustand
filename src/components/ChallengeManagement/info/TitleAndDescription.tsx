// components/ChallengeManagement/ChallengeDescription.tsx
import React from "react";
import type { ChallengeDescriptionProps } from "@/types/challengeElementsTypes";

const TitleAndDescription: React.FC<ChallengeDescriptionProps> = ({
  title,
  description,
}) => {
  return (
    <div className="text-right mb-6 mt-6 max-w-2xl w-full" dir="rtl">
      <h1 className="text-2xl font-semibold text-black mb-4">{title}</h1>
      <p className="text-md text-gray-700 text-justify">{description}</p>
    </div>
  );
};

export default TitleAndDescription;
