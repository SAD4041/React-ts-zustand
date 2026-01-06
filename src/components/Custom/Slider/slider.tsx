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
    className={cn("relative cursor-pointer flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-charcoal-100">
      <SliderPrimitive.Range className="absolute h-full bg-primary-500" />
    </SliderPrimitive.Track>

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

  React.useEffect(() => {
    setInternal(value);
  }, [value]);

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

    const currentMax = internal[1] === "" ? max : Number(internal[1]);
    num = Math.max(min, Math.min(num, currentMax));
    num = Math.round(num / step) * step;

    const next: [number, number] = [num, currentMax];
    setInternal(next);
    onChange(next);
  };

  const commitMax = () => {
    let num = Number(internal[1]);
    if (Number.isNaN(num)) num = max;

    const currentMin = internal[0] === "" ? min : Number(internal[0]);
    num = Math.min(max, Math.max(num, currentMin));
    num = Math.round(num / step) * step;

    const next: [number, number] = [currentMin, num];
    setInternal(next);
    onChange(next);
  };

  const handleSliderChange = (vals: number[]) => {
    const next: [number, number] = [vals[0], vals[1]];
    setInternal(next);
    onChange(next);
  };

  const sliderValue: [number, number] = [
    internal[0] === "" ? min : Number(internal[0]),
    internal[1] === "" ? max : Number(internal[1]),
  ];

  return (
    <div className="space-y-2">
      {/* Box */}
      <div
        className="
          grid h-13 w-full items-center cursor-pointer
          rounded-full border border-border bg-card shadow-sm
          px-4 md:px-6
          [grid-template-columns:auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto]
        "
      >
        {/* از */}
        <span className="text-[12px] md:text-[13px] text-charcoal-400 whitespace-nowrap">
          از
        </span>

        <input
          type="number"
          value={internal[0]}
          onChange={handleMinChange}
          onBlur={commitMin}
          min={min}
          max={internal[1] === "" ? max : Number(internal[1])}
          step={step}
          className="
            min-w-0 w-full bg-transparent text-center outline-none
            text-[13px] md:text-[15px]
            font-bold text-charcoal-700
            px-2 md:px-3
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        {/* تا */}
        <span className="text-[12px] md:text-[13px] text-charcoal-400 whitespace-nowrap">
          تا
        </span>

        <input
          type="number"
          value={internal[1]}
          onChange={handleMaxChange}
          onBlur={commitMax}
          min={internal[0] === "" ? min : Number(internal[0])}
          max={max}
          step={step}
          className="
            min-w-0 w-full bg-transparent text-center outline-none
            text-[13px] md:text-[15px]
            font-bold text-charcoal-700
            px-2 md:px-3
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        {/* تومان */}
        <span className="text-[12px] md:text-[13px] text-charcoal-400 whitespace-nowrap">
          تومان
        </span>
      </div>

      {/* Slider */}
      <Slider
        dir="rtl"
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        onValueChange={handleSliderChange}
        className="w-full"
      />
    </div>
  );
};
