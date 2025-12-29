import { Button } from "@/components/Custom/Button/Button";
import { Input } from "@/components/Custom/Input/Input";
import { Form, Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { forgetpasswordService } from "@/services/authService";
import ForgetPasswordSchema from "@/schemas/ForgetPasswordSchema";

type FormValues = {
  Email: string;
};

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [overAllError, setOverAllError] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [counter, setCounter] = useState(0);

  const passedEmail = (location.state as { Email?: string })?.Email || "";

  function navigateToLogin() {
    navigate("/login");
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (linkSent && counter > 0) {
      timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [linkSent, counter]);

  return (
    <div className="flex relative z-11 flex-col items-center justify-center min-h-screen text-center w-7/8 max-w-100 sm:w-100">
      <div className="h-fit bg-background sm:bg-transparent p-8 rounded-4xl w-full">
        <h1 className="text-4xl font-bold text-charcoal-900 font-[Alibaba] whitespace-nowrap">
          بازیابی رمز عبور
        </h1>

        <p className="text-sm text-charcoal-700 mt-3 font-[Alibaba]">
          لطفاً ایمیل خود را وارد کنید
        </p>

        <Formik<FormValues>
          initialValues={{ Email: passedEmail }}
          validationSchema={ForgetPasswordSchema}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            setOverAllError("");

            forgetpasswordService({ Email: values.Email })
              .then((response) => {
                console.log("BACK RESPONSE:", response);

                if (response.messages?.Email) {
                  setErrors({ Email: response.messages.Email });
                  return;
                }

                if (response.statusCode === 200) {
                  setLinkSent(true);
                  setCounter(30);
                }
              })
              .catch((error) => {
                const errorText = "خطای غیر منتظره";
                const backendMessages = error.response?.data?.messages;

                if (backendMessages?.Email) {
                  setErrors({ Email: backendMessages.Email });
                } else if (error.response?.data?.message) {
                  setOverAllError(error.response.data.message);
                } else {
                  setOverAllError(errorText);
                }
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting }) => (
            <>
              <Form className="mt-6 rounded flex flex-col gap-4 items-center">
                {overAllError && (
                  <div
                    className="bg-red-500/20 text-red-500 rounded-lg w-full px-4 py-2"
                    dir="rtl"
                  >
                    <p>{overAllError}</p>
                  </div>
                )}

                <Input
                  name="Email"
                  placeholder="ایمیل"
                  classes={{ className: "h-10 w-full" }}
                  shadow={true}
                />

                {linkSent && counter > 0 && (
                  <p className="text-sm text-gray-500 font-[Alibaba] mt-2">
                    امکان ارسال مجدد تا {counter} ثانیه دیگر
                  </p>
                )}

                <Button
                  type="submit"
                  size={"giant"}
                  bold={true}
                  disabled={linkSent && counter > 0}
                  isLoading={isSubmitting}
                  className="text-4sm font-[Alibaba] font-bold mt-6 px-5 py-6"
                >
                  {linkSent ? "ارسال مجدد لینک" : "ارسال لینک بازیابی"}
                </Button>
              </Form>

              <div className="flex gap-60 mt-6 items-center justify-center h-5">
                <Button
                  type="button"
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
