import * as Yup from "yup";

export const ValidationSchema = Yup.object({
  maket_name: Yup.string().required("نام فروشگاه الزامی است"),
  description: Yup.string()
    .max(500, "حداکثر 500 کاراکتر مجاز است")
    .required("درباره فروشگاه الزامی است"),
  mobile: Yup.string()
    .matches(/^09\d{9}$/, "شماره تلفن باید معتبر و با 09 شروع شود")
    .required("شماره تماس الزامی است"),
  email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
});