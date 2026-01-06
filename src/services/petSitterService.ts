import type {
  SearchPetSittersApiResponse,
  SearchPetSittersPayload,
  SearchPetSittersResponse,
} from "@/types/PetSitter/searchPetSitters";
import type { PetType, ServiceType } from "@/types/PetSitter";
import { postData } from "./services";
// import useUserStore from "@/store/userStore/userStore";

// const token = useUserStore.getState().accessToken;

/* -------------------- search pet sitters -------------------- */

export const searchPetSittersService = async (
  payload: SearchPetSittersPayload
): Promise<SearchPetSittersResponse> => {
  const response = (await postData({
    endPoint: "/v1/search/petsitters",
    data: payload,
  })) as SearchPetSittersApiResponse;

  const serviceMap: Record<string, ServiceType> = {
    "پیاده روی": "walking",
    "نگهداری": "care",
  };

  const petMap: Record<string, PetType> = {
    "سگ": "dog",
    "گربه": "cat",
    "پرنده": "bird",
    "جونده": "rodent",
  };

  const items = response.data.data.map((item) => {
    const services = item.services.reduce<ServiceType[]>((acc, service) => {
      const mapped = serviceMap[service];
      if (mapped && !acc.includes(mapped)) acc.push(mapped);
      return acc;
    }, []);

    const pets = item.pet_kinds.reduce<PetType[]>((acc, pet) => {
      const mapped = petMap[pet];
      if (mapped && !acc.includes(mapped)) acc.push(mapped);
      return acc;
    }, []);

    return {
      id: item.id,
      name: `${item.first_name} ${item.last_name}`,
      city: item.city,
      rating: item.rate,
      reviewsCount: item.comments,
      pricePerNight: item.min_price,
      pets,
      services,
      experienceYears: 0,
    };
  });

  return {
    items,
    total: response.data.pagination.totalItems,
  };
};
