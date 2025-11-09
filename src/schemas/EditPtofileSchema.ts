import * as Yup from "yup";
const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("نام الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  bio: Yup.string().max(200, "بیو نمی‌تواند بیش از ۲۰۰ کاراکتر باشد"),
});

export default ProfileSchema