import React, { useState } from "react";
import CalendarContainer from "./CalendarContainer";
import convertToPersianDigits from "@/utils/convertToPersianDigits";

const CircularProgress = ({
  percentage = 15,
  size = 200,
  strokeWidth = 16,
  onPercentageClick,
  isEditing,
  inputValue,
  onInputChange,
  onInputBlur,
  onInputKeyDown,
}: any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center ">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FF7700"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Center content - either text or input */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isEditing ? (
          <input
            type="number"
            value={inputValue}
            onChange={onInputChange}
            onBlur={onInputBlur}
            onKeyDown={onInputKeyDown}
            min="0"
            max="100"
            autoFocus
            className="w-24 text-4xl font-bold text-primary text-center border-2 border-primary rounded-lg outline-none bg-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
        ) : (
          <span
            onClick={onPercentageClick}
            className="text-4xl font-bold text-primary cursor-pointer hover:text-primary select-none"
          >
            {convertToPersianDigits(String(percentage))}%
          </span>
        )}
      </div>
    </div>
  );
};
export default CircularProgress;
// export default function Appp() {
// const [percentage, setPercentage] = useState(15);
// const [isEditing, setIsEditing] = useState(false);
// const [inputValue, setInputValue] = useState("15");

// const handlePercentageClick = () => {
//   setIsEditing(true);
//   setInputValue(percentage.toString());
// };

// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setInputValue(e.target.value);
// };

// const handleInputBlur = () => {
//   const newValue = parseInt(inputValue);
//   if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
//     setPercentage(newValue);
//   } else {
//     setInputValue(percentage.toString());
//   }
//   setIsEditing(false);
// };

// const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//   if (e.key === "Enter") {
//     handleInputBlur();
//   } else if (e.key === "Escape") {
//     setInputValue(percentage.toString());
//     setIsEditing(false);
//   }
// };

//   return (
//     <>
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
// <CircularProgress
//   percentage={percentage}
//   size={200}
//   strokeWidth={16}
//   onPercentageClick={handlePercentageClick}
//   isEditing={isEditing}
//   inputValue={inputValue}
//   onInputChange={handleInputChange}
//   onInputBlur={handleInputBlur}
//   onInputKeyDown={handleInputKeyDown}
// />
//       </div>
//       <CalendarContainer
//         arr2={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
//       />
//     </>
//   );
// }
