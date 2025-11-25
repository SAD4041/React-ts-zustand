import { useState } from "react";
import CalendarContainer from "./Custom/CalendarContainer";
import { progressPercentage } from "motion/react";
import CircularProgress from "./Custom/ProgressBar";

const mockDays = [
  { month: "Jul", day: 12 },
  { month: "Jul", day: 13 },
  { month: "Jul", day: 14 },
  { month: "Jul", day: 15 },
  { month: "Jul", day: 16 },
  { month: "Jul", day: 17 },
  { month: "Jul", day: 18 },
  { month: "Jul", day: 19 },
  { month: "Jul", day: 20 },
  { month: "Jul", day: 21 },
  { month: "Jul", day: 22 },
  { month: "Jul", day: 23 },
  { month: "Jul", day: 24 },
  { month: "Jul", day: 25 },
  { month: "Jul", day: 26 },
  { month: "Jul", day: 27 },
];

const ProgressCalendar = () => {
  const [completeness, setCompleteness] = useState<number>(0);
  const [loyalty, setLoyalty] = useState<number>(0);
  const [percentage, setPercentage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(percentage));

  const handlePercentageClick = () => {
    setIsEditing(true);
    setInputValue(percentage.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const newValue = parseInt(inputValue);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setPercentage(newValue);
    } else {
      setInputValue(percentage.toString());
    }
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    } else if (e.key === "Escape") {
      setInputValue(percentage.toString());
      setIsEditing(false);
    }
  };
  return (
    <>
      <CalendarContainer arr2={mockDays} />
      <CircularProgress
        percentage={percentage}
        size={200}
        strokeWidth={16}
        onPercentageClick={handlePercentageClick}
        isEditing={isEditing}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onInputBlur={handleInputBlur}
        onInputKeyDown={handleInputKeyDown}
      />
    </>
  );
};
export default ProgressCalendar;
