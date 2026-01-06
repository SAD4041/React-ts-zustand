import type { ServiceType } from "./PetSitter";

export const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: "walking", label: "پیاده‌روی" },
  { value: "training", label: "آموزش" },
  { value: "care", label: "نگهداری" },
  { value: "medical", label: "مراقبت‌های پزشکی" },
];
