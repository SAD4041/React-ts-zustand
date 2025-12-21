import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";
import { Button } from "@/components/Custom/Button/Button";
import { Input } from "@/components/Custom/Input/Input";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import LoginSchema from "@/schemas/LoginSchema";
import { loginService } from "@/services/authService";
import useUserStore from "@/store/userStore/userStore";
import { useState } from "react";

export default function LoginForm() {
	const navigate = useNavigate();
	const { setAccessToken } = useUserStore();
	const [overAllError, setOverAllError] = useState<string>("");

	function navigateToSignupPage() {
		navigate("/signup");
	}
	function navigateToDashboard() {
		navigate("/Dashboard/pets");
	}

	return (
		<div className="flex relative z-11 flex-col items-center justify-center min-h-screen text-center w-7/8 max-w-100 sm:w-100">
			<div className="h-fit bg-background sm:bg-transparent p-8 rounded-4xl w-full">
				<h1 className="text-5xl font-bold text-gray-800 font-[Alibaba]">
					ورود
				</h1>
				<p className="text-sm text-gray-600 mt-3 font-[Alibaba]">!خوش آمدید</p>
				<p className="text-sm text-gray-600 font-[Alibaba]">
					لطفا به حساب کاربری خود وارد شوید
				</p>
				<Formik
					{...LoginSchema}
					onSubmit={(values, { setErrors, setSubmitting }) => {
						console.log("Form values:", values);
						setOverAllError("");
						loginService({
							email: values.email,
							password: values.password,
							rememberMe: values.rememberMe,
						})
							.then((loginResponse) => {
								if (loginResponse.messages !== null) {
									setErrors(loginResponse.messages!);
								}
								if (loginResponse.statusCode === 200) {
									setAccessToken(loginResponse.data?.accessToken);
									navigateToDashboard();
								}
							})
							.catch((error) => {
								const errorText = "خطای غیر منتظره";
								console.log(error.response.data.messages);
								if (error.response.data.messages) {
									setErrors(error.response.data.messages);
								} else if (error.response.data.message) {
									setOverAllError(error.response.data.message);
								} else {
									setOverAllError(errorText);
								}
							})
							.finally(() => {
								setSubmitting(false);
							});
					}}
				>
					{({ isSubmitting }) => (
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
								name="email"
								placeholder="ایمیل"
								classes={{
									className: "h-10 w-full",
								}}
								shadow={true}
							/>
							<Input
								type="password"
								name="password"
								placeholder="رمز عبور"
								classes={{
									className: "h-10 w-full",
								}}
								shadow={true}
							/>
							<div className="w-full flex justify-end ">
								<Checkbox
									name="rememberMe"
									classes={{
										className: "mt-2",
										textClassName: "text-xs font-[Alibaba]",
									}}
									text="مرا بخاطر بسپار"
									size="20px"
								/>
							</div>

							<Button
								type="submit"
								size={"giant"}
								bold={true}
								isLoading={isSubmitting}
								className="font-[Alibaba] font-bold h-7 mt-4 px-5 py-6"
							>
								ورود
							</Button>
						</Form>
					)}
				</Formik>

				<div className="flex gap-[4vw] sm:gap-6 mt-3 items-center justify-center">
					<Button
						className="px-0"
						onClick={navigateToSignupPage}
						variant={"link"}
						shadow={false}
						bold={true}
					>
						ثبت نام در سایت
					</Button>
					<div className="h-6 bg-primary w-1 rounded-xs z-12"></div>
					<Button className="px-0" variant={"link"} shadow={false} bold={true}>
						بازیابی رمز عبور
					</Button>
				</div>
			</div>
		</div>
	);
}
