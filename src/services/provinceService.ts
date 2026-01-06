import type { ProvinceResponse } from "@/types/addressInfoTypes";
import { getData } from "./services";

export const fetchProvincesService = async (): Promise<ProvinceResponse> => {
	return getData({
		endPoint: `/v1/provinces/`,
	});
};
export const fetchCitiesService = async (
	provinceNumber: number,
): Promise<ProvinceResponse> => {
	return getData({
		endPoint: `/v1/provinces/${provinceNumber}/cities`,
	});
};
