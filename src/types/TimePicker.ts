// src/types/TimePicker.ts

// ساعت / دقیقه داخلی
export type SingleTime = {
  hour: number;   // 0..23
  minute: number; // فقط 0 یا 30
};

// پروپس رولر یک زمان
export interface SingleTimeRollerProps {
  value?: string;                // "HH:MM"
  onChange?: (value: string) => void;
}

// پروپس تایم‌پیکر رنج (از / تا)
export interface TimePickerRollerProps {
  from?: string;
  to?: string;
  onChangeFrom?: (value: string) => void;
  onChangeTo?: (value: string) => void;
  onClose?: () => void;
}
