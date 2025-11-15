import * as Yup from "yup";

const ProfileSchema = Yup.object().shape({
  username: Yup.string().required("نام کاربری الزامی است"),
  email: Yup.string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),
  bio: Yup.string().max(200, "بیو نمی‌تواند بیش از ۲۰۰ کاراکتر باشد"),
});

export const ProfileInitialValues = {
  username: "",
  email: "",
  bio: "",
};

export default ProfileSchema;
