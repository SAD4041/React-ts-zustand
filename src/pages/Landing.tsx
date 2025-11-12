import { useNavigate } from "react-router-dom";
import CustomInput from "@/components/Custom/CustomInput";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";
import BG from "@/assets/BG.png"; // ✅ تصویر پس‌زمینه

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("نام الزامی است"),
  familyName: Yup.string().required("نام خانوادگی الزامی است"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "شماره همراه باید فقط شامل اعداد باشد")
    .min(10, "شماره همراه باید حداقل ۱۰ رقم باشد")
    .required("شماره همراه الزامی است"),
});

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form values:", values);
    setSubmitting(false);
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
          {({ isSubmitting }) => (
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
                  />

                  <CustomInput
                    name="phone"
                    type="tel"
                    label="شماره تلفن"
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
                      focus:outline-none 
                      focus:ring-2 focus:ring-[#FFD500]/50
                    "
                  >
                    ثبت اطلاعات
                  </Button>

                  <p className="text-white text-center text-sm mt-4">
                    قبلا حساب کاربری داشته‌اید؟ وارد شوید
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* ✅ لوگو گوشه پایین سمت راست */}
      <img
        src={ELMOCPC}
        alt="ELMOCPC Logo"
        className="absolute bottom-4 right-4 w-32 opacity-80 hover:opacity-100 transition-opacity duration-300 mr-1 mb-1"
      />

      {/* ✅ لوگو گوشه پایین سمت چپ */}
      <img
        src={CESA}
        alt="CESA Logo"
        className="absolute bottom-4 left-4 w-20 opacity-80 hover:opacity-100 transition-opacity duration-300 "
      />
    </div>
  );
}

export default SignUp;
