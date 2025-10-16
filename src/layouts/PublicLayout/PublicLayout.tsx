import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
	return (
		<div className="font-[alibaba]">
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
		</div>
	);
};

export default PublicLayout;
