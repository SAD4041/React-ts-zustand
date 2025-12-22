import AuthBackground from "@/components/Auth/Background/AuthBackground";

import ForgetPasswordForm from "@/components/Auth/ForgetPassword/ForgetPassword";

export default function ForgetPassword() {
	return (
		<div className="w-screen h-screen bg-background overflow-hidden justify-center flex">
			<AuthBackground />

			<ForgetPasswordForm />
		</div>
	);
}
