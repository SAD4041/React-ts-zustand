import * as Yup from "yup";
const step1ValidationSchema = Yup.object({
username: Yup.string()
    .required("وارد کردن نام کاربری الزامی است")
    .min(3, "حداقل ۳ کاراکتر وارد کنید"),

email: Yup.string()
    .required("وارد کردن پست الکترونیک الزامی است")
    .email("ایمیل وارد شده معتبر نیست"),

acceptTerms: Yup.boolean()
    .oneOf([true], "باید قوانین و مقررات را بپذیرید")
    .required("پذیرفتن قوانین الزامی است"),
});

export default step1ValidationSchema