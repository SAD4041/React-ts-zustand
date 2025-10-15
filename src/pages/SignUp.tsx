import CustomInput from "@/components/Custom/CustomInput";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Eye, EyeClosed, icons } from "lucide-react";

<<<<<<< HEAD
function Landing() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Welcome to My App 🚀
      </h1>

      <div className="flex items-center gap-2">
        <CustomInput className="w-64" />
        <Button>Submit</Button>
      </div>
=======


function SignUp() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-background">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Welcome to My App 🚀
      </h1>

      <Formik
        initialValues={{ username: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required("وارد کردن نام کاربری الزامی است")
            .min(3, "حداقل ۳ کاراکتر وارد کنید"),
        })}
        onSubmit={(values) => {
          console.log("Form values:", values);
          alert(`Welcome ${values.username}!`);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex items-center gap-2">
            <CustomInput name="username" label="نام کاربری" icon_1= <Eye /> icon_2= <EyeClosed />/>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
>>>>>>> develop
    </div>
  );
}

export default SignUp;
