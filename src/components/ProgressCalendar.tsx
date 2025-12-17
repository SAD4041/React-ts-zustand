import { useState } from "react";
import CalendarContainer from "./Custom/CalendarContainer";
import CircularProgress from "./Custom/ProgressBar";
import BackButtonAndMenu from "./ChallengeManagement/info/BackButtonAndMenu";

import DayFraction from "./Custom/DayFraction";
import Diagram from "./Custom/Diagram";
import FeelingOverview from "./Custom/FeelingOverview";
import { mockCalendarDays } from "@/data/mockCalendar";

const mockDays = mockCalendarDays;
const ProgressCalendar = () => {
  const [completeness, setCompleteness] = useState<number>(0);
  const [loyalty, setLoyalty] = useState<number>(0);
  const [percentage, setPercentage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(percentage));
  const [challengeInfo, setChallengeInfo] = useState<{
    title: string;
    description: string;
    dateRange: string;
    location: string;
    freq: number;
  }>({
    title: "عنوان چالش",
    description:
      "این چالش برای آزمایش استقامت و مهارت‌های حل مسئله شما طراحی شده است. سفر شامل پیمودن زمین‌های سخت و غلبه بر موانع مختلف است. آیا آماده‌اید تا این ماجراجویی را شروع کنید و مرزهای خود را بسنجید؟",
    dateRange: "از 28 اردیبهشت تا 8 شهریور - سه روز در هفته",
    location: "قله کوه اورست",
    freq: 2,
  });
  const [up, setUp] = useState<number>(0);

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
    <div className="p-4 bg-light-orange">
      <BackButtonAndMenu />
      <p className="mt-15 text-right text-3xl font-bold">
        {challengeInfo.title}
      </p>
      <CalendarContainer
        classname="mt-10 "
        arr2={mockDays}
        setPercentage={setPercentage}
        setUp={setUp}
        freq={challengeInfo.freq}
      />
      <div className="border border-black py-2 px-5 mt-10 bg-light-blue-challengestats shadow-card rounded-md">
        <p className="text-2xl font-medium text-right mb-5">
          !چالش خودت رو تا اینجا ارزیابی کن
        </p>
        <div className="flex justify-center items-center">
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
        </div>

        <DayFraction up={up} down={7} />
      </div>
      <Diagram freq={100} />
      <FeelingOverview />
    </div>
  );
};
export default ProgressCalendar;
