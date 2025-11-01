import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput";
import CustomBtn from "@/components/Custom/CustomBtn";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("نام الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  bio: Yup.string().max(200, "بیو نمی‌تواند بیش از ۲۰۰ کاراکتر باشد"),
});

export default function ProfileInfo() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSubmit = (values: any) => {
    console.log("Profile submitted:", values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-6" dir="rtl">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            className="p-2 border-2 border-[var(--primary)] rounded-xl hover:bg-orange-50 transition"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-6 h-6 text-[var(--primary)]" />
          </button>
          <h1 className="text-xl font-extrabold text-[var(--primary)] text-center flex-1 translate-x-[-20px]">
            اطلاعات پروفایل
          </h1>
        </div>

        {/* Avatar */}
        <div className="flex justify-center relative mb-6">
          <Avatar className="w-24 h-24 border border-gray-400">
            {image ? (
              <AvatarImage src={image} alt="Profile" />
            ) : (
              <AvatarFallback>?</AvatarFallback>
            )}
          </Avatar>

          <label
            htmlFor="profilePic"
            className="absolute bottom-1 right-[calc(50%-46px)] bg-white border border-[var(--primary)] text-[var(--primary)] rounded-full p-1 cursor-pointer hover:bg-orange-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
              />
            </svg>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ firstName: "", lastName: "", bio: "" }}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="flex flex-col gap-4">
              <CustomInput name="firstName" label="نام" />
              <CustomInput name="lastName" label="نام خانوادگی" />
              <CustomInput
                name="bio"
                label="بیو"
                className="h-20"
                as="textarea"
                
              />

              <CustomBtn
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className="w-full mt-2 bg-[var(--secondry)] hover:bg-[var(--secondry-hover)] text-white py-3 rounded-xl font-semibold border border-black shadow-[0px_1px_0px_var(--borderDefault)] transition-all duration-300"
              >
                ثبت
              </CustomBtn>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
