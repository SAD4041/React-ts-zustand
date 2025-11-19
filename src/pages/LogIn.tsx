import { Form, Formik, type FormikHelpers } from "formik";
import walkingMan from "@/assets/Img/Walking-man-2.png";
import CustomInput from "@/components/Custom/CustomInput";
import CustomBtn from "@/components/Custom/CustomBtn";
import type { FormValues } from "@/types/loginFormTypes";
import { useMobile } from "@/hooks/ResponsiveHooks";
import loginFormSchemaConfig from "@/schemas/loginFormSchema";
import { Eye, EyeClosed } from "lucide-react";
import CustomCheckbox from "@/components/Custom/CustomCheckbox";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@radix-ui/react-checkbox";
import type { LoginPayload } from "@/types/authTypes";
import { loginService } from "@/services/authService";
import CustomToast from "@/components/Custom/CustomToast";
import { Link, useNavigate } from "react-router-dom"; // ← اضافه شد
import useUserStore from "@/store/userStore/userStore";

export default function Login() {
  const { setUsername, setToken, setUserId } = useUserStore();
  const navigate = useNavigate(); // ← اضافه شد
  const [showPassword, setShowPassword] = useState(true);
  const [loginStatus, setLoginStatus] = useState<string | null>(null); // وضعیت لاگین

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      // Optional delay for UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await loginService(values);
      const user = response.user_response;

      if (user?.token) {
        setToken(user.token);
        setUsername(user.username);
        setUserId(user.id);

        console.log("Login success:", response);

        setLoginStatus("ورود با موفقیت انجام شد!");
        setTimeout(() => {
          navigate(`/dashboard/${response.user_response.id}`);
        }, 2000);
      } else {
        setLoginStatus("ورود انجام نشد، دوباره تلاش کنید.");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setLoginStatus(error?.response?.data?.message || "ورود انجام نشد!");
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
          <p className="text-center text-right font-bold text-title mb-2 text-primary">
            !خوش اومدی
          </p>

          {/* نمایش وضعیت لاگین */}
          {loginStatus && (
            <p
              className={`text-right mb-4 font-bold ${
                loginStatus.includes("موفق") ? "text-green-600" : "text-red-600"
              }`}
            >
              {loginStatus}
            </p>
          )}

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
                    classNames={{
                      label: "text-sm text-gray-600 font-extrabold",
                      checkbox: "",
                    }}
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
