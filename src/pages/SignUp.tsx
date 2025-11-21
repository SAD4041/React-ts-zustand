import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomInput from "@/components/Custom/CustomInput";
import { Button } from "@/components/ui/button";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import BG from "@/assets/BG.png";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { registerService } from "@/services/authService";
import type {
  RegisterPayload,
  RegisterErrorResponse,
  RegisterSuccessResponse,
} from "@/types/authTypes";
import { toast } from "sonner";

// Validation schema برای فرم ثبت نام
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

  password: Yup.string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "رمز عبور باید شامل حروف کوچک، بزرگ و عدد باشد"
    )
    .required("رمز عبور الزامی است"),
});

// Validation schema برای OTP
const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "کد تایید باید ۶ رقم باشد")
    .matches(/^[0-9]{6}$/, "کد تایید فقط می‌تواند عددی باشد")
    .required("کد تایید الزامی است"),
});

interface SignUpFormValues {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  password: string;
}

interface OTPFormValues {
  otp: string;
}

interface UserData {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  password: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState("form"); // form یا otp
  const [userData, setUserData] = useState<UserData | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const handleSubmit = async (
    values: SignUpFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      const normalizedData: SignUpFormValues = {
        name: values.name.trim(),
        familyName: values.familyName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        password: values.password.trim(),
      };

      const payload: RegisterPayload = {
        name: normalizedData.name,
        familyName: normalizedData.familyName,
        email: normalizedData.email,
        phone: normalizedData.phone,
        password: normalizedData.password,
      };

      const res: RegisterSuccessResponse = await registerService(payload);

      // ذخیره tokens
      const { access_token, refresh_token } = res.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      toast.success("اطلاعات با موفقیت ثبت شد!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Register error:", error);

      const backend = error?.response?.data as RegisterErrorResponse | undefined;

      // خطای 409 از بک
      if (backend?.status === 409 && backend.messages) {
        if (backend.messages.phone) {
          setFieldError("phone", "شماره موبایل قبلاً ثبت شده است.");
          toast.error("شماره موبایل قبلاً ثبت شده است.");
        }
        if (backend.messages.email) {
          setFieldError("email", "ایمیل قبلاً ثبت شده است.");
          toast.error("ایمیل قبلاً ثبت شده است.");
        }
        setSubmitting(false);
        return;
      }

      toast.error("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpSubmit = async (
    values: OTPFormValues,
    { setSubmitting }: FormikHelpers<OTPFormValues>
  ) => {
    try {
      if (otpValue.length === 6) {
        setOtpLoading(true);
        console.log("OTP verification:", otpValue);

        // اینجا می‌توانید API call برای تایید OTP انجام دهید
        // const res = await verifyOTP(userData.email, otpValue);

        toast.success("اطلاعات با موفقیت تایید شد!");
        // navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error("کد تایید نادرست است.");
    } finally {
      setOtpLoading(false);
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // اینجا می‌توانید API call برای ارسال مجدد OTP انجام دهید
      // await resendOTP(userData?.email);
      console.log("Resending OTP to:", userData?.email);
      toast.success("کد تایید دوباره به ایمیل شما ارسال شد.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("خطا در ارسال مجدد کد. لطفا دوباره تلاش کنید.");
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
        {step === "form" ? (
          <Formik
            initialValues={{
              name: "",
              familyName: "",
              email: "",
              phone: "",
              password: "",
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

                    <CustomInput
                      name="password"
                      type="password"
                      label="رمز عبور"
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
        ) : (
          <Formik
            initialValues={{
              otp: "",
            }}
            validationSchema={otpValidationSchema}
            onSubmit={handleOtpSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                  <h1 className="text-white text-2xl text-center mb-2 font-semibold">
                    تایید کد ارسال شده
                  </h1>
                  <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-6">
                    <p className="text-white/70 text-center text-sm">
                      کد تایید به آدرس ایمیل زیر ارسال شد:
                    </p>
                    <p className="text-[#FFD500] text-center text-lg font-semibold mt-2 break-all">
                      {userData?.email}
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
                        onChange={(value) => {
                          setOtpValue(value);
                          setFieldValue("otp", value);
                        }}
                        dir="ltr"
                      >
                        <InputOTPGroup className="gap-3">
                          <InputOTPSlot
                            index={0}
                            className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 text-white text-xl font-semibold"
                          />
                          <InputOTPSlot
                            index={1}
                            className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 text-white text-xl font-semibold"
                          />
                          <InputOTPSlot
                            index={2}
                            className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 text-white text-xl font-semibold"
                          />
                          <InputOTPSlot
                            index={3}
                            className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 text-white text-xl font-semibold"
                          />
                          <InputOTPSlot
                            index={4}
                            className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 text-white text-xl font-semibold"
                          />
                          <InputOTPSlot
                            index={5}
                            className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 text-white text-xl font-semibold"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || otpLoading || otpValue.length !== 6}
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
                      {isSubmitting || otpLoading ? "در حال تایید..." : "تایید"}
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
                          setStep("form");
                          setOtpValue("");
                        }}
                        className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                      >
                        بازگشت به مرحله قبل
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
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