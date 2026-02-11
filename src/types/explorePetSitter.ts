// src/types/ExplorePetSitter.ts

import type { PetSitter, PetType, ServiceType } from "./PetSitter";

export type SortField = "price" | "rating" | "experience";
export type SortDirection = "asc" | "desc";

export interface FilterState {
  searchQuery: string;
  serviceType: "" | ServiceType;   
  pets: PetType[];
  city: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  priceRange: [number, number];
}

export interface SearchParams extends FilterState {
  sortField: SortField;
  sortDirection: SortDirection;
  page: number;
  pageSize: number;
}

export interface SitterWithTimeAndDate extends PetSitter {
  availableFrom: string;
  availableTo: string;
  availableDates: string[];
}

export interface SitterCardProps {
  sitter: PetSitter;
}