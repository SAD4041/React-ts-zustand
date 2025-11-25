import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Custom/CustomInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Users,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Award,
} from "lucide-react";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import BG from "@/assets/BG.png";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// 🆕 ایمپورت سرویس تیم
import {
  createTeamService,
  inviteUserService,
  submitTeamService,
} from "@/services/teamService";
import type { CreateTeamPayload, InviteUserPayload } from "@/types/teamTypes";

// Validation schema برای اطلاعات هر عضو
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
});

// Validation برای اطلاعات تیم
const teamValidationSchema = Yup.object({
  teamName: Yup.string()
    .min(3, "نام تیم باید حداقل ۳ حرف باشد")
    .max(50, "نام تیم نباید بیشتر از ۵۰ حرف باشد")
    .required("نام تیم الزامی است"),
  teamDescription: Yup.string()
    .min(10, "توضیحات تیم باید حداقل ۱۰ حرف باشد")
    .max(500, "توضیحات تیم نباید بیشتر از ۵۰۰ حرف باشد")
    .required("توضیحات تیم الزامی است"),
});

// تایپ برای اطلاعات عضو
interface MemberData {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  university: string;
  nationalCode?: string;
  tshirtSize?: string;
}

function TeamRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamId, setTeamId] = useState<number | null>(null);

  // جدا کردن state‌ها برای جلوگیری از کانفلیکت
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    teamDescription: "",
  });

  const [member1, setMember1] = useState<MemberData>({
    name: "",
    familyName: "",
    email: "",
    phone: "",
    university: "",
    nationalCode: "",
    tshirtSize: "M",
  });

  const [member2, setMember2] = useState<MemberData>({
    name: "",
    familyName: "",
    email: "",
    phone: "",
    university: "",
    nationalCode: "",
    tshirtSize: "M",
  });

  const steps = [
    { title: "نام و توضیح تیم", icon: Award },
    { title: "عضو دوم", icon: User },
    { title: "عضو سوم", icon: User },
    { title: "تایید نهایی", icon: CheckCircle },
  ];

  // 🆕 مرحله 1: ایجاد تیم
  const handleCreateTeam = async (values: {
    teamName: string;
    teamDescription: string;
  }) => {
    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("توکن یافت نشد. لطفا دوباره وارد شوید.");
        navigate("/login");
        return;
      }

      const teamPayload: CreateTeamPayload = {
        name: values.teamName,
        description: values.teamDescription,
      };

      console.log("📋 Creating team with payload:", teamPayload);
      const response = await createTeamService(teamPayload);

      if (response?.data?.id) {
        setTeamId(response.data.id);
        setTeamInfo({
          teamName: values.teamName,
          teamDescription: values.teamDescription,
        });
        toast.success("تیم با موفقیت ایجاد شد!");
        setCurrentStep(1);
      } else {
        throw new Error("خطا در ایجاد تیم");
      }
    } catch (error: any) {
      console.error("Error creating team:", error);

      if (error?.messages?.team?.user_already_has_team) {
        toast.error("شما قبلاً یک تیم دارید");
      } else if (error?.messages?.team?.name_already_exists) {
        toast.error("این نام تیم قبلاً انتخاب شده است");
      } else if (error?.response?.data?.messages?.team) {
        toast.error(
          Object.values(error.response.data.messages.team)[0] as string
        );
      } else {
        toast.error(error?.message || "خطا در ایجاد تیم");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🆕 ذخیره اطلاعات عضو اول
  const handleMember1Submit = (values: MemberData) => {
    setMember1(values);
    toast.success("اطلاعات عضو دوم ذخیره شد!");
    setCurrentStep(2);
  };

  // 🆕 ذخیره اطلاعات عضو دوم
  const handleMember2Submit = (values: MemberData) => {
    setMember2(values);
    toast.success("اطلاعات عضو سوم ذخیره شد!");
    setCurrentStep(3);
  };

  // 🆕 مرحله نهایی: ارسال هر دو عضو با هم
  const handleFinalSubmit = async () => {
    if (!teamId) {
      toast.error("تیم یافت نشد");
      return;
    }

    // بررسی کامل بودن اطلاعات
    const requiredFields = [
      "name",
      "familyName",
      "email",
      "phone",
      "university",
    ];

    for (const member of [member1, member2]) {
      for (const field of requiredFields) {
        if (!member[field]) {
          toast.error(
            `لطفا اطلاعات ${
              field === "name"
                ? "نام"
                : field === "familyName"
                ? "نام خانوادگی"
                : field === "email"
                ? "ایمیل"
                : field === "phone"
                ? "شماره موبایل"
                : "دانشگاه"
            } را کامل کنید`
          );
          return;
        }
      }
    }

    try {
      setIsSubmitting(true);

      // دعوت هر دو عضو در یک درخواست
      const membersPayload: InviteUserPayload = {
        members: [
          {
            first_name: member1.name,
            last_name: member1.familyName,
            email: member1.email,
            phone: member1.phone,
            university: member1.university,
            national_code: member1.nationalCode || "",
            tshirt_size: member1.tshirtSize || "M",
          },
          {
            first_name: member2.name,
            last_name: member2.familyName,
            email: member2.email,
            phone: member2.phone,
            university: member2.university,
            national_code: member2.nationalCode || "",
            tshirt_size: member2.tshirtSize || "M",
          },
        ],
      };

      console.log("📨 دعوت اعضا:", membersPayload);
      await inviteUserService(teamId.toString(), membersPayload);

      toast.success(" اعضا دعوت شدند.پس از تایید اعضا نسبت به نهایی کردن تیم اقدام کنید");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("❌ خطا در تشکیل تیم:", error);

      if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error;
        toast.error(errorMessage || "خطا در اطلاعات وارد شده");
      } else {
        toast.error(
          error?.message || "خطا در تشکیل تیم. لطفا دوباره تلاش کنید"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
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
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-6 mb-6 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 relative z-10"
              >
                <button
                  onClick={() => index < currentStep && handleEditStep(index)}
                  disabled={index >= currentStep}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index < currentStep
                      ? "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                      : index === currentStep
                      ? "bg-[#FFD500] text-[#00274D]"
                      : "bg-white/20 text-white/50"
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </button>
                <p className="text-white text-xs mt-2 text-center hidden md:block">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#00274D] backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Step 0: نام و توضیح تیم */}
          {currentStep === 0 && (
            <Formik
              initialValues={teamInfo}
              validationSchema={teamValidationSchema}
              onSubmit={handleCreateTeam}
            >
              {({ isSubmitting: formSubmitting }) => (
                <Form>
                  <div className="text-center mb-8">
                    <Users className="w-16 h-16 mx-auto mb-4 text-[#FFD500]" />
                    <h1 className="text-white text-3xl font-bold mb-2">
                      ثبت‌نام تیم
                    </h1>
                    <p className="text-gray-300">
                      نام و توضیحات تیم خود را وارد کنید
                    </p>
                  </div>

                  <div className="space-y-6">
                    <CustomInput
                      name="teamName"
                      type="text"
                      label="نام تیم"
                      className="w-full px-4 py-3 rounded-lg text-lg"
                    />

                    <CustomInput
                      name="teamDescription"
                      type="text"
                      label="توضیحات تیم"
                      className="w-full px-4 py-3 rounded-lg"
                    />

                    <Button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FFD500]/50 active:scale-95"
                    >
                      ادامه
                      <ArrowRight className="w-5 h-5 mr-2 inline-block" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Step 1: اطلاعات عضو اول */}
          {currentStep === 1 && (
            <Formik
              initialValues={member1}
              validationSchema={memberValidationSchema}
              onSubmit={handleMember1Submit}
              enableReinitialize
            >
              {({ isSubmitting: formSubmitting }) => (
                <Form>
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-[#FFD500]/20 rounded-2xl mb-4">
                      <User className="w-12 h-12 text-[#FFD500]" />
                    </div>
                    <h1 className="text-white text-3xl font-bold mb-2">
                      عضو دوم
                    </h1>
                    <p className="text-gray-300">
                      لطفا اطلاعات عضو دوم را وارد کنید
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                  dir="rtl">
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
                      label="کد ملی"
                      className="w-full px-4 py-3 rounded-lg"
                    />

                    <CustomInput
                      name="tshirtSize"
                      type="text"
                      label="سایز تیشرت"
                      className="w-full px-4 py-3 rounded-lg"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200"
                    >
                      <ArrowLeft className="w-5 h-5 ml-2 inline-block" />
                      قبلی
                    </Button>
                    <Button
                      type="submit"
                      disabled={formSubmitting}
                      className="flex-1 bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FFD500]/50 active:scale-95"
                    >
                      ذخیره و ادامه
                      <ArrowRight className="w-5 h-5 mr-2 inline-block" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Step 2: اطلاعات عضو دوم */}
          {currentStep === 2 && (
            <Formik
              initialValues={member2}
              validationSchema={memberValidationSchema}
              onSubmit={handleMember2Submit}
              enableReinitialize
            >
              {({ isSubmitting: formSubmitting }) => (
                <Form>
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-[#FFD500]/20 rounded-2xl mb-4">
                      <User className="w-12 h-12 text-[#FFD500]" />
                    </div>
                    <h1 className="text-white text-3xl font-bold mb-2">
                      عضو سوم
                    </h1>
                    <p className="text-gray-300">
                      لطفا اطلاعات عضو سوم را وارد کنید
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                  dir="rtl">
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
                      label="کد ملی"
                      className="w-full px-4 py-3 rounded-lg"
                    />

                    <CustomInput
                      name="tshirtSize"
                      type="text"
                      label="سایز تیشرت"
                      className="w-full px-4 py-3 rounded-lg"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200"
                    >
                      <ArrowLeft className="w-5 h-5 ml-2 inline-block" />
                      قبلی
                    </Button>
                    <Button
                      type="submit"
                      disabled={formSubmitting}
                      className="flex-1 bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FFD500]/50 active:scale-95"
                    >
                      ذخیره و ادامه
                      <ArrowRight className="w-5 h-5 mr-2 inline-block" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Step 3: تایید نهایی */}
          {currentStep === 3 && (
            <div>
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h1 className="text-white text-3xl font-bold mb-2">
                  بررسی و تایید اطلاعات
                </h1>
                <p className="text-gray-300">
                  لطفا اطلاعات وارد شده را بررسی و در صورت صحت بودن، تایید نهایی
                  کنید
                </p>
              </div>

              {/* نمایش نام تیم و توضیحات */}
              <div className="bg-[#FFD500]/10 border border-[#FFD500]/30 rounded-xl p-6 mb-6"
              dir="rtl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-[#FFD500] font-semibold mb-2">
                      نام تیم
                    </h3>
                    <p className="text-white text-xl font-bold mb-4">
                      {teamInfo.teamName}
                    </p>

                    <h3 className="text-[#FFD500] font-semibold mb-2">
                      توضیحات تیم
                    </h3>
                    <p className="text-white text-sm whitespace-pre-wrap">
                      {teamInfo.teamDescription}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleEditStep(0)}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 ml-4"
                  >
                    ویرایش
                  </Button>
                </div>
              </div>

              {/* نمایش اطلاعات اعضا */}
              <div className="space-y-4 mb-6"
              dir="rtl">
                {/* عضو اول */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#FFD500] font-semibold text-lg">
                      عضو دوم
                    </h3>
                    <Button
                      onClick={() => handleEditStep(1)}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
                    >
                      ویرایش
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">
                        نام و نام خانوادگی:{" "}
                      </span>
                      <span className="text-white font-semibold">
                        {member1.name} {member1.familyName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">ایمیل: </span>
                      <span className="text-white font-semibold" dir="ltr">
                        {member1.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">شماره موبایل: </span>
                      <span className="text-white font-semibold" dir="ltr">
                        {member1.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">دانشگاه: </span>
                      <span className="text-white font-semibold">
                        {member1.university}
                      </span>
                    </div>
                    {member1.nationalCode && (
                      <div>
                        <span className="text-gray-400">کد ملی: </span>
                        <span className="text-white font-semibold">
                          {member1.nationalCode}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">سایز تیشرت: </span>
                      <span className="text-white font-semibold">
                        {member1.tshirtSize}
                      </span>
                    </div>
                  </div>
                </div>

                {/* عضو دوم */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#FFD500] font-semibold text-lg">
                      عضو سوم
                    </h3>
                    <Button
                      onClick={() => handleEditStep(2)}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
                    >
                      ویرایش
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">
                        نام و نام خانوادگی:{" "}
                      </span>
                      <span className="text-white font-semibold">
                        {member2.name} {member2.familyName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">ایمیل: </span>
                      <span className="text-white font-semibold" dir="ltr">
                        {member2.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">شماره موبایل: </span>
                      <span className="text-white font-semibold" dir="ltr">
                        {member2.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">دانشگاه: </span>
                      <span className="text-white font-semibold">
                        {member2.university}
                      </span>
                    </div>
                    {member2.nationalCode && (
                      <div>
                        <span className="text-gray-400">کد ملی: </span>
                        <span className="text-white font-semibold">
                          {member2.nationalCode}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">سایز تیشرت: </span>
                      <span className="text-white font-semibold">
                        {member2.tshirtSize}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5 ml-2 inline-block" />
                  قبلی
                </Button>
                <Button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5 ml-2 inline-block" />
                  {isSubmitting
                    ? "درحال ارسال دعوت..."
                    : "ارسال دعوت"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* لوگو گوشه پایین سمت راست */}
      {/* <img
        src={ELMOCPC}
        alt="ELMOCPC Logo"
        className="absolute bottom-4 right-4 w-32 opacity-80 hover:opacity-100 transition-opacity duration-300"
      /> */}

      {/* لوگو گوشه پایین سمت چپ */}
      {/* <img
        src={CESA}
        alt="CESA Logo"
        className="absolute bottom-4 left-4 w-20 opacity-80 hover:opacity-100 transition-opacity duration-300"
      /> */}
    </div>
  );
}

export default TeamRegistration;
