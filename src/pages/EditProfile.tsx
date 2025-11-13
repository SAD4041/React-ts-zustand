import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea";
import CustomBtn from "@/components/Custom/CustomBtn";
import { ArrowLeft, Pencil } from "lucide-react"; // ✅ اضافه شد
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileSchema, { ProfileInitialValues } from "@/schemas/EditPtofileSchema";


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
    <div className="min-h-screen w-full px-6 py-10 bg-background" dir="ltr">
      {/* Header */}
      <div className="flex items-center mb-8 relative">
        <button
          className="p-2 border-2 border-primary rounded-xl hover:bg-orange-50 transition"
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
        <Avatar className="w-28 h-28 border border-gray-400">
          {image ? (
            <AvatarImage src={image} alt="Profile" />
          ) : (
            <AvatarFallback>?</AvatarFallback>
          )}
        </Avatar>

        {/* آیکون مداد برای آپلود عکس */}
        <label
          htmlFor="profilePic"
          className="absolute bottom-1 right-[calc(50%-50px)] bg-white border border-primary text-primary rounded-full p-1.5 cursor-pointer hover:bg-orange-50 transition shadow-sm"
        >
          <Pencil className="w-4 h-4" /> {/* ✅ مداد جایگزین ضربدر */}
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
        initialValues={ProfileInitialValues}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="flex flex-col gap-6 max-w-lg mx-auto">
            <CustomInput name="firstName" label="نام" />
            <CustomInput name="lastName" label="نام خانوادگی" />
            <CustomTextArea label="بیو" name="bio" />

            <CustomBtn
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
              className="w-full mt-2 bg-secondry hover:bg-secondry-hover text-white py-3 rounded-xl font-semibold border border-black shadow-[0px_1px_0px_borderDefault] transition-all duration-300"
            >
              ثبت
            </CustomBtn>
          </Form>
        )}
      </Formik>
    </div>
  );
}
