
type SpeciesData = {
    num: number,
    name: string,
}

export type SpiecesResponse = {
    statusCode: number,
    message?: string,
    data?: SpeciesData[],
}

export type RegisterPayLoad = {
    name: string,
    kind?: number ,
    species?: number ,
    birthDate?: string ,
    isAdult : boolean ,
    gender : number ,
    petprof? : File | null
    aboutPet? : string | null
}

export type RegisterResponse = {
    statusCode: number,
    message?: string,
}