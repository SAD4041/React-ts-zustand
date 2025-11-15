import * as Yup from 'yup';

export const searchSchema = Yup.object({
  searchTerm: Yup.string().optional(),
});
