import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // برای ریدایرکت
import { Formik, Form } from "formik";
import CustomInput from "@/components/Custom/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea";
import CustomBtn from "@/components/Custom/CustomBtn";
import { ArrowLeft, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileSchema, { ProfileInitialValues } from "@/schemas/EditPtofileSchema";
import { getUserProfileService, putUserProfileService } from "@/services/userService";
import useUserStore from "@/store/userStore/userStore";


interface ProfileValues {
  username: string;
  email: string;
  bio: string;
}

export default function ProfileInfo() {
  const [image, setImage] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<ProfileValues>(ProfileInitialValues);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate(); // برای ریدایرکت
  const { userId } = useUserStore(); // کاربر لاگین شده


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (values: ProfileValues) => {
    try {
      const updatedUser = await putUserProfileService(userId, {
        username: values.username,
        email: values.email,
        bio: values.bio,
        profile_picture: image || undefined,
      });

      console.log("Profile updated successfully:", updatedUser);

      setSuccessMessage("تغییرات با موفقیت ثبت شد!");

      setTimeout(() => {
        navigate(`/dashboard/${userId}`);
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSuccessMessage("خطا در ثبت تغییرات"); // Optional: پیام خطا
    }
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
      }
    };

    fetchData();
  }, []);

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
        <h1 className="text-2xl absolute left-1/2 -translate-x-1/2 font-extrabold text-primary text-center">
          اطلاعات پروفایل
        </h1>
      </div>

      {/* Avatar */}
      <div className="flex justify-center relative mb-8">
        <Avatar className="w-28 h-28 border border-gray-400">
          {image ? <AvatarImage src={image} alt="Profile" /> : <AvatarFallback>?</AvatarFallback>}
        </Avatar>

        <label
          htmlFor="profilePic"
          className="absolute bottom-1 right-[calc(50%-50px)] bg-white border border-primary text-primary rounded-full p-1.5 cursor-pointer hover:bg-orange-50 transition shadow-sm"
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

      {/* پیام موفقیت */}
      {successMessage && (
        <div className="mb-4 text-center text-green-600 font-semibold">{successMessage}</div>
      )}

      {/* Form */}
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="flex flex-col gap-6 max-w-lg mx-auto">
            <CustomInput name="username" label="نام کاربری جدید" />
            <CustomInput name="email" label="پست الکترونیک جدید" />
            <CustomTextArea name="bio" label="بیو جدید" />

            <CustomBtn
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full mt-2 bg-secondry hover:bg-secondry-hover text-white py-3 rounded-xl font-semibold border border-black shadow transition-all duration-300"
            >
              تغییر
            </CustomBtn>
          </Form>
        )}
      </Formik>
    </div>
  );
}
