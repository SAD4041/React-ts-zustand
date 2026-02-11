"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import type { PriceRangeSliderProps } from "@/types/slider";

/* ------------------------ Slider (Shadcn Base) ------------------------ */

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-charcoal-100">
      <SliderPrimitive.Range className="absolute h-full bg-primary-500" />
    </SliderPrimitive.Track>

    {/* دو تا thumb برای رنج */}
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary-500 bg-card shadow-lg transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-focus" />
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary-500 bg-card shadow-lg transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-focus" />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

/* -------------------- PriceRangeSlider With Inputs -------------------- */

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
}) => {
  const [internal, setInternal] = React.useState<[number | "", number | ""]>([
    value[0],
    value[1],
  ]);

  /* همگام‌سازی از والد به داخل */
  React.useEffect(() => {
    setInternal(value);
  }, [value]);

  /* ------------------------ ورودی‌ها ------------------------ */

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInternal([raw === "" ? "" : Number(raw), internal[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInternal([internal[0], raw === "" ? "" : Number(raw)]);
  };

  const commitMin = () => {
    let num = Number(internal[0]);
    if (Number.isNaN(num)) num = min;

    num = Math.max(min, Math.min(num, Number(internal[1])));
    num = Math.round(num / step) * step;

    const next: [number, number] = [num, Number(internal[1])];
    setInternal(next);
    onChange(next);
  };

  const commitMax = () => {
    let num = Number(internal[1]);
    if (Number.isNaN(num)) num = max;

    num = Math.min(max, Math.max(num, Number(internal[0])));
    num = Math.round(num / step) * step;

    const next: [number, number] = [Number(internal[0]), num];
    setInternal(next);
    onChange(next);
  };

  /* ------------------------ اسلایدر ------------------------ */

  const handleSliderChange = (vals: number[]) => {
    const next: [number, number] = [vals[0], vals[1]];
    setInternal(next);
    onChange(next);
  };

  return (
    <div className="space-y-2 text-small">
      {/* --- Box Inputs --- */}
      <div className="relative">
        <div
          className="
            flex h-13 w-full items-center rounded-full border border-border
            bg-card px-6 font-bold text-small text-charcoal-700
            shadow-sm
          "
        >
          {/* از */}
          <span className="ml-2 text-small text-charcoal-400">از</span>

          <input
            type="number"
            value={internal[0]}
            onChange={handleMinChange}
            onBlur={commitMin}
            min={min}
            max={Number(internal[1])}
            step={step}
            className="
              w-24 bg-transparent text-center text-small outline-none
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
            "
          />

          {/* line separator */}
          <span className="mx-4 h-4 w-px bg-charcoal-100" />

          {/* تا */}
          <span className="mx-2 text-small text-charcoal-400">تا</span>

          <input
            type="number"
            value={internal[1]}
            onChange={handleMaxChange}
            onBlur={commitMax}
            min={Number(internal[0])}
            max={max}
            step={step}
            className="
              w-24 bg-transparent text-center text-small outline-none
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
            "
          />

          {/* تومان */}
          <span className="ml-auto text-small text-charcoal-400">تومان</span>
        </div>
      </div>

      {/* اسلایدر */}
      <Slider
        dir="rtl"
        value={[
          internal[0] === "" ? min : Number(internal[0]),
          internal[1] === "" ? max : Number(internal[1]),
        ]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleSliderChange}
        className="w-full"
      />
    </div>
  );
};
