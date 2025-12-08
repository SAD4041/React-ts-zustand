import * as yup from 'yup';
import { translateNumber } from '../utils/translateNumber';

export const loginSchema = yup.object({
  phone: yup
    .string()
    .required('شماره تلفن اجباری است.')
    .transform((value) => translateNumber(value))
    .matches(/^09[0-9]{9}$/, 'شماره تلفن معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)'),
});
