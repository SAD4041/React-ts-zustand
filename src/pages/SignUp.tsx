import CustomInput from "@/components/Custom/CustomInput";
import CustomCheckbox from "@/components/Custom/CustomCheckbox";
import CustomBtn from "@/components/Custom/CustomBtn";
import { Formik, Form, type FormikHelpers } from "formik";
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
import { resendVerificationCode, signupService, verifyEmailService } from "@/services/authService";
import { set, type FieldValues } from "react-hook-form";
import type { SignupPayload } from "@/types/authTypes";
import CustomToast from "@/components/Custom/CustomToast";
import useUserStore from "@/store/userStore/userStore";

function SignUp() {
  const initialValues: SignupPayload & {
    confirmPassword: string;
    acceptTerms: boolean;
  } = {
    username: "",
    email: "",
    password: "",
    bio: "I thought it is required so just to fill it :/ ",
    confirmPassword: "",
    acceptTerms: false,
  };
  const [isPressedNext, setIsPressedNext] = useState<boolean>(false);
  const [isPressedBack, setIsPressedBack] = useState<boolean>(false);
  const [OTPvalue, setOTPValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [emailConfirmDisabled, setDisabled] = useState(true);
  const [shouldClear, setShouldClear] = useState(false) // for reseting the verification code

    useEffect(() => {
    if (shouldClear) {
      setOTPValue("") 
      setShouldClear(false)
    }
  }, [shouldClear])

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleClick = async (email:string, password:string) => {
    setShouldClear(true);
    setTimeLeft(10);
    setDisabled(true);
    try {
      await resendVerificationCode(email,password);
      alert("کد جدید به ایمیل شما ارسال شد ✅");
    } catch (err) {
      console.error("Failed to resend code:", err);
      alert("ارسال مجدد کد با خطا مواجه شد ❌");
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setDisabled(false);
    }
  }, [timeLeft]);

  // start connection
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(
    "I thought it is required so just to fill it :/ "
  );

  const handleSignup = async (values: SignupPayload) => {
    try {
      const data = await signupService(values);
      console.log("Signup success! Token:", data.token);
    } catch (err: any) {// eslint-disable-line @typescript-eslint/no-explicit-any
      console.log("Signup failed:", err.response?.data || err.message || err);
    }
  };

  const { setToken , setUserId , setUsername } = useUserStore();
  const handleVerify = async (emailToVerify: string, codeToVerify: string) => {
    try {
      const data = await verifyEmailService({
        email: emailToVerify,
        code: codeToVerify,
      });
      console.log("Verification success! Token:", data.token);
      // localStorage.setItem("token", data.token); // Save JWT
      
      //setting
      setToken(data.token);
      setUserId(data.userId);
      setUsername(data.username);
      
      console.log("Email verified successfully!");
      // alert("ثبت نام شما تکمیل شد ✅");
      CustomToast("ثبت نام شما تکمیل شد ✅","success");
      // redirect or move to next step
    } catch (err) {
      console.error("Verification failed:", err);
      // alert("کد تایید اشتباه است یا منقضی شده ❌");
      CustomToast("کد تایید اشتباه است یا منقضی شده ❌","error");
    }
    finally{
      console.log("Verification process ended");
      console.log("email:", emailToVerify);
      console.log("code:", codeToVerify);
    }
  };
  //end connection

  useEffect(() => {
    setIsPressedBack(false);
    setIsPressedNext(false);
  }, [isPressedBack, isPressedNext]);

  const firstSubmit = (data: FieldValues) => {
            setusername(data.username);
            setEmail(data.email);
            setIsPressedNext((prev) => !prev);
            console.log("Step1 values:", data);
          }
  const secondSubmit = (data: FieldValues) => {
            setPassword(data.password);
            const payload: SignupPayload = {
              username: username,
              email: email,
              password: password,
              bio: bio,
            };
            console.log("Submitting signup payload:", payload);
            handleSignup(payload);
            console.log(bio);
          }

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
          onSubmit={firstSubmit}
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
          onSubmit={secondSubmit}
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
              <div className="text-4xl font-extrabold text-[var(--primary)] mb-A2">
                تقریبا تمومه! تایید پست الکترونیک
              </div>
              <p className="text-primary text-sm font-extrabold">
                لطفا کد ارسال شده به پست الکترونیک {email} را وارد کنید
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={SignUpFormSchemaStep3Config}
              onSubmit={() => console.log("Step 3 submitted")} //the submit button is wrong and should be called when the lenght reaches 6 (also commented the button type)
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col items-stretch gap-4 w-full">
                  <div dir="ltr">
                    <InputOTP
                      value={OTPvalue}
                      maxLength={6}
                      onChange={(value:string) => {
                        setOTPValue(value);
                        if (value.length === 6) {
                          handleVerify(email,value);
                          console.log("email:", email);
                          console.log("OTP کامل شد:", value);
                          setIsPressedNext((prev) => !prev);
                        }
                      }}
                    >
                      <InputOTPGroup >
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
                    // type="submit"
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
                    onClick={() => handleClick(email,password)}
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
