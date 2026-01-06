// src/schemas/ExplorePetSitterSchema.ts
import * as Yup from "yup";

export interface ExplorePetSitterFormValues {
  date: string;
}

export const explorePetSitterInitialValues: ExplorePetSitterFormValues = {
  date: "",
};

export const explorePetSitterValidationSchema = Yup.object({
  date: Yup.string().required("تاریخ الزامی است"),
});
