import AuthBackground from "@/components/Auth/Background/AuthBackground";

import { useMobile } from "@/hooks/ResponsiveHooks";
import LoginForm from "@/components/Auth/LoginForm/LoginForm";

export default function Login() {
  const isMobile = useMobile();
  return (
    <div className="w-screen h-screen bg-background overflow-hidden justify-center flex">
      <AuthBackground />

      <LoginForm />
    </div>
  );
}
