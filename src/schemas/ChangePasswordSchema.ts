import * as Yup from "yup";

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "تکرار رمز عبور مطابقت ندارد")
    .required("تکرار رمز عبور الزامی است"),
});

export default ChangePasswordSchema;
