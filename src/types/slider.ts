// src/types/Slider.ts

export interface PriceRangeSliderProps {
  // مقدار رنج از بیرون
  value: [number, number];

  // وقتی مقدار عوض شد به والد خبر می‌دهیم
  onChange: (value: [number, number]) => void;

  min: number;
  max: number;
  step?: number;
}
