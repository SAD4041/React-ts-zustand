import { Button } from "@/components/Custom/Button/Button";
import { Input } from "@/components/Custom/Input/Input";
import { Form, Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ChangePasswordSchema from "@/schemas/ChangePasswordSchema";
import { resetPasswordService } from "@/services/authService";
import type { AxiosError } from "axios";

export default function ChangePasswordForm() {
  const [searchParams] = useSearchParams();

  // مقاوم در برابر لینک خراب (=?email=...)
  const rawToken = searchParams.get("token") ?? "";
  const rawEmail = searchParams.get("email") ?? "";

  const token = rawToken.split("=")[0];
  const email = rawEmail.split("=")[0];

  const navigate = useNavigate();

  const [overAllError, setOverAllError] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <div className="flex relative z-11 flex-col items-center justify-center min-h-screen text-center w-7/8 max-w-100 sm:w-100">
      <div className="h-fit bg-background sm:bg-transparent p-8 rounded-4xl w-full">
        {!isChanged && (
          <>
            <h1 className="text-4xl font-bold text-charcoal-900 font-[Alibaba] whitespace-nowrap">
              تغییر رمز عبور
            </h1>

            <p className="text-sm text-charcoal-700 mt-3 font-[Alibaba]">
              لطفاً رمز عبور جدید خود را وارد کنید
            </p>
          </>
        )}

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ChangePasswordSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setOverAllError("");

            if (!token || !email) {
              setOverAllError("لینک بازیابی نامعتبر است");
              setSubmitting(false);
              return;
            }

            try {
              await resetPasswordService({
                email,
                token,
                password: values.password,
              });

              setIsChanged(true);
            } catch (err: unknown) {
                const error = err as AxiosError<{ message?: string }>;
              
                setOverAllError(
                  error.response?.data?.message ?? "خطا در تغییر رمز عبور",
                );
              }
               finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <>
              {overAllError && (
                <div
                  className="bg-red-500/20 text-red-500 rounded-lg w-full px-4 py-2 mb-4"
                  dir="rtl"
                >
                  <p>{overAllError}</p>
                </div>
              )}

              {!isChanged && (
                <Form className="mt-4 rounded flex flex-col gap-4 items-center">
                  <Input
                    type="password"
                    name="password"
                    placeholder="رمز عبور جدید"
                    classes={{ className: "h-10 w-full" }}
                    shadow={true}
                  />

                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="تکرار رمز عبور جدید"
                    classes={{ className: "h-10 w-full" }}
                    shadow={true}
                  />

                  <Button
                    type="submit"
                    size={"giant"}
                    bold={true}
                    isLoading={isSubmitting}
                    className="text-xl font-[Alibaba] font-bold h-7 mt-4 px-5 py-6"
                  >
                    تغییر رمز عبور
                  </Button>
                </Form>
              )}

              {isChanged && (
                <div className="mt-10 w-full flex justify-center">
                  <div className="bg-green-500/10 border border-green-500/40 rounded-2xl px-6 py-6 max-w-md flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-12 h-12 text-green-500 mb-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12.5l2.5 2.5L16 9" />
                    </svg>

                    <p className="text-xl sm:text-3xl text-green-600 font-[Alibaba] whitespace-nowrap">
                      !رمز عبور با موفقیت تغییر کرد
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-6 mt-8 items-center justify-center">
                <Button
                  className="px-0"
                  onClick={navigateToLogin}
                  variant={"link"}
                  shadow={false}
                  bold={true}
                >
                  بازگشت به صفحه ورود
                </Button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
