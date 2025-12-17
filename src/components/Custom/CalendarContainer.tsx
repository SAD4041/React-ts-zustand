import CalendarDay from "./CalendarDay";
import arrowLeft from "@/assets/Img/Icon/ArrLeft.svg";
import arrowRight from "@/assets/Img/Icon/ArrRight.svg";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { CalendarDayProps } from "@/types/calendarDay";
import { set } from "react-hook-form";

export interface CalendarContainerProps {
  arr2: CalendarDayProps[]; // or DateObject[] if you have your own type
  setPercentage: (percentage: number) => void;
  classname?: string;
  setUp: (up: number) => void;
  freq: number;
}

const CalendarContainer = ({
  arr2,
  setPercentage,
  classname,
  setUp,
  freq,
}: CalendarContainerProps) => {
  const [day, setDay] = useState<number | null>(null);
  const [startDay, setStartDay] = useState(arr2[0].day);
  const [currentDays, setCurrenctDays] = useState<CalendarDayProps[]>(() =>
    generateDays(arr2[0].day)
  );
  const [nextDays, setNextDays] = useState<CalendarDayProps[]>([]);
  const [direction, setDirection] = useState<"" | "left" | "right">("");
  const [isAnimating, setIsAnimating] = useState(false);
  const DAYS_TO_SHOW = 7;
  console.log(arr2);

  function generateDays(startDay2: number): CalendarDayProps[] {
    const res: CalendarDayProps[] = [];
    for (let x = 0; x < arr2.length; x++) {
      if (arr2[x].day === startDay2) {
        console.log(arr2[x]);

        for (let y = 0; y < 7 && x + y < arr2.length; y++) {
          res.push(arr2[x + y]);
        }
        return res;
      }
    }
    return [];
  }
  useEffect(() => {
    if (day === null) {
      let sum = 0;
      let count = 0;
      for (let x of currentDays) {
        sum += x.percentage;
        if (x.percentage == 100) count++;
      }
      setUp(count);
      setPercentage(Math.floor((count * 100) / 7));
      return;
    }
    for (let x of currentDays) {
      if (x.day == day) setPercentage(x.percentage);
    }
  }, [day, currentDays]);

  const goNext = () => {
    if (isAnimating) return;
    setDirection("left");
    setIsAnimating(true);

    const newStart = startDay + 7;
    const generateDays2 = generateDays(newStart);
    console.log("fuck", generateDays2);

    setNextDays(generateDays2);
    setDay(null);

    setTimeout(() => {
      setStartDay(newStart);
      setCurrenctDays(generateDays2);
      setDirection("");
      setIsAnimating(false);
    }, 300);
  };

  const goPrev = () => {
    if (isAnimating) return;
    setDirection("right");
    setIsAnimating(true);

    const newStart = startDay - 7;
    const generateDays2 = generateDays(newStart);

    setNextDays(generateDays2);

    setTimeout(() => {
      setStartDay(newStart);
      setCurrenctDays(generateDays2);
      setDirection("");
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      className={cn(
        "relative flex items-center overflow-hidden justify-between bg-calendar  rounded-xl h-[90px] py-3 border-2 border-black",
        classname
      )}
    >
      {/* Arrows */}
      <img
        onClick={goPrev}
        src={arrowLeft}
        className="relative z-20 cursor-pointer"
        alt="prev"
      />

      {/* Current panel */}
      <div
        className={cn(
          "absolute left-0 top-0 w-full h-full flex items-center justify-start pointer-events-none",
          direction === "left"
            ? "carousel-exit-left"
            : direction === "right"
              ? "carousel-exit-right"
              : ""
        )}
      >
        <div className="w-full  flex items-center justify-start pointer-events-auto px-6">
          {currentDays.map((x) => (
            <CalendarDay
              key={x.day}
              num={x.day}
              cDay={day}
              setDay={setDay}
              highlight={x.day === day}
            />
          ))}
        </div>
      </div>

      {/* Entering panel */}
      {direction && (
        <div
          className={cn(
            "absolute left-0 top-0 w-full h-full flex items-center justify-start pointer-events-none",
            direction === "left"
              ? "carousel-enter-right"
              : "carousel-enter-left"
          )}
        >
          <div className="w-full flex items-center justify-start pointer-events-auto px-6">
            {nextDays.map((x) => (
              <CalendarDay
                key={x.day}
                num={x.day}
                cDay={day}
                setDay={setDay}
                highlight={x.day === day}
              />
            ))}
          </div>
        </div>
      )}

      <img
        onClick={goNext}
        src={arrowRight}
        className="relative z-20 cursor-pointer"
        alt="next"
      />
    </div>
  );
};

export default CalendarContainer;
