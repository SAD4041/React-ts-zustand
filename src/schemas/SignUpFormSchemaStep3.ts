import * as Yup from "yup";

const step3ValidationSchema = Yup.object({
username: Yup.string()
    .required("وارد کردن نام کاربری الزامی است")
    .min(3, "حداقل ۳ کاراکتر وارد کنید"),

email: Yup.string()
    .required("وارد کردن پست الکترونیک الزامی است")
    .email("ایمیل وارد شده معتبر نیست"),
});

export default step3ValidationSchema