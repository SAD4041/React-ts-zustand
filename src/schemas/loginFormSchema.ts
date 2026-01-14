import * as yup from "yup";
const loginFormSchemaConfig = {
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email("لطفا ایمیل معتبر وارد کنید")
      .required("ایمیل ضروری است"),
    password: yup
      .string()
      .min(5, "رمز عبور باید حداقل 5 کلمه باشد")
      .required("رمز عبور ضروری است"),
  }),
  initialValues: { password: "", email: "" },
};
export default loginFormSchemaConfig;
