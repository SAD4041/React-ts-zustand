import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { UserPlus, Send, ArrowLeft } from "lucide-react";
import BG from "@/assets/BG.png";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { inviteUserService } from "@/services/teamService";
import type { InviteUserPayload } from "@/types/teamTypes";

// Validation schema برای اطلاعات عضو
const memberValidationSchema = Yup.object({
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

  university: Yup.string()
    .min(3, "نام دانشگاه باید حداقل ۳ حرف باشد")
    .required("نام دانشگاه الزامی است"),

  nationalCode: Yup.string()
    .matches(/^[0-9]{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .optional(),

  tshirtSize: Yup.string().optional(),
});

interface MemberData {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  university: string;
  nationalCode?: string;
  tshirtSize?: string;
}

function InviteMember() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: MemberData = {
    name: "",
    familyName: "",
    email: "",
    phone: "",
    university: "",
    nationalCode: "",
    tshirtSize: "M",
  };

  const handleInviteMember = async (values: MemberData) => {
    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("توکن یافت نشد. لطفا دوباره وارد شوید.");
        navigate("/login");
        return;
      }

      // دریافت teamId از localStorage یا props
      const teamId = Number(localStorage.getItem("teamId")) || 42;

      if (!teamId) {
        toast.error("تیم یافت نشد. لطفا ابتدا تیم ایجاد کنید.");
        navigate("/dashboard");
        return;
      }

      const invitePayload: InviteUserPayload = {
        members: [
          {
            first_name: values.name,
            last_name: values.familyName,
            email: values.email,
            phone: values.phone,
            university: values.university,
            national_code: values.nationalCode || "",
            tshirt_size: values.tshirtSize || "M",
          },
        ],
      };

      console.log("📨 ارسال دعوت:", invitePayload);
      await inviteUserService(teamId.toString(), invitePayload);

      toast.success("دعوت با موفقیت ارسال شد!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("❌ خطا در ارسال دعوت:", error);

      if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error;
        toast.error(errorMessage || "خطا در اطلاعات وارد شده");
      } else {
        toast.error(error?.message || "خطا در ارسال دعوت. لطفا دوباره تلاش کنید");
      }
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="w-full max-w-2xl">
        {/* Form Container */}
        <div className="bg-[#00274D]/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <Formik
            initialValues={initialValues}
            validationSchema={memberValidationSchema}
            onSubmit={handleInviteMember}
          >
            {({ isSubmitting: formSubmitting }) => (
              <Form>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-[#FFD500]/20 rounded-2xl mb-4">
                    <UserPlus className="w-12 h-12 text-[#FFD500]" />
                  </div>
                  <h1 className="text-white text-3xl font-bold mb-2">
                    دعوت عضو جدید
                  </h1>
                  <p className="text-gray-300">
                    اطلاعات عضو جدید را وارد کنید تا دعوت‌نامه برای او ارسال شود
                  </p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" dir="rtl">
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
                    name="university"
                    type="text"
                    label="نام دانشگاه"
                    className="w-full px-4 py-3 rounded-lg"
                  />

                  <CustomInput
                    name="nationalCode"
                    type="text"
                    label="کد ملی (اختیاری)"
                    className="w-full px-4 py-3 rounded-lg"
                    maxLength={10}
                  />

                  <CustomInput
                    name="tshirtSize"
                    type="text"
                    label="سایز تیشرت"
                    className="w-full px-4 py-3 rounded-lg"
                    placeholder="M"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200"
                  >
                    <ArrowLeft className="w-5 h-5 ml-2 inline-block" />
                    بازگشت
                  </Button>
                  <Button
                    type="submit"
                    disabled={formSubmitting || isSubmitting}
                    className="flex-1 bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FFD500]/50 active:scale-95"
                  >
                    <Send className="w-5 h-5 ml-2 inline-block" />
                    {formSubmitting || isSubmitting ? "در حال ارسال..." : "ارسال دعوت"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default InviteMember;