// src/components/ChallengeManagement/DateAndLocation.tsx

import React from "react";
import { Calendar, MapPin } from "lucide-react";
import type { DateAndLocationProps } from "@/types/challengeElementsTypes";


const DateAndLocation: React.FC<DateAndLocationProps> = ({ dateRange, location }) => {
  return (
    <div className="space-y-4 mt-6 mb-4 text-right w-full max-w-xl">
      <div className="flex items-center text-sm text-gray-text justify-end w-full">
        <p>{dateRange}</p>
        <Calendar className="w-6 h-6 m-1 text-primary" />
      </div>
      <div className="flex items-center text-sm text-gray-text justify-end w-full">
        <p>{location}</p>
        <MapPin className="w-6 h-6 m-1 text-primary" />
      </div>
    </div>
  );
};

export default DateAndLocation;
