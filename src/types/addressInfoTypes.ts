export interface ProvinceResponse {
	statusCode: number;
	message: string;
	data: Province[];
}
export interface CityResponse {
	statusCode: number;
	message: string;
	data: Province[];
}
export interface Province {
	num: number;
	name: string;
}
export interface City {
	num: number;
	name: string;
}
