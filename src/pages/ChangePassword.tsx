import AuthBackground from "@/components/Auth/Background/AuthBackground";

import ChangePasswordForm from "@/components/Auth/ChangePassword/ChangePassword";

export default function ChangePassword() {
	return (
		<div className="w-screen h-screen bg-background overflow-hidden justify-center flex">
			<AuthBackground />

			<ChangePasswordForm />
		</div>
	);
}
