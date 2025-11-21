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
import { loginService } from "@/services/authService";
import type {
  LoginPayload,
  LoginErrorResponse,
  LoginSuccessResponse,
} from "@/types/authTypes";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("فرمت ایمیل معتبر نیست")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "ایمیل معتبر وارد کنید"
    )
    .required("ایمیل الزامی است"),
});

// Validation schema برای OTP
const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "کد تایید باید ۶ رقم باشد")
    .matches(/^[0-9]{6}$/, "کد تایید فقط می‌تواند عددی باشد")
    .required("کد تایید الزامی است"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // email یا otp
  const [userEmail, setUserEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  // ✔️ تابع ایمیل کاملاً بسته شد و باگ برطرف شد
  const handleEmailSubmit = (values: any, { setSubmitting }: any) => {
    try {
      const normalizedEmail = values.email.trim().toLowerCase();
      setUserEmail(normalizedEmail);

      // اینجا API ارسال OTP
      setStep("otp");
    } catch (error) {
      console.error("Error submitting email:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: any
  ) => {
    try {
      const payload: LoginPayload = {
        email: values.email.trim().toLowerCase(),
        password: values.password.trim(),
      };

      const res: LoginSuccessResponse = await loginService(payload);

      const { access_token, refresh_token } = res.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      toast.success("ورود با موفقیت انجام شد!");

      navigate("/dashboard");
    } catch (error: any) {
      const backend = error?.response?.data as LoginErrorResponse | undefined;

      if (backend?.status === 401) {
        toast.error("ایمیل یا رمز عبور اشتباه است.");
      } else {
        toast.error("خطا در ورود. لطفا دوباره تلاش کنید.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpSubmit = () => {
    try {
      if (otpValue.length === 6) {
        setOtpLoading(true);

        setTimeout(() => {
          setOtpLoading(false);
          // navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpLoading(false);
    }
  };

  const handleResendOtp = () => {
    try {
      console.log("Resending OTP to:", userEmail);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${BG})`,
      }}
    >
      <div className="w-full max-w-md">
        {step === "email" ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
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
                      dir="ltr"
                    />

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "در حال ارسال..." : "دریافت کد تایید"}
                    </Button>
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

            <p className="text-[#FFD500] text-center text-lg font-semibold mt-2 break-all">
              {userEmail}
            </p>

            <div className="flex justify-center mt-6">
              <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
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
              className="w-full mt-6"
            >
              {otpLoading ? "در حال تایید..." : "تایید"}
            </Button>

            <button
              onClick={handleResendOtp}
              className="text-[#FFD500] mt-4 block text-center"
            >
              ارسال مجدد کد
            </button>

            <button
              onClick={() => {
                setStep("email");
                setOtpValue("");
              }}
              className="text-white/70 mt-2 block text-center"
            >
              بازگشت
            </button>
          </div>
        )}
      </div>

      <img src={ELMOCPC} className="absolute bottom-4 right-4 w-32" />
      <img src={CESA} className="absolute bottom-4 left-4 w-20" />
    </div>
  );
}

export default Login;
