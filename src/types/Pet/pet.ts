export type Pet = {
  name: string;
  kind: string;
  species: string;
  birthDate: string | null;
  isAdult?: boolean | null;
  gender: string;
  id: number;
  pictureLink?: string | undefined;
  aboutPet: string | null;
};

export type PetBasicData = {
  name: string;
  kind: string;
  species: string;
  age: string | null;
  isAdult?: boolean | null;
  gender: string;
  id: number;
  pictureLink?: string | undefined;
};
