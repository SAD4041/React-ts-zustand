import CustomInput from "@/components/Custom/CustomInput";
import CustomCheckbox from "@/components/Custom/CustomCheckbox";
import CustomBtn from "@/components/Custom/CustomBtn";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Eye, EyeClosed, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import telegramLogo from "../assets/telegram.svg";
import Stepper, { Step } from "../components/ui/Stepper";
import SignUpFormSchemaStep1Config from "@/schemas/SignUpFormSchemaStep1";
import SignUpFormSchemaStep2Config from "@/schemas/SignUpFormSchemaStep2";
import SignUpFormSchemaStep3Config from "@/schemas/SignUpFormSchemaStep3";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function SignUp() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    acceptTerms: false,
  };
  const [isPressedNext, setIsPressedNext] = useState<boolean>(false);
  const [isPressedBack, setIsPressedBack] = useState<boolean>(false);
  const [OTPvalue, setOTPValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [emailConfirmDisabled, setDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleClick = () => {
    setTimeLeft(10);
    setDisabled(true);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setDisabled(false);
    }
  }, [timeLeft]);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  useEffect(() => {
    setIsPressedBack(false);
    setIsPressedNext(false);
  }, [isPressedBack, isPressedNext]);

  return (
    <Stepper
      next={isPressedNext}
      back={isPressedBack}
      initialStep={1}
      onStepChange={(step) => {
        console.log(step);
      }}
      onFinalStepCompleted={() => console.log("All steps completed!")}
      backButtonText="Previous"
      nextButtonText="Next"
      className="min-h-screen flex items-center justify-center bg-gray-50"
      dir="rtl"
      stepCircleContainerClassName="bg-white "
      stepContainerClassName=""
      backButtonProps={{ className: "hidden" }}
      nextButtonProps={{ id: "stepper-next", className: "hidden" }}
      disableStepIndicators={true}
    >
      <Step>
        <div className="flex items-center justify-between mb-12 ">
          <img src={telegramLogo} alt="لوگو" className="w-18 h-18 rounded-xl" />
          <button
            className="p-2 border-2 border-primary rounded-xl hover:bg-primary-hover transition-colors"
            onClick={() => setIsPressedBack((prev) => !prev)}
          >
            <ArrowLeft className="w-8 h-8 text-primary" />
          </button>
        </div>

        <div className="text-right mb-8">
          <div className="text-4xl font-extrabold text-primary mb-2">
            ثبت نام
          </div>

          <p className="text-neutral-gray-bold text-sm font-extrabold">
            لطفا ایمیل و نام کاربری خود را وارد کنید
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SignUpFormSchemaStep1Config}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="flex flex-col items-stretch gap-4 w-full h-full">
              <CustomInput name="username" label="نام کاربری"/>

              <CustomInput name="email" label="پست الکترونیک" />

              <div className="flex items-center gap-2 self-start" dir="ltr">
                <CustomCheckbox
                  name="acceptTerms"
                  labelText=".قوانین و مقررات را خوانده و می‌پذیرم"
                  classNames={{
                    label: "text-sm text-gray-600 font-extrabold",
                    checkbox: `
                    rounded-[4px]
                    border-[2px] border-[#111]
                    bg-white
                    data-[state=checked]:bg-primary
                    data-[state=checked]:text-black
                  `,
                  }}
                />
              </div>
              <CustomBtn
                children="ثبت نام"
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className="
                  w-full mt-2 
                  bg-secondary hover:bg-white 
                  text-white py-3 rounded-xl 
                  font-semibold 
                  border-1 border-black 
                  shadow-[0px_1px_0px_var(--borderDefault)]
                  transition-all duration-300
                "
                onClick={() => setIsPressedNext((prev) => !prev)}
              />
            </Form>
          )}
        </Formik>
      </Step>
      <Step>
        <div className="flex items-center justify-end mb-12">
          <button
            className="p-2 border-2 border-primary rounded-xl hover:bg-primary-hover transition-colors"
            onClick={() => setIsPressedBack((prev) => !prev)}
          >
            <ArrowLeft className="w-8 h-8 text-primary" />
          </button>
        </div>

        <div className="text-right mb-8">
          <div className="text-4xl font-extrabold text-primary mb-2">
            ! رمز عبورت رو بساز
          </div>
          <p className="text-neutral-gray-bold text-sm font-extrabold">
            رمز عبورت باید حداقل ۸ کاراکتر و شامل عدد و علامت خاص باشد تا امنیت
            حسابت حفظ شود
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SignUpFormSchemaStep2Config}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="flex flex-col items-stretch gap-4 w-full h-full">
              <CustomInput
                name="password"
                type={showPassword ? "text" : "password"}
                label="رمزعبور"
                icon={showPassword ? <EyeClosed /> : <Eye />}
                onIconClick={() => setShowPassword((prev) => !prev)}
              />

              <CustomInput
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="تکرار رمزعبور"
                icon={showConfirmPassword ? <EyeClosed /> : <Eye />}
                onIconClick={() => setShowConfirmPassword((prev) => !prev)}
              />

              <CustomBtn
                children="ثبت نام"
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className="
                  w-full mt-2 
                  bg-secondary hover:bg-secondry-hover
                  text-white py-3 rounded-xl 
                  font-semibold 
                  border-1 border-black 
                  shadow-[0px_1px_0px_var(--borderDefault)]
                  transition-all duration-300
                "
                onClick={() => setIsPressedNext((prev) => !prev)}
              />
            </Form>
          )}
        </Formik>
      </Step>
      <Step>
        <div dir="rtl">
          <div>
            <div className="flex items-center justify-end mb-12">
              <button
                className="p-2 border-2 border-primary rounded-xl hover:bg-primary-hover transition-colors"
                onClick={() => setIsPressedBack((prev) => !prev)}
              >
                <ArrowLeft className="w-8 h-8 text-primary" />
              </button>
            </div>

            <div className="text-right mb-8">
              <div className="text-4xl font-extrabold text-primary mb-2">
                تقریبا تمومه! تایید پست الکترونیک
              </div>
              <p className="text-neutral-gray-bold text-sm font-extrabold">
                لطفا کد ارسال شده به پست الکترونیک karebadoomzamini@gamil.com را
                وارد کنید
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={SignUpFormSchemaStep3Config}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col items-stretch gap-4 w-full">
                  <div dir="ltr">
                    <InputOTP
                      maxLength={6}
                      onChange={(value) => {
                        setOTPValue(value);
                        if (value.length === 6) {
                          console.log("OTP کامل شد:", value);
                          setIsPressedNext((prev) => !prev);
                        }
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <CustomBtn
                    children={
                      emailConfirmDisabled
                        ? `  ارسال مجدد کد ${timeLeft}s`
                        : "ارسال مجدد کد"
                    }
                    type="submit"
                    disabled={isSubmitting || emailConfirmDisabled}
                    className="
                  w-full mt-2 
                  bg-secondary hover:bg-secondry-hover 
                  text-white py-3 rounded-xl 
                  font-semibold 
                  border-1 border-black 
                  shadow-[0px_1px_0px_var(--borderDefault)]
                  transition-all duration-300
                "
                    onClick={handleClick}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Step>
    </Stepper>
  );
}

export default SignUp;
