import { cn } from "@/lib/utils";

export interface CalendarDayProps {
  num: number;
  highlight?: boolean;
  cDay: number | null;
  setDay: (value: number | null) => void;
  className?: string;
}

const CalendarDay = ({
  num,
  highlight,
  setDay,
  cDay,
  className,
}: CalendarDayProps) => {
  return (
    <div
      className={cn(
        "shrink-0 w-2/17 mt-2 py-2 mx-1 rounded-3xl flex flex-col items-center border-2 border-black bg-white cursor-pointer transition-all translate-y-[-3px] active:translate-y-[3px] active:shadow-button-active",
        highlight && "bg-primary text-white translate-y-[3px]",
        !highlight && "shadow-button",
        className
      )}
      onClick={() => setDay(cDay === num ? null : num)}
    >
      <div className="text-sm">Jan</div>
      <div className="text-lg font-medium">{num}</div>
    </div>
  );
};

export default CalendarDay;
