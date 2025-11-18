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

  studentId: Yup.string()
    .matches(/^[0-9]+$/, "شماره دانشجویی باید فقط شامل اعداد باشد")
    .min(6, "شماره دانشجویی باید حداقل ۶ رقم باشد")
    .required("شماره دانشجویی الزامی است"),

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
});

function TeamRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [teamData, setTeamData] = useState({
    teamName: "",
    members: [
      {
        name: "",
        familyName: "",
        email: "",
        phone: "",
        studentId: "",
        university: "",
        role: "کاپیتان",
      },
      {
        name: "",
        familyName: "",
        email: "",
        phone: "",
        studentId: "",
        university: "",
        role: "عضو اول",
      },
      {
        name: "",
        familyName: "",
        email: "",
        phone: "",
        studentId: "",
        university: "",
        role: "عضو دوم",
      },
    ],
  });

  const steps = [
    { title: "نام تیم", icon: Award },
    { title: "کاپیتان تیم", icon: User },
    { title: "عضو اول", icon: User },
    { title: "عضو دوم", icon: User },
    { title: "تایید نهایی", icon: CheckCircle },
  ];

  const handleTeamNameSubmit = (values, { setSubmitting }) => {
    setTeamData({ ...teamData, teamName: values.teamName });
    setCurrentStep(1);
    setSubmitting(false);
  };

  const handleMemberSubmit = (values, { setSubmitting }) => {
    const updatedMembers = [...teamData.members];
    updatedMembers[currentStep - 1] = {
      ...values,
      role: teamData.members[currentStep - 1].role,
    };
    setTeamData({ ...teamData, members: updatedMembers });
    setCurrentStep(currentStep + 1);
    setSubmitting(false);
  };

  const handleFinalSubmit = () => {
    console.log("Team Registration Data:", teamData);
    alert("تیم شما با موفقیت ثبت شد!");
    // اینجا می‌توانید API call انجام دهید
    // await registerTeam(teamData);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEdit = (step) => {
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
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index < currentStep
                      ? "bg-green-500 text-white"
                      : index === currentStep
                      ? "bg-[#FFD500] text-[#00274D]"
                      : "bg-white/20 text-white/50"
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <p className="text-white text-xs mt-2 text-center hidden md:block">
                  {step.title}
                </p>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-6 h-0.5 transition-all duration-300 hidden md:block ${
                      index < currentStep ? "bg-green-500" : "bg-white/20"
                    }`}
                    style={{
                      width: "calc((100% - 48px) / 4)",
                      right: `calc(${index * 25}% + 24px)`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Step 0: نام تیم */}
          {currentStep === 0 && (
            <Formik
              initialValues={{ teamName: teamData.teamName }}
              validationSchema={teamValidationSchema}
              onSubmit={handleTeamNameSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="text-center mb-8">
                    <Users className="w-16 h-16 mx-auto mb-4 text-[#FFD500]" />
                    <h1 className="text-white text-3xl font-bold mb-2">
                      ثبت‌نام تیم
                    </h1>
                    <p className="text-gray-300">
                      ابتدا یک نام منحصر به فرد برای تیم خود انتخاب کنید
                    </p>
                  </div>

                  <div className="space-y-6">
                    <CustomInput
                      name="teamName"
                      type="text"
                      label="نام تیم"
                      className="w-full px-4 py-3 rounded-lg text-lg"
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FFD500]/50 active:scale-95"
                    >
                      ادامه
                      <ArrowLeft className="w-5 h-5 mr-2 inline-block" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Steps 1-3: اطلاعات اعضا */}
          {currentStep >= 1 && currentStep <= 3 && (
            <Formik
              initialValues={teamData.members[currentStep - 1]}
              validationSchema={memberValidationSchema}
              onSubmit={handleMemberSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-[#FFD500]/20 rounded-2xl mb-4">
                      <User className="w-12 h-12 text-[#FFD500]" />
                    </div>
                    <h1 className="text-white text-3xl font-bold mb-2">
                      {teamData.members[currentStep - 1].role}
                    </h1>
                    <p className="text-gray-300">
                      لطفا اطلاعات {teamData.members[currentStep - 1].role} را
                      وارد کنید
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                      name="studentId"
                      type="text"
                      label="شماره دانشجویی"
                      className="w-full px-4 py-3 rounded-lg"
                      dir="ltr"
                    />

                    <CustomInput
                      name="university"
                      type="text"
                      label="نام دانشگاه"
                      className="w-full px-4 py-3 rounded-lg"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200"
                    >
                      <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                      قبلی
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FFD500]/50 active:scale-95"
                    >
                      ادامه
                      <ArrowLeft className="w-5 h-5 mr-2 inline-block" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Step 4: تایید نهایی */}
          {currentStep === 4 && (
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

              {/* نمایش نام تیم */}
              <div className="bg-[#FFD500]/10 border border-[#FFD500]/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[#FFD500] font-semibold mb-2">
                      نام تیم
                    </h3>
                    <p className="text-white text-xl font-bold">
                      {teamData.teamName}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleEdit(0)}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
                  >
                    ویرایش
                  </Button>
                </div>
              </div>

              {/* نمایش اطلاعات اعضا */}
              <div className="space-y-4 mb-6">
                {teamData.members.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#FFD500] font-semibold text-lg">
                        {member.role}
                      </h3>
                      <Button
                        onClick={() => handleEdit(index + 1)}
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
                          {member.name} {member.familyName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">ایمیل: </span>
                        <span className="text-white font-semibold" dir="ltr">
                          {member.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">شماره موبایل: </span>
                        <span className="text-white font-semibold" dir="ltr">
                          {member.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">شماره دانشجویی: </span>
                        <span className="text-white font-semibold" dir="ltr">
                          {member.studentId}
                        </span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-400">دانشگاه: </span>
                        <span className="text-white font-semibold">
                          {member.university}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200"
                >
                  <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                  قبلی
                </Button>
                <Button
                  onClick={handleFinalSubmit}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 active:scale-95"
                >
                  <CheckCircle className="w-5 h-5 ml-2 inline-block" />
                  تایید و ثبت نهایی
                </Button>
              </div>
            </div>
          )}
        </div>
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

export default TeamRegistration;
