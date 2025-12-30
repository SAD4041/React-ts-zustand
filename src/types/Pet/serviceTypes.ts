import type { Pet } from "./pet";


export interface GetAllPetsResponse {
    statusCode: number;
    message?: string;
    data: Pet[];
}




export type DeletePetResponse = {
    statusCode: number,
    message?: string,
}