import * as yup from 'yup';

export const signupSchema = yup.object({
  username: yup.string().required('نام اجباری است.'),
  email: yup.string().email('ایمیل نامعتبر است.').required('ایمیل اجباری است.'),
  age: yup
    .string()
    .required('سن اجباری است.')
    .test('is-number', 'سن باید عدد باشد.', (val) => {
      return val !== undefined && val !== null && val.toString().trim() !== '' && !isNaN(Number(val));
    })
    .test('min-max', 'سن باید بین 18 تا 100 باشد.', (val) => {
      const n = Number(val);
      return !isNaN(n) && n >= 18 && n <= 100;
    }),
  password: yup
    .string()
    .required('رمز اجباری است.')
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر داشته باشد.')
    .max(20, 'حداکثر ۲۰ کاراکتر!!')
    .matches(/[a-z]+/, 'باید حداقل شامل یک حرف کوچک باشد')
    .matches(/[A-Z]+/, 'باید حداقل شامل یک حرف بزرگ باشد')
    .matches(/\d+/, 'باید حداقل شامل یک عدد باشد.'),
  confirmPass: yup
    .string()
    .required('تایید رمز اجباری است.')
    .oneOf([yup.ref('password')], 'پسوورد مشابه نیست'),
});
