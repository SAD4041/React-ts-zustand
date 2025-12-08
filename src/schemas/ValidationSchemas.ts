import * as yup from 'yup';
import { translateNumber } from '@/utils/translateNumber'

export const validationSchema = yup.object({
  code: yup
    .string()
    .required('کد تایید اجباری است.')
    .transform((value) => translateNumber(value))
    .matches(/^[0-9]{6}$/, 'کد تایید باید 6 رقم باشد.'),
});