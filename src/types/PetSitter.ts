// src/types/PetSitter.ts

export type PetType = "dog" | "cat" | "bird" | "rodent";
export type ServiceType = "walking" | "training" | "care" | "medical";

export interface PetSitter {
  id: number;
  name: string;
  city: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  pets: PetType[];
  services: ServiceType[];
  experienceYears: number;
}
