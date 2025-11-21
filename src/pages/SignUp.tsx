import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomInput from "@/components/Custom/CustomInput";
import { Button } from "@/components/ui/button";
import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import BG from "@/assets/BG.png";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { registerService, verifyOtpSignupService } from "@/services/authService";
import type {
  RegisterPayload,
  RegisterErrorResponse,
  RegisterSuccessResponse,
  VerifyOtpSuccessResponse,
  VerifyOtpErrorResponse,
} from "@/types/authTypes";
import { toast } from "sonner";
import useUserStore from "../store/userStore/userStore";

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

  tshirt_size: Yup.string()
    .oneOf(["M", "L", "XL", "XXL"], "سایز معتبر نیست")
    .required("سایز تیشرت الزامی است"),

  university: Yup.string()
    .min(2, "نام دانشگاه باید حداقل ۲ حرف باشد")
    .required("نام دانشگاه الزامی است"),
});

interface SignUpFormValues {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  tshirt_size: string;
  university: string;
}

interface UserData {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  tshirt_size: string;
  university: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const { setAuth } = useUserStore();

  // مرحله ۱: ارسال فرم و درخواست OTP
  const handleSubmit = async (
    values: SignUpFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      const normalizedData: UserData = {
        name: values.name.trim(),
        familyName: values.familyName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        tshirt_size: values.tshirt_size.trim(),
        university: values.university.trim(),
      };

      const payload: RegisterPayload = {
        first_name: normalizedData.name,
        last_name: normalizedData.familyName,
        email: normalizedData.email,
        phone: normalizedData.phone,
        tshirt_size: normalizedData.tshirt_size,
        university: normalizedData.university,
      };

      const res: RegisterSuccessResponse = await registerService(payload);
      console.log("register response:", res);

      setUserData(normalizedData);
      toast.success("کد تایید به ایمیل شما ارسال شد!");
      setStep("otp");
    } catch (error: any) {
      console.error("Register error:", error);

      const backend = error?.response?.data as RegisterErrorResponse | undefined;

      if (backend?.status === 409 && backend.messages) {
        if (backend.messages.phone) {
          setFieldError("phone", "شماره موبایل قبلاً ثبت شده است.");
          toast.error("شماره موبایل قبلاً ثبت شده است.");
        }
        if (backend.messages.email) {
          setFieldError("email", "ایمیل قبلاً ثبت شده است.");
          toast.error("ایمیل قبلاً ثبت شده است.");
        }
        return;
      }

      toast.error("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  // مرحله ۲: تایید OTP و گرفتن توکن‌ها
  const handleOtpSubmit = async () => {
  if (!userData) {
    toast.error("اطلاعات کاربر یافت نشد. دوباره تلاش کنید.");
    setStep("form");
    return;
  }

  if (otpValue.length !== 6) return;

  try {
    setOtpLoading(true);

    const res: VerifyOtpSuccessResponse = await verifyOtpSignupService({
      email: userData.email,
      code: otpValue,
    });

    console.log("verify otp response:", res);

    // 🆕 به‌جای localStorage، همه‌چیز رو به استور بده
    // res.data از نوع AuthUserWithTokens هست
    setAuth(res.data);

    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);

    toast.success("حساب کاربری شما با موفقیت ساخته شد!");
    navigate("/dashboard");
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    const backend = error?.response?.data as VerifyOtpErrorResponse | undefined;

    if (backend?.status === 404) {
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
      if (!userData) return;
      // اینجا می‌تونی API ارسال مجدد OTP رو صدا بزنی
      console.log("Resending OTP to:", userData.email);
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
          <Formik<SignUpFormValues>
            initialValues={{
              name: "",
              familyName: "",
              email: "",
              phone: "",
              tshirt_size: "",
              university: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values, errors, touched }) => (
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

                    {/* سایز تیشرت به صورت Select */}
                    <div className="space-y-2 rtl">
                      <Select
                        value={values.tshirt_size}
                        onValueChange={(val) => setFieldValue("tshirt_size", val)}
                        dir= "rtl"
                      >
                        <SelectTrigger className="w-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                          <SelectValue placeholder="سایز را انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="XXL">XXL</SelectItem>
                        </SelectContent>
                      </Select>
                      {touched.tshirt_size && errors.tshirt_size && (
                        <p className="text-red-400 text-xs">
                          {errors.tshirt_size as string}
                        </p>
                      )}
                    </div>

                    <CustomInput
                      name="university"
                      type="text"
                      label="دانشگاه"
                      className="w-full px-4 py-3 rounded-lg"
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
                      </button>{" "}
                      قبلا حساب کاربری داشته‌اید؟
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
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-9 h-9 md:w-12 md:h-12 rounded-lg bg-white/10 border border-white/20 text-white text-xl font-semibold"
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
