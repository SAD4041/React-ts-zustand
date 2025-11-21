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
});

// Validation schema برای OTP
const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "کد تایید باید ۶ رقم باشد")
    .matches(/^[0-9]{6}$/, "کد تایید فقط می‌تواند عددی باشد")
    .required("کد تایید الزامی است"),
});

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState("form"); // form یا otp
  const [userPhone, setUserPhone] = useState("");
  const [userData, setUserData] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      const normalizedData = {
        name: values.name.trim(),
        familyName: values.familyName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
      };

      console.log("Form values:", normalizedData);

      // ذخیره داده‌های کاربر
      setUserData(normalizedData);
      setUserPhone(normalizedData.phone);

      // اینجا می‌توانید API call برای ارسال OTP انجام دهید
      // await sendOTP(normalizedData.email);

      setStep("otp");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpSubmit = (values, { setSubmitting }) => {
    try {
      setOtpLoading(true);
      console.log("OTP verification:", values.otp);

      // اینجا می‌توانید API call برای تایید OTP انجام دهید
      // await verifyOTP(userData.phone, values.otp);

      alert("اطلاعات با موفقیت تایید شد!");
      setOtpLoading(false);

      // هدایت به صفحه داشبورد یا لاگین
      // navigate("/dashboard");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("کد تایید نادرست است.");
      setOtpLoading(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = () => {
    try {
      // اینجا می‌توانید API call برای ارسال مجدد OTP انجام دهید
      // await resendOTP(userPhone);
      alert("کد تایید دوباره به ایمیل شما ارسال شد.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("خطا در ارسال مجدد کد. لطفا دوباره تلاش کنید.");
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
                  onChange={setOtpValue}
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
                type="button"
                onClick={() => {
                  if (otpValue.length === 6) {
                    setOtpLoading(true);
                    setTimeout(() => {
                      console.log("OTP verification:", otpValue);
                      setOtpLoading(false);
                      // navigate("/dashboard");
                    }, 1000);
                  }
                }}
                disabled={otpLoading || otpValue.length !== 6}
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