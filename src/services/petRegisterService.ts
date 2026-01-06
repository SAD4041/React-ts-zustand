import type {  RegisterPayLoad, RegisterResponse, SpiecesResponse } from "@/types/PetRegister/registerTypes";
import { getData, postData, postImageData } from "./services";
import useUserStore from "@/store/userStore/userStore";

const token = useUserStore.getState().accessToken;


export const getPetSpeciesService = async (kindId : number): Promise<SpiecesResponse> => {
	return getData({
		endPoint: `/v1/pets/kinds/${kindId}/species`,
	});
};

export const registerPetService = async (
	formData: FormData,
): Promise<RegisterResponse> => {
	console.log(token);
	return postImageData({
		endPoint: `/v1/pets/`,
		data: formData,
	});
};


