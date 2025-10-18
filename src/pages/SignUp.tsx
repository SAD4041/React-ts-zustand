import CustomInput from "@/components/Custom/CustomInput";
import { Button } from "@/components/ui/button";
import CustomCheckbox from '@/components/Custom/CustomCheckbox';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: "",
    password: "",
    firstCheckbox: false,
    secondCheckbox: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("وارد کردن نام کاربری الزامی است")
      .min(3, "حداقل ۳ کاراکتر وارد کنید"),
    password: Yup.string()
      .required("وارد کردن رمز عبور الزامی است")
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    firstCheckbox: Yup.boolean()
      .oneOf([true], "چک باکس اول باید انتخاب شود")
      .required("این فیلد الزامی است"),
    secondCheckbox: Yup.boolean()
      .oneOf([true], "چک باکس دوم باید انتخاب شود")
      .required("این فیلد الزامی است"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form values:", values);
    alert(`Welcome ${values.username}!`);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-background">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Welcome to My App 🚀
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center gap-4 w-72">
            <CustomInput
              name="username"
              label="نام کاربری"
            />
            <CustomInput
              name="password"
              label="رمز عبور"
              type={showPassword ? "text" : "password"}
              icon={showPassword ? <EyeClosed /> : <Eye />}
              onIconClick={() => setShowPassword((prev) => !prev)}
            />

            <div className="flex flex-col items-center gap-5">
              <CustomCheckbox 
                name="firstCheckbox"
                labelText="چک باکس اول" 
                textTransparentOnChecked={true}
              />
              <CustomCheckbox 
                name="secondCheckbox"
                labelText="چک باکس دوم" 
                textTransparentOnChecked={false}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-4">
              submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;
