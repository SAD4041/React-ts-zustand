import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomInput from "@/components/Custom/CustomInput";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import BG from "@/assets/BG.png";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

import { loginService, verifyOtpLoginService } from "@/services/authService";
import type {
  LoginPayload,
  LoginErrorResponse,
  RegisterSuccessResponse,
  VerifyOtpSuccessResponse,
  VerifyOtpErrorResponse,
} from "@/types/authTypes";

// 🆕 استور احراز هویت
import useUserStore from "@/store/userStore/userStore";

// Validation schema برای ایمیل
const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email("فرمت ایمیل معتبر نیست")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "ایمیل معتبر وارد کنید"
    )
    .required("ایمیل الزامی است"),
});

// (فعلاً از otpValidationSchema در Formik استفاده نمی‌کنیم، فقط برای بعداً)
const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "کد تایید باید ۶ رقم باشد")
    .matches(/^[0-9]{6}$/, "کد تایید فقط می‌تواند عددی باشد")
    .required("کد تایید الزامی است"),
});

interface EmailFormValues {
  email: string;
}

function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [userEmail, setUserEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  // 🆕 از استور: بعد از verify OTP اینو صدا می‌زنیم
  const { setAuth } = useUserStore();

  // مرحله ۱: ارسال ایمیل برای دریافت OTP
  const handleEmailSubmit = async (values: EmailFormValues) => {
    try {
      const normalizedEmail = values.email.trim().toLowerCase();
      setUserEmail(normalizedEmail);

      const payload: LoginPayload = {
        email: normalizedEmail,
      };

      // بک‌اند اینجا OTP رو به ایمیل می‌فرسته
      const res: RegisterSuccessResponse = await loginService(payload);
      console.log("login (send otp) response:", res);

      toast.success("کد تایید به ایمیل شما ارسال شد!");
      setStep("otp");
    } catch (error: any) {
      console.error("Error submitting email:", error);

      const backend = error?.response?.data as LoginErrorResponse | undefined;

      if (backend?.status === 401) {
        toast.error("ایمیل یافت نشد یا غیرمجاز است.");
      } else {
        toast.error("خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.");
      }
    }
  };

  // مرحله ۲: ارسال OTP برای ورود و گرفتن توکن‌ها
  const handleOtpSubmit = async () => {
    if (!userEmail) {
      toast.error("ایمیل کاربر یافت نشد. دوباره تلاش کنید.");
      setStep("email");
      return;
    }

    if (otpValue.length !== 6) return;

    try {
      setOtpLoading(true);
      console.log("OTP verification for:", userEmail, "OTP:", otpValue);

      const res: VerifyOtpSuccessResponse = await verifyOtpLoginService({
        email: userEmail,
        code: otpValue,
      });

      console.log("verify login otp response:", res);

      // 🆕 به‌جای localStorage، مستقیم استور رو ست می‌کنیم
      setAuth(res.data);

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      
      toast.success("ورود با موفقیت انجام شد!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);

      const backend401 = error?.response?.data as LoginErrorResponse | undefined;
      const backend404 = error?.response?.data as VerifyOtpErrorResponse | undefined;

      if (backend401?.status === 401) {
        toast.error("کد تایید اشتباه است.");
      } else if (backend404?.status === 404) {
        toast.error("کد تایید یافت نشد یا منقضی شده است.");
      } else {
        toast.error("خطا در تایید کد. لطفا دوباره تلاش کنید.");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      if (!userEmail) return;

      // اینجا می‌توانی API ارسال مجدد OTP برای لاگین را صدا بزنی
      // await resendLoginOTP(userEmail);

      console.log("Resending OTP to:", userEmail);
      toast.success("کد تایید دوباره ارسال شد!");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("خطا در ارسال مجدد کد. لطفا دوباره تلاش کنید.");
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
        {step === "email" ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailSubmit}
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
                      {isSubmitting ? "در حال ارسال..." : "دریافت کد تایید"}
                    </Button>

                    <p className="text-white text-center text-sm mt-4 clear-right">
                      <button
                        type="button"
                        onClick={handleSignUpClick}
                        className="text-[#FFD500] hover:text-[#e6c200] font-semibold underline cursor-pointer transition-colors	duration-200"
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
        ) : (
          <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <h1 className="text-white text-2xl text-center mb-2 font-semibold">
              تایید کد ارسال شده
            </h1>
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-6">
              <p className="text-white/70 text-center text-sm">
                کد تایید به آدرس ایمیل زیر ارسال شد:
              </p>
              <p className="text-[#FFD500] text-center text-lg font-semibold mt-2 break-all">
                {userEmail}
              </p>
            </div>
            <p className="text-white/70 text-center text-sm mb-8">
              کد تایید را وارد کنید
            </p>

            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  dir="ltr"
                >
                  <InputOTPGroup className="gap-3">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 text-white text-xl font-semibold"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                type="button"
                onClick={handleOtpSubmit}
                disabled={otpLoading || otpValue.length !== 6}
                className="
                  w-full 
                  bg-[#FFD500] 
                  hover:bg-[#e6c200]
                  text-[#00274D] 
                  font-semibold 
                  py-3 px-6 
                  rounded-lg 
                  transition-all	duration-200 
                  disabled:opacity-50 
                  disabled:cursor-not-allowed
                  focus:outline-none 
                  focus:ring-2 focus:ring-[#FFD500]/50
                  active:scale-95
                "
              >
                {otpLoading ? "در حال تایید..." : "تایید"}
              </Button>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-[#FFD500] hover:text-[#e6c200] font-semibold text-sm transition-colors duration-200"
                >
                  ارسال مجدد کد تایید
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtpValue("");
                  }}
                  className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                >
                  بازگشت به مرحله قبل
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* لوگو گوشه پایین سمت راست */}
      <img
        src={ELMOCPC}
        alt="ELMOCPC Logo"
        className="absolute bottom-4 right-4 w-32 opacity-80 hover:opacity-100 transition-opacity	duration-300"
      />

      {/* لوگو گوشه پایین سمت چپ */}
      <img
        src={CESA}
        alt="CESA Logo"
        className="absolute bottom-4 left-4 w-20 opacity-80 hover:opacity-100 transition-opacity	duration-300"
      />
    </div>
  );
}

export default Login;
