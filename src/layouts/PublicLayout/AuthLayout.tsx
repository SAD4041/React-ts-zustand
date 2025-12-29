import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
    return (
        <>
        <Toaster
				position="bottom-right"
				richColors={true}
				duration={5000}
				// toastOptions={{
				// 	style: {
				// 		color: "red",
				// 	},
				// }}
			/>
			<Outlet />
        </>
    )
}

export default LoginLayout;