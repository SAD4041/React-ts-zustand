import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
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
	);
};

export default PrivateLayout;
