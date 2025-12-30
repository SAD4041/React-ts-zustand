import type { PetSitter } from "@/types/PetSitter";

/* ---------- payload ---------- */

export type SearchFilterField =
  | "city"
  | "serviceType"
  | "minPrice"
  | "maxPrice"
  | "petKinds"
  | "date"
  | "startSlot"
  | "endSlot";

export type SearchFilter = {
  field: SearchFilterField;
  op: "=" | "!=" | ">" | "<" | ">=" | "<=" | "IN";
  value: string | number | number[];
};

export type SearchSort = {
  field: "min_price";
  dir: "ASC" | "DESC";
};

export interface SearchPetSittersPayload {
  page: number;
  count: number;
  filters?: SearchFilter[];
  sorts?: SearchSort[];
}

/* ---------- api response ---------- */

export interface SearchPetSitterApiItem {
  id: number;
  first_name: string;
  last_name: string;
  province: string;
  city: string;
  services: string[];
  min_price: number;
  pet_kinds: string[];
  rate: number;
  comments: number;
}

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SearchPetSittersApiResponse {
  statusCode: number;
  message: string;
  data: {
    data: SearchPetSitterApiItem[];
    pagination: PaginationMeta;
  };
}

/* ---------- mapped response ---------- */

export interface SearchPetSittersResponse {
  items: PetSitter[];
  total: number;
}
