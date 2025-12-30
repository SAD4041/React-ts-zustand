import type {
  FilterState,
  SortDirection,
  SortField,
} from "@/types/explorePetSitter";
import type { PetType, ServiceType } from "@/types/PetSitter";
import type { SearchPetSittersPayload } from "@/types/PetSitter/searchPetSitters";

const serviceTypeToId: Record<ServiceType, number> = {
  walking: 1,
  training: 2,
  care: 2,
  medical: 2,
};

const petKindToId: Record<PetType, number> = {
  dog: 1,
  cat: 2,
  bird: 3,
  rodent: 4,
};

const cityNameMap: Record<string, string> = {
  "میانه": "ميانه",
  "تبریز": "تبريز",
  "مراغه": "مراغه",
  "شبستر": "شبستر",
};

function normalizeCityName(value: string): string {
  return cityNameMap[value] ?? value;
}

function timeToSlot(value?: string): number | undefined {
  if (!value) return undefined;
  const [hStr, mStr] = value.split(":");
  const hour = Number(hStr);
  const minute = Number(mStr);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return undefined;
  if (hour < 0 || hour > 23) return undefined;
  if (minute !== 0 && minute !== 30) return undefined;

  return hour * 2 + (minute === 30 ? 1 : 0) + 1;
}

export function buildPetSitterSearchPayload(params: {
  filters: FilterState;
  page: number;
  pageSize: number;
  sortField: SortField;
  sortDirection: SortDirection;
}): SearchPetSittersPayload {
  const { filters, page, pageSize, sortField, sortDirection } = params;

  const out: SearchPetSittersPayload["filters"] = [];

  void sortField;

  // searchQuery not supported by backend yet
  if (filters.searchQuery) {
    void filters.searchQuery;
  }

  if (filters.city && filters.city !== "همه شهرها") {
    out.push({ field: "city", op: "=", value: normalizeCityName(filters.city) });
  }

  if (filters.serviceType) {
    const serviceId = serviceTypeToId[filters.serviceType];
    if (serviceId) {
      out.push({ field: "serviceType", op: "=", value: serviceId });
    }
  }

  if (filters.pets.length) {
    const petKindIds = filters.pets
      .map((pet) => petKindToId[pet])
      .filter((id) => Boolean(id));
    if (petKindIds.length) {
      out.push({ field: "petKinds", op: "IN", value: petKindIds });
    }
  }

  const [minPrice, maxPrice] = filters.priceRange;
  const isDefaultPriceRange = minPrice === 0 && maxPrice === 100000;
  if (!isDefaultPriceRange) {
    out.push(
      { field: "minPrice", op: ">=", value: minPrice },
      { field: "maxPrice", op: "<=", value: maxPrice }
    );
  }

  if (filters.timeFrom) {
    const slot = timeToSlot(filters.timeFrom);
    if (slot) {
      out.push({ field: "startSlot", op: ">=", value: slot });
    }
  }

  if (filters.timeTo) {
    const slot = timeToSlot(filters.timeTo);
    if (slot) {
      out.push({ field: "endSlot", op: "<=", value: slot });
    }
  }

  if (filters.date) {
    out.push({ field: "date", op: "=", value: filters.date });
  }

  return {
    page,
    count: pageSize,
    filters: out,
    sorts: [
      {
        field: "min_price",
        dir: sortDirection === "asc" ? "ASC" : "DESC",
      },
    ],
  };
}
