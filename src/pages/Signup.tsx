import AuthBackground from "@/components/Auth/Background/AuthBackground";

import SignupForm from "@/components/Auth/SignupForm/SignupForm";

export default function Signup() {
	return (
		<div className="w-screen h-screen bg-background overflow-hidden justify-center flex">
			<AuthBackground />

			<SignupForm />
		</div>
	);
}
