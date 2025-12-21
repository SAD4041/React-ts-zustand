import type { DeletePetResponse } from "@/types/Pet/serviceTypes";
import { deleteData, getData } from "../services";

export const deletePetService = async (
  id: number
): Promise<DeletePetResponse> => {
  return deleteData({
    endPoint: `/v1/pets/${id}`,
  });
};
