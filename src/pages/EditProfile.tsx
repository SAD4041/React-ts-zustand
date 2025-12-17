import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import CustomInput from "@/components/Custom/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea";
import CustomBtn from "@/components/Custom/CustomBtn";
import { ArrowLeft, Pencil, Mail, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileSchema, {
  ProfileInitialValues,
} from "@/schemas/EditPtofileSchema";

import {
  getUserProfileService,
  putUserProfileService,
  initiateEmailChangeService,
  verifyEmailChangeService,
} from "@/services/userService";

import useUserStore from "@/store/userStore/userStore";
import type { ProfileValues } from "@/types/editprofileTypes";

export default function ProfileInfo() {
  const [image, setImage] = useState<string | null>(null);
  const [initialValues, setInitialValues] =
    useState<ProfileValues>(ProfileInitialValues);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // مرحله تأیید ایمیل
  const [showVerify, setShowVerify] = useState(false);
  const [tempNewEmail, setTempNewEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { userId } = useUserStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const clearMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (values: ProfileValues) => {
    setIsLoading(true);
    clearMessages();

    try {
      // اگر ایمیل تغییر کرده باشد، ابتدا initiate
      if (values.email && values.email !== initialValues.email) {
        await initiateEmailChangeService({ new_email: values.email });
        setTempNewEmail(values.email);
        setShowVerify(true);
        setSuccessMessage("کد تأیید به ایمیل جدید ارسال شد");
        setIsLoading(false);
        return;
      }

      // آپدیت اطلاعات دیگر
      await putUserProfileService({
        userId,
        data: {
          username: values.username,
          bio: values.bio,
          profile_picture: image || undefined,
        },
      });

      setSuccessMessage("تغییرات با موفقیت ذخیره شد!");
      setTimeout(() => navigate(`/dashboard/${userId}`), 2000);
    } catch (error: any) {
      console.error("Error updating profile:", error);

      // مدیریت خطاهای مختلف
      if (error.response?.status === 404) {
        setErrorMessage("کاربر یافت نشد. لطفاً دوباره وارد شوید.");
      } else if (error.response?.status === 400) {
        setErrorMessage("ایمیل قبلاً استفاده شده است");
      } else if (error.response?.status === 500) {
        setErrorMessage("خطای سرور. لطفاً بعداً تلاش کنید.");
      } else {
        setErrorMessage("خطا در ثبت تغییرات");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!verifyCode || verifyCode.length !== 6) {
      setErrorMessage("لطفاً کد 6 رقمی را وارد کنید");
      return;
    }

    setIsLoading(true);
    clearMessages();

    try {
      await verifyEmailChangeService({
        old_email: initialValues.email,
        new_email: tempNewEmail,
        code: verifyCode,
      });

      setSuccessMessage("ایمیل با موفقیت تغییر کرد!");
      setInitialValues((prev) => ({ ...prev, email: tempNewEmail }));
      setShowVerify(false);
      setVerifyCode("");

      // به‌روزرسانی local storage یا store اگر نیاز باشد
      setTimeout(() => {
        setShowVerify(false);
      }, 2000);
    } catch (error: any) {
      console.error("Error verifying email:", error);

      if (error.response?.status === 400) {
        setErrorMessage("کد تأیید نامعتبر است");
      } else if (error.response?.status === 404) {
        setErrorMessage("درخواست تغییر ایمیل یافت نشد");
      } else if (error.response?.status === 410) {
        setErrorMessage("کد منقضی شده است. لطفاً دوباره درخواست کنید");
      } else {
        setErrorMessage("خطا در تأیید ایمیل");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setResendMessage("");

    try {
      await initiateEmailChangeService({ new_email: tempNewEmail });
      setResendMessage("کد جدید ارسال شد");
      setSuccessMessage("کد تأیید جدید به ایمیل شما ارسال شد");
    } catch (error: any) {
      console.error("Error resending code:", error);

      if (error.response?.status === 404) {
        setResendMessage("کاربر یافت نشد");
      } else if (error.response?.status === 429) {
        setResendMessage("تعداد درخواست‌ها زیاد است. لطفاً کمی صبر کنید");
      } else {
        setResendMessage("خطا در ارسال دوباره کد");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelVerify = () => {
    setShowVerify(false);
    setTempNewEmail("");
    setVerifyCode("");
    setResendMessage("");
    clearMessages();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getUserProfileService(userId);
        if (userRes) {
          setImage(userRes.profile_picture || null);
          setInitialValues({
            username: userRes.username || "",
            email: userRes.email || "",
            bio: userRes.bio || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setErrorMessage("خطا در دریافت اطلاعات پروفایل");
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-background" dir="ltr">
      {/* Header */}
      <div className="flex items-center mb-8 relative">
        <button
          className="p-2 border-2 border-primary rounded-xl hover:bg-primary transition"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <h1 className="text-2xl absolute left-1/2 -translate-x-[50%] font-extrabold text-primary text-center">
          اطلاعات پروفایل
        </h1>
      </div>

      {/* Avatar */}
      <div className="flex justify-center relative mb-8">
        <Avatar className="w-28 h-28 border border-neutral-gray">
          {image ? (
            <AvatarImage src={image} alt="Profile" />
          ) : (
            <AvatarFallback>?</AvatarFallback>
          )}
        </Avatar>

        <label
          htmlFor="profilePic"
          className="absolute bottom-1 right-[calc(50%-50px)] bg-white border border-primary text-primary rounded-full p-1.5 cursor-pointer hover:bg-primary transition shadow-sm"
        >
          <Pencil className="w-4 h-4" />
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* پیام‌ها */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center font-semibold flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center font-semibold flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {errorMessage}
        </div>
      )}

      {/* مرحله تأیید ایمیل */}
      {showVerify ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl border shadow">
          <h3 className="text-lg font-bold mb-3 text-center">
            تایید ایمیل جدید
          </h3>

          <p className="text-sm text-gray-600 mb-4 text-center">
            کد تأیید به ایمیل{" "}
            <span className="font-bold text-primary">{tempNewEmail}</span> ارسال
            شد.
          </p>
          <p className="text-xs text-gray-500 mb-6 text-center">
            لطفاً کد 6 رقمی را وارد کنید
          </p>

          <div className="flex flex-col gap-4">
            <input
              name="code"
              value={verifyCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setVerifyCode(value);
                clearMessages();
              }}
              maxLength={6}
              className="w-full border-2 border-gray-300 p-3 rounded-lg text-center text-lg tracking-widest font-mono focus:border-primary focus:outline-none"
              placeholder="------"
              dir="ltr"
            />

            <CustomBtn
              type="button"
              onClick={handleVerifyEmail}
              disabled={isLoading || verifyCode.length !== 6}
              className="w-full"
            >
              {isLoading ? "در حال تأیید..." : "تایید ایمیل"}
            </CustomBtn>
          </div>

          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className="w-full text-primary font-semibold text-center hover:underline disabled:opacity-50"
            >
              ارسال دوباره کد
            </button>

            <button
              type="button"
              onClick={handleCancelVerify}
              className="w-full text-gray-500 text-center hover:text-gray-700 text-sm"
            >
              لغو
            </button>
          </div>

          {resendMessage && (
            <p
              className={`text-center mt-3 text-sm ${
                resendMessage.includes("خطا")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {resendMessage}
            </p>
          )}
        </div>
      ) : (
        /* فرم پروفایل */
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, values }) => (
            <Form className="flex flex-col gap-6 max-w-lg mx-auto">
              <CustomInput name="username" label="نام کاربری" />

              <div>
                <CustomInput name="email" label="ایمیل جدید" />
                <p className="text-xs text-gray-500 mt-1" dir="rtl">
                  {values.email !== initialValues.email
                    ? "برای تغییر ایمیل، کد تأیید ارسال خواهد شد"
                    : "ایمیل فعلی شما"}
                </p>
              </div>

              <CustomTextArea name="bio" label="بیو" />

              <CustomBtn
                type="submit"
                disabled={isLoading || isSubmitting || !isValid}
                className="w-full mt-2 bg-secondry hover:bg-secondry-hover text-white py-3 rounded-xl font-semibold border border-black shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </CustomBtn>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
