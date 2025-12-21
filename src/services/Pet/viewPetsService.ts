import type { GetAllPetsResponse } from "@/types/Pet/serviceTypes";
import { getData } from "../services";

export const viewPetsService = async (
): Promise<GetAllPetsResponse> => {
    return getData({
        endPoint: `/v1/pets/`,
    });
};
