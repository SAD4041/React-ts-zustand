import { Form, Formik, type FormikHelpers } from "formik";
import mobileBg from "@/assets/Img/Mobile-background.png";
import desktopBg from "@/assets/Img/Desktop-background-2.png";
import walkingMan from "@/assets/Img/Walking-man-2.png";
import CustomInput from "@/components/Custom/CustomInput";
import CustomBtn from "@/components/Custom/CustomBtn";
import type { FormValues } from "@/types/loginFormTypes";
import { useMobile } from "@/hooks/ResponsiveHooks";
import loginFormSchemaConfig from "@/schemas/loginFormSchema";
export default function Login() {
  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted!");
  };
  const bg = useMobile() ? mobileBg : desktopBg;
  return (
    <div
      className={`w-screen h-screen flex justify-center items-center px-2 `}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="p-5 flex  rounded-3xl bg-white">
        <div className="flex items-end justify-center  h-[410px]">
          <img
            className="w-(--walking-man-width) h-(--walking-man-height)"
            src={walkingMan}
            alt=""
          />
        </div>
        <div className="flex flex-col-reverse justify-around sm:w-[420px] h-[410px] p-[6px] py-[20px]">
          <Formik {...loginFormSchemaConfig} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="space-y-8  mx-auto">
                  <CustomInput name="email" label="ایمیل" />
                  <CustomInput
                    name="password"
                    type="password"
                    label="رمز ورود"
                  />
                  <CustomBtn
                    disabled={isSubmitting}
                    color="#fff"
                    className="w-72 bg-[#ff7700] mt-auto"
                    type="submit"
                  >
                    ورود
                  </CustomBtn>
                </div>
              </Form>
            )}
          </Formik>

          <p className="text-center font-bold text-title mt-5 text-[#ff7700]">
            خوش اومدی
          </p>
        </div>
      </div>
    </div>
  );
}
