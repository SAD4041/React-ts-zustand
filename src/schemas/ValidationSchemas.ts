import * as yup from "yup";

export const validationSchema = yup.object({
  code: yup
    .string()
    .required('کد تایید اجباری است.')
    .matches(/^[0-9]{6}$/, 'کد تایید باید 6 رقم باشد.'),
});
