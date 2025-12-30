"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

import type {
  SingleTime,
  SingleTimeRollerProps,
  TimePickerRollerProps,
} from "@/types/TimePicker";

/* ---------------------- توابع کمکی زمان ---------------------- */

const HOURS_IN_DAY = 24;
const MINUTE_STEP = 30;

/** تبدیل استرینگ "HH:mm" به آبجکت ساعت/دقیقه */
function parseTime(value?: string): SingleTime {
  if (!value) {
    return { hour: 0, minute: 0 };
  }

  const [hStr, mStr] = value.split(":");
  let hour = Number(hStr);
  const rawMinute = Number(mStr ?? "0");

  if (!Number.isFinite(hour) || hour < 0 || hour >= HOURS_IN_DAY) {
    hour = 0;
  }

  const minute = rawMinute === MINUTE_STEP ? MINUTE_STEP : 0;

  return { hour, minute };
}

/** تبدیل آبجکت ساعت/دقیقه به "HH:mm" */
function formatTime({ hour, minute }: SingleTime): string {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

/* ---------------------- رولر تک‌زمان (HH / MM) ---------------------- */

const SingleTimeRoller: React.FC<SingleTimeRollerProps> = ({
  value,
  onChange,
}) => {
  const parsedTime = React.useMemo(() => parseTime(value), [value]);

  const [state, setState] = React.useState<SingleTime>(parsedTime);

  React.useEffect(() => {
    setState(parsedTime);
  }, [parsedTime]);

  const emit = (next: SingleTime) => {
    setState(next);
    onChange?.(formatTime(next));
  };

  const incHour = () => {
    const nextHour = (state.hour + 1) % HOURS_IN_DAY;
    emit({ ...state, hour: nextHour });
  };

  const decHour = () => {
    const nextHour = (state.hour + HOURS_IN_DAY - 1) % HOURS_IN_DAY;
    emit({ ...state, hour: nextHour });
  };

  const toggleMinute = () => {
    const nextMinute = state.minute === 0 ? MINUTE_STEP : 0;
    emit({ ...state, minute: nextMinute });
  };

  const H = state.hour.toString().padStart(2, "0");
  const M = state.minute.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1" dir="ltr">
      {/* فلش‌های بالا */}
      <div className="flex items-center gap-6">
        {/* ساعت */}
        <button
          type="button"
          onClick={incHour}
          className="text-primary-500 transition-colors hover:text-primary-600"
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        {/* دقیقه */}
        <button
          type="button"
          onClick={toggleMinute}
          className="text-primary-500 transition-colors hover:text-primary-600"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>

      {/* نمایش عددی */}
      <div className="flex items-center gap-3 text-normal font-semibold text-charcoal-800 tabular-nums">
        <span className="w-8 text-center">{H}</span>
        <span className="text-small text-charcoal-500">:</span>
        <span className="w-8 text-center">{M}</span>
      </div>

      {/* فلش‌های پایین */}
      <div className="flex items-center gap-6">
        {/* ساعت */}
        <button
          type="button"
          onClick={decHour}
          className="text-primary-500 transition-colors hover:text-primary-600"
        >
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* دقیقه */}
        <button
          type="button"
          onClick={toggleMinute}
          className="text-primary-500 transition-colors hover:text-primary-600"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

/* ---------------------- تایم‌پیکر بازه‌ای (از / تا) ---------------------- */

export const TimePickerRoller: React.FC<TimePickerRollerProps> = ({
  from,
  to,
  onChangeFrom,
  onChangeTo,
  onClose,
}) => {
  return (
    <div className="rounded-xl border border-border bg-card px-6 py-4 shadow-lg">
      {/* از / تا */}
      <div className="flex items-center justify-center gap-8">
        {/* از */}
        <div className="flex items-center gap-3">
          <span className="text-small text-charcoal-500">از</span>
          <SingleTimeRoller value={from} onChange={onChangeFrom} />
        </div>

        {/* تا */}
        <div className="flex items-center gap-3">
          <span className="text-small text-charcoal-500">تا</span>
          <SingleTimeRoller value={to} onChange={onChangeTo} />
        </div>
      </div>

      {/* دکمه بستن – پایین، سمت راست در RTL */}
      {onClose && (
        <div className="mt-4 flex justify-end" dir="rtl">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full cursor-pointer bg-primary-100 px-5 py-1.5 text-small font-medium text-primary-600 transition-colors hover:bg-primary-200"
          >
            بستن
          </button>
        </div>
      )}
    </div>
  );
};
