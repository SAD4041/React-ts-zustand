import { useNavigate } from "react-router-dom";
import CustomInput from "@/components/Custom/CustomInput";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import BG from "@/assets/BG.png";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("فرمت ایمیل معتبر نیست")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "ایمیل معتبر وارد کنید"
    )
    .required("ایمیل الزامی است"),

  password: Yup.string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "رمز عبور باید شامل حروف کوچک، بزرگ و عدد باشد"
    )
    .required("رمز عبور الزامی است"),
});

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      // نرمال‌سازی داده‌ها
      const normalizedData = {
        email: values.email.trim().toLowerCase(),
        password: values.password,
      };

      console.log("Login values:", normalizedData);

      // اینجا می‌توانید API call انجام دهید
      // مثال:
      // await loginUser(normalizedData);

      // بعد از ورود موفق، هدایت به داشبورد
      // navigate("/dashboard");

      alert("ورود با موفقیت انجام شد!");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("خطا در ورود. لطفا دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
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
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                <h1 className="text-white text-2xl text-center mb-10 font-semibold">
                  ورود به حساب کاربری
                </h1>

                <div className="space-y-6">
                  <CustomInput
                    name="email"
                    type="email"
                    label="ایمیل"
                    className="w-full px-4 py-3 rounded-lg"
                    dir="ltr"
                  />

                  <div>
                    <CustomInput
                      name="password"
                      type="password"
                      label="رمز عبور"
                      className="w-full px-4 py-3 rounded-lg"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={handleForgotPasswordClick}
                      className="text-[#FFD500] hover:text-[#e6c200] text-xs mt-2 transition-colors duration-200 float-right"
                    >
                      رمز عبور را فراموش کرده‌اید؟
                    </button>
                  </div>

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
                      mt-8
                    "
                  >
                    {isSubmitting ? "در حال ورود..." : "ورود"}
                  </Button>

                  <p className="text-white text-center text-sm mt-4">
                    <button
                      type="button"
                      onClick={handleSignUpClick}
                      className="text-[#FFD500] hover:text-[#e6c200] font-semibold underline cursor-pointer transition-colors duration-200"
                    >
                      ثبت‌نام کنید
                    </button>{" "}
                    حساب کاربری ندارید؟
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

export default Login;
