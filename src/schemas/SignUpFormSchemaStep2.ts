import * as Yup from "yup";

const step2ValidationSchema = Yup.object({
confirmPassword: Yup.string()
    .required("تکرار رمز عبور الزامی است")
    .oneOf([Yup.ref("password")], "رمز عبور و تکرارش باید یکسان باشند"),
});

export default step2ValidationSchema