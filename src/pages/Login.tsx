import AuthBackground from "@/components/Auth/Background/AuthBackground";

import LoginForm from "@/components/Auth/LoginForm/LoginForm";

export default function Login() {
	return (
		<div className="w-screen h-screen bg-background overflow-hidden justify-center flex">
			<AuthBackground />

			<LoginForm />
		</div>
	);
}
