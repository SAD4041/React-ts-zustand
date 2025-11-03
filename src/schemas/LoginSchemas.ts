import * as yup from 'yup';

export const loginSchema = yup.object({
  phone: yup
    .string()
    .required('شماره تلفن اجباری است.')
    .matches(/^09[0-9]{9}$/, 'شماره تلفن معتبر نیست (مثال: 09123456789)'),
});
