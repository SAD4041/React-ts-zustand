import { Form, Formik, type FormikHelpers } from "formik";
import walkingMan from "@/assets/Img/Walking-man-2.png";
import CustomInput from "@/components/Custom/CustomInput";
import CustomBtn from "@/components/Custom/CustomBtn";
import type { FormValues } from "@/types/loginFormTypes";
import { useMobile, useTablet } from "@/hooks/ResponsiveHooks";
import loginFormSchemaConfig from "@/schemas/loginFormSchema";
import { Eye, EyeClosed } from "lucide-react";
import CustomCheckbox from "@/components/Custom/CustomCheckbox";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Link } from "react-router-dom";
import useUserStore from "@/store/userStore/userStore";

export default function Login() {
  const {setUsername,setToken,setUserId} = useUserStore();
  const [showPassword, setShowPassword] = useState(true);
  
  const onSubmit = async (
    values: LoginPayload,
    actions: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      // Optional loading delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // ✅ Call the login service
      const response = await loginService(values);

      // ✅ Example: assuming your backend returns { token, user }
      if (response?.token) {
        // localStorage.setItem("token", response.token); // interceptor will use it
        setToken(response.token);
        setUsername(response.user.username);
        setUserId(response.user.id);
      }

      console.log("Login success:", response);

      // You could redirect or show a toast here
      // e.g., navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      // alert(error?.response?.data?.message || "Login failed");
      CustomToast("Login failed","error");
    } finally {
      actions.setSubmitting(false);
    }
  };

  const bg = useMobile();
  return (
    <div
      className={`w-screen h-screen flex justify-center items-center px-2 bg-cover bg-white ${
        !useMobile() && "bg-[url(@/assets/Img/Desktop-background-2.png)]"
      }`}
      // style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className={`p-5 flex md:flex-row rounded-3xl ${
          useMobile() && "w-9/10"
        } bg-white`}
      >
        <div className="hidden md:opacity-100 md:flex items-end justify-center  h-[410px]">
          <img
            className="w-(--walking-man-width) h-(--walking-man-height)"
            src={walkingMan}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full justify-around sm:w-(--login-from-w) h-(--login-form-h) p-[6px] py-[20px]  rounded-3xl">
          <p className="text-center text-right font-bold text-title mb-10 text-primary">
            !خوش اومدی
          </p>
          <Formik {...loginFormSchemaConfig} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="space-y-8  mx-auto">
                  <p className="text-right">
                    لطفا ایمیل و رمز عبور خود را وارد کنید
                  </p>
                  <CustomInput name="email" label="ایمیل" />
                  <CustomInput
                    name="password"
                    label="رمز ورود"
                    type={showPassword ? "text" : "password"}
                    icon={showPassword ? <EyeClosed /> : <Eye />}
                    onIconClick={() => setShowPassword(!showPassword)}
                  />
                  <CustomCheckbox
                    name="loginAcceptTerms"
                    labelText="قوانین و مقررات را خوانده و می پذیرم" 
                    textTransparentOnChecked={false}
                    classNames={{ label: "text-sm text-gray-600 font-extrabold", checkbox: "" }}
                  />
                  <CustomBtn
                    disabled={isSubmitting}
                    color="#fff"
                    className="w-72 bg-primary mt-auto"
                    type="submit"
                    loading={isSubmitting}
                  >
                    ورود
                  </CustomBtn>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex justify-end items-center">
            <Link to="/signup" className="text-secondary mr-1">
              ثبت نام
            </Link>
            <p>حساب کاربری ندارید؟</p>
          </div>
        </div>
      </div>
    </div>
  );
}
