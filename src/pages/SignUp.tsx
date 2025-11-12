import { useNavigate } from "react-router-dom";
import CustomInput from "@/components/Custom/CustomInput";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import BG from "@/assets/BG.png";

// Validation schema با بهبود اعتبارسنجی
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "نام باید حداقل ۲ حرف باشد")
    .max(50, "نام نباید بیشتر از ۵۰ حرف باشد")
    .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/, "نام فقط می‌تواند شامل حروف باشد")
    .required("نام الزامی است"),

  familyName: Yup.string()
    .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد")
    .max(50, "نام خانوادگی نباید بیشتر از ۵۰ حرف باشد")
    .matches(
      /^[\u0600-\u06FFa-zA-Z\s]+$/,
      "نام خانوادگی فقط می‌تواند شامل حروف باشد"
    )
    .required("نام خانوادگی الزامی است"),

  email: Yup.string()
    .email("فرمت ایمیل معتبر نیست")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "ایمیل معتبر وارد کنید"
    )
    .required("ایمیل الزامی است"),

  phone: Yup.string()
    .matches(/^09[0-9]{9}$/, "شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد")
    .required("شماره موبایل الزامی است"),
});

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      // نرمال‌سازی داده‌ها
      const normalizedData = {
        name: values.name.trim(),
        familyName: values.familyName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
      };

      console.log("Form values:", normalizedData);

      // اینجا می‌توانید API call انجام دهید
      // مثال:
      // await registerUser(normalizedData);

      // بعد از ثبت موفق، می‌توانید به صفحه دیگری هدایت کنید
      // navigate("/dashboard");

      // یا فرم را ریست کنید
      // resetForm();

      alert("اطلاعات با موفقیت ثبت شد!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md">
        <Formik
          initialValues={{
            name: "",
            familyName: "",
            email: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                <h1 className="text-white text-2xl text-center mb-10 font-semibold">
                  لطفا اطلاعات خود را وارد کنید
                </h1>

                <div className="space-y-6">
                  <CustomInput
                    name="name"
                    type="text"
                    label="نام"
                    className="w-full px-4 py-3 rounded-lg"
                  />

                  <CustomInput
                    name="familyName"
                    type="text"
                    label="نام خانوادگی"
                    className="w-full px-4 py-3 rounded-lg"
                  />

                  <CustomInput
                    name="email"
                    type="email"
                    label="ایمیل"
                    className="w-full px-4 py-3 rounded-lg"
                    dir="ltr"
                  />

                  <CustomInput
                    name="phone"
                    type="tel"
                    label="شماره موبایل"
                    className="w-full px-4 py-3 rounded-lg"
                    dir="ltr"
                    maxLength={11}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      w-full 
                      bg-[#FFD500] 
                      hover:bg-[#e6c200]
                      text-[#00274D] 
                      font-semibold 
                      py-3 px-6 
                      rounded-lg 
                      transition-all duration-200 
                      disabled:opacity-50 
                      disabled:cursor-not-allowed
                      focus:outline-none 
                      focus:ring-2 focus:ring-[#FFD500]/50
                      active:scale-95
                    "
                  >
                    {isSubmitting ? "در حال ثبت..." : "ثبت اطلاعات"}
                  </Button>

                  <p className="text-white text-center text-sm mt-4">
                    <button
                      type="button"
                      onClick={handleLoginClick}
                      className="text-[#FFD500] hover:text-[#e6c200] font-semibold cursor-pointer underline transition-colors duration-200"
                    >
                      وارد شوید
                    </button>
                    قبلا حساب کاربری داشته‌اید؟{" "}
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* لوگو گوشه پایین سمت راست */}
      <img
        src={ELMOCPC}
        alt="ELMOCPC Logo"
        className="absolute bottom-4 right-4 w-32 opacity-80 hover:opacity-100 transition-opacity duration-300"
      />

      {/* لوگو گوشه پایین سمت چپ */}
      <img
        src={CESA}
        alt="CESA Logo"
        className="absolute bottom-4 left-4 w-20 opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}

export default SignUp;
