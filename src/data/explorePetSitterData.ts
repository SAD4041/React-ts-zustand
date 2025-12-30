// src/data/explorePetSitterData.ts
import type { SitterWithTimeAndDate } from "@/types/explorePetSitter";
import type { PetType } from "@/types/PetSitter";

/* -------------------- mock sitters -------------------- */

export const BASE_SITTERS: SitterWithTimeAndDate[] = [
  {
    id: 1,
    name: "پریسا رستمی",
    city: "تهران",
    rating: 4.9,
    reviewsCount: 13,
    pricePerNight: 250000,
    pets: ["dog", "cat"],
    services: ["walking", "care"],
    experienceYears: 3,
    availableFrom: "09:00",
    availableTo: "20:00",
    availableDates: ["1404/09/10", "1404/09/11", "1404/09/15"],
  },
  {
    id: 2,
    name: "سارا امیری",
    city: "شیراز",
    rating: 4.7,
    reviewsCount: 9,
    pricePerNight: 180000,
    pets: ["cat"],
    services: ["care"],
    experienceYears: 2,
    availableFrom: "10:00",
    availableTo: "18:00",
    availableDates: ["1404/09/11", "1404/09/12"],
  },
  {
    id: 3,
    name: "امیر سلیمانی",
    city: "تهران",
    rating: 4.4,
    reviewsCount: 21,
    pricePerNight: 150000,
    pets: ["dog"],
    services: ["walking"],
    experienceYears: 5,
    availableFrom: "08:00",
    availableTo: "16:00",
    availableDates: ["1404/09/13", "1404/09/20"],
  },
  {
    id: 4,
    name: "مهتاب رضایی",
    city: "کرج",
    rating: 4.8,
    reviewsCount: 17,
    pricePerNight: 320000,
    pets: ["dog", "cat", "bird"],
    services: ["medical", "care"],
    experienceYears: 4,
    availableFrom: "12:00",
    availableTo: "23:00",
    availableDates: ["1404/09/10", "1404/09/11", "1404/09/25"],
  },
  {
    id: 5,
    name: "مریم نوری",
    city: "اصفهان",
    rating: 4.2,
    reviewsCount: 7,
    pricePerNight: 120000,
    pets: ["bird", "rodent"],
    services: ["care"],
    experienceYears: 1,
    availableFrom: "07:30",
    availableTo: "15:30",
    availableDates: ["1404/09/12", "1404/09/18"],
  },
];

export const MOCK_SITTERS: SitterWithTimeAndDate[] = Array.from(
  { length: 60 },
  (_, idx) => {
    const base = BASE_SITTERS[idx % BASE_SITTERS.length];
    const round = Math.floor(idx / BASE_SITTERS.length);
    const priceBump = round * 20000;

    return {
      ...base,
      id: idx + 1,
      name: `${base.name} ${idx + 1}`,
      pricePerNight: base.pricePerNight + priceBump,
      reviewsCount: base.reviewsCount + round * 3,
      experienceYears: base.experienceYears + round,
    };
  }
);

/* -------------------- price range -------------------- */

export const GLOBAL_MIN_PRICE = Math.min(
  ...MOCK_SITTERS.map((s) => s.pricePerNight)
);
export const GLOBAL_MAX_PRICE = Math.max(
  ...MOCK_SITTERS.map((s) => s.pricePerNight)
);

export const PET_OPTIONS: { value: PetType; label: string }[] = [
  { value: "dog", label: "سگ" },
  { value: "cat", label: "گربه" },
  { value: "bird", label: "پرنده" },
  { value: "rodent", label: "جونده" },
];

export const SORT_FIELDS = [
  { value: "price" as const, label: "قیمت" },
  { value: "rating" as const, label: "امتیاز" },
];

export const CITY_OPTIONS = [
  "ميانه",
  "تبريز",
  "مراغه",
  "شبستر",
  "CityUnknown",
];
